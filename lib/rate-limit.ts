/* ──────────────────────────────────────────────────────────
 * Rate limiter for /api/brave-search-demo.
 *
 * Fixed-window counter: each visitor gets MAX_REQUESTS per WINDOW_MS.
 * Counts live in memory (a Map per warm Netlify instance). The count
 * is approximate on purpose: the $5 Anthropic spend limit is the hard
 * backstop. See decide-first-log.md, 2026-11-22.
 * ────────────────────────────────────────────────────────── */

// Step 1: who is asking?
// Netlify writes the visitor's real IP address into the
// "x-nf-client-connection-ip" request header.
export function getClientIp(req: Request): string {
  const ip: string | null = req.headers.get("x-nf-client-connection-ip")

  return ip ?? "unknown"
}
const MAX_REQUEST = 3
const WINDOW_MS = 60_000
const hits = new Map<string, { windowStart: number, count: number }>()

export function checkRateLimit(ip: string, now: number): boolean {
  let record = hits.get(ip)
  if (!record || (now - record.windowStart) >= WINDOW_MS) {
    record = { windowStart: now, count: 0 }
    hits.set(ip, record)
  }

  record.count++
  return record.count <= MAX_REQUEST

}