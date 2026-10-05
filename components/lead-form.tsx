"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { CheckCircle2, Loader2 } from "lucide-react"
import { track } from "@/lib/analytics"
import { captureFirstTouch, getLeadContext } from "@/lib/lead-context"

/**
 * The one lead form, used in the homepage hero and in the contact section.
 *
 * Both instances send exactly the same thing to /api/contact and fire exactly the same
 * events (`form_start`, `lead_form_submit` with form_id "contact"), so GTM triggers and
 * the Google Ads conversion are untouched. `form_location` is an extra, informational
 * parameter ("hero" | "bottom") — nothing in GTM depends on it.
 *
 * `idPrefix` keeps element ids unique when both forms are on the same page.
 */
export function LeadForm({
  idPrefix,
  location,
  messageRows = 4,
}: {
  idPrefix: string
  location: "hero" | "bottom"
  messageRows?: number
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  // Invisible honeypot. Real people never see this field, so anything in it is a bot.
  // The name is deliberately obscure: a field called "company" gets filled by browser
  // autofill on a B2B form, which would silently throw away a genuine enquiry.
  const [websiteCheck, setWebsiteCheck] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const startedRef = useRef(false)

  useEffect(() => {
    captureFirstTouch()
  }, [])

  // One `form_start` per visitor, on the first real keystroke — not on focus, so a stray
  // tab through the form is not counted as an started application.
  const noteStart = () => {
    if (startedRef.current) return
    startedRef.current = true
    track("form_start", { form_id: "contact", form_location: location })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    setErrorMessage("")

    try {
      const context = getLeadContext()
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          website_check: websiteCheck,
          context,
        }),
      })

      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data?.success) {
        throw new Error(data?.error || "Грешка при изпращане.")
      }

      // Конверсия — пали се само след потвърден успешен изпратен имейл от API/Resend.
      // Името `lead_form_submit` е обвързано с тригер в GTM контейнера и не се преименува.
      track("lead_form_submit", {
        form_id: "contact",
        form_location: location,
        source_page: context.sourcePath,
        landing_page: context.landingPage,
      })

      setStatus("success")
      setFormData({ name: "", email: "", phone: "", message: "" })
      setWebsiteCheck("")
    } catch (err) {
      setStatus("error")
      setErrorMessage(err instanceof Error ? err.message : "Грешка при изпращане. Моля опитайте по-късно.")
    }
  }

  return (
    <form onSubmit={handleSubmit} onInput={noteStart} className="space-y-5">
      {/* Honeypot — hidden from people and from assistive technology, visible to bots. */}
      <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor={`${idPrefix}-tp-website-check`}>Не попълвайте това поле</label>
        <input
          id={`${idPrefix}-tp-website-check`}
          name="website_check"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={websiteCheck}
          onChange={(e) => setWebsiteCheck(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`${idPrefix}-name`}>Име *</Label>
        <Input
          id={`${idPrefix}-name`}
          placeholder="Вашето име"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          className="bg-background"
        />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor={`${idPrefix}-email`}>Имейл *</Label>
          <Input
            id={`${idPrefix}-email`}
            type="email"
            placeholder="email@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            className="bg-background"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${idPrefix}-phone`}>Телефон</Label>
          <Input
            id={`${idPrefix}-phone`}
            type="tel"
            placeholder="+359 888 123 456"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="bg-background"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor={`${idPrefix}-message`}>Съобщение *</Label>
        <Textarea
          id={`${idPrefix}-message`}
          placeholder="Опишете накратко вашия бизнес и какво търсите..."
          rows={messageRows}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          required
          className="bg-background"
        />
      </div>
      {status === "success" ? (
        <div className="flex flex-col items-center gap-3 py-4">
          <CheckCircle2 className="h-10 w-10 text-emerald-500" />
          <p className="text-center font-medium text-foreground">
            Благодарим ви! Ще се свържем с вас скоро.
          </p>
          <Button
            type="button"
            variant="outline"
            className="bg-transparent"
            onClick={() => setStatus("idle")}
          >
            Изпратете ново запитване
          </Button>
        </div>
      ) : (
        <>
          <Button type="submit" size="lg" className="w-full text-base py-6" disabled={status === "loading"}>
            {status === "loading" ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Изпращане...
              </>
            ) : (
              "ИСКАМ БЕЗПЛАТЕН АНАЛИЗ"
            )}
          </Button>
          {status === "error" && (
            <p className="text-sm text-center text-red-500">
              {errorMessage}
            </p>
          )}
          <p className="text-xs text-center text-muted-foreground">
            Изпращайки формата, се съгласявате с нашата{" "}
            <a href="/privacy-policy" className="underline hover:text-foreground transition-colors">
              политика за поверителност
            </a>
            .
          </p>
        </>
      )}
    </form>
  )
}
