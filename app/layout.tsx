import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { SchemaOrg } from "@/components/schema-org"
import { CookieBanner } from "@/components/cookie-banner"
import { AnalyticsLoader } from "@/components/analytics-loader"
import { ContactLauncher } from "@/components/contact-launcher"
import { InteractionTracker } from "@/components/interaction-tracker"
import { siteConfig } from "@/lib/site-config"

const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-inter", display: "swap" })

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: "Total Profit | Счетоводна кантора в София", template: "%s | Total Profit" },
  description: "Total Profit предлага счетоводни услуги, ТРЗ и данъчни консултации за фирми в София и онлайн в България.",
  applicationName: siteConfig.name,
  authors: [{ name: "Total Profit", url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "Accounting",
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    siteName: siteConfig.name,
    locale: "bg_BG",
    type: "website",
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: "Total Profit — счетоводна кантора" }],
  },
  twitter: { card: "summary_large_image", images: [siteConfig.ogImage] },
  icons: {
    icon: [
      { url: "/favicon.ico?v=7", sizes: "any" },
      { url: "/favicon-32x32.png?v=7", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png?v=7", type: "image/png", sizes: "16x16" },
    ],
    shortcut: "/favicon.ico?v=7",
    apple: "/apple-touch-icon.png?v=7",
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="bg">
      <head><SchemaOrg /><link rel="alternate" type="application/rss+xml" title="Total Profit Blog RSS" href="/feed.xml" /></head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <ContactLauncher />
        <CookieBanner />
        <AnalyticsLoader />
        <InteractionTracker />
      </body>
    </html>
  )
}
