# Assets and brand replacement

## Inventory

For every asset record:

- path and original filename;
- width, height, aspect ratio, file size, and alpha channel;
- intended role: brand, product, VI, packaging, scenario, store, screenshot, evidence, or decoration;
- fit mode and focal point;
- source, license, and reuse restriction;
- minimum acceptable rendered size.

## Fit policy

- `contain`: logos, VI sheets, UI screenshots, diagrams, product cutouts, packaging, labels, and any asset whose full boundary is meaningful.
- `cover`: documentary photography only, with an explicit focal point such as `{ "x": 0.63, "y": 0.42 }`.
- Do not crop text, logos, products, or explanatory marks.
- Do not upscale below-minimum imagery. Replace it, use it smaller, or present it as an evidence thumbnail.

## Logo policy

- Prefer transparent PNG, SVG supplied by the user, or a formally approved master.
- If the only logo has a solid background, create a transparent derivative without changing the mark and keep the original.
- Respect safe space and minimum size from the VI guide.

## Brand replacement protocol

Create a replacement table before reuse:

| Source token | Replacement | Scope | Verification |
| --- | --- | --- | --- |
| old brand name | new brand name | visible text, notes, metadata | case-insensitive scan |
| old English name | new English name | visible text, filenames, alt text | case-insensitive scan |
| old logo | approved logo master | images and flattened screenshots | visual review |

Also scan speaker notes, alt text, document properties, captions, filenames, embedded images, and exported PDF text. Flattened old logos require image editing or exclusion; text replacement alone is insufficient.
