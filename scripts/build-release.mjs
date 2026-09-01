import { execFileSync } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

const root = process.cwd();
const version = "2.0.0";
const zipPath = path.join(root, `public/downloads/leego-design-ppt-${version}.zip`);
await fs.mkdir(path.dirname(zipPath), { recursive: true });
try { await fs.unlink(zipPath); } catch (error) { if (error.code !== "ENOENT") throw error; }
execFileSync("zip", ["-qr", zipPath, "skill/leego-design-ppt"], { cwd: root, stdio: "inherit" });

const standardsDir = path.join(root, "public/standards/leego-design-ppt");
await fs.mkdir(standardsDir, { recursive: true });
const copies = [
  ["skill/leego-design-ppt/SKILL.md", "SKILL.md"],
  ["skill/leego-design-ppt/references/interaction-lessons.md", "interaction-lessons.md"],
  ["skill/leego-design-ppt/assets/design-tokens.json", "design-tokens.json"],
  ["skill/leego-design-ppt/assets/theme-presets.json", "theme-presets.json"],
  ["skill/leego-design-ppt/assets/layout-patterns.json", "layout-patterns.json"],
  ["skill/leego-design-ppt/assets/deck-spec.schema.json", "deck-spec.schema.json"],
];
for (const [source, target] of copies) await fs.copyFile(path.join(root, source), path.join(standardsDir, target));

const sha256 = async (file) => crypto.createHash("sha256").update(await fs.readFile(file)).digest("hex");
const resourceDefs = [
  ["skill-zip", "public/downloads/leego-design-ppt-2.0.0.zip"],
  ["skill", "skill/leego-design-ppt/SKILL.md"],
  ["interaction-lessons", "skill/leego-design-ppt/references/interaction-lessons.md"],
  ["design-tokens", "skill/leego-design-ppt/assets/design-tokens.json"],
  ["theme-presets", "skill/leego-design-ppt/assets/theme-presets.json"],
  ["layout-patterns", "skill/leego-design-ppt/assets/layout-patterns.json"],
  ["deck-spec-schema", "skill/leego-design-ppt/assets/deck-spec.schema.json"],
  ["demo-pptx", "public/downloads/leego-design-ppt-demo.pptx"],
  ["demo-pdf", "public/downloads/leego-design-ppt-demo.pdf"],
];
const base = "https://raw.githubusercontent.com/jiamo-coder/leego-design-ppt/main/";
const resources = [];
for (const [id, relative] of resourceDefs) resources.push({ id, url: base + relative, sha256: await sha256(path.join(root, relative)) });
const manifest = {
  name: "Leego Design PPT",
  id: "leego-design-ppt",
  version,
  updatedAt: "2026-09-01",
  generatedAt: new Date().toISOString(),
  channel: "stable",
  trustedOrigin: "https://raw.githubusercontent.com/jiamo-coder/leego-design-ppt/",
  compatibility: { codex: ">=1.0", deckSpec: "2.0" },
  downloadUrl: base + `public/downloads/leego-design-ppt-${version}.zip`,
  resources,
  summary: [
    "Introduces one deck-spec source for responsive HTML, editable PPTX, and matched PDF.",
    "Adds 18 narrative layout patterns and the Purple Tech design system.",
    "Adds brand-residue, typography, image-fit, source, and file QA rules."
  ]
};
const text = JSON.stringify(manifest, null, 2) + "\n";
await fs.writeFile(path.join(root, "latest.json"), text);
await fs.writeFile(path.join(root, "public/latest.json"), text);
console.log(`Release package built: ${zipPath}`);
