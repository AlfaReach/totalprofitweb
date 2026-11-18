"use client"

import { useEffect, useRef } from "react"
import { Phone } from "lucide-react"
import { siteConfig } from "@/lib/site-config"

/**
 * Sticky call bar for the Google Ads landing pages, phones only (md:hidden).
 *
 * Same mechanics as the /gdd bar: it publishes its height as --tp-bottom-bar-h so the
 * contact launcher and cookie banner stack above it. The spacer keeps the footer from
 * being hidden under the bar. Clicks are tracked by InteractionTracker (tel: → phone_click,
 * #form / #contact-form → cta_click), so there are no handlers here.
 */
export function MobileCallBar({ formHref }: { formHref: string }) {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = barRef.current
    const publish = () => {
      if (!el) return
      document.body.style.setProperty("--tp-bottom-bar-h", `${el.offsetHeight}px`)
    }
    document.body.dataset.bottomBar = "1"
    publish()
    const observer = el ? new ResizeObserver(publish) : null
    if (el && observer) observer.observe(el)
    window.addEventListener("resize", publish)
    return () => {
      observer?.disconnect()
      window.removeEventListener("resize", publish)
      delete document.body.dataset.bottomBar
      document.body.style.removeProperty("--tp-bottom-bar-h")
    }
  }, [])

  return (
    <>
      <div aria-hidden="true" className="h-20 md:hidden" />
      <div
        ref={barRef}
        className="tp-bottom-bar fixed left-0 right-0 z-40 border-t border-white/10 bg-foreground p-3 shadow-lg md:hidden print:hidden"
      >
        <div className="mx-auto flex max-w-6xl gap-2">
          <a
            href={`tel:${siteConfig.phone}`}
            className="flex h-12 flex-[3] items-center justify-center gap-2 rounded-lg bg-[#16a34a] text-base font-semibold text-white"
          >
            <Phone className="h-5 w-5" />
            Обадете се
          </a>
          <a
            href={formHref}
            className="flex h-12 flex-[2] items-center justify-center rounded-lg bg-background text-sm font-semibold text-foreground"
          >
            Оферта
          </a>
        </div>
      </div>
    </>
  )
}
