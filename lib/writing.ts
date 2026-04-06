/* ──────────────────────────────────────────────────────────
 * RSS feed aggregator for the writing page.
 *
 * Fetches Substack + Medium feeds, deduplicates by title
 * (Substack wins), and returns posts sorted newest-first.
 * ────────────────────────────────────────────────────────── */

const FEEDS = [
  { url: "https://raksaw.substack.com/feed", source: "substack" as const },
  { url: "https://medium.com/feed/@waskar.paulino", source: "medium" as const },
]

export interface WritingPost {
  title: string
  url: string
  publishedAt: string
  summary: string
  source: "substack" | "medium"
}

// ── Helpers ──────────────────────────────────────────────

function extractTag(xml: string, tag: string): string {
  // Try CDATA-wrapped content first
  const cdataRe = new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tag}>`)
  const cdataMatch = cdataRe.exec(xml)
  if (cdataMatch) return cdataMatch[1].trim()

  // Fall back to plain text (no backtracking — [^<]* is linear)
  const plainRe = new RegExp(`<${tag}[^>]*>([^<]*)</${tag}>`)
  const plainMatch = plainRe.exec(xml)
  return plainMatch?.[1]?.trim() ?? ""
}

function isSafeUrl(url: string): boolean {
  try {
    const parsed = new URL(url)
    return parsed.protocol === "https:" || parsed.protocol === "http:"
  } catch {
    return false
  }
}

function safeIsoDate(raw: string): string {
  const d = new Date(raw)
  return Number.isNaN(d.getTime()) ? "" : d.toISOString()
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

function truncate(text: string, max: number): string {
  if (text.length <= max) return text
  const cut = text.slice(0, max)
  const lastSpace = cut.lastIndexOf(" ")
  return (lastSpace > 0 ? cut.slice(0, lastSpace) : cut) + "\u2026"
}

function normalizeTitle(title: string): string {
  return title.toLowerCase().trim()
}

// ── Feed parsing ─────────────────────────────────────────

function parseFeed(xml: string, source: "substack" | "medium"): WritingPost[] {
  const posts: WritingPost[] = []

  // Split on <item — works for Substack/Medium RSS 2.0 feeds.
  // A proper XML parser would be needed for arbitrary feeds.
  const items = xml.split("<item")

  // First element is everything before the first <item>, skip it
  for (let i = 1; i < items.length; i++) {
    const item = items[i]
    const title = stripHtml(extractTag(item, "title"))
    const url = extractTag(item, "link") || extractTag(item, "guid")
    const pubDate = extractTag(item, "pubDate")
    const description = stripHtml(extractTag(item, "description"))

    if (!title || !url || !isSafeUrl(url)) continue

    posts.push({
      title,
      url,
      publishedAt: safeIsoDate(pubDate),
      summary: truncate(description, 200),
      source,
    })
  }

  return posts
}

// ── Public API ───────────────────────────────────────────

export async function getWritingPosts(): Promise<WritingPost[]> {
  const results = await Promise.allSettled(
    FEEDS.map(async ({ url, source }) => {
      const res = await fetch(url, {
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(10_000),
      })
      if (!res.ok) return []
      const xml = await res.text()
      return parseFeed(xml, source)
    })
  )

  const allPosts = results.flatMap((r) =>
    r.status === "fulfilled" ? r.value : []
  )

  // Deduplicate: Substack wins because it appears first in FEEDS
  const seen = new Map<string, WritingPost>()
  for (const post of allPosts) {
    const key = normalizeTitle(post.title)
    if (!seen.has(key)) {
      seen.set(key, post)
    }
  }

  return Array.from(seen.values()).sort((a, b) => {
    const ta = a.publishedAt ? new Date(a.publishedAt).getTime() : 0
    const tb = b.publishedAt ? new Date(b.publishedAt).getTime() : 0
    return tb - ta
  })
}
