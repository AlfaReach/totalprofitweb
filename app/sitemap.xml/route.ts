import { getAllBlogPosts, blogPostHref } from "@/lib/posts"
import { primaryServices, siteConfig, verticalServices } from "@/lib/site-config"
import { authorPagesIndexable, authorProfiles } from "@/lib/authors"

export const revalidate = 3600

/**
 * Hand-written sitemap route instead of Next's `app/sitemap.ts`.
 *
 * WHY: Next's MetadataRoute.Sitemap serializer silently drops any entry whose
 * `url` contains a query string. Blog articles live at `/blog?post=<slug>`, so
 * the generated sitemap returned 34 entries from the function and served only
 * 30 — every automated article was missing, with no warning at build time.
 * That is the entire Soro corpus, including URLs that already rank.
 *
 * Emitting the XML directly keeps full control over query strings, escaping and
 * lastmod. If articles ever move to path URLs, this file can go back to being
 * `app/sitemap.ts`.
 */

type Entry = {
  loc: string
  lastmod?: string
  changefreq?: "daily" | "weekly" | "monthly" | "yearly"
  priority?: number
}

const abs = (href: string) => (href.startsWith("http") ? href : `${siteConfig.url}${href}`)

// & < > " ' must be escaped in XML; `?post=` URLs would otherwise produce invalid XML
// the moment a second parameter is added.
const xml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")

export async function GET() {
  const posts = await getAllBlogPosts()
  const newestPost = posts[0]

  const entries: Entry[] = [
    { loc: siteConfig.url, changefreq: "weekly", priority: 1 },
    { loc: abs("/ceni"), changefreq: "monthly", priority: 0.9 },
    { loc: abs("/za-nas"), changefreq: "monthly", priority: 0.7 },
    { loc: abs("/kontakti"), changefreq: "monthly", priority: 0.8 },
    { loc: abs("/redakcionna-politika"), changefreq: "yearly", priority: 0.4 },
    {
      loc: abs("/blog"),
      lastmod: newestPost ? new Date(newestPost.updatedAt || newestPost.date).toISOString() : undefined,
      changefreq: "daily",
      priority: 0.8,
    },
    { loc: abs("/gdd"), changefreq: "yearly", priority: 0.6 },
    { loc: abs("/privacy-policy"), changefreq: "yearly", priority: 0.2 },
    ...primaryServices.map((s) => ({ loc: abs(s.href), changefreq: "monthly" as const, priority: 0.9 })),
    ...verticalServices.map((s) => ({ loc: abs(s.href), changefreq: "monthly" as const, priority: 0.75 })),
    // Author profiles are noindex until real bios exist (see lib/authors.ts) — a URL
    // we ask Google not to index does not belong in the sitemap.
    ...(authorPagesIndexable
      ? authorProfiles.map((a) => ({ loc: abs(`/avtori/${a.slug}`), changefreq: "yearly" as const, priority: 0.45 }))
      : []),
    ...posts.map((post) => ({
      loc: abs(blogPostHref(post)),
      lastmod: new Date(post.updatedAt || post.date).toISOString(),
      changefreq: "monthly" as const,
      priority: post.source === "soro" ? 0.65 : 0.7,
    })),
  ]

  const seen = new Set<string>()
  const unique = entries.filter((e) => (seen.has(e.loc) ? false : (seen.add(e.loc), true)))

  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    unique
      .map(
        (e) =>
          `  <url>\n` +
          `    <loc>${xml(e.loc)}</loc>\n` +
          (e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>\n` : "") +
          (e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>\n` : "") +
          (e.priority !== undefined ? `    <priority>${e.priority}</priority>\n` : "") +
          `  </url>`
      )
      .join("\n") +
    `\n</urlset>\n`

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  })
}
