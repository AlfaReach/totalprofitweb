import { CheckCircle2, Mail, MapPin, Phone } from "lucide-react"
import { siteConfig } from "@/lib/site-config"
import { LeadForm } from "@/components/lead-form"

export function Contact() {
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
                  <a href={`tel:${siteConfig.phone}`} className="text-background/70">{siteConfig.phoneDisplay}</a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-background/10">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Имейл</p>
                  <a href={`mailto:${siteConfig.email}`} className="text-background/70">{siteConfig.email}</a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-background/10">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Офис София</p>
                  <p className="text-background/70">{siteConfig.addresses.sofia.streetAddress}, {siteConfig.addresses.sofia.postalCode}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-background/10">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Офис Велико Търново</p>
                  <p className="text-background/70">ул. Димитър Буйнозов 7, ет. партер</p>
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
                Отговор до 24 часа
              </span>
            </div>
          </div>

          {/* Form */}
          <div id="contact-form" className="scroll-mt-28 bg-card text-foreground rounded-2xl p-8 shadow-2xl">
            <LeadForm idPrefix="contact" location="bottom" />
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
