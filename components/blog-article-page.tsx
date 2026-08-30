import Link from "next/link"
import { ArrowLeft, ArrowRight, Calendar, Clock, ExternalLink, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { InnerHeader } from "@/components/inner-header"
import { Footer } from "@/components/footer"
import { HtmlArticle, MarkdownArticle } from "@/components/article-content"
import { blogPostHref } from "@/lib/posts"
import type { BlogPost } from "@/lib/blog-data"
import { siteConfig } from "@/lib/site-config"

export function BlogArticlePage({ post, canonicalUrl, related }: { post: BlogPost; canonicalUrl: string; related: BlogPost[] }) {
  const hasDynamicLegalData = Boolean(post.riskFlags?.some((flag) => ["numeric-amount", "legal-or-deadline", "year-specific"].includes(flag)))
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${canonicalUrl}#article`,
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        dateModified: post.updatedAt || post.date,
        inLanguage: "bg-BG",
        articleSection: post.category,
        mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
        author: { "@id": `${siteConfig.url}/#organization` },
        publisher: { "@id": `${siteConfig.url}/#organization` },
        isPartOf: { "@id": `${siteConfig.url}/#website` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumbs`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Начало", item: siteConfig.url },
          { "@type": "ListItem", position: 2, name: "Блог", item: `${siteConfig.url}/blog` },
          { "@type": "ListItem", position: 3, name: post.title, item: canonicalUrl },
        ],
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="min-h-screen bg-background">
        <InnerHeader />
        <main>
          <section className="bg-foreground py-14 text-background md:py-16">
            <div className="mx-auto max-w-4xl px-6 lg:px-8">
              <Link href="/blog" className="mb-7 inline-flex items-center text-sm text-background/70 hover:text-background"><ArrowLeft className="mr-2 h-4 w-4" />Всички статии</Link>
              <div className="mb-5 flex flex-wrap items-center gap-4 text-sm text-background/60">
                <span>{post.category}</span>
                <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{new Date(post.date).toLocaleDateString("bg-BG", { year: "numeric", month: "long", day: "numeric" })}</span>
                <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{post.readTime}</span>
              </div>
              <h1 className="text-balance text-3xl font-bold leading-tight tracking-tight sm:text-5xl">{post.title}</h1>
              <p className="mt-5 text-lg leading-relaxed text-background/70">{post.description}</p>
            </div>
          </section>

          <article className="py-14 md:py-16">
            <div className="mx-auto max-w-3xl px-6 lg:px-8">
              {hasDynamicLegalData && (
                <aside className="mb-8 rounded-xl border border-border bg-secondary p-5 text-sm leading-6 text-muted-foreground" aria-label="Бележка за актуалност">
                  <div className="flex gap-3"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-foreground" /><p><strong className="text-foreground">Проверявайте актуалните стойности.</strong> Публикацията съдържа срокове, числа или нормативни препратки, които могат да се променят.</p></div>
                </aside>
              )}

              {post.contentFormat === "html" ? <HtmlArticle html={post.content} /> : <MarkdownArticle content={post.content} />}

              {post.sources && post.sources.length > 0 && (
                <section className="mt-12 border-t border-border pt-7" aria-labelledby="resources-heading">
                  <h2 id="resources-heading" className="text-xl font-semibold">Официални източници</h2>
                  <ul className="mt-4 space-y-3">
                    {post.sources.map((source) => (
                      <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium underline underline-offset-4">{source.label}<ExternalLink className="h-3.5 w-3.5" /></a></li>
                    ))}
                  </ul>
                </section>
              )}

              <div className="mt-10 border-t border-border pt-7 text-sm leading-6 text-muted-foreground">
                <p>Материалът е с общ информационен характер и не замества индивидуална счетоводна, данъчна или правна консултация.</p>
                {post.relatedService && <p className="mt-2">Свързана тема: <Link href={post.relatedService.href} className="font-medium text-foreground underline underline-offset-4">{post.relatedService.title}</Link></p>}
              </div>

              <div className="mt-10 rounded-2xl bg-foreground p-7 text-center text-background">
                <h2 className="text-2xl font-bold">Имате конкретен казус?</h2>
                <p className="mt-2 text-sm text-background/70">Попълнете формата и ще уточним каква информация е необходима.</p>
                <Button size="lg" variant="secondary" className="mt-5" asChild><Link href="/#contact-form">Към формата <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
              </div>
            </div>
          </article>

          {related.length > 0 && (
            <section className="border-t border-border bg-secondary py-12">
              <div className="mx-auto max-w-5xl px-6 lg:px-8">
                <h2 className="text-2xl font-bold">Още по темата</h2>
                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  {related.map((item) => <Link key={`${item.source}-${item.slug}`} href={blogPostHref(item)} className="rounded-xl border border-border bg-background p-5 hover:shadow-md"><p className="text-xs text-muted-foreground">{item.category}</p><p className="mt-2 font-semibold leading-snug">{item.title}</p></Link>)}
                </div>
              </div>
            </section>
          )}
        </main>
        <Footer />
      </div>
    </>
  )
}
