# Noćko — website concept

A bilingual (Bosnian / English) redesign concept for **Mljekara Noćko** (NOĆKO KOMERC d.o.o., Živinice, est. 1996), built as a production-ready Next.js site for Vercel.

> This is an independent redesign proposal, not the official website. It is kept out of search indexes until the client approves it. Content and assets that still need the client's sign-off are listed in [`CLIENT_APPROVAL.md`](./CLIENT_APPROVAL.md).

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
```

```bash
npm run check        # lint + typecheck + production build
npm run start        # serve the production build
```

Requires Node.js 20.9+.

## Adding the approved logo and packaging

The supplied logo and packaging files were not part of the repository, so the site currently shows a clearly labelled **interim logo** and **"packaging photo in preparation"** placeholders. Nothing invented stands in for real packaging.

To add the real assets:

1. Put the original files in `assets-source/<folder>/` using the names below (PNG/JPG/TIFF; transparent PNG preferred for packshots).
2. Run `npm run assets` — this writes optimised WebP files to `public/images/` and regenerates `src/data/asset-manifest.json`.
3. Every component that has an approved image switches from its placeholder to the real image automatically. No code changes are needed.

| File | Where it appears |
| --- | --- |
| `brand/logo.(svg\|png)` | Header, footer, mobile menu (replaces the interim mark) |
| `brand/hero-packaging.png` | Optional hero composite of yogurt + sour cream on transparent ground |
| `products/<slug>.png` | Packshot: hero (featured products), catalogue, product page with zoom |
| `lifestyle/<slug>-kitchen.jpg` | Kitchen photo: featured products section and lifestyle collage |

Product slugs: `mlijeko-1l`, `jogurt-180g`, `jogurt-500ml`, `jogurt-1l`, `tecni-jogurt-1kg`, `pavlaka-180g`, `domaca-pavlaka-800g`, `ayran-180g`, `ayran-1l`.

SVG logos can also be dropped straight into `public/images/brand/`. Run `node scripts/assets.mjs manifest` (it also runs automatically before `dev` and `build`).

## What's built

**Routes**

| Bosnian | English |
| --- | --- |
| `/` | `/en` |
| `/o-nama` | `/en/about` |
| `/proizvodi` | `/en/products` |
| `/proizvodi/[slug]` | `/en/products/[slug]` |
| `/od-farme-do-stola` | `/en/farm-to-table` |
| `/poslovna-saradnja` | `/en/business` |
| `/kontakt` | `/en/contact` |

Each language has its own root layout, so `<html lang>` is always correct. The BS/EN switcher maps every page, including product pages, to its counterpart.

**Homepage sections:** an immersive hero with parallax and a 30-year (1996–2026) emblem, a typographic marquee, editorial featured products, the brand story with an oval-framed photo and timeline, a sticky-scroll farm-to-table sequence, the lifestyle campaign collage, product categories, business cooperation and a contact band.

**Catalogue:** all 9 products are data-driven from `src/data/products.ts`, with animated category filters (deep-linkable, e.g. `/proizvodi#jogurt`). Product pages have pointer-following image zoom, a spec list, related products and JSON-LD.

**Contact:** the form is validated locally, with accessible errors and focus management. No email service is connected, so a valid submission says plainly that the message was **not** sent and offers a pre-filled email and click-to-call instead. The page also has a Google Maps embed and an "open in maps" link.

**Motion:** uses Motion (`motion/react`) for line-by-line headline reveals, staggered entrances, gentle parallax, filter layout animation, the mobile menu and page transitions. There is no scroll hijacking. `prefers-reduced-motion` is respected globally through `MotionConfig` and CSS.

**SEO and indexing:** per-page metadata with `hreflang` alternates, static Open Graph images per language, `sitemap.xml`, and Organization/Product JSON-LD. While the concept is in review it is not indexed: `robots.txt` disallows everything, pages carry `noindex`, and an `X-Robots-Tag` header is sent. At launch, set `NEXT_PUBLIC_ALLOW_INDEXING=true`.

## Design system

- **Colour:** blue `#073B77`, navy `#06264C`, green `#427B36`, gold `#F4C331`, cream `#F7F4EB`, white. Tokens are defined in `src/app/globals.css`.
- **Type:** Fraunces (display, using its soft/wonky italic for accents) and Manrope (UI and body), both with the `latin-ext` subset for č ć ž š đ.
- **Motifs:** the logo's oval as an image frame, arch-topped product frames, rolling-hill section dividers, a subtle paper grain and engraved-style line illustrations.

## Project structure

```
src/
  app/(bs)/…            Bosnian routes + root layout
  app/(en)/en/…         English routes (root layout in app/(en))
  app/sitemap.ts, robots.ts, global-not-found.tsx, icon.svg
  views/                One view per page, shared by both languages
  components/sections/  Hero, FeaturedProducts, BrandStory, FarmToTable, …
  components/product/   Catalog (filters), ProductVisual (image or placeholder), ZoomImage
  components/layout/    Header (sticky, mobile menu, language switch), Footer
  components/motion/    Reveal, LineReveal, Stagger, Parallax, PageTransition
  data/                 products, company facts, photo credits, asset manifest
  i18n/                 routes per locale + dictionaries
  proxy.ts              Real 404 status for unknown product slugs
scripts/assets.mjs      Image optimisation + manifest generation
```

## Deploying to Vercel

1. Import the repository in Vercel. The framework (Next.js) is detected automatically.
2. Optional environment variables:
   - `NEXT_PUBLIC_SITE_URL`: canonical origin, e.g. `https://www.nocko.ba`. On Vercel it defaults to the production URL.
   - `NEXT_PUBLIC_ALLOW_INDEXING=true`: set only after the client approves launch.
3. Deploy. All pages are prerendered as static files.

## Quality checks performed

- `eslint`, `tsc --noEmit` and `next build` all pass.
- Every page was inspected at 1440, 768 and 390 px, with no horizontal overflow and no console errors.
- An internal link crawl (30 URLs) found no broken links. Unknown product URLs return a real 404.
- Category filters, deep links, language switching and `html[lang]`, the mobile menu (scroll lock, Escape, close on navigation) and contact-form validation were all tested in a browser.
- axe-core (WCAG 2.1 AA) reports no violations at 1440 and 390 px. The third-party map iframe was excluded.
- Cumulative layout shift on the homepage measured 0.00.
- Reduced-motion mode was verified.

## Photography

The landscape and lifestyle photos are licensed from Unsplash. They are used for mood only and are captioned as illustrative, and none of them shows Noćko's farms, facilities or products. Credits are in the footer and in `src/data/photos.ts`. They should be replaced by a commissioned shoot before launch.
