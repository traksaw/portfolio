# RSS Writing Feed — Design Spec

## Problem

The writing page (`app/writing/page.tsx`) is a placeholder. Waskar publishes on Substack (`raksaw.substack.com`) and Medium (`medium.com/@waskar.paulino`), often cross-posting the same article to both. The portfolio should automatically pull and display these posts.

## Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Data source | RSS feeds (no API keys) | Both platforms expose public RSS; zero auth, zero cost |
| Architecture | Server component + ISR | Next.js-native, zero client JS, full SEO |
| Revalidation | 1 hour (`revalidate: 3600`) | Posts update infrequently; hourly is plenty |
| Deduplication | By normalized title, prefer Substack | Substack is owned platform; Medium is syndication |
| XML parsing | Regex extraction, no deps | RSS structure is predictable; avoids adding a dependency |
| Feed failure | `Promise.allSettled` | One feed down doesn't break the page |
| Sorting | Chronological, newest first | Single-author, single-voice; no need to group by source |
| Card content | Title, date, source badge, summary | Summary from RSS description, truncated to ~200 chars |

## Data Shape

```ts
interface WritingPost {
  title: string
  url: string          // link to the article (Substack preferred)
  publishedAt: string  // ISO date string for sorting
  summary: string      // first ~200 chars, HTML stripped
  source: "substack" | "medium"
}
```

## Module: `lib/writing.ts`

Exports one async function: `getWritingPosts(): Promise<WritingPost[]>`

Steps:
1. Fetch `raksaw.substack.com/feed` and `medium.com/feed/@waskar.paulino` in parallel via `Promise.allSettled`
2. Parse each RSS response body with regex to extract `<title>`, `<link>`, `<pubDate>`, `<description>` from each `<item>`
3. Strip HTML tags from description, truncate to ~200 characters at a word boundary
4. Tag each post with its source (`"substack"` or `"medium"`)
5. Deduplicate: normalize titles (lowercase, trim), when duplicate found keep Substack version
6. Sort by `publishedAt` descending
7. Return `WritingPost[]`

Edge cases:
- If a feed fetch fails, its result is an empty array (the other feed still renders)
- If both fail, return `[]` — page shows graceful empty state
- Items missing `<title>` or `<link>` are skipped

## Page: `app/writing/page.tsx`

- Calls `getWritingPosts()` in the server component body
- Sets `export const revalidate = 3600`
- Keeps existing `PageHeader` and Substack/Medium `ButtonLink` CTAs at the top
- Replaces "Posts coming soon" placeholder with post cards
- Empty state: "No posts yet. Check back shortly." (same tone as current placeholder)

### Post card structure

Each post renders as an `<article>` with:
- **Title**: `h3`, linked to `post.url` (opens in new tab), `text-th-heading`
- **Meta row**: formatted date (`Mon DD, YYYY`) + source badge (pill showing "Substack" or "Medium")
- **Summary**: `p` with `text-th-body`, truncated description
- Hover: lift + border color shift (consistent with existing card patterns)
- Staggered entrance animation reusing the existing `identity-card` / `card-rise` keyframes

### Styling

All cards use existing design tokens:
- `bg-th-surface-card`, `border-th-line`, `shadow-th-shadow`
- Source badge uses `bg-th-surface-badge`, `text-th-muted`
- Hover: `hover:-translate-y-1`, `hover:border-th-line-hover`

## Files to Create/Modify

| File | Action |
|------|--------|
| `lib/writing.ts` | Create — RSS fetch, parse, dedup, sort |
| `app/writing/page.tsx` | Modify — call `getWritingPosts()`, render post cards, add `revalidate` |

No new dependencies. No new design tokens. No new CSS needed (reuses `card-rise` animation from `globals.css`).
