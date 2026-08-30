import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { InnerHeader } from "@/components/inner-header"
import { Footer } from "@/components/footer"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: { absolute: "Цени на счетоводни услуги | Total Profit" },
  description: "Ориентировъчни цени за счетоводно обслужване. Начална цена от 125 € / месец за малки фирми; точната оферта зависи от дейността, документите, ДДС и персонала.",
  alternates: { canonical: `${siteConfig.url}/ceni` },
  openGraph: { title: "Цени на счетоводни услуги | Total Profit", description: "Как се формира цената на счетоводното обслужване и как да получите точна оферта.", url: `${siteConfig.url}/ceni`, siteName: siteConfig.name, locale: "bg_BG", type: "website", images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: "Цени на счетоводни услуги — Total Profit" }] },
}

const factors = [
  "видът и сложността на дейността",
  "броят и видът на счетоводните документи",
  "ДДС регистрацията и международните операции",
  "броят служители и обхватът на ТРЗ",
  "нуждата от допълнителни справки и консултации",
  "състоянието на счетоводството при смяна на кантора",
]

const faq = [
  { q: "Колко струва счетоводното обслужване?", a: "Публикуваната ни начална цена за малки фирми е от 125 € на месец. Точната оферта се определя след кратък анализ на дейността, документите, ДДС статуса, персонала и необходимите допълнителни услуги." },
  { q: "Има ли една цена за фирма без ДДС?", a: "Не. Липсата на ДДС регистрация сама по себе си не определя обема работа. Важни са дейността, броят документи, плащанията, персоналът и конкретните административни нужди." },
  { q: "ТРЗ включено ли е в месечната цена?", a: "Може да бъде включено в офертата, но цената зависи от броя служители и обхвата на кадровата администрация." },
  { q: "Плаща ли се отделно годишното приключване?", a: "Това зависи от конкретния пакет и договорения обхват. В офертата уточняваме предварително кои периодични и годишни услуги са включени." },
  { q: "Може ли да получа оферта преди да сменя счетоводителя си?", a: "Да. Достатъчно е да ни дадете основна информация за фирмата и текущото обслужване. При по-сложен преход може да поискаме допълнителни данни за архива и отворените периоди." },
  { q: "Работите ли с фирми извън София?", a: "Да. Цената не се определя от това дали клиентът е в София, а от реалния обхват на счетоводната работа и начина на организация." },
]

export default function PricingPage() {
  const url = `${siteConfig.url}/ceni`
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebPage", "@id": `${url}#page`, url, name: "Цени на счетоводни услуги", about: { "@id": `${siteConfig.url}/#organization` }, inLanguage: "bg-BG" },
      { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Начало", item: siteConfig.url }, { "@type": "ListItem", position: 2, name: "Цени", item: url }] },
      { "@type": "FAQPage", mainEntity: faq.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) },
    ],
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="min-h-screen bg-background">
        <InnerHeader />
        <main>
          <section className="bg-foreground py-20 text-background md:py-28">
            <div className="mx-auto max-w-5xl px-6 lg:px-8">
              <nav className="mb-7 flex gap-2 text-sm text-background/60" aria-label="Breadcrumb"><Link href="/" className="hover:text-background">Начало</Link><span>/</span><span>Цени</span></nav>
              <p className="mb-4 text-sm font-medium uppercase tracking-widest text-background/60">Цени</p>
              <h1 className="max-w-4xl text-balance text-4xl font-bold tracking-tight sm:text-5xl">Цени на счетоводни услуги</h1>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-background/75 md:text-xl">Публикуваната ни начална цена за счетоводно обслужване на малки фирми е <strong className="text-background">от 125 € / месец</strong>. Точната цена се определя според реалната работа, а не само според правната форма на дружеството.</p>
              <div className="mt-8"><Button size="lg" variant="secondary" asChild><Link href="/#contact-form">Получете конкретна оферта <ArrowRight className="ml-2 h-4 w-4" /></Link></Button></div>
            </div>
          </section>

          <section className="py-20">
            <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-2 lg:px-8">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Как се формира месечната цена?</h2>
                <p className="mt-4 leading-7 text-muted-foreground">Две фирми с еднаква правна форма могат да изискват съвсем различен обем работа. Затова офертата се прави след кратък анализ, вместо да използваме една фиксирана таблица за всички.</p>
                <div className="mt-7 space-y-3">{factors.map((item) => <div key={item} className="flex gap-3 rounded-xl border border-border p-4"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" /><span className="text-sm text-muted-foreground">{item}</span></div>)}</div>
              </div>
              <aside className="h-fit rounded-2xl bg-secondary p-8">
                <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Ориентир</p>
                <p className="mt-4 text-4xl font-bold">от 125 € <span className="text-base font-normal text-muted-foreground">/ месец</span></p>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">Началната цена е ориентир за малка фирма. Не обещаваме конкретна крайна цена без да знаем дейността и обема работа.</p>
                <Button className="mt-7 w-full" asChild><Link href="/#contact-form">Поискайте оферта</Link></Button>
              </aside>
            </div>
          </section>

          <section className="bg-secondary py-20">
            <div className="mx-auto max-w-4xl px-6 lg:px-8">
              <h2 className="text-3xl font-bold tracking-tight">Какво трябва да ни кажете за точна оферта?</h2>
              <p className="mt-4 leading-7 text-muted-foreground">За първоначална оценка обикновено са достатъчни видът на дейността, приблизителният брой документи, ДДС статусът, броят служители и дали има международни сделки. Ако сменяте счетоводител, полезно е да знаем и от коя дата искате да поемем обслужването.</p>
              <div className="mt-8 flex flex-wrap gap-3"><Button asChild><Link href="/schetovodno-obsluzhvane">Какво включва обслужването</Link></Button><Button variant="outline" asChild><Link href="/trz-uslugi-sofia">ТРЗ услуги</Link></Button></div>
            </div>
          </section>

          <section className="py-20">
            <div className="mx-auto max-w-4xl px-6 lg:px-8">
              <h2 className="text-3xl font-bold tracking-tight">Често задавани въпроси за цените</h2>
              <div className="mt-8 divide-y divide-border border-y border-border">{faq.map((item) => <div key={item.q} className="py-6"><h3 className="text-lg font-semibold">{item.q}</h3><p className="mt-2 leading-7 text-muted-foreground">{item.a}</p></div>)}</div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}
