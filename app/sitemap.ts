import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, lastModified: new Date(), priority: 1 },
    { url: `${SITE_URL}/projects`, lastModified: new Date(), priority: 0.8 },
    { url: `${SITE_URL}/projects/brave-search-rag`, lastModified: new Date(), priority: 0.7 },
    { url: `${SITE_URL}/speaking`, lastModified: new Date(), priority: 0.8 },
    { url: `${SITE_URL}/writing`, lastModified: new Date(), priority: 0.7 },
    { url: `${SITE_URL}/about`, lastModified: new Date(), priority: 0.6 },
    { url: `${SITE_URL}/contact`, lastModified: new Date(), priority: 0.5 },
  ]
}
