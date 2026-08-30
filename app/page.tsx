import type { Metadata } from "next"
import { AnnouncementBar } from "@/components/announcement-bar"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { About } from "@/components/about"
import { Results } from "@/components/results"
import { Testimonials } from "@/components/testimonials"
import { Contact } from "@/components/contact"
import { HomeFaq } from "@/components/home-faq"
import { HomeServicesOverview } from "@/components/home-services-overview"
import { Footer } from "@/components/footer"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: { absolute: "Total Profit | Счетоводна кантора в София" },
  description: "Total Profit е счетоводна кантора в София за фирми и предприемачи. Счетоводни услуги, ТРЗ, данъчни консултации, ДДС и регистрация на фирми.",
  alternates: { canonical: siteConfig.url },
  openGraph: {
    title: "Total Profit | Счетоводна кантора в София",
    description: "Счетоводни услуги, ТРЗ и данъчни консултации за бизнес в София и онлайн в България.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "bg_BG",
    type: "website",
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: "Total Profit — счетоводна кантора в София" }],
  },
}

export default function Home() {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <AnnouncementBar />
        <Header />
      </div>
      <main className="min-h-screen">
        <Hero />
        <Services />
        <HomeServicesOverview />
        <About />
        <Results />
        <Testimonials />
        <HomeFaq />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
