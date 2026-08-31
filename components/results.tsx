import { Button } from "@/components/ui/button"
import { ArrowRight, Calculator, Users, MessageCircle, ShieldCheck } from "lucide-react"
import Link from "next/link"

/**
 * These four used to render as a stats row: a big bold word in the slot where a number goes,
 * left over from the "500+ клиенти / 98% / 0 глоби" block that was removed for lack of
 * evidence. An adjective in number typography reads as a broken widget, so the split is gone
 * and each point is now simply a heading and a sentence. Same four points, same four icons,
 * same CTA — no numeric claim implied.
 */
const results = [
  {
    icon: Calculator,
    title: "Ясни сметки и срокове",
    description: "Подреден процес за документи, декларации и текуща отчетност",
  },
  {
    icon: Users,
    title: "Един екип за счетоводство и ТРЗ",
    description: "Свързани процеси и по-малко прехвърляне между различни доставчици",
  },
  {
    icon: ShieldCheck,
    title: "Практичен данъчен подход",
    description: "Решения според реалната дейност и конкретните документи",
  },
  {
    icon: MessageCircle,
    title: "Директна комуникация",
    description: "Ясни отговори, конкретни стъпки и човек, към когото да се обърнете",
  },
]

export function Results() {
  return (
    <section id="results" className="py-28 bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <p className="text-sm font-medium tracking-widest text-background/60 uppercase mb-4">Ползи</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">Какво получавате от Total Profit</h2>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {results.map((result) => (
            <div key={result.title} className="text-center">
              <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-background/10 backdrop-blur-sm">
                <result.icon className="h-7 w-7 text-background" />
              </div>
              <h3 className="text-lg font-semibold text-background text-balance">{result.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-background/60">{result.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button size="lg" variant="secondary" className="group" asChild>
            <Link href="/#contact-form">
              ИСКАМ БЕЗПЛАТЕН АНАЛИЗ
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
