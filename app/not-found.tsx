import Link from "next/link"
import { Button } from "@/components/ui/button"
import { InnerHeader } from "@/components/inner-header"
import { Footer } from "@/components/footer"
import { primaryServices } from "@/lib/site-config"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      <InnerHeader />
      <main>
        <section className="bg-foreground py-16 text-background md:py-20">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-widest text-background/60">404</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Страницата не е намерена</h1>
            <p className="mt-4 max-w-xl leading-7 text-background/70">
              Адресът може да е променен или връзката да е непълна. По-долу са основните страници на сайта.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild className="bg-background text-foreground hover:bg-background/90">
                <Link href="/">Начало</Link>
              </Button>
              <Button variant="outline" asChild className="border-background/30 text-background hover:bg-background/10">
                <Link href="/kontakti">Контакти</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* A 404 is a crawl and navigation dead end unless it offers real onward links. */}
        <section className="py-14 md:py-16">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            <h2 className="text-xl font-semibold tracking-tight">Счетоводни услуги</h2>
            <div className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
              {primaryServices.map((service) => (
                <Link
                  key={service.href}
                  href={service.href}
                  className="text-sm font-medium hover:underline underline-offset-4"
                >
                  {service.shortTitle}
                </Link>
              ))}
              <Link href="/ceni" className="text-sm font-medium hover:underline underline-offset-4">
                Цени
              </Link>
              <Link href="/blog" className="text-sm font-medium hover:underline underline-offset-4">
                Блог
              </Link>
              <Link href="/za-nas" className="text-sm font-medium hover:underline underline-offset-4">
                За нас и екип
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
