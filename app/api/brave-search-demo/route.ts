import { anthropic } from "@ai-sdk/anthropic"
import { generateText } from "ai"
import { NextResponse } from "next/server"

export const runtime = "nodejs"

interface BraveResult {
  title: string
  url: string
  description: string
}

async function braveSearch(query: string, apiKey: string): Promise<BraveResult[]> {
  const url = new URL("https://api.search.brave.com/res/v1/web/search")
  url.searchParams.set("q", query)
  url.searchParams.set("count", "5")

  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
      "X-Subscription-Token": apiKey,
    },
  })

  if (!res.ok) {
    throw new Error(`Brave Search API error: ${res.status} ${res.statusText}`)
  }

  const data = await res.json()
  const results = data?.web?.results ?? []

  return results.map((r: { title: string; url: string; description: string }) => ({
    title: r.title,
    url: r.url,
    description: r.description,
  }))
}

export async function POST(req: Request) {
  const braveKey = process.env.BRAVE_API_KEY
  const anthropicKey = process.env.ANTHROPIC_API_KEY

  if (!braveKey || !anthropicKey) {
    return NextResponse.json(
      {
        error:
          "Demo not configured: set BRAVE_API_KEY and ANTHROPIC_API_KEY in .env.local (see .env.local.example).",
      },
      { status: 500 },
    )
  }

  const { query } = await req.json()
  if (!query || typeof query !== "string" || query.trim().length === 0) {
    return NextResponse.json({ error: "Missing query" }, { status: 400 })
  }

  try {
    const sources = await braveSearch(query, braveKey)

    if (sources.length === 0) {
      return NextResponse.json({
        answer: "No results found for that query — try rephrasing it.",
        sources: [],
      })
    }

    const context = sources
      .map((s, i) => `[${i + 1}] ${s.title}\n${s.description}\nURL: ${s.url}`)
      .join("\n\n")

    const { text } = await generateText({
      model: anthropic("claude-haiku-4-5"),
      system:
        "You answer questions using only the provided search results. Cite sources inline using [1], [2], etc. matching the numbered list. If the results don't contain the answer, say so plainly instead of guessing.",
      prompt: `Question: ${query}\n\nSearch results:\n${context}\n\nAnswer the question, grounded only in the results above, with inline [n] citations.`,
    })

    return NextResponse.json({ answer: text, sources })
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error"
    return NextResponse.json({ error: message }, { status: 502 })
  }
}
