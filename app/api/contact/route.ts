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

export async function POST(request: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: "Формата временно не е достъпна." }, { status: 503 })
    }

    const resend = new Resend(process.env.RESEND_API_KEY)
    const body = await request.json()
    const { name, email, phone, message, subject } = body as Record<string, string>

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Моля попълнете всички задължителни полета." }, { status: 400 })
    }

    const safeName = escapeHtml(String(name).slice(0, 200))
    const safeEmail = escapeHtml(String(email).slice(0, 320))
    const safePhone = escapeHtml(String(phone || "Не е посочен").slice(0, 100))
    const safeMessage = escapeHtml(String(message).slice(0, 5000))
    const safeSubject = subject ? String(subject).slice(0, 150) : "Нов клиент - попълнена форма"

    await resend.emails.send({
      from: "Total Profit <office@totalprofit.bg>",
      to: ["totalprofitacc@gmail.com", "office@totalprofit.bg"],
      subject: `Total Profit: ${safeSubject}`,
      replyTo: email,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#f9f9f9;border-radius:12px">
          <h1 style="color:#1a1a1a;font-size:22px;border-bottom:2px solid #c9a96e;padding-bottom:12px">Ново запитване от уебсайта</h1>
          <table style="width:100%;border-collapse:collapse;margin-top:16px">
            <tr><td style="padding:10px 12px;font-weight:bold;color:#555;width:120px;vertical-align:top">Име:</td><td style="padding:10px 12px;color:#1a1a1a">${safeName}</td></tr>
            <tr style="background:#f0f0f0"><td style="padding:10px 12px;font-weight:bold;color:#555;vertical-align:top">Имейл:</td><td style="padding:10px 12px;color:#1a1a1a">${safeEmail}</td></tr>
            <tr><td style="padding:10px 12px;font-weight:bold;color:#555;vertical-align:top">Телефон:</td><td style="padding:10px 12px;color:#1a1a1a">${safePhone}</td></tr>
            <tr style="background:#f0f0f0"><td style="padding:10px 12px;font-weight:bold;color:#555;vertical-align:top">Съобщение:</td><td style="padding:10px 12px;color:#1a1a1a;white-space:pre-wrap">${safeMessage}</td></tr>
          </table>
          <p style="margin-top:24px;font-size:12px;color:#999;text-align:center">Изпратено от totalprofit.bg</p>
        </div>`,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Email send error:", error)
    return NextResponse.json({ error: "Грешка при изпращане. Моля опитайте по-късно." }, { status: 500 })
  }
}
