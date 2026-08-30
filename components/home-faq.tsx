import Link from "next/link"
import { siteConfig } from "@/lib/site-config"

const faq = [
  {
    question: "Как да изберете счетоводна кантора в София?",
    answer: "Проверете какво реално включва услугата, кой ще комуникира с вас, как се предават документите и дали екипът има опит с вашия тип дейност.",
  },
  {
    question: "Работи ли Total Profit с фирми извън София?",
    answer: "Да. Офисът ни е в София, а голяма част от счетоводното и ТРЗ обслужването може да се организира дистанционно за клиенти от цяла България.",
  },
  {
    question: "Колко струват счетоводните услуги?",
    answer: "Началната цена за малки фирми е от 125 € на месец. Точната оферта зависи от дейността, документите, ДДС статуса и персонала.",
  },
  {
    question: "Може ли да сменя счетоводителя си по средата на годината?",
    answer: "Да. Уточняваме датата на поемане и необходимите архиви, салда, декларации и текущи казуси, за да има ясен преход.",
  },
  {
    question: "Предлагате ли счетоводство и ТРЗ заедно?",
    answer: "Да. Двете услуги могат да бъдат организирани в общ процес, така че информацията за заплати, осигуровки и разходи за персонал да не се дублира.",
  },
  {
    question: "Мога ли да поискам само данъчна консултация?",
    answer: "Да. Можете да заявите отделна консултация за конкретен данъчен казус, без да сте абонаментен счетоводен клиент.",
  },
]

export function HomeFaq() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${siteConfig.url}/#faq`,
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  }

  return (
    <section className="border-t border-border bg-background py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Накратко</p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">Често задавани въпроси</h2>
        </div>
        <div className="mt-8 divide-y divide-border border-y border-border">
          {faq.map((item, index) => (
            <details key={item.question} className="group py-5">
              <summary className="cursor-pointer list-none font-semibold flex items-center justify-between gap-4">
                <span>{item.question}</span>
                <span className="text-muted-foreground transition-transform group-open:rotate-45" aria-hidden="true">+</span>
              </summary>
              <div className="mt-3 pr-8 text-sm leading-7 text-muted-foreground">
                <p>{item.answer}</p>
                {index === 0 && <Link href="/za-nas" className="mt-2 inline-block font-medium text-foreground underline underline-offset-4">За екипа</Link>}
                {index === 1 && <Link href="/kontakti" className="mt-2 inline-block font-medium text-foreground underline underline-offset-4">Контакти и офис</Link>}
                {index === 2 && <Link href="/ceni" className="mt-2 inline-block font-medium text-foreground underline underline-offset-4">Вижте цените</Link>}
                {index === 3 && <Link href="/schetovodno-obsluzhvane" className="mt-2 inline-block font-medium text-foreground underline underline-offset-4">Счетоводно обслужване</Link>}
                {index === 4 && <Link href="/trz-uslugi-sofia" className="mt-2 inline-block font-medium text-foreground underline underline-offset-4">ТРЗ услуги</Link>}
                {index === 5 && <Link href="/danachni-konsultacii" className="mt-2 inline-block font-medium text-foreground underline underline-offset-4">Данъчни консултации</Link>}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
