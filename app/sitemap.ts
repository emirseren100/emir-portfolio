import type { MetadataRoute } from "next";
import { isPreview, siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteUrl || isPreview) {
    return [];
  }

  return [{ url: `${siteUrl.origin}/`, changeFrequency: "monthly", priority: 1 }];
}
