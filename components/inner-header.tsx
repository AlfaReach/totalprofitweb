import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export function InnerHeader() {
  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 lg:px-8">
        <Link href="/" className="inline-flex items-center">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WEBSITE%20LOGO-dRDyk9idK3ekP1XwkcLI5ZYa5TB5Ba.png"
            alt="Total Profit"
            width={180}
            height={50}
            className="h-9 w-auto"
            priority
          />
        </Link>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/"><ArrowLeft className="mr-2 h-4 w-4" />Начало</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/#contact-form"><span className="sm:hidden">Анализ</span><span className="hidden sm:inline">Безплатен анализ</span></Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
