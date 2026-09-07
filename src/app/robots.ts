import type { MetadataRoute } from "next";
import { SITE } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/super-admin", "/super-admin/"] }],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
