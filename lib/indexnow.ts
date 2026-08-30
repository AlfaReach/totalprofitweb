import { blogPostHref, getAllBlogPosts } from "@/lib/posts"
import { primaryServices, siteConfig, verticalServices } from "@/lib/site-config"

// IndexNow keys are public verification tokens by design and are served at /indexnow-key.txt.
export const INDEXNOW_KEY = "b02962db02b1b7735cdf15fdfee311bf"

function absolute(href: string) {
  return href.startsWith("http") ? href : `${siteConfig.url}${href}`
}

export async function currentIndexNowUrls() {
  const posts = await getAllBlogPosts()
  const staticUrls = [
    siteConfig.url,
    `${siteConfig.url}/blog`,
    `${siteConfig.url}/ceni`,
    `${siteConfig.url}/za-nas`,
    `${siteConfig.url}/kontakti`,
    ...primaryServices.map((service) => absolute(service.href)),
    ...verticalServices.map((service) => absolute(service.href)),
  ]
  const postUrls = posts.slice(0, 250).map((post) => absolute(blogPostHref(post)))
  return Array.from(new Set([...staticUrls, ...postUrls]))
}

export async function submitIndexNow(urls: string[]) {
  if (!urls.length) return { ok: true, status: 204 }
  const response = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: new URL(siteConfig.url).host,
      key: INDEXNOW_KEY,
      keyLocation: `${siteConfig.url}/indexnow-key.txt`,
      urlList: urls,
    }),
    cache: "no-store",
  })
  return { ok: response.ok || response.status === 202, status: response.status }
}
