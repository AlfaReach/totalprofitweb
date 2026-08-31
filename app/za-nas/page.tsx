import type { Metadata } from "next"
import Link from "next/link"
import { InnerHeader } from "@/components/inner-header"
import { Footer } from "@/components/footer"
import { About } from "@/components/about"
import { authorProfiles } from "@/lib/authors"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: { absolute: "За Total Profit | Счетоводен екип" },
  description: "Запознайте се с екипа на Total Profit и начина ни на работа със счетоводство, ТРЗ и данъчни казуси.",
  alternates: { canonical: `${siteConfig.url}/za-nas` },
}

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "AboutPage", "@id": `${siteConfig.url}/za-nas#page`, url: `${siteConfig.url}/za-nas`, name: "За Total Profit", about: { "@id": `${siteConfig.url}/#organization` }, inLanguage: "bg-BG" },
      { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Начало", item: siteConfig.url }, { "@type": "ListItem", position: 2, name: "За нас", item: `${siteConfig.url}/za-nas` }] },
      ...authorProfiles.map((member) => ({
        "@type": "Person",
        "@id": `${siteConfig.url}/avtori/${member.slug}#person`,
        name: member.name,
        jobTitle: member.role,
        description: member.specialty,
        image: member.image,
        url: `${siteConfig.url}/avtori/${member.slug}`,
        worksFor: { "@id": `${siteConfig.url}/#organization` },
      })),
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="min-h-screen bg-background">
        <InnerHeader />
        <main>
          <section className="bg-foreground py-12 text-background">
            <div className="mx-auto max-w-6xl px-6 lg:px-8">
              <p className="text-sm font-medium uppercase tracking-widest text-background/60">Total Profit</p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">За нас</h1>
              {/* First sentence states the entity plainly — this page is the `authors` URL on
                  every article and the page an answer engine is most likely to read when asked
                  who Total Profit is. Keep it a single quotable statement of fact. */}
              <p className="mt-4 max-w-2xl text-background/70">
                Total Profit (Тотал Профит ЕООД) е счетоводна кантора в София, която обслужва фирми и предприемачи със счетоводство, ТРЗ, данъчни консултации и регистрации. Екип с фокус върху ясна комуникация, спазени срокове и практична подкрепа за бизнеса.
              </p>
            </div>
          </section>

          <About linkProfiles />

          <section className="border-t border-border py-16">
            <div className="mx-auto max-w-5xl px-6 lg:px-8">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Как работим</h2>
                <div className="mt-4 grid gap-4 lg:grid-cols-2">
                  <p className="leading-7 text-muted-foreground">В началото уточняваме дейността, документите, ДДС статуса, персонала и текущите срокове. След това определяме конкретния обхват на работа и начина на обмен на информация.</p>
                  <p className="leading-7 text-muted-foreground">При конкретен данъчен или счетоводен казус разглеждаме реалните факти и документи, вместо да прилагаме универсални решения към различни бизнеси.</p>
                </div>
              </div>
              <p className="mt-10 text-sm leading-6 text-muted-foreground">Информационните материали в блога имат общ характер. Вижте <Link href="/redakcionna-politika" className="font-medium text-foreground underline underline-offset-4">редакционната политика</Link> за начина, по който автоматизираните публикации се обозначават и поддържат.</p>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}
