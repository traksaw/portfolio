"use client"

/* ──────────────────────────────────────────────────────────
 * HeroScene
 *
 * Audio-reactive three.js (R3F) galaxy for the home hero — a
 * WebGL nod to Waskar's djVisualizer VJ software (see
 * public/projects/dj-visualizer/galaxy-mode.png for the look).
 *
 * A hidden, looping <audio> element is fed through a real Web
 * Audio AnalyserNode; per-frame bass/mid/high band energy
 * (ported from the original djVisualizer audioProcessor) drives
 * the particle field's scale, spin and point size. Baseline
 * rotation always runs so the scene is alive even before any
 * interaction (browser autoplay policy keeps the AudioContext
 * suspended until the first user gesture).
 *
 * Mounted only when prefers-reduced-motion is NOT set — see
 * HeroSceneLoader, which handles the reduced-motion poster
 * fallback and the ssr:false dynamic import.
 * ────────────────────────────────────────────────────────── */

import { Canvas, useFrame } from "@react-three/fiber"
import { useEffect, useMemo, useRef, useState } from "react"
import * as THREE from "three"

/** Site amber accent (--th-accent) — keeps the scene native to the site. */
const ACCENT = "#fbbf24"

const PARTICLE_COUNT = 4000
const ARMS = 5
const GALAXY_RADIUS = 4.2
const SPIN = 1.05
const RANDOMNESS = 0.36
const RANDOMNESS_POWER = 2.4
const BASE_POINT_SIZE = 0.05

type Bands = { bass: number; mid: number; high: number }

/**
 * Port of djVisualizer's AudioProcessor.bandEnergy() — same band-split
 * ratios and per-band weighting/multipliers so responsiveness matches the
 * original. `spec` is normalised (0–1) frequency data.
 */
function bandEnergy(spec: number[]): Bands {
  if (!spec || spec.length === 0) return { bass: 0, mid: 0, high: 0 }

  const bassEnd = Math.max(1, Math.floor(spec.length * 0.12))
  const midEnd = Math.max(bassEnd + 1, Math.floor(spec.length * 0.45))

  let bass = 0
  let mid = 0
  let high = 0

  for (let i = 1; i < bassEnd; i++) {
    const value = spec[i] || 0
    bass += value * value
  }
  const bassCount = Math.max(1, bassEnd - 1)
  bass = Math.sqrt(bass / bassCount) * 4.0

  for (let i = bassEnd; i < midEnd; i++) {
    const value = spec[i] || 0
    const weight = i < bassEnd * 2 ? 1.5 : 1.0
    mid += value * weight
  }
  const midCount = Math.max(1, midEnd - bassEnd)
  mid = (mid / midCount) * 3.5

  for (let i = midEnd; i < spec.length; i++) {
    const value = spec[i] || 0
    const weight = i > spec.length * 0.8 ? 2.0 : 1.0
    high += value * weight
  }
  const highCount = Math.max(1, spec.length - midEnd)
  high = (high / highCount) * 5.0

  return {
    bass: isNaN(bass) ? 0 : bass,
    mid: isNaN(mid) ? 0 : mid,
    high: isNaN(high) ? 0 : high,
  }
}

function Galaxy({
  analyserRef,
  dataRef,
}: {
  analyserRef: React.RefObject<AnalyserNode | null>
  dataRef: React.RefObject<Uint8Array | null>
}) {
  const pointsRef = useRef<THREE.Points>(null)
  // Smoothed band values, persisted across frames (matches the original's
  // this.bass = this.bass * 0.7 + newBass * 0.3 smoothing).
  const bands = useRef<Bands>({ bass: 0, mid: 0, high: 0 })
  const spectrum = useRef<number[]>([])

  const { geometry, material } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const colors = new Float32Array(PARTICLE_COUNT * 3)

    const cInner = new THREE.Color(ACCENT) // amber core
    const cMid = new THREE.Color("#e2683c") // warm coral
    const cOuter = new THREE.Color("#3f6ad8") // cool blue arms

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3
      const t = Math.pow(Math.random(), 0.7) // bias density toward the core
      const radius = t * GALAXY_RADIUS
      const branch = ((i % ARMS) / ARMS) * Math.PI * 2
      const spinAngle = radius * SPIN

      const rand = () =>
        Math.pow(Math.random(), RANDOMNESS_POWER) *
        (Math.random() < 0.5 ? 1 : -1) *
        RANDOMNESS *
        radius

      positions[i3] = Math.cos(branch + spinAngle) * radius + rand()
      positions[i3 + 1] = Math.sin(branch + spinAngle) * radius + rand()
      positions[i3 + 2] = rand() * 0.6 // thin depth for a 3D feel

      const color = new THREE.Color()
      if (t < 0.5) color.lerpColors(cInner, cMid, t / 0.5)
      else color.lerpColors(cMid, cOuter, (t - 0.5) / 0.5)
      colors[i3] = color.r
      colors[i3 + 1] = color.g
      colors[i3 + 2] = color.b
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))

    const material = new THREE.PointsMaterial({
      size: BASE_POINT_SIZE,
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })

    return { geometry, material }
  }, [])

  // Dispose GPU resources on unmount — no leaks.
  useEffect(() => {
    return () => {
      geometry.dispose()
      material.dispose()
    }
  }, [geometry, material])

  useFrame((_, delta) => {
    // Clamp delta so a backgrounded tab returning doesn't jump the animation.
    const dt = Math.min(delta, 0.05)

    const analyser = analyserRef.current
    const data = dataRef.current
    if (analyser && data) {
      analyser.getByteFrequencyData(data)
      const spec = spectrum.current
      spec.length = data.length
      for (let i = 0; i < data.length; i++) spec[i] = data[i] / 255

      const raw = bandEnergy(spec)
      // Same post-scaling and exponential smoothing as the original.
      const newBass = (raw.bass || 0) * 0.175
      const newMid = (raw.mid || 0) * 0.375
      const newHigh = (raw.high || 0) * 0.8

      const b = bands.current
      b.bass = b.bass * 0.7 + (isNaN(newBass) ? 0 : newBass) * 0.3
      b.mid = b.mid * 0.7 + (isNaN(newMid) ? 0 : newMid) * 0.3
      b.high = b.high * 0.7 + (isNaN(newHigh) ? 0 : newHigh) * 0.3
    }

    const b = bands.current
    // Clamp before driving any scale/size property (multipliers can exceed 1).
    const bass = Math.min(1, b.bass)
    const mid = Math.min(1, b.mid)
    const high = Math.min(1, b.high)

    const points = pointsRef.current
    if (!points) return

    // Baseline spin always runs; highs/mids accelerate it.
    points.rotation.z += dt * (0.12 + high * 0.5 + mid * 0.15)

    // Bass pumps overall scale.
    const scale = 1 + bass * 0.35
    points.scale.setScalar(scale)

    // Mids/highs brighten and enlarge the points.
    const mat = points.material as THREE.PointsMaterial
    mat.size = BASE_POINT_SIZE * (1 + mid * 0.9 + high * 0.5)
    mat.opacity = 0.75 + Math.min(0.25, bass * 0.3)
  })

  return (
    <group rotation={[-0.5, 0, 0]}>
      <points ref={pointsRef} geometry={geometry} material={material} />
    </group>
  )
}

function VolumeIcon({ on }: { on: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      {on ? (
        <>
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </>
      ) : (
        <>
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </>
      )}
    </svg>
  )
}

export default function HeroScene() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const dataRef = useRef<Uint8Array | null>(null)
  const [soundOn, setSoundOn] = useState(false)

  // Build the Web Audio graph once and cache it on the <audio> element so
  // React StrictMode's double-mount (and re-mounts) don't call
  // createMediaElementSource twice on the same element (which throws).
  useEffect(() => {
    const el = audioRef.current as
      | (HTMLAudioElement & {
          __ctx?: AudioContext
          __src?: MediaElementAudioSourceNode
        })
      | null
    if (!el) return

    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext
    if (!AC) return

    let ctx = el.__ctx
    let src = el.__src
    if (!ctx || !src) {
      ctx = new AC()
      src = ctx.createMediaElementSource(el)
      el.__ctx = ctx
      el.__src = src
    }

    const analyser = ctx.createAnalyser()
    analyser.fftSize = 1024
    analyser.smoothingTimeConstant = 0.3
    analyser.minDecibels = -90
    analyser.maxDecibels = -10
    src.connect(analyser)
    // Deliberately NOT connected to ctx.destination while silent — the
    // analyser still receives the signal, so the visual reacts with no sound.

    analyserRef.current = analyser
    dataRef.current = new Uint8Array(analyser.frequencyBinCount)

    // First user gesture resumes the context and unmutes the element so the
    // analyser gets real signal (still silent — not wired to destination).
    const kickstart = () => {
      if (ctx!.state === "suspended") void ctx!.resume()
      el.muted = false
      void el.play().catch(() => {})
    }
    const events: (keyof WindowEventMap)[] = [
      "pointerdown",
      "keydown",
      "touchstart",
    ]
    events.forEach((e) =>
      window.addEventListener(e, kickstart, { passive: true }),
    )

    // Try muted autoplay immediately (allowed by browsers).
    void el.play().catch(() => {})

    return () => {
      events.forEach((e) => window.removeEventListener(e, kickstart))
      // Only tear down the per-mount analyser; keep the cached ctx/src alive
      // on the element (recreating a source for the same element throws).
      try {
        src!.disconnect(analyser)
        analyser.disconnect()
      } catch {
        /* already disconnected */
      }
      analyserRef.current = null
      dataRef.current = null
    }
  }, [])

  const toggleSound = () => {
    const el = audioRef.current as
      | (HTMLAudioElement & { __ctx?: AudioContext })
      | null
    const ctx = el?.__ctx
    const analyser = analyserRef.current
    if (!el || !ctx || !analyser) return

    if (ctx.state === "suspended") void ctx.resume()
    el.muted = false
    void el.play().catch(() => {})

    setSoundOn((prev) => {
      const next = !prev
      if (next) analyser.connect(ctx.destination)
      else {
        try {
          analyser.disconnect(ctx.destination)
        } catch {
          /* not connected */
        }
      }
      return next
    })
  }

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/*
        Placeholder ambient loop — MUST be replaced with a licensed clip
        before final ship (Waskar is sourcing the real track).
      */}
      <audio ref={audioRef} src="/audio/hero-loop.mp3" loop muted preload="auto" />

      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        style={{ position: "absolute", inset: 0 }}
      >
        <Galaxy analyserRef={analyserRef} dataRef={dataRef} />
      </Canvas>

      {/* Legibility scrim — surface-coloured wash behind the hero text, in
          both light and dark themes (uses the --th-surface token). */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 55% at 50% 45%, color-mix(in srgb, var(--th-surface) 82%, transparent) 0%, color-mix(in srgb, var(--th-surface) 34%, transparent) 55%, transparent 100%)",
        }}
      />

      <button
        type="button"
        onClick={toggleSound}
        aria-label={soundOn ? "Mute hero audio" : "Unmute hero audio"}
        aria-pressed={soundOn}
        className="pointer-events-auto absolute bottom-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-th-line bg-th-surface-card/80 text-th-muted backdrop-blur transition-colors hover:border-th-line-hover hover:text-th-heading"
      >
        <VolumeIcon on={soundOn} />
      </button>
    </div>
  )
}
