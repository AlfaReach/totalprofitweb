import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { InnerHeader } from "@/components/inner-header"
import { Footer } from "@/components/footer"
import type { ServicePageData } from "@/lib/service-data"
import { siteConfig } from "@/lib/site-config"

export function ServicePage({ service }: { service: ServicePageData }) {
  const serviceUrl = `${siteConfig.url}/${service.slug}`
  const visibleFaq = service.faq.slice(0, 6)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${serviceUrl}#service`,
        name: service.title,
        description: service.description,
        url: serviceUrl,
        provider: { "@id": `${siteConfig.url}/#organization` },
        areaServed: [{ "@type": "City", name: "София" }, { "@type": "Country", name: "България" }],
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${serviceUrl}#breadcrumbs`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Начало", item: siteConfig.url },
          { "@type": "ListItem", position: 2, name: service.title, item: serviceUrl },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${serviceUrl}#faq`,
        mainEntity: visibleFaq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="min-h-screen bg-background">
        <InnerHeader />
        <main>
          <section className="bg-foreground py-16 text-background md:py-20">
            <div className="mx-auto max-w-5xl px-6 lg:px-8">
              <nav aria-label="Breadcrumb" className="mb-6 flex gap-2 text-sm text-background/55">
                <Link href="/" className="hover:text-background">Начало</Link><span>/</span><span aria-current="page">{service.eyebrow}</span>
              </nav>
              <p className="mb-4 text-sm font-medium uppercase tracking-widest text-background/60">{service.eyebrow}</p>
              <h1 className="max-w-4xl text-balance text-4xl font-bold tracking-tight sm:text-5xl">{service.title}</h1>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-background/70">{service.intro}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button size="lg" variant="secondary" asChild><Link href="/#contact-form">Поискайте оферта <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
                <Button size="lg" variant="outline" className="border-background/30 bg-transparent text-background hover:bg-background/10 hover:text-background" asChild><a href={`tel:${siteConfig.phone}`}>{siteConfig.phoneDisplay}</a></Button>
              </div>
            </div>
          </section>

          <section className="py-16 md:py-20">
            <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1.25fr_.75fr] lg:px-8">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Какво включва услугата</h2>
                <p className="mt-4 text-lg leading-8 text-muted-foreground">{service.directAnswer}</p>
                <ul className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                  {service.bullets.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-foreground" /><span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <aside className="h-fit rounded-2xl bg-secondary p-7">
                <h2 className="text-xl font-semibold">Подходящо за</h2>
                <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
                  {service.whoFor.map((item) => <li key={item} className="flex gap-2"><span aria-hidden="true">•</span><span>{item}</span></li>)}
                </ul>
                <Button className="mt-7 w-full" asChild><Link href="/#contact-form">Безплатен анализ</Link></Button>
              </aside>
            </div>
          </section>

          <section className="border-y border-border bg-secondary/40 py-16 md:py-20">
            <div className="mx-auto max-w-4xl space-y-10 px-6 lg:px-8">
              {service.sections.map((section) => (
                <div key={section.title}>
                  <h2 className="text-2xl font-bold tracking-tight">{section.title}</h2>
                  <p className="mt-3 leading-7 text-muted-foreground">{section.answer}</p>
                  {section.paragraphs?.map((paragraph) => <p key={paragraph} className="mt-3 leading-7 text-muted-foreground">{paragraph}</p>)}
                  {section.bullets && <ul className="mt-4 space-y-2 text-muted-foreground">{section.bullets.map((item) => <li key={item} className="flex gap-3"><span aria-hidden="true">•</span><span>{item}</span></li>)}</ul>}
                </div>
              ))}
            </div>
          </section>

          <section className="py-16 md:py-20">
            <div className="mx-auto max-w-6xl px-6 lg:px-8">
              <p className="mb-4 text-sm font-medium uppercase tracking-widest text-muted-foreground">Процес</p>
              <h2 className="text-3xl font-bold tracking-tight">Как започваме работа</h2>
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                {service.process.map((step, index) => (
                  <div key={step.title} className="border-t border-border pt-5">
                    <p className="text-sm font-semibold text-muted-foreground">0{index + 1}</p>
                    <h3 className="mt-2 text-xl font-semibold">{step.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-secondary py-16 md:py-20">
            <div className="mx-auto max-w-4xl px-6 lg:px-8">
              <h2 className="text-3xl font-bold tracking-tight">Често задавани въпроси</h2>
              <div className="mt-7 divide-y divide-border border-y border-border">
                {visibleFaq.map((item) => <div key={item.question} className="py-5"><h3 className="text-lg font-semibold">{item.question}</h3><p className="mt-2 leading-relaxed text-muted-foreground">{item.answer}</p></div>)}
              </div>
            </div>
          </section>

          <section className="border-t border-border py-10">
            <div className="mx-auto max-w-4xl px-6 lg:px-8">
              <p className="text-sm font-medium text-muted-foreground">Свързани услуги</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {service.related.map((item) => <Link key={item.href} href={item.href} className="rounded-full border border-border px-4 py-2 text-sm hover:bg-secondary">{item.title}</Link>)}
                <Link href="/ceni" className="rounded-full border border-border px-4 py-2 text-sm hover:bg-secondary">Цени</Link>
              </div>
            </div>
          </section>

          <section className="py-16">
            <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Искате конкретна оферта за вашия бизнес?</h2>
              <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">Попълнете кратката форма и ще се свържем с вас с нужните следващи стъпки.</p>
              <Button size="lg" className="mt-7" asChild><Link href="/#contact-form">Към формата <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}
