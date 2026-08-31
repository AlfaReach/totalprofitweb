# v13 — final adversarial review of v12

Seven files changed. No design changes: **homepage height 7,820px before and after**, identical.

All validation below was run against a production build served locally, with the Soro feed replaced by a replica that produces **47 articles across 3 pages** — enough to exercise real pagination rather than the single-page case that earlier tests were limited to.

---

## 1. What I found

### Dead primary CTA on `/za-nas` — real conversion bug

`components/about.tsx` renders on **both** `/` and `/za-nas`, and its CTA linked to a bare same-page anchor `#contact-form`. `/za-nas` does not render `<Contact />`, so that anchor doesn't exist there. **The main button on the About page did nothing.** Confirmed by anchor-resolution test across all page types:

```
/za-nas    #contact-form present: false   bare anchors: #contact-form   BROKEN: ['#contact-form']
```

Every other anchor on every other page resolves — including `/gdd`'s `#form`, which is fine.

### Unbounded 200-duplicate parameter space on `/blog`

Canonicals were already correct, but **every invalid variant still served a full 200 with identical content**: `?page=999`, `?page=0`, `?page=-5`, `?page=abc`, `?page=2.5`, `?tema=bogus`, `?tema=DDS`, `?foo=bar`, and combinations. A canonical tag is a hint; the duplicate was still being crawled and served.

### Hardcoded review count

`googleRating.count = 19` was rendered as *"5.0 от 19 отзива в Google"*. That number changes with every new review and silently goes stale.

### Author pages remain thin

45–53 words each, six of them, indexable and in the sitemap.

---

## 2. What I changed

### `app/blog/page.tsx` — invalid parameters now 308 to the canonical URL

One canonical shape per listing view; anything else redirects. Verified as a **fixed point — one hop, no loops**:

| Request | Result |
|---|---|
| `/blog` | 200 · `index, follow` |
| `/blog?page=2`, `?page=3` | **200** · self-canonical · `noindex, follow` *(legitimate pagination preserved)* |
| `/blog?page=4` (out of range) | **308** → `/blog` |
| `/blog?page=1` (redundant) | **308** → `/blog` |
| `/blog?page=0` · `-5` · `abc` · `2.5` | **308** → `/blog` |
| `/blog?tema=dds` | 200 · self-canonical · `noindex, follow` |
| `/blog?tema=dds&page=2` (out of range for 12 DDS posts) | **308** → `/blog?tema=dds` |
| `/blog?tema=trz&page=1` | **308** → `/blog?tema=trz` |
| `/blog?tema=bogus` · `?tema=DDS` · `?foo=bar` | **308** → `/blog` |
| `/blog?post=<known>` | 200 unchanged |
| `/blog?post=<unknown>` | **404** unchanged |

Unknown parameters are dropped rather than preserved, so tracking-style junk can't mint URLs either. Topic filters and real pagination are untouched.

### `components/about.tsx` — CTA fixed

`#contact-form` → `/#contact-form`. Works from both pages; on `/` it still scrolls in-page. Comment added so the next person doesn't "simplify" it back. Verified in a browser: `/za-nas` primary CTA href is now `/#contact-form`.

### `lib/reviews.ts` + `components/testimonials.tsx` — count removed

Now renders **"5.0 в Google"**. The rating is stable; the count isn't, and the link goes to the live profile for the current figure. Layout unchanged — same three cards, same discreet rating line.

### `lib/authors.ts` + author page + sitemap — profiles set to `noindex, follow`

My reasoning, since you asked me to decide: each profile carries the person's name, role and specialty — **all three of which already appear on `/za-nas`**. An indexed profile is therefore a ~50-word near-duplicate of a slice of `/za-nas` with nothing added, six times over. That is a page that shouldn't be in the index *yet*, rather than one that should be deleted.

What is preserved: the pages stay live and linked, the team cards still point at them, `Person.url` still resolves there, `ProfilePage` + `Person` + `BreadcrumbList` schema is intact, and `follow` keeps link equity flowing. They're removed from the sitemap, because asking Google not to index a URL while submitting it is a contradiction.

One flag controls all of it:

```ts
// lib/authors.ts
export const authorPagesIndexable = false
```

Flip to `true` the moment real bios land — metadata and sitemap both read it. **I did not pad them with invented credentials.**

### `app/blog/page.tsx` — paginated description differentiated

`/blog` and `/blog?page=2` shared a meta description. Immaterial (page 2+ is `noindex`), fixed anyway at zero cost: page 2+ now appends `Страница N.`

---

## 3. What I deliberately did not change

**`/gdd`** — left exactly as it is, indexable, in the sitemap, `#form` anchor resolving correctly. I agree it should accumulate history as an evergreen seasonal page. No factual or technical issue found.

**The 404 page needing JavaScript.** Still true, still isolated: `/foo/bar/baz` (no matching route) server-renders the 404 fully; `/does-not-exist` (hits the async root catch-all → `notFound()`) delivers it only in the RSC payload. Fixing it means moving the root-slug redirect into Node-runtime middleware — touching the routing layer for a cosmetic gain on pages that are `noindex` anyway and that Googlebot renders. Not worth it before a deploy.

**Article `author` = Organization.** Correct for machine-drafted content. The `reviewedBy` path stays open for when a human actually reviews.

**Soro automation, snapshot, caching, schema, service pages, internal-link architecture, header, footer, hero, homepage sections.** No verified bug, so untouched.

**Homepage copy.** No slabs added. Nothing added at all.

---

## 4. Validation run

| Check | Result |
|---|---|
| `tsc --noEmit` | clean |
| `next build` | clean · 38 routes |
| **Served** sitemap (not source) | **64 URLs · 40 article `?post=` URLs · 48 lastmod · 0 author URLs** · valid XML declaration · no unescaped `&` |
| Internal-link crawl from `/` | **85 pages reachable · 0 orphans** |
| `/ceni` `/za-nas` `/kontakti` `/gdd` `/godishno-priklyuchvane` `/schetovodstvo-za-svobodni-profesii` `/redakcionna-politika` | all reachable, none orphaned |
| Schema integrity, 15 page types incl. filtered + paginated | valid JSON · **no duplicate `@id`** · **no dangling `@id` refs** · exactly 1 H1 each |
| Duplicate titles / descriptions | **none** |
| GEO facts in server-rendered prose | Total Profit · Тотал Профит ЕООД · счетоводна кантора · София · Баба Вида · phone · email · ЕИК — **present on all 8 page types tested**, scripts stripped |
| No-JS word counts | home 939 · article 1,251 · sch-обслужване 655 · ТРЗ 561 · ceni 455 · blog 453 · kontakti 292 · za-nas 280 |
| robots.txt | `*`, OAI-SearchBot, ChatGPT-User, GPTBot, ClaudeBot, PerplexityBot, Google-Extended all `Allow: /` · `Disallow: /api/` · Host + Sitemap declared |
| `X-Robots-Tag` headers | **none anywhere** — no accidental header-level noindex |
| Accidental `noindex` on commercial URLs | none — `/`, service pages, `/ceni`, `/blog`, articles all indexable |
| Soro routing | `?post=<known>` 200 · `?post=<unknown>` **404** · `/blog/<slug>` 308 · `/politika-za-poveritelnost` 308 |
| Mobile 390px + desktop | **no horizontal overflow** on 7 page types |
| Console / network | **zero** non-blob 4xx/5xx, zero page errors |
| Homepage height | **7,820px — identical to v12** |

*(The `blob.vercel-storage.com` 403s in my logs are my sandbox's egress blocking your image host; they resolve on Vercel. `/statia-dds-0` 404s locally rather than redirecting because `data/soro-snapshot.xml` ships as the empty placeholder — I verified this exact redirect works once the snapshot is populated.)*

---

## 5. Still needs you

1. **The three Google reviews in `lib/reviews.ts`** — verify verbatim against the live profile. Two are marked `excerpt: true` because I could confirm their opening but not their full text; drop that flag once you paste the complete version and the ellipsis and link disappear. `F. Arnaudov` is deliberately excluded as it appears to be you.
2. **The address** — everything is consistent on ул. „Баба Вида" 1, matching your GBP. Confirm it is the operating office.
3. **The performance claims** — *до 30% · 98% · 0 глоби · 500+* stay out until evidenced.
4. **Author bios** — real detail from the team flips `authorPagesIndexable` to `true` and makes six pages worth indexing.
5. **First Vercel build log** must say `[soro-snapshot] saved N items`.
6. **GSC baseline before deploy**, especially the `трз услуги софия` position.

---

## 6. Design confirmation

Homepage: **7,820px before, 7,820px after.** No sections added or removed, no restyling, no copy changes. The only visible differences anywhere on the site are the review rating line reading *"5.0 в Google"* instead of *"5.0 от 19 отзива в Google"*, and a button on `/za-nas` that now works.
