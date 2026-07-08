import type { Metadata } from "next"

import { getWritingPosts } from "@/lib/writing"
import { formatDate } from "@/lib/formatDate"
import { Badge } from "@/components/ui/Badge"
import { ButtonLink } from "@/components/ui/ButtonLink"
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
        <ButtonLink
          href="https://raksaw.substack.com"
          external
        >
          Subscribe on Substack
        </ButtonLink>
        <ButtonLink
          href="https://medium.com/@waskar.paulino"
          variant="secondary"
          external
        >
          Follow on Medium
        </ButtonLink>
      </div>

      <div className="mt-16 border-t border-th-line pt-10">
        {posts.length === 0 ? (
          <p className="text-th-muted">
            No posts yet. Check back shortly.
          </p>
        ) : (
          <div className="space-y-6">
            {posts.map((post, i) => (
              <article
                key={post.url}
                className="identity-card rounded-2xl border border-th-line bg-th-surface-card p-6 shadow-lg shadow-th-shadow transition-all duration-300 hover:-translate-y-1 hover:border-th-line-hover hover:shadow-xl sm:p-8"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="flex items-center gap-3">
                  {post.publishedAt && (
                    <span className="text-xs text-th-muted">
                      {formatDate(post.publishedAt)}
                    </span>
                  )}
                  <Badge>{post.source === "substack" ? "Substack" : "Medium"}</Badge>
                </div>

                <h3 className="mt-3 text-lg font-semibold text-th-heading sm:text-xl">
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-th-accent"
                  >
                    {post.title}
                  </a>
                </h3>

                {post.summary && (
                  <p className="mt-2 text-sm leading-relaxed text-th-body sm:text-base">
                    {post.summary}
                  </p>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
