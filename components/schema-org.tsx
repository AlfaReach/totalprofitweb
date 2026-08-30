import { siteConfig } from "@/lib/site-config"

export function SchemaOrg() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "AccountingService"],
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        alternateName: siteConfig.alternateNames,
        legalName: siteConfig.legalName,
        identifier: siteConfig.legalId,
        url: siteConfig.url,
        logo: { "@type": "ImageObject", url: siteConfig.logo },
        image: { "@type": "ImageObject", url: `${siteConfig.url}${siteConfig.ogImage}` },
        email: siteConfig.email,
        telephone: siteConfig.phone,
        sameAs: [siteConfig.facebook, siteConfig.instagram, siteConfig.addresses.sofia.googleBusinessProfileUrl],
        areaServed: [{ "@type": "City", name: "София" }, { "@type": "Country", name: "България" }],
        knowsAbout: ["Счетоводство", "Счетоводно обслужване", "Данъчни консултации", "ТРЗ и личен състав", "ЗДДС", "Годишно счетоводно приключване"],
        contactPoint: [{ "@type": "ContactPoint", telephone: siteConfig.phone, email: siteConfig.email, contactType: "customer service", availableLanguage: ["Bulgarian"] }],
      },
      {
        "@type": ["LocalBusiness", "AccountingService"],
        "@id": `${siteConfig.url}/#sofia-office`,
        name: siteConfig.name,
        alternateName: siteConfig.alternateNames,
        parentOrganization: { "@id": `${siteConfig.url}/#organization` },
        url: `${siteConfig.url}/kontakti`,
        email: siteConfig.email,
        telephone: siteConfig.phone,
        image: `${siteConfig.url}${siteConfig.ogImage}`,
        hasMap: siteConfig.addresses.sofia.mapsUrl,
        priceRange: "€€",
        address: {
          "@type": "PostalAddress",
          streetAddress: siteConfig.addresses.sofia.streetAddress,
          postalCode: siteConfig.addresses.sofia.postalCode,
          addressLocality: siteConfig.addresses.sofia.locality,
          addressCountry: siteConfig.addresses.sofia.country,
        },
        areaServed: [{ "@type": "City", name: "София" }, { "@type": "Country", name: "България" }],
        openingHoursSpecification: [
          { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: siteConfig.openingHours.opens, closes: siteConfig.openingHours.closes },
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        alternateName: siteConfig.alternateNames,
        publisher: { "@id": `${siteConfig.url}/#organization` },
        inLanguage: "bg-BG",
      },
    ],
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}
