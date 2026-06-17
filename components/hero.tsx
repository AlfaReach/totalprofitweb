import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Clock, Award, CheckCircle2, ListChecks } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden max-w-full">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#252525] to-[#1a1a1a]" />
      <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-5" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 py-32 text-center lg:px-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white/80 mb-8 backdrop-blur-sm border border-white/10">
          <Award className="h-4 w-4 text-amber-400" />
          <span>15+ години опит | 500+ доволни клиенти</span>
        </div>

        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl text-balance leading-tight">
          Плащате повече данъци, отколкото трябва?
        </h1>

        <p className="mt-6 text-xl text-white/70 max-w-2xl mx-auto leading-relaxed" suppressHydrationWarning>
          Повечето фирми плащат до 30% повече данъци от необходимото. Ще ви покажем точно колко можете да спестите от данъци – и как.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="group text-base px-8 py-6 bg-white text-[#1a1a1a] hover:bg-white/90" asChild>
            <Link href="#contact">
              ИСКАМ БЕЗПЛАТЕН АНАЛИЗ
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-white/60">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span>100% безплатно</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span>Без обвързване</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-emerald-400" />
            <span>Отговор до 24 часа</span>
          </div>
          <div className="flex items-center gap-2">
            <ListChecks className="h-4 w-4 text-emerald-400" />
            <span>Ясни препоръки и конкретни стъпки</span>
          </div>
        </div>
      </div>
    </section>
  )
}
