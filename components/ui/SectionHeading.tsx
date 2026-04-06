interface SectionHeadingProps {
  children: React.ReactNode
  as?: "h2" | "h3"
  className?: string
}

export function SectionHeading({
  children,
  as: Tag = "h2",
  className = "",
}: SectionHeadingProps) {
  return (
    <Tag
      className={`text-3xl font-bold text-th-heading sm:text-4xl ${className}`}
    >
      {children}
    </Tag>
  )
}
