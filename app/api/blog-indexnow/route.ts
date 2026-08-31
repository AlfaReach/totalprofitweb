import { NextResponse } from "next/server"
import { currentIndexNowUrls, submitIndexNow } from "@/lib/indexnow"

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  // Fail closed. Previously a missing CRON_SECRET left this open to anyone, so a stranger
  // could drive IndexNow submissions on our behalf. No secret configured now means no
  // submission at all, rather than an unauthenticated one.
  const secret = process.env.CRON_SECRET
  if (!secret) {
    console.error("[blog-indexnow] CRON_SECRET is not configured; refusing to submit.")
    return NextResponse.json({ error: "Not configured" }, { status: 503 })
  }
  const authorization = request.headers.get("authorization")
  if (authorization !== `Bearer ${secret}`) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const urls = await currentIndexNowUrls()
  const result = await submitIndexNow(urls)
  return NextResponse.json({ submitted: urls.length, indexNowStatus: result.status }, { status: result.ok ? 200 : 502 })
}
