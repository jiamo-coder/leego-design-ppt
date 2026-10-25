import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { createRequire } from 'node:module';
import { spawnSync } from 'node:child_process';
import { loadDeck,createScene } from '../skill/leego-design-ppt/scripts/scene.mjs';
const root=path.resolve(import.meta.dirname,'..'), skill=path.join(root,'skill/leego-design-ppt');
const require=createRequire(path.join(skill,'package.json')), JSZip=require('jszip');
const temp=await fs.mkdtemp(path.join(os.tmpdir(),'leego 中文 space '));
const source=JSON.parse(await fs.readFile(path.join(root,'examples/portable/deck-spec.json'),'utf8'));
await fs.copyFile(path.join(root,'examples/portable/portrait.png'),path.join(temp,'portrait.png'));
const input=path.join(temp,'测试 spec.json');await fs.writeFile(input,JSON.stringify(source));
function run(script,...args){const env={...process.env};delete env.OAI_WORKSPACE_NODE_MODULES;return spawnSync(process.execPath,[path.join(skill,'scripts',script),...args],{cwd:os.tmpdir(),env,encoding:'utf8',timeout:60000});}
test.after(async()=>{await fs.rm(temp,{recursive:true,force:true});});
test('portable build from an unrelated cwd preserves native objects and Unicode paths',async()=>{
 const file=path.join(temp,'测试 deck.pptx');const result=run('build-pptx.mjs','--input',input,'--output',file);assert.equal(result.status,0,result.stderr);
 const zip=await JSZip.loadAsync(await fs.readFile(file));
 assert.equal(Object.keys(zip.files).filter(p=>/^ppt\/slides\/slide\d+\.xml$/.test(p)).length,6);
 const slides=await Promise.all(Object.keys(zip.files).filter(p=>/^ppt\/slides\/slide\d+\.xml$/.test(p)).map(p=>zip.file(p).async('string')));
 assert(slides[0].includes('同一套规范'));assert(slides[1].includes('<p:pic>'));assert(slides[3].includes('<a:tbl>'));
 assert.equal(Object.keys(zip.files).filter(p=>/^ppt\/charts\/chart\d+\.xml$/.test(p)).length,2);
 assert(slides[3].includes('未提供'));assert(slides[5].includes('graphicFrame'));
 assert(Object.keys(zip.files).some(p=>p.startsWith('ppt/embeddings/')&&p.endsWith('.xlsx')));
});
test('HTML copies assets and retains table/chart data without a CDN',async()=>{
 const out=path.join(temp,'网页 输出');const result=run('build-web.mjs','--input',input,'--output',out);assert.equal(result.status,0,result.stderr);
 const html=await fs.readFile(path.join(out,'index.html'),'utf8');assert(html.includes('未提供'));assert(html.includes('序列一'));assert(!/(?:src|href)="https?:/.test(html));
 const refs=[...html.matchAll(/(?:src|href)="(assets\/[^"#]+)"/g)];for(const ref of refs)await fs.access(path.join(out,ref[1]));
});
test('bad image, unknown data and oversized content fail before a misleading export',async()=>{
 for(const mutate of [s=>s.slides[1].visuals[0].src='missing.png',s=>s.slides[4].chart.series[0].values[1]=null,s=>s.slides[0].title='非常长的中文标题'.repeat(60),s=>s.slides[3].items=[{title:'must not disappear'}]]){
  const spec=structuredClone(source);mutate(spec);const file=path.join(temp,'bad.json');await fs.writeFile(file,JSON.stringify(spec));
  assert.notEqual(run('validate-deck-spec.mjs','--input',file).status,0);
 }
});
test('zero is preserved, theme override applied and all objects remain in bounds',async()=>{
 const spec=structuredClone(source);spec.style.colors={purple:'#2255AA'};spec.slides[1].items=[{value:0,title:'零值',body:'有效的零不能丢失。'}];const file=path.join(temp,'theme.json');await fs.writeFile(file,JSON.stringify(spec));
 const d=await loadDeck(file),scene=createScene(d,d.spec.slides[1],1);assert(scene.objects.some(o=>o.text==='0'));assert(scene.objects.some(o=>o.color==='#2255AA'));
 for(const o of scene.objects)assert(o.x+o.w<=1281&&o.y+o.h<=721);
});
