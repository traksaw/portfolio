/* app/page.tsx */
import { Hero } from "@/components/Hero"
import { AboutPreview } from "@/components/AboutPreview"
import { ProjectGrid } from "@/components/ProjectGrid"

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <ProjectGrid />
    </>
  )
}