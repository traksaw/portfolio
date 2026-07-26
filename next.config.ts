import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Proxies PostHog ingestion through our own domain so ad-blockers don't
  // strip analytics calls to a third-party host. See PostHogProvider.tsx.
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
    ];
  },
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
