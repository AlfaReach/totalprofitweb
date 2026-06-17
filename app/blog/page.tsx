"use client"

import { useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function BlogPage() {
  useEffect(() => {
    const script = document.createElement("script")
    script.src =
      "https://app.trysoro.com/api/embed/1bc9b407-9b52-4106-974c-aa02565173ac"
    script.defer = true
    document.body.appendChild(script)

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-foreground text-background">
        <div className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="inline-block">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WEBSITE%20LOGO-dRDyk9idK3ekP1XwkcLI5ZYa5TB5Ba.png"
                alt="Total Profit"
                width={140}
                height={38}
                className="h-8 w-auto brightness-0 invert"
                priority
              />
            </Link>
            <Button size="sm" asChild className="bg-background text-foreground hover:bg-background/90">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Начало
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-foreground text-background pb-16 pt-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <p className="text-sm font-medium tracking-widest text-background/60 uppercase mb-4">
            Блог
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-balance">
            Счетоводни съвети и данъчни новини
          </h1>
          <p className="mt-4 text-lg text-background/70 max-w-2xl mx-auto leading-relaxed">
            Полезни статии от нашия екип за счетоводство, данъци и финансово управление на бизнеса.
          </p>
        </div>
      </section>

      {/* Soro Blog */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div id="soro-blog"></div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-secondary">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-4 text-balance">
            Нуждаете се от професионална консултация?
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Свържете се с нашия екип за безплатен анализ на вашия бизнес.
          </p>
          <Button size="lg" asChild>
            <Link href="/#contact">
              Безплатен анализ
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Link href="/" className="inline-block">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WEBSITE%20LOGO-dRDyk9idK3ekP1XwkcLI5ZYa5TB5Ba.png"
                alt="Total Profit"
                width={140}
                height={38}
                className="h-8 w-auto"
              />
            </Link>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
              <a href="tel:+359898252516">+359 898 252 516</a>
              <span className="text-border">|</span>
              <a href="mailto:office@totalprofit.bg">office@totalprofit.bg</a>
            </div>
            <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Total Profit</p>
          </div>
        </div>
      </footer>
    </div>
  )
}