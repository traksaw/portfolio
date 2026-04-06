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
        <ProjectCard
          title="hit.it"
          description="A full-stack music collaboration platform where musicians upload, remix, and share multi-track audio projects with real-time waveform visualization."
          techStack={["SvelteKit", "Express", "MongoDB", "Socket.IO"]}
          githubLink="https://github.com/traksaw/hitit"
        />
        <ProjectCard
          title="riffMemo"
          description="A native iOS app that rebuilds Apple's discontinued Music Memos — one-tap recording with automatic tempo and key detection for capturing musical ideas."
          techStack={["Swift", "SwiftUI", "AVFoundation", "SwiftData"]}
          githubLink="https://github.com/traksaw/riffMemo"
        />
        <ProjectCard
          title="Back Against the Wall"
          description="An interactive short-film experience that helps users discover their financial archetype through narrative-driven decision making."
          techStack={["Next.js", "TypeScript", "CSS Modules"]}
          liveLink="https://backagainstthewall.vercel.app/"
          githubLink="https://github.com/traksaw/backAgainstTheWall"
        />
        <ProjectCard
          title="JS DJ Visualizer"
          description="A real-time audio visualizer and processor for DJs, built with the Web Audio API and Canvas for live performances and music analysis."
          techStack={["JavaScript", "Web Audio API", "Canvas"]}
          githubLink="https://github.com/traksaw/jsDJVisualizer"
        />
        <ProjectCard
          title="KarMi"
          description="A minimalistic brand website for Purity by KarMi, a sustainable lifestyle brand promoting clean and eco-conscious living."
          techStack={["HTML", "CSS", "JavaScript"]}
          liveLink="https://purityinbw.netlify.app/"
          githubLink="https://github.com/traksaw/KarMi"
        />
      </div>
    </Section>
  )
}
