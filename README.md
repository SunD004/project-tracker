This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Choix techniques

### 1. Gestion de la base de données : Prisma & Neon
Prisma est utilisé comme ORM pour interagir avec la base de données. Il offre une expérience de développement moderne et simplifié des requêtes.  
Pour l’hébergement de la base de données PostgreSQL, j’ai choisi [Neon](https://neon.com/), une solution cloud serverless, qui permet un déploiement rapide, une scalabilité automatique et une intégration facile.

### 2. UI et composants
L’interface utilisateur est construite avec des composants, organisés dans le dossier `src/components`. J’utilise les composants Shadcn pour les formulaires, les dialogues,a les tables, toast... afin de garantir la réutilisabilité et la cohérence de l’UI.

### 3. Tests
Jest est utilisé pour les tests unitaires et d’intégration, avec une configuration adaptée à Next.js et React. Les tests sont placés dans le dossier `__tests__`.

### 4. Structure du projet
Le projet suit la structure recommandée par Next.js : 
- `src/app` pour les pages et le routage,
- `src/components` pour les composants réutilisables,
- `src/lib` pour les utilitaires et la configuration de Prisma,
- `src/types` pour les schémas Zod

### 7. Typage et qualité du code
Le projet est entièrement typé avec TypeScript et Zod validation pour améliorer la robustesse et la maintenabilité. ESLint est configuré pour garantir la qualité et la cohérence du code.

### 8. Déploiement
Le projet est prêt à être déployé sur Vercel, la plateforme officielle de Next.js, pour bénéficier d’un hébergement optimisé et d’une intégration continue.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
