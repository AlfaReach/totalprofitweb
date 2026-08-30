"use client"

import { useEffect } from "react"

export function LegacySoroWidget() {
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://app.trysoro.com/api/embed/1bc9b407-9b52-4106-974c-aa02565173ac"
    script.defer = true
    script.dataset.soroLegacy = "true"
    document.body.appendChild(script)
    return () => script.remove()
  }, [])

  return <div id="soro-blog" />
}
