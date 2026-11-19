import { anthropic } from "@ai-sdk/anthropic"
import { generateText } from "ai"
import { NextResponse } from "next/server"
import { z } from "zod"

export const runtime = "nodejs"

// Caps the cost of one request: Brave bills per query, Anthropic per token.
const MAX_QUERY_LENGTH = 300

// Trust boundary 1: the request body comes from any client on the internet.
const RequestSchema = z.object({
  query: z.string().trim().min(1, "Missing query").max(MAX_QUERY_LENGTH, `Query must be ${MAX_QUERY_LENGTH} characters or fewer`),
})

// Trust boundary 2: the Brave response is external data we do not control.
const BraveResultSchema = z.object({
  title: z.string(),
  url: z.string(),
  description: z.string().default(""),
})

const BraveResponseSchema = z.object({
  web: z.object({ results: z.array(BraveResultSchema) }).optional(),
})

type BraveResult = z.infer<typeof BraveResultSchema>

async function braveSearch(query: string, apiKey: string): Promise<BraveResult[]> {
  const url = new URL("https://api.search.brave.com/res/v1/web/search")
  url.searchParams.set("q", query)
  url.searchParams.set("count", "5")

  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
      "X-Subscription-Token": apiKey,
    },
    signal: AbortSignal.timeout(10_000),
  })

  if (!res.ok) {
    throw new Error(`Brave Search API error: ${res.status} ${res.statusText}`)
  }

  const data = BraveResponseSchema.parse(await res.json())
  return data.web?.results ?? []
}

export async function POST(req: Request) {
  const braveKey = process.env.BRAVE_API_KEY
  const anthropicKey = process.env.ANTHROPIC_API_KEY

  if (!braveKey || !anthropicKey) {
    return NextResponse.json(
      {
        error:
          "Demo not configured: set BRAVE_API_KEY and ANTHROPIC_API_KEY in .env.local (see .env.example).",
      },
      { status: 500 },
    )
  }

  // req.json() throws on a malformed body, so it must not run unguarded.
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Request body must be JSON" }, { status: 400 })
  }

  const parsed = RequestSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid request" },
      { status: 400 },
    )
  }
  const { query } = parsed.data

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
      maxOutputTokens: 800,
      system:
        "You answer questions using only the provided search results. Cite sources inline using [1], [2], etc. matching the numbered list. If the results don't contain the answer, say so plainly instead of guessing.",
      prompt: `Question: ${query}\n\nSearch results:\n${context}\n\nAnswer the question, grounded only in the results above, with inline [n] citations.`,
    })

    return NextResponse.json({ answer: text, sources })
  } catch (err) {
    // Full detail goes to the server log only. Upstream error text can
    // contain API details, so the client gets a generic message.
    console.error("[brave-search-demo]", err)
    return NextResponse.json(
      { error: "The demo could not answer right now. Try again in a minute." },
      { status: 502 },
    )
  }
}
