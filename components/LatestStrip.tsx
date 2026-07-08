/* ──────────────────────────────────────────────────────────
 * LatestStrip — async server component
 *
 * Surfaces the most recent writing post, next upcoming talk,
 * and most recently pushed GitHub repo on the homepage.
 * Adaptive layout: 3 items → asymmetric, 2 → equal, 1 → full.
 * Hidden entirely when all data sources fail.
 * ────────────────────────────────────────────────────────── */

import { getWritingPosts, type WritingPost } from "@/lib/writing"
import { getLatestRepo, languageColor, type GitHubRepo } from "@/lib/github"
import { getNextTalk, type Talk } from "@/lib/data"
import { formatDate } from "@/lib/formatDate"

// ── Helpers ──────────────────────────────────────────────

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60_000)
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  return `${days}d ago`
}

function readTime(text: string): string {
  const words = text.split(/\s+/).length
  const mins = Math.max(1, Math.round(words / 200))
  return `${mins} min read`
}

// ── Card wrapper ────────────────────────────────────────

function Card({
  href,
  children,
  className = "",
}: {
  href?: string
  children: React.ReactNode
  className?: string
}) {
  const base =
    "flex flex-col rounded-2xl border border-th-line border-t-[3px] border-t-th-accent bg-th-surface-card p-8 shadow-lg shadow-th-shadow transition-all duration-300 hover:-translate-y-1 hover:border-th-line-hover hover:shadow-xl"

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={`${base} ${className}`}>
        {children}
      </a>
    )
  }
  return <div className={`${base} ${className}`}>{children}</div>
}

// ── Individual cards ────────────────────────────────────

function WritingCard({ post }: { post: WritingPost }) {
  const platform = post.source === "substack" ? "Substack" : "Medium"
  return (
    <Card href={post.url}>
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-th-muted">
        NEW POST
      </span>
      <h3 className="mt-3 text-lg font-bold text-th-heading">{post.title}</h3>
      {post.summary && (
        <p className="mt-2 flex-1 text-sm leading-relaxed text-th-body">
          {post.summary}
        </p>
      )}
      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-th-muted">
        {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
        {post.summary && <span>{readTime(post.summary)}</span>}
        <span>{platform}</span>
      </div>
      <span className="mt-4 text-sm font-semibold text-th-accent">
        Read on {platform} &rarr;
      </span>
    </Card>
  )
}

function CodeCard({ repo }: { repo: GitHubRepo }) {
  return (
    <Card href={repo.url}>
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-th-muted">
        SHIPPED
      </span>
      <h3 className="mt-3 text-lg font-bold text-th-heading">{repo.name}</h3>
      {repo.description && (
        <p className="mt-2 flex-1 text-sm leading-relaxed text-th-body">
          {repo.description}
        </p>
      )}
      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-th-muted">
        <span>{timeAgo(repo.pushedAt)}</span>
        {repo.language && (
          <span className="flex items-center gap-1">
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: languageColor(repo.language) }}
            />
            {repo.language}
          </span>
        )}
        {repo.stars > 0 && <span>{repo.stars} stars</span>}
      </div>
      {repo.lastCommitMessage && (
        <p className="mt-3 border-l-2 border-th-accent pl-3 text-xs italic text-th-muted">
          {repo.lastCommitMessage}
        </p>
      )}
      <span className="mt-4 text-sm font-semibold text-th-accent">
        View on GitHub &rarr;
      </span>
    </Card>
  )
}

function TalkCard({ talk }: { talk: Talk }) {
  return (
    <Card href={talk.url}>
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-th-muted">
        NEXT TALK
      </span>
      <h3 className="mt-3 text-lg font-bold text-th-heading">{talk.title}</h3>
      {talk.description && (
        <p className="mt-2 flex-1 text-sm leading-relaxed text-th-body">
          {talk.description}
        </p>
      )}
      <div className="mt-4 flex items-center gap-3 text-xs text-th-muted">
        <span>{formatDate(talk.date)}</span>
        <span>{talk.venue}</span>
      </div>
      {talk.url && (
        <span className="mt-4 text-sm font-semibold text-th-accent">
          Details &rarr;
        </span>
      )}
    </Card>
  )
}

// ── Main component ──────────────────────────────────────

export async function LatestStrip() {
  const [posts, repo, talk] = await Promise.all([
    getWritingPosts().then((p) => p[0] ?? null).catch(() => null),
    getLatestRepo().catch(() => null),
    Promise.resolve(getNextTalk()),
  ])

  // Build items in display order: writing, talk, code
  const items: React.ReactNode[] = []
  if (posts) items.push(<WritingCard key="writing" post={posts} />)
  if (talk) items.push(<TalkCard key="talk" talk={talk} />)
  if (repo) items.push(<CodeCard key="code" repo={repo} />)

  if (items.length === 0) return null

  // Layout: 3 items → writing 2/3 + (talk + code) 1/3
  //         2 items → equal columns
  //         1 item  → full width
  let gridClass: string
  let wrappedItems: React.ReactNode

  if (items.length === 3) {
    gridClass = "grid gap-6 md:grid-cols-3"
    wrappedItems = (
      <>
        <div className="md:col-span-2">{items[0]}</div>
        <div className="flex flex-col gap-6">
          {items[1]}
          {items[2]}
        </div>
      </>
    )
  } else if (items.length === 2) {
    gridClass = "grid gap-6 md:grid-cols-2"
    wrappedItems = items
  } else {
    gridClass = "grid gap-6"
    wrappedItems = items
  }

  return (
    <section className="py-16">
      <p className="mb-10 text-center text-xs font-semibold uppercase tracking-[0.2em] text-th-accent">
        Latest
      </p>
      <div className={gridClass}>{wrappedItems}</div>
    </section>
  )
}
