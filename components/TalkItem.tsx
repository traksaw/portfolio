"use client"

import posthog from "posthog-js"
import { formatDate } from "@/lib/formatDate"
import type { Talk } from "@/lib/data"

export function TalkItem({ talk }: { talk: Talk }) {
  return (
    <article className="rounded-2xl border border-th-line bg-th-surface-card p-6 shadow-lg shadow-th-shadow transition-all duration-300 hover:-translate-y-1 hover:border-th-line-hover hover:shadow-xl sm:p-8">
      <h3 className="text-lg font-semibold text-th-heading sm:text-xl">
        {talk.url ? (
          <a
            href={talk.url}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-th-accent"
            onClick={() =>
              posthog.capture("talk_details_clicked", {
                talk_title: talk.title,
                talk_venue: talk.venue,
              })
            }
          >
            {talk.title}
          </a>
        ) : (
          talk.title
        )}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-th-body sm:text-base">
        {talk.description}
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-th-muted">
        <span>{formatDate(talk.date)}</span>
        <span>{talk.venue}</span>
      </div>
    </article>
  )
}
