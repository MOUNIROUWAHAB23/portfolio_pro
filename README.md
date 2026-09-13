# Portfolio

Portfolio fullstack : frontend React (Create React App) + un formulaire de contact
(email via Nodemailer) et un chatbot IA (Google Gemini).

## Structure

- `client/` — application React (CRA)
- `api/` — fonctions serverless Vercel (`/api/contact`, `/api/chat`)
- `server.js` — serveur Express équivalent, pour le développement local ou un
  déploiement sur une plateforme classique (Render, Railway, etc.)

## Développement local

```bash
npm install
npm install --prefix client
```

Copiez `.env.example` vers `.env` à la racine et renseignez vos identifiants
(`EMAIL_USER`, `EMAIL_PASS`, `GOOGLE_API_KEY`).

Lancer le backend puis le frontend (deux terminaux) :

```bash
npm start
```

```bash
npm start --prefix client
```

Le proxy CRA (`client/package.json`) redirige automatiquement les appels
`/api/*` vers `http://localhost:5000` pendant le développement.

## Déploiement sur Vercel

Le projet est prêt pour un déploiement 100% Vercel :

- le frontend (`client/`) est buildé en site statique,
- `/api/contact` et `/api/chat` tournent comme fonctions serverless Vercel
  (dossier `api/`), sans dépendre d'un backend externe.

Étapes :

1. Importer le repo sur [vercel.com](https://vercel.com/new) (aucune
   configuration de "Root Directory" à changer, `vercel.json` gère tout).
2. Dans les paramètres du projet Vercel, ajouter les variables
   d'environnement suivantes (Project Settings → Environment Variables) :
   - `EMAIL_USER`
   - `EMAIL_PASS` (mot de passe d'application Gmail, pas votre mot de passe
     normal)
   - `CONTACT_EMAIL` (optionnel, adresse de réception)
   - `GOOGLE_API_KEY`
3. Déployer. Le formulaire de contact et le chatbot appelleront
   automatiquement `/api/contact` et `/api/chat` sur le même domaine.

## Notes

- `EMAIL_PASS` doit être un [mot de passe d'application Google](https://myaccount.google.com/apppasswords),
  pas le mot de passe du compte.
- `GOOGLE_API_KEY` est une clé [Google AI Studio](https://aistudio.google.com/app/apikey)
  pour l'API Gemini.
