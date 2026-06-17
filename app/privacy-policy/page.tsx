import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Shield, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Политика за поверителност | Total Profit",
  description: "Политика за поверителност и защита на личните данни на Total Profit ЕООД.",
  alternates: {
    canonical: "https://www.totalprofit.bg/privacy-policy",
  },
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
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

      <section className="bg-foreground text-background pb-16 pt-8">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-background/10">
              <Shield className="h-7 w-7 text-background" />
            </div>
          </div>
          <p className="text-sm font-medium tracking-widest text-background/60 uppercase mb-4">Правна информация</p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Политика за поверителност</h1>
          <p className="mt-4 text-background/70">Последна актуализация: март 2026 г.</p>
        </div>
      </section>

      <main className="py-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 space-y-8">

          <div className="rounded-2xl border border-border bg-card p-8">
            <h2 className="text-lg font-bold mb-4">1. Администратор на лични данни</h2>
            <p className="text-muted-foreground mb-3">Администратор на личните Ви данни е <strong>Тотал Профит ЕООД</strong>, ЕИК: 208651940, с офиси на адрес:</p>
            <ul className="text-muted-foreground space-y-1 mb-4">
              <li>бул. „Владимир Вазов" 17, ет. Партер, 1510 София</li>
              <li>ул. Димитър Буйнозов 7, ет. Партер, Велико Търново</li>
            </ul>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="tel:+359898252516" className="flex items-center gap-2 font-medium"><Phone className="h-4 w-4" />+359 898 252 516</a>
              <a href="mailto:office@totalprofit.bg" className="flex items-center gap-2 font-medium"><Mail className="h-4 w-4" />office@totalprofit.bg</a>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-8">
            <h2 className="text-lg font-bold mb-4">2. Какви данни събираме</h2>
            <ul className="text-muted-foreground space-y-2">
              <li>• Имена (физически лица и представители на фирми)</li>
              <li>• Имейл адрес</li>
              <li>• Телефонен номер</li>
              <li>• Информация от формата за контакт или чрез WhatsApp</li>
              <li>• Счетоводни данни (ЕГН, ЕИК, финансова информация) — само при сключване на договор</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-card p-8">
            <h2 className="text-lg font-bold mb-4">3. Цели и правно основание за обработката</h2>
            <div className="space-y-4">
              <div className="border-l-2 border-border pl-4">
                <p className="font-semibold mb-1">Изпълнение на договор (чл. 6, ал. 1, б. „б" GDPR)</p>
                <p className="text-muted-foreground text-sm">За предоставяне на счетоводни, данъчни и ТРЗ услуги, регистрация на фирми и данъчна защита.</p>
              </div>
              <div className="border-l-2 border-border pl-4">
                <p className="font-semibold mb-1">Законово задължение (чл. 6, ал. 1, б. „в" GDPR)</p>
                <p className="text-muted-foreground text-sm">При спазване на Закона за счетоводството, ЗДДС, КСО, КТ и други нормативни актове.</p>
              </div>
              <div className="border-l-2 border-border pl-4">
                <p className="font-semibold mb-1">Легитимен интерес (чл. 6, ал. 1, б. „е" GDPR)</p>
                <p className="text-muted-foreground text-sm">За отговор на запитвания чрез формата за контакт или WhatsApp. Данните се използват единствено за отговор на запитването.</p>
              </div>
              <div className="border-l-2 border-border pl-4">
                <p className="font-semibold mb-1">Съгласие (чл. 6, ал. 1, б. „а" GDPR)</p>
                <p className="text-muted-foreground text-sm">При изрично съгласие — за изпращане на счетоводни съвети и информационни материали.</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-8">
            <h2 className="text-lg font-bold mb-4">4. Срок на съхранение</h2>
            <p className="text-muted-foreground mb-2">Данните от счетоводни услуги се съхраняват <strong>10 години</strong> съгласно Закона за счетоводството.</p>
            <p className="text-muted-foreground mb-2">Данните от запитвания при несключен договор се съхраняват до <strong>12 месеца</strong>.</p>
            <p className="text-muted-foreground">След изтичане на сроковете данните се изтриват или анонимизират.</p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-8">
            <h2 className="text-lg font-bold mb-4">5. Получатели на данните и трети страни</h2>
            <p className="text-muted-foreground mb-3">Вашите данни не се продават. Могат да бъдат предоставени само на:</p>
            <ul className="text-muted-foreground space-y-2 mb-3">
              <li>• НАП, НОИ и други държавни органи — при законово задължение</li>
              <li>• Доставчици на счетоводен софтуер — с GDPR съответствие</li>
              <li>• Одитори или правни консултанти — само при необходимост</li>
            </ul>
            <p className="text-muted-foreground text-sm">Сайтът използва външни доставчици (хостинг, аналитични инструменти), обвързани с изисквания за защита на данните съгласно GDPR.</p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-8">
            <h2 className="text-lg font-bold mb-4">6. Вашите права</h2>
            <div className="grid sm:grid-cols-2 gap-3 mb-4">
              <div className="rounded-xl border border-border bg-secondary/50 p-4"><p className="font-semibold text-sm mb-1">Право на достъп</p><p className="text-sm text-muted-foreground">Да получите информация какви данни обработваме за Вас.</p></div>
              <div className="rounded-xl border border-border bg-secondary/50 p-4"><p className="font-semibold text-sm mb-1">Право на коригиране</p><p className="text-sm text-muted-foreground">Да поискате корекция на неточни данни.</p></div>
              <div className="rounded-xl border border-border bg-secondary/50 p-4"><p className="font-semibold text-sm mb-1">Право на изтриване</p><p className="text-sm text-muted-foreground">Да поискате изтриване при определени условия.</p></div>
              <div className="rounded-xl border border-border bg-secondary/50 p-4"><p className="font-semibold text-sm mb-1">Право на ограничение</p><p className="text-sm text-muted-foreground">Да ограничите обработката при оспорване.</p></div>
              <div className="rounded-xl border border-border bg-secondary/50 p-4"><p className="font-semibold text-sm mb-1">Право на преносимост</p><p className="text-sm text-muted-foreground">Да получите данните в машинно-четим формат.</p></div>
              <div className="rounded-xl border border-border bg-secondary/50 p-4"><p className="font-semibold text-sm mb-1">Право на възражение</p><p className="text-sm text-muted-foreground">Да се противопоставите на обработка въз основа на легитимен интерес.</p></div>
            </div>
            <p className="text-sm text-muted-foreground mb-2">За упражняване изпратете имейл на <a href="mailto:office@totalprofit.bg" className="font-medium underline">office@totalprofit.bg</a>. Ще отговорим до 30 дни.</p>
            <p className="text-sm text-muted-foreground">Жалби: <strong>КЗЛД</strong>, ул. „Проф. Цветан Лазаров" 2, 1592 София — <a href="https://www.cpdp.bg" target="_blank" rel="noopener noreferrer" className="underline">www.cpdp.bg</a></p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-8">
            <h2 className="text-lg font-bold mb-4">7. Бисквитки (Cookies)</h2>
            <div className="grid sm:grid-cols-3 gap-3 mb-4">
              <div className="rounded-xl border p-4"><p className="font-semibold text-sm mb-2">Задължителни</p><p className="text-sm text-muted-foreground">Необходими за функционирането на сайта.</p></div>
              <div className="rounded-xl border p-4"><p className="font-semibold text-sm mb-2">Аналитични</p><p className="text-sm text-muted-foreground">Google Analytics — само при изрично съгласие.</p></div>
              <div className="rounded-xl border p-4"><p className="font-semibold text-sm mb-2">Маркетингови</p><p className="text-sm text-muted-foreground">В момента не се използват.</p></div>
            </div>
            <p className="text-sm text-muted-foreground">Управлявайте предпочитанията си чрез банера при първото посещение.</p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-8">
            <h2 className="text-lg font-bold mb-4">8. Сигурност на данните</h2>
            <p className="text-muted-foreground">Прилагаме технически и организационни мерки за защита от неоторизиран достъп. Достъп имат само упълномощени служители, обвързани с поверителност.</p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-8">
            <h2 className="text-lg font-bold mb-4">9. Промени в политиката</h2>
            <p className="text-muted-foreground">Запазваме си правото да актуализираме тази политика. Актуалната версия е достъпна на <strong>totalprofit.bg/privacy-policy</strong>.</p>
          </div>

          <div className="mt-4 rounded-2xl bg-foreground text-background p-8 text-center">
            <h2 className="text-xl font-bold mb-2">Имате въпроси относно вашите данни?</h2>
            <p className="text-background/70 mb-6">Свържете се с нас и ще отговорим в рамките на 1 работен ден.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="mailto:office@totalprofit.bg" className="flex items-center gap-2 font-medium text-background hover:text-background/80">
                <Mail className="h-4 w-4" />office@totalprofit.bg
              </a>
              <span className="hidden sm:block text-background/30">|</span>
              <a href="tel:+359898252516" className="flex items-center gap-2 font-medium text-background hover:text-background/80">
                <Phone className="h-4 w-4" />+359 898 252 516
              </a>
            </div>
          </div>

        </div>
      </main>

      <footer className="bg-secondary border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Link href="/" className="inline-block">
              <Image src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WEBSITE%20LOGO-dRDyk9idK3ekP1XwkcLI5ZYa5TB5Ba.png" alt="Total Profit" width={140} height={38} className="h-8 w-auto" />
            </Link>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <a href="tel:+359898252516">+359 898 252 516</a>
              <span>|</span>
              <a href="mailto:office@totalprofit.bg">office@totalprofit.bg</a>
            </div>
            <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Total Profit</p>
          </div>
        </div>
      </footer>
    </div>
  )
}