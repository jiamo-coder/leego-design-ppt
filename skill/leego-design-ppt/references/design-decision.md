# Content-driven design decisions

Use for new decks, narrative restructuring or an explicit visual redesign. Preserve approved decks for scoped edits. Read `data/design-library.json` selectively; it contains eight original style families, six scenarios and the 20 existing baseline layouts, not 30 bespoke templates or 20 new visualization engines.

## Decision sequence

1. Extract audience, intended decision, setting (projection or reading), evidence, approved brand, delivery format and page scope. Resolve from the conversation before asking. Do not invent missing business inputs.
2. Choose a scenario and narrative arc. Shareholder review generally moves from operating conclusion to performance evidence, diagnosis and strategic decisions. Brand partnerships need proposition, product/context evidence and cooperation boundaries. Adjust to the real audience.
3. Choose compatible style families, then one coherent deck-wide system. Approved brand constraints take precedence. A data page may combine consulting structure with brand color without randomly changing themes.
4. For each page, identify intent, evidence shape, quantity and readability constraints. Trend → line; magnitude/rank → bar; detailed comparison → table; system layers → architecture; steps → process; real product/screenshot → contain image. Missing values remain missing. Distribution/composition charts require a custom implementation; do not mislabel current bar/line support.
5. Record why the choice fits, what was rejected and what must be split or supplied. `plan-design.mjs` is an explainable baseline selector, not a full aesthetic judge or natural-language author. The agent turns the brief into explicit inputs and applies its reviewed plan to the deck-spec.
6. Build using existing H5/PPTX/PDF tools. Review every changed page. A successful selector test is not proof of visual superiority.

Run from the installed Skill directory:

```sh
node scripts/plan-design.mjs --input /path/to/design-brief.json --output /path/to/design-plan.json
```

Brief shape:

```json
{"audience":"股东","scenario":"shareholder-review","goal":"决定下一年度资源配置","brand":{"approved":false},"delivery":"pptx","slides":[{"id":"trend","intent":"trend","data":{"available":true,"labels":4,"series":1,"hasMissing":false,"unit":"万元","period":"年度","source":"已核实经营台账"}},{"id":"next","intent":"roadmap","items":3}]}
```

Supported intents: cover, conclusion, comparison, architecture, process, roadmap, kpi, decision, photo, screenshot, brand-sheet, trend, ranking, distribution and composition. `ready` means a supported baseline choice; `needs-evidence`, `split-required` and `custom-required` are real work to resolve before rendering. Keep the returned reasons in project notes, not as slide decoration.

The numeric renderer constraints are limits, not content targets. Do not fill all six slots just because a layout permits six items. Basic flow pages support up to four steps; native tables up to seven rows/six columns; charts up to eight labels/three series. Split by meaning before shrinking type.

## Selective knowledge layers

- Style: semantic palette, font roles, contrast and image language.
- Page purpose: opening, argument, comparison, evidence, conclusion.
- Composition: hierarchy, grid, grouping, density, whitespace.
- Visualization: data relationship and valid representation.
- Scenario: audience, decision and evidence requirements.
- Rules/evaluation: selection conditions, exclusions, measured failures and reviewed lessons.

These are classification facets, not six mandatory folders to load on every task. Eight style families are guidance; the bundled renderer currently has two concrete color themes. Do not claim eight fully designed theme implementations.
