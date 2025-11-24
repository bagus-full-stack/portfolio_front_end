"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Share2, ArrowLeft, Heart, MessageSquare, Bookmark } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { formatDate } from "@/lib/utils"
import type { Post } from "@/lib/blog"
import { useState } from "react"

interface BlogPostProps {
  post: Post
}

export function BlogPost({ post }: BlogPostProps) {
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)

  return (
    <article className="py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            href="/blog"
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft size={16} className="mr-2" />
            Retour aux articles
          </Link>

          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{post.title}</h1>

          <div className="flex items-center gap-6 text-sm text-muted-foreground mb-8">
            <div className="flex items-center gap-2">
              <div className="relative w-10 h-10 rounded-full overflow-hidden">
                <Image
                  src={post.author.avatar || "/placeholder.svg"}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="font-medium text-foreground">{post.author.name}</div>
                <div className="text-xs">{post.author.title}</div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <Calendar size={16} />
              <span>{formatDate(post.date)}</span>
            </div>

            <div className="flex items-center gap-1">
              <Clock size={16} />
              <span>{post.readingTime} min de lecture</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          {/* Sidebar avec actions */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 flex flex-col gap-4">
              <Button
                variant="ghost"
                size="icon"
                className={`rounded-full ${liked ? "text-red-500" : ""}`}
                onClick={() => setLiked(!liked)}
              >
                <Heart size={20} className={liked ? "fill-current" : ""} />
              </Button>

              <Button variant="ghost" size="icon" className="rounded-full">
                <MessageSquare size={20} />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className={`rounded-full ${bookmarked ? "text-primary" : ""}`}
                onClick={() => setBookmarked(!bookmarked)}
              >
                <Bookmark size={20} className={bookmarked ? "fill-current" : ""} />
              </Button>

              <Button variant="ghost" size="icon" className="rounded-full">
                <Share2 size={20} />
              </Button>
            </div>
          </div>

          {/* Contenu principal */}
          <div className="lg:col-span-8">
            <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
              <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              {post.content.split("\n\n").map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Actions mobiles */}
            <div className="flex lg:hidden justify-between items-center mt-8 pt-4 border-t border-border">
              <div className="flex gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className={liked ? "text-red-500" : ""}
                  onClick={() => setLiked(!liked)}
                >
                  <Heart size={20} className={liked ? "fill-current" : ""} />
                </Button>

                <Button variant="ghost" size="icon">
                  <MessageSquare size={20} />
                </Button>
              </div>

              <div className="flex gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className={bookmarked ? "text-primary" : ""}
                  onClick={() => setBookmarked(!bookmarked)}
                >
                  <Bookmark size={20} className={bookmarked ? "fill-current" : ""} />
                </Button>

                <Button variant="ghost" size="icon">
                  <Share2 size={20} />
                </Button>
              </div>
            </div>
          </div>

          {/* Sidebar avec articles liés */}
          <div className="lg:col-span-3">
            <div className="sticky top-24">
              <h3 className="text-xl font-bold mb-4">Articles similaires</h3>
              <div className="space-y-4">
                {post.relatedPosts?.map((relatedPost) => (
                  <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`} className="block">
                    <div className="flex gap-3 group">
                      <div className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                        <Image
                          src={relatedPost.image || "/placeholder.svg"}
                          alt={relatedPost.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium line-clamp-2 group-hover:text-primary transition-colors">
                          {relatedPost.title}
                        </h4>
                        <div className="text-xs text-muted-foreground mt-1">{formatDate(relatedPost.date)}</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </article>
  )
}

