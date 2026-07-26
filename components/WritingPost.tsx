"use client"

import posthog from "posthog-js"
import { Badge } from "@/components/ui/Badge"
import { formatDate } from "@/lib/formatDate"
import type { WritingPost as WritingPostType } from "@/lib/writing"

export function WritingPost({ post, index }: { post: WritingPostType; index: number }) {
  return (
    <article
      className="identity-card rounded-2xl border border-th-line bg-th-surface-card p-6 shadow-lg shadow-th-shadow transition-all duration-300 hover:-translate-y-1 hover:border-th-line-hover hover:shadow-xl sm:p-8"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-center gap-3">
        {post.publishedAt && (
          <span className="text-xs text-th-muted">{formatDate(post.publishedAt)}</span>
        )}
        <Badge>{post.source === "substack" ? "Substack" : "Medium"}</Badge>
      </div>

      <h3 className="mt-3 text-lg font-semibold text-th-heading sm:text-xl">
        <a
          href={post.url}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-th-accent"
          onClick={() =>
            posthog.capture("writing_post_clicked", {
              post_title: post.title,
              post_source: post.source,
            })
          }
        >
          {post.title}
        </a>
      </h3>

      {post.summary && (
        <p className="mt-2 text-sm leading-relaxed text-th-body sm:text-base">{post.summary}</p>
      )}
    </article>
  )
}
