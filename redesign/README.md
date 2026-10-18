# ScientificSquare — Redesign

A ground-up redesign of the ScientificSquare website. It lives alongside the original site and shares nothing with it.

## Run it

```bash
cd redesign
npm install
npm run dev      # http://localhost:5180
npm run build    # production build in redesign/dist
```

Deploys to Vercel the same way as the original (SPA rewrites are in `vercel.json`).

## Where things live

| Path | What it is |
| --- | --- |
| `src/data/products.ts` | **All product content**: 9 categories, every product, variant, spec, feature and partner link, plus the 4 discipline groupings and the home-page "featured" picks |
| `src/data/company.ts` | Company details, partners, stats, industries, core values, and the hero spec readouts |
| `src/components/ParticleRing.tsx` | The interactive canvas version of the logo (hero, About, CTA) |
| `src/sections/home/*` | Home page sections |
| `src/pages/*` | Home, Products index, Category, About, News & Events, Contact, 404 |

To edit content, change the data files. The pages render from them.

## Routes

`/`, `/products`, `/products/:slug`, `/about`, `/news-events`, `/contact`.
Old links like `/products/detail?product=electrolyzers` redirect to the new URLs.

## Content fixes vs. the original site

- About: removed the "our founder, *our company*" placeholder.
- Home "Water Quality Analyzer" card now lists the parameters it actually measures (matches the product page).
- "24/7 technical assistance" changed to "Dedicated technical assistance…" to match the stated working hours.
- Partner count now reads **8** (derived from the partner list) instead of "7+".
- Featured BerryPURE items credit **Berrytec** (the partner), not "BerryPURE".
- Removed the empty phone link in the footer and the "Map coming soon" placeholder on Contact.
- Removed the splash screen. The hero's particle ring now assembles into the logo as the intro.
- The news date no longer shows as July 23 in some timezones.
