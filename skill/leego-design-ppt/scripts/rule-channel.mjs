import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

export const ORIGIN = 'https://raw.githubusercontent.com/jiamo-coder/leego-design-ppt/';
export const MANIFEST_URL = `${ORIGIN}main/latest.json`;
const LIMIT = 256 * 1024;
export const digest = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
export function compareVersions(a, b) {
  if (![a,b].every(v => typeof v === 'string' && /^\d+\.\d+\.\d+$/.test(v))) throw new Error('Invalid version');
  const x=a.split('.').map(Number), y=b.split('.').map(Number);
  for (let i=0;i<3;i++) if(x[i]!==y[i]) return x[i]>y[i]?1:-1;
  return 0;
}
export function trustedUrl(value) {
  const u=new URL(value);
  if(u.protocol!=='https:'||u.hostname!=='raw.githubusercontent.com'||u.port||u.username||u.password||u.search||u.hash||!u.pathname.startsWith('/jiamo-coder/leego-design-ppt/')) throw new Error('Untrusted rule URL');
  return u.href;
}
async function readRemote(url, fetchImpl) {
  const response=await fetchImpl(trustedUrl(url),{redirect:'error',signal:AbortSignal.timeout(7000),cache:'no-store'});
  if(!response.ok) throw new Error(`Update HTTP ${response.status}`);
  if(Number(response.headers.get('content-length'))>LIMIT) throw new Error('Rule resource too large');
  if(!response.body) throw new Error('Empty update response');
  const reader=response.body.getReader(),chunks=[]; let size=0;
  try { for(;;){const {done,value}=await reader.read();if(done)break;size+=value.length;if(size>LIMIT)throw new Error('Rule resource too large');chunks.push(Buffer.from(value));} }
  finally { await reader.cancel().catch(()=>{}); }
  return Buffer.concat(chunks);
}
function validateBundle(bytes, clientVersion, expected) {
  const b=JSON.parse(bytes.toString('utf8'));
  if(b.schemaVersion!==1||b.kind!=='leego-ppt-rules'||!Array.isArray(b.documents)||!b.documents.length) throw new Error('Invalid rules bundle');
  compareVersions(b.version,clientVersion);
  if(compareVersions(b.minClientVersion,clientVersion)>0) throw new Error('Rules require a newer client');
  if(expected&&(b.version!==expected.version||b.minClientVersion!==expected.minClientVersion))throw new Error('Rule metadata mismatch');
  const paths=new Set();
  for(const d of b.documents){if(typeof d.path!=='string'||!/^references\/[a-z0-9-]+\.md$/.test(d.path)||paths.has(d.path)||typeof d.content!=='string')throw new Error('Invalid rule document');paths.add(d.path);}
  return b;
}
async function cachedRules(cacheDir,clientVersion) {
  const out=[];
  for(const file of await fs.readdir(cacheDir).catch(()=>[])){
    const match=/^(\d+\.\d+\.\d+)-([a-f0-9]{64})\.json$/.exec(file);if(!match)continue;
    try {const p=path.join(cacheDir,file);if(!(await fs.lstat(p)).isFile()||(await fs.stat(p)).size>LIMIT)continue;const bytes=await fs.readFile(p);if(digest(bytes)!==match[2])continue;const b=validateBundle(bytes,clientVersion);if(b.version!==match[1]||compareVersions(b.version,clientVersion)<0)continue;out.push({version:b.version,path:p,sha256:match[2]});}catch{}
  }
  return out.sort((a,b)=>compareVersions(b.version,a.version));
}
export async function syncRules({clientVersion,cacheDir=path.join(os.homedir(),'.cache','leego-design-ppt','rules'),offline=false,pin,fetchImpl=fetch}={}) {
  compareVersions(clientVersion,clientVersion);
  const cached=await cachedRules(cacheDir,clientVersion);
  let fallback=cached[0]?{status:'cached',...cached[0]}:{status:'bundled',version:clientVersion,path:null};
  if(pin){compareVersions(pin,clientVersion);const found=cached.find(x=>x.version===pin);if(found)return {status:'pinned',...found};if(pin===clientVersion)return {status:'pinned-bundled',version:clientVersion,path:null};throw new Error('Pinned rules unavailable locally; no alternative version was selected');}
  if(offline)return {...fallback,offline:true};
  try {
    const manifest=JSON.parse((await readRemote(MANIFEST_URL,fetchImpl)).toString('utf8'));
    if(manifest.id!=='leego-design-ppt')throw new Error('Wrong Skill manifest');
    compareVersions(manifest.version,clientVersion);
    const packageUpdate=compareVersions(manifest.version,clientVersion)>0?{version:manifest.version,url:trustedUrl(manifest.downloadUrl)}:null;
    const rule=manifest.rules;
    if(!rule)return {...fallback,reason:'Publisher has no live rules channel yet',packageUpdate};
    if(rule.schemaVersion!==1||!/^([a-f0-9]{64})$/.test(rule.sha256))throw new Error('Invalid rule manifest');
    if(compareVersions(rule.version,manifest.version)>0)throw new Error('Rule version exceeds release');
    if(compareVersions(rule.minClientVersion,clientVersion)>0)return {...fallback,reason:'New rules need a client upgrade',packageUpdate};
    if(compareVersions(rule.version,fallback.version)<0)return {...fallback,reason:'Kept newer local rules',packageUpdate};
    const found=cached.find(x=>x.version===rule.version&&x.sha256===rule.sha256);
    if(found)return {status:'current',...found,packageUpdate};
    const bytes=await readRemote(rule.url,fetchImpl);
    if(digest(bytes)!==rule.sha256)throw new Error('Rule hash mismatch');
    const bundle=validateBundle(bytes,clientVersion,rule);
    await fs.mkdir(cacheDir,{recursive:true});
    const target=path.join(cacheDir,`${bundle.version}-${rule.sha256}.json`),tmp=`${target}.${crypto.randomUUID()}.tmp`;
    try{await fs.writeFile(tmp,bytes,{flag:'wx',mode:0o600});await fs.rename(tmp,target);}finally{await fs.rm(tmp,{force:true});}
    return {status:'updated',version:bundle.version,path:target,sha256:rule.sha256,packageUpdate};
  }catch(error){return {...fallback,reason:error.message};}
}
