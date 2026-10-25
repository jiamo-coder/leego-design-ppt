# Leego Design PPT

2.2.0 · 2026-10-25

Presentation design rules and portable output helpers for standard Agent Skills hosts. Preserve existing templates and generate the formats the user requests. Node.js 20+ is required for scripts. No Codex-only runtime, credentials or paid API is required.

## Install and share

Download `public/downloads/leego-design-ppt-2.2.0.zip`. Its root contains SKILL.md, references, assets, scripts and dependency manifests. WorkBuddy: Experts / Skills / Connectors → Skills → Add Skill → Upload Skill. For other hosts use their supported custom-skill import or extract into their documented skill folder. A pasted URL is not a universal installation mechanism.

Read [host installation and fallbacks](skill/leego-design-ppt/references/compatibility.md) and [test coverage](COMPATIBILITY-REPORT.md). 豆包工作 native import is not assumed tested. The instruction-only fallback can use a host’s presentation tools when it cannot execute scripts.

Inside the extracted skill directory:

```sh
node scripts/doctor.mjs
npm ci --ignore-scripts
node scripts/build-pptx.mjs --input /path/to/deck-spec.json --output /path/to/deck.pptx
node scripts/build-web.mjs --input /path/to/deck-spec.json --output /path/to/web
node scripts/export-pdf.mjs --input /path/to/deck.pptx --output /path/to/deck.pdf
```

PDF conversion needs LibreOffice or an export from PowerPoint/WPS. Set LIBREOFFICE_PATH if it is not found automatically. The public package does not redistribute fonts. Prefer licensed MiSans; set `style.fontFace` to a real installed CJK fallback if needed.

## Design decisions and continuous rules

The Skill selects by scenario, page intent, evidence shape and approved branding. Eight original style families guide the 20 existing baseline page purposes; there are two implemented color themes. External reviewed case count is zero, and the proposed 30-pattern/20-component research library is a future target.

Run `node scripts/plan-design.mjs --input /path/to/brief.json --output /path/to/plan.json`. Resolve evidence, capacity and custom-rendering requirements before building. See [design decisions](skill/leego-design-ppt/references/design-decision.md).

Clients 2.2+ check reviewed rules once at the start of each new task with `node scripts/check-update.mjs`. Verified data is cached; offline or failed verification preserves the last usable snapshot. `--offline` and `--pin` are available. Scripts and dependencies still require a package upgrade. Existing 2.0/2.1 users must upgrade once; delivered decks are never modified. See [update behavior](skill/leego-design-ppt/references/live-updates.md).

## Repository development

`npm install` installs website dependencies. The Skill uses its own lockfile: `npm ci --ignore-scripts --prefix skill/leego-design-ppt`.

`npm run test:portable` tests the public exporter with Unicode paths, native objects and invalid input. `npm run deck:all` builds the synthetic example. `npm run release:build` creates a root-entry ZIP, SHA-256 file and local manifest. `npm run skill:install` updates local Codex Skill files, but does not publish externally.

Publish verified resources first, `latest.json` last, only with release authorization. The trusted source is `https://raw.githubusercontent.com/jiamo-coder/leego-design-ppt/main/`. Remote rules are text/data, never automatically executed or installed.
