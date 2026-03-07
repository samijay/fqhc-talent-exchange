import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NHSC Loan Repayment Guide 2026 | \$50K–\$75K Tax-Free for FQHC Clinicians",
  description:
    "Complete guide to the National Health Service Corps loan repayment program. 2026 award amounts, HPSA score requirements, eligibility rules, and how to apply at California FQHCs.",
  alternates: {
    canonical: "https://www.fqhctalent.com/blog/nhsc-loan-repayment-guide",
  },
  openGraph: {
    title: "NHSC Loan Repayment Guide 2026",
    description:
      "Complete guide to the National Health Service Corps loan repayment program. 2026 award amounts, HPSA score requirements, eligibility rules, and how to apply at California FQHCs.",
    url: "https://www.fqhctalent.com/blog/nhsc-loan-repayment-guide",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
