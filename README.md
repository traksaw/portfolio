# Waskar Paulino -- Personal Portfolio

A multi-purpose personal site for hiring managers, conference organizers, and readers/followers. Built with Next.js 15, React 19, and Tailwind v4.

Live: [waskarpaulino.com](https://waskarpaulino.com)

---

## Pages

| Route | Purpose | Status |
|-------|---------|--------|
| `/` | Hero, about preview, featured projects | In progress |
| `/projects` | Full project showcase | Placeholder |
| `/speaking` | Talk list, abstracts, booking CTA | Planned |
| `/writing` | Substack/Medium feed or curated links | Planned |
| `/about` | Full story (bodega to DJ to engineer to CTO) | Placeholder |
| `/contact` | Speaking inquiries and general contact | Placeholder |

## Tech Stack

- **Framework**: Next.js 15 (App Router, Turbopack)
- **UI**: React 19, Tailwind v4
- **Fonts**: DM Sans (body), Instrument Serif (headings)
- **Design system**: Semantic `th-*` CSS custom properties with automatic light/dark mode via `prefers-color-scheme`

## Project Structure

```
app/
  layout.tsx          Root layout (fonts, nav, footer)
  globals.css         Design tokens and global styles
  page.tsx            Homepage
  about/page.tsx
  contact/page.tsx
  projects/page.tsx

components/
  ui/                 Reusable UI primitives
    Badge.tsx         Tag/pill component
    ButtonLink.tsx    Link styled as button (primary/secondary/ghost)
    Section.tsx       Section wrapper with optional border
    SectionHeading.tsx  Serif heading for sections
  Hero.tsx            Homepage hero section
  AboutPreview.tsx    Homepage about teaser
  ProjectCard.tsx     Individual project card
  ProjectGrid.tsx     Project card grid
  Navbar.tsx          Sticky nav with mobile menu
  Footer.tsx          Site footer with social links

docs/
  PORTFOLIO-REBUILD-PLAN.md   Full rebuild plan and roadmap

public/
  headshot.jpg        Professional headshot (add manually)
```

## Design Tokens

The site uses semantic color tokens defined in `globals.css` that switch automatically between light and dark mode. All tokens use the `th-` prefix to avoid collisions with Tailwind built-in utilities.

Key tokens: `th-surface`, `th-heading`, `th-body`, `th-muted`, `th-btn`, `th-accent`, `th-line`.

See `app/globals.css` for the full token list and values.

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server (Turbopack) |
| `pnpm build` | Production build |
| `pnpm start` | Serve production build |
| `pnpm lint` | Run ESLint |
