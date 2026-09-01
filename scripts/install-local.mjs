import fs from "node:fs/promises";
import path from "node:path";

const source = path.resolve("skill/leego-design-ppt");
const target = "/Users/mac/.codex/skills/leego-design-ppt";
await fs.mkdir(path.dirname(target), { recursive: true });
await fs.cp(source, target, { recursive: true, force: true });
console.log(`Installed Leego Design PPT at ${target}`);
