import { Badge } from "./ui/Badge"

interface ProjectCardProps {
  title: string
  description: string
  techStack: string[]
  liveLink: string
  githubLink: string
}

export function ProjectCard({ title, description, techStack, liveLink, githubLink }: ProjectCardProps) {
  return (
    <div className="group rounded-xl border border-th-line bg-th-surface-card p-6 transition-all duration-200 hover:-translate-y-1 hover:border-th-line-hover hover:shadow-lg hover:shadow-th-shadow">
      <h3 className="text-xl font-bold text-th-heading">{title}</h3>
      <p className="mt-2 text-th-body leading-relaxed">{description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {techStack.map((tech) => (
          <Badge key={tech}>{tech}</Badge>
        ))}
      </div>
      <div className="mt-5 flex gap-4 text-sm font-medium">
        <a
          href={liveLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-th-heading underline decoration-th-line-hover underline-offset-4 transition-colors hover:decoration-th-accent"
        >
          Live Site
        </a>
        <a
          href={githubLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-th-heading underline decoration-th-line-hover underline-offset-4 transition-colors hover:decoration-th-accent"
        >
          GitHub
        </a>
      </div>
    </div>
  )
}
