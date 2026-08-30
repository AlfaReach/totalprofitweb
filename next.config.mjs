/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  outputFileTracingIncludes: { "/*": ["./data/soro-snapshot.xml"] },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "hebbkx1anhila5yf.public.blob.vercel-storage.com" },
      { protocol: "https", hostname: "rqt8f2dldo9sqmkn.public.blob.vercel-storage.com" },
    ],
  },
  async redirects() {
    return [
      { source: "/politika-za-poveritelnost", destination: "/privacy-policy", permanent: true },
      // Compatibility with the first SEO rebuild draft; these routes were not part of the original production site.
      { source: "/schetovodni-uslugi-sofia", destination: "/", permanent: true },
      { source: "/danachni-konsultacii-sofia", destination: "/danachni-konsultacii", permanent: true },
      { source: "/registracia-na-firma", destination: "/registraciya-na-firma", permanent: true },
      { source: "/dds-registracia", destination: "/dds-registraciya", permanent: true },
      { source: "/danachna-zashtita-nap", destination: "/danachna-zashtita", permanent: true },
    ]
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ]
  },
}

export default nextConfig
