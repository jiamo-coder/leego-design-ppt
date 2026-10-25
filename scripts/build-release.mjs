import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import {createRequire} from 'node:module';
const root=process.cwd(),skill=path.join(root,'skill/leego-design-ppt');
const version=JSON.parse(await fs.readFile(path.join(skill,'package.json'),'utf8')).version;
const require=createRequire(path.join(skill,'package.json')),JSZip=require('jszip'),zip=new JSZip();
async function add(dir,relative=''){
 for(const entry of (await fs.readdir(dir,{withFileTypes:true})).sort((a,b)=>a.name.localeCompare(b.name))){
  if(entry.name==='node_modules'||entry.name.startsWith('.'))continue;
  const rel=path.posix.join(relative,entry.name),full=path.join(dir,entry.name);
  if(entry.isSymbolicLink())throw new Error(`Do not package symlinks: ${rel}`);
  if(entry.isDirectory())await add(full,rel);else zip.file(rel,await fs.readFile(full),{date:new Date('2026-10-25T00:00:00Z')});
 }
}
await add(skill);
const bytes=await zip.generateAsync({type:'nodebuffer',compression:'DEFLATE'});
const relativeZip=`public/downloads/leego-design-ppt-${version}.zip`,zipPath=path.join(root,relativeZip);
await fs.mkdir(path.dirname(zipPath),{recursive:true});await fs.writeFile(zipPath,bytes);
const sha=async p=>crypto.createHash('sha256').update(await fs.readFile(path.join(root,p))).digest('hex');
await fs.writeFile(`${zipPath}.sha256`,`${await sha(relativeZip)}  ${path.basename(zipPath)}\n`);
const base='https://raw.githubusercontent.com/jiamo-coder/leego-design-ppt/main/';
const defs=[['skill-zip',relativeZip],['skill','skill/leego-design-ppt/SKILL.md'],['interaction-lessons','skill/leego-design-ppt/references/interaction-lessons.md'],['compatibility','skill/leego-design-ppt/references/compatibility.md'],['ui-to-presentation','skill/leego-design-ppt/references/ui-to-presentation.md'],['design-tokens','skill/leego-design-ppt/assets/design-tokens.json'],['theme-presets','skill/leego-design-ppt/assets/theme-presets.json'],['layout-patterns','skill/leego-design-ppt/assets/layout-patterns.json'],['deck-spec-schema','skill/leego-design-ppt/assets/deck-spec.schema.json'],['demo-pptx','public/downloads/leego-design-ppt-demo.pptx'],['demo-pdf','public/downloads/leego-design-ppt-demo.pdf']];
for(const name of ['brand-identity','design-decision','reference-learning','design-evaluation','live-updates']) defs.push([name,`skill/leego-design-ppt/references/${name}.md`]);
const resources=[];for(const [id,p]of defs)resources.push({id,url:base+p,sha256:await sha(p)});
const standards=path.join(root,'public/standards/leego-design-ppt');await fs.mkdir(standards,{recursive:true});
for(const [,p]of defs.filter(([,p])=>p.startsWith('skill/')))await fs.copyFile(path.join(root,p),path.join(standards,path.basename(p)));
const documents=[];
for(const name of (await fs.readdir(path.join(skill,'references'))).sort()) if(name.endsWith('.md')) documents.push({path:`references/${name}`,content:await fs.readFile(path.join(skill,'references',name),'utf8')});
const ruleBytes=Buffer.from(JSON.stringify({schemaVersion:1,kind:'leego-ppt-rules',version,minClientVersion:'2.2.0',documents},null,2)+'\n');
const ruleHash=crypto.createHash('sha256').update(ruleBytes).digest('hex');
const rulePath=`public/rules/${version}-${ruleHash}.json`;
await fs.mkdir(path.join(root,'public/rules'),{recursive:true});await fs.writeFile(path.join(root,rulePath),ruleBytes);
const rules={schemaVersion:1,version,minClientVersion:'2.2.0',url:base+rulePath,sha256:ruleHash};
const manifest={rules,name:'Leego Design PPT',id:'leego-design-ppt',version,updatedAt:'2026-10-25',channel:'stable',trustedOrigin:'https://raw.githubusercontent.com/jiamo-coder/leego-design-ppt/',compatibility:{format:'Agent Skills',node:'>=20',deckSpec:'2.0',pptx:'pptxgenjs 4.0.1',pdf:'LibreOffice or host export',hostVerification:'See COMPATIBILITY-REPORT.md; runtime support does not imply native client verification'},downloadUrl:base+relativeZip,resources,summary:['Explainable scenario and evidence-based design selection.','Preserved offline H5, editable PPTX and PDF export.','Verified rules on next use; offline fallback and explicit runtime upgrades.']};
for(const p of ['latest.json','public/latest.json'])await fs.writeFile(path.join(root,p),JSON.stringify(manifest,null,2)+'\n');
console.log(`Built ${zipPath} (${bytes.length} bytes). Local package only; publish explicitly.`);
