"use client"

import { useEffect } from "react"
import { track } from "@/lib/analytics"
import { captureFirstTouch, noteCtaSource } from "@/lib/lead-context"

/**
 * One delegated click listener for the whole site instead of an onClick on every button.
 *
 * The CTAs live in server components spread across the homepage, seven service pages, /ceni
 * and every article; wiring each one individually would mean turning them all into client
 * components. Delegation keeps them server-rendered and guarantees a new CTA is tracked the
 * day it is added.
 *
 * Events pushed here are intent signals only. The lead conversion itself is `lead_form_submit`
 * (and `gdd_form_submit`), pushed from the forms and only after the backend confirms the
 * email was actually accepted.
 */
export function InteractionTracker() {
  useEffect(() => {
    captureFirstTouch()

    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement | null)?.closest?.("a")
      if (!anchor) return
      const href = anchor.getAttribute("href") || ""
      const label = (anchor.textContent || "").trim().slice(0, 80)
      const page = window.location.pathname

      if (href.startsWith("tel:")) return track("phone_click", { link_text: label, page })
      if (href.startsWith("mailto:")) return track("email_click", { link_text: label, page })
      if (href.startsWith("viber:")) return track("viber_click", { link_text: label, page })
      if (href.includes("wa.me") || href.includes("api.whatsapp.com")) {
        return track("whatsapp_click", { link_text: label, page })
      }
      if (href.includes("#contact-form") || href.includes("#form")) {
        noteCtaSource(page)
        return track("cta_click", { link_text: label, page })
      }
    }

    document.addEventListener("click", onClick, { capture: true })
    return () => document.removeEventListener("click", onClick, { capture: true })
  }, [])

  return null
}
