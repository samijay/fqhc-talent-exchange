import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Healthcare Hiring Trends 2026 | FQHC Workforce Data for California",
  description:
    "2026 healthcare hiring trends: which FQHC roles are in highest demand, salary movements, ECM program hiring surge, behavioral health gaps, and how federal funding cuts are reshaping community health hiring.",
  alternates: {
    canonical: "https://www.fqhctalent.com/blog/healthcare-hiring-trends-2026",
  },
  openGraph: {
    title: "Healthcare Hiring Trends 2026 — California FQHCs",
    description:
      "2026 healthcare hiring trends: which FQHC roles are in highest demand, salary movements, ECM program hiring surge, behavioral health gaps, and how federal funding cuts are reshaping community health hiring.",
    url: "https://www.fqhctalent.com/blog/healthcare-hiring-trends-2026",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
