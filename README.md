<p align="center">
  <img src="client/public/arktic.png" alt="Arktic Logo" width="280" />
</p>

<h1 align="center">Arktic</h1>

<p align="center">
  <strong>Code, Climb, Chill 🧗‍♂️</strong><br/>
  Site vitrine & plateforme d'inscription pour l'association étudiante Arktic
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/tRPC-11-398CCB?logo=trpc&logoColor=white" alt="tRPC" />
  <img src="https://img.shields.io/badge/MySQL-8-4479A1?logo=mysql&logoColor=white" alt="MySQL" />
  <img src="https://img.shields.io/badge/Drizzle_ORM-0.41-C5F74F?logo=drizzle&logoColor=black" alt="Drizzle" />
</p>

---

## 📖 À propos

**Arktic** est une association étudiante qui organise des sessions d'escalade et des afterworks pour les étudiants. Ce site a été réalisé dans le cadre du **projet communauté** à [HETIC](https://www.hetic.net/) — promotion **B1 2026**.

Le front-end initial a été généré via [Manus](https://manus.im/), puis le projet a été entièrement repris et personnalisé : ajout de la base de données, de la plateforme d'administration, du système d'inscription, et nettoyage complet du code.

---

## ✨ Fonctionnalités

| Feature | Description |
|---|---|
| 🏠 **Landing page** | Hero section, présentation de l'association, prochains événements |
| 📝 **Inscription en ligne** | Formulaire d'inscription aux sessions d'escalade avec jauge de places restantes |
| 🔐 **Panneau admin** | Interface protégée par mot de passe pour gérer les inscriptions |
| 📊 **Gestion des inscriptions** | Visualisation, suppression individuelle / en lot / totale |
| 📥 **Export CSV** | Téléchargement de la liste des inscrits au format CSV |
| 📸 **Galerie** | Photos des sessions et événements passés |
| 📬 **Contact** | Formulaire de contact |
| 📱 **Responsive** | Design adapté mobile, tablette et desktop |

---

## 🛠️ Stack technique

### Front-end
- **React 19** + **TypeScript**
- **Vite 7** — build & dev server
- **Shadcn/UI** — composants UI
- **Wouter** — routing
- **Lucide React** — icônes

### Back-end
- **Express** — serveur HTTP
- **tRPC 11** — API type-safe
- **Drizzle ORM** — requêtes SQL type-safe
- **MySQL** — base de données (Railway en prod)
- **Jose** — JWT pour l'authentification admin

---

## 🚀 Démarrage rapide

### Prérequis

- **Node.js** ≥ 18
- **pnpm** (recommandé) ou npm
- **MySQL** en local ou distant

### Installation

```bash
# Cloner le repo
git clone https://github.com/ramynbl/arktic.git
cd arktic

# Installer les dépendances
pnpm install
```

### Configuration

Copier `.env` et remplir les variables :

```env
VITE_APP_ID=arktic
VITE_APP_TITLE=Arktic

JWT_SECRET=votre-secret-jwt
DATABASE_URL=votre-url-ici
ADMIN_PASSWORD=votre-mot-de-passe-admin
```

### Base de données

```bash
# Générer les migrations
pnpm drizzle-kit generate

# Appliquer les migrations
pnpm drizzle-kit push
```

### Lancer le projet

```bash
# Mode développement
pnpm dev

# Build de production
pnpm build

# Lancer la production
pnpm start
```

Le site sera accessible sur `http://localhost:3000`.

---

## 📁 Structure du projet

```
arktic/
├── client/                 # Front-end React
│   ├── src/
│   │   ├── components/     # Composants réutilisables
│   │   ├── pages/          # Pages de l'application
│   │   ├── lib/            # Utilitaires (tRPC client)
│   │   └── contexts/       # Contextes React (thème)
│   └── public/             # Assets statiques
├── server/                 # Back-end Express
│   ├── _core/              # Configuration serveur (tRPC, Vite)
│   ├── routers.ts          # Routes API (admin, inscriptions)
│   └── db.ts               # Fonctions base de données
├── drizzle/                # Schéma et migrations SQL
├── shared/                 # Types et constantes partagés
└── dist/                   # Build de production
```

---

## 🔑 Admin

L'interface d'administration est accessible sur `/admin/inscriptions`.  
L'authentification se fait via le mot de passe défini dans `ADMIN_PASSWORD`.

Fonctionnalités admin :
- Voir toutes les inscriptions
- Sélection multiple (checkboxes)
- Suppression individuelle, en lot, ou totale
- Export CSV
- Compteur d'inscrits en temps réel

---

## 👥 Équipe

| Membre | Rôle |
|---|---|
| **Ramy Nebili** | Développement web & intégration |
| **Noé Chauvin** | Chef de projet |
| **Nassim Saadaoui** | Membre du projet |
| **Douglas Quintero** | Membre du projet |
| **Abdelkrim** | Communication |

> Projet réalisé dans le cadre du **projet communauté** — HETIC B1 2026

---

## 🙏 Crédits

- Front-end initial généré par [Manus](https://manus.im/)
- Composants UI par [Shadcn/UI](https://ui.shadcn.com/)
- Icônes par [Lucide](https://lucide.dev/)
- Hébergement par [Railway](https://railway.app/)

---

<p align="center">
  <strong>Arktic</strong> — Code, Climb, Chill 🏔️
</p>
