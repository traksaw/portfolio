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

// -- Projects (homepage grid + hero constellation) ---------

export interface Project {
  title: string
  description: string
  techStack: string[]
  liveLink?: string
  githubLink?: string
  imageUrl?: string
  imageAlt?: string
}

export const projects: Project[] = [
  {
    title: "Back Against the Wall",
    description:
      "An interactive short-film experience that helps users discover their financial archetype through narrative-driven decision making.",
    techStack: ["Next.js", "TypeScript", "CSS Modules"],
    liveLink: "https://backagainstthewall.vercel.app/",
    githubLink: "https://github.com/traksaw/backAgainstTheWall",
    imageUrl: "/projects/back-against-the-wall/quiz-experience.png",
    imageAlt: "Back Against the Wall quiz experience",
  },
  {
    title: "riffMemo",
    description:
      "A native iOS app that rebuilds Apple's discontinued Music Memos — one-tap recording with automatic tempo and key detection for capturing musical ideas.",
    techStack: ["Swift", "SwiftUI", "AVFoundation", "SwiftData"],
    githubLink: "https://github.com/traksaw/riffMemo",
    imageUrl: "/projects/riffmemo/app-screens.png",
    imageAlt: "riffMemo — recording a take and viewing auto-detected tempo and key",
  },
  {
    title: "DJ Visualizer",
    description:
      "A live-coded, real-time audio visualizer and effects processor for DJs, built with the Web Audio API and p5.js. Performed live at Indy Hall Philadelphia, driving visuals off a Pioneer DDJ-REV1 in front of an audience.",
    techStack: ["JavaScript", "Web Audio API", "p5.js"],
    liveLink: "https://dj-visualizer.netlify.app",
    githubLink: "https://github.com/philaconvalley/djVisualizer",
    imageUrl: "/projects/dj-visualizer/spectrum-bars.png",
    imageAlt: "DJ Visualizer spectrum bars mode reacting to audio",
  },
  {
    title: "Shopping Debate",
    description:
      "Three AI personalities debate your purchase decisions in real time before checkout, streaming token-by-token. Built live in 4 hours with Victor Jackson for CodeTV's Web Dev Challenge S2.E12, sponsored by OpenRouter.",
    techStack: ["Chrome Extension", "OpenRouter", "Webpack", "Streaming AI"],
    githubLink:
      "https://github.com/philaconvalley/shoppingDebateChromeExtension",
    imageUrl: "/projects/shopping-debate/debate-demo.jpg",
    imageAlt: "Shopping Debate live demo at CodeTV's Web Dev Challenge",
  },
  {
    title: "PhilaCon Valley",
    description:
      "A Philadelphia tech community for Black, Brown, LGBTQIA+, and underrepresented technologists — by us, for us. Founded and lead this; named a 2025 Technical.ly REALlist Innovator for it.",
    techStack: ["Astro", "Tailwind CSS", "Alpine.js"],
    liveLink: "https://philaconvalley.com",
    githubLink: "https://github.com/philaconvalley/website",
    imageUrl: "/projects/philacon-valley/homepage.png",
    imageAlt: "PhilaCon Valley homepage",
  },
]
