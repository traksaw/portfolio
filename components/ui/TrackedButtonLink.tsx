"use client"

import posthog from "posthog-js"
import { ButtonLink } from "./ButtonLink"

type Variant = "primary" | "secondary" | "ghost"

interface TrackedButtonLinkProps {
  href: string
  variant?: Variant
  external?: boolean
  children: React.ReactNode
  className?: string
  event: string
  properties?: Record<string, unknown>
}

export function TrackedButtonLink({
  event,
  properties,
  ...props
}: TrackedButtonLinkProps) {
  const handleClick = () => {
    posthog.capture(event, properties)
  }

  return <ButtonLink {...props} onClick={handleClick} />
}
