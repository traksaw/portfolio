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
          imageUrl="/projects/back-against-the-wall/quiz-experience.png"
          imageAlt="Back Against the Wall quiz experience"
        />
        <ProjectCard
          title="DJ Visualizer"
          description="A live-coded, real-time audio visualizer and effects processor for DJs, built with the Web Audio API and p5.js. Performed live at Indy Hall Philadelphia, driving visuals off a Pioneer DDJ-REV1 in front of an audience."
          techStack={["JavaScript", "Web Audio API", "p5.js"]}
          githubLink="https://github.com/philaconvalley/djVisualizer"
          imageUrl="/projects/dj-visualizer/spectrum-bars.png"
          imageAlt="DJ Visualizer spectrum bars mode reacting to audio"
        />
        <ProjectCard
          title="KarMi"
          description="A minimalistic brand website for Purity by KarMi, a sustainable lifestyle brand promoting clean and eco-conscious living."
          techStack={["HTML", "CSS", "JavaScript"]}
          liveLink="https://purityinbw.netlify.app/"
          githubLink="https://github.com/traksaw/KarMi"
        />
        <ProjectCard
          title="Shopping Debate"
          description="Three AI personalities debate your purchase decisions in real time before checkout, streaming token-by-token. Built live in 4 hours with Victor Jackson for CodeTV's Web Dev Challenge S2.E12, sponsored by OpenRouter."
          techStack={["Chrome Extension", "OpenRouter", "Webpack", "Streaming AI"]}
          githubLink="https://github.com/philaconvalley/shoppingDebateChromeExtension"
          imageUrl="/projects/shopping-debate/debate-demo.jpg"
          imageAlt="Shopping Debate live demo at CodeTV's Web Dev Challenge"
        />
        <ProjectCard
          title="PhilaCon Valley"
          description="A Philadelphia tech community for Black, Brown, LGBTQIA+, and underrepresented technologists — by us, for us. Founded and lead this; named a 2025 Technical.ly REALlist Innovator for it."
          techStack={["Astro", "Tailwind CSS", "Alpine.js"]}
          liveLink="https://philaconvalley.com"
          githubLink="https://github.com/philaconvalley/website"
          imageUrl="/projects/philacon-valley/homepage.png"
          imageAlt="PhilaCon Valley homepage"
        />
      </div>
    </Section>
  )
}
