import { mkdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"

const url = process.env.SORO_RSS_URL || "https://app.trysoro.com/api/rss/1bc9b407-9b52-4106-974c-aa02565173ac"
const siteUrl = process.env.SITE_URL || "https://www.totalprofit.bg"
const target = path.join(process.cwd(), "data", "soro-snapshot.xml")
const UA = "TotalProfitBuildSnapshot/1.2 (+https://www.totalprofit.bg/)"
const ALLOW_SHRINK = process.env.SORO_ALLOW_SHRINK === "1"

/**
 * The blog publishes itself: Soro posts, the RSS updates, the site renders the article and it
 * enters the sitemap. Nothing here touches that. This script only refuses to promote a build
 * that would DELETE articles which are live right now.
 *
 * It compares slug sets, not counts — equal counts do not mean the same articles — and it
 * compares against what production is actually serving, because `data/soro-snapshot.xml` is
 * committed as a placeholder and is empty on every fresh checkout.
 */

// ---------------------------------------------------------------------------
// Publishability gate.
//
// KEEP IN SYNC with parseRss() in lib/soro.ts. An item only reaches the site if it clears
// all of these, so counting raw <item> elements would overstate the corpus: a feed can return
// 89 items of which half are rejected at runtime for a short body, a mojibake character or a
// malformed date. Only these slugs are real articles.
// ---------------------------------------------------------------------------
function decodeXml(value) {
  return value
    .replace(/^<!\[CDATA\[|\]\]>$/g, "")
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'")
}

function extract(item, tag) {
  const escaped = tag.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  const match = item.match(new RegExp(`<${escaped}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${escaped}>`, "i"))
  return match ? decodeXml(match[1].trim()) : ""
}

function plainText(html) {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ").replace(/&quot;/gi, '"').replace(/&apos;|&#39;/gi, "'").replace(/&amp;/gi, "&")
    .replace(/&#(\d+);/g, (_, v) => String.fromCodePoint(Number(v)))
    .replace(/&#x([0-9a-f]+);/gi, (_, v) => String.fromCodePoint(Number.parseInt(v, 16)))
    .replace(/\s+/g, " ")
    .trim()
}

/**
 * Byte-for-byte the same allowlist and stripping as sanitizeHtml() in lib/soro.ts. Runtime
 * measures the body AFTER sanitising, so measuring the raw HTML here would count markup and
 * dropped elements toward the 800-character threshold — an item could pass this gate and then
 * be rejected at render time, which is exactly the mismatch that makes a guard unreliable.
 */
function sanitizeHtml(html) {
  let clean = html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "")
    .replace(/<!--([\s\S]*?)-->/g, "")

  const allowed = new Set(["p", "h2", "h3", "h4", "ul", "ol", "li", "strong", "b", "em", "i", "blockquote", "a", "br", "table", "thead", "tbody", "tr", "th", "td"])
  clean = clean.replace(/<\/?([a-z0-9]+)([^>]*)>/gi, (full, rawTag, attrs) => {
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

function safeSlug(input) {
  let decoded = input
  try { decoded = decodeURIComponent(input) } catch {}
  return decoded.trim().toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-").replace(/-{2,}/g, "-").replace(/^-+|-+$/g, "")
}

function slugFromLink(link, title, item) {
  const explicit = extract(item, "slug") || extract(item, "wp:post_name")
  if (explicit) return safeSlug(explicit)
  try {
    const parsed = new URL(link)
    const querySlug = parsed.searchParams.get("post")
    if (querySlug) return safeSlug(querySlug)
    const pathSlug = parsed.pathname.split("/").filter(Boolean).at(-1)
    if (pathSlug && pathSlug !== "blog") return safeSlug(pathSlug)
  } catch {}
  return safeSlug(title)
}

/** Slugs a given feed would actually publish. */
function publishableSlugs(xml) {
  const slugs = new Set()
  const titlesSeen = new Set()
  for (const match of xml.matchAll(/<item\b[^>]*>([\s\S]*?)<\/item>/gi)) {
    const item = match[1]
    const titleRaw = extract(item, "title")
    const rawHtml = extract(item, "content:encoded") || extract(item, "description")
    const pubDate = extract(item, "pubDate") || extract(item, "dc:date")
    if (!titleRaw || !rawHtml) continue

    const title = plainText(titleRaw)
    const bodyText = plainText(sanitizeHtml(rawHtml))
    if (!title || bodyText.length < 800 || /\uFFFD/.test(bodyText)) continue

    const normalizedTitle = title.toLowerCase().replace(/\s+/g, " ")
    if (titlesSeen.has(normalizedTitle)) continue
    titlesSeen.add(normalizedTitle)

    if (!pubDate || Number.isNaN(Date.parse(pubDate))) continue

    const slug = slugFromLink(extract(item, "link"), title, item)
    if (slug) slugs.add(slug)
  }
  return slugs
}

async function readSnapshotSlugs() {
  try {
    return publishableSlugs(await readFile(target, "utf8"))
  } catch {
    return new Set()
  }
}

/** The article slugs production is serving right now. Empty if the site is new or unreachable. */
async function readProductionSlugs() {
  try {
    const response = await fetch(`${siteUrl}/sitemap.xml`, { headers: { "User-Agent": UA }, signal: AbortSignal.timeout(10000) })
    if (!response.ok) return { slugs: new Set(), known: false }
    const xml = await response.text()
    const slugs = new Set(
      [...xml.matchAll(/<loc>[^<]*[?&]post=([^<&]+)<\/loc>/gi)].map((m) => safeSlug(decodeXml(m[1]))),
    )
    return { slugs, known: true }
  } catch {
    return { slugs: new Set(), known: false }
  }
}

function refuse(message) {
  console.error(`[soro-snapshot] REFUSING TO BUILD: ${message}`)
  console.error("[soro-snapshot] The current deployment stays live and keeps serving these articles.")
  console.error("[soro-snapshot] If this is intentional, re-run with SORO_ALLOW_SHRINK=1.")
  process.exit(1)
}

// --- the known-good corpus we must not lose -------------------------------------------------
const production = await readProductionSlugs()
const snapshotSlugs = await readSnapshotSlugs()
const knownGood = new Set([...production.slugs, ...snapshotSlugs])

// totalprofit.bg is an established site with a live article corpus, so "I cannot see any
// baseline" is never a first deployment here — it means the sitemap fetch failed and the
// checkout carries only the placeholder snapshot. With no baseline there is nothing to
// compare the feed against, so a truncated feed would look complete and would be published.
// Fail closed; SORO_ALLOW_SHRINK=1 is the deliberate way through.
if (!production.known && snapshotSlugs.size === 0 && !ALLOW_SHRINK) {
  refuse(
    `no known-good baseline is available — ${siteUrl}/sitemap.xml could not be read and the ` +
      `committed snapshot is empty, so there is nothing to verify the feed against.`,
  )
}

// --- fetch the feed -------------------------------------------------------------------------
let xml = null
let fetchError = null
try {
  const response = await fetch(url, { headers: { "User-Agent": UA } })
  if (!response.ok) throw new Error(`HTTP ${response.status}`)
  xml = await response.text()
} catch (error) {
  fetchError = error instanceof Error ? error.message : String(error)
}

if (xml === null) {
  // Soro is down. The build may only proceed if the snapshot already in the checkout can
  // serve everything production is serving; otherwise deploying would silently 404 articles.
  const uncovered = [...knownGood].filter((slug) => !snapshotSlugs.has(slug))
  if (uncovered.length > 0) {
    refuse(
      `Soro is unreachable (${fetchError}) and the committed snapshot covers ${snapshotSlugs.size} of ` +
        `${knownGood.size} live articles. ${uncovered.length} would disappear, e.g. ${uncovered.slice(0, 5).join(", ")}.`,
    )
  }
  console.warn(`[soro-snapshot] live refresh skipped (${fetchError}); existing snapshot covers all ${snapshotSlugs.size} known articles.`)
  process.exit(0)
}

// --- compare slug sets, not counts ----------------------------------------------------------
const candidate = publishableSlugs(xml)
if (candidate.size === 0) refuse("the Soro feed returned no publishable articles.")

const missing = [...knownGood].filter((slug) => !candidate.has(slug))
if (missing.length > 0 && !ALLOW_SHRINK) {
  refuse(
    `${missing.length} article(s) that are live today are missing from the feed: ` +
      `${missing.slice(0, 10).join(", ")}${missing.length > 10 ? ", …" : ""}.`,
  )
}

await mkdir(path.dirname(target), { recursive: true })
await writeFile(target, xml, "utf8")
const added = [...candidate].filter((slug) => !knownGood.has(slug)).length
console.log(
  `[soro-snapshot] saved ${candidate.size} publishable items ` +
    `(known good: ${knownGood.size}${production.known ? " from live sitemap" : " from committed snapshot"}, ` +
    `new: ${added}${missing.length ? `, removed: ${missing.length} via SORO_ALLOW_SHRINK` : ""}).`,
)
