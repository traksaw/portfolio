interface PageHeaderProps {
  title: string
  description?: string
  centered?: boolean
}

export function PageHeader({ title, description, centered = false }: PageHeaderProps) {
  return (
    <div className={centered ? "text-center" : ""}>
      <h1 className="text-4xl font-bold text-th-heading sm:text-5xl">
        {title}
      </h1>
      <div className={`mt-3 h-[2px] w-12 bg-th-accent ${centered ? "mx-auto" : ""}`} />
      {description && (
        <p className={`mt-6 text-lg leading-relaxed text-th-body ${centered ? "mx-auto max-w-2xl" : "max-w-2xl"}`}>
          {description}
        </p>
      )}
    </div>
  )
}
