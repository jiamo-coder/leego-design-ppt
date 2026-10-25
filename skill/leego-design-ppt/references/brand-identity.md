# Leego Design PPT identity · V006

The approved identity is the purple storytelling brick from Leego Design UI's V006 Skill family. The canonical stable ID is **`skill.leego-ppt`**; the Skill invocation remains `leego-design-ppt`. Never use the UI member, an invented letter L, emoji, or retired V001–V005 designs as a replacement.

## Source and use

- Machine-readable mapping, verified SHA-256 values and exact URLs: `assets/brand-identity.json`.
- Web: reference `https://smalltypeui.qiaokiai.com/skills/leego-design-ui/site/icon-api/v1/icons/skill.leego-ppt/app`. Use an image with a fixed slot, `object-fit: contain`, and the professional name alongside it. If unavailable, retain the name without displaying an obsolete mark. Business repositories reference the stable ID rather than maintaining duplicate asset libraries.
- The Skill's own native installation metadata requires relative image paths. `assets/identity/leego-ppt.svg` and `.png` are byte-identical, hash-verified official exports bundled only for this installation/offline need. Do not redraw these or treat them as independent design masters. Native clients receive changes when the package is upgraded; a remote rule refresh cannot replace installed icon files.
- For approved Leego-branded PPTX/PDF or offline H5 delivery, use the catalog's actual PNG variant when SVG is unsupported. Cache verified source bytes in the output workspace and embed/package them so the delivered file stays usable offline. Record the stable ID and SHA-256 in the asset inventory; do not invent a PNG URL or copy an entire icon library.
- Do not add the Skill logo to customer presentations automatically. Preserve the customer's approved brand. This logo identifies the Skill and its own official materials.

## Display constraints

Use the original geometry, colors and 64 × 64 viewBox. Do not crop internal whitespace, add a surrounding colored tile, filter, gradient or shadow. Recommended size: 32–48 px with at least 4 px clear space. Minimum normal size: 24 px; 16 px only for favicon use. Use the verified white variant on a dark background and mono for single-color output when appropriate. Text next to the logo already supplies its accessible name, so the image can use `alt=""`.

## Updates

Before syncing a new family revision, read the provider's stable catalog, verify its SHA-256, resolve the same ID and supported variants, then verify each used asset against its declared hash. Refresh this manifest and the native installation exports together. A successful download does not establish browser or native-client rendering; verify these separately.
