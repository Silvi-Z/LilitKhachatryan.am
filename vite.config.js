import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { createApiMiddleware } from './scripts/dev-api-middleware.js'

// Dev only: serve /api/booking from api/booking.js (same code Vercel runs in production).
// TELEGRAM_* are read from .env / .env.local on the server side and are never sent to the browser
// (Vite only exposes variables prefixed with VITE_ to client code).
function devApi() {
  return {
    name: 'dev-api',
    apply: 'serve',
    configureServer(server) {
      const applyEnv = () => {
        const env = loadEnv(server.config.mode, server.config.envDir || server.config.root, '')
        for (const key of ['TELEGRAM_BOT_TOKEN', 'TELEGRAM_CHAT_ID']) {
          if (env[key] !== undefined) process.env[key] = env[key]
        }
      }
      server.middlewares.use(
        '/api/booking',
        createApiMiddleware({
          applyEnv,
          getHandler: async () => (await server.ssrLoadModule('/api/booking.js')).default,
        }),
      )
    },
  }
}

export default defineConfig({
  plugins: [react(), devApi()],
})
