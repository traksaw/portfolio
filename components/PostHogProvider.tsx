"use client"

import posthog from "posthog-js"
import { PostHogProvider as PHProvider, usePostHog } from "posthog-js/react"
import { Suspense, useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com"

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // No-ops until NEXT_PUBLIC_POSTHOG_KEY is set (local .env.local or Netlify env vars)
    // so a missing key never breaks the build or the live site.
    if (!POSTHOG_KEY || posthog.__loaded) return
    posthog.init(POSTHOG_KEY, {
      api_host: POSTHOG_HOST,
      person_profiles: "identified_only",
      capture_pageview: false, // captured manually below on App Router route changes
    })
  }, [])

  if (!POSTHOG_KEY) return <>{children}</>

  return (
    <PHProvider client={posthog}>
      <Suspense fallback={null}>
        <PostHogPageView />
      </Suspense>
      {children}
    </PHProvider>
  )
}

function PostHogPageView() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const posthogClient = usePostHog()

  useEffect(() => {
    if (!pathname || !posthogClient) return
    let url = window.origin + pathname
    if (searchParams.toString()) url += `?${searchParams.toString()}`
    posthogClient.capture("$pageview", { $current_url: url })
  }, [pathname, searchParams, posthogClient])

  return null
}
