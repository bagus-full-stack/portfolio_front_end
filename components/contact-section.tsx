"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react"
import { ChatBot } from "@/components/chat-bot"

export function ContactSection() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isChatOpen, setIsChatOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Ici, vous implémenteriez la logique d'envoi du formulaire
    console.log({ name, email, message })
    // Réinitialiser le formulaire
    setName("")
    setEmail("")
    setMessage("")
    // Afficher un message de confirmation
    alert("Message envoyé avec succès!")
  }

  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Me Contacter</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Vous avez un projet en tête ou une question? N'hésitez pas à me contacter. Je suis toujours ouvert à de
            nouvelles opportunités et collaborations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-6">Envoyez-moi un message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  placeholder="Votre nom"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="bg-background"
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Votre email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-background"
                />
              </div>
              <div>
                <Textarea
                  placeholder="Votre message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="min-h-[150px] bg-background"
                />
              </div>
              <Button type="submit" className="w-full">
                <Send size={16} className="mr-2" />
                Envoyer le message
              </Button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold mb-6">Informations de contact</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="flex items-center p-6">
                  <Mail className="h-10 w-10 text-primary mr-4" />
                  <div>
                    <h4 className="font-medium">Email</h4>
                    <p className="text-muted-foreground">contact@example.com</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center p-6">
                  <Phone className="h-10 w-10 text-primary mr-4" />
                  <div>
                    <h4 className="font-medium">Téléphone</h4>
                    <p className="text-muted-foreground">+33 6 12 34 56 78</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="md:col-span-2">
                <CardContent className="flex items-center p-6">
                  <MapPin className="h-10 w-10 text-primary mr-4" />
                  <div>
                    <h4 className="font-medium">Adresse</h4>
                    <p className="text-muted-foreground">123 Rue de l'Innovation, 75000 Paris, France</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8">
              <h3 className="text-2xl font-bold mb-6">Discutez avec mon IA</h3>
              <p className="text-muted-foreground mb-4">
                Vous pouvez également discuter avec mon assistant IA pour obtenir des réponses rapides à vos questions.
              </p>
              <Button onClick={() => setIsChatOpen(true)} variant="outline" className="w-full">
                <MessageSquare size={16} className="mr-2" />
                Démarrer une conversation
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {isChatOpen && <ChatBot onClose={() => setIsChatOpen(false)} />}
    </section>
  )
}

