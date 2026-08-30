import type { MetadataRoute } from "next"
import { siteConfig } from "@/lib/site-config"

export default function robots(): MetadataRoute.Robots {
  const allowPublic = { allow: "/", disallow: ["/api/"] }
  return {
    rules: [
      { userAgent: "*", ...allowPublic },
      { userAgent: "OAI-SearchBot", ...allowPublic },
      { userAgent: "ChatGPT-User", ...allowPublic },
      { userAgent: "GPTBot", ...allowPublic },
      { userAgent: "ClaudeBot", ...allowPublic },
      { userAgent: "PerplexityBot", ...allowPublic },
      { userAgent: "Google-Extended", ...allowPublic },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  }
}
