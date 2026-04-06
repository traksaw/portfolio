# Featured Content Strip — Design Spec

## Overview

A "Latest" section on the homepage that surfaces the most recent writing post, next upcoming talk, and most recently updated GitHub repo. Positioned between IdentityCards and AboutPreview. Keeps the homepage fresh without manual updates.

## Layout

**Adaptive asymmetric layout** — the grid shifts based on how many content types are available:

- **3 items (writing + talk + code):** Asymmetric — writing gets a 2/3 hero card on the left, talk and code stack vertically in a 1/3 column on the right.
- **2 items (writing + code, no talk):** Two equal columns, each getting full card treatment.
- **1 item:** Single full-width card.
- **0 items (all fetches fail):** Section hidden entirely.

On mobile, all states collapse to a vertical stack.

## Section Header

Centered "LATEST" label in uppercase, amber accent color (`text-th-accent`), matching the existing section heading pattern used elsewhere on the site.

## Card Design

All cards share:
- `bg-th-surface-card` background, `rounded-2xl`, `border-top: 3px solid th-accent`
- Uppercase category label at top (e.g., "NEW POST", "SHIPPED", "NEXT TALK") in `text-th-muted`, small size, wide letter-spacing
- Title in `text-th-heading`, bold
- Accent-colored CTA link at the bottom (e.g., "Read on Substack →")

### Writing Card
- **Data source:** `getWritingPosts()` from `lib/writing.ts` (existing RSS fetcher, 1-hour revalidation)
- **Fields displayed:** title, summary (truncated), published date, read time estimate, source platform (Substack/Medium), CTA link to original post
- **Read time:** Estimated from summary word count (rough heuristic — RSS feeds don't provide this natively)

### GitHub Card
- **Data source:** GitHub REST API (`/users/traksaw/repos?sort=pushed&per_page=1`)
- **Revalidation:** 1 hour, matching the writing feed cadence
- **Fields displayed:** repo name, description, time since last push ("2d ago"), primary language with color dot, star count, last commit message (italic, border-left quote style), CTA link to repo
- **Filtering:** Exclude forks — only show owned repos
- **Language colors:** Map common languages (TypeScript, JavaScript, Python, etc.) to their GitHub-standard dot colors

### Talk Card (future-ready)
- **Data source:** `talks` array in `lib/data.ts` — manually curated, each entry has: `title`, `description`, `date` (ISO string), `venue`, `url` (optional)
- **Display logic:** Show the next upcoming talk (first entry where `date > now`). If no future talk exists, the card is omitted and the layout adapts.
- **Fields displayed:** talk title, short description, date, venue name, CTA link (if URL provided)

## Data Layer

### New: `lib/github.ts`
- `getLatestRepo()` — fetches most recently pushed non-fork repo for `traksaw`
- Returns: `{ name, description, url, pushedAt, language, stars, lastCommitMessage }`
- Uses `fetch` with `next: { revalidate: 3600 }` and `AbortSignal.timeout(10_000)` (same pattern as `lib/writing.ts`)
- GitHub API is unauthenticated (60 req/hr limit — fine for a portfolio with ISR)

### New: talks data in `lib/data.ts`
- `Talk` interface: `{ title, description, date, venue, url? }`
- `talks: Talk[]` — empty array initially, populated when talks are booked
- `getNextTalk()` helper: returns first talk with `date > Date.now()`, or `null`

### Existing: `lib/writing.ts`
- No changes needed. `getWritingPosts()` already returns sorted posts; the strip takes `[0]` (most recent).

## Component

### `components/LatestStrip.tsx`
- Server component (async) — fetches writing + GitHub data at build/ISR time
- Reads talks from `lib/data.ts` synchronously
- Determines item count and renders the appropriate layout variant
- Each card is a clickable `<a>` wrapping the card content, linking to the source (post URL, repo URL, talk URL)
- No client JavaScript required

## Placement

```
<Hero />
<IdentityCards />
<LatestStrip />     ← new
<AboutPreview />
<ProjectGrid />
```

## Error Handling

- If RSS fetch fails: writing card omitted, layout adapts
- If GitHub fetch fails: code card omitted, layout adapts
- If all fetches fail: entire section hidden (no empty "Latest" heading)
- Errors are silent — no user-facing error states. The homepage just shows fewer items.

## Mobile

All layouts collapse to a single-column vertical stack below `md` breakpoint. Cards maintain their full content but stack top-to-bottom: writing first, then talk (if present), then code.

## No-Emoji Rule

Card labels use plain uppercase text only: "NEW POST", "SHIPPED", "NEXT TALK". No emoji icons anywhere in the strip.
