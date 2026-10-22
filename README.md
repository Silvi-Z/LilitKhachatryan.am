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

## Additions (phase 2)
- **Confidentiality statement** – bottom of the services section (`src/components/Services.jsx`).
- **Նյութեր ծնողների համար** – `src/components/Materials.jsx`, placed between services and contact (`#materials`). Shows an honest "coming soon" message while `src/data/articles.js` is empty.
- **Social icons** – `src/components/SocialLinks.jsx` in the footer. Nothing is displayed until real URLs are set in `src/data/socialLinks.js`.
- **Telegram delivery** – `api/booking.js` (Vercel serverless function). Both forms (contact form + booking modal) post to `/api/booking`.

### Adding an article
Open `src/data/articles.js` and add an object (format is documented at the top of the file). The "Կարդալ ավելին" link only appears when `href` is set.

### Adding social links
Open `src/data/socialLinks.js` and paste the full `https://…` profile URL into `url` for Instagram / Facebook / Telegram. Empty ones stay hidden.

### Telegram bot setup
1. In Telegram, open **@BotFather** (the official, verified account) → send `/newbot` → choose a name and a username ending in `bot`.
2. BotFather replies with the **bot token**. Treat it like a password; never paste it into code, chat, or Git.
3. Open your new bot in Telegram and press **Start** / send it any message (a bot cannot message you until you do).
4. Get your **chat ID**: open `https://api.telegram.org/bot<YOUR_TOKEN>/getUpdates` in a browser (replace `<YOUR_TOKEN>`), find `"chat":{"id":123456789,...}` and copy the number. (Alternatively message @userinfobot.) Do this privately; don't share the URL.
5. In Vercel → your project → **Settings → Environment Variables**, add `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` (Production, and Preview if wanted). Leave "Sensitive" on for the token.
6. **Redeploy** (Deployments → ⋯ → Redeploy) – env changes only apply to new deployments.
7. Open the live site, submit the form with a test name/phone, and confirm the message arrives in your Telegram chat.

If the variables are missing or Telegram rejects the message, visitors see an error and can retry – no false success is shown.

### Tests
`npm test` runs `tests/booking.test.mjs` (Node's built-in runner, Telegram mocked – no real messages are sent).
To try the API locally use `npx vercel dev` (plain `npm run dev` does not run `/api`).

## Visual design (Modern Editorial + Warm Feminine)
Colors and fonts are defined once in `tailwind.config.js` and used by name in the components:
`plum` #572D43 · `berry` #A64F68 · `rose` #E8B9C3 · `ivory` #FAF5F2 · `ink` #30252B · white. Secondary text is `text-ink/75`.
Section rhythm: banner (plum) → header/hero (ivory) → experience (white) → age groups (ivory) → services (plum) → materials (white) → contact (berry) → footer (plum).
Shared styles (`.tag`, `.btn-primary`, `.btn-secondary`, `.btn-light`, `.field`) live in `src/styles/index.css`.
The hero portrait is a decorative placeholder (see the comment in `src/components/Hero.jsx`); replace it with Lilit's photo when available.
Fonts: Noto Serif / Noto Serif Armenian (headings), Inter / Noto Sans Armenian (body) via Google Fonts.
