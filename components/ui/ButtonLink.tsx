import Link from "next/link"

type Variant = "primary" | "secondary" | "ghost"

interface ButtonLinkProps {
  href: string
  variant?: Variant
  external?: boolean
  children: React.ReactNode
  className?: string
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-th-btn text-th-btn-text hover:bg-th-btn-hover hover:shadow-lg hover:shadow-th-shadow",
  secondary:
    "border border-th-line text-th-heading hover:border-th-line-hover hover:bg-th-surface-card",
  ghost:
    "border border-th-line-hover text-th-muted hover:border-th-heading hover:text-th-heading",
}

const base =
  "inline-block rounded-full px-8 py-3.5 text-sm font-semibold tracking-wide transition-all duration-200"

export function ButtonLink({
  href,
  variant = "primary",
  external = false,
  children,
  className = "",
}: ButtonLinkProps) {
  const styles = `${base} ${variantStyles[variant]} ${className}`

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={styles}
      >
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={styles}>
      {children}
    </Link>
  )
}
