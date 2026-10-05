import { Button } from "@/components/ui/button"
import { ArrowRight, Clock, Award, CheckCircle2, ListChecks, Phone, Star } from "lucide-react"
import { googleRating } from "@/lib/reviews"
import Link from "next/link"
import { siteConfig } from "@/lib/site-config"
import { LeadForm } from "@/components/lead-form"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden max-w-full">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#252525] to-[#1a1a1a]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-32 lg:px-8">
        {/* Badge sits centred above both columns. */}
        <div className="flex justify-center mb-8 lg:mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white/80 backdrop-blur-sm border border-white/10">
            <Award className="h-4 w-4 text-amber-400" />
            <span>Счетоводна кантора Total Profit · София</span>
          </div>
        </div>

        <div className="grid gap-16 lg:grid-cols-[1.15fr_1fr] lg:items-start">
          {/* Left: the original hero wording (H1, intro, trust points). */}
          <div className="mx-auto max-w-4xl text-center lg:mx-0 lg:max-w-none lg:text-left">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl text-balance leading-tight">
              Плащате повече данъци, отколкото трябва?
            </h1>

            <p className="mt-6 text-xl text-white/70 max-w-2xl mx-auto lg:mx-0 leading-relaxed" suppressHydrationWarning>
              Безплатен първоначален анализ на счетоводството и данъчната ви организация – с ясни препоръки какво може да се подобри и какви са следващите стъпки.
            </p>

            {/* Mobile / tablet: the original hero, unchanged — CTA button + centred trust row. */}
            <div className="lg:hidden">
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="group text-base px-8 py-6 bg-white text-[#1a1a1a] hover:bg-white/90" asChild>
                  <Link href="#contact-form">
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

            {/* Desktop: trust points as a grid + a prominent phone button; the form is on the right. */}
            <div className="hidden lg:block">
              <div className="mt-10 grid grid-cols-[max-content_max-content] gap-x-10 gap-y-3 text-sm text-white/70">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                  <span>100% безплатно</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                  <span>Без обвързване</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 shrink-0 text-emerald-400" />
                  <span>Отговор до 24 часа</span>
                </div>
                <div className="flex items-center gap-2">
                  <ListChecks className="h-4 w-4 shrink-0 text-emerald-400" />
                  <span>Ясни препоръки и конкретни стъпки</span>
                </div>
              </div>

              <a
                href={`tel:${siteConfig.phone}`}
                className="group mt-10 inline-flex items-center gap-4 rounded-full border border-white/20 bg-white/10 py-2 pl-2 pr-6 text-white backdrop-blur-sm transition-colors hover:bg-white/15 hover:border-white/30"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-600 text-white">
                  <Phone className="h-5 w-5" />
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="text-xs text-white/60">Предпочитате разговор?</span>
                  <span className="text-lg font-semibold tracking-tight">{siteConfig.phoneDisplay}</span>
                </span>
              </a>
            </div>
          </div>

          {/* Top offset = Inter cap height at 48/60px, so the card lines up with the top of the capital "П", not the line box. */}
          {/* Right (desktop only): the same lead form as the contact section — same API, same GTM events. */}
          <div id="hero-form" className="hidden lg:block lg:mt-[13px] xl:mt-4 scroll-mt-28 bg-card text-foreground rounded-2xl p-8 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <p className="text-xl font-bold tracking-tight">Безплатен анализ</p>
              <a
                href={siteConfig.addresses.sofia.googleBusinessProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-1.5 pt-1 text-xs font-medium text-muted-foreground hover:text-foreground"
              >
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
                {googleRating.value} в Google
              </a>
            </div>
            <p className="mt-1 mb-6 text-sm text-muted-foreground">Ще се свържем с вас до 24 часа.</p>
            <LeadForm idPrefix="hero" location="hero" messageRows={3} />
          </div>
        </div>
      </div>
    </section>
  )
}
