import type { Metadata } from "next"
import Image from "next/image"

import { ButtonLink } from "@/components/ui/ButtonLink"
import { PageHeader } from "@/components/ui/PageHeader"

export const metadata: Metadata = {
  title: "About",
  description:
    "From a bodega in Philly to Apple Genius to CTO -- the story of Waskar Paulino.",
}

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-3xl py-16">
      <div className="mb-10 h-72 w-48 overflow-hidden rounded-2xl shadow-lg shadow-th-shadow sm:h-80 sm:w-56">
        <Image
          src="/headshot.PNG"
          alt="Waskar Paulino"
          width={224}
          height={320}
          priority
          className="h-full w-full object-cover"
        />
      </div>

      <PageHeader title="About Me" />

      <p className="mt-8 text-lg leading-relaxed text-th-body">
        Hey! I&apos;m Waskar — a software engineer, community builder, and
        creative technologist. My journey began as an Apple Genius, where I
        learned the power of empathy, storytelling, and the intersection of tech
        and people. That foundation led me into full stack development and tech
        education.
      </p>
      <p className="mt-6 text-lg leading-relaxed text-th-body">
        Most recently, I was CTO of Ideate Better, Inc., an early-stage
        AI/SaaS startup — sole engineer, building the entire production
        architecture from scratch across three interconnected products. I
        helped close an accelerator investment after a rigorous diligence
        process, mentored an extern engineering cohort, and turned a live AI
        infrastructure cost overrun into a lasting cost-control discipline
        built into production.
      </p>
      <p className="mt-6 text-lg leading-relaxed text-th-body">
        Today, I build tools and experiences that uplift underrepresented
        communities, champion collaborative learning, and blend art with
        engineering. Whether I&apos;m launching apps, spinning at a DJ gig, or
        mentoring folks breaking into tech — everything I do centers people and
        impact.
      </p>
      <p className="mt-6 text-lg leading-relaxed text-th-body">
        I&apos;m always open to new opportunities, creative partnerships, or just
        a good conversation. Let&apos;s connect and make something meaningful
        together.
      </p>
      <div className="mt-10">
        <ButtonLink href="/contact">Get in touch</ButtonLink>
      </div>
    </section>
  )
}
