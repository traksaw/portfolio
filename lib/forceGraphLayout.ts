/* ──────────────────────────────────────────────────────────
 * Force-directed 2D layout — repulsion between all nodes, spring
 * edges pulling toward a rest length, light centering. Settles into
 * a non-overlapping arrangement regardless of node count, so the
 * knowledge graph doesn't need hand-tuned angles that would crowd
 * as more projects/talks/writing get added.
 * ────────────────────────────────────────────────────────── */

export interface LayoutNode {
  id: string
  isRoot?: boolean
}

export interface LayoutEdge {
  from: string
  to: string
  /** Ideal edge length once the simulation settles. */
  rest: number
}

export type LayoutPositions = Record<string, [number, number]>

const REPEL = 3.4
const SPRING = 0.1
const CENTER = 0.012
const ROOT_CENTER = 0.25
const DAMPING = 0.82

export function computeForceLayout(
  nodes: LayoutNode[],
  edges: LayoutEdge[],
  seed: LayoutPositions,
  iterations = 400
): LayoutPositions {
  const pos: LayoutPositions = {}
  const vel: LayoutPositions = {}
  for (const n of nodes) {
    pos[n.id] = [...(seed[n.id] ?? [0, 0])]
    vel[n.id] = [0, 0]
  }

  for (let iter = 0; iter < iterations; iter++) {
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i].id
        const b = nodes[j].id
        const dx = pos[a][0] - pos[b][0]
        const dy = pos[a][1] - pos[b][1]
        const distSq = Math.max(dx * dx + dy * dy, 0.02)
        const dist = Math.sqrt(distSq)
        const force = REPEL / distSq
        const fx = (dx / dist) * force
        const fy = (dy / dist) * force
        vel[a][0] += fx
        vel[a][1] += fy
        vel[b][0] -= fx
        vel[b][1] -= fy
      }
    }

    for (const e of edges) {
      const dx = pos[e.from][0] - pos[e.to][0]
      const dy = pos[e.from][1] - pos[e.to][1]
      const dist = Math.sqrt(dx * dx + dy * dy) || 0.01
      const diff = (dist - e.rest) * SPRING
      const fx = (dx / dist) * diff
      const fy = (dy / dist) * diff
      vel[e.from][0] -= fx
      vel[e.from][1] -= fy
      vel[e.to][0] += fx
      vel[e.to][1] += fy
    }

    for (const n of nodes) {
      const pull = n.isRoot ? ROOT_CENTER : CENTER
      vel[n.id][0] += -pos[n.id][0] * pull
      vel[n.id][1] += -pos[n.id][1] * pull
    }

    for (const n of nodes) {
      vel[n.id][0] *= DAMPING
      vel[n.id][1] *= DAMPING
      pos[n.id][0] += vel[n.id][0]
      pos[n.id][1] += vel[n.id][1]
    }
  }

  return pos
}
