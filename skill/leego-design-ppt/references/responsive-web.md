# Web presentations · 2.1.0

The Node-only builder copies local assets and produces an offline `index.html` with CSS/JS beside it. No CDN, account, remote image or external font request is added. Paths with spaces and Chinese names are supported.

Desktop presentation mode uses a fixed 1280 × 720 scene scaled to the viewport. Reading mode reflows text and images; mobile starts in reading mode. Tables preserve column relationships through a horizontally scrollable region. Controls: arrows/PageUp/PageDown for slides, O for overview, N for notes, R for reading. Overview shows all pages and clicking a page returns to presentation. Do not claim audience-window synchronization: this version does not implement it.

Keyboard navigation ignores input/editable controls. Storage is per deck and guarded against file-origin restrictions. Touch swipes navigate only in presentation mode, not during vertical reading. No global wheel interception, autoplay or animated number counting. Reduced-motion has a static result.

Check desktop and 390/320 px reading, long titles, table overflow, images, keyboard and overview. A CSS preference or successful build is not a browser test. The included print CSS targets presentation mode; PDF parity is verified by exporting the PPTX instead.
