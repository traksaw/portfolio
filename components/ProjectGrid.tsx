import { ProjectCard } from "./ProjectCard"

export function ProjectGrid() {
  return (
    <section className="border-t border-th-line py-20">
      <h2 className="mb-10 text-center font-serif text-3xl text-th-heading sm:text-4xl">
        Featured Project
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ProjectCard
          title="hit.it"
          description="A dynamic app for musicians to record and share audio clips, create collaborative playlists, and explore community jams."
          techStack={["Node.js", "Express", "MongoDB", "EJS"]}
          liveLink="https://hitit.up.railway.app/"
          githubLink="https://github.com/traksaw/hitit"
        />
      </div>
    </section>
  )
}
