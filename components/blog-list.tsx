"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { BlogCard } from "@/components/blog-card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getPosts } from "@/lib/blog"

export function BlogList() {
  const [currentPage, setCurrentPage] = useState(1)
  const [filter, setFilter] = useState("all")
  const postsPerPage = 6

  const allPosts = getPosts()

  // Filtrer les posts selon la catégorie sélectionnée
  const filteredPosts = filter === "all" ? allPosts : allPosts.filter((post) => post.category === filter)

  // Calculer les posts à afficher pour la pagination
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost)

  // Calculer le nombre total de pages
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    // Scroll to top when changing page
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex justify-center">
          <Tabs
            defaultValue="all"
            onValueChange={(value) => {
              setFilter(value)
              setCurrentPage(1)
            }}
          >
            <TabsList>
              <TabsTrigger value="all">Tous</TabsTrigger>
              <TabsTrigger value="tutorial">Tutoriels</TabsTrigger>
              <TabsTrigger value="article">Articles</TabsTrigger>
              <TabsTrigger value="case-study">Études de cas</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {currentPosts.map((post) => (
            <motion.div key={post.id} variants={item}>
              <BlogCard post={post} />
            </motion.div>
          ))}
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center gap-2">
            <Button variant="outline" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
              Précédent
            </Button>

            {Array.from({ length: totalPages }).map((_, index) => (
              <Button
                key={index}
                variant={currentPage === index + 1 ? "default" : "outline"}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Button>
            ))}

            <Button
              variant="outline"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Suivant
            </Button>
          </div>
        )}

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Aucun article trouvé pour cette catégorie.</p>
          </div>
        )}
      </div>
    </section>
  )
}

