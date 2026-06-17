import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calculator, FileText, Users, Shield, ArrowRight, Building2, Scale } from "lucide-react"
import Link from "next/link"

const services = [
  {
    icon: Calculator,
    title: "Счетоводно обслужване",
    description: "От отчитането на документи и месечните справки-декларации до междинните и годишни финансови отчети и данъчни декларации за физически и юридически лица.",
    highlight: "Цени започващи от 125 \u20AC / месец",
  },
  {
    icon: FileText,
    title: "Данъчни консултации",
    description: "Законна оптимизация, подаване на декларации, планиране",
    highlight: "до 30% спестявания",
  },
  {
    icon: Users,
    title: "ТРЗ и личен състав",
    description: "Заплати, осигуровки, трудови договори и уведомления",
    highlight: "от 7 \u20AC / служител",
  },
  {
    icon: Building2,
    title: "Регистрация на фирми",
    description: "ЕООД, ООД, ЕТ \u2013 бързо и коректно, всички документи",
    highlight: "от 150 \u20AC",
  },
  {
    icon: Shield,
    title: "ДДС регистрация",
    description: "Регистрация, дерегистрация и месечни декларации",
    highlight: "включено в абонамента",
  },
  {
    icon: Scale,
    title: "Данъчна защита",
    description: "Представителство пред НАП и НОИ",
    highlight: "доказан опит и реална защита",
  },
]

export function Services() {
  return (
    <section id="services" className="py-28 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <p className="text-sm font-medium tracking-widest text-muted-foreground uppercase mb-4">Услуги</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">Как ви помагаме да растете?</h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            {"Поемаме счетоводството, данъците и административните процеси, за да имате спокойствие, ясни цифри и повече време за развитие на бизнеса."}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card
              key={service.title}
              className="group hover:shadow-xl transition-all duration-300 border-border hover:border-foreground/20 overflow-hidden"
            >
              <CardContent className="pt-8 pb-6 px-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-foreground text-background">
                  <service.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{service.description}</p>
                <p className="text-sm font-semibold text-foreground">{service.highlight}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-muted-foreground italic">
          {"Работим с професионални счетоводни системи от най-висок клас, които осигуряват точност, навременност и пълна сигурност при проверки."}
        </p>

        <div className="mt-8 text-center">
          <Button size="lg" className="group" asChild>
            <Link href="#contact">
              ПОИСКАЙТЕ ОФЕРТА ЗА ВАШИЯ БИЗНЕС
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <p className="mt-3 text-sm text-muted-foreground">Отговор до 24 часа.</p>
        </div>
      </div>
    </section>
  )
}
