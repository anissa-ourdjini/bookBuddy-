# 📚 BookBuddy

> *« Un livre, c'est comme une clé qui ouvre la porte à un monde imaginaire où les rêves prennent vie »*  
> — Kirsten Dunst dans *Virgin Suicides*

**BookBuddy** est une application web moderne et interactive permettant à chaque utilisateur de suivre, organiser et partager sa collection de livres. Elle offre une expérience personnalisée de lecture avec des fonctionnalités avancées comme la gamification, les favoris, le suivi de progression, et bien plus.

---

## 🚀 Fonctionnalités principales

- **CRUD complet sur les livres**
- **Ajout d’image de couverture**
- **Filtrage et recherche dynamique**
- **Suivi de lecture avec barre de progression**
- **Système de favoris**
- **Gamification (badges, succès)**
- **Authentification sécurisée (JWT)**
- **Inscription, connexion, gestion du profil**

---

## 🧑‍💻 Technologies utilisées

### Frontend
- [ReactJS](https://react.dev)
- [ViteJS](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [React Hook Form](https://react-hook-form.com/)
- [TailwindCSS](https://tailwindcss.com/) *(ou autre selon choix)*

### Backend
- [ExpressJS](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [JSON Web Token (JWT)](https://jwt.io/)
- [bcrypt](https://www.npmjs.com/package/bcrypt)

---

## 🗃️ Structure du projet

```

bookBuddy/
├── client/                  # Frontend React
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   └── index.html
├── server/                  # Backend Express
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── server.js
├── README.md
└── package.json

````

---

## 🔐 Authentification

L'application gère :

- Inscription avec vérification
- Connexion avec JWT
- Modification du mot de passe
- Protection des routes backend via token

---

## 📘 API REST – Endpoints

### 📚 Livres

| Méthode | Route | Description |
|--------|-------|-------------|
| POST   | `/books` | Ajouter un livre |
| GET    | `/books` | Récupérer tous les livres de l'utilisateur |
| GET    | `/books/:id` | Détails d’un livre |
| GET    | `/books/filter` | Recherche filtrée |
| PUT    | `/books/:id` | Modifier un livre |
| PUT    | `/books/:id/progress` | Mettre à jour la progression |
| POST   | `/books/:id/favorite` | Ajouter aux favoris |
| DELETE | `/books/:id/favorite` | Retirer des favoris |

### 🎖️ Gamification

| Méthode | Route | Description |
|--------|-------|-------------|
| POST | `/rewards/:type` | Déclencher une récompense |

### 👤 Utilisateur

| Méthode | Route | Description |
|--------|-------|-------------|
| POST   | `/auth/register` | Inscription |
| POST   | `/auth/login` | Connexion |
| GET    | `/users/:id` | Profil utilisateur |
| PUT    | `/users/:id` | Modifier profil |

---

## 🎨 Maquettes

Les maquettes UX/UI sont disponibles dans le dossier `/design` ou via le lien Figma (à insérer).

---

## 🧩 Modélisation de la base de données

### MCD, MLD, MPD
Les modèles conceptuel, logique et physique sont disponibles dans `/database/schema/`.

Principaux modèles :
- **User**
- **Book**
- **Reward**

---

## 🧪 Lancement du projet

### 1. Clonez le repo
```bash
git clone https://github.com/prenom-nom/bookBuddy.git
````

### 2. Backend

```bash
cd server
npm install
npm run dev
```

### 3. Frontend

```bash
cd client
npm install
npm run dev
```

### 4. Configuration des variables d’environnement

Créez un fichier `.env` dans `/server` :

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/bookbuddy
JWT_SECRET=your_jwt_secret
```

---

## 🎯 Gamification – Exemples de badges

| Badge                    | Condition                     |
| ------------------------ | ----------------------------- |
| 📖 Lecteur débutant      | Lire 5 livres                 |
| 🏆 Collectionneur        | Ajouter 10 livres             |
| 📚 Explorateur de genres | Lire 3 catégories différentes |

---

## 🛠️ Outils & organisation

* GitHub Projects pour la gestion de tâches
* Figma pour les maquettes
* Trello (optionnel)
* VS Code
* Postman pour tester les API

---

## 📅 Présentation du projet

Ce projet sera présenté devant l’équipe pédagogique et comprend :

* Maquettes
* MCD/MLD/MPD
* Démo fonctionnelle
* Explication de l’architecture
* Répartition des tâches (si travail en groupe)

---

## 👥 Auteurs

* OURDJINI Anissa
* YAHYAOUI Reda
* KHORSI Sonia


---

## 📝 Licence

Ce projet est open-source, sous licence MIT.




