import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: "What's New — Platform Updates & Changelog",
  description:
    "See the latest updates to FQHC Talent: new features, strategic intelligence, data enrichments, and platform improvements. Updated weekly.",
  openGraph: {
    title: "What's New — FQHC Talent Platform Updates",
    description:
      "Recent platform updates, new features, and strategic intelligence from FQHC Talent.",
    url: `${SITE_URL}/whats-new`,
  },
  alternates: { canonical: `${SITE_URL}/whats-new` },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
