#!/usr/bin/env node
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { spawnSync } from 'node:child_process';
import { parseArgs, escapeHtml } from './lib.mjs';
const args=parseArgs(process.argv);
if(!args.input)throw new Error('Usage: node export-pdf.mjs --input deck.pptx --output deck.pdf [--soffice path]');
const input=path.resolve(args.input), output=path.resolve(args.output||input.replace(/\.pptx$/i,'.pdf'));
if(!/\.pptx$/i.test(input) || !/\.pdf$/i.test(output))throw new Error('Input must be PPTX; output must be PDF');
await fs.access(input);
const candidates=[args.soffice,process.env.LIBREOFFICE_PATH,'soffice','/Applications/LibreOffice.app/Contents/MacOS/soffice',process.env.ProgramFiles&&`${process.env.ProgramFiles}/LibreOffice/program/soffice.exe`].filter(Boolean);
const binary=candidates.find(p=>spawnSync(p,['--version'],{timeout:10000,encoding:'utf8'}).status===0);
if(!binary)throw new Error('PDF export needs LibreOffice (set LIBREOFFICE_PATH) or export this PPTX to PDF in PowerPoint/WPS. No PDF was produced.');
const temp=await fs.mkdtemp(path.join(os.tmpdir(),'leego-pdf-'));
try {
  const env={...process.env};
  if(args['font-dir']) {
    const dir=path.resolve(args['font-dir']);await fs.access(dir);
    const config=path.join(temp,'fonts.conf');
    await fs.writeFile(config,`<?xml version="1.0"?><fontconfig><dir>${escapeHtml(dir)}</dir><cachedir>${escapeHtml(path.join(temp,'font-cache'))}</cachedir></fontconfig>`);
    env.FONTCONFIG_FILE=config;
  }
  const result=spawnSync(binary,[`-env:UserInstallation=${pathToFileURL(path.join(temp,'profile')).href}`,'--headless','--convert-to','pdf','--outdir',temp,input],{encoding:'utf8',timeout:120000,env});
  if(result.status!==0)throw new Error(`PDF converter failed: ${result.error?.message||result.stderr||result.stdout}`);
  const generated=path.join(temp,path.basename(input).replace(/\.pptx$/i,'.pdf'));
  const data=await fs.readFile(generated);
  if(data.subarray(0,5).toString()!=='%PDF-')throw new Error('Converter did not produce a valid PDF header');
  await fs.mkdir(path.dirname(output),{recursive:true});await fs.writeFile(output,data);
  console.log(`Exported PDF from PPTX: ${output}. Check fonts, page count and layout in the PDF.`);
} finally {await fs.rm(temp,{recursive:true,force:true});}
