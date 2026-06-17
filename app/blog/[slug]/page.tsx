import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { getPostBySlug, getAllPosts } from "@/lib/blog-data"
import { ArrowLeft, ArrowRight, Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return { title: "Статията не е намерена | Total Profit" }
  }

  return {
    title: `${post.title} | Total Profit`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://www.totalprofit.bg/blog/${post.slug}`,
      siteName: "Total Profit",
      locale: "bg_BG",
      type: "article",
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
    alternates: {
      canonical: `https://www.totalprofit.bg/blog/${post.slug}`,
    },
  }
}

function renderMarkdown(content: string) {
  const lines = content.trim().split("\n")
  const elements: React.ReactNode[] = []
  let currentParagraph: string[] = []
  let key = 0

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      const text = currentParagraph.join(" ").trim()
      if (text) {
        elements.push(
          <p key={key++} className="text-foreground/80 leading-relaxed mb-6">
            {text}
          </p>
        )
      }
      currentParagraph = []
    }
  }

  for (const line of lines) {
    const trimmed = line.trim()

    if (trimmed.startsWith("### ")) {
      flushParagraph()
      elements.push(
        <h3 key={key++} className="text-xl font-semibold text-foreground mt-8 mb-4">
          {trimmed.slice(4)}
        </h3>
      )
    } else if (trimmed.startsWith("## ")) {
      flushParagraph()
      elements.push(
        <h2 key={key++} className="text-2xl font-bold text-foreground mt-12 mb-6">
          {trimmed.slice(3)}
        </h2>
      )
    } else if (trimmed === "") {
      flushParagraph()
    } else {
      currentParagraph.push(trimmed)
    }
  }
  flushParagraph()

  return elements
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const allPosts = getAllPosts()
  const currentIndex = allPosts.findIndex((p) => p.slug === post.slug)
  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: "Пепа Кънчева",
      jobTitle: "Главен счетоводител"
    },
    publisher: {
      "@type": "Organization",
      name: "Total Profit",
      url: "https://www.totalprofit.bg"
    },
    url: `https://www.totalprofit.bg/blog/${slug}`
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="bg-foreground text-background">
          <div className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
            <div className="flex items-center justify-between">
              <Link href="/" className="inline-block">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WEBSITE%20LOGO-dRDyk9idK3ekP1XwkcLI5ZYa5TB5Ba.png"
                  alt="Total Profit"
                  width={140}
                  height={38}
                  className="h-8 w-auto brightness-0 invert"
                  priority
                />
              </Link>
              <Button size="sm" asChild className="bg-background text-foreground hover:bg-background/90">
                <Link href="/blog">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Всички статии
                </Link>
              </Button>
            </div>
          </div>
        </header>

        {/* Article Header */}
        <section className="bg-foreground text-background pb-16 pt-8">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <div className="flex items-center gap-4 text-sm text-background/60 mb-6">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                {new Date(post.date).toLocaleDateString("bg-BG", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {post.readTime}
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance leading-tight">
              {post.title}
            </h1>
            <p className="mt-4 text-lg text-background/70 leading-relaxed">
              {post.description}
            </p>
          </div>
        </section>

        {/* Article Content */}
        <article className="py-16">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            {renderMarkdown(post.content)}
          </div>
        </article>

        {/* Related Links */}
        <section className="py-12">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            {slug === "koga-dds-registracia" && (
              <div className="border-t border-border pt-8 mb-8">
                <p className="text-sm font-semibold text-muted-foreground mb-3">Свързани теми:</p>
                <div className="flex flex-wrap gap-2">
                  <Link href="/blog/gdd-godishna-danachna-deklaracia-fizicheski-lica" className="text-accent hover:text-accent/80 font-medium">
                    ГДД по чл. 50 — данъчна декларация за физически лица
                  </Link>
                  <span className="text-muted-foreground">|</span>
                  <Link href="/blog/razlika-eood-et" className="text-accent hover:text-accent/80 font-medium">
                    Разлики между ЕООД и ЕТ
                  </Link>
                </div>
              </div>
            )}
            {slug === "gdd-godishna-danachna-deklaracia-fizicheski-lica" && (
              <div className="border-t border-border pt-8 mb-8">
                <p className="text-sm font-semibold text-muted-foreground mb-3">Свързани теми:</p>
                <div className="flex flex-wrap gap-2">
                  <Link href="/blog/koga-dds-registracia" className="text-accent hover:text-accent/80 font-medium">
                    Кога е задължителна ДДС регистрацията
                  </Link>
                  <span className="text-muted-foreground">|</span>
                  <Link href="/blog/kak-da-namalim-danacite-zakonno" className="text-accent hover:text-accent/80 font-medium">
                    Как да намалим данъците законно
                  </Link>
                </div>
              </div>
            )}
            {slug === "razlika-eood-et" && (
              <div className="border-t border-border pt-8 mb-8">
                <p className="text-sm font-semibold text-muted-foreground mb-3">Свързани теми:</p>
                <div className="flex flex-wrap gap-2">
                  <Link href="/blog/koga-dds-registracia" className="text-accent hover:text-accent/80 font-medium">
                    Кога е задължителна ДДС регистрацията
                  </Link>
                  <span className="text-muted-foreground">|</span>
                  <Link href="/blog/gdd-godishna-danachna-deklaracia-fizicheski-lica" className="text-accent hover:text-accent/80 font-medium">
                    ГДД за физически лица
                  </Link>
                </div>
              </div>
            )}
            {slug === "kak-da-namalim-danacite-zakonno" && (
              <div className="border-t border-border pt-8 mb-8">
                <p className="text-sm font-semibold text-muted-foreground mb-3">Свързани теми:</p>
                <div className="flex flex-wrap gap-2">
                  <Link href="/blog/koga-dds-registracia" className="text-accent hover:text-accent/80 font-medium">
                    Кога е задължителна ДДС регистрацията
                  </Link>
                  <span className="text-muted-foreground">|</span>
                  <Link href="/blog/razlika-eood-et" className="text-accent hover:text-accent/80 font-medium">
                    ЕООД или ЕТ — коя форма е по-подходяща
                  </Link>
                </div>
              </div>
            )}
            {slug === "gdd-godishna-danachna-deklaracia-fizicheski-lica" && (
              <div className="border-t border-border pt-8 mb-8">
                <p className="text-sm font-semibold text-muted-foreground mb-3">Свързани теми:</p>
                <div className="flex flex-wrap gap-2">
                  <Link href="/blog/koga-dds-registracia" className="text-accent hover:text-accent/80 font-medium">
                    Кога е задължителна ДДС регистрацията
                  </Link>
                  <span className="text-muted-foreground">|</span>
                  <Link href="/blog/kak-da-namalim-danacite-zakonno" className="text-accent hover:text-accent/80 font-medium">
                    Как да намалим данъците законно
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-foreground text-background">
          <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-4 text-balance">
              Нуждаете се от професионална помощ?
            </h2>
            <p className="text-background/70 mb-8 leading-relaxed">
              Екипът на Total Profit е готов да ви помогне с безплатен анализ на вашия бизнес.
            </p>
            <Button
              size="lg"
              className="bg-background text-foreground hover:bg-background/90"
              asChild
            >
              <Link href="/#contact">
                Безплатен анализ
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <section className="py-16">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <h2 className="text-2xl font-bold tracking-tight mb-8 text-center">
                Други статии
              </h2>
              <div className="grid gap-8 md:grid-cols-3">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/blog/${related.slug}`}
                    className="group block rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-lg"
                  >
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(related.date).toLocaleDateString("bg-BG", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <h3 className="text-base font-semibold text-foreground mb-2 text-balance group-hover:text-accent transition-colors leading-snug">
                      {related.title}
                    </h3>
                    <div className="mt-3 flex items-center gap-2 text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                      Прочети
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="bg-secondary border-t border-border">
          <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <Link href="/" className="inline-block">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WEBSITE%20LOGO-dRDyk9idK3ekP1XwkcLI5ZYa5TB5Ba.png"
                  alt="Total Profit"
                  width={140}
                  height={38}
                  className="h-8 w-auto"
                />
              </Link>
              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                <a href="tel:+359898252516">+359 898 252 516</a>
                <span className="text-border">|</span>
                <a href="mailto:office@totalprofit.bg">office@totalprofit.bg</a>
              </div>
              <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Total Profit</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
