import type { Metadata } from "next"
import { ServicePage } from "@/components/service-page"
import { getService } from "@/lib/service-data"
import { siteConfig } from "@/lib/site-config"

const service = getService("schetovodno-obsluzhvane")!

export const metadata: Metadata = {
  title: { absolute: service.metaTitle },
  description: service.description,
  alternates: { canonical: `${siteConfig.url}/${service.slug}` },
  openGraph: {
    title: service.metaTitle,
    description: service.description,
    url: `${siteConfig.url}/${service.slug}`,
    siteName: siteConfig.name,
    locale: "bg_BG",
    type: "website",
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: service.title }],
  },
}

export default function Page() { return <ServicePage service={service} /> }
