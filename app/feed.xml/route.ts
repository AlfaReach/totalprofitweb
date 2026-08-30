import { blogPostHref, getAllBlogPosts } from "@/lib/posts"
import { siteConfig } from "@/lib/site-config"

function escapeXml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;")
}

export async function GET() {
  const posts = await getAllBlogPosts()
  const items = posts.map((post) => {
    const link = `${siteConfig.url}${blogPostHref(post)}`
    return `\n    <item>\n      <title>${escapeXml(post.title)}</title>\n      <link>${escapeXml(link)}</link>\n      <guid isPermaLink="true">${escapeXml(link)}</guid>\n      <description>${escapeXml(post.description)}</description>\n      <category>${escapeXml(post.category)}</category>\n      <pubDate>${new Date(post.date).toUTCString()}</pubDate>\n    </item>`
  }).join("")
  const xml = `<?xml version="1.0" encoding="UTF-8" ?>\n<rss version="2.0"><channel><title>Total Profit Blog</title><link>${siteConfig.url}/blog</link><description>Счетоводни и данъчни материали от Total Profit</description><language>bg</language>${items}\n</channel></rss>`
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } })
}
