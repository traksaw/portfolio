import type { Metadata } from "next"

import { ButtonLink } from "@/components/ui/ButtonLink"
import { Section } from "@/components/ui/Section"
import { SectionHeading } from "@/components/ui/SectionHeading"

export const metadata: Metadata = {
  title: "Speaking | Waskar Paulino",
  description:
    "Conference talks, panels, and workshops by Waskar Paulino on AI, creative coding, and startup leadership.",
}

export default function SpeakingPage() {
  return (
    <section className="mx-auto max-w-3xl py-16">
      <h1 className="font-serif text-4xl text-th-heading sm:text-5xl">
        Speaking
      </h1>
      <div className="mt-2 h-[2px] w-12 bg-th-accent" />
      <p className="mt-8 text-lg leading-relaxed text-th-body">
        I speak about AI, creative coding, startup leadership, and building in
        public. Available for conference talks, panels, workshops, and podcast
        guest appearances.
      </p>

      <Section>
        <SectionHeading>Talks</SectionHeading>
        <p className="mt-4 text-th-muted">
          Talk list coming soon. Check back shortly.
        </p>
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
