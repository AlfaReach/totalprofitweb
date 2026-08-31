import type { Metadata } from "next"
import Link from "next/link"
import { InnerHeader } from "@/components/inner-header"
import { Footer } from "@/components/footer"
import { Contact } from "@/components/contact"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: { absolute: "Контакти и офис в София | Total Profit" },
  description: "Свържете се с Total Profit за счетоводно обслужване, ТРЗ или данъчна консултация. Офис в София на ул. „Баба Вида“ 1.",
  alternates: { canonical: `${siteConfig.url}/kontakti` },
}

export default function ContactsPage() {
  const url = `${siteConfig.url}/kontakti`
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "ContactPage", "@id": `${url}#page`, url, name: "Контакти Total Profit", about: { "@id": `${siteConfig.url}/#organization` }, inLanguage: "bg-BG" },
      { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Начало", item: siteConfig.url }, { "@type": "ListItem", position: 2, name: "Контакти", item: url }] },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="min-h-screen bg-background">
        <InnerHeader />
        <main>
          <section className="bg-foreground py-10 text-background">
            <div className="mx-auto max-w-6xl px-6 lg:px-8">
              <p className="text-sm font-medium uppercase tracking-widest text-background/60">Total Profit</p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Контакти</h1>
              <p className="mt-4 max-w-2xl leading-7 text-background/70">Свържете се с нас за счетоводно обслужване, ТРЗ или конкретен данъчен казус. Офисът ни в София е на ул. „Баба Вида“ 1, а голяма част от работата може да се организира и дистанционно.</p>
            </div>
          </section>

          <section className="border-b border-border bg-background py-12">
            <div className="mx-auto grid max-w-6xl gap-8 px-6 sm:grid-cols-2 lg:px-8">
              <div>
                <h2 className="text-lg font-semibold tracking-tight">Посещение в офиса</h2>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  Офисът е в София, ж.к. „Хаджи Димитър“, на ул. „Баба Вида“ 1. Работим от понеделник до петък, 09:00–17:00 ч. За среща е добре да се уговори час предварително, за да е свободен колегата, който отговаря за вашия тип дейност.
                </p>
                <a
                  href={siteConfig.addresses.sofia.googleBusinessProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center text-sm font-semibold text-foreground hover:underline underline-offset-4"
                >
                  Профилът ни в Google Maps
                </a>
              </div>
              <div>
                <h2 className="text-lg font-semibold tracking-tight">Какво да ни напишете</h2>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  За бърза и конкретна оценка помагат: видът на дейността, приблизителният брой документи месечно, дали фирмата е регистрирана по ЗДДС, броят служители и дали има международни сделки. Ако сменяте счетоводител, посочете и от коя дата искате да поемем обслужването.
                </p>
                <Link
                  href="/ceni"
                  className="mt-3 inline-flex items-center text-sm font-semibold text-foreground hover:underline underline-offset-4"
                >
                  Как се формира цената
                </Link>
              </div>
            </div>
          </section>

          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}
