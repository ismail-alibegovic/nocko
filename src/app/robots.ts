import type { MetadataRoute } from "next";
import { allowIndexing, siteUrl } from "@/lib/seo";

/** The concept stays out of search indexes until the client approves launch. */
export default function robots(): MetadataRoute.Robots {
  if (!allowIndexing) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
