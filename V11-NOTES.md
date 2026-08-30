# v11 — ChatGPT's v10 base, six additions

Base is **ChatGPT's v10**, unchanged except for the six items below. Its homepage design, collapsed FAQ, author bios, header, sitemap and footer are kept as they were — after testing both v10s side by side, those were the better implementations.

Verified: `tsc --noEmit` clean · `next build` clean, 38 routes (identical route table to both v10s) · full internal-link crawl from `/` → **zero orphans** · every route probed for status, canonical, robots.

---

## What changed

### 1. `components/home-services-overview.tsx` (new) — compact topical layer on the homepage

**Why.** The homepage targets the two head terms — *счетоводна кантора София* and *счетоводни услуги София* — but carried only six short service cards and collapsed one-sentence FAQ answers. There was no passage in prose stating what the practice actually does, which is what both a search engine assessing topical relevance and an answer engine looking for an extractable passage need.

Four blocks, ~40 words each, in a 2×2 grid using the same eyebrow + H2 pattern as the rest of the page: счетоводно обслужване · ТРЗ · данъчни казуси и годишно приключване · стартиране и регистрации. Each links to its service page with a descriptive anchor.

**Cost:** homepage 673 → **852 words**, page height 7,056px → 7,820px. Still well short of my own v10 (1,221 words / 9,896px), which is the version you correctly said was too heavy.

Placed between `<Services />` and `<About />`.

### 2. Blog topic filters restored — `app/blog/page.tsx`

v10 declared `tema` in its `SearchParams` type but never used it, so `/blog?tema=dds` silently returned the unfiltered hub. Filtering is now implemented, with the nine cluster chips back above the article grid.

Indexation handled explicitly:

| URL | Canonical | Robots |
|---|---|---|
| `/blog` | `/blog` | `index, follow` |
| `/blog?tema=dds` | `/blog?tema=dds` (self) | **`noindex, follow`** |
| `/blog?tema=trz&page=1` | `/blog?tema=trz` (drops redundant `page=1`) | `noindex, follow` |
| `/blog?tema=bogus` | `/blog` | `index, follow` — unknown values fall back to the hub, so no junk parameter space |

The filters exist for navigation and topical grouping, not as landing pages: self-canonical so there is no contradictory signal, out of the index, links followed. `/blog` internal links: 28 → **37**.

### 3. `/kontakti` — local detail

Two short blocks added between the hero and the contact form: office location with district and hours plus a direct link to the Google Business Profile, and what to include in a first enquiry (activity, document volume, VAT status, headcount, international transactions, handover date) linking to `/ceni`.

This is the specificity that separates a real local business page from a template, and the GBP link was previously only in `sameAs` — never visible on the page carrying your 19 reviews.

`/kontakti`: 115 → **208 words**.

### 4. Reviews — three real Google reviews in the original 3-card layout

`components/testimonials.tsx` + new `lib/reviews.ts`.

The v10 section was headed *"Какво казват клиентите"* but only one of the three cards contained anything a client said; the other two were a rating tile and a "here is where Google Maps is" tile. Now all three cards are real reviews from the Google Business Profile (`cid=2622626184120857348`), in the original minimal layout, with one discreet rating line above (*5.0 от 19 отзива в Google*) and a single "Вижте всички отзиви" link below. The map explainer card is gone — the map already lives in Contact.

Reviews live in `lib/reviews.ts` with the sourcing rules written into the file. Two points of honesty built into the component:

- **Excerpts are marked as excerpts.** Elza Pariny's and Elena Miteva's cards render an ellipsis and a "Целият отзив в Google" link, because I could verify their opening verbatim but not their full text. A shortened quote is never presented as a complete one.
- **`F. Arnaudov` is deliberately excluded.** There is a five-star review under that name on the profile; it appears to be you. A testimonial from the owner is a trust liability if anyone notices.

⚠️ **Verify these three against the live profile before deploying.** They were transcribed from my Stage 1 audit of your GBP, not re-read today — Google's consent wall blocked the browser this session. If you replace the two excerpts with reviews you can quote in full, drop `excerpt: true` and the ellipsis and link disappear automatically. Same file holds the `5.0 / 19` rating; update it when the count changes rather than letting it go stale.

### 5. Site thumbnail (OG image) replaced

`public/og-image.jpg` + one line in `lib/site-config.ts`.

Your new banner is now the share thumbnail on every page — link previews in Facebook, LinkedIn, X, Viber, Slack, Messenger, and the `Organization` / `LocalBusiness` `image` in schema.

Two things worth knowing:

- **The old thumbnail was broken.** `public/og-image.jpg` was **1024×1024 (square)**, while every reference in the code declared it as `1200×630`. Platforms were being told one shape and served another, so it was being cropped unpredictably in every preview. Your image is 2400×1260 — exactly 2× the correct 1.91:1 ratio — so it downscaled to 1200×630 with no cropping at all. The declared dimensions are now true.
- **Cache-busted.** `ogImage` is now `/og-image.jpg?v=2`. Facebook, LinkedIn, X and Google cache OG images by URL and would otherwise keep serving the old square one on links already shared. The bare `/og-image.jpg` path still resolves, so nothing breaks. Bump `v=` whenever the image changes.

75 KB, JPEG q92 — no visible artefacts on the text at full size.

Even so, run the previously-shared URLs through **[Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)** and **[LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)** after deploy to force a re-scrape.

### 6. Nothing else

`components/hero.tsx`, `home-faq.tsx`, `header.tsx`, `footer.tsx`, `about.tsx`, `services.tsx`, `results.tsx`, `service-page.tsx`, `blog-article-page.tsx`, `lib/authors.ts`, `lib/soro.ts`, `app/sitemap.ts`, `app/za-nas`, `app/ceni`, `scripts/`, `data/`, `next.config.mjs` — all untouched from ChatGPT's v10.

---

## Measured, all three versions

| | ChatGPT v10 | my v10 | **v11** |
|---|---|---|---|
| `/` main words | 673 | 1,221 | **852** |
| `/` page height | 7,056px | 9,896px | **7,820px** |
| `/kontakti` words | 115 | 198 | **208** |
| `/blog` internal links | 28 | 36 | **37** |
| Blog topic filters | 0 | 9 (indexable) | **9 (noindex, follow)** |
| Pages reachable from `/` | 38 | 47 | **47** |
| Orphan pages | 0 | 0 | **0** |
| `tsc` / `next build` | clean | clean | **clean** |
| Routes | 38 | 38 | **38** |

Unchanged from ChatGPT v10 and confirmed still working: `/ceni` 372 words · `/za-nas` 176 · `/trz-uslugi-sofia` 476 · article pages 862 · 6 FAQs per service page · 6 author pages at 200 · `FAQPage` schema matching visible content · no unsupported performance claims anywhere.

## Soro automation — re-verified untouched

- `/blog?post=<known>` → 200, correct title, self-canonical, server-rendered body
- `/blog?post=<unknown>` → **404**, not an indexable placeholder
- `/blog/<soro-slug>` → 308 → `/blog?post=<slug>`
- `/random-404` → 404 noindex
- Snapshot, `cache()` dedupe, shrink guard, `prebuild` hook all as shipped in v2

## Still open — same two as before

1. **The address.** Everything is consistent on ул. „Баба Вида" 1, matching your GBP. Confirm it is the operating office; if it should be бул. „Владимир Вазов" 17, the GBP has to change too, not just the site.
2. **The performance claims.** *до 30% · 98% остават с нас · 0 глоби · 500+ клиенти* stay out. Tell me which the firm can evidence and I'll restore those with the support stated on the page.

Plus: check the first Vercel build log for `[soro-snapshot] saved N items`, and capture a GSC baseline before deploying.
