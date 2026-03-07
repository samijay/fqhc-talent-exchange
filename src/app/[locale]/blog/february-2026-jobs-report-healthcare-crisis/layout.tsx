import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "February 2026 FQHC Jobs Report | Healthcare Crisis Hiring Data",
  description:
    "FQHC job market data for February 2026 — hiring trends during the Medicaid funding crisis, role demand by region, and salary movements across California community health centers.",
  alternates: {
    canonical:
      "https://www.fqhctalent.com/blog/february-2026-jobs-report-healthcare-crisis",
  },
  openGraph: {
    title: "February 2026 FQHC Jobs Report",
    description:
      "FQHC job market data for February 2026 — hiring trends during the Medicaid funding crisis, role demand by region, and salary movements across California community health centers.",
    url: "https://www.fqhctalent.com/blog/february-2026-jobs-report-healthcare-crisis",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
