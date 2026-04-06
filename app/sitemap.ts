import type { MetadataRoute } from "next"

const BASE_URL = "https://waskarmiguelpaulino.netlify.app"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE_URL, lastModified: new Date(), priority: 1 },
    { url: `${BASE_URL}/projects`, lastModified: new Date(), priority: 0.8 },
    { url: `${BASE_URL}/speaking`, lastModified: new Date(), priority: 0.8 },
    { url: `${BASE_URL}/writing`, lastModified: new Date(), priority: 0.7 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), priority: 0.6 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), priority: 0.5 },
  ]
}
