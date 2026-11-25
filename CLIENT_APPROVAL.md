# Content and assets requiring client approval

Everything below must be confirmed or supplied by Noćko before the site goes live. Items are grouped by priority.

## 1. Brand assets — blocking

| # | Item | Current state in the demo | Needed |
| --- | --- | --- | --- |
| 1.1 | **Refreshed Noćko logo** | An interim vector mark built only from the brief's description (dark-blue oval, yellow outline, green landscape, white lettering). It is **not** the approved logo. | Final logo files (SVG preferred), including a version for dark backgrounds. Drop in as `assets-source/brand/logo.svg`. |
| 1.2 | **Redesigned packaging: Tečni jogurt 1 kg, Domaća pavlaka 800 g** | Labelled "packaging photo in preparation" placeholders | Transparent packshots of the exact approved designs, plus an optional hero composite (`brand/hero-packaging.png`). |
| 1.3 | **Kitchen photographs** of the two redesigned products | Not available, so placeholders are shown | The individual kitchen photographs mentioned in the brief (`lifestyle/tecni-jogurt-1kg-kitchen.jpg`, `lifestyle/domaca-pavlaka-800g-kitchen.jpg`). |
| 1.4 | **Packaging for the other seven products** | Generic line illustrations, clearly marked as placeholders | Approved packshots, if and when the current or new packaging should be shown. |

## 2. Factual content

| # | Item | Shown on the site | Please confirm |
| --- | --- | --- | --- |
| 2.1 | Company name | NOĆKO KOMERC d.o.o. Živinice | Exact legal name and spelling |
| 2.2 | Address | Toplička 2, Kovači, 75270 Živinice, Bosna i Hercegovina | Correct, and that the map pin lands on the right building |
| 2.3 | Contact | info@nocko.eu · +387 35 774 517 | Both are monitored and may be published |
| 2.4 | Founding year | 1996 | Correct. It drives the "30 years, 1996–2026" anniversary emblem. |
| 2.5 | Activities | Milk collection (otkup), processing (prerada) and production of dairy products | Wording is acceptable |
| 2.6 | Product list (9 SKUs) | Names, pack sizes and milk-fat percentages exactly as supplied | Complete and current. Should "Ayran" be written "Ajran" on Bosnian pages? |
| 2.7 | Milk 1 L | Shown as "Mlijeko 1 L, 2,8% m.m." | Exact product name (e.g. fresh, long-life, pasteurised) |
| 2.8 | Timeline | Only 1996 (founding), 2006, 2016 (decade markers) and 2026 (30 years). No milestones were invented. | Any real milestones you would like to add |

## 3. Copy written for the concept (draft)

All of this copy was written for the demo and avoids health, nutrition, ingredient, certification and capacity claims. Please review the tone and accuracy.

- **Hero:** "Dobro dolazi iz prirode." and the supporting text (supplied in the brief).
- **Product descriptions** for all 9 products, in BS and EN (`src/data/products.ts`). These describe usage only, e.g. "uz pitu, burek ili doručak".
- **Farm-to-table, four stages.** These are general descriptions. Stage 02 mentions quality control "accompanying every step from intake to finished product", so please confirm that describes your process.
- **Business cooperation:** retail and distribution, hospitality, partnerships. No distribution agreements, retail locations or terms are claimed, and the page says terms are "agreed individually".
- **About page:** the values section (family, tradition, everyday life).
- **English translations** of all pages, ideally reviewed by a native speaker.

## 4. Photography

- The landscape and lifestyle images are **licensed stock photos from Unsplash**, credited in the footer and captioned "Ilustrativna fotografija". They do **not** show Noćko's farms, suppliers, dairy or products.
- Recommended before launch: a commissioned shoot covering the Kovači/Živinice landscape, milk collection, the dairy (if it may be shown), the team, and product-in-kitchen campaign images.
- The packaging stage of the farm-to-table section deliberately uses an illustration rather than a facility photo.

## 5. Functional decisions

| # | Decision | Demo behaviour |
| --- | --- | --- |
| 5.1 | **Contact form delivery**: an email service (e.g. Resend, Postmark, SMTP) and the recipient address | The form is validated locally and tells the visitor it was **not** sent. It offers a pre-filled email instead. |
| 5.2 | Privacy notice / GDPR text for the form and map | Not included yet. Required once the form sends data. |
| 5.3 | Map provider | Google Maps embed, address-based. Alternatives are OpenStreetMap or a click-to-load map for privacy. |
| 5.4 | Social media links | None shown. Supply verified profiles if wanted. |
| 5.5 | Domain and launch | The site is `noindex` until `NEXT_PUBLIC_ALLOW_INDEXING=true` is set. |
| 5.6 | CMS | Content is local structured data. A CMS (e.g. Sanity, Payload) can be added once the project is approved. |
| 5.7 | Footer disclaimer | "Koncept redizajna — nije zvanična stranica" should be removed at launch (`src/i18n/dictionaries.ts`). |
