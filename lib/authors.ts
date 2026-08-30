/**
 * Should /avtori/<slug> be indexable?
 *
 * Currently FALSE. Each profile carries the person's name, role and specialty —
 * every one of which already appears on /za-nas. Until the team supplies real
 * biographical detail (education, certifications, years in practice, the kinds of
 * cases they handle), an indexed profile is a ~50-word near-duplicate of a slice of
 * /za-nas with nothing added, six times over.
 *
 * The pages stay live, linked and schema-marked either way: they remain the `url`
 * of each Person entity, the team cards still link to them, and robots is
 * `noindex, follow` so link equity keeps flowing.
 *
 * Flip to true the moment real bios land. Nothing else needs changing — the author
 * page metadata and the sitemap both read this flag.
 */
export const authorPagesIndexable = false

export type AuthorProfile = {
  slug: string
  name: string
  role: string
  specialty: string
  image: string
  bio: string
}

export const authorProfiles: AuthorProfile[] = [
  {
    slug: "pepa-kancheva",
    name: "Пепа Кънчева",
    role: "Главен счетоводител",
    specialty: "Данъчен експерт и финансов консултант",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D0%9F%D0%B5%D0%BF%D0%B0-KtkKKVsbBUFThesePbeVB1VcRsLps7.png",
    bio: "Пепа Кънчева е главен счетоводител в Total Profit с фокус върху данъчни и финансови казуси на фирми.",
  },
  {
    slug: "antoan-rushidov",
    name: "Антоан Рушидов",
    role: "Управител",
    specialty: "Производство, търговия и износ",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D0%90%D0%BD%D1%82%D0%BE%D0%B0%D0%BD-C1yh7KnIkyDJREMe31KFS9o2wK3Gzg.png",
    bio: "Антоан Рушидов е управител на Total Profit с фокус върху работа с бизнеси в производството, търговията и износа.",
  },
  {
    slug: "vladislav-atanasov",
    name: "Владислав Атанасов",
    role: "Младши счетоводител",
    specialty: "Услуги и търговия",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D0%92%D0%BB%D0%B0%D0%B4%D0%B8%D1%81%D0%BB%D0%B0%D0%B2-nuvNivTmligBp4rTckOXekvQ34PqhV.png",
    bio: "Владислав Атанасов е младши счетоводител в Total Profit и работи по счетоводно обслужване на дейности в сферата на услугите и търговията.",
  },
  {
    slug: "marina-azgorova",
    name: "Марина Азгорова",
    role: "Счетоводител",
    specialty: "Отговорник и специалист ЗДДС",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D0%9C%D0%B0%D1%80%D0%B8%D0%BD%D0%B0-dp44GsMw3mWzYKvAmcu0HycYfGYjvT.png",
    bio: "Марина Азгорова е счетоводител в Total Profit с фокус върху ЗДДС, счетоводни процеси и ДДС казуси.",
  },
  {
    slug: "yoana-hristova",
    name: "Йоана Христова",
    role: "Счетоводител",
    specialty: "Експерт ТРЗ, личен състав и осигуряване",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D0%99%D0%BE%D0%B0%D0%BD%D0%B0-Zp8FktvYgWpAWmCwPTXSDSmVVs98hB.png",
    bio: "Йоана Христова е счетоводител в Total Profit с фокус върху ТРЗ, личен състав и осигуряване.",
  },
  {
    slug: "silviya-stefanova",
    name: "Силвия Стефанова",
    role: "Счетоводител",
    specialty: "Експерт счетоводство и финанси",
    image: "https://rqt8f2dldo9sqmkn.public.blob.vercel-storage.com/silviya.jpg",
    bio: "Силвия Стефанова е счетоводител в Total Profit с фокус върху счетоводство и финанси.",
  },
]

export function getAuthor(slug: string) {
  return authorProfiles.find((author) => author.slug === slug)
}
