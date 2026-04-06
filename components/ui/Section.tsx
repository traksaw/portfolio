interface SectionProps {
  children: React.ReactNode
  border?: boolean
  className?: string
}

export function Section({ children, border = true, className = "" }: SectionProps) {
  return (
    <section
      className={`py-20 ${border ? "border-t border-th-line" : ""} ${className}`}
    >
      {children}
    </section>
  )
}
