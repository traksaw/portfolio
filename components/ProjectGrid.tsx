import { ProjectCard } from "./ProjectCard"
import { Section } from "./ui/Section"
import { SectionHeading } from "./ui/SectionHeading"

export function ProjectGrid() {
  return (
    <Section>
      <SectionHeading className="mb-10 text-center">
        Featured Project
      </SectionHeading>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ProjectCard
          title="hit.it"
          description="A dynamic app for musicians to record and share audio clips, create collaborative playlists, and explore community jams."
          techStack={["Node.js", "Express", "MongoDB", "EJS"]}
          liveLink="https://hitit.up.railway.app/"
          githubLink="https://github.com/traksaw/hitit"
        />
      </div>
    </Section>
  )
}
