import test from 'node:test'
import assert from 'node:assert/strict'
import http from 'node:http'
import { createApiMiddleware } from '../scripts/dev-api-middleware.js'

// Exercises the exact path `npm run dev` uses: real HTTP -> middleware -> api/booking.js -> (mocked) Telegram.
const AGE = '7 - 12 տարեկան'
const realFetch = globalThis.fetch
let telegramCalls = []
let telegramReply = { ok: true, status: 200, json: async () => ({ ok: true }) }
globalThis.fetch = async (url, init) => {
  if (String(url).startsWith('https://api.telegram.org/')) { telegramCalls.push({ url: String(url), init }); return telegramReply }
  return realFetch(url, init)
}

async function withServer(env, fn) {
  const applied = []
  const middleware = createApiMiddleware({
    applyEnv: () => { Object.assign(process.env, env); applied.push(1) },
    getHandler: async () => (await import('../api/booking.js')).default,
  })
  const server = http.createServer((req, res) => middleware(req, res))
  await new Promise((r) => server.listen(0, '127.0.0.1', r))
  const base = `http://127.0.0.1:${server.address().port}`
  try { await fn(base, applied) } finally { await new Promise((r) => server.close(r)) }
}
const post = (base, body, headers = {}) => realFetch(`${base}/`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Origin: new URL(base).origin, ...headers },
  body: typeof body === 'string' ? body : JSON.stringify(body),
})

test('dev server: valid booking over real HTTP reaches Telegram with env loaded server-side', async () => {
  telegramCalls = []
  await withServer({ TELEGRAM_BOT_TOKEN: 'DEVTOKEN', TELEGRAM_CHAT_ID: '7' }, async (base, applied) => {
    const res = await post(base, { name: 'Աննա', phone: '077 123456', age: AGE, message: 'hi', website: '' })
    assert.equal(res.status, 200); assert.deepEqual(await res.json(), { ok: true })
    assert.equal(telegramCalls.length, 1)
    assert.ok(telegramCalls[0].url.includes('DEVTOKEN'))
    assert.equal(applied.length, 1, 'env is (re)read on each request, so editing .env needs no restart')
  })
})

test('dev server: the bug-report payload gets a readable 400 JSON body (not an empty response)', async () => {
  telegramCalls = []
  await withServer({ TELEGRAM_BOT_TOKEN: 'DEVTOKEN', TELEGRAM_CHAT_ID: '7' }, async (base) => {
    const res = await post(base, { age: AGE, message: 'wew', name: 'eee', phone: 'www', website: '' }, { 'x-forwarded-for': '9.9.9.1' })
    assert.equal(res.status, 400)
    assert.match(res.headers.get('content-type'), /application\/json/)
    const json = await res.json()
    assert.equal(json.error, 'validation_failed'); assert.deepEqual(json.fields, { phone: 'invalid' })
    assert.equal(telegramCalls.length, 0)
  })
})

test('dev server: invalid JSON -> 400 invalid_json; Telegram failure -> 502 JSON', async () => {
  await withServer({ TELEGRAM_BOT_TOKEN: 'DEVTOKEN', TELEGRAM_CHAT_ID: '7' }, async (base) => {
    let res = await post(base, '{oops', { 'x-forwarded-for': '9.9.9.2' })
    assert.equal(res.status, 400); assert.equal((await res.json()).error, 'invalid_json')
    telegramReply = { ok: false, status: 401, json: async () => ({ ok: false, description: 'Unauthorized' }) }
    const origError = console.error; console.error = () => {}
    res = await post(base, { name: 'A', phone: '077123456', age: AGE, message: '', website: '' }, { 'x-forwarded-for': '9.9.9.3' })
    console.error = origError
    telegramReply = { ok: true, status: 200, json: async () => ({ ok: true }) }
    assert.equal(res.status, 502); assert.deepEqual(await res.json(), { ok: false, error: 'telegram_rejected' })
  })
})
