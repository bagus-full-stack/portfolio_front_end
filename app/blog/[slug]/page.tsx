import { BlogPost } from "@/components/blog-post"
import { getPostBySlug, getPosts } from "@/lib/blog"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug)

  if (!post) {
    return {
      title: "Article non trouvé | Portfolio",
      description: "L'article que vous recherchez n'existe pas.",
    }
  }

  return {
    title: `${post.title} | Blog Portfolio`,
    description: post.excerpt,
  }
}

export async function generateStaticParams() {
  const posts = getPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background pt-20">
      <BlogPost post={post} />
    </main>
  )
}

