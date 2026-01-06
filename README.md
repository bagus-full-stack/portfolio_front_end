# Portfolio Futuriste — Frontend

Une application frontend de portfolio moderne construite avec Next.js (App Router), TypeScript et Tailwind CSS. Ce dépôt contient l'interface publique (pages, composants, mini-blog statique) et des primitives UI réutilisables.

Résumé
- Framework : Next.js (App Router)
- Langage : TypeScript + React
- Styles : Tailwind CSS
- Gestionnaire : pnpm

Objectif
Ce projet sert de base pour un portfolio personnel : page d'accueil, sections projets, blog statique, tableau de bord admin (placeholder), et une librairie de composants UI. Il met l'accent sur les bonnes pratiques Next.js (app router, SSG/SSR) et l'organisation modulaire.

Table des matières
- Fonctionnalités principales
- Architecture du projet
- Prérequis
- Installation et commandes
- Développement : bonnes pratiques
- Système de blog (comment ça marche)
- Navigation et Header
- Résolution d'erreurs courantes
- Déploiement
- Contribution
- Licence

Fonctionnalités principales
- Pages construites avec le dossier `app/` (App Router)
- Composants réutilisables en TypeScript dans `components/`
- Thème clair/sombre
- Mini-système de blog statique (données en `lib/blog.ts`) pré-rendu (SSG) via `generateStaticParams`
- UI responsive et composants d'accessibilité de base

Architecture du projet (points clés)
- `app/` — routes et pages (layout, error boundaries, metadata)
  - `app/blog/page.tsx` — index du blog
  - `app/blog/[slug]/page.tsx` — page de détail d'un article (SSG)
- `components/` — composants et sections (ex: `header.tsx`, `blog-card.tsx`, `blog-post.tsx`, `ui/*`)
- `lib/` — utilitaires et données (ex: `lib/blog.ts`, `lib/utils.ts`)
- `services/` — wrappers pour récupération de données (placeholder)
- `public/` — assets statiques (images, icônes)
- `styles/` — styles globaux (Tailwind)

Prérequis
- Node.js (recommandé >= 18)
- pnpm installé globalement (ou npm/yarn en adaptant les commandes)

Installation et commandes
1. Installer les dépendances :

```powershell
pnpm install
```

2. Mode développement :

```powershell
pnpm dev
```

3. Build production :

```powershell
pnpm build
```

4. Démarrer la version de production :

```powershell
pnpm start
```

Commandes utiles
- `pnpm dev` — serveur de développement (hot-reload)
- `pnpm build` — build de production (Next.js)
- `pnpm start` — démarre le server produit
- `npx tsc --noEmit` — vérification TypeScript sans générer de fichiers

Développement : bonnes pratiques
- Séparer les composants client (`"use client"`) et serveur. Les fonctions de récupération de données (ex. `lib/blog.ts`) doivent rester server-side si elles sont utilisées par `generateStaticParams` / `generateMetadata`.
- Eviter d'importer des composants client-only *dans* des fonctions de génération statique.
- Mettre les composants partagés (Header, Footer) dans `app/layout.tsx` si vous souhaitez qu'ils apparaissent sur toutes les pages.

Système de blog — comment ça marche
- Les articles sont actuellement définis sous forme d'un tableau dans `lib/blog.ts` (objet `posts`).
- `getPosts()` et `getPostBySlug(slug)` exposent l'accès aux articles.
- La page `app/blog/[slug]/page.tsx` utilise `generateStaticParams` pour lister les slugs et pré-générer les pages (SSG).

Ajouter un article (rapide)
1. Ouvrir `lib/blog.ts`.
2. Ajouter un objet `Post` au tableau `posts` avec les champs :
   - `id`, `title`, `slug`, `excerpt`, `content`, `date`, `readingTime`, `image`, `author`, `tags`, `category`, etc.
3. Lancer `pnpm build` pour que la nouvelle route soit générée statiquement.

Remarque : pour une expérience de contenu plus évolutive, migrer les articles vers des fichiers Markdown (`content/blog/*.md`) et parser via `gray-matter`/MDX.

Navigation et Header
- Le composant `Header` est un composant client (contient `"use client"`) car il utilise des hooks et des animations. Pour qu'il apparaisse sur des pages générées côté serveur, vous avez deux options :
  1. Le placer dans `app/layout.tsx` (recommandé) pour qu'il soit inclus globalement et géré correctement par Next.js.
  2. L'importer dans chaque page en tant que composant client — c'est acceptable tant que l'import se fait dans un composant rendu côté client (ou directement dans le JSX d'une page server), Next.js va hydrater le composant côté client.

Dans ce projet :
- `app/blog/page.tsx` inclut déjà le `Header`.
- `app/blog/[slug]/page.tsx` a été mis à jour pour inclure `Header` également, afin d'assurer la navigation depuis les pages d'article vers le reste du site.

Résolution d'erreurs courantes
- Erreur "Failed to collect page data for /blog/[slug]" :
  - Cause fréquente : import d'un module client-only (contenant `"use client"`) dans une méthode server-side (ex. `generateStaticParams` ou `generateMetadata`).
  - Vérifier : retirer `"use client"` des utilitaires, ou déplacer la logique côté serveur.
- Warnings sur caractères non-ASCII dans des strings : ces warnings viennent d'outils d'analyse et sont généralement non bloquants. Pour les éliminer, externalisez le contenu dans des fichiers markdown/JSON ou ajustez la configuration de l'analyseur.

Déploiement
- Plateforme recommandée : Vercel (intégration Next.js native).
- Branches/CI : configurez l'environnement Node.js (version) et variables d'environnement si besoin.

Contribution
- Fork → clone → branche feature → PR
- Respectez les conventions TypeScript/Tailwind du projet

Licence
- MIT (ou la licence de votre choix) — remplacez par vos informations si nécessaire.

Besoin d'aide supplémentaire ?
- Je peux :
  - Migrer les articles vers Markdown et adapter `lib/blog.ts`.
  - Déplacer le `Header` dans `app/layout.tsx` pour le rendre global.
  - Nettoyer les warnings non-ASCII ou externaliser le contenu.

Contact
- Si tu veux que j'applique automatiquement une de ces améliorations, dis-moi laquelle et je l'ajoute.
