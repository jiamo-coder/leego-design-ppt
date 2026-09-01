# Responsive web presentation

## Two modes

Presentation mode preserves the 16:9 stage. Reading mode reflows content instead of shrinking a desktop slide.

Validate reading mode at 1440, 1024, 768, 390, and 320 px. Validate 200% browser zoom.

## Required controls

- Arrow/PageUp/PageDown/Space navigation.
- Wheel navigation with throttling.
- Touch swipe.
- Slide overview.
- Speaker notes view.
- Audience window synchronization when supported.
- Visible progress and current slide number.
- `prefers-reduced-motion` support.

## Implementation rules

- Use semantic HTML and accessible control labels.
- Keep the deck usable without external network requests.
- Use CSS `object-fit: contain` by default for evidence assets.
- Avoid hidden overflow as a substitute for fitting text.
- Use a stable aspect-ratio frame for presentation mode and a linear document flow for reading mode.
- The bundled `assets/web-runtime.css` and `assets/web-runtime.js` are a baseline, not a mandatory brand style.

## Offline behavior

Bundle core runtime, theme, and local assets. If a remote rule or version manifest fails, show the build-time version and continue without blocking the deck.
