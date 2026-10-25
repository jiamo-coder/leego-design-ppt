# PPTX and PDF generation · 2.1.0

Use the public Node.js/PptxGenJS exporter included in the Skill. `npm ci --ignore-scripts` installs locked dependencies; it is a one-time host setup, not part of each build. Run `doctor.mjs` when the environment is unknown. Do not assume `@oai/artifact-tool` or host-private module paths exist.

`build-pptx.mjs` and `build-web.mjs` share `scene.mjs` for content, geometry, theme and estimated text bounds. They preserve ordinary text and shapes, PNG/JPEG images with contain or focal cover, native tables, and bar/line charts. A `*.report.json` file records requested font and the scene; it is structural evidence, not visual acceptance. The narrative catalog is broader than the helper's baseline compositions. Custom compositions should retain the same QA rules rather than force-fitting content to a generic grid.

Use `table: {columns: [...], rows: [[...]]}` or `chart: {type: "bar"|"line", unit, period, labels: [...], series: [{name, values: [...]}]}`. Charts require sources. Complex charts, missing-value gaps and long tables need deliberate custom authoring or pagination. The helper rejects unsupported mixed content instead of silently omitting it.

## PDF from final PPTX

Run `export-pdf.mjs` with LibreOffice or export the final PPTX in PowerPoint/WPS. A private temporary conversion directory isolates the export from other open documents and avoids accepting a stale PDF. Reopen the PDF and check page count, text, image crop and fonts. Different office renderers may vary; record the exporter.

The older `build-pdf.py` remains available for an explicitly requested image-based, pixel-stable PDF from final rendered PNG pages. This produces raster PDF pages, not selectable/editable content. Do not confuse it with native PDF export.

Only deliver requested formats. For PDF-only work a temporary PPTX is implementation detail. If a converter is missing, deliver the available authorized output and report the precise missing capability. Do not claim HTML printing proves PowerPoint fidelity.

If a headless converter substitutes fonts or renders Chinese as boxes, pass `--font-dir "/path/to/licensed/fonts"` to export-pdf.mjs. This sets a temporary fontconfig for that export only. Re-render and inspect actual glyphs; a zero exit status is not proof of usable Chinese text. The directory is not copied into the Skill.
