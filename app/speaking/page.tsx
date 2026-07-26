import type { Metadata } from "next"

import { TrackedButtonLink } from "@/components/ui/TrackedButtonLink"
import { PageHeader } from "@/components/ui/PageHeader"
import { Section } from "@/components/ui/Section"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { TalkItem } from "@/components/TalkItem"
import { getNextTalk, talks } from "@/lib/data"

export const metadata: Metadata = {
  title: "Speaking",
  description:
    "Conference talks, panels, and workshops by Waskar Paulino on AI, creative coding, and startup leadership.",
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
          <TrackedButtonLink href="/contact" event="book_speaking_clicked">
            Get in touch
          </TrackedButtonLink>
        </div>
      </Section>
    </section>
  )
}
