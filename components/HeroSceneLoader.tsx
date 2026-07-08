"use client"

/* ──────────────────────────────────────────────────────────
 * HeroSceneLoader
 *
 * Client wrapper that keeps Hero.tsx a Server Component:
 * next/dynamic(..., { ssr: false }) can't be called inside a
 * Server Component, so it lives here instead.
 *
 * Also owns the prefers-reduced-motion decision — when reduced
 * motion is requested we never mount the animated canvas and
 * render the static galaxy poster instead.
 * ────────────────────────────────────────────────────────── */

import dynamic from "next/dynamic"
import Image from "next/image"
import { useEffect, useState } from "react"

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false })

function GalaxyPoster() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <Image
        src="/projects/dj-visualizer/galaxy-mode.png"
        alt=""
        fill
        priority
        sizes="100vw"
        // Zoom into the galaxy (right of centre in the reference still) so the
        // DJ-controls panel is cropped out of frame.
        style={{
          objectFit: "cover",
          objectPosition: "center",
          transform: "scale(1.9)",
          transformOrigin: "62% 45%",
        }}
        className="opacity-45"
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 55% at 50% 45%, color-mix(in srgb, var(--th-surface) 82%, transparent) 0%, color-mix(in srgb, var(--th-surface) 34%, transparent) 55%, transparent 100%)",
        }}
      />
    </div>
  )
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
  if (reduced) return <GalaxyPoster />
  return <HeroScene />
}
