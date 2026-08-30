import type { Metadata } from "next"
import { notFound, permanentRedirect } from "next/navigation"
import { getSoroSnapshotPostBySlug } from "@/lib/soro"

interface Props { params: Promise<{ slug: string }> }

export const revalidate = 3600
export const dynamicParams = true

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getSoroSnapshotPostBySlug(slug)
  if (!post) return { title: "Страницата не е намерена", robots: { index: false, follow: true } }
  return { title: post.title, robots: { index: false, follow: true } }
}

export default async function RootSoroRedirect({ params }: Props) {
  const { slug } = await params
  const post = getSoroSnapshotPostBySlug(slug)
  if (!post) notFound()
  permanentRedirect(`/blog?post=${encodeURIComponent(post.slug)}`)
}
