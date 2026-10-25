# Translating Leego UI into presentation standards

Derived from Leego Design UI 2.29.4 and completed presentation iterations, reviewed 2026-10-25. The other Skill is not a runtime dependency.

| Source principle | Presentation rule | Do not import |
|---|---|---|
| MiSans semantic hierarchy | Use available licensed family, 400/500/600 hierarchy, zero Chinese tracking; verify real output | UI 14 px body size as a projected slide standard |
| Stable icon identity and optical sizing | Reuse supplied approved SVG/PNG assets, one semantic family and visually equal slots; use static portable images | Private icon service access, remote scripts, full icon-library copies |
| Data semantics | Same metric keeps name, unit, period, source, denominator and risk meaning across slides | Fake health scores, null→0 conversions, illustrative values as business results |
| Content-driven tables | Keep necessary columns, meaningful order, readable native table and consistent padding; split by row/column groups | Sticky web columns, pagination controls and 20 px as a universal PPT rule |
| Progressive disclosure | Put primary conclusion and evidence on the slide; detail in notes/appendix or a clearly labeled companion demo | Hover-only evidence or essential content visible only during animation |
| Remove repeated containers | One page task, clear main visual, fewer wrappers and repeated headers | Dashboard card walls, login dialogs, sidebars and business form controls |
| Separate state and evidence | Distinguish concept, prototype, local test, published artifact and operational result | Calling a screenshot real integration or an exported file accepted by the recipient |

## Data pictures

Choose a chart for the question: bars for magnitude/rank, lines for time, matrices for comparison, flows for movement, trees for hierarchy. No decorative globe without geographic meaning. Bar charts include a zero baseline; explicitly identify any different scale. Mark units, periods, scope, missingness and source. When values are unknown, preserve that state; do not draw zero. The included basic chart engine rejects missing values; use a custom chart with gaps when needed.

Keep explanatory tables and charts native/editable in PPTX. A screenshot of a real UI remains an image: do not label it an editable dashboard. If SVG is used, verify compatibility or provide a PNG fallback without claiming vector editability.

## Public learning boundary

Publish generalized decisions and synthetic examples. Do not package customer decks, source screenshots, private names, internal numbers, font binaries or client-specific approvals. A project-specific theme, page count, legal clause or decorative choice does not become a universal style rule.
