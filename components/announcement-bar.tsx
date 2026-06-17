"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { X, ChevronDown } from "lucide-react"

const STORAGE_KEY = "tp_gdd_bar_open"

export function AnnouncementBar() {
  const [open, setOpen] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === "closed") {
      setOpen(false)
    }
  }, [])

  function close() {
    setOpen(false)
    localStorage.setItem(STORAGE_KEY, "closed")
  }

  function reopen() {
    setOpen(true)
    localStorage.setItem(STORAGE_KEY, "open")
  }

  // Avoid hydration flash: render the default (open) state on the server,
  // then reconcile once mounted.
  if (mounted && !open) {
    return (
      <button
        type="button"
        onClick={reopen}
        aria-label="Покажи съобщението за ГДД"
        className="w-full bg-secondary text-muted-foreground text-xs sm:text-sm py-1.5 px-4 flex items-center justify-center gap-1.5 hover:bg-muted transition-colors"
      >
        <span>ГДД за фирми — краен срок 30 юни</span>
        <ChevronDown className="h-3.5 w-3.5" />
      </button>
    )
  }

  return (
    <div className="relative w-full bg-accent text-accent-foreground">
      <Link
        href="/gdd"
        className="block py-2 px-10 text-center text-xs sm:text-sm font-medium hover:opacity-90 transition-opacity"
      >
        <span className="hidden sm:inline">Краен срок за ГДД на фирми — 30 юни. Заявете подаване →</span>
        <span className="sm:hidden">ГДД за фирми до 30 юни →</span>
      </Link>
      <button
        type="button"
        onClick={close}
        aria-label="Затвори съобщението"
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-accent-foreground/10 transition-colors"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}
