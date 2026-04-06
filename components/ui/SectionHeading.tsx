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
      className={`font-serif text-3xl text-th-heading sm:text-4xl ${className}`}
    >
      {children}
    </Tag>
  )
}
