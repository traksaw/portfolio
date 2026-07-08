/* ──────────────────────────────────────────────────────────
 * Central data file — single source of truth for site content.
 *
 * Edit this file to update copy across the portfolio.
 * Components import typed arrays/objects from here.
 * ────────────────────────────────────────────────────────── */

// ── Identity lanes (homepage cards) ──────────────────────

export interface IdentityLane {
  label: string
  body: string
  cta: string
  href: string
}

export const identityLanes: IdentityLane[] = [
  {
    label: "Builder",
    body: "Full-stack engineer and creative technologist — ships production AI tools, community platforms, and native apps.",
    cta: "View projects",
    href: "/projects",
  },
  {
    label: "Speaker",
    body: "Microsoft AI Community Conference, PhillyJS, Black Tech Philly panels, community events.",
    cta: "See talks",
    href: "/speaking",
  },
  {
    label: "Writer",
    body: "\u201CThe Bodega Cat Runs the Place\u201D and other stories about building in public.",
    cta: "Read more",
    href: "/writing",
  },
]

// -- Talks (homepage strip + speaking page) ----------------

export interface Talk {
  title: string
  description: string
  date: string // ISO 8601 (e.g. "2026-05-10")
  venue: string
  url?: string
}

export const talks: Talk[] = [
  {
    title: "From Pixels to Meaning: Building an AI Content Pipeline",
    description:
      "On turning unstructured creative content into something a machine can actually reason about.",
    date: "2026-06-26",
    venue: "Microsoft AI Community Conference, New York, NY",
    url: "https://www.communitydays.org/event/2026-06-26/ai-community-conference-new-york#sessions",
  },
]

export function getNextTalk(): Talk | null {
  const now = Date.now()
  return (
    talks.find((t) => new Date(t.date).getTime() > now) ?? null
  )
}
