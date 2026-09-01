#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { parseArgs, readJson, writeFileEnsured } from "./lib.mjs";

const args = parseArgs(process.argv);
const input = path.resolve(args.input || "deck-spec.json");
const output = path.resolve(args.output || "output/pptx/deck.pptx");
const renderDir = path.resolve(args.renders || path.join(path.dirname(output), "renders"));
const moduleRoot = args["module-root"] || process.env.OAI_WORKSPACE_NODE_MODULES;
if (!moduleRoot) throw new Error("Set OAI_WORKSPACE_NODE_MODULES or pass --module-root to the bundled node_modules directory.");
const artifact = await import(path.join(moduleRoot, "@oai/artifact-tool/dist/artifact_tool.mjs"));
const { Presentation, PresentationFile } = artifact;
const spec = await readJson(input);
const deck = Presentation.create({ slideSize: { width: 1280, height: 720 } });
const C = { ink: "#10132E", navy: "#15194A", purple: "#6546FF", ice: "#CFE6FF", paper: "#F7F8FC", white: "#FFFFFF", muted: "#69708A", line: "#DCE1EF" };

function shape(slide, name, position, fill = "none", lineFill = "none") {
  return slide.shapes.add({ geometry: "rect", name, position, fill, line: { style: "solid", fill: lineFill, width: lineFill === "none" ? 0 : 1 } });
}

function textBox(slide, name, text, position, style) {
  const box = shape(slide, name, position);
  box.text = text;
  box.text.style = style;
  return box;
}

function addChrome(slide, index, eyebrow) {
  textBox(slide, `eyebrow-${index}`, eyebrow || `SECTION ${String(index + 1).padStart(2, "0")}`, { left: 72, top: 54, width: 400, height: 24 }, { fontSize: 12, bold: true, color: C.purple });
  textBox(slide, `page-${index}`, String(index + 1).padStart(2, "0"), { left: 1160, top: 650, width: 48, height: 22 }, { fontSize: 11, bold: true, color: C.muted, alignment: "right" });
  shape(slide, `accent-${index}`, { left: 1264, top: 0, width: 16, height: 720 }, C.purple);
}

function addItemGrid(slide, slideSpec, top = 300) {
  const items = slideSpec.items || [];
  const count = Math.max(items.length, 1);
  const cols = count <= 2 ? count : count <= 4 ? 2 : 3;
  const rows = Math.ceil(count / cols);
  const gap = 24;
  const width = (1136 - gap * (cols - 1)) / cols;
  const height = Math.min(210, (350 - gap * (rows - 1)) / rows);
  items.forEach((item, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = 72 + col * (width + gap);
    const y = top + row * (height + gap);
    shape(slide, `item-line-${i}`, { left: x, top: y, width, height: 2 }, C.purple);
    if (item.value) textBox(slide, `item-value-${i}`, String(item.value), { left: x, top: y + 18, width, height: 58 }, { fontSize: 34, bold: true, color: C.purple });
    textBox(slide, `item-title-${i}`, item.title || "", { left: x, top: y + (item.value ? 76 : 22), width, height: 38 }, { fontSize: 22, bold: true, color: C.ink });
    textBox(slide, `item-body-${i}`, item.body || "", { left: x, top: y + (item.value ? 116 : 64), width, height: Math.max(48, height - 122) }, { fontSize: 16, color: C.muted });
  });
}

for (const [index, slideSpec] of spec.slides.entries()) {
  const slide = deck.slides.add();
  slide.background.fill = index === 0 ? C.navy : C.paper;
  if (index === 0) {
    textBox(slide, "cover-kicker", slideSpec.eyebrow || "LEEGO DESIGN PPT / 2.0.0", { left: 72, top: 70, width: 480, height: 26 }, { fontSize: 13, bold: true, color: C.ice });
    textBox(slide, "cover-title", slideSpec.title, { left: 72, top: 220, width: 920, height: 190 }, { fontSize: 58, bold: true, color: C.white });
    textBox(slide, "cover-body", slideSpec.body || "", { left: 72, top: 452, width: 720, height: 90 }, { fontSize: 21, color: C.ice });
    shape(slide, "cover-accent", { left: 72, top: 600, width: 210, height: 8 }, C.purple);
    textBox(slide, "cover-meta", `${spec.audience} · ${spec.purpose}`, { left: 72, top: 632, width: 760, height: 28 }, { fontSize: 12, bold: true, color: C.ice });
    shape(slide, "cover-rail", { left: 1160, top: 0, width: 120, height: 720 }, C.purple);
  } else {
    addChrome(slide, index, slideSpec.eyebrow);
    textBox(slide, `title-${index}`, slideSpec.title, { left: 72, top: 112, width: 1040, height: 108 }, { fontSize: 43, bold: true, color: C.ink });
    if (slideSpec.body) textBox(slide, `body-${index}`, slideSpec.body, { left: 72, top: 226, width: 950, height: 66 }, { fontSize: 19, color: C.muted });
    addItemGrid(slide, slideSpec, slideSpec.body ? 326 : 270);
  }
  const notes = slideSpec.notes || {};
  const sourceText = (slideSpec.sources || []).length ? `\n<sources>\n${slideSpec.sources.map((s) => `- ${s}`).join("\n")}\n</sources>` : "";
  slide.speakerNotes.textFrame.setText([notes.purpose, ...(notes.talkingPoints || []), notes.transition].filter(Boolean).join("\n") + sourceText);
}

await fs.mkdir(renderDir, { recursive: true });
for (const [index, slide] of deck.slides.items.entries()) {
  const stem = `slide-${String(index + 1).padStart(2, "0")}`;
  const png = await deck.export({ slide, format: "png", scale: 2 });
  await writeFileEnsured(path.join(renderDir, `${stem}.png`), new Uint8Array(await png.arrayBuffer()));
  const layout = await slide.export({ format: "layout" });
  await writeFileEnsured(path.join(renderDir, `${stem}.layout.json`), await layout.text());
}
const montage = await deck.export({ format: "webp", montage: true, scale: 1 });
await writeFileEnsured(path.join(renderDir, "montage.webp"), new Uint8Array(await montage.arrayBuffer()));
await fs.mkdir(path.dirname(output), { recursive: true });
const pptx = await PresentationFile.exportPptx(deck);
await pptx.save(output);
console.log(`Built PPTX: ${output}`);
