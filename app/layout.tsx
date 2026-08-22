import type { Metadata } from "next";
import { isPreview, siteOrigin, siteUrl } from "@/lib/site";
import "./globals.css";

const title = "Emir Şeren — Creative Developer";
const description =
  "Portfolio of Emir Şeren — product interfaces, frontend systems and interactive experiments.";

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title,
  description,
  applicationName: "Emir Portfolio",
  authors: [{ name: "Emir Şeren" }],
  creator: "Emir Şeren",
  alternates: siteUrl ? { canonical: siteUrl.toString() } : undefined,
  openGraph: {
    type: "website",
    title,
    description,
    siteName: title,
    ...(siteUrl
      ? {
          url: siteUrl.toString(),
          images: [
            {
              url: new URL("/opengraph-image", siteUrl).toString(),
              width: 1200,
              height: 630,
              alt: title,
            },
          ],
        }
      : {}),
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    ...(siteUrl ? { images: [new URL("/opengraph-image", siteUrl).toString()] } : {}),
  },
  icons: {
    icon: "/icon.svg",
    apple: "/apple-icon.png",
  },
  robots: {
    index: !isPreview,
    follow: !isPreview,
    googleBot: {
      index: !isPreview,
      follow: !isPreview,
    },
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
