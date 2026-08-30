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
  {
    author: "Ivo Ivo",
    quote: "Коректно отношение. Работим заедно от доста време. Благодаря.",
    role: "собственик на фирма за довършителни ремонти",
  },
  {
    author: "Elza Pariny",
    quote:
      "Работя с тях вече 5 години. Любезни и адекватни професионалисти са. Имат специално отношение към всеки клиент. Доверявам им се.",
    excerpt: true,
  },
  {
    author: "Elena Miteva",
    quote:
      "Миналата година бях на косъм да изпусна срока за ГДД и бях сигурна, че ще стане проблем. Препоръчаха ми Total Profit.",
    excerpt: true,
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
