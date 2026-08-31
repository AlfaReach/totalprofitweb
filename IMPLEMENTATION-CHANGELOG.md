# Total Profit — implementation changelog

## v10 — conversion shell + restored SEO/GEO architecture
- Fixed the v9 build failure by exporting `teamMembers`.
- Kept the original-style conversion H1 and moved category/location relevance into the hero eyebrow and existing copy.
- Removed unsupported performance claims from hero, services and results.
- Added a compact collapsed homepage FAQ instead of restoring the previous large SEO content block.
- Changed primary navigation from fragment-only anchors to real page URLs while keeping the same clean header styling.
- Restored a compact multi-column footer so commercial/trust pages are crawlable and no longer orphaned.
- Restored six team profile routes and their sitemap entries; linked them from `/za-nas`.
- Expanded `/za-nas`, `/kontakti` and `/ceni` without reverting to the visually heavy v2 shell.
- Restored six FAQs on service pages and compact related-service links.
- Rebuilt reviews as a clean three-card Google-linked section without fabricating additional review quotes.
- Preserved the reviewed Soro snapshot/cache/404 hardening unchanged.
- Preserved Baba Vida 1 as the Sofia address and the original Google Maps embed/profile link.
- Preserved direct-form routing for conversion CTAs (`/#contact-form`).

## Core SEO/GEO foundation retained
- Dedicated service and vertical pages.
- Page-specific canonicals and metadata.
- Dynamic sitemap.
- Organization/AccountingService/LocalBusiness/WebSite entity graph.
- Service/Article/Breadcrumb structured data.
- Server-rendered automated blog content.
- Topic-aware blog internal linking and official-source links.
- Image optimization and configured Vercel Blob hosts.
- Consent-gated analytics.
- First-party RSS and optional IndexNow support.
- AI/search crawler access and experimental `llms.txt`.
