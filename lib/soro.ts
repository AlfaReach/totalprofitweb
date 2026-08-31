import type { BlogCluster, BlogPost, BlogSource } from "@/lib/blog-data"
import { cache } from "react"
import { readFileSync } from "node:fs"
import path from "node:path"

/**
 * The feed is public and was verified during the SEO audit while the Soro widget was active.
 * Keep an env override so the integration can be changed without code, but no env var is
 * required for the current Total Profit account.
 */
export const SORO_RSS_URL = process.env.SORO_RSS_URL || "https://app.trysoro.com/api/rss/1bc9b407-9b52-4106-974c-aa02565173ac"

const OFFICIAL = {
  nra: { label: "Национална агенция за приходите (НАП)", url: "https://nra.bg/" },
  nssi: { label: "Национален осигурителен институт (НОИ)", url: "https://www.nssi.bg/" },
  registry: { label: "Търговски регистър и регистър на ЮЛНЦ", url: "https://portal.registryagency.bg/" },
  nsi: { label: "Национален статистически институт (НСИ)", url: "https://www.nsi.bg/" },
} satisfies Record<string, BlogSource>

const clusterConfig: Array<{
  cluster: BlogCluster
  category: string
  keywords: string[]
  relatedService: { title: string; href: string }
  sources: BlogSource[]
}> = [
  {
    cluster: "trz",
    category: "ТРЗ и осигуряване",
    keywords: ["трз", "заплат", "осигур", "болнич", "майчин", "трудов договор", "чл 62", "чл. 62", "декларация 1", "декларация 6", "персонал", "служител"],
    relatedService: { title: "ТРЗ услуги", href: "/trz-uslugi-sofia" },
    sources: [OFFICIAL.nra, OFFICIAL.nssi],
  },
  {
    cluster: "dds",
    category: "ДДС",
    keywords: ["ддс", "зддс", "данъчен кредит", "воп", "вътреобщност", "vat"],
    relatedService: { title: "ДДС регистрация", href: "/dds-registraciya" },
    sources: [OFFICIAL.nra],
  },
  {
    cluster: "nap",
    category: "НАП и проверки",
    keywords: ["нап", "ревизи", "проверк", "ревизионен акт", "обжал", "данъчна защита"],
    relatedService: { title: "Съдействие при проверки и ревизии от НАП", href: "/danachna-zashtita" },
    sources: [OFFICIAL.nra],
  },
  {
    cluster: "registraciya",
    category: "Стартиране на бизнес",
    keywords: ["регистрац", "еоод", "оод", "едноличен търговец", "учред", "търговски регистър", "стартиране на фирма"],
    relatedService: { title: "Регистрация на фирма", href: "/registraciya-na-firma" },
    sources: [OFFICIAL.registry, OFFICIAL.nra],
  },
  {
    cluster: "godishno",
    category: "Годишно приключване",
    keywords: ["годишн", "гфо", "финансов отчет", "приключване", "чл 92", "чл. 92", "гдд"],
    relatedService: { title: "Годишно счетоводно приключване", href: "/godishno-priklyuchvane" },
    sources: [OFFICIAL.nra, OFFICIAL.nsi],
  },
  {
    cluster: "online",
    category: "Онлайн бизнес",
    keywords: ["онлайн магазин", "електронен магазин", "e-commerce", "ecommerce", "дропшип", "наложен платеж"],
    relatedService: { title: "Счетоводство за онлайн магазин", href: "/schetovodstvo-za-onlayn-magazin" },
    sources: [OFFICIAL.nra],
  },
  {
    cluster: "svobodni-profesii",
    category: "Свободни професии",
    keywords: ["свободна профес", "фрийланс", "самоосигурява", "самоосигуряване", "физическо лице", "зздфл", "зддфл"],
    relatedService: { title: "Счетоводство за свободни професии", href: "/schetovodstvo-za-svobodni-profesii" },
    sources: [OFFICIAL.nra, OFFICIAL.nssi],
  },
  {
    cluster: "danaci",
    category: "Данъци",
    keywords: ["данък", "данъчн", "зкпо", "зддфл", "облекчение", "печалба", "данъчно планиране"],
    relatedService: { title: "Данъчни консултации", href: "/danachni-konsultacii" },
    sources: [OFFICIAL.nra],
  },
  {
    cluster: "schetovodstvo",
    category: "Счетоводство",
    keywords: ["счетовод", "разход", "приход", "документ", "фактур", "отчет", "финанс"],
    relatedService: { title: "Счетоводно обслужване", href: "/schetovodno-obsluzhvane" },
    sources: [OFFICIAL.nra],
  },
]

function decodeXml(value: string) {
  const withoutCdata = value.replace(/^<!\[CDATA\[|\]\]>$/g, "")
  return withoutCdata
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
}

function extract(item: string, tag: string) {
  const escaped = tag.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  const match = item.match(new RegExp(`<${escaped}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${escaped}>`, "i"))
  return match ? decodeXml(match[1].trim()) : ""
}

function safeSlug(input: string) {
  let decoded = input
  try { decoded = decodeURIComponent(input) } catch {}
  return decoded
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^-+|-+$/g, "")
}

function slugFromLink(link: string, title: string, item: string) {
  const explicit = extract(item, "slug") || extract(item, "wp:post_name")
  if (explicit) return safeSlug(explicit)
  try {
    const url = new URL(link)
    const querySlug = url.searchParams.get("post")
    if (querySlug) return safeSlug(querySlug)
    const pathSlug = url.pathname.split("/").filter(Boolean).at(-1)
    if (pathSlug && pathSlug !== "blog") return safeSlug(pathSlug)
  } catch {}
  return safeSlug(title)
}

function plainText(html: string) {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&quot;/gi, '"')
    .replace(/&apos;|&#39;/gi, "'")
    .replace(/&amp;/gi, "&")
    .replace(/&#(\d+);/g, (_, value: string) => String.fromCodePoint(Number(value)))
    .replace(/&#x([0-9a-f]+);/gi, (_, value: string) => String.fromCodePoint(Number.parseInt(value, 16)))
    .replace(/\s+/g, " ")
    .trim()
}

function sanitizeHtml(html: string) {
  let clean = html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "")
    .replace(/<!--([\s\S]*?)-->/g, "")

  const allowed = new Set(["p", "h2", "h3", "h4", "ul", "ol", "li", "strong", "b", "em", "i", "blockquote", "a", "br", "table", "thead", "tbody", "tr", "th", "td"])
  clean = clean.replace(/<\/?([a-z0-9]+)([^>]*)>/gi, (full, rawTag: string, attrs: string) => {
    const tag = rawTag.toLowerCase()
    if (!allowed.has(tag)) return ""
    if (full.startsWith("</")) return `</${tag}>`
    if (tag === "br") return "<br />"
    if (tag === "a") {
      const hrefMatch = attrs.match(/href\s*=\s*(["'])(.*?)\1/i)
      const href = hrefMatch?.[2]?.trim() || ""
      if (/^https?:\/\//i.test(href)) {
        const safeHref = href.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
        return `<a href="${safeHref}" target="_blank" rel="noopener noreferrer">`
      }
      return "<a>"
    }
    return `<${tag}>`
  })
  return clean
}

function estimateReadTime(html: string) {
  const words = plainText(html).split(/\s+/).filter(Boolean).length
  return `${Math.max(2, Math.ceil(words / 220))} мин`
}

function classify(title: string, html: string) {
  const haystack = `${title} ${plainText(html).slice(0, 5000)}`.toLowerCase()
  let best = clusterConfig[clusterConfig.length - 1]
  let bestScore = -1
  for (const config of clusterConfig) {
    const score = config.keywords.reduce((sum, keyword) => sum + (haystack.includes(keyword) ? 1 : 0), 0)
    if (score > bestScore) {
      best = config
      bestScore = score
    }
  }
  return best
}

function detectRiskFlags(title: string, html: string) {
  const text = plainText(`${title} ${html}`)
  const flags: string[] = []
  if (/\uFFFD/.test(text)) flags.push("encoding")
  if (/\b\d[\d\s.,]*\s*(?:%|лв\.?|лева|евро|€)\b/i.test(text)) flags.push("numeric-amount")
  if (/\b(?:срок|праг|ставка|процент|чл\.?\s*\d+|закон|наредба)\b/i.test(text)) flags.push("legal-or-deadline")
  if (/\b20\d{2}\b/.test(text)) flags.push("year-specific")
  return flags
}

function parseRss(xml: string): BlogPost[] {
  const items = Array.from(xml.matchAll(/<item\b[^>]*>([\s\S]*?)<\/item>/gi)).map((match) => match[1])
  const posts: BlogPost[] = []
  const titlesSeen = new Set<string>()

  for (const item of items) {
    const titleRaw = extract(item, "title")
    const link = extract(item, "link")
    const descriptionHtml = extract(item, "description")
    const rawHtml = extract(item, "content:encoded") || descriptionHtml
    const pubDate = extract(item, "pubDate") || extract(item, "dc:date")
    if (!titleRaw || !rawHtml) continue

    const title = plainText(titleRaw)
    const html = sanitizeHtml(rawHtml)
    const bodyText = plainText(html)
    // Fully automatic quality gate: malformed/empty feed items are withheld until Soro fixes the feed.
    if (!title || bodyText.length < 800 || /\uFFFD/.test(bodyText)) continue

    const normalizedTitle = title.toLowerCase().replace(/\s+/g, " ")
    if (titlesSeen.has(normalizedTitle)) continue
    titlesSeen.add(normalizedTitle)

    const slug = slugFromLink(link, title, item)
    if (!slug) continue
    // A missing or malformed pubDate used to fall back to "today", which stamped an invented
    // publication date on the article and pushed a false lastmod into the sitemap every time
    // the feed was re-read. Withhold the item instead — the feed is machine-generated, so a
    // malformed date is a feed bug that gets fixed, not a permanent state.
    if (!pubDate || Number.isNaN(Date.parse(pubDate))) continue
    const date = new Date(pubDate).toISOString().slice(0, 10)
    const description = plainText(descriptionHtml).slice(0, 220) || bodyText.slice(0, 200)
    const classified = classify(title, html)

    posts.push({
      slug,
      title,
      description,
      date,
      updatedAt: date,
      readTime: estimateReadTime(html),
      category: classified.category,
      cluster: classified.cluster,
      relatedService: classified.relatedService,
      sources: classified.sources,
      riskFlags: detectRiskFlags(title, html),
      content: html,
      contentFormat: "html",
      source: "soro",
    })
  }
  return posts
}

export type SoroFeedState = {
  liveOk: boolean
  posts: BlogPost[]
  snapshotCount: number
}

let snapshotMemo: BlogPost[] | null = null
function getSnapshotPosts(): BlogPost[] {
  if (snapshotMemo) return snapshotMemo
  try {
    const snapshotPath = path.join(process.cwd(), "data", "soro-snapshot.xml")
    const xml = readFileSync(snapshotPath, "utf8")
    snapshotMemo = parseRss(xml)
  } catch {
    snapshotMemo = []
  }
  return snapshotMemo
}

/**
 * Fetch the live Soro feed once per server render and merge it with the build-time
 * snapshot. The snapshot means an RSS outage/truncation never turns ranked articles
 * into empty pages, while the live feed still publishes new posts automatically.
 */

export function getSoroSnapshotPostBySlug(slug: string) {
  const safe = safeSlug(slug)
  return getSnapshotPosts().find((post) => post.slug === safe)
}

export function isKnownSoroSnapshotSlug(slug: string) {
  return Boolean(getSoroSnapshotPostBySlug(slug))
}

export const getSoroFeedState = cache(async (): Promise<SoroFeedState> => {
  const snapshot = getSnapshotPosts()
  try {
    const response = await fetch(SORO_RSS_URL, {
      next: { revalidate: 3600, tags: ["soro-rss"] },
      headers: { "User-Agent": "TotalProfitNativeBlog/1.1 (+https://www.totalprofit.bg/)" },
    })
    if (!response.ok) return { liveOk: false, posts: snapshot, snapshotCount: snapshot.length }

    const live = parseRss(await response.text())
    // Preserve every previously known article if Soro temporarily truncates/removes an
    // item, while allowing new/updated live items to win exact slug collisions.
    const merged = new Map<string, BlogPost>()
    for (const post of snapshot) merged.set(post.slug, post)
    for (const post of live) merged.set(post.slug, post)
    return {
      liveOk: true,
      posts: Array.from(merged.values()).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
      snapshotCount: snapshot.length,
    }
  } catch {
    return { liveOk: false, posts: snapshot, snapshotCount: snapshot.length }
  }
})

export const getSoroPosts = cache(async (): Promise<BlogPost[]> => (await getSoroFeedState()).posts)

export async function getSoroPostStateBySlug(slug: string) {
  const safe = safeSlug(slug)
  const state = await getSoroFeedState()
  return { ...state, post: state.posts.find((post) => post.slug === safe) }
}

export async function getSoroPostBySlug(slug: string) {
  return (await getSoroPostStateBySlug(slug)).post
}

export function isSoroRssConfigured() {
  return Boolean(SORO_RSS_URL)
}
