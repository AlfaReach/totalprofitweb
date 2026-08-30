import type { Metadata } from "next"
import { notFound, permanentRedirect } from "next/navigation"
import { BlogArticlePage } from "@/components/blog-article-page"
import { getAllNativePosts } from "@/lib/blog-data"
import { getBlogPostBySlug, getRelatedPosts } from "@/lib/posts"
import { siteConfig } from "@/lib/site-config"

interface Props { params: Promise<{ slug: string }> }

export const revalidate = 3600
export const dynamicParams = true

export function generateStaticParams() {
  return getAllNativePosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)
  if (!post) return { title: "Статията не е намерена | Total Profit", robots: { index: false, follow: true } }
  if (post.source === "soro") {
    const legacyUrl = `${siteConfig.url}/blog?post=${encodeURIComponent(post.slug)}`
    return { title: { absolute: `${post.title} | Total Profit` }, description: post.description, alternates: { canonical: legacyUrl }, robots: { index: false, follow: true } }
  }
  const url = `${siteConfig.url}/blog/${post.slug}`
  return {
    title: { absolute: `${post.title} | Total Profit` },
    description: post.description,
    alternates: { canonical: url },
    authors: [{ name: "Total Profit", url: `${siteConfig.url}/za-nas` }],
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      siteName: siteConfig.name,
      locale: "bg_BG",
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updatedAt || post.date,
      images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.description, images: [siteConfig.ogImage] },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)
  if (!post) notFound()
  if (post.source === "soro") permanentRedirect(`/blog?post=${encodeURIComponent(post.slug)}`)
  const related = await getRelatedPosts(post)
  return <BlogArticlePage post={post} canonicalUrl={`${siteConfig.url}/blog/${post.slug}`} related={related} />
}
