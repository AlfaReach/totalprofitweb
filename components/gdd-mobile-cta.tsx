'use client'

import { useEffect, useRef } from 'react'
import { Phone } from 'lucide-react'
import { Button } from './ui/button'

export function GDDMobileCTA() {
  const barRef = useRef<HTMLDivElement>(null)

  // Publishes the bar's measured height so the floating contact launcher clears it on mobile.
  useEffect(() => {
    const el = barRef.current
    const publish = () => {
      if (!el) return
      const height = el.offsetHeight
      // md:hidden — above the tablet breakpoint the bar is not rendered and takes no space.
      document.body.style.setProperty('--tp-bottom-bar-h', height ? `${height}px` : '0px')
    }
    document.body.dataset.bottomBar = '1'
    publish()
    const observer = el ? new ResizeObserver(publish) : null
    if (el && observer) observer.observe(el)
    window.addEventListener('resize', publish)
    return () => {
      observer?.disconnect()
      window.removeEventListener('resize', publish)
      delete document.body.dataset.bottomBar
      document.body.style.removeProperty('--tp-bottom-bar-h')
    }
  }, [])

  return (
    <div ref={barRef} className="tp-bottom-bar fixed left-0 right-0 z-40 bg-primary text-primary-foreground p-3 md:hidden border-t border-primary/50 shadow-lg">
      <div className="max-w-6xl mx-auto flex gap-2">
        <Button
          variant="secondary"
          className="flex-1 h-10 font-semibold text-sm"
          asChild
        >
          <a href="tel:+359898252516" className="flex items-center justify-center gap-2">
            <Phone className="h-4 w-4" />
            Обадете се
          </a>
        </Button>
        <Button
          className="flex-1 h-10 font-semibold text-sm bg-primary-foreground text-primary hover:bg-primary-foreground/90"
          asChild
        >
          <a href="#form">Форма</a>
        </Button>
      </div>
    </div>
  )
}
