# Source images

Put original, full-resolution files here and run `npm run assets`. Optimised WebP versions are written to `public/images/<folder>/` and the asset manifest is regenerated. Components then pick up the approved images automatically.

```
assets-source/
  brand/       logo.png | logo.svg (svg can go straight into public/images/brand/), hero-packaging.png
  products/    <product-slug>.png          transparent packshot, ≥ 2000 px tall
  lifestyle/   <product-slug>-kitchen.jpg  editorial kitchen photograph
  landscapes/  landscape photography
```

Product slugs are listed in `src/data/products.ts`.

Raw source files are git-ignored so the repository stays small. Only the optimised WebP files in `public/images/` are committed.

Packaging and logo files are converted at high quality (q92, alpha preserved, max 2000 px) to keep label typography sharp. Do not upscale or redraw packaging artwork: the supplied files are the source of truth.
