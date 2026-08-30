import { getAllNativePosts, getNativePostBySlug, type BlogCluster, type BlogPost } from "@/lib/blog-data"
import { getSoroPostBySlug, getSoroPosts } from "@/lib/soro"

const nativeClusterRules: Array<{ cluster: BlogCluster; terms: string[] }> = [
  { cluster: "trz", terms: ["трз", "осигур", "служител", "заплат", "трудов"] },
  { cluster: "dds", terms: ["ддс", "зддс", "данъчен кредит"] },
  { cluster: "registraciya", terms: ["еоод", "оод", "ет", "регистрац"] },
  { cluster: "nap", terms: ["нап", "ревизи", "проверк"] },
  { cluster: "godishno", terms: ["гдд", "годишн", "гфо"] },
  { cluster: "danaci", terms: ["данък", "данъчн", "разход", "облекч"] },
]

function enrichNative(post: BlogPost): BlogPost {
  if (post.cluster) return post
  const text = `${post.title} ${post.description}`.toLowerCase()
  const match = nativeClusterRules.find((rule) => rule.terms.some((term) => text.includes(term)))
  return { ...post, cluster: match?.cluster || "schetovodstvo" }
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const native = getAllNativePosts().map(enrichNative)
  const soro = await getSoroPosts()
  const merged = new Map<string, BlogPost>()
  // Soro supplies the automated stream; native content wins exact slug collisions.
  for (const post of soro) merged.set(post.slug, post)
  for (const post of native) merged.set(post.slug, post)
  return Array.from(merged.values()).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const native = getNativePostBySlug(slug)
  if (native) return enrichNative(native)
  return getSoroPostBySlug(slug)
}

export function blogPostHref(post: BlogPost) {
  return post.source === "soro" ? `/blog?post=${encodeURIComponent(post.slug)}` : `/blog/${post.slug}`
}

export async function getRelatedPosts(post: BlogPost, limit = 3) {
  const all = await getAllBlogPosts()
  return all
    .filter((item) => item.slug !== post.slug)
    .sort((a, b) => {
      const aScore = a.cluster === post.cluster ? 2 : a.category === post.category ? 1 : 0
      const bScore = b.cluster === post.cluster ? 2 : b.category === post.category ? 1 : 0
      if (aScore !== bScore) return bScore - aScore
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
    .slice(0, limit)
}
