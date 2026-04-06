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
    body: "CTO of Ideate. AI-powered creative workspace for design teams.",
    cta: "View projects",
    href: "/projects",
  },
  {
    label: "Speaker",
    body: "PhillyJS, Black Tech Philly panels, community events.",
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
