import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FQHC vs Private Practice | Career Comparison for Healthcare Professionals",
  description:
    "FQHC vs. private practice: salary, loan repayment, scope of practice, career growth, and mission impact compared side-by-side. Total compensation analysis for California healthcare professionals.",
  alternates: {
    canonical: "https://www.fqhctalent.com/blog/fqhc-vs-private-practice",
  },
  openGraph: {
    title: "FQHC vs Private Practice Career Comparison",
    description:
      "FQHC vs. private practice: salary, loan repayment, scope of practice, career growth, and mission impact compared side-by-side. Total compensation analysis for California healthcare professionals.",
    url: "https://www.fqhctalent.com/blog/fqhc-vs-private-practice",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
