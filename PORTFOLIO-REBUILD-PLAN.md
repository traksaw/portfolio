# Portfolio Site Rebuild Plan

> Goal: Transform waskarmiguelpaulino.netlify.app into a multi-purpose site that serves hiring managers, conference organizers, and readers/followers.
> Stack: Next.js 15 + React 19 + Tailwind v4 (already in place)
> Timeline: ~1 week, broken into independent sessions

---

## Site Architecture

```
/                  -> Hero + 3 identity cards (Builder, Speaker, Writer)
/projects          -> Full project showcase
/speaking          -> Talk list, abstracts, upcoming events, booking CTA
/writing           -> Substack/Medium feed or curated links
/about             -> Full story (bodega -> DJ -> engineer -> CTO)
/contact           -> Speaking inquiries + general contact
```

---

## Phase 1: Foundation (Session 1, ~1 hour)

Update the site skeleton — navigation, layout, footer, global styles.

### 1.1 Update Navbar

Current: `Waskar.dev | Projects | About | Contact`

New: `Waskar Paulino | Projects | Speaking | Writing | About | Contact`

- Keep sticky header
- Add "Speaking" and "Writing" nav links
- Update brand text from "Waskar.dev" to "Waskar Paulino" (or keep .dev if you prefer)
- Mobile hamburger menu should include all links

### 1.2 Update Footer

Current: "People Overly Prepared" + HTML5 UP credit (leftover from old template — this is the Netlify version, not the Next.js version)

New footer for the Next.js site:
- Your name + tagline: "Don't just build tools. Build something you'd want to play with."
- Social links: GitHub, LinkedIn, Substack, Twitter/X, Instagram, Bluesky
- "Book me to speak" CTA link -> /contact
- Copyright line

### 1.3 Color & Typography Refresh

Current: Blue (#1D4ED8) + Amber (#F59E0B) on white

Recommendation: Keep the current palette OR shift to a dark theme matching your PhillyJS deck and Substack cover aesthetic. Dark themes feel more "creative technologist" and less "dev portfolio template."

Decision to make:
- **Option A**: Keep light theme, just refine
- **Option B**: Dark theme (dark gray/near-black background, white text, accent color)
- **Option C**: Support both with a toggle

---

## Phase 2: Homepage (Session 2, ~1-2 hours)

The homepage is the most important page. A visitor should understand who you are in 5 seconds.

### 2.1 Hero Section

Current: "Hey, I'm Waskar" + bio paragraph

New hero structure:
```
[Your photo]

Waskar Paulino
CTO & Co-Founder, Ideate | Speaker | DJ

[One sentence]: I build AI tools for creative teams, write about the
messy middle of founding a startup, and DJ on the weekends.

[Two CTAs]:
  [See my talks ->]  [Read my writing ->]
```

Design notes:
- Photo should be the same headshot from LinkedIn (professional but warm)
- Keep the wave emoji if it feels like you, drop it if you want more gravitas
- CTAs should link to /speaking and /writing

### 2.2 Three Identity Cards

Below the hero, three cards that represent your three lanes:

```
+------------------+  +------------------+  +------------------+
|   BUILDER        |  |   SPEAKER        |  |   WRITER         |
|                  |  |                  |  |                  |
|  CTO of Ideate.  |  |  PhillyJS,       |  |  "The Bodega Cat |
|  AI-powered      |  |  Black Tech      |  |   Runs the       |
|  creative        |  |  Philly panels,  |  |   Place" and     |
|  workspace for   |  |  community       |  |   other stories  |
|  design teams.   |  |  events.         |  |   about building |
|                  |  |                  |  |   in public.     |
|  [View projects] |  |  [See talks ->]  |  |  [Read more ->]  |
+------------------+  +------------------+  +------------------+
```

### 2.3 Featured Content Strip

Below the cards, a "Latest" section with 2-3 items:
- Most recent Substack post (title + date + link)
- Next upcoming speaking event (if any)
- Most recent project update

This keeps the homepage fresh without requiring a full rebuild each time.

---

## Phase 3: Projects Page (Session 3, ~1-2 hours)

### 3.1 Project Data

Move project data into a structured array so it's easy to add new ones:

```typescript
const projects = [
  {
    title: "Ideate",
    description: "AI-enhanced creative workspace for design teams",
    role: "CTO & Co-Founder",
    stack: ["TanStack Start", "Convex", "Clerk", "Gemini AI", "Tailwind v4"],
    links: { live: "https://ideate.app", /* or whatever the URL is */ },
    featured: true,
    image: "/projects/ideate.png"
  },
  {
    title: "DJ Visualizer",
    description: "Real-time audio visualization for live DJ sets",
    role: "Creator",
    stack: ["JavaScript", "Web Audio API", "p5.js", "Pioneer DDJ-REV1"],
    links: {
      live: "https://your-visualizer-url.netlify.app",
      code: "https://github.com/traksaw/jsDJVisualizer"
    },
    talk: "PhillyJS, September 2025",
    featured: true,
    image: "/projects/dj-visualizer.png"
  },
  {
    title: "Back Against the Wall",
    description: "Interactive film experience with reflection prompts and resources",
    role: "Full-stack developer",
    stack: ["MongoDB", "Express", "Node.js", "React", "Cloudinary"],
    links: {
      live: "https://backagainstthewall.vercel.app",
      code: "https://github.com/traksaw/backAgainstTheWall"
    },
    featured: false,
    image: "/projects/batw.png"
  },
  {
    title: "hit.it",
    description: "Audio collaboration app with BPM and key detection",
    role: "Creator",
    stack: ["MongoDB", "Express", "Node.js", "React", "Cloudinary"],
    links: {
      live: "https://hit-it.netlify.app",
      code: "https://github.com/traksaw/hit-it"
    },
    featured: false,
    image: "/projects/hitit.png"
  },
  {
    title: "Purity in B/W",
    description: "Minimalist photography portfolio for KarMi",
    role: "Developer",
    stack: ["HTML5", "CSS3", "JavaScript"],
    links: {
      live: "https://puritybykarmi.netlify.app",
      code: "https://github.com/traksaw/KarMi"
    },
    featured: false,
    image: "/projects/purity.png"
  }
]
```

### 3.2 Project Cards

Each card shows:
- Screenshot/image
- Title + one-line description
- Your role
- Tech stack as tags/pills
- Links (live site, code, talk recording if applicable)
- Featured projects get a larger card or top placement

### 3.3 Layout

- Featured projects (Ideate, DJ Visualizer) at the top, larger cards
- Other projects below in a 2-column grid
- Each card links to live site (not a separate detail page — keep it simple)

---

## Phase 4: Speaking Page (Session 4, ~1-2 hours)

This is the page conference organizers will land on. It needs to do one job: make them want to book you.

### 4.1 Speaker Bio

Short version (the one from your talk drafts):

> Waskar Paulino is the CTO and co-founder of Ideate, an AI-enhanced creative workspace
> for design teams. He's a first-generation AfroLatinx technologist, DJ, multidisciplinary
> artist, and founder of Philacon Valley. He previously spoke at PhillyJS about building
> real-time audio visualizers with JavaScript and a Pioneer DDJ-REV1. He believes the best
> software is built by people who make things outside of software.

### 4.2 Talks Section

List each talk with:
- Title
- Short abstract (75-word version)
- Available formats (keynote, panel, lightning, workshop)
- Tags (e.g., "AI", "Leadership", "Creative Coding", "Founder")

Talks to list:
1. "Drop the Code: Real-Time Audio Visuals with JavaScript" — DELIVERED, PhillyJS Sept 2025
2. "Code as a Canvas: What DJing Taught Me About Building Software" — AVAILABLE
3. "The Wrong Number: What Happens When Your CTO Guesses Confidently" — AVAILABLE
4. "The Deli Line Problem" — COMING SOON (grayed out or marked as in development)

### 4.3 Upcoming / Past Events

A simple timeline or list:
- PhillyJS — September 2025 (delivered)
- Black Tech Philly Town Hall — April/May 2026 (upcoming, once confirmed)
- Add more as they happen

### 4.4 Booking CTA

> Interested in having me speak at your event?
> I'm available for conference talks, panels, workshops, and podcast guest appearances.
>
> [Get in touch ->] (links to /contact with "speaking inquiry" pre-selected)

### 4.5 Speaker Reel (future)

Leave space for a video embed. Once you have a recorded talk, this goes here. For now, skip it or put a placeholder: "Speaker reel coming soon."

---

## Phase 5: Writing Page (Session 5, ~45 min)

### 5.1 Approach

Two options:
- **Static links**: Manually list your posts with title, date, and link to Substack/Medium. Simple, requires manual updates.
- **Substack RSS feed**: Fetch from `https://raksaw.substack.com/feed` and render automatically. More work upfront, zero maintenance after.

Recommendation: Start with static links. Add RSS later if you're publishing frequently enough to justify it.

### 5.2 Content

```
WRITING

I write about what it's actually like to build a startup when you're
still figuring it out. Subscribe on Substack or follow on Medium.

[Subscribe on Substack ->]

---

The Bodega Cat Runs the Place              Apr 5, 2026  [Read ->]
Plot Holes and Potholes                    Mar 23, 2026 [Read ->]
Between Commits: Hello World               Dec 12, 2025 [Read ->]
```

### 5.3 Cross-posting note

Add a small line: "Also published on Medium" with a link to your Medium profile.

---

## Phase 6: About Page (Session 6, ~1 hour)

### 6.1 The Arc

The current about page talks about Apple Genius -> coding -> community. That's fine but it's missing the creative thread. Restructure around the arc:

```
THE SHORT VERSION:
I'm a CTO, DJ, and artist building AI tools for creative teams.

THE LONGER VERSION:
[Bodega -> burning CDs -> creating beats -> Apple Genius ->
coding bootcamp -> Resilient Coders -> software engineer ->
PhilaCon Valley -> Ideate -> CTO]

Each section is 2-3 sentences max. The story should feel like a
timeline of someone following their curiosity, not a resume.
```

### 6.2 Sections

1. **Origin** — First-gen Dominican-American, parents' bodega, growing up in Philly
2. **Music** — DJing, making beats, the creative thread
3. **Tech** — Apple, discovering code, the transition
4. **Community** — PhilaCon Valley, Resilient Coders, mentoring, hackathon coaching
5. **Now** — CTO of Ideate, building in public, speaking, writing

### 6.3 Personal touches

- Include a photo from a DJ set or art piece (not just a headshot)
- "Currently" section: what you're working on, reading, listening to
- Languages: English, Spanish (native bilingual), Arabic (working proficiency) — this is a differentiator, show it

---

## Phase 7: Contact Page (Session 7, ~30 min)

### 7.1 Structure

```
GET IN TOUCH

Speaking inquiries:
I'm available for conference talks, panels, workshops, fireside chats,
and podcast guest appearances. Topics: AI, creative coding, startup
leadership, building in public.
[Email: workwithwaskar@gmail.com]

General:
For everything else — collaborations, projects, or just to say hey.
[Email: workwithwaskar@gmail.com]

FIND ME ELSEWHERE:
LinkedIn | GitHub | Substack | Medium | Twitter/X | Instagram | Bluesky
```

### 7.2 Optional: Contact form

If you want a form instead of raw email links, use Formspree or Netlify Forms (free). Include a dropdown: "What's this about?" with options: Speaking, Project, Job Opportunity, Other.

---

## Phase 8: Deploy & Polish (Session 8, ~30 min)

### 8.1 Domain

Current: waskarmiguelpaulino.netlify.app

Consider buying a short domain:
- waskarpaulino.com
- waskar.dev
- raksaw.dev (matches your Substack handle)

Point it to your Netlify deploy. A custom domain is a small investment that makes a big difference in credibility.

### 8.2 SEO basics

- Page titles: "Waskar Paulino — [Page Name]"
- Meta description: Use your Substack bio
- OG image: Your headshot or a branded card with your name + tagline
- Favicon: Something simple, maybe your initials

### 8.3 Analytics

- Add Plausible or Umami (privacy-friendly, free tiers) to track page views
- Useful for knowing if conference organizers are actually visiting /speaking

### 8.4 Final checklist

```
- All pages render correctly on mobile
- All external links open in new tab
- Social links are correct and up to date
- Speaker bio matches LinkedIn and Substack
- Contact email is correct
- No broken images
- Lighthouse score > 90 on performance
```

---

## Build Order (Recommended)

| Session | Phase | Time | Priority |
|---------|-------|------|----------|
| 1 | Phase 1: Foundation (nav, footer, styles) | 1 hr | Do first |
| 2 | Phase 2: Homepage (hero, cards) | 1-2 hr | Do second |
| 3 | Phase 4: Speaking page | 1-2 hr | High — needed for CFPs |
| 4 | Phase 3: Projects page | 1-2 hr | Medium |
| 5 | Phase 6: About page | 1 hr | Medium |
| 6 | Phase 5: Writing page | 45 min | Lower |
| 7 | Phase 7: Contact page | 30 min | Lower |
| 8 | Phase 8: Deploy & polish | 30 min | Do last |

Total: ~8-10 hours across the week. Sessions 1-3 are the highest impact.

---

## Content You'll Need to Gather

Before building, collect these assets:

```
IMAGES:
- [ ] Professional headshot (same as LinkedIn)
- [ ] Photo from a DJ set or performance
- [ ] Photo of your art / creative work
- [ ] Screenshots of each project (Ideate, DJ Visualizer, BATW, hit.it, Purity)
- [ ] PhillyJS talk photo (if you have one)

TEXT:
- [ ] Speaker bio (drafted — in ~/Desktop/Personal/speaking/)
- [ ] Talk abstracts (drafted — in ~/Desktop/Personal/speaking/)
- [ ] Updated about page narrative
- [ ] Project descriptions (use the data structure from Phase 3)

LINKS:
- [ ] All social profiles (LinkedIn, GitHub, Substack, Medium, Twitter/X, Instagram, Bluesky)
- [ ] All project live sites and repos
- [ ] Ideate product URL
- [ ] PhilaCon Valley URL (if exists)
```

---

## Phase 9: Design Polish & Interactions (Inspiration-driven)

Insights sourced from top designer portfolio analysis (Rachel How, Adrian Zumbrunnen, Jordan Gilroy, Daniel Gamble, Olha Uzhykova, Shabnam Kashani, Constance S, Michal Malewicz).

### 9.0 Animation Tech Stack

Complement existing Next.js 15 + React 19 + Tailwind v4 with:

| Library | Purpose | Install |
|---------|---------|---------|
| **Framer Motion** | Scroll-triggered reveals, staggered children, hover animations, page transitions, layout animations | `pnpm add framer-motion` |
| **GSAP + ScrollTrigger** | Character-level text animation, timeline sequences, progress-based scroll animations, batch reveals | `pnpm add gsap @gsap/react` |
| **Lenis** | Buttery smooth scroll with configurable lerp/duration, GSAP integration | `pnpm add lenis` |
| **React Three Fiber** | Declarative 3D scenes in React — hero backgrounds, particle fields, interactive geometry | `pnpm add @react-three/fiber three` |
| **Drei** | R3F helpers — Float, Stars, Sparkles, ScrollControls, MeshDistortMaterial, Text3D | `pnpm add @react-three/drei` |

**Framer Motion** — best for:
- `whileInView` scroll reveals with `viewport={{ once: true }}`
- Staggered children via `variants` with `staggerChildren: 0.1`
- `whileHover` / `whileTap` micro-interactions
- `layoutId` shared element transitions between pages
- `AnimatePresence` for page exit animations

**GSAP** — best for:
- Character-level text splitting + stagger (`SplitText` or manual)
- Complex timelines with `gsap.timeline()` and precise positioning (`"-=0.3"`)
- `ScrollTrigger.batch()` for animating groups of elements as they enter viewport
- `gsap.context()` + `useGSAP` hook for React cleanup
- Progress-based scroll animations (`scrub: true`)

**Lenis** — best for:
- Smooth scroll wrapper via `<ReactLenis root />` in layout
- `useLenis` hook for scroll callbacks
- GSAP ticker integration (`autoRaf: false` + `gsap.ticker.add`)
- Config: `lerp: 0.1`, `wheelMultiplier: 0.7`, `duration: 1.2`

**React Three Fiber + Drei** — best for:
- `<Canvas>` with dynamic import (`next/dynamic`, `ssr: false`) to avoid SSR issues
- `useFrame` render loop for continuous animation (rotation, wave, pulse)
- `<Float>` wrapper for gentle floating motion on 3D elements
- `<Sparkles>` / `<Stars>` for ambient particle backgrounds
- `<MeshDistortMaterial>` / `<MeshWobbleMaterial>` for organic, living geometry
- `<ScrollControls>` + `useScroll` for scroll-synced 3D scenes (`scroll.offset`, `scroll.range()`, `scroll.curve()`)
- `frameloop="demand"` for performance when scene is mostly static
- Mouse interaction via `onPointerOver` / `onPointerOut` on meshes

### 9.1 Three.js / 3D Elements

Ideas for tasteful 3D integration (pick 1-2, don't overdo):

- [ ] **Particle field hero** — ambient floating particles (`<Stars>` or `<Sparkles>`) behind hero text, subtle mouse parallax via `useFrame` + pointer state
- [ ] **Distort sphere** — `<MeshDistortMaterial distort={0.4} speed={2}>` organic blob that reacts to mouse, sits beside hero text or as background element
- [ ] **Floating geometry** — `<Float speed={2} rotationIntensity={1}>` on abstract shapes (torus, icosahedron) as section accents
- [ ] **Scroll-synced 3D** — `<ScrollControls pages={3}>` + `useScroll` to rotate/transform geometry as user scrolls through homepage sections
- [ ] **3D turntable/waveform** — DJ-themed element: vinyl record or audio waveform mesh that responds to scroll position — on-brand for your creative identity
- [ ] **Wobble cards** — `<MeshWobbleMaterial>` on project card backgrounds for liquid/organic feel on hover
- [ ] **3D text** — `<Text3D>` for hero name or section headers with depth and lighting

Implementation notes:
- Always wrap `<Canvas>` in `next/dynamic(() => import(...), { ssr: false })` — Three.js needs browser APIs
- Use `frameloop="demand"` when scene is static to save battery/GPU
- Keep triangle count low — portfolio should load fast, not flex on GPU
- Consider `<Suspense fallback={null}>` around 3D scenes for graceful loading
- Test on mobile — disable or simplify 3D on `< 768px` if performance suffers

### 9.2 Micro-Interactions

- [ ] **Hover lift on cards** — `hover:-translate-y-1 hover:shadow-lg transition-all duration-300` (Rachel How, Olha)
- [ ] **Image overlay on hover** — `group` parent + `opacity-0 group-hover:opacity-100` dark overlay revealing title + description (Olha)
- [ ] **Typing/reveal animation** — CSS typed-cursor effect on hero tagline (Rachel How)
- [ ] **Confetti easter egg** — canvas particle burst on memoji or name click — fits DJ/creative brand (Rachel How)
- [ ] **Wobble on hover** — subtle rotation keyframe (0 to 5deg) on interactive elements (Rachel How)
- [ ] **Frosted glass cards** — `backdrop-blur-[20px] saturate-[180%]` on card components (Rachel How)
- [ ] **Staggered animations** — Framer Motion `variants` with `staggerChildren: 0.1` for section reveals
- [ ] **Custom cursor** — subtle cursor changes on interactive elements (pointer glow, scale)
- [ ] **Scroll-triggered animations** — Framer Motion `whileInView` or GSAP `ScrollTrigger.batch()` for element reveals
- [ ] **Character-level text animation** — GSAP text split with 0.2s stagger on hero heading (Jordan Gilroy)
- [ ] **Hover text swap** — `yPercent: -100 / 100` character displacement on links (Jordan Gilroy)

### 9.3 Layout & Structure

- [ ] **Image-first project cards** — screenshot as primary visual, text secondary (Adrian, Olha)
- [ ] **Horizontal scroll** for project showcases (alternative to grid layout)
- [ ] **Generous whitespace** — bump section padding to `py-16` or `py-20` between major sections (Adrian Zumbrunnen)
- [ ] **Testimonial/quote strip** — pull quotes from event organizers on Speaking page (Olha)
- [ ] **Service/identity cards** — grid with consistent formatting, icon + description + CTA (Olha)
- [ ] **Numbered project cards** — `[01]` through `[06]` with service tags for structure (Jordan Gilroy)
- [ ] **Marquee text loop** — infinite horizontal scroll of keywords/skills, pauses on hover (Daniel Gamble)

### 9.4 Typography & Personality

- [ ] **Mixed font stack** — pair `Instrument Serif` with a mono font for code/tech sections (Rachel How)
- [ ] **Lowercase casual intro** — personality through case and punctuation, e.g. "hi. i'm waskar." (Adrian Zumbrunnen)
- [ ] **Punctuation as emphasis** — use punctuation/structure for impact instead of color (Olha)
- [ ] **Typography-first design** — bolder, more generous sizing throughout
- [ ] **Project tags** — make `techStack` pills more visual (colored, rounded badges)
- [ ] **Fluid typography** — `clamp()` for seamless scaling without breakpoint jumps (Jordan Gilroy)
- [ ] **Vertical text** — `writing-mode: vertical-rl` for section labels or service titles (Daniel Gamble)

### 9.5 Page Experience

- [ ] **Smooth scroll** — Lenis `<ReactLenis root />` in layout with `lerp: 0.1` for buttery feel
- [ ] **Page transitions** — Framer Motion `AnimatePresence` + `layoutId` for shared element transitions between routes
- [ ] **Orchestrated loading** — two-layer overlay reveal on first visit, fast version on return via `sessionStorage` (Daniel Gamble)
- [ ] **Scroll-synced nav** — active nav link background animates based on scroll position (Jordan Gilroy)
- [ ] **Live local time** — show current time in footer or header, refreshes every 60s (Daniel Gamble)

### 9.6 Content & Authenticity

- [ ] **Live project links + case studies** — prioritize working demos over descriptions
- [ ] **Personal touches** — integrate interests (currently listening to, reading, DJ sets) for authenticity
- [ ] **Easter egg** — confetti burst or wobble on memoji/name — fits "DJ + creative" brand
- [ ] **Cross-link related work** — link related projects at end of case studies (Shabnam Kashani)
- [ ] **Text-only project list** — radical simplicity option: just project names as links, let client names sell (Shabnam Kashani)
- [ ] **First visit vs return** — different animation pacing based on `sessionStorage('visited')` (Daniel Gamble)

### 9.7 Already Nailed

- Extreme minimalism with stone+amber design system ✓
- Frosted glass nav with `backdrop-blur-xl` on scroll ✓
- Minimal color palette (2-3 colors + strategic accents) ✓
- Dark theme matching creative technologist aesthetic ✓
- Social icons with hover lift + amber glow ✓

---

*Created: 2026-04-05*
