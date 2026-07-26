"use client"

import { useState } from "react"

interface Source {
  title: string
  url: string
  description: string
}

export function BraveSearchDemo() {
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [answer, setAnswer] = useState<string | null>(null)
  const [sources, setSources] = useState<Source[]>([])
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!query.trim() || loading) return

    setLoading(true)
    setError(null)
    setAnswer(null)
    setSources([])

    try {
      const res = await fetch("/api/brave-search-demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? "Something went wrong.")
        return
      }

      setAnswer(data.answer)
      setSources(data.sources ?? [])
    } catch {
      setError("Network error — could not reach the demo API.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask something Brave Search can answer…"
          className="flex-1 rounded-full border border-th-line bg-th-surface px-5 py-3 text-th-body outline-none transition-colors focus:border-th-line-hover"
        />
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="rounded-full bg-th-btn px-6 py-3 text-sm font-semibold text-th-btn-text transition-all hover:bg-th-btn-hover disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Searching…" : "Ask"}
        </button>
      </form>

      {error && (
        <p className="mt-6 rounded-lg border border-th-line bg-th-surface-card p-4 text-sm text-th-muted">
          {error}
        </p>
      )}

      {answer && (
        <div className="mt-8 rounded-xl border border-th-line bg-th-surface-card p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-th-muted">
            Answer
          </h3>
          <p className="mt-3 whitespace-pre-wrap leading-relaxed text-th-body">
            {answer}
          </p>
        </div>
      )}

      {sources.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-th-muted">
            Sources
          </h3>
          <ol className="mt-3 space-y-3">
            {sources.map((s, i) => (
              <li
                key={s.url}
                className="rounded-lg border border-th-line p-4 text-sm"
              >
                <span className="font-semibold text-th-heading">
                  [{i + 1}]{" "}
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-th-line-hover underline-offset-4 hover:decoration-th-accent"
                  >
                    {s.title}
                  </a>
                </span>
                <p className="mt-1 text-th-body">{s.description}</p>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  )
}
