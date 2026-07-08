/* ──────────────────────────────────────────────────────────
 * Shared date formatter for display (talks, writing posts).
 *
 * Bare `YYYY-MM-DD` strings (e.g. Talk.date) have no time/zone
 * component, so `new Date(iso)` parses them as UTC midnight —
 * formatting that in local time can roll the displayed date
 * back a day for zones behind UTC. We instead parse the
 * year/month/day components directly into a local Date.
 *
 * Full timestamps (e.g. RSS pubDate → toISOString(), which
 * WritingPost.publishedAt uses) already carry real time/zone
 * info, so they're parsed normally via `new Date(iso)`.
 * ────────────────────────────────────────────────────────── */

const BARE_DATE_RE = /^(\d{4})-(\d{2})-(\d{2})$/

export function formatDate(iso: string): string {
  const bareDateMatch = BARE_DATE_RE.exec(iso)
  const date = bareDateMatch
    ? new Date(
        Number(bareDateMatch[1]),
        Number(bareDateMatch[2]) - 1,
        Number(bareDateMatch[3]),
      )
    : new Date(iso)

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}
