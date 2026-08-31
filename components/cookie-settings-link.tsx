"use client"

import { track } from "@/lib/analytics"

/**
 * Reopens the existing cookie banner. The footer is a server component, so this one-line
 * client component carries the click handler; the consent state itself stays entirely in
 * CookieBanner.
 */
export function CookieSettingsLink({ className }: { className?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        track("cookie_settings_open")
        window.dispatchEvent(new CustomEvent("cookieSettings"))
      }}
    >
      Настройки за бисквитки
    </button>
  )
}
