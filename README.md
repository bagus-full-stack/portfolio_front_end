# Portfolio Futuriste (Frontend)

Un portfolio moderne construit avec Next.js (app router), TypeScript et Tailwind CSS. Ce dépôt contient la partie frontend d'un portfolio personnel — pages, composants, sections, et un mini-système de blog statique pour présenter des articles.

Table des matières
- Description
- Fonctionnalités
- Stack technique
- Prérequis
- Installation et exécution
- Scripts utiles
- Structure du projet
- Système de blog (comment ajouter un article)
- Développement & bonnes pratiques
- Déploiement
- Dépannage (FAQ)
- Contribution
- Licence

Description

Ce projet est conçu comme un portfolio personnel réactif et performant. Il utilise le nouveau dossier `app/` de Next.js pour tirer parti du rendu côté serveur (SSR) et de la génération statique (SSG). Le site contient : une page d'accueil, une page blog avec articles statiques, une section admin (page statique pour l'instant), et de nombreux composants réutilisables (UI) fournis dans `components/`.

Fonctionnalités
- Pages construites avec le `app/` router de Next.js
- Composants React TypeScript réutilisables
- Thème lumineux/sombre et gestion du mode
- Mini-système de blog (articles définis dans `lib/blog.ts`)
- Pré-rendu SSG des pages d'article (`/blog/[slug]`) pour de bonnes performances
- Intégration Tailwind CSS pour le style

Stack technique
- Next.js (App Router)
- React + TypeScript
- Tailwind CSS
- pnpm comme gestionnaire de paquets

Prérequis
- Node.js (version compatible avec Next.js 15 — idéalement >= 18)
- pnpm (recommandé, mais npm/yarn fonctionnent si on adapte les commandes)

Installation et exécution

1) Installez les dépendances :

```powershell
pnpm install
```

2) Mode développement :

```powershell
pnpm dev
```

3) Build de production :

```powershell
pnpm build
```

4) Lancer la version construite :

```powershell
pnpm start
```

Scripts utiles (depuis package.json)
- `pnpm dev` — lance le serveur de développement
- `pnpm build` — construit l'application pour la production
- `pnpm start` — démarre l'application construite
- `pnpm lint` / `pnpm test` — (s'il existe) lance les outils de lint/tests (selon configuration)

Structure du projet (les principaux dossiers/fichiers)

- app/ — pages et routes (Next.js app router)
  - blog/[slug]/page.tsx — rendu des articles de blog (SSG)
  - layout.tsx, page.tsx, not-found.tsx, etc.
- components/ — composants UI et sections réutilisables
  - ui/ — primitives UI (boutons, cartes, modales...)
  - blog-post.tsx, blog-list.tsx, header.tsx, footer.tsx, etc.
- lib/ — utilitaires et données (ex. `lib/blog.ts`, `lib/utils.ts`)
- services/ — services pour récupérer/transformer des données (ex. ProfileService)
- public/ — images statiques et assets
- styles/ — fichiers CSS globaux
- next.config.mjs, tsconfig.json, tailwind.config.js — configuration du projet

Système de blog

Actuellement, les articles sont définis directement dans `lib/blog.ts` en tant que tableau `posts`. `lib/blog.ts` expose plusieurs helpers :

- `getPosts()` — retourne tous les posts
- `getPostBySlug(slug)` — récupère un post par son slug
- `getFeaturedPosts()` / `getRecentPosts()` / `getPostsByTag()` / `getPostsByCategory()`

Comment ajouter un article aujourd'hui :
1. Ouvrir `lib/blog.ts`.
2. Ajouter un nouvel objet `Post` au tableau `posts` avec les champs requis : `id`, `title`, `slug`, `excerpt`, `content`, `date`, `readingTime`, `image`, `author`, `tags`, `category`, etc.
3. Relancer `pnpm build` pour que la route SSG `/blog/[slug]` soit générée avec le nouveau slug.

Remarque : pour une solution plus souple et évolutive, je recommande de migrer les articles vers des fichiers Markdown sous `content/blog/*.md` et d'utiliser un loader (ex. `gray-matter` + parsing) pour générer les données. Je peux t'aider à automatiser cette migration si tu veux.

Développement & bonnes pratiques

- Respecte la séparation server/client : les helpers utilisés dans `generateStaticParams` / `generateMetadata` doivent être importables côté serveur (ne pas mettre `"use client"` dans ces modules). Sinon, Next.js refusera l'appel serveur -> client et la génération SSG échouera.
- Préfère des composants statiques/serveur (`'use client'` uniquement pour les composants qui utilisent des hooks React ou l'API DOM)
- Tester localement avec `pnpm dev` avant de builder en production.

Dépannage (FAQ)

Q: Build error "Failed to collect page data for /blog/[slug]"
- Cause fréquente : un utilitaire utilisé par `generateStaticParams` ou `generateMetadata` est marqué client-only (contenant `"use client"`).
- Solution : retirer `"use client"` du module utilitaire (ex. `lib/blog.ts`) ou rendre les helpers disponibles côté serveur.

Q: Warnings concernant des caractères non-ASCII dans les strings
- Ces warnings proviennent d'outils d'analyse/compilation qui inspectent les tokens. Ils sont généralement non bloquants. Pour les supprimer, tu peux :
  - externaliser le contenu texte dans des fichiers markdown;
  - configurer ton linter/analyseur pour accepter UTF-8 / français.

Déploiement

- Déploiement recommandé : Vercel (intégration native Next.js). Les étapes générales :
  1. Pousser le projet sur GitHub/GitLab.
  2. Connecter le dépôt sur Vercel et déployer (les builds Next.js sont reconnus automatiquement).
- Vérifie les variables d'environnement et la version Node.js dans la configuration de la plateforme.

Contribution

- Fork → clone → nouvelle branche → PR.
- Respecte les conventions TypeScript et Tailwind du projet.

Licence

- (Indique ta licence ici, ex. MIT) : MIT © TonNom

Besoin d'aide supplémentaire ?
- Veux-tu que je :
  - migre les articles vers Markdown et adapte `lib/blog.ts` ?
  - nettoie les warnings non-ASCII ?
  - ajoute un script de génération d'articles / un petit CMS local ?

Je peux implémenter n'importe laquelle de ces options — dis-moi laquelle et je le fais.

