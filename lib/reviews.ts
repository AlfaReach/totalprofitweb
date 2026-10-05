/**
 * Public Google reviews shown on the homepage.
 *
 * RULES — do not break these:
 * 1. Every entry must be a real, public review from the Google Business Profile
 *    (cid=2622626184120857348). Nothing here is written, paraphrased or "improved".
 * 2. `quote` is verbatim. If it is an excerpt rather than the whole review, set
 *    `excerpt: true` — the card then renders an ellipsis and a link to the full
 *    review, so a shortened quote is never presented as a complete one.
 * 3. `role` is only filled in where the reviewer's business is publicly identifiable.
 *    Leave it empty rather than guessing.
 * 4. Reviews from the owner, staff or related parties are deliberately excluded.
 *
 * TO UPDATE: copy the text straight from the Google profile. Do not retype from memory.
 */
export type GoogleReview = {
  author: string
  quote: string
  role?: string
  excerpt?: boolean
}

export const googleReviews: GoogleReview[] = [
  // Order matters: the first three are what the carousel shows on load (priority set by
  // the client, 2026-10-06). Texts copied from the live profile on 2026-10-06, verbatim —
  // including reviewers' own spacing and typos ("додини").
  {
    author: "Svetoslav Atanasov",
    quote:
      "Работя със счетоводната къща от години и мога спокойно да я препоръчам. Изключително коректни, точни и бързи в работата си. Винаги реагират навреме и дават ясни и компетентни решения. Личи си сериозният професионален опит и отличното познаване на счетоводното и данъчното законодателство. За мен най-важното е, че мога да разчитам на тях – както за ежедневната работа, така и при по-сложни казуси.",
  },
  {
    author: "Testing Center Globaltest",
    quote:
      "ИЦ ГЛОБАЛТЕСТ ООД използва услугите на Тотал Профит от много време. Работата с Тотал Профит прави и нашата работа лесна и приятна. Винаги сме разчитали на техния професионализъм, добро отношение и огромен опит. Всеки един казус е бил решаван по най-добрия за нас начин. Всеки проблем се разрешава в детайли, професионално и съобразно действащите законови и подзаконови нормативни актове. Препоръчвам работата с Тотал Профит и си пожелавам дълги додини да са наш доверен партньор. Успех",
  },
  {
    author: "Emil Mitev",
    quote:
      "Работя с Тотал Профит от доста време. Работата ми е специфична и не се ограничава до стандартното месечно осчетоводяване. С Тотал Профит всичко се случва лесно, веднага, обръща се внимание и най-малкия детайл и се работи леко, приятно и със страхотни хора и професионалисти. Препоръчвам компанията на всеки!",
  },
  {
    // Complete review, verified 2026-08-30. Reviewer's own spelling of "префервнциални".
    author: "Elza Pariny",
    quote:
      "Работя с тях вече 5 години. Любезни и адекватни професионалисти са. Имат специално отношение към всеки клиент. Предлагат достъпни префервнциални условия. Доверявам им се.",
  },
  {
    // Google truncates the rest, so this stays an excerpt.
    author: "Elena Miteva",
    quote:
      "Миналата година бях на косъм да изпусна срока за ГДД и бях сигурна, че ще стане проблем. Препоръчаха ми Total Profit.",
    excerpt: true,
  },
  {
    author: "Georgi Agov",
    quote:
      "Бях на място в офиса им и се отнесоха с изключително внимание към всеки детайл . Със всеки се отнасят професионално, независимо дали сте физическо или юридическо лице, отношението е на високо ниво !",
  },
  {
    author: "Biliana Ilieva",
    quote: "Работим заедно 8-ма година. Спестихте ми много главоболие. Благодаря.",
  },
  {
    // Role is the reviewer's own line in the review.
    author: "Stef. Ivanova",
    quote: "Работим заедно от 3 години, нямам забележки. Всичко е отлично.",
    role: "собственик на шивашко ателие",
  },
  {
    // Role is the reviewer's own line in the review.
    author: "Ivo Ivo",
    quote: "Коректно отношение. Работим заедно от доста време. Благодаря.",
    role: "собственик на фирма за довършителни ремонти",
  },
]

/**
 * Rating shown next to the profile link, sourced from the Google Business Profile.
 *
 * The review COUNT is deliberately not displayed. It changes every time someone
 * leaves a review, and a hardcoded number silently goes stale — "19 отзива" next to
 * a profile showing 27 reads as careless at best. The rating alone is stable, and the
 * link goes to the live profile for the current figure.
 */
export const googleRating = { value: "5.0" }
