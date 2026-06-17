'use client'

import { Phone } from 'lucide-react'
import { Button } from './ui/button'

export function GDDMobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-primary text-primary-foreground p-3 md:hidden border-t border-primary/50 shadow-lg">
      <div className="max-w-6xl mx-auto flex gap-2">
        <Button
          variant="secondary"
          className="flex-1 h-10 font-semibold text-sm"
          asChild
        >
          <a href="tel:+359898252516" className="flex items-center justify-center gap-2">
            <Phone className="h-4 w-4" />
            Позвони
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
