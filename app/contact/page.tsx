import type { Metadata } from "next"

import { ButtonLink } from "@/components/ui/ButtonLink"
import { PageHeader } from "@/components/ui/PageHeader"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Waskar Paulino for speaking inquiries, collaborations, or just to say hi.",
}

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-2xl py-16">
      <PageHeader
        title="Get in Touch"
        description="Whether you're interested in working together, have a question, or just want to say hi — I'd love to hear from you."
        centered
      />
      <div className="mt-10 text-center">
        <ButtonLink href="mailto:workwithwaskar@gmail.com" external>
          Send Me an Email
        </ButtonLink>
      </div>
    </section>
  )
}
