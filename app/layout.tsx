import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css"
import { SchemaOrg } from "@/components/schema-org"
import { CookieBanner } from "@/components/cookie-banner"
import { AnalyticsLoader } from "@/components/analytics-loader"
import { WhatsAppButton } from "@/components/whatsapp-button"

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Счетоводни услуги в София | Данъчни консултации и ТРЗ | Total Profit",
  description:
    "Счетоводна кантора в София и Велико Търново с 15+ години опит. Счетоводство, данъчни консултации и ТРЗ обслужване от 125 € / месец. Безплатен анализ до 24 часа.",
  metadataBase: new URL("https://www.totalprofit.bg"),
  openGraph: {
    title: "Счетоводни услуги в София | Total Profit",
    description:
      "Счетоводна кантора с 15+ години опит. Законна данъчна оптимизация, ТРЗ и регистрации. Безплатен анализ без обвързване.",
    url: "https://www.totalprofit.bg",
    siteName: "Total Profit",
    locale: "bg_BG",
    type: "website",
    images: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Site-thumb-vKpadgD2OKHkHihtasDxlkjEuuymS5.png",
        width: 1200,
        height: 630,
        alt: "Total Profit - Счетоводна Кантора",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Счетоводни услуги в София | Total Profit",
    description:
      "15+ години опит. Счетоводство, данъци и ТРЗ. Безплатен анализ.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  alternates: {
    canonical: "https://www.totalprofit.bg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="bg">
      <head>
        <SchemaOrg />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <WhatsAppButton />
        <CookieBanner />
        <AnalyticsLoader />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
