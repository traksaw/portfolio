import { projects } from "@/lib/data"

import { ProjectCard } from "./ProjectCard"
import { Section } from "./ui/Section"
import { SectionHeading } from "./ui/SectionHeading"

export function ProjectGrid() {
  return (
    <Section>
      <SectionHeading className="mb-10 text-center">
        Featured Projects
      </SectionHeading>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </Section>
  )
}
