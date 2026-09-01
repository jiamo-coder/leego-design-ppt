# QA, release, and versioning

## Validation layers

1. Semantic: required fields, valid layout IDs, evidence labels, and replacements.
2. Visual: page-by-page render review, typography, whitespace, crop, resolution, contrast.
3. File: openability, page count, ordering, editable PPTX objects, links, and metadata.
4. Safety: banned terms, brand residue, private names, internal data, unlicensed assets, and secrets.

## Automated checks

- invalid or missing `deck-spec` fields;
- unresolved placeholders and TODO markers;
- banned brand terms in JSON, HTML, notes, and extracted PDF/PPTX text;
- single-character lines and accidental title wrapping;
- low-resolution images or missing files;
- PPTX layout overflow and overlap indicators;
- HTML broken assets and external runtime dependencies;
- PDF/PPTX page-count mismatch;
- manifest hashes and resource URLs.

## Release order

1. Validate Skill, scripts, templates, and anonymized examples.
2. Build website, sample HTML/PPTX/PDF, and downloadable Skill ZIP.
3. Calculate SHA-256 for every released resource.
4. Publish resources first.
5. Publish `latest.json` last.
6. Confirm website fallback and remote manifest behavior.

## Versioning

- Patch: typography, copy, QA, and compatibility fixes.
- Minor: new theme, layout, output capability, or formal workflow.
- Major: incompatible `deck-spec` or runtime change.

The Skill does not silently self-update. Remote rules are accepted only from the fixed HTTPS host and only after hash verification.
