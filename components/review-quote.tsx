"use client"

import { useState } from "react"

/**
 * Long reviews are clamped to a few lines so the cards stay compact; the full text is
 * always in the DOM (crawlers and screen readers get all of it) and one click expands it
 * in place. Nothing is cut or rewritten — this is purely visual.
 */
const CLAMP_FROM = 180 // characters; shorter reviews are shown whole with no toggle

export function ReviewQuote({ text }: { text: string }) {
  const [open, setOpen] = useState(false)
  const long = text.length > CLAMP_FROM

  return (
    <div className="flex-1 mb-6">
      <blockquote className={`text-foreground leading-relaxed ${long && !open ? "line-clamp-5" : ""}`}>
        {text}
      </blockquote>
      {long && (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="mt-2 text-sm font-medium text-muted-foreground hover:text-foreground underline-offset-4 hover:underline"
        >
          {open ? "Скрий" : "Прочети целия отзив"}
        </button>
      )}
    </div>
  )
}
