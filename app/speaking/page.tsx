import type { Metadata } from "next"

import { ButtonLink } from "@/components/ui/ButtonLink"
import { PageHeader } from "@/components/ui/PageHeader"
import { Section } from "@/components/ui/Section"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { getNextTalk, talks, type Talk } from "@/lib/data"

export const metadata: Metadata = {
  title: "Speaking",
  description:
    "Conference talks, panels, and workshops by Waskar Paulino on AI, creative coding, and startup leadership.",
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

function TalkItem({ talk }: { talk: Talk }) {
  return (
    <article className="rounded-2xl border border-th-line bg-th-surface-card p-6 shadow-lg shadow-th-shadow transition-all duration-300 hover:-translate-y-1 hover:border-th-line-hover hover:shadow-xl sm:p-8">
      <h3 className="text-lg font-semibold text-th-heading sm:text-xl">
        {talk.url ? (
          <a
            href={talk.url}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-th-accent"
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

export default function SpeakingPage() {
  const nextTalk = getNextTalk()
  const pastTalks = talks.filter((talk) => talk !== nextTalk)

  return (
    <section className="mx-auto max-w-3xl py-16">
      <PageHeader
        title="Speaking"
        description="I speak about AI, creative coding, startup leadership, and building in public. Available for conference talks, panels, workshops, and podcast guest appearances."
      />

      <Section>
        <SectionHeading>Talks</SectionHeading>

        {nextTalk && (
          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-th-accent">
              Upcoming
            </p>
            <div className="mt-3">
              <TalkItem talk={nextTalk} />
            </div>
          </div>
        )}

        {talks.length === 0 ? (
          <p className="mt-4 text-th-muted">
            Talk list coming soon. Check back shortly.
          </p>
        ) : (
          pastTalks.length > 0 && (
            <div className={`space-y-6 ${nextTalk ? "mt-8" : "mt-6"}`}>
              {pastTalks.map((talk) => (
                <TalkItem key={`${talk.title}-${talk.date}`} talk={talk} />
              ))}
            </div>
          )
        )}
      </Section>

      <Section>
        <SectionHeading>Book Me</SectionHeading>
        <p className="mt-4 text-lg leading-relaxed text-th-body">
          Interested in having me speak at your event? I&apos;d love to hear
          from you.
        </p>
        <div className="mt-8">
          <ButtonLink href="/contact">Get in touch</ButtonLink>
        </div>
      </Section>
    </section>
  )
}
