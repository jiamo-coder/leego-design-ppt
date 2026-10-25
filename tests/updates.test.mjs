import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {syncRules,digest,ORIGIN,MANIFEST_URL,trustedUrl} from '../skill/leego-design-ppt/scripts/rule-channel.mjs';
const temp=await fs.mkdtemp(path.join(os.tmpdir(),'leego-rule-test-'));
test.after(()=>fs.rm(temp,{recursive:true,force:true}));
function fixture(version='2.3.0',minClientVersion='2.2.0'){
 const bytes=Buffer.from(JSON.stringify({schemaVersion:1,kind:'leego-ppt-rules',version,minClientVersion,documents:[{path:'references/design-decision.md',content:'Reviewed synthetic rule'}]}));
 const url=ORIGIN+'main/public/rules/'+digest(bytes)+'.json';
 const manifest={id:'leego-design-ppt',version,downloadUrl:ORIGIN+'main/public/downloads/skill.zip',rules:{schemaVersion:1,version,minClientVersion,url,sha256:digest(bytes)}};
 const requests=[];const fetchImpl=async(u,options)=>{requests.push({u,options});return new Response(u===MANIFEST_URL?JSON.stringify(manifest):bytes);};
 return {bytes,manifest,requests,fetchImpl};
}
test('verified new rules cached, no second content fetch and no code writes',async()=>{const f=fixture(),cacheDir=path.join(temp,'good');const args={clientVersion:'2.2.0',cacheDir,fetchImpl:f.fetchImpl};const first=await syncRules(args);assert.equal(first.status,'updated');assert.equal(digest(await fs.readFile(first.path)),f.manifest.rules.sha256);assert.equal((await syncRules(args)).status,'current');assert.equal(f.requests.length,3);assert(f.requests.every(x=>x.options.redirect==='error'));assert.deepEqual(await fs.readdir(cacheDir),[path.basename(first.path)]);});
test('outage uses verified cache and cannot downgrade',async()=>{const cacheDir=path.join(temp,'good');const offline=await syncRules({clientVersion:'2.2.0',cacheDir,fetchImpl:async()=>{throw Error('offline');}});assert.equal(offline.version,'2.3.0');const old=fixture('2.2.0');assert.equal((await syncRules({clientVersion:'2.2.0',cacheDir,fetchImpl:old.fetchImpl})).version,'2.3.0');assert.equal(old.requests.length,1);});
test('hash mismatch never enters cache',async()=>{const f=fixture();f.manifest.rules.sha256='0'.repeat(64);const result=await syncRules({clientVersion:'2.2.0',cacheDir:path.join(temp,'bad'),fetchImpl:f.fetchImpl});assert.equal(result.status,'bundled');assert.match(result.reason,/hash/);await assert.rejects(fs.access(path.join(temp,'bad')));});
test('incompatible rules require package upgrade',async()=>{const f=fixture('3.0.0','3.0.0');const result=await syncRules({clientVersion:'2.2.0',cacheDir:path.join(temp,'new'),fetchImpl:f.fetchImpl});assert.equal(result.status,'bundled');assert.equal(result.packageUpdate.version,'3.0.0');assert.equal(f.requests.length,1);});
test('offline and pin never contact publisher; unavailable pin fails',async()=>{const options={clientVersion:'2.2.0',cacheDir:path.join(temp,'good'),fetchImpl:()=>{throw Error('network must not run');}};assert.equal((await syncRules({...options,offline:true})).version,'2.3.0');assert.equal((await syncRules({...options,pin:'2.3.0'})).status,'pinned');await assert.rejects(syncRules({...options,pin:'2.8.0'}));});
test('tampered cache is ignored',async()=>{const dir=path.join(temp,'corrupt'),f=fixture();await fs.mkdir(dir);await fs.writeFile(path.join(dir,`2.3.0-${digest(f.bytes)}.json`),'tampered');assert.equal((await syncRules({clientVersion:'2.2.0',cacheDir:dir,offline:true})).status,'bundled');});
test('URL boundary rejects other repos, queries and normalized traversal',()=>{for(const url of ['http://raw.githubusercontent.com/jiamo-coder/leego-design-ppt/main/latest.json',ORIGIN+'../other/main/x',ORIGIN+'main/x?secret=yes','https://evil.test/x'])assert.throws(()=>trustedUrl(url));});
test('oversized feed falls back without writing',async()=>{const result=await syncRules({clientVersion:'2.2.0',cacheDir:path.join(temp,'large'),fetchImpl:async()=>new Response('x'.repeat(256*1024+1))});assert.equal(result.status,'bundled');assert.match(result.reason,/large/);});
