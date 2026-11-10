# Rongoma Janji & Associates Advocates: website demo

React + TypeScript + Vite demo built from the firm profile and the RJ logo.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
```

Pages (hash routes): `#/` Home, `#/about`, `#/practice`, `#/practice/<slug>`, `#/insights`, `#/insights/<slug>`, `#/contact`, and the admin portal at `/admin` (sign in, insights, enquiries, account, forgot password).

## Backend
The site talks to a PHP + MySQL API in `../rangoma_backend` (Insights articles, contact form with email, admin portal at `/admin`). Run it with `npm run api` in a second terminal; Vite proxies `/api` and `/uploads` to it. Setup, `.env` settings and deployment are in `../rangoma_backend/README.md`. Practice areas and firm copy live in `src/data/content.ts`.

## Placeholders to replace
Founder portrait (monogram card) and the starter insight articles, which you can edit or delete in the admin portal.

Logo variants (`src/assets/logo-*.png`) were extracted from `logo.jpeg` onto transparent backgrounds.
