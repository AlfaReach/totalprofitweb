import { siteConfig } from "@/lib/site-config"

/** Shared contact deep links, so the floating launcher and page buttons can't drift apart. */
const WHATSAPP_TEXT = encodeURIComponent("Здравейте, искам безплатен анализ на бизнеса ми")
export const WHATSAPP_URL = `https://wa.me/${siteConfig.phone.replace("+", "")}?text=${WHATSAPP_TEXT}`
