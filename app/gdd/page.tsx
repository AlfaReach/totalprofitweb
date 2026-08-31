'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle2, Clock, Shield, Phone, Award, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { GDDMobileCTA } from '@/components/gdd-mobile-cta'
import { track } from '@/lib/analytics'
import { captureFirstTouch, getLeadContext } from '@/lib/lead-context'

export default function GDDPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    incomeType: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    captureFirstTouch()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMessage('')

    try {
      const context = getLeadContext()
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: 'gdd@totalprofit.bg',
          subject: `ГДД заявка - ${formData.incomeType}`,
          message: `Тип доход: ${formData.incomeType}\nТелефон: ${formData.phone}`,
          context,
        }),
      })

      const data = await response.json().catch(() => ({}))
      // Previously a failed send did nothing visible at all: the spinner stopped and the
      // form sat there, so the visitor believed the request had gone through. Surface it.
      if (!response.ok || !data?.success) {
        throw new Error(data?.error || 'Грешка при изпращане. Моля опитайте по-късно.')
      }

      // Конверсия за ГДД кампанията — отделен event от общата форма, пали се само след
      // потвърден успешен изпратен имейл.
      track('gdd_form_submit', { form_id: 'gdd', landing_page: context.landingPage })

      setSubmitted(true)
      setTimeout(() => {
        setFormData({ name: '', phone: '', incomeType: '' })
        setSubmitted(false)
      }, 3000)
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Грешка при изпращане. Моля опитайте по-късно.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <GDDMobileCTA />

      <div className="min-h-screen">
        {/* Hero Section - Dark like main site */}
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#252525] to-[#1a1a1a]" />

          {/* Header overlaid on hero */}
          <header className="absolute top-0 left-0 right-0 z-50 py-4">
            <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
              <Link href="/" className="inline-block">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WEBSITE%20LOGO-dRDyk9idK3ekP1XwkcLI5ZYa5TB5Ba.png"
                  alt="Total Profit"
                  width={120}
                  height={32}
                  className="h-8 w-auto"
                />
              </Link>
              <a href="tel:+359898252516" className="hidden sm:flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white transition-colors">
                <Phone className="h-4 w-4" />
                +359 898 252 516
              </a>
            </div>
          </header>

          <div className="relative z-10 mx-auto max-w-4xl px-6 py-24 text-center">
            <nav aria-label="Breadcrumb" className="mb-7 flex justify-center gap-2 text-sm text-white/55"><Link href="/" className="hover:text-white">Начало</Link><span>/</span><span>ГДД за фирми</span></nav>
            <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2.5 text-sm font-medium text-white/90 backdrop-blur-sm border border-white/10">
                <Award className="h-4 w-4 text-amber-400" />
                <span>15+ години счетоводен опит</span>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/20 px-4 py-2.5 text-sm font-medium text-amber-200 backdrop-blur-sm border border-amber-500/30">
                <Clock className="h-4 w-4 text-amber-400" />
                <span>Крайният срок е 30 юни</span>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 text-balance leading-tight">
              Съдействие за ГДД на фирмата Ви
            </h1>

            <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
              Подготовка и подаване на годишната данъчна декларация по чл. 92 ЗКПО и съдействие по годишното счетоводно приключване. Процесът може да бъде организиран дистанционно.
            </p>

            {/* Trust signals */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-white/60 mb-10">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Преглед на документите</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-emerald-400" />
                <span>Работа по актуалните правила</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-emerald-400" />
                <span>Ясен процес и срокове</span>
              </div>
            </div>

            <Button size="lg" className="group text-base px-8 py-6 bg-white text-[#1a1a1a] hover:bg-white/90" asChild>
              <a href="#form">
                ЗАЯВЕТЕ ПОДАВАНЕ НА ГДД
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </div>
        </section>

        {/* Form Section */}
        <section id="form" className="py-16 sm:py-20 px-6 bg-background">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Заявете безплатна консултация</h2>
              <p className="text-muted-foreground">Попълнете формата и ще се свържем с вас до 24 часа</p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-lg">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                    <CheckCircle2 className="h-4 w-4" />
                    Заявката е получена
                  </div>
                  <h3 className="text-xl font-bold mb-2">Благодарим ви!</h3>
                  <p className="text-muted-foreground">Ще се свържем с вас в следващите 24 часа.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Вашето име</label>
                    <Input
                      type="text"
                      placeholder="Иван Петров"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="h-12"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Телефонен номер</label>
                    <Input
                      type="tel"
                      placeholder="+359 888 123 456"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      className="h-12"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Правна форма</label>
                    <Select value={formData.incomeType} onValueChange={(value) => setFormData({ ...formData, incomeType: value })}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Изберете правна форма" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="eood">ЕООД</SelectItem>
                        <SelectItem value="ood">ООД</SelectItem>
                        <SelectItem value="ad">АД</SelectItem>
                        <SelectItem value="other">Друго юридическо лице</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading || !formData.name || !formData.phone || !formData.incomeType}
                    className="w-full h-12 text-base font-semibold"
                  >
                    {isLoading ? 'Изпраща се...' : 'Изпратете заявка'}
                  </Button>

                  {errorMessage && (
                    <p className="text-sm text-center text-red-500">{errorMessage}</p>
                  )}

                  <p className="text-xs text-muted-foreground text-center pt-2">
                    Или се обадете директно на{' '}
                    <a href="tel:+359898252516" className="font-semibold text-accent hover:underline">
                      +359 898 252 516
                    </a>
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 sm:py-20 px-6 bg-secondary">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Защо да изберете Total Profit?</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/10">
                  <Clock className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Организирана обработка</h3>
                  <p className="text-muted-foreground">След преглед на документите уточняваме необходимите стъпки и организацията за подаване преди крайния срок.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/10">
                  <CheckCircle2 className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Без посещение на офис</h3>
                  <p className="text-muted-foreground">Всичко онлайн. Пратете документи, ние се справяме.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/10">
                  <Shield className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Преглед на информацията</h3>
                  <p className="text-muted-foreground">Преглеждаме счетоводната информация и необходимите документи преди подаването на декларацията.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/10">
                  <Award className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Персонална подкрепа</h3>
                  <p className="text-muted-foreground">Собствен счетоводител за фирмата Ви при всеки въпрос.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <section className="py-16 sm:py-20 px-6 bg-background">
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-6">
              <div className="text-3xl font-bold text-amber-500">★★★★★</div>
            </div>
            <blockquote className="text-xl sm:text-2xl font-medium mb-6 text-balance">
              &ldquo;Като фирма работим с Total Profit и годишната данъчна декларация минава без стрес — подава се навреме и коректно, без тичане в последния момент. Отговарят бързо на всеки въпрос и винаги сме спокойни, че всичко пред НАП е изрядно.&rdquo;
            </blockquote>
            <p className="text-muted-foreground font-semibold">Филип А., управител, А. М. Груп</p>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 sm:py-20 px-6 bg-foreground text-background">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Не чакайте последния момент</h2>
            <p className="text-lg text-background/70 mb-8">
              Крайният срок е 30 юни. Заявете подаване на ГДД за фирмата си още днес.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-background text-foreground hover:bg-background/90" asChild>
                <a href="#form">
                  Заявете съдействие за ГДД
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <a
                href="tel:+359898252516"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-white/30 bg-transparent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <Phone className="h-4 w-4" />
                Свържете се с нас
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border py-8 px-6 bg-secondary">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
              <Link href="/" className="inline-block">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WEBSITE%20LOGO-dRDyk9idK3ekP1XwkcLI5ZYa5TB5Ba.png"
                  alt="Total Profit"
                  width={100}
                  height={27}
                  className="h-6 w-auto"
                />
              </Link>
              <div className="flex flex-wrap gap-x-4 gap-y-2 justify-center">
                <a href="tel:+359898252516" className="hover:text-foreground transition-colors">+359 898 252 516</a>
                <span className="text-border">|</span>
                <a href="mailto:office@totalprofit.bg" className="hover:text-foreground transition-colors">office@totalprofit.bg</a>
                <span className="text-border">|</span>
                <Link href="/privacy-policy" className="hover:text-foreground transition-colors">
                  Политика за поверителност
                </Link>
              </div>
              <p>&copy; {new Date().getFullYear()} Total Profit</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
