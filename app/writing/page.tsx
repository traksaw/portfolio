import type { Metadata } from "next"

import { ButtonLink } from "@/components/ui/ButtonLink"
import { PageHeader } from "@/components/ui/PageHeader"

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Essays and stories about founding a startup, building in public, and the creative process.",
}

export default function WritingPage() {
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
        <p className="text-th-muted">
          Posts coming soon. Check back shortly.
        </p>
      </div>
    </section>
  )
}
