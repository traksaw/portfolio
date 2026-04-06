interface ProjectCardProps {
  title: string
  description: string
  techStack: string[]
  liveLink: string
  githubLink: string
}

export function ProjectCard({ title, description, techStack, liveLink, githubLink }: ProjectCardProps) {
  return (
    <div className="group rounded-xl border border-stone-200 bg-stone-50 p-6 transition-all duration-200 hover:border-stone-300 hover:shadow-lg hover:shadow-stone-200/60">
      <h3 className="font-serif text-xl text-stone-900">{title}</h3>
      <p className="mt-2 text-stone-500 leading-relaxed">{description}</p>
      <div className="mt-4 flex flex-wrap gap-2 text-xs">
        {techStack.map((tech, index) => (
          <span
            key={index}
            className="rounded-full bg-stone-100 px-3 py-1 font-medium text-stone-600"
          >
            {tech}
          </span>
        ))}
      </div>
      <div className="mt-5 flex gap-4 text-sm font-medium">
        <a
          href={liveLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-stone-900 underline decoration-stone-300 underline-offset-4 transition-colors hover:decoration-amber-400"
        >
          Live Site
        </a>
        <a
          href={githubLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-stone-900 underline decoration-stone-300 underline-offset-4 transition-colors hover:decoration-amber-400"
        >
          GitHub
        </a>
      </div>
    </div>
  )
}
