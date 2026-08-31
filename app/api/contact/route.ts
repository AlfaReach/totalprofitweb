import { Resend } from "resend"
import { NextResponse } from "next/server"

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[char] || char)
}

/**
 * Lightweight per-instance rate limit. Serverless means this is not global, but it costs
 * nothing and stops the naive case (one script hammering one warm instance). Anything more
 * would need external state, which is not worth it for a contact form.
 */
const WINDOW_MS = 10 * 60 * 1000
const MAX_REQUESTS = 20 // any request, valid or not — blunt flood protection
const MAX_SENDS = 5 // requests that actually pass validation and would send an email
const hits = new Map<string, number[]>()

function overLimit(key: string, max: number) {
  const now = Date.now()
  const recent = (hits.get(key) || []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(key, recent)
  if (hits.size > 5000) hits.clear()
  return recent.length > max
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i

type LeadContext = {
  sourcePath?: string
  referrer?: string
  landingPage?: string
  campaign?: string
  ctaSource?: string
}

function contextRows(context: LeadContext | undefined) {
  if (!context) return ""
  const rows: Array<[string, string]> = []
  if (context.ctaSource) rows.push(["Дошъл от страница", context.ctaSource])
  if (context.sourcePath) rows.push(["Страница на формата", context.sourcePath])
  if (context.referrer) rows.push(["Дошъл от", context.referrer])
  if (context.landingPage) rows.push(["Първа страница в сесията", context.landingPage])
  if (context.campaign) rows.push(["Кампания / източник", context.campaign])
  if (rows.length === 0) return ""
  return `
    <p style="margin-top:20px;font-size:12px;font-weight:bold;color:#555;text-transform:uppercase;letter-spacing:.06em">Контекст на заявката</p>
    <table style="width:100%;border-collapse:collapse;margin-top:6px;font-size:13px">
      ${rows
        .map(
          ([label, value], index) =>
            `<tr${index % 2 ? ' style="background:#f0f0f0"' : ""}><td style="padding:7px 12px;color:#555;width:190px;vertical-align:top">${escapeHtml(label)}:</td><td style="padding:7px 12px;color:#1a1a1a;word-break:break-all">${escapeHtml(value.slice(0, 300))}</td></tr>`,
        )
        .join("")}
    </table>`
}

export async function POST(request: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error("[contact] RESEND_API_KEY is not set")
      return NextResponse.json({ error: "Формата временно не е достъпна." }, { status: 503 })
    }

    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown"
    if (overLimit(`req:${ip}`, MAX_REQUESTS)) {
      return NextResponse.json({ error: "Твърде много заявки. Опитайте отново по-късно." }, { status: 429 })
    }

    const body = await request.json()
    const { name, email, phone, message, subject, website_check: websiteCheck, context } = body as Record<string, unknown>

    // Invisible honeypot: a real person never sees or fills this field. Deliberately NOT
    // called "company" — browser autofill targets that name on a B2B form and would have
    // discarded real enquiries. Answer 200 so a bot cannot tell it was rejected, send nothing.
    if (typeof websiteCheck === "string" && websiteCheck.trim() !== "") {
      return NextResponse.json({ success: true })
    }

    const nameStr = typeof name === "string" ? name.trim() : ""
    const emailStr = typeof email === "string" ? email.trim() : ""
    const messageStr = typeof message === "string" ? message.trim() : ""
    const phoneStr = typeof phone === "string" ? phone.trim() : ""

    if (!nameStr || !emailStr || !messageStr) {
      return NextResponse.json({ error: "Моля попълнете всички задължителни полета." }, { status: 400 })
    }
    if (nameStr.length < 2 || nameStr.length > 200 || emailStr.length > 320 || messageStr.length > 5000) {
      return NextResponse.json({ error: "Моля проверете попълнените данни." }, { status: 400 })
    }
    if (!EMAIL_RE.test(emailStr)) {
      return NextResponse.json({ error: "Моля въведете валиден имейл адрес." }, { status: 400 })
    }
    if (/https?:\/\//i.test(nameStr)) {
      return NextResponse.json({ success: true })
    }

    const safeName = escapeHtml(nameStr)
    const safeEmail = escapeHtml(emailStr)
    const safePhone = escapeHtml(phoneStr || "Не е посочен").slice(0, 100)
    const safeMessage = escapeHtml(messageStr)
    const safeSubject = typeof subject === "string" && subject ? subject.slice(0, 150) : "Нов клиент - попълнена форма"

    if (overLimit(`send:${ip}`, MAX_SENDS)) {
      return NextResponse.json({ error: "Твърде много заявки. Опитайте отново по-късно." }, { status: 429 })
    }

    const resend = new Resend(process.env.RESEND_API_KEY)

    // resend.emails.send() resolves with { data, error } — it does NOT throw when the API
    // rejects the message (unverified domain, rate limit, invalid recipient). Ignoring the
    // returned error would report a lead as delivered while nothing was sent, and would fire
    // the conversion event on a lost lead. Check it explicitly.
    const { data, error } = await resend.emails.send({
      from: "Total Profit <office@totalprofit.bg>",
      to: ["totalprofitacc@gmail.com", "office@totalprofit.bg"],
      subject: `Total Profit: ${safeSubject}`,
      replyTo: emailStr,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#f9f9f9;border-radius:12px">
          <h1 style="color:#1a1a1a;font-size:22px;border-bottom:2px solid #c9a96e;padding-bottom:12px">Ново запитване от уебсайта</h1>
          <table style="width:100%;border-collapse:collapse;margin-top:16px">
            <tr><td style="padding:10px 12px;font-weight:bold;color:#555;width:120px;vertical-align:top">Име:</td><td style="padding:10px 12px;color:#1a1a1a">${safeName}</td></tr>
            <tr style="background:#f0f0f0"><td style="padding:10px 12px;font-weight:bold;color:#555;vertical-align:top">Имейл:</td><td style="padding:10px 12px;color:#1a1a1a">${safeEmail}</td></tr>
            <tr><td style="padding:10px 12px;font-weight:bold;color:#555;vertical-align:top">Телефон:</td><td style="padding:10px 12px;color:#1a1a1a">${safePhone}</td></tr>
            <tr style="background:#f0f0f0"><td style="padding:10px 12px;font-weight:bold;color:#555;vertical-align:top">Съобщение:</td><td style="padding:10px 12px;color:#1a1a1a;white-space:pre-wrap">${safeMessage}</td></tr>
          </table>
          ${contextRows(context as LeadContext | undefined)}
          <p style="margin-top:24px;font-size:12px;color:#999;text-align:center">Изпратено от totalprofit.bg</p>
        </div>`,
    })

    if (error) {
      console.error("[contact] Resend rejected the message:", error)
      return NextResponse.json({ error: "Грешка при изпращане. Моля опитайте по-късно или ни се обадете." }, { status: 502 })
    }
    if (!data?.id) {
      console.error("[contact] Resend returned no message id")
      return NextResponse.json({ error: "Грешка при изпращане. Моля опитайте по-късно или ни се обадете." }, { status: 502 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[contact] Email send error:", error)
    return NextResponse.json({ error: "Грешка при изпращане. Моля опитайте по-късно." }, { status: 500 })
  }
}
