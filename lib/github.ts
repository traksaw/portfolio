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
