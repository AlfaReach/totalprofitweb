import type { Metadata } from "next"
import Link from "next/link"
import { InnerHeader } from "@/components/inner-header"
import { Footer } from "@/components/footer"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: { absolute: "Редакционна политика | Total Profit" },
  description: "Как Total Profit публикува и поддържа информационните материали в счетоводния си блог, включително автоматизирано публикуваното съдържание.",
  alternates: { canonical: `${siteConfig.url}/redakcionna-politika` },
}

export default function EditorialPolicyPage() {
  const url = `${siteConfig.url}/redakcionna-politika`
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebPage", "@id": `${url}#page`, url, name: "Редакционна политика", about: { "@id": `${siteConfig.url}/#organization` }, inLanguage: "bg-BG", dateModified: "2026-08-29" },
      { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Начало", item: siteConfig.url }, { "@type": "ListItem", position: 2, name: "Редакционна политика", item: url }] },
    ],
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="min-h-screen bg-background">
        <InnerHeader />
        <main className="py-16 md:py-24">
          <article className="mx-auto max-w-3xl px-6 lg:px-8">
            <nav className="mb-8 flex gap-2 text-sm text-muted-foreground" aria-label="Breadcrumb"><Link href="/">Начало</Link><span>/</span><span>Редакционна политика</span></nav>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Редакционна политика на Total Profit</h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">Тази страница обяснява как работи информационният ни блог и какво може и не може да се очаква от автоматично публикуваното съдържание.</p>

            <div className="mt-12 space-y-10 leading-7 text-muted-foreground">
              <section><h2 className="text-2xl font-bold text-foreground">Автоматизирано публикуване</h2><p className="mt-3">За част от регулярните блог публикации използваме автоматизиран процес за подготовка и публикуване. Съдържанието се публикува директно на TotalProfit.bg, а тематичната категория, свързаните услуги, вътрешните връзки и техническите елементи на страницата се добавят автоматично. Това ни позволява да поддържаме блога без ръчно публикуване на всяка отделна статия.</p></section>
              <section><h2 className="text-2xl font-bold text-foreground">Какво проверява системата автоматично?</h2><p className="mt-3">Преди публикация системата отхвърля празни или очевидно повредени записи, премахва потенциално опасен HTML, класифицира темата, добавя връзка към най-подходящата услуга и маркира материали, които съдържат числа, срокове или нормативни препратки. При такива материали на страницата се показва допълнителна бележка за актуалност.</p></section>
              <section><h2 className="text-2xl font-bold text-foreground">Важно ограничение</h2><p className="mt-3">Автоматичната система не може да гарантира, че всяка сума, праг, срок или нормативна препратка е актуална към деня, в който четете статията. Данъчното и осигурителното законодателство се променя. Затова блогът е общ информационен ресурс, а не индивидуално професионално становище.</p></section>
              <section><h2 className="text-2xl font-bold text-foreground">Официални източници</h2><p className="mt-3">Когато темата го позволява, системата добавя връзки към институции като НАП, НОИ, Търговския регистър и НСИ като отправна точка за проверка. Тези връзки не означават, че конкретната публикация е одобрена от съответната институция.</p></section>
              <section><h2 className="text-2xl font-bold text-foreground">Корекции</h2><p className="mt-3">Ако забележите конкретна фактическа грешка в публикация, изпратете URL и описание на проблема на <a href={`mailto:${siteConfig.email}`} className="font-medium underline underline-offset-4">{siteConfig.email}</a>. При промяна или корекция на собствено редактирано съдържание използваме дата на актуализация.</p></section>
              <section><h2 className="text-2xl font-bold text-foreground">Индивидуални казуси</h2><p className="mt-3">За решение, което ще използвате пред НАП, при договор, сделка, регистрация или друга конкретна ситуация, потърсете индивидуална консултация и предоставете реалните факти и документи. При необходимост от правен анализ или процесуално представителство следва да участва квалифициран адвокат.</p></section>
            </div>
          </article>
        </main>
        <Footer />
      </div>
    </>
  )
}
