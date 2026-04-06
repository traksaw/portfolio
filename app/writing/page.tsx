import type { Metadata } from "next"

import { ButtonLink } from "@/components/ui/ButtonLink"

export const metadata: Metadata = {
  title: "Writing | Waskar Paulino",
  description:
    "Essays and stories about founding a startup, building in public, and the creative process.",
}

export default function WritingPage() {
  return (
    <section className="mx-auto max-w-3xl py-16">
      <h1 className="font-serif text-4xl text-th-heading sm:text-5xl">
        Writing
      </h1>
      <div className="mt-2 h-[2px] w-12 bg-th-accent" />
      <p className="mt-8 text-lg leading-relaxed text-th-body">
        I write about what it&apos;s actually like to build a startup when
        you&apos;re still figuring it out.
      </p>

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
        <p className="text-th-muted">
          Posts coming soon. Check back shortly.
        </p>
      </div>
    </section>
  )
}
