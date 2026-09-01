# PPTX and PDF generation

## PPTX

- Use the bundled `@oai/artifact-tool` runtime.
- Preserve text, images, charts, tables, and basic geometry as editable objects.
- Use the same slide order, theme tokens, text, and focal decisions as the web deck.
- Render each slide to PNG and export its layout JSON.
- Inspect every rendered page and run overflow/overlap checks before export.

## PDF

- Create the PDF from the final high-resolution slide renders, not from a separate layout implementation.
- Use lossless PNG input and one image per page at the presentation aspect ratio.
- Confirm page count, order, crop, font rendering, and clarity after reopening.
- Render the PDF back to PNG and compare page dimensions with the source renders.

## Consistency contract

Visible titles, body copy, slide numbers, citations, and image treatment must match across HTML, PPTX, and PDF. If a platform requires a small adaptation, record it in the build report.
