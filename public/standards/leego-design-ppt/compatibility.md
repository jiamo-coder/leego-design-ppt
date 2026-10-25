# Installation and host compatibility · 2.2.0

## Package and runtime

The distribution ZIP has `SKILL.md`, `references/`, `assets/`, `scripts/`, `package.json` and a dependency lockfile at its root. It contains no node_modules, user paths, credentials, fonts or client material.

Unzip into a directory named `leego-design-ppt`. Open a terminal in that directory:

```sh
node scripts/doctor.mjs
npm ci --ignore-scripts
node scripts/validate-deck-spec.mjs --input "/path/to/deck-spec.json"
node scripts/build-web.mjs --input "/path/to/deck-spec.json" --output "/path/to/web"
node scripts/build-pptx.mjs --input "/path/to/deck-spec.json" --output "/path/to/deck.pptx"
node scripts/export-pdf.mjs --input "/path/to/deck.pptx" --output "/path/to/deck.pdf"
```

Use real paths in the host environment, with quotes for spaces/Chinese names. Relative image paths resolve from the spec directory, not the terminal working directory. Node.js 20+ is required. HTML needs no npm packages. PPTX needs the locked `pptxgenjs` and `image-size` packages; npm contacts its configured registry only on explicit installation. PDF needs LibreOffice on PATH, `LIBREOFFICE_PATH`, or `--soffice <executable>`; PowerPoint/WPS manual export is also valid. None of the build scripts installs applications automatically or uploads the input.

## WorkBuddy

Official route: Experts / Skills / Connectors → Skills → Add Skill → Upload Skill. Import the root-entry ZIP, enable it and start a new task. Direct conversation installation is documented for marketplace skills; do not promise a pasted GitHub link installs a custom ZIP.

Ask: “使用 Leego Design PPT。先运行环境检查；按随包说明补齐依赖，再生成三页中文示例并打开检查。保留可编辑文本，图片不变形。没有 PDF 转换器时明确说明，不把网页截图称为可编辑 PPT。”

Source checked 2026-10-25: https://www.codebuddy.cn/docs/workbuddy/From-Beginner-to-Expert-Guide/Function-Description/Skills-Market

## 豆包工作

Use the client’s custom-skill import entry if present, and upload the same ZIP. No verified official universal installation command or filesystem path is assumed. If this account cannot import external skills, attach the ZIP to a file/code-enabled task and request extraction and use of SKILL.md plus its referenced files. That is task-local usage, not permanent installation. A chat-only environment cannot run the scripts; use its native presentation tool according to these design rules and disclose which capabilities are unavailable.

## Capability-based fallback

| Environment | Supported path |
|---|---|
| Can read files only | Use narrative and layout rules with the host’s native output tools; no scripted build claim |
| Node.js 20+, no installed packages | Offline HTML and validation |
| Node.js plus locked npm dependencies | Editable PPTX, HTML |
| Above plus LibreOffice / presentation exporter | PDF from final PPTX |

Passing Node builds on macOS does not establish native WorkBuddy or 豆包 import, Windows execution, font availability, or PowerPoint/WPS visual fidelity. Record each tested surface separately. Run doctor in the actual host before promising output. A missing converter is a visible limitation, not a silent switch to a different document.

If a headless converter substitutes fonts or renders Chinese as boxes, pass `--font-dir "/path/to/licensed/fonts"` to export-pdf.mjs. This sets a temporary fontconfig for that export only. Re-render and inspect actual glyphs; a zero exit status is not proof of usable Chinese text. The directory is not copied into the Skill.

## Updates

2.2+ uses the [live rules channel](live-updates.md). Node/network access is needed to check; offline and restricted hosts keep local guidance. This does not grant universal access to another user's Skill directory.
