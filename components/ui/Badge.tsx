interface BadgeProps {
  children: React.ReactNode
  className?: string
}

export function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span
      className={`rounded-full bg-th-surface-badge px-3 py-1 text-xs font-medium text-th-muted ${className}`}
    >
      {children}
    </span>
  )
}
