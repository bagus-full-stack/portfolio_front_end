"use client"

export interface Author {
  id: string
  name: string
  title: string
  avatar: string
}

export interface Post {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  date: string
  readingTime: number
  image: string
  author: Author
  tags: string[]
  category: string
  featured?: boolean
  relatedPosts?: {
    id: number
    title: string
    slug: string
    date: string
    image: string
  }[]
}

const author: Author = {
  id: "1",
  name: "Votre Nom",
  title: "Développeur Web & Designer",
  avatar: "/placeholder.svg?height=100&width=100",
}

const posts: Post[] = [
  {
    id: 1,
    title: "Comment créer des animations 3D avec Three.js et React",
    slug: "creer-animations-3d-threejs-react",
    excerpt:
      "Découvrez comment intégrer des animations 3D impressionnantes dans vos applications React en utilisant Three.js et React Three Fiber.",
    content: `Three.js est une bibliothèque JavaScript puissante qui permet de créer des graphiques 3D dans le navigateur. Combinée avec React, elle offre des possibilités infinies pour créer des expériences web immersives.

Dans cet article, nous allons explorer comment intégrer Three.js dans une application React en utilisant React Three Fiber, une bibliothèque qui facilite l'utilisation de Three.js avec React.

Nous commencerons par configurer notre environnement de développement, puis nous créerons une scène 3D simple avec des objets interactifs. Ensuite, nous ajouterons des animations fluides et des effets visuels pour rendre notre scène plus dynamique.

React Three Fiber nous permet d'utiliser une syntaxe déclarative pour créer des scènes 3D, ce qui rend le code plus lisible et plus facile à maintenir. Voici un exemple de code pour créer une sphère 3D animée :

\`\`\`jsx
function AnimatedSphere() {
  const meshRef = useRef()
  
  useFrame((state) => {
    meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime())
    meshRef.current.rotation.y = Math.cos(state.clock.getElapsedTime())
  })
  
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="#8a2be2" />
    </mesh>
  )
}
\`\`\`

Nous verrons également comment ajouter des contrôles pour permettre à l'utilisateur d'interagir avec la scène, comment optimiser les performances pour une expérience fluide, et comment intégrer des modèles 3D externes dans notre application.

En suivant ce tutoriel, vous serez en mesure de créer des visualisations 3D impressionnantes qui donneront vie à vos projets web.`,
    date: "2023-11-15",
    readingTime: 8,
    image: "/placeholder.svg?height=600&width=800",
    author,
    tags: ["Three.js", "React", "3D", "Animation", "WebGL"],
    category: "tutorial",
    featured: true,
    relatedPosts: [
      {
        id: 2,
        title: "Les principes du design d'interface moderne",
        slug: "principes-design-interface-moderne",
        date: "2023-10-20",
        image: "/placeholder.svg?height=600&width=800",
      },
      {
        id: 3,
        title: "Optimiser les performances de votre site Next.js",
        slug: "optimiser-performances-site-nextjs",
        date: "2023-09-05",
        image: "/placeholder.svg?height=600&width=800",
      },
    ],
  },
  {
    id: 2,
    title: "Les principes du design d'interface moderne",
    slug: "principes-design-interface-moderne",
    excerpt:
      "Explorez les principes fondamentaux du design d'interface utilisateur moderne et comment les appliquer à vos projets web.",
    content: `Le design d'interface utilisateur (UI) est un élément crucial de tout projet web ou mobile. Un bon design UI peut améliorer considérablement l'expérience utilisateur, augmenter l'engagement et faciliter la conversion.

Dans cet article, nous allons explorer les principes fondamentaux du design d'interface moderne et comment les appliquer à vos projets.

1. La hiérarchie visuelle

La hiérarchie visuelle consiste à organiser les éléments de l'interface de manière à guider l'attention de l'utilisateur vers les informations les plus importantes. Cela peut être réalisé en jouant avec la taille, la couleur, le contraste et l'espacement des éléments.

2. La cohérence

Un design cohérent utilise les mêmes styles, couleurs et comportements à travers toute l'interface. Cela permet à l'utilisateur de se familiariser rapidement avec votre application et de prédire comment les éléments vont se comporter.

3. La simplicité

"Less is more" est un principe clé du design moderne. Éliminez tout ce qui n'est pas essentiel et concentrez-vous sur ce qui est vraiment important pour l'utilisateur.

4. Le feedback

Fournir un feedback visuel ou sonore lorsque l'utilisateur interagit avec votre interface est essentiel pour créer une expérience intuitive. Cela peut être aussi simple qu'un bouton qui change de couleur lorsqu'il est survolé ou cliqué.

5. L'accessibilité

Un bon design doit être accessible à tous, y compris aux personnes ayant des handicaps visuels, auditifs ou moteurs. Cela implique d'utiliser des contrastes suffisants, des tailles de texte lisibles et de s'assurer que votre interface peut être navigable au clavier.

En appliquant ces principes à vos projets, vous créerez des interfaces plus intuitives, plus agréables à utiliser et plus efficaces pour atteindre vos objectifs commerciaux.`,
    date: "2023-10-20",
    readingTime: 6,
    image: "/placeholder.svg?height=600&width=800",
    author,
    tags: ["Design", "UI/UX", "Interface", "Principes"],
    category: "article",
    relatedPosts: [
      {
        id: 1,
        title: "Comment créer des animations 3D avec Three.js et React",
        slug: "creer-animations-3d-threejs-react",
        date: "2023-11-15",
        image: "/placeholder.svg?height=600&width=800",
      },
      {
        id: 4,
        title: "Créer un portfolio interactif avec Next.js et Framer Motion",
        slug: "creer-portfolio-interactif-nextjs-framer-motion",
        date: "2023-08-12",
        image: "/placeholder.svg?height=600&width=800",
      },
    ],
  },
  {
    id: 3,
    title: "Optimiser les performances de votre site Next.js",
    slug: "optimiser-performances-site-nextjs",
    excerpt:
      "Apprenez les meilleures pratiques pour optimiser les performances de votre site Next.js et offrir une expérience utilisateur exceptionnelle.",
    content: `Les performances sont un aspect crucial de toute application web moderne. Un site rapide améliore l'expérience utilisateur, favorise l'engagement et peut même améliorer votre référencement.

Next.js offre de nombreuses fonctionnalités intégrées pour optimiser les performances, mais il existe également des techniques supplémentaires que vous pouvez mettre en œuvre pour améliorer encore davantage la vitesse de votre site.

Dans cet article, nous allons explorer les meilleures pratiques pour optimiser les performances de votre site Next.js.

1. Utiliser le rendu statique quand c'est possible

Next.js permet de générer des pages statiques à la compilation avec \`getStaticProps\` et \`getStaticPaths\`. Ces pages sont mises en cache et servies directement depuis un CDN, ce qui les rend extrêmement rapides.

2. Optimiser les images

Next.js fournit un composant \`Image\` qui optimise automatiquement les images, les charge de manière différée et les redimensionne selon les besoins. Utilisez-le systématiquement pour toutes vos images.

3. Mettre en œuvre le chargement différé des composants

Utilisez \`dynamic\` pour importer dynamiquement les composants qui ne sont pas nécessaires au chargement initial de la page.

4. Optimiser les polices

Utilisez \`next/font\` pour charger les polices de manière optimisée, sans requêtes réseau supplémentaires et sans changement de mise en page.

5. Minimiser le JavaScript côté client

Réduisez la quantité de JavaScript envoyée au client en utilisant des composants serveur lorsque c'est possible et en évitant les bibliothèques lourdes.

6. Mettre en cache les données

Utilisez des stratégies de mise en cache efficaces pour éviter de refaire des requêtes inutiles.

En mettant en œuvre ces techniques, vous pouvez considérablement améliorer les performances de votre site Next.js et offrir une expérience utilisateur exceptionnelle.`,
    date: "2023-09-05",
    readingTime: 7,
    image: "/placeholder.svg?height=600&width=800",
    author,
    tags: ["Next.js", "Performance", "Optimisation", "Web Vitals"],
    category: "tutorial",
    relatedPosts: [
      {
        id: 5,
        title: "Utiliser TypeScript avec React pour un code plus robuste",
        slug: "utiliser-typescript-react-code-robuste",
        date: "2023-07-18",
        image: "/placeholder.svg?height=600&width=800",
      },
      {
        id: 6,
        title: "Comment j'ai redesigné le site d'une startup fintech",
        slug: "comment-redesigne-site-startup-fintech",
        date: "2023-06-30",
        image: "/placeholder.svg?height=600&width=800",
      },
    ],
  },
  {
    id: 4,
    title: "Créer un portfolio interactif avec Next.js et Framer Motion",
    slug: "creer-portfolio-interactif-nextjs-framer-motion",
    excerpt:
      "Découvrez comment créer un portfolio interactif et animé en utilisant Next.js et la bibliothèque d'animation Framer Motion.",
    content: `Un portfolio interactif et animé peut vraiment vous démarquer en tant que développeur ou designer. Dans cet article, nous allons voir comment créer un portfolio impressionnant en utilisant Next.js et Framer Motion.

Next.js est un framework React qui offre des fonctionnalités comme le rendu côté serveur et la génération de sites statiques, ce qui le rend parfait pour un portfolio. Framer Motion, quant à lui, est une bibliothèque d'animation puissante qui permet de créer des animations fluides et complexes avec une API simple.

Nous commencerons par configurer un projet Next.js, puis nous ajouterons des animations avec Framer Motion pour créer une expérience utilisateur engageante.

Voici quelques-unes des animations que nous implémenterons :

1. Animations d'entrée pour les sections
2. Transitions de page fluides
3. Animations au survol pour les projets
4. Parallaxe pour les images
5. Animations de défilement

Framer Motion rend ces animations étonnamment simples à mettre en œuvre. Par exemple, pour animer l'entrée d'un élément, il suffit de faire :

\`\`\`jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Contenu animé
</motion.div>
\`\`\`

Nous verrons également comment créer des animations plus complexes, comme des animations séquentielles et des animations basées sur le défilement.

À la fin de ce tutoriel, vous aurez les compétences nécessaires pour créer un portfolio qui non seulement présente votre travail de manière efficace, mais qui offre également une expérience mémorable à vos visiteurs.`,
    date: "2023-08-12",
    readingTime: 10,
    image: "/placeholder.svg?height=600&width=800",
    author,
    tags: ["Next.js", "Framer Motion", "Animation", "Portfolio", "React"],
    category: "tutorial",
    relatedPosts: [
      {
        id: 1,
        title: "Comment créer des animations 3D avec Three.js et React",
        slug: "creer-animations-3d-threejs-react",
        date: "2023-11-15",
        image: "/placeholder.svg?height=600&width=800",
      },
      {
        id: 2,
        title: "Les principes du design d'interface moderne",
        slug: "principes-design-interface-moderne",
        date: "2023-10-20",
        image: "/placeholder.svg?height=600&width=800",
      },
    ],
  },
  {
    id: 5,
    title: "Utiliser TypeScript avec React pour un code plus robuste",
    slug: "utiliser-typescript-react-code-robuste",
    excerpt:
      "Apprenez comment TypeScript peut améliorer votre développement React en ajoutant un typage statique et en réduisant les bugs potentiels.",
    content: `TypeScript est un sur-ensemble de JavaScript qui ajoute des types statiques et d'autres fonctionnalités pour améliorer la qualité du code et la productivité des développeurs. Lorsqu'il est utilisé avec React, TypeScript peut considérablement améliorer la robustesse de votre code et réduire les bugs potentiels.

Dans cet article, nous allons explorer comment utiliser TypeScript avec React et quels sont les avantages que cela apporte.

1. Configuration d'un projet React avec TypeScript

Créer un nouveau projet React avec TypeScript est simple grâce à Create React App :

\`\`\`bash
npx create-react-app mon-app --template typescript
\`\`\`

Si vous utilisez Next.js, TypeScript est également pris en charge nativement.

2. Typer les props des composants

L'un des principaux avantages de TypeScript avec React est la possibilité de typer les props des composants :

\`\`\`tsx
interface ButtonProps {
  text: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

function Button({ text, onClick, variant = 'primary', disabled = false }: ButtonProps) {
  return (
    <button 
      onClick={onClick} 
      className={variant} 
      disabled={disabled}
    >
      {text}
    </button>
  );
}
\`\`\`

3. Typer les hooks

TypeScript peut également être utilisé pour typer les hooks React :

\`\`\`tsx
const [count, setCount] = useState<number>(0);
\`\`\`

4. Typer les événements

TypeScript permet de typer correctement les événements React :

\`\`\`tsx
const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setInputValue(event.target.value);
};
\`\`\`

5. Avantages de TypeScript avec React

- Détection des erreurs à la compilation plutôt qu'à l'exécution
- Meilleure autocomplétion et documentation dans l'éditeur
- Refactoring plus sûr
- Code plus maintenable, surtout pour les grands projets
- Meilleure collaboration en équipe

En intégrant TypeScript dans votre flux de développement React, vous pouvez écrire un code plus robuste, plus facile à maintenir et avec moins de bugs. Bien qu'il y ait une courbe d'apprentissage initiale, les avantages à long terme en valent largement la peine.`,
    date: "2023-07-18",
    readingTime: 8,
    image: "/placeholder.svg?height=600&width=800",
    author,
    tags: ["TypeScript", "React", "JavaScript", "Développement"],
    category: "article",
    relatedPosts: [
      {
        id: 3,
        title: "Optimiser les performances de votre site Next.js",
        slug: "optimiser-performances-site-nextjs",
        date: "2023-09-05",
        image: "/placeholder.svg?height=600&width=800",
      },
      {
        id: 4,
        title: "Créer un portfolio interactif avec Next.js et Framer Motion",
        slug: "creer-portfolio-interactif-nextjs-framer-motion",
        date: "2023-08-12",
        image: "/placeholder.svg?height=600&width=800",
      },
    ],
  },
  {
    id: 6,
    title: "Comment j'ai redesigné le site d'une startup fintech",
    slug: "comment-redesigne-site-startup-fintech",
    excerpt:
      "Étude de cas détaillée sur le processus de redesign du site web d'une startup fintech, de la recherche utilisateur au déploiement.",
    content: `Dans cette étude de cas, je vais partager mon expérience de redesign du site web d'une startup fintech, en détaillant chaque étape du processus, de la recherche utilisateur initiale au déploiement final.

La startup en question proposait une solution de paiement innovante, mais son site web ne reflétait pas le caractère moderne et sécurisé de son produit. Mon objectif était de créer une expérience utilisateur qui inspire confiance, explique clairement le produit et convertit les visiteurs en utilisateurs.

1. Recherche et découverte

J'ai commencé par une phase approfondie de recherche, comprenant :
- Des entretiens avec les parties prenantes pour comprendre leurs objectifs
- Une analyse des concurrents pour identifier les meilleures pratiques du secteur
- Des tests d'utilisabilité du site existant pour identifier les problèmes
- Des entretiens avec les utilisateurs pour comprendre leurs besoins et attentes

Cette phase m'a permis d'identifier plusieurs problèmes clés : une navigation confuse, un manque de clarté dans la présentation du produit, et une absence d'éléments rassurants pour un service financier.

2. Stratégie et wireframing

Sur la base de mes recherches, j'ai développé une stratégie de design centrée sur trois piliers :
- Clarté : simplifier la présentation du produit
- Confiance : ajouter des éléments qui renforcent la crédibilité
- Conversion : optimiser le parcours utilisateur vers l'inscription

J'ai créé des wireframes pour chaque page clé, en me concentrant sur la hiérarchie de l'information et les parcours utilisateur.

3. Design visuel

Pour le design visuel, j'ai créé une identité moderne qui inspire confiance :
- Une palette de couleurs dominée par le bleu (associé à la confiance) avec des accents de violet pour la modernité
- Une typographie claire et lisible
- Des illustrations personnalisées pour expliquer des concepts complexes
- Des micro-interactions subtiles pour engager l'utilisateur

4. Développement et tests

Le site a été développé avec Next.js pour ses performances optimales et son excellent référencement. J'ai travaillé en étroite collaboration avec les développeurs pour m'assurer que le design était fidèlement implémenté.

Des tests d'utilisabilité ont été menés tout au long du processus pour valider nos choix et identifier les points d'amélioration.

5. Résultats

Après le lancement du nouveau site :
- Le taux de conversion a augmenté de 35%
- Le temps passé sur le site a augmenté de 40%
- Le taux de rebond a diminué de 25%

Cette étude de cas montre l'importance d'une approche méthodique du design, centrée sur les besoins des utilisateurs et les objectifs commerciaux. Un bon design n'est pas seulement esthétique, il résout des problèmes concrets et contribue directement aux résultats de l'entreprise.`,
    date: "2023-06-30",
    readingTime: 12,
    image: "/placeholder.svg?height=600&width=800",
    author,
    tags: ["Design", "UI/UX", "Étude de cas", "Fintech", "Redesign"],
    category: "case-study",
    featured: true,
    relatedPosts: [
      {
        id: 2,
        title: "Les principes du design d'interface moderne",
        slug: "principes-design-interface-moderne",
        date: "2023-10-20",
        image: "/placeholder.svg?height=600&width=800",
      },
      {
        id: 5,
        title: "Utiliser TypeScript avec React pour un code plus robuste",
        slug: "utiliser-typescript-react-code-robuste",
        date: "2023-07-18",
        image: "/placeholder.svg?height=600&width=800",
      },
    ],
  },
]

export function getPosts(): Post[] {
  return posts
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug)
}

export function getFeaturedPosts(): Post[] {
  return posts.filter((post) => post.featured)
}

export function getRecentPosts(count = 3): Post[] {
  return [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, count)
}

export function getPostsByTag(tag: string): Post[] {
  return posts.filter((post) => post.tags.includes(tag))
}

export function getPostsByCategory(category: string): Post[] {
  return posts.filter((post) => post.category === category)
}

