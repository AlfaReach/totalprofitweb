import { Button } from "@/components/ui/button"
import { ArrowRight, TrendingUp, Wallet, Clock, ShieldCheck } from "lucide-react"
import Link from "next/link"

const results = [
  {
    icon: Wallet,
    stat: "до 30%",
    title: "Спестени данъци",
    description: "Чрез законна оптимизация",
  },
  {
    icon: Clock,
    stat: "10+ часа",
    title: "Спестено време",
    description: "Месечно от администрация и документи",
  },
  {
    icon: ShieldCheck,
    stat: "0",
    title: "Глоби от НАП",
    description: "При нашите клиенти",
  },
  {
    icon: TrendingUp,
    stat: "98%",
    title: "Остават с нас",
    description: "След първата година",
  },
]

export function Results() {
  return (
    <section id="results" className="py-28 bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <p className="text-sm font-medium tracking-widest text-background/60 uppercase mb-4">Резултати</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
            Какво получават нашите клиенти?
          </h2>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {results.map((result) => (
            <div key={result.title} className="text-center">
              <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-background/10 backdrop-blur-sm">
                <result.icon className="h-7 w-7 text-background" />
              </div>
              <p className="text-4xl font-bold text-background">{result.stat}</p>
              <p className="mt-2 font-semibold text-background">{result.title}</p>
              <p className="mt-1 text-sm text-background/60">{result.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button size="lg" variant="secondary" className="group" asChild>
            <Link href="#contact">
              ИСКАМ СЪЩИТЕ РЕЗУЛТАТИ
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
