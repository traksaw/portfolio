"use client"

/* ──────────────────────────────────────────────────────────
 * KnowledgeGraphScene — a real force-directed knowledge graph
 *
 * Styled after Obsidian's graph view: a root node ("Waskar Paulino")
 * connects to three hubs (Builder / Speaker / Writer), each of which
 * connects to the real projects, talks, and writing under it. Layout
 * comes from an actual physics simulation (see lib/forceGraphLayout.ts)
 * — nodes repel each other, edges act as springs — so it stays legible
 * as more projects/talks/posts get added, instead of hand-tuned angles
 * that would crowd over time.
 *
 *   • hover a node  → it and its connected edges brighten, everything
 *                     else dims; satellites also show a description card
 *   • click a hub/root → navigates to that section's page
 *   • click a satellite → opens the project/talk/post's real link
 *
 * Motion (per-node bob) runs only when prefers-reduced-motion is NOT
 * set — see the `reduced` prop, threaded in from KnowledgeGraphLoader.
 * When reduced, the layout is fully static but every node stays
 * interactive (hover + click still work).
 * ────────────────────────────────────────────────────────── */

import { Html, Line, useCursor } from "@react-three/drei"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useRouter } from "next/navigation"
import { useMemo, useRef, useState } from "react"
import * as THREE from "three"

import { computeForceLayout, type LayoutEdge, type LayoutNode } from "@/lib/forceGraphLayout"
import type { Project, Talk } from "@/lib/data"
import type { WritingPost } from "@/lib/writing"

/** Site amber accent (--th-accent) — the "interactive" highlight color. */
const ACCENT = "#fbbf24"
/** Cool neutral for a satellite at rest, so the amber hover reads as active. */
const BASE_COLOR = "#78716c"
/** Root/hub nodes read as structural, not clickable-content, so a darker neutral. */
const HUB_COLOR = "#44403c"
const DIMMED_OPACITY = 0.22

interface HubDef {
  id: "builder" | "speaker" | "writer"
  label: string
  href: string
}

const HUBS: HubDef[] = [
  { id: "builder", label: "Builder", href: "/projects" },
  { id: "speaker", label: "Speaker", href: "/speaking" },
  { id: "writer", label: "Writer", href: "/writing" },
]

const HUB_SEED_ANGLES: Record<string, number> = { builder: 90, speaker: 210, writer: 330 }

/**
 * Deterministic hash → [0, 1), used instead of Math.random() to seed the
 * simulation. A random seed meant the layout came out differently on every
 * page load — sometimes settling into a lopsided arrangement (a hub with
 * only one satellite, like Speaker, has little "weight" holding it in
 * place and can get pushed off by repulsion from a bigger cluster). Same
 * node id always hashes to the same seed, so the physics still self-
 * organizes the layout, but every visitor sees the same, verified-good
 * result instead of whatever a given run's randomness produced.
 */
function hashUnit(input: string): number {
  let h = 2166136261
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return (h >>> 0) / 4294967296
}

interface GraphSatellite {
  id: string
  hub: string
  label: string
  url?: string
  description: string
}

interface GraphNodeData {
  id: string
  label: string
  kind: "root" | "hub" | "satellite"
  href?: string
  url?: string
  description?: string
  position: [number, number, number]
  phase: number
}

function buildSatellites(
  projects: Project[],
  talks: Talk[],
  posts: WritingPost[]
): GraphSatellite[] {
  const projectNodes: GraphSatellite[] = projects.map((p) => ({
    id: `p-${p.title}`,
    hub: "builder",
    label: p.title,
    url: p.liveLink ?? p.githubLink,
    description: p.description,
  }))

  const talkNodes: GraphSatellite[] = talks.map((t) => ({
    id: `t-${t.title}`,
    hub: "speaker",
    label: t.title,
    url: t.url,
    description: t.description,
  }))

  // Cap displayed posts — the RSS feed accumulates indefinitely, but the
  // graph should show "what he's been writing lately," not his entire
  // archive back to the first post.
  const writingNodes: GraphSatellite[] = posts.slice(0, 6).map((post) => ({
    id: `w-${post.title}`,
    hub: "writer",
    label: post.title,
    url: post.url,
    description: post.summary,
  }))

  return [...projectNodes, ...talkNodes, ...writingNodes]
}

function useGraphLayout(projects: Project[], talks: Talk[], posts: WritingPost[]) {
  return useMemo(() => {
    const satellites = buildSatellites(projects, talks, posts)

    const layoutNodes: LayoutNode[] = [
      { id: "me", isRoot: true },
      ...HUBS.map((h) => ({ id: h.id })),
      ...satellites.map((s) => ({ id: s.id })),
    ]

    const edges: LayoutEdge[] = [
      ...HUBS.map((h) => ({ from: "me", to: h.id, rest: 3.2 })),
      ...satellites.map((s) => ({ from: s.hub, to: s.id, rest: 2.4 })),
    ]

    // Seed positions only need to be roughly right — near their intended
    // cluster, not overlap-free — the simulation resolves the rest.
    const seed: Record<string, [number, number]> = { me: [0, 0] }
    for (const h of HUBS) {
      const a = (HUB_SEED_ANGLES[h.id] * Math.PI) / 180
      seed[h.id] = [Math.cos(a) * 2.6, Math.sin(a) * 2.6]
    }
    const satelliteZ: Record<string, number> = {}
    const satelliteCountByHub: Record<string, number> = {}
    for (const s of satellites) {
      const i = satelliteCountByHub[s.hub] ?? 0
      satelliteCountByHub[s.hub] = i + 1
      const baseAngle = (HUB_SEED_ANGLES[s.hub] * Math.PI) / 180
      // Tighter jitter than the first pass (±0.5 rad / a fixed radius band
      // instead of ±0.7) — a single-satellite hub like Speaker has no
      // sibling satellites to help anchor its angle, so a wide jitter let
      // it drift into another hub's territory. Keeping every satellite
      // seeded closer to its hub's direction gives the simulation a
      // cleaner starting basin to settle into.
      const jitterAngle = baseAngle + (hashUnit(`${s.id}:a`) - 0.5) * 1.0
      const r = 4.4 + hashUnit(`${s.id}:r`) * 0.9
      seed[s.id] = [Math.cos(jitterAngle) * r, Math.sin(jitterAngle) * r]
      satelliteZ[s.id] = Math.sin(i * 1.7) * 0.4
    }

    const settled = computeForceLayout(layoutNodes, edges, seed, 400)

    const nodeById = new Map<string, GraphNodeData>()
    nodeById.set("me", {
      id: "me",
      label: "Waskar Paulino",
      kind: "root",
      href: "/about",
      position: [settled.me[0], settled.me[1], 0],
      phase: 0,
    })
    HUBS.forEach((h, i) => {
      nodeById.set(h.id, {
        id: h.id,
        label: h.label,
        kind: "hub",
        href: h.href,
        position: [settled[h.id][0], settled[h.id][1], 0],
        phase: i * 2.1,
      })
    })
    satellites.forEach((s, i) => {
      const p = settled[s.id]
      nodeById.set(s.id, {
        id: s.id,
        label: s.label,
        kind: "satellite",
        url: s.url,
        description: s.description,
        position: [p[0], p[1], satelliteZ[s.id] ?? 0],
        phase: i * 1.9 + s.hub.length,
      })
    })

    const nodes = Array.from(nodeById.values())

    const neighbors = new Map<string, string[]>()
    nodes.forEach((n) => neighbors.set(n.id, []))
    edges.forEach((e) => {
      neighbors.get(e.from)?.push(e.to)
      neighbors.get(e.to)?.push(e.from)
    })

    const maxDist =
      nodes.reduce((m, n) => Math.max(m, Math.hypot(n.position[0], n.position[1])), 0) + 0.9

    return { nodes, edges, neighbors, maxDist }
  }, [projects, talks, posts])
}

/** Fits the orthographic frustum to `maxDist` at any container aspect ratio. */
function FitCamera({ maxDist }: { maxDist: number }) {
  const { camera, size } = useThree()
  const cam = camera as THREE.OrthographicCamera
  const aspect = size.width / size.height
  const f = maxDist / Math.min(1, aspect)
  cam.left = -f * aspect
  cam.right = f * aspect
  cam.top = f
  cam.bottom = -f
  cam.near = 0.1
  cam.far = 100
  cam.position.set(0, 0, 10)
  cam.lookAt(0, 0, 0)
  cam.updateProjectionMatrix()
  return null
}

function GraphNode({
  node,
  reduced,
  isHovered,
  isDimmed,
  isNeighbor,
  onHoverChange,
  onActivate,
}: {
  node: GraphNodeData
  reduced: boolean
  isHovered: boolean
  isDimmed: boolean
  isNeighbor: boolean
  onHoverChange: (hovered: boolean) => void
  onActivate: () => void
}) {
  const groupRef = useRef<THREE.Group>(null)
  useCursor(isHovered && Boolean(node.url || node.href))

  const structural = node.kind !== "satellite"
  const restColor = structural ? HUB_COLOR : BASE_COLOR
  const size = node.kind === "root" ? 0.22 : node.kind === "hub" ? 0.15 : 0.09

  useFrame((state) => {
    if (reduced) return
    const group = groupRef.current
    if (!group) return
    const t = state.clock.elapsedTime
    group.position.x = node.position[0] + Math.sin(t * 0.6 + node.phase) * 0.035
    group.position.y = node.position[1] + Math.cos(t * 0.5 + node.phase * 1.3) * 0.035
  })

  return (
    <group
      ref={groupRef}
      position={node.position}
      onPointerOver={(e) => {
        e.stopPropagation()
        onHoverChange(true)
      }}
      onPointerOut={(e) => {
        e.stopPropagation()
        onHoverChange(false)
      }}
      onClick={(e) => {
        e.stopPropagation()
        onActivate()
      }}
    >
      <mesh scale={isHovered ? 1.5 : isNeighbor ? 1.15 : 1}>
        <sphereGeometry args={[size, 20, 20]} />
        <meshBasicMaterial
          color={isHovered ? ACCENT : restColor}
          transparent
          opacity={isDimmed ? DIMMED_OPACITY : 1}
          toneMapped={false}
        />
      </mesh>

      <Html
        position={[0, node.kind === "root" ? -0.34 : node.kind === "hub" ? -0.26 : 0.16, 0]}
        center
        style={{ pointerEvents: "none" }}
        zIndexRange={[15, 5]}
      >
        <div
          style={{
            fontSize: node.kind === "root" ? "15px" : node.kind === "hub" ? "13px" : "12px",
            fontWeight: structural ? 700 : 500,
            color: isHovered ? ACCENT : "var(--th-heading)",
            opacity: isDimmed ? DIMMED_OPACITY : structural ? 0.95 : 0.8,
            whiteSpace: "nowrap",
            textAlign: "center",
          }}
        >
          {node.label}
        </div>
      </Html>

      {isHovered && node.kind === "satellite" && node.description && (
        <Html
          position={[0, 0.42, 0]}
          center
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
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.12)",
              textAlign: "left",
            }}
          >
            <div style={{ fontWeight: 700, fontSize: "14px", color: "var(--th-heading)" }}>
              {node.label}
            </div>
            <p
              style={{
                margin: "6px 0 0",
                fontSize: "12px",
                lineHeight: 1.5,
                color: "var(--th-body)",
              }}
            >
              {node.description}
            </p>
            {node.url && (
              <span
                style={{
                  display: "inline-block",
                  marginTop: "8px",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "var(--th-accent)",
                }}
              >
                View &rarr;
              </span>
            )}
          </div>
        </Html>
      )}
    </group>
  )
}

function Graph({
  projects,
  talks,
  posts,
  reduced,
}: {
  projects: Project[]
  talks: Talk[]
  posts: WritingPost[]
  reduced: boolean
}) {
  const router = useRouter()
  const { nodes, edges, neighbors, maxDist } = useGraphLayout(projects, talks, posts)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const nodeById = useMemo(() => new Map(nodes.map((n) => [n.id, n])), [nodes])

  return (
    <>
      <FitCamera maxDist={maxDist} />
      {edges.map((e) => {
        const isActive = hoveredId === e.from || hoveredId === e.to
        const isDimmed = hoveredId !== null && !isActive
        const a = nodeById.get(e.from)
        const b = nodeById.get(e.to)
        if (!a || !b) return null
        return (
          <Line
            key={`${e.from}-${e.to}`}
            points={[a.position, b.position]}
            color={isActive ? ACCENT : BASE_COLOR}
            lineWidth={isActive ? 2 : 1.5}
            transparent
            opacity={isActive ? 0.9 : isDimmed ? 0.1 : 0.35}
          />
        )
      })}
      {nodes.map((node) => (
        <GraphNode
          key={node.id}
          node={node}
          reduced={reduced}
          isHovered={hoveredId === node.id}
          isDimmed={hoveredId !== null && hoveredId !== node.id}
          isNeighbor={hoveredId !== null && (neighbors.get(hoveredId) ?? []).includes(node.id)}
          onHoverChange={(hovered) => setHoveredId(hovered ? node.id : null)}
          onActivate={() => {
            if (node.url) {
              window.open(node.url, "_blank", "noopener,noreferrer")
            } else if (node.href) {
              router.push(node.href)
            }
          }}
        />
      ))}
    </>
  )
}

export default function KnowledgeGraphScene({
  projects,
  talks,
  posts,
  reduced,
}: {
  projects: Project[]
  talks: Talk[]
  posts: WritingPost[]
  reduced: boolean
}) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <Canvas
        orthographic
        camera={{ position: [0, 0, 10] }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        frameloop={reduced ? "demand" : "always"}
        style={{ position: "absolute", inset: 0 }}
      >
        <Graph projects={projects} talks={talks} posts={posts} reduced={reduced} />
      </Canvas>
    </div>
  )
}
