import type { MetadataRoute } from "next";
import { SITE } from "@/content/site";
import { FEATURES } from "@/content/features";
import { LEGAL_DOCS } from "@/content/legal";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: SITE.url, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE.url}/features`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    ...FEATURES.map((f) => ({ url: `${SITE.url}/features/${f.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...LEGAL_DOCS.map((d) => ({ url: `${SITE.url}/${d.slug}`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.3 })),
  ];
}
