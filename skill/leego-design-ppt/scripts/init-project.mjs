#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "./lib.mjs";

const args = parseArgs(process.argv);
const target = path.resolve(args.output || "leego-design-ppt-deck");
await fs.mkdir(path.join(target, "assets"), { recursive: true });
await fs.copyFile(fileURLToPath(new URL("../assets/deck-spec.schema.json", import.meta.url)), path.join(target, "deck-spec.schema.json"));
await fs.writeFile(path.join(target, "README.md"), "# Leego Design PPT project\n\nPlace assets in `assets/`, author `deck-spec.json`, validate, then build HTML, PPTX, and PDF.\n");
console.log(`Initialized ${target}`);
