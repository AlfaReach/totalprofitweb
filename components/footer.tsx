import Link from "next/link"
import Image from "next/image"
import { primaryServices, siteConfig, verticalServices } from "@/lib/site-config"
import { CookieSettingsLink } from "@/components/cookie-settings-link"

export function Footer() {
  return (
    <footer className="bg-secondary border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <div className="grid gap-8 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-block" aria-label="Total Profit — начало">
              <Image src={siteConfig.logo} alt="Total Profit" width={150} height={42} sizes="150px" className="h-9 w-auto" />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">Счетоводна кантора в София за счетоводно обслужване, ТРЗ и данъчни консултации.</p>
            <div className="mt-4 space-y-1 text-sm text-muted-foreground">
              <a href={`tel:${siteConfig.phone}`} className="block hover:text-foreground">{siteConfig.phoneDisplay}</a>
              <a href={`mailto:${siteConfig.email}`} className="block hover:text-foreground">{siteConfig.email}</a>
              <p>{siteConfig.addresses.sofia.streetAddress}, {siteConfig.addresses.sofia.locality}</p>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold">Услуги</p>
            <nav className="mt-4 grid gap-2" aria-label="Услуги във футъра">
              {primaryServices.map((item) => <Link key={item.href} href={item.href} className="text-sm text-muted-foreground hover:text-foreground">{item.shortTitle}</Link>)}
              {verticalServices.map((item) => <Link key={item.href} href={item.href} className="text-sm text-muted-foreground hover:text-foreground">{item.title}</Link>)}
            </nav>
          </div>

          <div>
            <p className="text-sm font-semibold">Полезно</p>
            <nav className="mt-4 grid gap-2" aria-label="Полезни страници във футъра">
              <Link href="/ceni" className="text-sm text-muted-foreground hover:text-foreground">Цени</Link>
              <Link href="/za-nas" className="text-sm text-muted-foreground hover:text-foreground">За нас</Link>
              <Link href="/kontakti" className="text-sm text-muted-foreground hover:text-foreground">Контакти</Link>
              <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground">Блог</Link>
              <Link href="/gdd" className="text-sm text-muted-foreground hover:text-foreground">Годишна данъчна декларация</Link>
              <Link href="/redakcionna-politika" className="text-sm text-muted-foreground hover:text-foreground">Редакционна политика</Link>
              <Link href="/privacy-policy" className="text-sm text-muted-foreground hover:text-foreground">Поверителност</Link>
              <CookieSettingsLink className="text-left text-sm text-muted-foreground hover:text-foreground" />
            </nav>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {siteConfig.legalName}</p>
          <div className="flex gap-4"><a href={siteConfig.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">Facebook</a><a href={siteConfig.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">Instagram</a></div>
        </div>
      </div>
    </footer>
  )
}
