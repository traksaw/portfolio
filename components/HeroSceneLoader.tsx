"use client"

/* ──────────────────────────────────────────────────────────
 * HeroSceneLoader
 *
 * Client wrapper that keeps Hero.tsx a Server Component:
 * next/dynamic(..., { ssr: false }) can't be called inside a
 * Server Component, so it lives here instead.
 *
 * Also owns the prefers-reduced-motion decision. Unlike the old
 * ambient scene, the constellation is a functional navigation
 * surface, so reduced motion does NOT swap it for a poster — it
 * mounts the same interactive scene with animation disabled
 * (see HeroScene's `reduced` prop).
 * ────────────────────────────────────────────────────────── */

import dynamic from "next/dynamic"
import { Component, useEffect, useState, type ReactNode } from "react"

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false })

/**
 * Catches render/mount errors from the WebGL scene — e.g. a GPU-blocklisted
 * or locked-down machine where @react-three/fiber's Canvas throws while
 * creating a WebGL context — and renders nothing extra in the hero instead of
 * taking down the whole page. Every project is still reachable via the
 * ProjectGrid one scroll down, so no fallback constellation is needed here.
 */
class WebGLErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: unknown) {
    console.error("HeroScene failed to render, hiding constellation:", error)
  }

  render() {
    if (this.state.hasError) return null
    return this.props.children
  }
}

export function HeroSceneLoader() {
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
      <HeroScene reduced={reduced} />
    </WebGLErrorBoundary>
  )
}
