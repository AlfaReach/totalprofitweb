export const siteConfig = {
  name: "Total Profit",
  brandNameBg: "Тотал Профит",
  alternateNames: ["Тотал Профит", "TOTAL PROFIT", "TotalProfit", "totalprofit"] as const,
  legalName: "Тотал Профит ЕООД",
  legalId: "208651940",
  url: "https://www.totalprofit.bg",
  phone: "+359898252516",
  phoneDisplay: "+359 898 252 516",
  email: "office@totalprofit.bg",
  facebook: "https://www.facebook.com/totalprofitbg",
  instagram: "https://www.instagram.com/totalprofitbg/",
  logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WEBSITE%20LOGO-dRDyk9idK3ekP1XwkcLI5ZYa5TB5Ba.png",
  // Versioned so Facebook/LinkedIn/X/Google refetch instead of serving the previously
  // cached (and wrongly square) thumbnail. Bump when the image changes.
  ogImage: "/og-image.jpg?v=2",
  openingHours: { opens: "09:00", closes: "17:00" },
  addresses: {
    sofia: {
      label: "Офис София",
      streetAddress: 'ул. „Баба Вида“ 1',
      postalCode: "1510",
      locality: "София",
      country: "BG",
      mapsUrl: "https://www.google.com/maps?cid=2622626184120857348",
      mapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2931.9387722991387!2d23.355315400000002!3d42.7050172!2m3!1f0!2f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa8fa44f9724d7%3A0x2465709e83297304!2z0KHRh9C10YLQvtCy0L7QtNCwINC60LDQvdGC0L7RgNCwIOKAnNCi0J7QotCQ0Jsg0J_QoNCe0KTQmNCi4oCd!5e0!3m2!1sen!2sbg!4v1774968421986!5m2!1sen!2sbg",
      googleBusinessProfileUrl: "https://www.google.com/maps?cid=2622626184120857348",
    },
    velikoTarnovo: {
      label: "Офис Велико Търново",
      streetAddress: "ул. Димитър Буйнозов 7, ет. партер",
      locality: "Велико Търново",
      country: "BG",
    },
  },
} as const

export const primaryServices = [
  {
    title: "Счетоводно обслужване",
    shortTitle: "Счетоводно обслужване",
    href: "/schetovodno-obsluzhvane",
  },
  {
    title: "ТРЗ услуги в София",
    shortTitle: "ТРЗ и личен състав",
    href: "/trz-uslugi-sofia",
  },
  {
    title: "Данъчни консултации",
    shortTitle: "Данъчни консултации",
    href: "/danachni-konsultacii",
  },
  {
    title: "Регистрация на фирма",
    shortTitle: "Регистрация на фирма",
    href: "/registraciya-na-firma",
  },
  {
    title: "ДДС регистрация",
    shortTitle: "ДДС регистрация",
    href: "/dds-registraciya",
  },
  {
    title: "Годишно счетоводно приключване",
    shortTitle: "Годишно приключване",
    href: "/godishno-priklyuchvane",
  },
  {
    title: "Съдействие при проверки и ревизии от НАП",
    shortTitle: "Данъчна защита",
    href: "/danachna-zashtita",
  },
] as const

export const verticalServices = [
  {
    title: "Счетоводство за онлайн магазин",
    href: "/schetovodstvo-za-onlayn-magazin",
  },
  {
    title: "Счетоводство за свободни професии",
    href: "/schetovodstvo-za-svobodni-profesii",
  },
] as const
