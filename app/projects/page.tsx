import type { Metadata } from "next"

import { ProjectGrid } from "@/components/ProjectGrid"

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Full stack builds, creative collaborations, and community-driven tools by Waskar Paulino.",
}

export default function ProjectsPage() {
  return (
    <section className="py-16">
      <h1 className="text-center font-serif text-4xl text-th-heading sm:text-5xl">
        My Projects
      </h1>
      <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-th-body">
        A collection of full stack builds, creative collaborations, and
        community-driven tools I&apos;ve crafted with intention and care.
      </p>
      <ProjectGrid />
    </section>
  )
}
