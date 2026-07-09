/* ──────────────────────────────────────────────────────────
 * KnowledgeGraph — async server component
 *
 * Fetches writing posts (same source LatestStrip uses) and passes
 * projects/talks/posts down to the client-only force-directed graph.
 * Section sits directly under Hero with no top border, matching the
 * site's rhythm of upper "identity" sections flowing together
 * undivided before the lower "content" sections pick up border-t.
 * ────────────────────────────────────────────────────────── */

import { projects, talks } from "@/lib/data"
import { getWritingPosts } from "@/lib/writing"
import { KnowledgeGraphLoader } from "./KnowledgeGraphLoader"
import { Section } from "./ui/Section"

export async function KnowledgeGraph() {
  const posts = await getWritingPosts().catch(() => [])

  return (
    <Section border={false} className="pb-20 pt-4">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-th-accent">
          The full picture
        </p>
        <h2 className="mt-3 text-3xl font-bold text-th-heading sm:text-4xl">
          Everything, connected
        </h2>
        <p className="mt-4 text-base leading-relaxed text-th-body">
          Three hubs — what I build, what I speak on, what I write — with
          the real work branching off each. Hover a node to see what it is,
          click a project or talk to open it.
        </p>
      </div>

      <div className="relative mx-auto mt-10 h-[480px] max-w-6xl sm:h-[620px]">
        <KnowledgeGraphLoader projects={projects} talks={talks} posts={posts} />
      </div>
    </Section>
  )
}
