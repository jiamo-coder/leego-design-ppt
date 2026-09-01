#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { escapeHtml, parseArgs, readJson, writeFileEnsured } from "./lib.mjs";

const args = parseArgs(process.argv);
const input = path.resolve(args.input || "deck-spec.json");
const output = path.resolve(args.output || "output/web");
const scriptDir = path.dirname(new URL(import.meta.url).pathname);
const assetDir = path.resolve(scriptDir, "../assets");
const spec = await readJson(input);

function itemMarkup(item) {
  const value = item.value ? `<strong>${escapeHtml(item.value)}</strong>` : "";
  const title = item.title ? `<h3>${escapeHtml(item.title)}</h3>` : "";
  return `<article class="ldp-item">${value}${title}<p>${escapeHtml(item.body || "")}</p></article>`;
}

function slideMarkup(slide, index) {
  const notes = slide.notes || {};
  const noteLines = [notes.purpose, ...(notes.talkingPoints || []), notes.transition].filter(Boolean);
  const sources = (slide.sources || []).map((source) => `<li>${escapeHtml(source)}</li>`).join("");
  return `<section class="ldp-slide ldp-layout-${escapeHtml(slide.layout)}" data-ldp-slide aria-label="Slide ${index + 1}: ${escapeHtml(slide.title)}">
    <div class="ldp-slide__frame">
      <p class="ldp-kicker">${escapeHtml(slide.eyebrow || `SECTION ${String(index + 1).padStart(2, "0")}`)}</p>
      <h2>${escapeHtml(slide.title)}</h2>
      ${slide.body ? `<p class="ldp-note">${escapeHtml(slide.body)}</p>` : ""}
      ${(slide.items || []).length ? `<div class="ldp-items">${slide.items.map(itemMarkup).join("")}</div>` : ""}
      ${sources ? `<ul class="ldp-sources">${sources}</ul>` : ""}
    </div>
    <aside class="ldp-speaker-notes"><h3>Speaker notes</h3>${noteLines.map((line) => `<p>${escapeHtml(line)}</p>`).join("")}</aside>
  </section>`;
}

const slides = spec.slides.map(slideMarkup).join("\n");
const html = `<!doctype html><html lang="${escapeHtml(spec.language)}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><title>${escapeHtml(spec.title)}</title><link rel="stylesheet" href="assets/web-runtime.css"><style>.ldp-items{display:grid;gap:24px;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));margin-top:44px}.ldp-item{border-top:2px solid var(--ldp-purple);padding-top:18px}.ldp-item strong{color:var(--ldp-purple);display:block;font-size:clamp(34px,5vw,58px);letter-spacing:-.05em}.ldp-item h3{font-size:22px;margin:8px 0}.ldp-item p{color:var(--ldp-muted);line-height:1.55}.ldp-sources{bottom:24px;color:var(--ldp-muted);font-size:10px;left:clamp(28px,5vw,72px);position:absolute}</style></head><body><main class="ldp-deck ldp-present" data-ldp-deck>${slides}</main><div class="ldp-progress" data-ldp-progress></div><div class="ldp-controls"><button data-prev aria-label="Previous slide" onclick="dispatchEvent(new KeyboardEvent('keydown',{key:'ArrowLeft'}))">←</button><span data-ldp-counter></span><button data-next aria-label="Next slide" onclick="dispatchEvent(new KeyboardEvent('keydown',{key:'ArrowRight'}))">→</button><span>O overview · N notes</span></div><script src="assets/web-runtime.js"></script></body></html>`;

await fs.mkdir(path.join(output, "assets"), { recursive: true });
await writeFileEnsured(path.join(output, "index.html"), html);
await fs.copyFile(path.join(assetDir, "web-runtime.css"), path.join(output, "assets/web-runtime.css"));
await fs.copyFile(path.join(assetDir, "web-runtime.js"), path.join(output, "assets/web-runtime.js"));
console.log(`Built responsive deck: ${path.join(output, "index.html")}`);
