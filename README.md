# Լիլիթ Խաչատրյան – website (React + Vite)

Migrated 1:1 from the original single-file HTML site (kept in `reference/original.html` for side-by-side comparison; safe to delete).

## Run locally
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # outputs to dist/
npm run preview    # serves the production build
```
Requires Node 18+.

## Deploy to Vercel
1. Run `npm install` once and commit the generated `package-lock.json`.
2. Push the project to GitHub/GitLab/Bitbucket.
3. In Vercel: **Add New → Project → import the repo**. Vercel auto-detects Vite
   (Build Command `npm run build`, Output Directory `dist`). Click **Deploy**.

CLI alternative: `npx vercel` (preview) then `npx vercel --prod`.

No `vercel.json` is needed: the site is a single page with in-page `#anchor` links and no client-side routing.

## Structure
- `index.html` – entry; keeps the original `<html>`/`<body>` classes, title, Font Awesome and Google Fonts links
- `src/main.jsx`, `src/App.jsx` – entry + page composition, booking-modal state
- `src/components/` – one component per original section
- `src/styles/index.css` – Tailwind directives + the original custom CSS verbatim
- `tailwind.config.js` – the original inline `tailwind.config`, unchanged (plus `content` paths)
