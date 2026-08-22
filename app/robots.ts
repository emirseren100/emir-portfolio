import type { MetadataRoute } from "next";
import { isPreview, siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = siteUrl?.origin;

  return {
    rules: isPreview
      ? { userAgent: "*", disallow: "/" }
      : { userAgent: "*", allow: "/" },
    ...(baseUrl ? { sitemap: `${baseUrl}/sitemap.xml` } : {}),
  };
}
