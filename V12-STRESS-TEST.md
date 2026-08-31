# v12 — stress test of v11, and the fixes it produced

Adversarial pass over v11 focused on SEO, GEO/LLM visibility, and preserving the look. Everything below was measured on a production build, not read off the source.

**Design impact of this pass: none.** Homepage height is identical at 7,820px before and after; the hero renders pixel-identically. Nothing was restyled.

---

## 1. The serious one: your sitemap was silently dropping every blog article

**Verified, and it has been true since v2.**

```
sitemap() function returns : 34 entries  (4 with ?post= query strings)
Next.js actually serves    : 30 entries  (0 with ?post=)
```

Next's `MetadataRoute.Sitemap` serializer **discards any entry whose `url` contains a query string** — silently. No build warning, no error. Blog articles live at `/blog?post=<slug>`, so **all 88 Soro articles were missing from the sitemap**, including `/blog?post=trz-uslugi-sofia`, the URL currently ranking #1 for *трз услуги софия*.

Only the 7 native `/blog/<slug>` articles were being submitted.

This is the same class of failure as finding C6 in the original audit — articles Google can't discover — applied to the entire automated corpus. I missed it in earlier passes because I only ever counted the sitemap's URLs; I never diffed them against what the function returned.

**Fix.** `app/sitemap.ts` replaced with `app/sitemap.xml/route.ts`, which emits the XML directly: full control over query strings, proper XML escaping (`&` → `&amp;`, so a second parameter can never break the document), real `lastmod` per article, and `lastmod` omitted rather than faked where no real date exists.

```
after: 34 urls · 4 article urls · 12 lastmod   (with your real feed: all 88)
```

Also worth knowing: the sitemap is prerendered at build time with 1h revalidation. If the Soro feed is unreachable during a Vercel build, the first sitemap will be short and then self-heal within the hour — the snapshot covers the article pages themselves in the meantime.

---

## 2. Unbounded `?page=` URL space

`/blog?page=99` returned 200 with `canonical: /blog?page=99` — every out-of-range page number minted its own distinct self-canonical URL for what is really page 1. `noindex` limited the damage, but it was the same shape of bug as the `?post=` one fixed in v2.

The canonical now resolves the real page count first and clamps:

| URL | Canonical | Robots |
|---|---|---|
| `/blog` | `/blog` | index, follow |
| `/blog?page=99` | **`/blog`** | index, follow |
| `/blog?tema=dds` | `/blog?tema=dds` | noindex, follow |
| `/blog?tema=dds&page=50` | **`/blog?tema=dds`** | noindex, follow |

---

## 3. GEO — one real gap, now closed

The no-JS crawler view (what GPTBot, ClaudeBot and PerplexityBot actually get) is in good shape: every page server-renders, and the entity facts are in **prose**, not only in schema — legal name, ЕИК, address, phone, email, city and price anchor all appear as readable text on `/` and `/kontakti`.

The homepage also carries a clean, quotable identity sentence: *"Total Profit е счетоводна кантора в София."*

**The gap:** `/za-nas` had no such sentence — and that page is the `authors` URL declared on every single article, so it is the page an answer engine is most likely to read when asked who Total Profit is. It opened with *"Счетоводен екип с фокус върху ясна комуникация…"*, which never names the entity.

Now:

> **Total Profit (Тотал Профит ЕООД) е счетоводна кантора в София, която обслужва фирми и предприемачи със счетоводство, ТРЗ, данъчни консултации и регистрации.** Екип с фокус върху ясна комуникация, спазени срокове и практична подкрепа за бизнеса.

One sentence, in the existing paragraph slot. No layout change.

---

## 4. `/blog` was the only content page with no page-level schema

Every other page emits a `WebPage`/`Service`/`Article`/`AboutPage`/`ContactPage`/`ProfilePage` node plus `BreadcrumbList`. `/blog` emitted only the site-wide graph. It now emits `CollectionPage` + `BreadcrumbList`, with the breadcrumb extending to three levels on a topic filter (Начало / Блог / ДДС).

---

## 5. A 404 on every homepage and `/gdd` load

`components/hero.tsx` and `app/gdd/page.tsx` both rendered a decorative overlay pointing at `bg-[url('/images/pattern.png')]`. **`public/images/` does not exist** — the file has never been in the repo. Every visit fired a 404 for an element painted at 5% opacity that has never displayed.

Removed both references. Homepage height before and after: **7,820px — identical**. Nothing to see, which was the point.

Console after: **zero non-blob 4xx/5xx** across `/`, `/blog`, `/kontakti`, `/za-nas`, `/ceni` on desktop and mobile. (The `blob.vercel-storage.com` 403s in my logs are my sandbox's egress blocking your image host — they resolve fine on Vercel.)

---

## 6. Known and deliberately not fixed: the 404 page needs JavaScript

Isolated precisely:

| URL | Route it hits | 404 body server-rendered? |
|---|---|---|
| `/foo/bar/baz` | no matching route | **yes** — 131 words, H1 present |
| `/does-not-exist` | `app/[slug]/page.tsx` → `notFound()` | **no** — body is only in the RSC payload |

Confirmed in a real browser with JS disabled: the 404 renders **empty**; a control page (`/ceni`) renders fully. With JS on it renders correctly.

Cause: `notFound()` thrown from an async server component defers the not-found boundary into a streaming chunk. The root catch-all exists to redirect the RSS feed's advertised root-slug URLs, and it must be async because `params` is a Promise.

**Why I left it:** SEO impact is nil — 404s are `noindex` and Googlebot renders JavaScript. The only affected users are those with JS disabled. The fix would mean moving the root-slug redirect into a Node-runtime `middleware.ts`, i.e. touching the routing layer for a cosmetic gain. Not worth the risk now.

**What I did instead:** the 404 page was a bare centred block with two buttons. It now has the site header and footer and **17 internal links** including all seven service pages, so when it renders it is a real navigation surface rather than a dead end.

---

## 7. Checked and clean — no action needed

| Area | Result |
|---|---|
| Titles | 20 pages, all 33–49 chars, **zero duplicates** (one article at 65 — inherent to its real title) |
| Meta descriptions | all 73–157 chars, **zero duplicates** |
| Heading outline | exactly one H1 per page, **no level skips** on any of 12 page types |
| Image alt text | 0 missing, 0 empty across `/`, `/za-nas`, `/avtori/*`, `/blog` |
| JSON-LD | valid on every page; **no duplicate `@id`, no dangling `@id` references** |
| Landmarks | `<main>`, `<header>`, `<footer>`, 3 `<nav>`; `lang="bg"`; viewport correct |
| Mobile | no horizontal overflow at 390px or 1440px |
| Performance | FCP 128–216ms · 282–324KB total · 23–42 requests |
| Orphan pages | **0** (47 reachable from `/`, 34 in sitemap) |
| Soro automation | unknown `?post=` → 404 · `/blog/<slug>` → 308 · root slug → 308 from snapshot · `/politika-za-poveritelnost` → 308 |
| Build | `tsc --noEmit` clean · `next build` clean · 38 routes |

---

## 8. Two things I'd raise but did not change

**Author pages are thin.** The six `/avtori/*` pages run **45–53 words** each. They are indexable and in the sitemap. That is borderline thin-content territory. I did not pad them, because the honest fix is real biographical detail — education, certifications, years in practice — which only the team can supply. Give me a few real sentences per person and they become genuinely useful E-E-A-T pages; until then, consider whether they should be `noindex` and serve purely as internal-link targets. Your call, one line either way.

**Article author is the Organization, not a person.** Correct for machine-drafted content and I would not change it without a human actually reviewing. The `reviewedBy` field proposed earlier is still the upgrade path when you're ready.

---

## Still open — unchanged

1. **The address.** Everything is consistent on ул. „Баба Вида" 1, matching your GBP. Confirm it is the operating office.
2. **The performance claims.** *до 30% · 98% · 0 глоби · 500+* stay out until the firm can evidence them.
3. **The three Google reviews** in `lib/reviews.ts` — verify verbatim against the live profile before deploy.
4. First Vercel build log should say `[soro-snapshot] saved N items`.
5. Capture a GSC baseline **before** deploying, especially the `трз услуги софия` position.
