interface ProjectCardProps {
  title: string
  description: string
  techStack: string[]
  liveLink: string
  githubLink: string
}

export function ProjectCard({ title, description, techStack, liveLink, githubLink }: ProjectCardProps) {
  return (
    <div className="border rounded-lg p-6 shadow-sm hover:shadow-md transition">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-700 mb-4">{description}</p>
      <div className="flex flex-wrap gap-2 text-sm mb-4">
        {techStack.map((tech, index) => (
          <span key={index} className="bg-gray-100 text-gray-800 px-2 py-1 rounded">
            {tech}
          </span>
        ))}
      </div>
      <div className="flex gap-4">
        <a href={liveLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
          Live Site
        </a>
        <a href={githubLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
          GitHub
        </a>
      </div>
    </div>
  )
}