import { ProjectGrid } from "@/components/ProjectGrid"

export default function ProjectsPage() {
  return (
    <section className="py-16">
      <h1 className="text-4xl font-bold text-center mb-10">My Projects</h1>
      <p className="text-lg text-center text-gray-600 max-w-2xl mx-auto mb-10">
        A collection of full stack builds, creative collaborations, and community-driven tools I&apos;ve crafted with intention and care.
      </p>
      <ProjectGrid />
    </section>
  )
}