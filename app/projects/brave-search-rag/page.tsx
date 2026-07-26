import type { Metadata } from "next"

import { PageHeader } from "@/components/ui/PageHeader"

import { BraveSearchDemo } from "./BraveSearchDemo"

export const metadata: Metadata = {
  title: "Brave Search RAG Demo",
  description:
    "A small retrieval-augmented-generation demo: Brave Search API results, grounded through Claude via the Vercel AI SDK.",
}

export default function BraveSearchRagPage() {
  return (
    <section className="py-16">
      <PageHeader
        title="Brave Search RAG Demo"
        description="Query the Brave Search API, then ground an LLM answer in the results — with inline citations back to every source. Built with the Vercel AI SDK and Claude."
        centered
      />
      <div className="mt-12">
        <BraveSearchDemo />
      </div>
    </section>
  )
}
