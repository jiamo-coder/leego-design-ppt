# Leego Design PPT

Leego Design PPT is a presentation system that creates a responsive HTML deck, editable PPTX, and visually matched PDF from one `deck-spec.json`.

## Version

2.0.0 · 2026-09-01

## Local development

```bash
npm install
npm run dev
```

## Build the anonymized example

```bash
npm run deck:all
```

PPTX generation requires the bundled `@oai/artifact-tool` module path in `OAI_WORKSPACE_NODE_MODULES`. The repository contains no private client material; examples and cases are anonymized.

## Install the Skill locally

```bash
npm run skill:install
```

## Release contract

`npm run release:build` creates the ZIP, copies public standards, calculates SHA-256 hashes, and writes `latest.json`. Release resources must be published before the manifest. The fixed trusted origin is:

`https://raw.githubusercontent.com/jiamo-coder/leego-design-ppt/main/`

The Skill never silently self-updates and never executes remote content.
