# Rongoma Janji & Associates Advocates: website demo

React + TypeScript + Vite demo built from the firm profile and the RJ logo.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
```

Pages (hash routes): `#/` Home, `#/about`, `#/practice`, `#/practice/<slug>`, `#/insights`, `#/contact`.

## Headless WordPress
All copy lives in `src/data/content.ts`. `src/lib/wp.ts` is the only place content is fetched:
set `VITE_WP_URL=https://your-wp-site` and practice areas and insights load from the WP REST API
(`/wp-json/wp/v2/practice-areas`, `/posts`); otherwise the local content is used.

## Placeholders to replace
Founder portrait, map, insight articles (marked `[Sample]`), and the demo contact form (does not send).

Logo variants (`src/assets/logo-*.png`) were extracted from `logo.jpeg` onto transparent backgrounds.
