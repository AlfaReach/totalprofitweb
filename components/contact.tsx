"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { CheckCircle2, Loader2, Mail, MapPin, Phone } from "lucide-react"

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
  }
}

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    setErrorMessage("")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Грешка при изпращане.")
      }

      // Конверсия — палим само при реален успех от API/Resend
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({ event: "lead_form_submit" })

      setStatus("success")
      setFormData({ name: "", email: "", phone: "", message: "" })
    } catch (err) {
      setStatus("error")
      setErrorMessage(err instanceof Error ? err.message : "Грешка при изпращане. Моля опитайте по-късно.")
    }
  }

  return (
    <section id="contact" className="py-28 bg-foreground text-background">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-medium tracking-widest text-background/60 uppercase mb-4">Контакт</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance mb-6">
              Вземете безплатен анализ на бизнеса ви
            </h2>
            <p className="text-lg text-background/70 mb-8 leading-relaxed">
              {'Ще прегледаме текущото ви счетоводство и ще ви покажем къде можете да спестите \u2013 напълно безплатно и без обвързване.'}
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-background/10">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Телефон</p>
                  <a href="tel:+359898252516" className="text-background/70">+359 898 252 516</a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-background/10">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Имейл</p>
                  <a href="mailto:office@totalprofit.bg" className="text-background/70">office@totalprofit.bg</a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-background/10">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Офис София</p>
                  <p className="text-background/70">бул. "Владимир Вазов" 17, ет. Партер, 1510</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-background/10">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Офис Велико Търново</p>
                  <p className="text-background/70">ул. Димитър Буйнозов 7, ет. Партер</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 text-sm">
              <span className="flex items-center gap-2 text-background/80">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                100% безплатно
              </span>
              <span className="flex items-center gap-2 text-background/80">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                Без обвързване
              </span>
              <span className="flex items-center gap-2 text-background/80">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                Отговор до 24ч
              </span>
            </div>
          </div>

          {/* Form */}
          <div className="bg-card text-foreground rounded-2xl p-8 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name">Име *</Label>
                <Input
                  id="name"
                  placeholder="Вашето име"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="bg-background"
                />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">Имейл *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Телефон</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+359 888 123 456"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-background"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Съобщение *</Label>
                <Textarea
                  id="message"
                  placeholder="Опишете накратко вашия бизнес и какво търсите..."
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  className="bg-background"
                />
              </div>
              {status === "success" ? (
                <div className="flex flex-col items-center gap-3 py-4">
                  <CheckCircle2 className="h-10 w-10 text-emerald-500" />
                  <p className="text-center font-medium text-foreground">
                    Благодарим ви! Ще се свържем с вас скоро.
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    className="bg-transparent"
                    onClick={() => setStatus("idle")}
                  >
                    Изпрати ново запитване
                  </Button>
                </div>
              ) : (
                <>
                  <Button type="submit" size="lg" className="w-full text-base py-6" disabled={status === "loading"}>
                    {status === "loading" ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Изпращане...
                      </>
                    ) : (
                      "ИСКАМ БЕЗПЛАТЕН АНАЛИЗ"
                    )}
                  </Button>
                  {status === "error" && (
                    <p className="text-sm text-center text-red-500">
                      {errorMessage}
                    </p>
                  )}
                  <p className="text-xs text-center text-muted-foreground">
                    Изпращайки формата, се съгласявате с нашата{" "}
                    <a href="/privacy-policy" className="underline hover:text-foreground transition-colors">
                      политика за поверителност
                    </a>
                    .
                  </p>
                </>
              )}
            </form>
          </div>
        </div>

        {/* Google Maps */}
        <div className="mt-16">
          <p className="text-sm font-medium tracking-widest text-background/60 uppercase mb-4 text-center">Намерете ни</p>
          <div className="rounded-2xl overflow-hidden border border-background/10 shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2931.9387722991387!2d23.355315400000002!3d42.7050172!2m3!1f0!2f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa8fa44f9724d7%3A0x2465709e83297304!2z0KHRh9C10YLQvtCy0L7QtNCwINC60LDQvdGC0L7RgNCwIOKAnNCi0J7QotCQ0Jsg0J_QoNCe0KTQmNCi4oCd!5e0!3m2!1sen!2sbg!4v1774968421986!5m2!1sen!2sbg"
              width="100%"
              height="400"
              style={{ border: 0, display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Total Profit - Офис София"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
