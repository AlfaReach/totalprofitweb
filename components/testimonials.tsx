import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Quote, Star, ExternalLink } from "lucide-react"
import { siteConfig } from "@/lib/site-config"
import { googleRating, googleReviews } from "@/lib/reviews"

function Stars({ size = "h-4 w-4" }: { size?: string }) {
  return (
    <span className="flex gap-0.5" aria-label="5 от 5 звезди">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} className={`${size} fill-amber-400 text-amber-400`} aria-hidden="true" />
      ))}
    </span>
  )
}

export function Testimonials() {
  const profileUrl = siteConfig.addresses.sofia.googleBusinessProfileUrl

  return (
    <section id="testimonials" className="py-28 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <p className="text-sm font-medium tracking-widest text-muted-foreground uppercase mb-4">Отзиви</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">Какво казват клиентите</h2>
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <Stars />
            <span>{googleRating.value} в Google</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {googleReviews.map((review) => (
            <Card key={review.author} className="border-border hover:shadow-lg transition-shadow">
              <CardContent className="flex h-full flex-col pt-8 pb-6">
                <div className="mb-4">
                  <Stars />
                </div>
                <Quote className="h-8 w-8 text-muted-foreground/20 mb-4" aria-hidden="true" />
                <blockquote className="flex-1 text-foreground leading-relaxed mb-6">
                  {`„${review.excerpt ? `${review.quote.replace(/[.!?]+\s*$/, "")}…` : review.quote}“`}
                </blockquote>
                <div className="border-t border-border pt-4">
                  <p className="font-bold text-foreground">{review.author}</p>
                  <p className="text-sm text-muted-foreground">
                    Google отзив{review.role ? ` · ${review.role}` : ""}
                  </p>
                  {review.excerpt && (
                    <a
                      href={profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center text-sm font-medium hover:underline underline-offset-4"
                    >
                      Целият отзив в Google
                      <ExternalLink className="ml-1.5 h-3 w-3" />
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center gap-4">
          <Button size="lg" asChild>
            <a href="/#contact-form">ИСКАМ БЕЗПЛАТЕН АНАЛИЗ</a>
          </Button>
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Вижте всички отзиви в Google
          </a>
        </div>
      </div>
    </section>
  )
}
