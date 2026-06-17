export function SchemaOrg() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AccountingService",
        "@id": "https://www.totalprofit.bg/#organization",
        "name": "Total Profit",
        "url": "https://www.totalprofit.bg",
        "telephone": "+359898252516",
        "email": "office@totalprofit.bg",
        "logo": "https://www.totalprofit.bg/og-image.jpg",
        "areaServed": ["София", "Велико Търново", "България"]
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://www.totalprofit.bg/#sofia",
        "name": "Total Profit — Счетоводна кантора София",
        "telephone": "+359898252516",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "бул. Владимир Вазов 17, ет. Партер",
          "addressLocality": "София",
          "postalCode": "1510",
          "addressCountry": "BG"
        },
        "openingHours": "Mo-Fr 09:00-18:00",
        "url": "https://www.totalprofit.bg"
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://www.totalprofit.bg/#vt",
        "name": "Total Profit — Счетоводна кантора Велико Търново",
        "telephone": "+359898252516",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "ул. Димитър Буйнозов 7, ет. Партер",
          "addressLocality": "Велико Търново",
          "addressCountry": "BG"
        },
        "url": "https://www.totalprofit.bg"
      }
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
