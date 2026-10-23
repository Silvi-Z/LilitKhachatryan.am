// Lets `npm run dev` serve the Vercel-style handler in api/booking.js locally,
// so the booking form works on http://localhost:5173 without `vercel dev`.
// Pure Node (no Vite imports) so it can be unit-tested.

export function createApiMiddleware({ getHandler, applyEnv }) {
  return async (req, res) => {
    try {
      if (applyEnv) applyEnv()

      const chunks = []
      for await (const chunk of req) chunks.push(chunk)
      const raw = Buffer.concat(chunks).toString('utf8')
      const isJson = String(req.headers['content-type'] || '').includes('application/json')
      if (isJson) {
        try {
          req.body = raw ? JSON.parse(raw) : {}
        } catch {
          req.body = raw // handler answers 400 invalid_json
        }
      } else {
        req.body = raw
      }

      // Minimal Vercel-style response helpers
      res.status = (code) => {
        res.statusCode = code
        return res
      }
      res.json = (payload) => {
        res.setHeader('Content-Type', 'application/json; charset=utf-8')
        res.end(JSON.stringify(payload))
        return res
      }

      const handler = await getHandler()
      await handler(req, res)
    } catch (error) {
      console.error('[dev-api] handler crashed:', error && error.message)
      res.statusCode = 500
      res.setHeader('Content-Type', 'application/json; charset=utf-8')
      res.end(JSON.stringify({ ok: false, error: 'server_error' }))
    }
  }
}
