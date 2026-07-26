import type { Metadata } from "next"

import { getWritingPosts } from "@/lib/writing"
import { TrackedButtonLink } from "@/components/ui/TrackedButtonLink"
import { WritingPost } from "@/components/WritingPost"
import { PageHeader } from "@/components/ui/PageHeader"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Essays and stories about founding a startup, building in public, and the creative process.",
}

export default async function WritingPage() {
  const posts = await getWritingPosts()

  return (
    <section className="mx-auto max-w-3xl py-16">
      <PageHeader
        title="Writing"
        description="I write about what it's actually like to build a startup when you're still figuring it out."
      />

      <div className="mt-10 flex flex-wrap gap-4">
        <TrackedButtonLink
          href="https://raksaw.substack.com"
          external
          event="writing_subscribe_clicked"
          properties={{ platform: "substack" }}
        >
          Subscribe on Substack
        </TrackedButtonLink>
        <TrackedButtonLink
          href="https://medium.com/@waskar.paulino"
          variant="secondary"
          external
          event="writing_subscribe_clicked"
          properties={{ platform: "medium" }}
        >
          Follow on Medium
        </TrackedButtonLink>
      </div>

      <div className="mt-16 border-t border-th-line pt-10">
        {posts.length === 0 ? (
          <p className="text-th-muted">
            No posts yet. Check back shortly.
          </p>
        ) : (
          <div className="space-y-6">
            {posts.map((post, i) => (
              <WritingPost key={post.url} post={post} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
