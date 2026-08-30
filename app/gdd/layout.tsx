import type { Metadata } from 'next'
import { siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  title: { absolute: 'ГДД за фирми — подаване до 30 юни | Total Profit' },
  description: 'Съдействие при подготовка и подаване на годишна данъчна декларация по чл. 92 ЗКПО и годишно приключване на фирми. Срокът за декларацията е до 30 юни.',
  alternates: {
    canonical: '/gdd',
  },
  openGraph: {
    title: 'ГДД за фирми — подаване до 30 юни | Total Profit',
    description: 'Съдействие при подготовка и подаване на ГДД за фирми по чл. 92 ЗКПО. Срокът за декларацията е до 30 юни.',
  },
  twitter: {
    title: 'ГДД за фирми — подаване до 30 юни | Total Profit',
  },
}

export default function GDDLayout({ children }: { children: React.ReactNode }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Начало", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "ГДД за фирми", item: `${siteConfig.url}/gdd` },
    ],
  }
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />{children}</>
}
