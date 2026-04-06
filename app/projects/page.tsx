import type { Metadata } from "next"

import { PageHeader } from "@/components/ui/PageHeader"
import { ProjectGrid } from "@/components/ProjectGrid"

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Full stack builds, creative collaborations, and community-driven tools by Waskar Paulino.",
}

export default function ProjectsPage() {
  return (
    <section className="py-16">
      <PageHeader
        title="My Projects"
        description="A collection of full stack builds, creative collaborations, and community-driven tools I've crafted with intention and care."
        centered
      />
      <ProjectGrid />
    </section>
  )
}
