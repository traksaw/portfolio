"use client"

/* ──────────────────────────────────────────────────────────
 * HeroScene — interactive project constellation
 *
 * One star per real project (see `projects` in lib/data.ts),
 * procedurally placed around a ring in 3D space to frame the hero
 * copy. The whole thing is a functional navigation surface, not decoration:
 *   • hover a star  → its title + description appear beside it,
 *                     the node lights up amber, cursor → pointer
 *   • click a star  → opens the project (live link if it has
 *                     one, else the GitHub repo) in a new tab
 *
 * Rendered as a full-bleed background behind Hero.tsx's copy.
 * Motion (gentle parallax tilt, per-star bob/twinkle, drifting
 * backdrop starfield) runs only when prefers-reduced-motion is
 * NOT set — see the `reduced` prop, threaded in from
 * HeroSceneLoader. When reduced, the layout is fully static but
 * every star stays interactive (hover + click still work).
 * ────────────────────────────────────────────────────────── */

import { Html, Line, Stars, useCursor } from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import { useRef, useState } from "react"
import * as THREE from "three"

import { projects, type Project } from "@/lib/data"

/** Site amber accent (--th-accent) — the "interactive" highlight color. */
const ACCENT = "#fbbf24"
/** Cool neutral for a star at rest, so the amber hover reads as active. */
const BASE_COLOR = "#94a3b8"

type Vec3 = [number, number, number]

/**
 * Generates one star position per project, evenly spaced around an
 * elliptical ring that frames the centered hero copy (loose sphere, hollow
 * center — matches the previous hand-placed layout's general shape). Depth
 * (z) alternates via a second harmonic so the ring reads as a real 3D
 * constellation rather than a flat oval.
 *
 * Deriving positions from `count` instead of a hand-placed, index-matched
 * lookup table means the star count always tracks `projects.length` in
 * lib/data.ts — no risk of silent index mis-mapping or out-of-bounds reads
 * when a project is added, removed, or reordered.
 */
function generateNodePositions(count: number): Vec3[] {
  const RADIUS_X = 4.2
  const RADIUS_Y = 2.4
  const DEPTH = 0.5
  // Starting on the right (angle 0) keeps every vertex off the vertical
  // centerline (x = 0) for typical star counts, so no star sits directly
  // above/below the centered hero copy — same clearance the old hand-placed
  // layout kept around the dead-center.
  const START_ANGLE = 0

  return Array.from({ length: count }, (_, i) => {
    const angle = START_ANGLE + (i / count) * Math.PI * 2
    const x = Math.cos(angle) * RADIUS_X
    const y = Math.sin(angle) * RADIUS_Y
    const z = Math.sin(angle * 2) * DEPTH
    return [x, y, z] as Vec3
  })
}

function projectUrl(project: Project): string | undefined {
  return project.liveLink ?? project.githubLink
}

function ProjectStar({
  project,
  position,
  reduced,
}: {
  project: Project
  position: Vec3
  reduced: boolean
}) {
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  useCursor(hovered)

  // Deterministic per-star phase so bob/twinkle don't move in lockstep.
  const phase = position[0] * 1.3 + position[1] * 0.7

  useFrame((state) => {
    if (reduced) return
    const group = groupRef.current
    if (!group) return
    const t = state.clock.elapsedTime
    group.position.y = position[1] + Math.sin(t * 0.8 + phase) * 0.07
  })

  const url = projectUrl(project)

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHovered(true)
      }}
      onPointerOut={(e) => {
        e.stopPropagation()
        setHovered(false)
      }}
      onClick={(e) => {
        e.stopPropagation()
        if (url) window.open(url, "_blank", "noopener,noreferrer")
      }}
    >
      {/* Core node — instant scale/color response so hover works in
          reduced-motion (demand-frameloop) mode too. */}
      <mesh scale={hovered ? 1.6 : 1}>
        <sphereGeometry args={[0.16, 24, 24]} />
        <meshBasicMaterial color={hovered ? ACCENT : BASE_COLOR} toneMapped={false} />
      </mesh>

      {/* Soft glow halo. */}
      <mesh scale={hovered ? 1.6 : 1}>
        <sphereGeometry args={[0.32, 24, 24]} />
        <meshBasicMaterial
          color={hovered ? ACCENT : BASE_COLOR}
          transparent
          opacity={hovered ? 0.28 : 0.12}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </mesh>

      {hovered && (
        <Html
          position={[0, 0.42, 0]}
          center
          distanceFactor={9}
          style={{ pointerEvents: "none" }}
          zIndexRange={[20, 10]}
        >
          <div
            style={{
              width: "240px",
              padding: "12px 14px",
              borderRadius: "12px",
              background: "var(--th-surface-card)",
              border: "1px solid var(--th-line)",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
              textAlign: "left",
            }}
          >
            <div
              style={{
                fontWeight: 700,
                fontSize: "15px",
                color: "var(--th-heading)",
              }}
            >
              {project.title}
            </div>
            <p
              style={{
                margin: "6px 0 0",
                fontSize: "12.5px",
                lineHeight: 1.5,
                color: "var(--th-body)",
              }}
            >
              {project.description}
            </p>
          </div>
        </Html>
      )}
    </group>
  )
}

function Constellation({ reduced }: { reduced: boolean }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (reduced) return
    const group = groupRef.current
    if (!group) return
    const t = state.clock.elapsedTime
    // Gentle parallax tilt (oscillates rather than fully rotating) so the
    // interactive nodes stay roughly in place.
    group.rotation.y = Math.sin(t * 0.15) * 0.16
    group.rotation.x = Math.sin(t * 0.1) * 0.08
  })

  const nodePositions = generateNodePositions(projects.length)
  // Ring order matches generation order, so the connecting line just walks
  // the array in sequence and closes the loop back to the first star.
  const linkPoints = [...nodePositions, nodePositions[0]]

  return (
    <>
      <Stars
        radius={60}
        depth={25}
        count={900}
        factor={2.2}
        saturation={0}
        fade
        speed={reduced ? 0 : 0.4}
      />
      <group ref={groupRef}>
        <Line
          points={linkPoints}
          color={BASE_COLOR}
          lineWidth={1}
          transparent
          opacity={0.22}
        />
        {projects.map((project, i) => (
          <ProjectStar
            key={project.title}
            project={project}
            position={nodePositions[i]}
            reduced={reduced}
          />
        ))}
      </group>
    </>
  )
}

export default function HeroScene({ reduced }: { reduced: boolean }) {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        frameloop={reduced ? "demand" : "always"}
        style={{ position: "absolute", inset: 0 }}
      >
        <Constellation reduced={reduced} />
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
    </div>
  )
}
