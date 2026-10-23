// Vercel serverless function: POST /api/booking
// Receives the consultation form, validates it, and sends it to Lilit's Telegram chat.
// The bot token and chat ID live ONLY in server-side environment variables
// (TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID) and are never sent to the browser.

const AGE_OPTIONS = ['7 - 12 տարեկան', '12 - 18 տարեկան']

const RATE_LIMIT_MAX = 5 // submissions per IP ...
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000 // ... per 10 minutes (best effort, per server instance)
const TELEGRAM_TIMEOUT_MS = 8000

const hits = new Map()

function rateLimited(ip) {
  const now = Date.now()
  const recent = (hits.get(ip) || []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS)
  if (recent.length >= RATE_LIMIT_MAX) {
    hits.set(ip, recent)
    return true
  }
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 1000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) hits.delete(key)
    }
  }
  return false
}

// eslint-disable-next-line no-control-regex
const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g

function clean(value, maxLength) {
  if (typeof value !== 'string') return ''
  return value.replace(CONTROL_CHARS, '').trim().slice(0, maxLength)
}

function escapeHtml(text) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function parseBody(req) {
  if (req.body && typeof req.body === 'object') return req.body
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body)
    } catch {
      return null
    }
  }
  return null
}

function validate(body) {
  const name = clean(body.name, 100)
  const phone = clean(body.phone, 30)
  const age = clean(body.age, 50)
  const message = clean(body.message, 1500)
  const digits = phone.replace(/\D/g, '')

  const fields = {}
  if (!name) fields.name = 'required'
  if (!phone) fields.phone = 'required'
  else if (!/^\+?[0-9\s().-]+$/.test(phone) || digits.length < 6 || digits.length > 15) fields.phone = 'invalid'
  if (!AGE_OPTIONS.includes(age)) fields.age = 'invalid'

  if (Object.keys(fields).length > 0) return { fields }
  return { data: { name, phone, age, message } }
}

function formatDate(date) {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Yerevan',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date)
}

function buildMessage({ name, phone, age, message }, date) {
  const lines = [
    '📝 <b>Նոր հայտ՝ ծնողական խորհրդատվության համար</b>',
    '',
    `👤 <b>Անուն:</b> ${escapeHtml(name)}`,
    `📞 <b>Հեռախոս:</b> ${escapeHtml(phone)}`,
    `👶 <b>Երեխայի տարիքը:</b> ${escapeHtml(age)}`,
  ]
  if (message) lines.push(`💬 <b>Հարցի նկարագրություն:</b> ${escapeHtml(message)}`)
  lines.push(`📅 <b>Ուղարկման ամսաթիվ:</b> ${formatDate(date)}`)
  return lines.join('\n')
}

// Env values pasted into dashboards often carry stray spaces/quotes; normalise them.
function readEnv(name) {
  return String(process.env[name] || '').trim().replace(/^["']|["']$/g, '')
}

// Returns { ok: true } or { ok: false, kind }, kind = config | timeout | network | telegram
async function sendToTelegram(text) {
  const token = readEnv('TELEGRAM_BOT_TOKEN')
  const chatId = readEnv('TELEGRAM_CHAT_ID')
  const missing = [!token && 'TELEGRAM_BOT_TOKEN', !chatId && 'TELEGRAM_CHAT_ID'].filter(Boolean)
  if (missing.length > 0) {
    console.error('Telegram is not configured. Missing server environment variable(s):', missing.join(', '))
    return { ok: false, kind: 'config' }
  }

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TELEGRAM_TIMEOUT_MS)
  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
      signal: controller.signal,
    })
    const payload = await response.json().catch(() => null)
    if (!response.ok || !payload || payload.ok !== true) {
      // Log only Telegram's own description (e.g. "Unauthorized", "chat not found"); never the URL (it contains the token).
      console.error('Telegram sendMessage rejected:', response.status, payload && payload.description)
      return { ok: false, kind: 'telegram' }
    }
    return { ok: true }
  } catch (error) {
    const timedOut = error && error.name === 'AbortError'
    console.error(timedOut ? 'Telegram request timed out' : 'Telegram request failed:', error && error.name)
    return { ok: false, kind: timedOut ? 'timeout' : 'network' }
  } finally {
    clearTimeout(timer)
  }
}

const FAILURES = {
  config: [500, 'server_not_configured'],
  timeout: [504, 'telegram_timeout'],
  network: [502, 'telegram_unreachable'],
  telegram: [502, 'telegram_rejected'],
}

function sameOrigin(req) {
  if (!req.headers.origin) return false
  try {
    const originHost = new URL(req.headers.origin).host
    return originHost === req.headers.host || originHost === req.headers['x-forwarded-host']
  } catch {
    return false
  }
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false, error: 'method_not_allowed' })
  }

  // Same-origin check: browsers always send Origin on this request.
  if (!sameOrigin(req)) {
    return res.status(403).json({ ok: false, error: 'forbidden' })
  }

  const forwarded = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim()
  const ip = forwarded || (req.socket && req.socket.remoteAddress) || 'unknown'
  if (rateLimited(ip)) {
    return res.status(429).json({ ok: false, error: 'rate_limited' })
  }

  const body = parseBody(req)
  if (!body || typeof body !== 'object') {
    return res.status(400).json({ ok: false, error: 'invalid_json', message: 'Request body must be a JSON object.' })
  }

  // Honeypot: an EMPTY `website` field is normal. Only a filled one marks a bot,
  // which gets a fake success and nothing is sent.
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return res.status(200).json({ ok: true })
  }

  const result = validate(body)
  if (result.fields) {
    return res.status(400).json({
      ok: false,
      error: 'validation_failed',
      fields: result.fields,
      message: 'Some fields are missing or invalid.',
    })
  }

  const sent = await sendToTelegram(buildMessage(result.data, new Date()))
  if (!sent.ok) {
    const [status, error] = FAILURES[sent.kind]
    return res.status(status).json({ ok: false, error })
  }

  return res.status(200).json({ ok: true })
}
