import { NextResponse } from "next/server"
import { currentIndexNowUrls, submitIndexNow } from "@/lib/indexnow"

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  // If CRON_SECRET is configured, require it. Without one the endpoint remains usable by
  // Vercel Cron out of the box; repeated IndexNow submission is idempotent and low-risk.
  const secret = process.env.CRON_SECRET
  if (secret) {
    const authorization = request.headers.get("authorization")
    if (authorization !== `Bearer ${secret}`) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const urls = await currentIndexNowUrls()
  const result = await submitIndexNow(urls)
  return NextResponse.json({ submitted: urls.length, indexNowStatus: result.status }, { status: result.ok ? 200 : 502 })
}
