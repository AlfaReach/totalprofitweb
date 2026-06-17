import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Quote, Star, ArrowRight } from "lucide-react"
import Link from "next/link"

const testimonials = [
  {
    quote: "Работим със счетоводната кантора вече 3 години и сме много доволни. Освен че всичко е изрядно, често получаваме полезни съвети за оптимизиране на разходите и данъците. Комуникацията с екипа е винаги бърза и коректна.",
    author: "А. М. Груп",
    role: "Дигитална агенция",
    rating: 5,
  },
  {
    quote: "Като собственик на малък бизнес често имам въпроси за документи и данъци. Всеки път получавам ясен отговор и съдействие. Счетоводители, на които мога да разчитам.",
    author: "П. Манев",
    role: "Собственик на онлайн магазин",
    rating: 5,
  },
  {
    quote: "Работят перфектно, спазват всички срокове и ми дават ясни насоки при всеки въпрос. Винаги получавам бърза обратна връзка и отлично обслужване. 10/10!",
    author: "Д-р Д. Георгиев",
    role: "Зъболекар",
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="py-28 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <p className="text-sm font-medium tracking-widest text-muted-foreground uppercase mb-4">Отзиви</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">Какво казват нашите клиенти</h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-border hover:shadow-lg transition-shadow">
              <CardContent className="pt-8 pb-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <Quote className="h-8 w-8 text-muted-foreground/20 mb-4" />
                <p className="text-foreground leading-relaxed mb-6">{`"${testimonial.quote}"`}</p>
                <div className="border-t border-border pt-4">
                  <p className="font-bold text-foreground">{testimonial.author}</p>
                  {testimonial.role && <p className="text-sm font-medium text-muted-foreground">{testimonial.role}</p>}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button size="lg" className="group" asChild>
            <Link href="#contact">
              СТАНИ НАШ ДОВОЛЕН КЛИЕНТ
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
