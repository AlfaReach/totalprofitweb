import type { Metadata } from "next"
import Link from "next/link"
import { notFound, permanentRedirect } from "next/navigation"
import { ArrowRight, Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { InnerHeader } from "@/components/inner-header"
import { Footer } from "@/components/footer"
import { LegacySoroWidget } from "@/components/legacy-soro-widget"
import { BlogArticlePage } from "@/components/blog-article-page"
import { blogPostHref, getAllBlogPosts, getRelatedPosts } from "@/lib/posts"
import { getSoroPostStateBySlug } from "@/lib/soro"
import type { BlogCluster } from "@/lib/blog-data"
import { siteConfig } from "@/lib/site-config"

export const revalidate = 3600
const PAGE_SIZE = 18

const clusterLabels: Record<BlogCluster, string> = {
  dds: "ДДС",
  trz: "ТРЗ",
  registraciya: "Регистрация на фирма",
  nap: "НАП и проверки",
  danaci: "Данъци",
  godishno: "Годишно приключване",
  online: "Онлайн бизнес",
  "svobodni-profesii": "Свободни професии",
  schetovodstvo: "Счетоводство",
}

function resolveCluster(tema?: string): BlogCluster | undefined {
  return tema && Object.prototype.hasOwnProperty.call(clusterLabels, tema) ? (tema as BlogCluster) : undefined
}

type SearchParams = Record<string, string | string[] | undefined>

/**
 * Click-tracking parameters. These are NEVER redirected away and never appear in a
 * canonical — Google Ads (`gclid`/`gbraid`/`wbraid`), Meta (`fbclid`), Microsoft
 * (`msclkid`) and manual `utm_*` tagging all read the landing URL. Stripping them
 * with a redirect silently breaks campaign attribution: the browser lands on the
 * cleaned URL and the analytics beacon fires with the tag already gone.
 *
 * They are excluded from the "is this URL canonical?" comparison instead, and carried
 * through whenever a redirect does have to happen for some other reason.
 */
const TRACKING_PARAMS = new Set([
  "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "utm_id",
  "gclid", "gbraid", "wbraid", "dclid", "fbclid", "msclkid", "ttclid", "yclid",
  "li_fat_id", "igshid", "mc_cid", "mc_eid", "_gl",
])

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value
}

function trackingQuery(params: SearchParams) {
  const query = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (!TRACKING_PARAMS.has(key)) continue
    const v = first(value)
    if (v !== undefined) query.set(key, v)
  }
  return query
}

/** Every param that is not click tracking, in a stable comparable form. */
function meaningfulQuery(params: SearchParams) {
  const query = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (TRACKING_PARAMS.has(key)) continue
    const v = first(value)
    if (v !== undefined) query.set(key, v)
  }
  query.sort()
  return query.toString()
}

/**
 * The one canonical shape. An article is exactly `?post=<slug>`; a listing is a known
 * `tema` then an in-range `page`. Unknown filter values, page 0/-5/abc, out-of-range
 * pages and stray parameters are all dropped.
 */
function canonicalQuery(params: SearchParams, maxPage: number) {
  const query = new URLSearchParams()
  const post = first(params.post)
  if (post) {
    query.set("post", post)
    return query
  }
  const cluster = resolveCluster(first(params.tema))
  if (cluster) query.set("tema", cluster)
  const requested = Number.parseInt(first(params.page) || "1", 10)
  if (Number.isInteger(requested) && requested > 1 && requested <= maxPage) query.set("page", String(requested))
  return query
}

function canonicalPath(params: SearchParams, maxPage: number) {
  const qs = canonicalQuery(params, maxPage).toString()
  return `/blog${qs ? `?${qs}` : ""}`
}

/**
 * Where to send a request whose meaningful params are not already canonical.
 * Tracking params ride along so attribution survives the redirect.
 */
function redirectTarget(params: SearchParams, maxPage: number) {
  const query = canonicalQuery(params, maxPage)
  for (const [key, value] of trackingQuery(params).entries()) query.append(key, value)
  const qs = query.toString()
  return `/blog${qs ? `?${qs}` : ""}`
}

/** True when the meaningful part of the request already matches the canonical form. */
function isCanonicalRequest(params: SearchParams, maxPage: number) {
  const canonical = new URLSearchParams(canonicalQuery(params, maxPage))
  canonical.sort()
  return meaningfulQuery(params) === canonical.toString()
}

function absoluteBlogUrl(params: SearchParams, maxPage = 1) {
  return `${siteConfig.url}${canonicalPath(params, maxPage)}`
}

export async function generateMetadata({ searchParams }: { searchParams: Promise<SearchParams> }): Promise<Metadata> {
  const params = await searchParams
  const postParam = first(params.post)
  if (postParam) {
    const { post } = await getSoroPostStateBySlug(postParam)
    const url = absoluteBlogUrl(params)
    if (post) {
      return {
        title: { absolute: `${post.title} | Total Profit` },
        description: post.description,
        alternates: { canonical: url },
        authors: [{ name: "Total Profit", url: `${siteConfig.url}/za-nas` }],
        openGraph: {
          title: post.title,
          description: post.description,
          url,
          siteName: siteConfig.name,
          locale: "bg_BG",
          type: "article",
          publishedTime: post.date,
          modifiedTime: post.updatedAt || post.date,
          images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: post.title }],
        },
        twitter: { card: "summary_large_image", title: post.title, description: post.description, images: [siteConfig.ogImage] },
      }
    }
    return {
      title: { absolute: "Временно недостъпна публикация | Total Profit" },
      description: "Публикацията е временно недостъпна от автоматичния блог източник.",
      alternates: { canonical: url },
      robots: { index: false, follow: true },
    }
  }

  const cluster = resolveCluster(first(params.tema))
  // Resolve the real page count so an out-of-range ?page= canonicalises to /blog
  // instead of minting a distinct URL for content that is really page 1.
  const allPosts = await getAllBlogPosts()
  const scoped = cluster ? allPosts.filter((post) => post.cluster === cluster) : allPosts
  const maxPage = Math.max(1, Math.ceil(scoped.length / PAGE_SIZE))
  const requestedPage = Math.max(1, Number.parseInt(first(params.page) || "1", 10) || 1)
  const page = Math.min(requestedPage, maxPage)
  const url = absoluteBlogUrl(params, maxPage)
  return {
    title: {
      absolute: cluster
        ? `${clusterLabels[cluster]} — статии | Total Profit`
        : page > 1
          ? `Счетоводен блог — страница ${page} | Total Profit`
          : "Счетоводен блог: данъци, ДДС и ТРЗ | Total Profit",
    },
    description: cluster
      ? `Статии по темата „${clusterLabels[cluster]}" от счетоводния блог на Total Profit.${page > 1 ? ` Страница ${page}.` : ""}`
      : `Практични материали за счетоводство, данъци, ДДС, ТРЗ и управление на фирма от Total Profit.${page > 1 ? ` Страница ${page}.` : ""}`,
    alternates: { canonical: url },
    // Topic filters exist for navigation and topical grouping, not as landing pages:
    // self-canonical (no contradictory signal) but kept out of the index, with links followed.
    robots: { index: page === 1 && !cluster, follow: true },
    openGraph: {
      title: "Счетоводен блог | Total Profit",
      description: "Практични материали за счетоводство, данъци, ДДС и ТРЗ.",
      url,
      siteName: siteConfig.name,
      locale: "bg_BG",
      type: "website",
      images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: "Total Profit блог" }],
    },
  }
}

export default async function BlogPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams

  const postParam = first(params.post)
  if (postParam) {
    // An article is exactly ?post=<slug> (plus any click tracking). Anything else
    // — ?post=X&foo=bar, a stray &page=, reordered params — normalises first, so the
    // article has one URL rather than an open-ended set of 200s.
    if (!isCanonicalRequest(params, 1)) permanentRedirect(redirectTarget(params, 1))

    const { post, liveOk } = await getSoroPostStateBySlug(postParam)
    if (post) {
      const related = await getRelatedPosts(post)
      return <BlogArticlePage post={post} canonicalUrl={absoluteBlogUrl(params)} related={related} />
    }
    if (liveOk) notFound()

    return (
      <div className="min-h-screen bg-background">
        <InnerHeader />
        <main>
          <section className="bg-foreground py-16 text-background"><div className="mx-auto max-w-4xl px-6 lg:px-8"><h1 className="text-3xl font-bold">Публикацията е временно недостъпна</h1><p className="mt-3 text-background/65">Опитваме резервния източник на публикацията. Страницата не се индексира, докато основният RSS източник е недостъпен.</p></div></section>
          <section className="py-14"><div className="mx-auto max-w-4xl px-6 lg:px-8"><LegacySoroWidget /></div></section>
        </main>
        <Footer />
      </div>
    )
  }

  const allPosts = await getAllBlogPosts()
  const activeCluster = resolveCluster(first(params.tema))
  const filteredPosts = activeCluster ? allPosts.filter((post) => post.cluster === activeCluster) : allPosts
  const requestedPage = Math.max(1, Number.parseInt(first(params.page) || "1", 10) || 1)
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / PAGE_SIZE))

  // Serve one URL per listing view. Unknown filter values, page 0/-5/abc, out-of-range
  // pages and stray params previously each returned their own 200 with identical
  // content — an unbounded crawlable space that canonical tags could only hint away.
  // Click-tracking params are exempt and ride along; the canonical form is a fixed
  // point, so this cannot loop.
  if (!isCanonicalRequest(params, totalPages)) permanentRedirect(redirectTarget(params, totalPages))
  const page = Math.min(requestedPage, totalPages)
  const start = (page - 1) * PAGE_SIZE
  const posts = filteredPosts.slice(start, start + PAGE_SIZE)
  const pageHref = (target: number) => {
    const query = new URLSearchParams()
    if (activeCluster) query.set("tema", activeCluster)
    if (target > 1) query.set("page", String(target))
    const qs = query.toString()
    return `/blog${qs ? `?${qs}` : ""}`
  }

  const listUrl = absoluteBlogUrl(params, totalPages)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${listUrl}#page`,
        url: listUrl,
        name: activeCluster ? `${clusterLabels[activeCluster]} — статии` : "Счетоводен блог",
        isPartOf: { "@id": `${siteConfig.url}/#website` },
        about: { "@id": `${siteConfig.url}/#organization` },
        inLanguage: "bg-BG",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Начало", item: siteConfig.url },
          ...(activeCluster
            ? [
                { "@type": "ListItem", position: 2, name: "Блог", item: `${siteConfig.url}/blog` },
                { "@type": "ListItem", position: 3, name: clusterLabels[activeCluster], item: listUrl },
              ]
            : [{ "@type": "ListItem", position: 2, name: "Блог", item: `${siteConfig.url}/blog` }]),
        ],
      },
    ],
  }

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <InnerHeader />
      <main>
        <section className="bg-foreground pb-14 pt-10 text-background md:pb-16 md:pt-12">
          <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-background/60">Блог</p>
            <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Счетоводни съвети и данъчни новини</h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-background/70">Практични материали за счетоводство, данъци, ДДС, ТРЗ и управление на бизнеса.</p>
          </div>
        </section>

        <section className="border-b border-border bg-secondary/40 py-4">
          <div className="mx-auto flex max-w-7xl flex-wrap gap-2 px-6 lg:px-8">
            <Link href="/blog" className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${!activeCluster ? "bg-foreground text-background" : "bg-background hover:bg-background/70"}`}>Всички</Link>
            {Object.entries(clusterLabels).map(([cluster, label]) => (
              <Link key={cluster} href={`/blog?tema=${cluster}`} className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${activeCluster === cluster ? "bg-foreground text-background" : "bg-background hover:bg-background/70"}`}>{label}</Link>
            ))}
          </div>
        </section>

        <section className="py-14 md:py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            {posts.length === 0 && <p className="text-center text-muted-foreground">Няма публикации в тази категория.</p>}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <article key={`${post.source}-${post.slug}`} className="flex flex-col rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-lg">
                  <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
                    <span className="font-medium">{post.category}</span>
                    <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{new Date(post.updatedAt || post.date).toLocaleDateString("bg-BG")}</span>
                  </div>
                  <h2 className="mt-5 text-xl font-semibold leading-snug"><Link href={blogPostHref(post)} className="hover:underline">{post.title}</Link></h2>
                  <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">{post.description}</p>
                  <Link href={blogPostHref(post)} className="mt-6 inline-flex items-center text-sm font-semibold">Прочетете статията <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </article>
              ))}
            </div>

            {totalPages > 1 && (
              <nav className="mt-12 flex items-center justify-center gap-3" aria-label="Страници на блога">
                {page > 1 ? <Button variant="outline" asChild><Link href={pageHref(page - 1)}><ChevronLeft className="mr-2 h-4 w-4" />Предишна</Link></Button> : null}
                <span className="px-3 text-sm text-muted-foreground">{page} / {totalPages}</span>
                {page < totalPages ? <Button variant="outline" asChild><Link href={pageHref(page + 1)}>Следваща<ChevronRight className="ml-2 h-4 w-4" /></Link></Button> : null}
              </nav>
            )}
          </div>
        </section>

        <section className="bg-secondary py-14">
          <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Имате конкретен казус?</h2>
            <p className="mb-7 mt-3 leading-relaxed text-muted-foreground">Попълнете формата и ще уточним каква информация е необходима.</p>
            <Button size="lg" asChild><Link href="/#contact-form">Безплатен анализ <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
