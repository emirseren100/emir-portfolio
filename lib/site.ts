const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

function parseSiteUrl(value: string | undefined) {
  if (!value) {
    return undefined;
  }

  try {
    return new URL(value);
  } catch {
    return undefined;
  }
}

export const siteUrl = parseSiteUrl(configuredSiteUrl);
export const isPreview = process.env.VERCEL_ENV === "preview";

// Used only for local metadata resolution until the deployment URL is configured.
export const siteOrigin = siteUrl?.origin ?? "http://localhost:3000";
