/**
 * Thin dataLayer wrapper. GTM (GTM-MPZ3LQK8) owns the tags; this file only pushes events.
 *
 * `lead_form_submit` and `gdd_form_submit` already have triggers in the live GTM container,
 * so their names must not change — renaming them would silently break the Google Ads
 * conversions wired to them. Both fire only after the backend confirms a real send.
 */
type EventParams = Record<string, unknown>

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
  }
}

export function track(event: string, params: EventParams = {}) {
  if (typeof window === "undefined") return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event, ...params })
}
