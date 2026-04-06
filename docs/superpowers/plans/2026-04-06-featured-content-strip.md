# Featured Content Strip Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a "Latest" section to the homepage that auto-surfaces the most recent writing post, next upcoming talk, and most recently pushed GitHub repo.

**Architecture:** Three data sources (existing RSS fetcher, new GitHub API fetcher, new talks array in data.ts) feed into a single server component (`LatestStrip`) that adapts its grid layout based on how many items are available. No client JS needed.

**Tech Stack:** Next.js 15 (App Router, server components), Tailwind v4 with `th-*` design tokens, GitHub REST API (unauthenticated).

**Verification:** `pnpm lint && pnpm build` (build includes typecheck). No test runner in this project.

---

## File Map

| Action | File | Responsibility |
|--------|------|---------------|
| Create | `lib/github.ts` | Fetch most recently pushed non-fork repo from GitHub API |
| Modify | `lib/data.ts` | Add `Talk` interface, `talks` array, `getNextTalk()` helper |
| Create | `components/LatestStrip.tsx` | Async server component — fetches data, renders adaptive grid |
| Modify | `app/page.tsx` | Import and place `<LatestStrip />` between IdentityCards and AboutPreview |

---

### Task 1: Add talks data structure to `lib/data.ts`

**Files:**
- Modify: `lib/data.ts`

- [ ] **Step 1: Add Talk interface and talks array**

Add to the bottom of `lib/data.ts`:

```ts
// -- Talks (homepage strip + speaking page) ----------------

export interface Talk {
  title: string
  description: string
  date: string // ISO 8601 (e.g. "2026-05-10")
  venue: string
  url?: string
}

export const talks: Talk[] = []

export function getNextTalk(): Talk | null {
  const now = Date.now()
  return (
    talks.find((t) => new Date(t.date).getTime() > now) ?? null
  )
}
```

- [ ] **Step 2: Verify**

Run: `pnpm lint && pnpm build`
Expected: Clean lint, successful build.

- [ ] **Step 3: Commit**

```bash
git add lib/data.ts
git commit -m "feat: add Talk interface and getNextTalk helper to data.ts"
```

---

### Task 2: Create `lib/github.ts` — GitHub repo fetcher

**Files:**
- Create: `lib/github.ts`

- [ ] **Step 1: Create the GitHub fetcher module**

Create `lib/github.ts`:

```ts
/* ----------------------------------------------------------------
 * GitHub repo fetcher for the homepage Latest strip.
 *
 * Fetches the most recently pushed non-fork repo for a given user.
 * Unauthenticated — 60 req/hr, fine with Next.js ISR (1h revalidate).
 * ---------------------------------------------------------------- */

const GITHUB_USER = "traksaw"

export interface GitHubRepo {
  name: string
  description: string
  url: string
  pushedAt: string
  language: string
  stars: number
  lastCommitMessage: string
}

// GitHub language → dot color (matches github.com)
const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572a5",
  Go: "#00add8",
  Rust: "#dea584",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
}

export function languageColor(lang: string): string {
  return LANGUAGE_COLORS[lang] ?? "#78716c"
}

export async function getLatestRepo(): Promise<GitHubRepo | null> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?sort=pushed&per_page=5&type=owner`,
      {
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(10_000),
        headers: { Accept: "application/vnd.github.v3+json" },
      }
    )
    if (!res.ok) return null

    const repos: Array<{
      fork: boolean
      name: string
      description: string | null
      html_url: string
      pushed_at: string
      language: string | null
      stargazers_count: number
    }> = await res.json()

    const repo = repos.find((r) => !r.fork)
    if (!repo) return null

    // Fetch latest commit message
    let lastCommitMessage = ""
    try {
      const commitsRes = await fetch(
        `https://api.github.com/repos/${GITHUB_USER}/${repo.name}/commits?per_page=1`,
        {
          next: { revalidate: 3600 },
          signal: AbortSignal.timeout(10_000),
          headers: { Accept: "application/vnd.github.v3+json" },
        }
      )
      if (commitsRes.ok) {
        const commits: Array<{ commit: { message: string } }> =
          await commitsRes.json()
        if (commits[0]) {
          // Take first line only
          lastCommitMessage = commits[0].commit.message.split("\n")[0]
        }
      }
    } catch {
      // Non-critical — proceed without commit message
    }

    return {
      name: repo.name,
      description: repo.description ?? "",
      url: repo.html_url,
      pushedAt: repo.pushed_at,
      language: repo.language ?? "",
      stars: repo.stargazers_count,
      lastCommitMessage,
    }
  } catch {
    return null
  }
}
```

- [ ] **Step 2: Verify**

Run: `pnpm lint && pnpm build`
Expected: Clean lint, successful build.

- [ ] **Step 3: Commit**

```bash
git add lib/github.ts
git commit -m "feat: add GitHub repo fetcher for homepage Latest strip"
```

---

### Task 3: Create `components/LatestStrip.tsx` — the strip component

**Files:**
- Create: `components/LatestStrip.tsx`

- [ ] **Step 1: Create the LatestStrip server component**

Create `components/LatestStrip.tsx`:

```tsx
import { getWritingPosts } from "@/lib/writing"
import { getLatestRepo, languageColor } from "@/lib/github"
import { getNextTalk } from "@/lib/data"

// -- Helpers ------------------------------------------------

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const days = Math.floor(diff / 86_400_000)
  if (days < 1) return "today"
  if (days === 1) return "1d ago"
  if (days < 30) return `${days}d ago`
  const months = Math.floor(days / 30)
  return months === 1 ? "1mo ago" : `${months}mo ago`
}

function estimateReadTime(summary: string): string {
  // Rough heuristic: ~200 wpm, summary is ~200 chars truncated
  // Blog posts are typically 4-8 min; estimate from summary word density
  const words = summary.split(/\s+/).length
  const minutes = Math.max(3, Math.round(words / 40 * 5))
  return `${minutes} min read`
}

// -- Sub-components -----------------------------------------

function WritingCard({ title, summary, publishedAt, source, url, hero }: {
  title: string
  summary: string
  publishedAt: string
  source: string
  url: string
  hero: boolean
}) {
  const sourceLabel = source === "substack" ? "Substack" : "Medium"
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex flex-col rounded-2xl border border-th-line border-t-2 border-t-th-accent bg-th-surface-card p-6 shadow-lg shadow-th-shadow transition-all duration-300 hover:-translate-y-1 hover:border-th-line-hover hover:shadow-xl sm:p-8 ${hero ? "md:col-span-2" : ""}`}
    >
      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-th-muted">
        New Post
      </span>
      <h3 className={`mt-3 font-bold text-th-heading ${hero ? "text-lg sm:text-xl" : "text-base sm:text-lg"}`}>
        {title}
      </h3>
      {summary && (
        <p className="mt-2 text-sm leading-relaxed text-th-body">
          {summary}
        </p>
      )}
      <div className="mt-3 flex flex-wrap items-center gap-1.5 text-[11px] text-th-muted">
        {publishedAt && <span>{formatDate(publishedAt)}</span>}
        {publishedAt && <span>·</span>}
        <span>{estimateReadTime(summary)}</span>
        <span>·</span>
        <span>{sourceLabel}</span>
      </div>
      <span className="mt-4 text-xs font-medium text-th-accent">
        Read on {sourceLabel} →
      </span>
    </a>
  )
}

function TalkCard({ title, description, date, venue, url }: {
  title: string
  description: string
  date: string
  venue: string
  url?: string
}) {
  const Wrapper = url ? "a" : "div"
  const linkProps = url
    ? { href: url, target: "_blank" as const, rel: "noopener noreferrer" }
    : {}
  return (
    <Wrapper
      {...linkProps}
      className="group flex flex-col rounded-2xl border border-th-line bg-th-surface-card p-6 shadow-lg shadow-th-shadow transition-all duration-300 hover:-translate-y-1 hover:border-th-line-hover hover:shadow-xl"
    >
      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-th-muted">
        Next Talk
      </span>
      <h3 className="mt-3 text-base font-bold text-th-heading">
        {title}
      </h3>
      {description && (
        <p className="mt-2 text-sm leading-relaxed text-th-body">
          {description}
        </p>
      )}
      <div className="mt-3 flex flex-wrap items-center gap-1.5 text-[11px] text-th-muted">
        <span>{formatDate(date)}</span>
        <span>·</span>
        <span>{venue}</span>
      </div>
      {url && (
        <span className="mt-4 text-xs font-medium text-th-accent">
          Details →
        </span>
      )}
    </Wrapper>
  )
}

function RepoCard({ name, description, pushedAt, language, stars, lastCommitMessage, url }: {
  name: string
  description: string
  pushedAt: string
  language: string
  stars: number
  lastCommitMessage: string
  url: string
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-2xl border border-th-line bg-th-surface-card p-6 shadow-lg shadow-th-shadow transition-all duration-300 hover:-translate-y-1 hover:border-th-line-hover hover:shadow-xl"
    >
      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-th-muted">
        Shipped
      </span>
      <h3 className="mt-3 text-base font-bold text-th-heading">
        {name}
      </h3>
      {description && (
        <p className="mt-2 text-sm leading-relaxed text-th-body">
          {description}
        </p>
      )}
      <div className="mt-3 flex flex-wrap items-center gap-1.5 text-[11px] text-th-muted">
        <span>{timeAgo(pushedAt)}</span>
        {language && (
          <>
            <span>·</span>
            <span className="inline-flex items-center gap-1">
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ backgroundColor: languageColor(language) }}
              />
              {language}
            </span>
          </>
        )}
        {stars > 0 && (
          <>
            <span>·</span>
            <span>&#9733; {stars}</span>
          </>
        )}
      </div>
      {lastCommitMessage && (
        <p className="mt-3 border-l-2 border-th-line pl-2 text-xs italic text-th-muted">
          &ldquo;{lastCommitMessage}&rdquo;
        </p>
      )}
      <span className="mt-4 text-xs font-medium text-th-accent">
        View on GitHub →
      </span>
    </a>
  )
}

// -- Main component -----------------------------------------

export async function LatestStrip() {
  const [posts, repo, talk] = await Promise.all([
    getWritingPosts().then((p) => p[0] ?? null),
    getLatestRepo(),
    Promise.resolve(getNextTalk()),
  ])

  const items = [posts, talk, repo].filter(Boolean)
  if (items.length === 0) return null

  const hasTalk = talk !== null
  // Asymmetric (2/3 + 1/3 side stack) when all 3 present; equal columns otherwise
  const useAsymmetric = hasTalk && posts !== null && repo !== null

  return (
    <section className="pb-20 pt-4">
      <p className="mb-10 text-center text-xs font-semibold uppercase tracking-[0.2em] text-th-accent">
        Latest
      </p>

      {useAsymmetric ? (
        /* -- 3 items: asymmetric layout -- */
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <WritingCard
              title={posts.title}
              summary={posts.summary}
              publishedAt={posts.publishedAt}
              source={posts.source}
              url={posts.url}
              hero
            />
          </div>
          <div className="flex flex-col gap-6">
            <TalkCard
              title={talk.title}
              description={talk.description}
              date={talk.date}
              venue={talk.venue}
              url={talk.url}
            />
            <RepoCard
              name={repo.name}
              description={repo.description}
              pushedAt={repo.pushedAt}
              language={repo.language}
              stars={repo.stars}
              lastCommitMessage={repo.lastCommitMessage}
              url={repo.url}
            />
          </div>
        </div>
      ) : (
        /* -- 1-2 items: equal columns -- */
        <div className={`grid gap-6 ${items.length > 1 ? "md:grid-cols-2" : "md:grid-cols-1"}`}>
          {posts && (
            <WritingCard
              title={posts.title}
              summary={posts.summary}
              publishedAt={posts.publishedAt}
              source={posts.source}
              url={posts.url}
              hero={items.length === 1}
            />
          )}
          {talk && (
            <TalkCard
              title={talk.title}
              description={talk.description}
              date={talk.date}
              venue={talk.venue}
              url={talk.url}
            />
          )}
          {repo && (
            <RepoCard
              name={repo.name}
              description={repo.description}
              pushedAt={repo.pushedAt}
              language={repo.language}
              stars={repo.stars}
              lastCommitMessage={repo.lastCommitMessage}
              url={repo.url}
            />
          )}
        </div>
      )}
    </section>
  )
}
```

- [ ] **Step 2: Verify**

Run: `pnpm lint && pnpm build`
Expected: Clean lint, successful build. (Component is not yet used, but should compile.)

- [ ] **Step 3: Commit**

```bash
git add components/LatestStrip.tsx
git commit -m "feat: add LatestStrip server component with adaptive layout"
```

---

### Task 4: Wire LatestStrip into the homepage

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Add LatestStrip to the homepage**

Replace the full contents of `app/page.tsx` with:

```tsx
/* app/page.tsx */
import { Hero } from "@/components/Hero"
import { IdentityCards } from "@/components/IdentityCards"
import { LatestStrip } from "@/components/LatestStrip"
import { AboutPreview } from "@/components/AboutPreview"
import { ProjectGrid } from "@/components/ProjectGrid"

export const revalidate = 3600

export default function HomePage() {
  return (
    <>
      <Hero />
      <IdentityCards />
      <LatestStrip />
      <AboutPreview />
      <ProjectGrid />
    </>
  )
}
```

Note: `revalidate = 3600` is added because the page now includes async data fetching (RSS + GitHub API). This tells Next.js to regenerate the page at most once per hour.

- [ ] **Step 2: Verify**

Run: `pnpm lint && pnpm build`
Expected: Clean lint, successful build. The homepage route should show revalidation of 1h.

- [ ] **Step 3: Visual check**

Run: `pnpm dev`
Open `http://localhost:3000` and confirm:
- "Latest" label appears between identity cards and about section
- Writing card shows real RSS data (title, summary, date, source)
- GitHub card shows real repo data (name, description, language, stars, commit message)
- No talk card (expected — talks array is empty)
- Two-column equal layout on desktop, stacked on mobile

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "feat: wire LatestStrip into homepage between IdentityCards and AboutPreview"
```
