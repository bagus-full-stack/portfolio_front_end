import Link from "next/link"
import { Github, Linkedin, Twitter, Heart, MapPin } from "lucide-react"
import { Map3D } from "./map-3d"

export function Footer() {
  const currentYear = new Date().getFullYear()
  const address = "123 Rue de l'Innovation, 75000 Paris, France"

  return (
    <footer className="bg-muted py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/">
              <div className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent mb-4">
                Portfolio
              </div>
            </Link>
            <p className="text-muted-foreground max-w-md">
              Un portfolio moderne et futuriste mettant en avant mes compétences et projets dans le développement web et
              le design d'expérience utilisateur.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Liens Rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#hero" className="text-muted-foreground hover:text-foreground transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="#projects" className="text-muted-foreground hover:text-foreground transition-colors">
                  Projets
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Réseaux Sociaux</h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Carte 3D */}
        <div className="mt-8 mb-8 w-full overflow-hidden">
          <h3 className="font-semibold text-lg mb-4 flex items-center">
            <MapPin className="mr-2 h-5 w-5 text-primary" />
            Notre Adresse
          </h3>
          <Map3D address={address} className="border border-border rounded-lg w-full" />
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">© {currentYear} Portfolio. Tous droits réservés.</p>
          <p className="text-muted-foreground text-sm flex items-center mt-4 md:mt-0">
            Créé avec <Heart size={14} className="mx-1 text-red-500" /> en utilisant Next.js et Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  )
}

