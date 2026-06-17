import { AnnouncementBar } from "@/components/announcement-bar"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { About } from "@/components/about"
import { Results } from "@/components/results"
import { Testimonials } from "@/components/testimonials"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { SchemaOrg } from "@/components/schema-org"

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Колко струва счетоводното обслужване?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Цените започват от 125 € на месец за малки фирми. Предлагаме безплатен анализ на вашия бизнес преди да направите избор."
      }
    },
    {
      "@type": "Question",
      "name": "Работите ли с фирми извън София?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Да, имаме офиси в София и Велико Търново, и обслужваме клиенти от цяла България онлайн."
      }
    },
    {
      "@type": "Question",
      "name": "Как да започна работа с Total Profit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Попълнете формата за безплатен анализ. Ще се свържем с вас до 24 часа."
      }
    }
  ]
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AccountingService",
  name: "Total Profit",
  url: "https://www.totalprofit.bg",
  telephone: "+359898252516",
  email: "office@totalprofit.bg",
  description: "Счетоводна кантора с 15+ години опит. Счетоводство, данъчни консултации и ТРЗ обслужване за малък и среден бизнес.",
  priceRange: "€€",
  openingHours: "Mo-Fr 09:00-18:00",
  location: [
    {
      "@type": "Place",
      name: "Офис София",
      address: {
        "@type": "PostalAddress",
        streetAddress: "бул. Владимир Вазов 17, ет. Партер",
        addressLocality: "София",
        addressCountry: "BG",
        postalCode: "1510"
      }
    },
    {
      "@type": "Place",
      name: "Офис Велико Търново",
      address: {
        "@type": "PostalAddress",
        streetAddress: "ул. Димитър Буйнозов 7, ет. Партер",
        addressLocality: "Велико Търново",
        addressCountry: "BG"
      }
    }
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    reviewCount: "3"
  },
  review: [
    {
      "@type": "Review",
      reviewBody: "Работим със счетоводната кантора вече 3 години и сме много доволни. Освен че всичко е изрядно, често получаваме полезни съвети за оптимизиране на разходите и данъците. Комуникацията с екипа е винаги бърза и коректна.",
      author: { "@type": "Organization", name: "А. М. Груп" },
      reviewRating: { "@type": "Rating", ratingValue: "5" }
    },
    {
      "@type": "Review",
      reviewBody: "Като собственик на малък бизнес често имам въпроси за документи и данъци. Всеки път получавам ясен отговор и съдействие. Счетоводители, на които мога да разчитам.",
      author: { "@type": "Person", name: "П. Манев" },
      reviewRating: { "@type": "Rating", ratingValue: "5" }
    },
    {
      "@type": "Review",
      reviewBody: "Работят перфектно, спазват всички срокове и ми дават ясни насоки при всеки въпрос. Винаги получавам бърза обратна връзка и отлично обслужване. 10/10!",
      author: { "@type": "Person", name: "Д-р Д. Георгиев" },
      reviewRating: { "@type": "Rating", ratingValue: "5" }
    }
  ]
}

export default function Home() {
  return (
    <>
      <SchemaOrg />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main className="min-h-screen">
        <div className="fixed top-0 left-0 right-0 z-50">
          <AnnouncementBar />
          <Header />
        </div>
        <Hero />
        <Services />
        <About />
        <Results />
        <Testimonials />
        <Contact />
        <Footer />
      </main>
    </>
  )
}
