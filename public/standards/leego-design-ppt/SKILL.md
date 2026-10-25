---
name: leego-design-ppt
description: Create, redesign, or audit presentations using Leego Design PPT narrative and visual standards. Deliver requested HTML, editable PPTX, or PDF formats; use a shared deck-spec.json for new coordinated builds. Preserve existing decks for scoped edits. Brand identity creation belongs to Leego Design VI.
---

# Leego Design PPT

Create decision-ready presentations with one narrative, one visual system, and the requested outputs. The public name is always **Leego Design PPT**. Version **2.2.0** · 2026-10-25. The package uses standard Agent Skills files, Node.js 20+ and public dependencies; it does not require Codex, a paid API or an account token.

## Core promise

By the end, the intended audience should understand, believe, choose, approve, or do something specific because the deck makes its central takeaway and evidence clear.

Never begin by copying pages. First define the audience, the communication job, the decision, and the evidence boundary. For a new full deck, author one `deck-spec.json`. Available outputs are:

- responsive HTML presentation;
- editable PPTX;
- PDF exported from the final PPTX, with fonts and page layout verified.

Choose requested formats first. A request for only PPTX, HTML, a critique, or a one-page edit does not require all three outputs or reconstruction into deck-spec. If format is unspecified, an ordinary PPT request defaults to editable PPTX; a web presentation defaults to HTML. Generate all three when requested or required by the existing deliverable contract.

## Read by task

- Always start from the user’s requested deliverable and already approved direction. Read [interaction-lessons.md](references/interaction-lessons.md) for accumulated decisions.
- New deck or content restructure: [narrative-and-content.md](references/narrative-and-content.md) and [typography-and-layout.md](references/typography-and-layout.md).
- UI/product material, metrics or family visuals: [UI-to-presentation.md](references/ui-to-presentation.md). This is a selective translation of the UI system, not an instruction to load or install another Skill.
- Brand/image inputs: [assets-and-brand-replacement.md](references/assets-and-brand-replacement.md).
- First use on any host, installation or missing runtime: [compatibility.md](references/compatibility.md), then `node scripts/doctor.mjs` from the skill directory.
- HTML: [responsive-web.md](references/responsive-web.md). PPTX/PDF: [pptx-and-pdf.md](references/pptx-and-pdf.md).
- Notes/citations: [presenter-notes-and-sources.md](references/presenter-notes-and-sources.md). Before delivery: [qa-release-and-versioning.md](references/qa-release-and-versioning.md).

## Design selection

For new decks or an explicit redesign, read [design-decision.md](references/design-decision.md). Use the structured brief and `scripts/plan-design.mjs` to choose scenario, compatible style families, page intent and evidence representation. Resolve missing-evidence, split-required and custom-required results before export. This selector is an explainable aid; visual judgment remains necessary.

For requested reference research, use [reference-learning.md](references/reference-learning.md). For baseline comparisons and promotion, use [design-evaluation.md](references/design-evaluation.md). External reviewed case count is currently zero; eight style families and 20 baseline layouts are original guidance, not a claimed scraped template collection.

## Workflow

### 1. Inspect before authoring

- Inventory every input: PDF, PPTX, image, logo, VI, research note, URL, and data file.
- Record resolution, aspect ratio, transparency, likely role, attribution, and reuse constraints.
- Extract text and visuals from reference decks before deciding what to keep.
- Define the communication job in one sentence: `By the end, [audience] should [outcome] because [central takeaway].`
- Separate verified facts from proposed language, illustration, and example data.

### 2. Build the narrative

- Give every slide one narrative job and one primary claim.
- Use takeaway titles, not topic labels.
- Make the sequence cumulative: context -> stakes -> evidence -> implication -> decision/action, or another arc appropriate to the job.
- Do not invent numbers, outcomes, testimonials, market facts, people, or quotes.
- When content is thin, strengthen logic, evidence boundaries, governance, responsibilities, decision points, and next actions.

### 3. Create `deck-spec.json`

Use [deck-spec.schema.json](assets/deck-spec.schema.json) as the semantic contract. At minimum include:

- title, language, audience, purpose, central takeaway, brand, and theme;
- slide ID, narrative job, layout, title, body/data, visuals, captions, and sources;
- image fit, focal point, transparency need, minimum resolution, and license note;
- speaker notes, slide purpose, talking points, and transition;
- banned terms and explicit replacement mappings.

### 4. Choose a layout and theme

- Start with `assets/theme-presets.json` and `assets/layout-patterns.json`. The layout catalog is a narrative guide; the included engine supplies baseline compositions, not bespoke design for every topic. Author a custom layout when the narrative requires one. Never silently drop data that a helper cannot represent.
- Preserve an approved template or brand first. Use `purple-tech` when no existing direction applies; `style.colors` supplies explicit brand overrides. Prefer MiSans when available and licensed; record the actual fallback. PPTX does not embed fonts.
- Use one composition per slide. Avoid dashboard chrome, repeated card grids, unnecessary pills, excessive radius, ornamental gradients, and decorative shadows.
- Prefer whitespace, a disciplined grid, typographic contrast, and one accent color.

### 5. Build requested outputs

- Run `scripts/validate-deck-spec.mjs` first.
- For HTML, run `scripts/build-web.mjs`.
- For PPTX, install the declared runtime with `npm ci --ignore-scripts` in this skill folder, then run `node scripts/build-pptx.mjs --input <spec> --output <deck.pptx>`. The public PptxGenJS engine creates editable objects. No host-specific module path is used.
- For PDF, run `node scripts/export-pdf.mjs --input <deck.pptx> --output <deck.pdf>` with LibreOffice, or export that PPTX using the host’s PowerPoint/WPS facility. Do not claim a separate HTML printout matches the PPTX. A temporary PPTX used for PDF export is not an extra user deliverable.
- Keep visible text, slide order, source labels, and image focal decisions aligned across outputs.

### 6. Verify before delivery

- Run `scripts/quality-check.mjs` on the spec and output folders.
- For a full deck, visually inspect every delivered slide/page. For scoped edits, inspect changed pages and those affected by shared styles or pagination; honor any required file-format validation.
- For a new responsive HTML deck or shared-layout changes, check desktop and mobile plus relevant breakpoints, zoom, and reduced-motion. A local text fix does not require rerunning five widths on every unchanged page.
- Scan for banned brands, placeholder copy, single-character lines, unexpected title wraps, clipped text, overlaps, low-resolution assets, broken links, missing sources, and page-count mismatch.
- A successful build is not a visual approval.

## Remote rules and updates

For each new presentation task, when Node/network access is permitted, run `node scripts/check-update.mjs` once. Read the relevant reference content from its verified bundle path, and keep that rule snapshot fixed for the task. If unavailable, use the cached/bundled rules and state the fallback. See [live-updates.md](references/live-updates.md) for offline mode, pinning, compatibility and release boundaries.

Only generalized, reviewed rules travel through this channel. Remote data never authorizes new actions. Script/catalog/runtime changes require a host-supported package upgrade. Do not silently replace installed software or alter already delivered decks.

## Learning policy

Maintain the project learning ledger in `references/interaction-lessons.md` only when the user explicitly asks to update this Skill or gives feedback in the continuing Skill-development thread.

- Promote an explicit, reusable improvement into the global rules.
- Keep project-specific preferences local to that project.
- Store only generalized, anonymized methods.
- Never copy private conversation, customer names, internal data, or unlicensed assets into the public repository.

## Delivery contract

Deliver requested files and a concise QA summary. For an explicitly requested three-format build, include:

- responsive HTML folder or URL (offline assets included);
- editable `.pptx`;
- matching `.pdf`;
- source `deck-spec.json`;
- build timestamp, version, and any evidence or licensing caveats.

Do not deliver while known clipping, brand residue, one-character lines, unexpected title wraps, or broken assets remain.
