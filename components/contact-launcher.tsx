"use client"

import { useEffect, useRef, useState } from "react"
import { MessageCircle, Phone, X } from "lucide-react"
import { siteConfig } from "@/lib/site-config"

const WHATSAPP_TEXT = encodeURIComponent("Здравейте, искам безплатен анализ на бизнеса ми")
const WHATSAPP_URL = `https://wa.me/${siteConfig.phone.replace("+", "")}?text=${WHATSAPP_TEXT}`
const VIBER_URL = `viber://chat?number=${encodeURIComponent(siteConfig.phone)}`

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

function ViberIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M11.4 0C9.473.028 5.333.344 3.02 2.467 1.302 4.187.696 6.7.633 9.817.57 12.933.496 18.776 6.13 20.36h.004l-.004 2.416s-.037.978.61 1.177c.777.242 1.234-.502 1.98-1.303.407-.44.972-1.084 1.397-1.58 3.85.326 6.812-.416 7.15-.526.776-.252 5.176-.816 5.892-6.657.74-6.02-.36-9.83-2.34-11.546-.6-.55-3-2.29-8.37-2.314 0 0-.395-.025-1.05-.026zm.06 1.7c.556 0 .9.022.9.022 4.543.02 6.717 1.39 7.226 1.85 1.674 1.432 2.53 4.867 1.905 9.897v.002c-.604 4.878-4.174 5.184-4.832 5.395-.28.09-2.882.737-6.153.524 0 0-2.436 2.94-3.197 3.704-.12.12-.26.167-.352.144-.13-.033-.166-.188-.164-.414l.02-4.018c-4.762-1.322-4.485-6.292-4.43-8.895.054-2.604.543-4.738 1.996-6.173 1.96-1.773 5.474-2.038 7.08-2.038zm.36 2.573a.294.294 0 00-.293.29.294.294 0 00.293.297c.79-.006 1.446.256 1.963.77.517.514.77 1.204.75 2.068a.294.294 0 00.286.3h.007a.294.294 0 00.293-.287c.023-.99-.28-1.826-.907-2.45-.628-.622-1.462-.94-2.39-.933a.28.28 0 00-.002-.055zm-3.4.37a.87.87 0 00-.51.116h-.013c-.35.2-.664.46-.938.77-.21.245-.323.492-.353.73a.98.98 0 00.028.354l.01.006c.152.446.35.876.588 1.283.308.57.688 1.148 1.1 1.69.408.545.86 1.05 1.33 1.5.47.45.976.86 1.51 1.222h.007l.006.006.006.005.006.005c.545.4 1.126.775 1.7 1.08.41.24.844.437 1.293.588l.01.005c.115.03.234.04.352.028.238-.03.484-.145.727-.354.31-.274.568-.59.766-.94v-.013c.186-.352.124-.684-.145-.91a13.86 13.86 0 00-1.52-1.075c-.36-.2-.727-.082-.876.116l-.317.4c-.163.198-.462.172-.462.172l-.01.006c-2.2-.562-2.79-2.79-2.79-2.79s-.026-.3.176-.463l.398-.318c.196-.15.318-.516.115-.876a13.9 13.9 0 00-1.075-1.52.703.703 0 00-.4-.192zm3.7.906a.294.294 0 00-.023.587c1.35.063 1.98.71 2.06 2.115a.294.294 0 00.293.277h.017a.294.294 0 00.277-.31c-.092-1.71-1.03-2.606-2.62-2.68a.294.294 0 00-.005 0zm.13 1.512a.294.294 0 00-.03.586c.483.026.7.25.73.75a.294.294 0 00.293.277h.018a.294.294 0 00.276-.31c-.043-.79-.475-1.253-1.286-1.303z" />
    </svg>
  )
}

const options = [
  { key: "whatsapp", label: "WhatsApp", href: WHATSAPP_URL, external: true, className: "bg-[#25D366] text-white hover:bg-[#20ba5a]", Icon: WhatsAppIcon },
  { key: "viber", label: "Viber", href: VIBER_URL, external: false, className: "bg-[#7360F2] text-white hover:bg-[#5f4de0]", Icon: ViberIcon },
  { key: "phone", label: siteConfig.phoneDisplay, href: `tel:${siteConfig.phone}`, external: false, className: "bg-foreground text-background hover:bg-foreground/90", Icon: Phone },
] as const

/**
 * One launcher instead of three permanent floating buttons.
 *
 * Three fixed circles stacked in the corner is exactly the "giant floating widget" look we
 * are avoiding, and on a 360px screen they collide with the cookie banner and the /gdd bar.
 * Closed this is a single 56px button — the same footprint the WhatsApp button had — and it
 * only expands on a deliberate tap. Clicks are tracked centrally by InteractionTracker, which
 * matches on href, so there are no per-link handlers to keep in sync here.
 */
export function ContactLauncher() {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    const onPointer = (e: PointerEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("keydown", onKey)
    document.addEventListener("pointerdown", onPointer)
    return () => {
      document.removeEventListener("keydown", onKey)
      document.removeEventListener("pointerdown", onPointer)
    }
  }, [open])

  return (
    <div ref={containerRef} className="tp-launcher print:hidden">
      <div
        id="tp-contact-options"
        hidden={!open}
        className="mb-3 flex flex-col items-end gap-2"
      >
        {options.map(({ key, label, href, external, className, Icon }) => (
          <a
            key={key}
            href={href}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            onClick={() => setOpen(false)}
            className={`flex items-center gap-2.5 rounded-full py-2.5 pl-4 pr-5 text-sm font-semibold shadow-lg transition-colors ${className}`}
          >
            <Icon className="h-5 w-5 shrink-0" />
            <span className="whitespace-nowrap">{label}</span>
          </a>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="tp-contact-options"
        aria-label={open ? "Затвори опциите за връзка" : "Свържете се с нас"}
        className="ml-auto flex h-14 w-14 items-center justify-center rounded-full bg-foreground text-background shadow-lg transition-transform hover:scale-105"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </div>
  )
}
