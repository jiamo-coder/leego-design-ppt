#!/usr/bin/env node
import fs from "node:fs/promises";
import { parseArgs, readJson } from "./lib.mjs";

const args = parseArgs(process.argv);
const file = args.input || "deck-spec.json";
const spec = await readJson(file);
const errors = [];
for (const field of ["schemaVersion", "title", "language", "audience", "purpose", "brand", "theme", "slides"]) {
  if (spec[field] === undefined || spec[field] === "") errors.push(`Missing required field: ${field}`);
}
if (spec.schemaVersion !== "2.0") errors.push("schemaVersion must be 2.0");
if (!Array.isArray(spec.slides) || spec.slides.length === 0) errors.push("slides must contain at least one slide");
const ids = new Set();
for (const [index, slide] of (spec.slides || []).entries()) {
  for (const field of ["id", "narrativeJob", "layout", "title"]) {
    if (!slide[field]) errors.push(`Slide ${index + 1} missing ${field}`);
  }
  if (ids.has(slide.id)) errors.push(`Duplicate slide id: ${slide.id}`);
  ids.add(slide.id);
  if (/TODO|TBD|lorem ipsum|placeholder/i.test(JSON.stringify(slide))) errors.push(`Slide ${slide.id} contains placeholder text`);
  for (const visual of slide.visuals || []) {
    if (!['contain', 'cover'].includes(visual.fit)) errors.push(`Slide ${slide.id} visual has invalid fit`);
    if (visual.fit === "cover" && !visual.focalPoint) errors.push(`Slide ${slide.id} cover visual needs focalPoint`);
    if (visual.src && !visual.src.startsWith("http")) {
      try { await fs.access(visual.src); } catch { errors.push(`Slide ${slide.id} visual not found: ${visual.src}`); }
    }
  }
}
if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(`Valid deck spec: ${spec.title} (${spec.slides.length} slides)`);
