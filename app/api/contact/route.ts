import { Resend } from "resend"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const body = await request.json()
    const { name, email, phone, message } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Моля попълнете всички задължителни полета." },
        { status: 400 }
      )
    }

    await resend.emails.send({
      from: "Total Profit <office@totalprofit.bg>",
      to: ["totalprofitacc@gmail.com", "office@totalprofit.bg"],
      subject: "\u{1F4A5} Нов Клиент - Попълнена форма",
      replyTo: email,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #f9f9f9; border-radius: 12px;">
          <h1 style="color: #1a1a1a; font-size: 22px; border-bottom: 2px solid #c9a96e; padding-bottom: 12px;">
            Нов клиент от уебсайта
          </h1>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr>
              <td style="padding: 10px 12px; font-weight: bold; color: #555; width: 120px; vertical-align: top;">Филип А.:</td>
              <td style="padding: 10px 12px; color: #1a1a1a;">${name}</td>
            </tr>
            <tr style="background-color: #f0f0f0;">
              <td style="padding: 10px 12px; font-weight: bold; color: #555; vertical-align: top;">Имейл:</td>
              <td style="padding: 10px 12px; color: #1a1a1a;">
                <a href="mailto:${email}" style="color: #2563eb;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 12px; font-weight: bold; color: #555; vertical-align: top;">Телефон:</td>
              <td style="padding: 10px 12px; color: #1a1a1a;">${phone || "Не е посочен"}</td>
            </tr>
            <tr style="background-color: #f0f0f0;">
              <td style="padding: 10px 12px; font-weight: bold; color: #555; vertical-align: top;">Съобщение:</td>
              <td style="padding: 10px 12px; color: #1a1a1a; white-space: pre-wrap;">${message}</td>
            </tr>
          </table>
          <p style="margin-top: 24px; font-size: 12px; color: #999; text-align: center;">
            Изпратено от формата за контакт на totalprofit.bg
          </p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Email send error:", error)
    return NextResponse.json(
      { error: "Грешка при изпращане. Моля опитайте по-късно." },
      { status: 500 }
    )
  }
}
