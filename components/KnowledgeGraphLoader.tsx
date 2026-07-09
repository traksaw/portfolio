"use client"

/* ──────────────────────────────────────────────────────────
 * KnowledgeGraphLoader
 *
 * Client wrapper that keeps KnowledgeGraph.tsx a Server Component:
 * next/dynamic(..., { ssr: false }) can't be called inside a Server
 * Component, so it lives here instead. Also owns the WebGL error
 * boundary and the prefers-reduced-motion decision (same pattern the
 * old hero constellation used).
 * ────────────────────────────────────────────────────────── */

import dynamic from "next/dynamic"
import { Component, useEffect, useState, type ReactNode } from "react"

import type { Project, Talk } from "@/lib/data"
import type { WritingPost } from "@/lib/writing"

const KnowledgeGraphScene = dynamic(() => import("./KnowledgeGraphScene"), {
  ssr: false,
})

/**
 * Catches render/mount errors from the WebGL scene — e.g. a GPU-blocklisted
 * or locked-down machine where @react-three/fiber's Canvas throws while
 * creating a WebGL context — and renders nothing instead of taking down
 * the whole page. Every project/talk/post is still reachable via the
 * regular pages (Projects, Speaking, Writing nav links), so no fallback
 * graph is needed here.
 */
class WebGLErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: unknown) {
    console.error("KnowledgeGraphScene failed to render, hiding the graph:", error)
  }

  render() {
    if (this.state.hasError) return null
    return this.props.children
  }
}

export function KnowledgeGraphLoader({
  projects,
  talks,
  posts,
}: {
  projects: Project[]
  talks: Talk[]
  posts: WritingPost[]
}) {
  // null = not yet decided (SSR + first paint render nothing → no mismatch).
  const [reduced, setReduced] = useState<boolean | null>(null)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduced(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  if (reduced === null) return null
  return (
    <WebGLErrorBoundary>
      <KnowledgeGraphScene projects={projects} talks={talks} posts={posts} reduced={reduced} />
    </WebGLErrorBoundary>
  )
}
