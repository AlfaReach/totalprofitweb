'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [mounted, setMounted] = useState(false)
  const bannerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
    const consent = localStorage.getItem('cookie_consent')
    if (!consent) {
      setIsVisible(true)
    }
  }, [])

  // The footer link reopens this same banner so a visitor can change an earlier choice.
  // No second consent UI, no second source of truth — it just shows the banner again.
  useEffect(() => {
    const reopen = () => setIsVisible(true)
    window.addEventListener('cookieSettings', reopen)
    return () => window.removeEventListener('cookieSettings', reopen)
  }, [])

  // Publish the banner's real height so the floating contact launcher and any page-level
  // bottom bar sit above it instead of underneath. Measured rather than guessed, because the
  // text wraps to two or three lines depending on viewport width.
  useEffect(() => {
    const clear = () => {
      delete document.body.dataset.cookieOpen
      document.body.style.removeProperty('--tp-cookie-h')
    }
    if (!isVisible) {
      clear()
      return
    }
    document.body.dataset.cookieOpen = '1'
    const el = bannerRef.current
    if (!el) return clear
    const publish = () => document.body.style.setProperty('--tp-cookie-h', `${el.offsetHeight}px`)
    publish()
    const observer = new ResizeObserver(publish)
    observer.observe(el)
    return () => {
      observer.disconnect()
      clear()
    }
  }, [isVisible])

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'accepted')
    setIsVisible(false)
    window.dispatchEvent(new CustomEvent('cookieAccepted'))
  }

  const handleDecline = () => {
    const previous = localStorage.getItem('cookie_consent')
    localStorage.setItem('cookie_consent', 'declined')
    setIsVisible(false)
    // Withdrawing a consent that was already granted has to end the current page's tracking
    // too — the tags are loaded and running by then, and unmounting the loader would not
    // unload them. A reload starts the page with the stored refusal in effect.
    if (previous === 'accepted') window.location.reload()
  }

  if (!mounted || !isVisible) return null

  return (
    <div ref={bannerRef} className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border p-4 md:p-6">
      <div className="mx-auto max-w-4xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Използваме бисквитки за анализ и маркетинг. С натискане на „Приемам“ се съгласявате с нашата{' '}
            <Link href="/privacy-policy" className="underline hover:text-foreground">
              Политика за поверителност
            </Link>
            .
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <Button size="sm" variant="outline" onClick={handleDecline} className="border-foreground text-foreground">
            Отказ
          </Button>
          <Button size="sm" onClick={handleAccept}>
            Приемам
          </Button>
        </div>
        <button
          type="button"
          aria-label="Откажи бисквитките"
          onClick={handleDecline}
          className="absolute top-4 right-4 md:hidden text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
