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
1. In Telegram, open **@BotFather** (official, verified) -> `/newbot` -> choose a name and a username ending in `bot`.
2. BotFather replies with the **bot token**. Treat it like a password; never paste it into code, chat, or Git.
3. Open your new bot and press **Start** / send it any message (a bot cannot message you until you do).
4. Get your **chat ID**: open `https://api.telegram.org/bot<YOUR_TOKEN>/getUpdates` in a browser and copy `"chat":{"id":123456789,...}`. Do this privately. (For a group chat the id is negative, e.g. `-100...`; add the bot to the group first.)
5. Add the two values (see "Local" and "Vercel" below).

### Local development (`npm run dev`)
`npm run dev` now serves `/api/booking` itself (a small Vite dev plugin runs the same `api/booking.js` that Vercel runs), so no separate backend or `vercel dev` is needed.
- Create a file named **`.env`** (or `.env.local`) in the **project root, next to `package.json`**:
  ```
  TELEGRAM_BOT_TOKEN=123456789:AA...your token
  TELEGRAM_CHAT_ID=123456789
  ```
  No quotes needed, no `VITE_` prefix (a `VITE_` prefix would expose the value to the browser - do not use it).
- The dev server re-reads `.env` on every booking request, so changing it needs no restart. Restart `npm run dev` after editing `vite.config.js` or `package.json`.
- `.env` is git-ignored. Only `.env.example` (empty placeholders) is committed.

### Vercel (production)
Vercel does **not** upload your local `.env`. In Vercel -> your project -> **Settings -> Environment Variables**:
1. Add `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` (same names, exact spelling).
2. Tick **Production** (and Preview if you test on preview URLs).
3. **Redeploy**: Deployments -> latest -> ... -> **Redeploy**. Variables only apply to deployments created after they were saved.
4. Open the site, submit the form with a realistic phone number (e.g. `+374 77 123456`), confirm the message arrives. If it fails, Vercel -> Deployments -> Functions/Logs shows the reason (e.g. "Unauthorized" = wrong token, "chat not found" = wrong chat id or you never pressed Start).

### API responses (`POST /api/booking`)
| Status | `error` | Meaning |
|---|---|---|
| 200 | - | Telegram accepted the message |
| 400 | `validation_failed` (+ `fields`) / `invalid_json` | Name empty, phone not 6-15 digits, age not one of the form options, or body not JSON |
| 403 | `forbidden` | Request did not come from the site's own origin |
| 429 | `rate_limited` | More than 5 submissions / 10 min from one IP |
| 500 | `server_not_configured` | `TELEGRAM_BOT_TOKEN` / `TELEGRAM_CHAT_ID` missing on the server |
| 502 | `telegram_rejected` / `telegram_unreachable` | Telegram refused (bad token/chat) or could not be reached |
| 504 | `telegram_timeout` | Telegram did not answer within 8 s |

### Tests
`npm test` (Node's built-in runner; Telegram is mocked, so no real message is sent): API handler tests plus the dev-server middleware over real HTTP.

## Visual design (Modern Editorial + Warm Feminine)
Colors and fonts are defined once in `tailwind.config.js` and used by name in the components:
`plum` #572D43 · `berry` #A64F68 · `rose` #E8B9C3 · `ivory` #FAF5F2 · `ink` #30252B · white. Secondary text is `text-ink/75`.
Section rhythm: banner (plum) → header/hero (ivory) → experience (white) → age groups (ivory) → services (plum) → materials (white) → contact (berry) → footer (plum).
Shared styles (`.tag`, `.btn-primary`, `.btn-secondary`, `.btn-light`, `.field`) live in `src/styles/index.css`.
The hero portrait is a decorative placeholder (see the comment in `src/components/Hero.jsx`); replace it with Lilit's photo when available.
Fonts: Noto Serif / Noto Serif Armenian (headings), Inter / Noto Sans Armenian (body) via Google Fonts.
