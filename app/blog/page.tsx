import { BlogHeader } from "@/components/blog-header"
import { BlogList } from "@/components/blog-list"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog | Portfolio Futuriste",
  description: "Articles, tutoriels et réflexions sur le développement web et le design",
}

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-background pt-20">
      <BlogHeader />
      <BlogList />
    </main>
  )
}

