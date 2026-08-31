"use client"

/**
 * Invisible lead attribution.
 *
 * Every CTA on a service page points at /#contact-form on the homepage, so by the time the
 * form is submitted the originating page is no longer in the URL. This records where the
 * visitor actually came from, without adding a field anyone has to fill in.
 *
 * Nothing here is sent anywhere except with a lead the visitor chose to submit, and only
 * first-party page paths and the campaign tags already present in the URL are recorded.
 */
const KEY = "tp_first_touch"
const CTA_KEY = "tp_cta_source"

const TRACKING_KEYS = ["utm_source", "utm_medium", "utm_campaign", "gclid", "fbclid", "msclkid"] as const

type FirstTouch = { landingPage: string; campaign: string }

function readFirstTouch(): FirstTouch | null {
  try {
    const raw = sessionStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as FirstTouch) : null
  } catch {
    return null
  }
}

/** Call once per page load. Records the first page of the session and its campaign tags. */
export function captureFirstTouch() {
  if (typeof window === "undefined") return
  if (readFirstTouch()) return
  try {
    const params = new URLSearchParams(window.location.search)
    const campaign = TRACKING_KEYS.map((key) => {
      const value = params.get(key)
      return value ? `${key}=${value.slice(0, 80)}` : ""
    })
      .filter(Boolean)
      .join(" · ")
    sessionStorage.setItem(
      KEY,
      JSON.stringify({ landingPage: window.location.pathname + window.location.search, campaign }),
    )
  } catch {
    /* private mode — attribution is a nice-to-have, never a blocker */
  }
}

/**
 * Records the page a "to the form" CTA was clicked on. document.referrer is empty for the
 * client-side navigations the app router performs, so without this the originating service
 * page is lost the moment the visitor arrives at /#contact-form.
 */
export function noteCtaSource(path: string) {
  try {
    sessionStorage.setItem(CTA_KEY, path.slice(0, 200))
  } catch {
    /* private mode */
  }
}

export type LeadContext = {
  sourcePath: string
  referrer: string
  landingPage: string
  campaign: string
  ctaSource: string
}

export function getLeadContext(): LeadContext {
  if (typeof window === "undefined")
    return { sourcePath: "", referrer: "", landingPage: "", campaign: "", ctaSource: "" }
  const first = readFirstTouch()
  let referrer = ""
  try {
    if (document.referrer) {
      const url = new URL(document.referrer)
      referrer = url.host === window.location.host ? url.pathname + url.search : url.host
    }
  } catch {
    /* malformed referrer */
  }
  let ctaSource = ""
  try {
    ctaSource = sessionStorage.getItem(CTA_KEY) || ""
  } catch {
    /* private mode */
  }
  return {
    sourcePath: window.location.pathname + window.location.search,
    referrer,
    landingPage: first?.landingPage || "",
    campaign: first?.campaign || "",
    ctaSource,
  }
}
