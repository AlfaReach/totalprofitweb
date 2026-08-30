import { mkdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"

const url = process.env.SORO_RSS_URL || "https://app.trysoro.com/api/rss/1bc9b407-9b52-4106-974c-aa02565173ac"
const target = path.join(process.cwd(), "data", "soro-snapshot.xml")

async function existingItemCount() {
  try {
    const xml = await readFile(target, "utf8")
    return (xml.match(/<item\b/gi) || []).length
  } catch { return 0 }
}

try {
  const response = await fetch(url, { headers: { "User-Agent": "TotalProfitBuildSnapshot/1.0 (+https://www.totalprofit.bg/)" } })
  if (!response.ok) throw new Error(`HTTP ${response.status}`)
  const xml = await response.text()
  const count = (xml.match(/<item\b/gi) || []).length
  const previous = await existingItemCount()
  if (count === 0) throw new Error("Soro feed contained zero items")
  if (previous > 0 && count < Math.floor(previous * 0.75)) throw new Error(`Feed unexpectedly shrank from ${previous} to ${count} items`)
  await mkdir(path.dirname(target), { recursive: true })
  await writeFile(target, xml, "utf8")
  console.log(`[soro-snapshot] saved ${count} items`)
} catch (error) {
  console.warn(`[soro-snapshot] live refresh skipped; keeping existing snapshot: ${error instanceof Error ? error.message : error}`)
  // Deliberately exit 0. A Soro incident must not block deployment when a previous snapshot exists.
}
