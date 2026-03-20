import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Career Hub | Free FQHC Career Tools | FQHC Talent",
  description:
    "Access free career tools for FQHC professionals — resume builder, career assessment, interview prep, certifications, salary data, and learning pathways.",
  alternates: {
    canonical: "https://www.fqhctalent.com/career",
  },
};

export default function CareerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
