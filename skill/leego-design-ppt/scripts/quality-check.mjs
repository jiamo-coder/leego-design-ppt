#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { parseArgs, readJson } from "./lib.mjs";

const args = parseArgs(process.argv);
const input = path.resolve(args.input || "deck-spec.json");
const outputRoot = path.resolve(args.output || "output");
const spec = await readJson(input);
const errors = [];
const warnings = [];
const banned = (spec.bannedTerms || []).filter(Boolean);

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const target = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walk(target));
    else files.push(target);
  }
  return files;
}

for (const slide of spec.slides) {
  if (slide.title.length > 46) warnings.push(`${slide.id}: long title may wrap (${slide.title.length} chars)`);
  for (const line of [slide.title, slide.body, ...(slide.items || []).flatMap((item) => [item.title, item.body])].filter(Boolean)) {
    if (/^[\u3400-\u9fff]$/.test(line.trim())) errors.push(`${slide.id}: single CJK character line`);
  }
}

for (const file of await walk(outputRoot)) {
  if (!/\.(html|json|txt|md|js|css)$/i.test(file)) continue;
  const text = await fs.readFile(file, "utf8");
  for (const term of banned) if (text.toLowerCase().includes(term.toLowerCase())) errors.push(`${file}: banned term ${term}`);
  if (/TODO|TBD|lorem ipsum|placeholder/i.test(text)) errors.push(`${file}: unresolved placeholder`);
}

const layouts = (await walk(outputRoot)).filter((file) => file.endsWith(".layout.json"));
for (const file of layouts) {
  const text = await fs.readFile(file, "utf8");
  if (/overflow|outOfBounds/i.test(text) && /true/i.test(text)) warnings.push(`${file}: inspect possible overflow flag`);
}

if (warnings.length) console.warn(`Warnings:\n${warnings.join("\n")}`);
if (errors.length) {
  console.error(`Errors:\n${errors.join("\n")}`);
  process.exit(1);
}
console.log(`Quality checks passed with ${warnings.length} warning(s).`);
