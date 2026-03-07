import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "FQHC Salary Negotiation Guide 2026 | How to Negotiate at a Community Health Center",
  description:
    "Step-by-step salary negotiation for FQHC jobs — use P25/P50/P75 benchmarks, NHSC loan repayment data, and total comp analysis to negotiate a fair offer at California FQHCs.",
  alternates: {
    canonical:
      "https://www.fqhctalent.com/blog/fqhc-salary-negotiation-guide",
  },
  openGraph: {
    title: "FQHC Salary Negotiation Guide 2026",
    description:
      "Step-by-step salary negotiation for FQHC jobs — use P25/P50/P75 benchmarks, NHSC loan repayment data, and total comp analysis to negotiate a fair offer at California FQHCs.",
    url: "https://www.fqhctalent.com/blog/fqhc-salary-negotiation-guide",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
