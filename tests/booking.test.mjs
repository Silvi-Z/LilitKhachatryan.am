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
    method: overrides.method || 'POST',
    headers: {
      origin: 'https://site.test',
      host: 'site.test',
      'x-forwarded-for': `10.0.0.${++ipCounter}`,
      ...(overrides.headers || {}),
    },
    body,
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
function captureLogs() {
  const lines = []
  const original = console.error
  console.error = (...args) => lines.push(args.join(' '))
  return { lines, restore: () => { console.error = original } }
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
  assert.ok(!JSON.stringify(res.json).includes(TOKEN))
})

test('REGRESSION: the exact payload from the bug report is rejected ONLY because of the phone, with a clear JSON error', async () => {
  const calls = mockFetch(tgOk)
  const res = makeRes()
  await handler(makeReq({ age: AGE, message: 'wew', name: 'eee', phone: 'www', website: '' }), res)
  assert.equal(res.code, 400)
  assert.equal(res.json.error, 'validation_failed')
  assert.deepEqual(res.json.fields, { phone: 'invalid' }) // name, age and the empty honeypot are fine
  assert.equal(calls.length, 0)
})

test('same payload with a real-looking phone is accepted (empty honeypot is valid)', async () => {
  const calls = mockFetch(tgOk)
  const res = makeRes()
  await handler(makeReq({ age: AGE, message: 'wew', name: 'eee', phone: '077 123456', website: '' }), res)
  assert.equal(res.code, 200); assert.equal(calls.length, 1)
})

test('message is optional and omitted from the Telegram text when empty', async () => {
  const calls = mockFetch(tgOk)
  await handler(makeReq({ ...valid, message: '' }), makeRes())
  assert.equal(JSON.parse(calls[0].init.body).text.includes('Հարցի նկարագրություն'), false)
})

test('invalid submissions never reach Telegram and report which field failed', async () => {
  const calls = mockFetch(tgOk)
  const cases = [
    [{ ...valid, name: '   ' }, { name: 'required' }],
    [{ ...valid, phone: '' }, { phone: 'required' }],
    [{ ...valid, phone: 'abc' }, { phone: 'invalid' }],
    [{ ...valid, phone: '123' }, { phone: 'invalid' }],
    [{ ...valid, age: 'other' }, { age: 'invalid' }],
    [{ ...valid, name: 42 }, { name: 'required' }],
    [{ ...valid, name: '', phone: 'x', age: 'y' }, { name: 'required', phone: 'invalid', age: 'invalid' }],
  ]
  for (const [bad, fields] of cases) {
    const res = makeRes(); await handler(makeReq(bad), res)
    assert.equal(res.code, 400); assert.equal(res.json.error, 'validation_failed')
    assert.deepEqual(res.json.fields, fields)
  }
  assert.equal(calls.length, 0)
})

test('unparseable body -> 400 invalid_json', async () => {
  const calls = mockFetch(tgOk)
  for (const body of ['{not json', undefined, null]) {
    const res = makeRes(); await handler(makeReq(body), res)
    assert.equal(res.code, 400); assert.equal(res.json.error, 'invalid_json')
  }
  assert.equal(calls.length, 0)
})

test('filled honeypot is silently accepted but nothing is sent', async () => {
  const calls = mockFetch(tgOk)
  const res = makeRes(); await handler(makeReq({ ...valid, website: 'http://spam' }), res)
  assert.equal(res.code, 200); assert.equal(calls.length, 0)
})

test('missing env vars -> 500 server_not_configured (not a 400), names the variable only in server logs', async () => {
  const calls = mockFetch(tgOk)
  const logs = captureLogs()
  const saved = { t: process.env.TELEGRAM_BOT_TOKEN, c: process.env.TELEGRAM_CHAT_ID }
  delete process.env.TELEGRAM_BOT_TOKEN; delete process.env.TELEGRAM_CHAT_ID
  const res = makeRes(); await handler(makeReq(valid), res)
  process.env.TELEGRAM_BOT_TOKEN = saved.t; process.env.TELEGRAM_CHAT_ID = saved.c
  logs.restore()
  assert.equal(res.code, 500); assert.deepEqual(res.json, { ok: false, error: 'server_not_configured' })
  assert.equal(calls.length, 0)
  assert.ok(logs.lines.join('\n').includes('TELEGRAM_BOT_TOKEN') && logs.lines.join('\n').includes('TELEGRAM_CHAT_ID'))
})

test('env values with stray spaces/quotes are normalised', async () => {
  const calls = mockFetch(tgOk)
  process.env.TELEGRAM_BOT_TOKEN = `  "${TOKEN}"  `; process.env.TELEGRAM_CHAT_ID = ' 42\n'
  const res = makeRes(); await handler(makeReq(valid), res)
  process.env.TELEGRAM_BOT_TOKEN = TOKEN; process.env.TELEGRAM_CHAT_ID = '42'
  assert.equal(res.code, 200)
  assert.equal(calls[0].url, `https://api.telegram.org/bot${TOKEN}/sendMessage`)
  assert.equal(JSON.parse(calls[0].init.body).chat_id, '42')
})

test('Telegram rejects (bad token / chat not found) -> 502 telegram_rejected, no secrets or details leaked', async () => {
  mockFetch(() => ({ ok: false, status: 400, json: async () => ({ ok: false, description: 'Bad Request: chat not found' }) }))
  const logs = captureLogs()
  const res = makeRes(); await handler(makeReq(valid), res)
  logs.restore()
  assert.equal(res.code, 502); assert.deepEqual(res.json, { ok: false, error: 'telegram_rejected' })
  assert.ok(!JSON.stringify(res.json).includes('chat not found'))
  assert.ok(logs.lines.join('\n').includes('chat not found'), 'reason is visible in server logs')
  assert.ok(!logs.lines.join('\n').includes(TOKEN), 'token never logged')
})

test('Telegram returns HTTP 200 with ok:false -> still a failure (no false success)', async () => {
  mockFetch(() => ({ ok: true, status: 200, json: async () => ({ ok: false, description: 'x' }) }))
  const logs = captureLogs(); const res = makeRes(); await handler(makeReq(valid), res); logs.restore()
  assert.equal(res.code, 502)
})

test('network error -> 502 telegram_unreachable; timeout -> 504 telegram_timeout; token never logged', async () => {
  const logs = captureLogs()
  mockFetch(() => { throw new Error(`boom https://api.telegram.org/bot${TOKEN}/sendMessage`) })
  let res = makeRes(); await handler(makeReq(valid), res)
  assert.equal(res.code, 502); assert.equal(res.json.error, 'telegram_unreachable')
  mockFetch(() => { const e = new Error('aborted'); e.name = 'AbortError'; throw e })
  res = makeRes(); await handler(makeReq(valid), res)
  logs.restore()
  assert.equal(res.code, 504); assert.equal(res.json.error, 'telegram_timeout')
  assert.ok(!logs.lines.join('\n').includes(TOKEN))
})

test('wrong/missing Origin and non-POST are rejected; x-forwarded-host is honoured', async () => {
  const calls = mockFetch(tgOk)
  let res = makeRes(); await handler(makeReq(valid, { headers: { origin: 'https://evil.test' } }), res); assert.equal(res.code, 403)
  res = makeRes(); await handler(makeReq(valid, { headers: { origin: '' } }), res); assert.equal(res.code, 403)
  res = makeRes(); await handler(makeReq(valid, { method: 'GET' }), res); assert.equal(res.code, 405)
  assert.equal(calls.length, 0)
  res = makeRes(); await handler(makeReq(valid, { headers: { host: 'internal.vercel', 'x-forwarded-host': 'site.test' } }), res)
  assert.equal(res.code, 200)
})

test('rate limit: 6th request from one IP within the window -> 429', async () => {
  const calls = mockFetch(tgOk)
  const headers = { 'x-forwarded-for': '203.0.113.9' }
  const codes = []
  for (let i = 0; i < 6; i++) { const res = makeRes(); await handler(makeReq(valid, { headers }), res); codes.push(res.code) }
  assert.deepEqual(codes, [200, 200, 200, 200, 200, 429]); assert.equal(calls.length, 5)
})
