const siteUrl = (process.env.SITE_URL || "https://www.totalprofit.bg").replace(/\/$/, "")
const key = "b02962db02b1b7735cdf15fdfee311bf"
const sitemap = await fetch(`${siteUrl}/sitemap.xml`).then((response) => {
  if (!response.ok) throw new Error(`Could not load sitemap: ${response.status}`)
  return response.text()
})
const urls = Array.from(sitemap.matchAll(/<loc>(.*?)<\/loc>/g)).map((match) => match[1].replace(/&amp;/g, "&"))
if (!urls.length) throw new Error("No URLs found in sitemap")
const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: new URL(siteUrl).host, key, keyLocation: `${siteUrl}/indexnow-key.txt`, urlList: urls }),
})
console.log(`IndexNow response: ${response.status}; submitted ${urls.length} URLs`)
if (!response.ok && response.status !== 202) process.exit(1)
