#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { parseArgs } from "./lib.mjs";

const args = parseArgs(process.argv);
const target = path.resolve(args.output || "leego-design-ppt-deck");
await fs.mkdir(path.join(target, "assets"), { recursive: true });
await fs.copyFile(path.resolve(new URL("../assets/deck-spec.schema.json", import.meta.url).pathname), path.join(target, "deck-spec.schema.json"));
await fs.writeFile(path.join(target, "README.md"), "# Leego Design PPT project\n\nPlace assets in `assets/`, author `deck-spec.json`, validate, then build HTML, PPTX, and PDF.\n");
console.log(`Initialized ${target}`);
