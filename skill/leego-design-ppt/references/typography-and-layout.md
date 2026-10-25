# Typography and layout · 2.1.0

## Geometry and units

Default presentation canvas: 1280 × 720 CSS px, 16:9; safe margins 72 px horizontal and 56–64 px vertical. Use an 8 px spacing rhythm and 24–32 px gutters as starting values, not a requirement to rebuild a supplied template.

The native exporter uses 13⅓ × 7½ inches: divide canvas coordinates by 96, and multiply pixel font sizes by 0.75 for points. Do not mix UI px, PPT pt, or native app dp/sp.

| Role | Canvas px | Approximate PPT pt |
|---|---:|---:|
| Cover | 58–72 | 43.5–54 |
| Slide title | 40–48 | 30–36 |
| Key metric | 40–64 | 30–48 |
| Subhead | 26–32 | 19.5–24 |
| Body | 24–30 | 18–22.5 |
| Source note | 14–18 | 10.5–13.5 |

These are ranges, not universal minimums for inherited decks. Check projected readability. The baseline exporter may use smaller supporting copy; revise for audience and viewing distance.

## Typeface and weights

Use MiSans for new Leego-family work when legally available on the render/view host. Body Regular 400, subheads Medium 500, titles/key metrics Semibold 600. Preserve protected brand lettering. Chinese character spacing is zero; never compress glyphs or apply negative tracking to fit copy. Keep original font files out of a distributable Skill.

PPTX regular/bold does not guarantee Medium/Semibold faces or font embedding. Confirm the real rendered face. If MiSans is missing, choose an available CJK family such as Source Han Sans SC or Microsoft YaHei via `style.fontFace`, state the fallback, and inspect actual wrapping. Do not label font unification complete based on a CSS name alone.

## Fit and rhythm

- Retain a common title axis, picture captions and source placement across the deck.
- Keep meaning intact: edit redundancy, widen the right region, change composition or split the page before shrinking text.
- Intentional two-line headlines are acceptable; single-character tails, clipped titles and accidental three-line headings are not.
- Alternate evidence-heavy and synthesis pages. Do not turn every page into three cards or repeat a dashboard shell.
- Preserve content that carries the object, period, unit, denominator, risk or decision. Remove repeated labels and decorative wrappers first.
- Preserve complete UI screenshots, VI sheets and product silhouettes. A detail crop must retain a context view or clearly identify the crop.

Use a restrained accent and whitespace to establish hierarchy. Semantic risk colors are separate from brand color. Motion must have a static equivalent and respect reduced-motion; do not animate numbers from zero as if they were measured progress.
