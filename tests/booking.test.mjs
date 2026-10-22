import test from 'node:test'
import assert from 'node:assert/strict'
import handler from '../api/booking.js'

const TOKEN = 'TEST_TOKEN_123'
process.env.TELEGRAM_BOT_TOKEN = TOKEN
process.env.TELEGRAM_CHAT_ID = '42'

let ipCounter = 0
const AGE = '7 - 12 տարեկան'

function makeReq(body, overrides = {}) {
  return {
    method: 'POST',
    headers: {
      origin: 'https://site.test',
      host: 'site.test',
      'x-forwarded-for': `10.0.0.${++ipCounter}`,
      ...(overrides.headers || {}),
    },
    body,
    ...(overrides.method ? { method: overrides.method } : {}),
  }
}
function makeRes() {
  return {
    code: null, json: null, headers: {},
    setHeader(k, v) { this.headers[k] = v },
    status(c) { this.code = c; return this },
    json(o) { this.json = o; return this },
  }
}
function mockFetch(impl) {
  const calls = []
  globalThis.fetch = async (url, init) => { calls.push({ url, init }); return impl(url, init) }
  return calls
}
const tgOk = () => ({ ok: true, status: 200, json: async () => ({ ok: true }) })
const valid = { name: 'Աննա', phone: '+374 77 716614', age: AGE, message: 'Հարց <b>& "quotes"</b>', website: '' }

test('valid submission sends one Telegram message with the submitted values', async () => {
  const calls = mockFetch(tgOk)
  const res = makeRes()
  await handler(makeReq(valid), res)
  assert.equal(res.code, 200); assert.deepEqual(res.json, { ok: true })
  assert.equal(calls.length, 1)
  assert.equal(calls[0].url, `https://api.telegram.org/bot${TOKEN}/sendMessage`)
  const sent = JSON.parse(calls[0].init.body)
  assert.equal(sent.chat_id, '42'); assert.equal(sent.parse_mode, 'HTML')
  assert.ok(sent.text.includes('Աննա') && sent.text.includes('+374 77 716614') && sent.text.includes(AGE))
  assert.ok(sent.text.includes('Հարց &lt;b&gt;&amp; "quotes"&lt;/b&gt;'), 'user text must be HTML-escaped')
  assert.ok(!sent.text.includes('<b>& "quotes"'), 'raw user markup must not pass through')
  assert.ok(!JSON.stringify(res.json).includes(TOKEN))
})

test('empty message is omitted from the Telegram text', async () => {
  const calls = mockFetch(tgOk)
  await handler(makeReq({ ...valid, message: '' }), makeRes())
  assert.equal(JSON.parse(calls[0].init.body).text.includes('Հարցի նկարագրություն'), false)
})

test('invalid submissions never reach Telegram', async () => {
  const calls = mockFetch(tgOk)
  for (const bad of [
    { ...valid, name: '   ' }, { ...valid, phone: 'abc' }, { ...valid, phone: '123' },
    { ...valid, age: 'other' }, { ...valid, name: 42 }, {},
  ]) {
    const res = makeRes(); await handler(makeReq(bad), res)
    assert.equal(res.code, 400)
  }
  assert.equal(calls.length, 0)
})

test('honeypot is silently accepted but nothing is sent', async () => {
  const calls = mockFetch(tgOk)
  const res = makeRes(); await handler(makeReq({ ...valid, website: 'http://spam' }), res)
  assert.equal(res.code, 200); assert.equal(calls.length, 0)
})

test('Telegram API failure -> 502, no false success, no internals leaked', async () => {
  mockFetch(() => ({ ok: false, status: 401, json: async () => ({ ok: false, description: 'Unauthorized' }) }))
  const res = makeRes(); await handler(makeReq(valid), res)
  assert.equal(res.code, 502); assert.deepEqual(res.json, { ok: false, error: 'delivery_failed' })
  assert.ok(!JSON.stringify(res.json).includes('Unauthorized'))
})

test('network error -> 502', async () => {
  mockFetch(() => { throw new Error('boom') })
  const res = makeRes(); await handler(makeReq(valid), res)
  assert.equal(res.code, 502)
})

test('missing env vars -> 500-class failure without sending', async () => {
  const calls = mockFetch(tgOk)
  const saved = process.env.TELEGRAM_BOT_TOKEN; delete process.env.TELEGRAM_BOT_TOKEN
  const res = makeRes(); await handler(makeReq(valid), res)
  process.env.TELEGRAM_BOT_TOKEN = saved
  assert.equal(res.code, 502); assert.equal(calls.length, 0)
})

test('wrong/missing Origin and non-POST are rejected', async () => {
  const calls = mockFetch(tgOk)
  let res = makeRes(); await handler(makeReq(valid, { headers: { origin: 'https://evil.test' } }), res); assert.equal(res.code, 403)
  res = makeRes(); await handler(makeReq(valid, { headers: { origin: '' } }), res); assert.equal(res.code, 403)
  res = makeRes(); await handler(makeReq(valid, { method: 'GET' }), res); assert.equal(res.code, 405)
  assert.equal(calls.length, 0)
})

test('rate limit: 6th request from one IP within the window -> 429', async () => {
  const calls = mockFetch(tgOk)
  const headers = { 'x-forwarded-for': '203.0.113.9' }
  const codes = []
  for (let i = 0; i < 6; i++) { const res = makeRes(); await handler(makeReq(valid, { headers }), res); codes.push(res.code) }
  assert.deepEqual(codes, [200, 200, 200, 200, 200, 429]); assert.equal(calls.length, 5)
})
