import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { InnerHeader } from "@/components/inner-header"
import { Footer } from "@/components/footer"
import { authorPagesIndexable, authorProfiles, getAuthor } from "@/lib/authors"
import { siteConfig } from "@/lib/site-config"

interface Props { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return authorProfiles.map((author) => ({ slug: author.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const author = getAuthor(slug)
  if (!author) return { title: "Профилът не е намерен", robots: { index: false, follow: true } }
  const url = `${siteConfig.url}/avtori/${author.slug}`
  return {
    title: { absolute: `${author.name} — ${author.role} | Total Profit` },
    description: `${author.name} е ${author.role.toLowerCase()} в Total Profit. ${author.specialty}.`,
    alternates: { canonical: url },
    robots: authorPagesIndexable ? undefined : { index: false, follow: true },
    openGraph: { title: `${author.name} | Total Profit`, description: author.bio, url, siteName: siteConfig.name, locale: "bg_BG", type: "profile", images: [{ url: author.image, alt: author.name }] },
  }
}

export default async function AuthorPage({ params }: Props) {
  const { slug } = await params
  const author = getAuthor(slug)
  if (!author) notFound()
  const url = `${siteConfig.url}/avtori/${author.slug}`
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${url}#page`,
        url,
        name: `${author.name} — ${author.role}`,
        mainEntity: { "@id": `${url}#person` },
        inLanguage: "bg-BG",
      },
      {
        "@type": "Person",
        "@id": `${url}#person`,
        name: author.name,
        jobTitle: author.role,
        description: author.specialty,
        image: author.image,
        url,
        worksFor: { "@id": `${siteConfig.url}/#organization` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Начало", item: siteConfig.url },
          { "@type": "ListItem", position: 2, name: "За нас", item: `${siteConfig.url}/za-nas` },
          { "@type": "ListItem", position: 3, name: author.name, item: url },
        ],
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="min-h-screen bg-background">
        <InnerHeader />
        <main className="py-16 md:py-24">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <Link href="/za-nas" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="mr-2 h-4 w-4" />За екипа</Link>
            <div className="mt-10 grid gap-10 md:grid-cols-[220px_1fr] md:items-start">
              <div className="aspect-square overflow-hidden rounded-2xl bg-muted">
                <Image src={author.image} alt={author.name} width={440} height={440} sizes="(max-width: 768px) 100vw, 220px" className="h-full w-full object-cover" />
              </div>
              <div>
                <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Екип Total Profit</p>
                <h1 className="mt-3 text-4xl font-bold tracking-tight">{author.name}</h1>
                <p className="mt-3 text-lg font-medium">{author.role}</p>
                <p className="mt-1 text-muted-foreground">{author.specialty}</p>
                <p className="mt-7 leading-7 text-muted-foreground">{author.bio}</p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}
