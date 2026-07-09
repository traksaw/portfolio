import Image from "next/image"

import { Badge } from "./ui/Badge"

interface ProjectCardProps {
  title: string
  description: string
  techStack: string[]
  liveLink?: string
  githubLink?: string
  imageUrl?: string
  imageAlt?: string
}

export function ProjectCard({
  title,
  description,
  techStack,
  liveLink,
  githubLink,
  imageUrl,
  imageAlt,
}: ProjectCardProps) {
  return (
    <div className="group rounded-xl border border-th-line bg-th-surface-card p-6 transition-all duration-200 hover:-translate-y-1 hover:border-th-line-hover hover:shadow-lg hover:shadow-th-shadow">
      {imageUrl && (
        <div className="relative -mx-6 -mt-6 mb-6 aspect-video overflow-hidden rounded-t-xl">
          <Image
            src={imageUrl}
            alt={imageAlt ?? `${title} screenshot`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      )}
      <h3 className="text-xl font-bold text-th-heading">{title}</h3>
      <p className="mt-2 text-th-body leading-relaxed">{description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {techStack.map((tech) => (
          <Badge key={tech}>{tech}</Badge>
        ))}
      </div>
      <div className="mt-5 flex gap-4 text-sm font-medium">
        {liveLink && (
          <a
            href={liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-th-heading underline decoration-th-line-hover underline-offset-4 transition-colors hover:decoration-th-accent"
          >
            Live Site
          </a>
        )}
        {githubLink && (
          <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-th-heading underline decoration-th-line-hover underline-offset-4 transition-colors hover:decoration-th-accent"
          >
            GitHub
          </a>
        )}
      </div>
    </div>
  )
}
