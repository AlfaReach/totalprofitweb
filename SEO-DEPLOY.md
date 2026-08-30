# Total Profit — deployment notes (v10)

## What this version is

This revision keeps the original conversion-first homepage visual language while restoring the SEO/GEO architecture that was accidentally weakened in v9.

### Homepage
- Original-style conversion H1 is preserved: `Плащате повече данъци, отколкото трябва?`
- The local/category signal sits in the small hero eyebrow: `Счетоводна кантора Total Profit · София`.
- No large SEO text slab was reintroduced.
- A compact collapsed 6-question FAQ adds useful semantic depth and contextual internal links without turning the homepage into a long content wall.
- Primary CTA buttons go directly to `/#contact-form`.
- Unsupported claims such as `до 30%`, `98%`, `0 глоби`, and `10+ часа` were removed from visible conversion copy.

### Internal architecture
- Main navigation uses real page URLs rather than fragment-only links.
- A compact crawlable footer links all important service, pricing, contact, trust, GDD and editorial pages.
- `/za-nas`, `/kontakti` and `/ceni` retain the cleaner inner-page layout but regain useful content.
- Six team profile pages are restored and linked from `/za-nas`; automated blog articles remain Organization-authored unless a real human review is explicitly recorded in future.
- Service pages show six FAQs and compact related-service links.

## Automated Soro blog

No manual approval is required.

1. Soro publishes to its RSS feed.
2. TotalProfit.bg reads the RSS automatically and revalidates hourly.
3. Articles are server-rendered at their existing `/blog?post=<slug>` URLs.
4. Metadata, canonicals, Article/Breadcrumb schema, classification, service links, related articles, sitemap entries and first-party RSS are generated automatically.
5. A build-time snapshot in `data/soro-snapshot.xml` protects known articles if the live feed fails or unexpectedly shrinks.
6. Unknown `?post=` values 404 when the live feed is healthy; outage fallbacks are `noindex,follow` rather than indexable thin pages.

The Soro hardening files from the reviewed v9 base are intentionally unchanged in v10:
- `lib/soro.ts`
- `scripts/snapshot-soro.mjs`
- `app/blog/page.tsx`

## Local identity / Google Maps

Website Sofia address:

**ул. „Баба Вида“ 1, 1510 София**

The site links and embeds the Google Maps business profile with CID `2622626184120857348`. The same profile is referenced from structured data and the reviews/contact areas.

## Reviews

The homepage review section keeps a clean three-card visual rhythm without inventing Google reviews:
- one known real Google review supplied by the owner (Ivo Ivo);
- one factual current Google rating/profile card;
- one Google Maps/location card.

No self-serving Review/AggregateRating schema is emitted.

## First deployment checks

1. Deploy to the existing Vercel project.
2. Confirm the build succeeds.
3. Confirm the prebuild log shows `[soro-snapshot] saved <N> items`. If it says the refresh was skipped, the snapshot safety net has not populated yet.
4. Check `/blog?post=trz-uslugi-sofia` for full server HTML, its own title and self-canonical.
5. Check `/blog?post=THIS-DOES-NOT-EXIST` returns 404 while the live feed is healthy.
6. Check `/sitemap.xml` contains the service pages, author profiles and automated article URLs.
7. Submit/resubmit `https://www.totalprofit.bg/sitemap.xml` in Google Search Console.
8. Request indexing for `/`, `/ceni`, `/schetovodno-obsluzhvane`, `/trz-uslugi-sofia`, `/za-nas` and `/kontakti`.
9. Set `CRON_SECRET` and `INDEXNOW_KEY` if the scheduled IndexNow endpoint is used. `SORO_RSS_URL` is optional because the current public feed URL is already configured.
10. Do not mass-merge historical articles until GSC data shows which URLs already carry search value.

## Validation in this workspace

The v9 review found a real missing-export build error. v10 fixes that (`teamMembers` is exported) and additionally ran:
- TypeScript/TSX syntax transpilation across the source tree;
- local named/default import-to-export validation;
- alias-import resolution checks;
- unsupported-claim scan;
- U+FFFD encoding scan;
- route-link presence checks;
- byte-comparison confirming the reviewed Soro hardening files were not changed.

This workspace still does not contain installed project dependencies, so a dependency-aware `next build` cannot be rerun here. Vercel should remain the final production build gate.
