import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo-config";

export const metadata: Metadata = {
  title:
    "2026 California FQHC Salary & Workforce Report | Free PDF Download",
  description:
    "Download the most comprehensive California FQHC salary guide — 46 roles with P25/P50/P75 data, 9 regional multipliers, SB 525 impact analysis, and workforce insights. Built from 1,000+ real job postings.",
  openGraph: {
    title:
      "2026 California FQHC Salary & Workforce Report — Free PDF",
    description:
      "46 roles, 9 regions, percentile-based salary data built from 1,000+ California FQHC job postings. Free download.",
    url: `${SITE_URL}/salary-report`,
  },
  alternates: { canonical: `${SITE_URL}/salary-report` },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
