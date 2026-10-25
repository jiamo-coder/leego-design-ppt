import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
const source=path.resolve('skill/leego-design-ppt');
const target=path.join(process.env.CODEX_HOME||path.join(os.homedir(),'.codex'),'skills','leego-design-ppt');
await fs.mkdir(path.dirname(target),{recursive:true});
await fs.cp(source,target,{recursive:true,force:true,filter:p=>!p.split(path.sep).includes('node_modules')});
console.log(`Installed Skill files at ${target}. Run npm ci --ignore-scripts there for the portable PPTX runtime.`);
