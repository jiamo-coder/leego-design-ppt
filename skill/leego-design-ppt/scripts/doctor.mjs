#!/usr/bin/env node
import { createRequire } from 'node:module';
import { spawnSync } from 'node:child_process';
const require = createRequire(import.meta.url);
const node = Number(process.versions.node.split('.')[0]) >= 20;
const dependencies = {};
for (const name of ['pptxgenjs', 'image-size']) {
  try { require.resolve(name); dependencies[name] = true; } catch { dependencies[name] = false; }
}
const candidates = [process.env.LIBREOFFICE_PATH, 'soffice', '/Applications/LibreOffice.app/Contents/MacOS/soffice', process.env.ProgramFiles && `${process.env.ProgramFiles}/LibreOffice/program/soffice.exe`].filter(Boolean);
const libreoffice = candidates.find(p => spawnSync(p, ['--version'], { timeout: 10000, encoding: 'utf8' }).status === 0) || null;
console.log(JSON.stringify({ node: process.versions.node, html: node, pptx: node && Object.values(dependencies).every(Boolean), pdf: !!libreoffice, dependencies, libreoffice, instructions: 'Run npm ci --ignore-scripts in this skill directory for PPTX. PDF requires LibreOffice or an export from your presentation app. No credentials or Codex runtime required.' }, null, 2));
if (!node) process.exitCode = 1;
