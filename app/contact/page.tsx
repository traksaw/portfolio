import type { Metadata } from "next"

import { TrackedButtonLink } from "@/components/ui/TrackedButtonLink"
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
        <TrackedButtonLink
          href="mailto:workwithwaskar@gmail.com"
          external
          event="contact_email_clicked"
        >
          Send Me an Email
        </TrackedButtonLink>
      </div>
    </section>
  )
}
