import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FQHC Career Ladder: MA → RN → Provider | California Community Health",
  description:
    "How to climb the FQHC career ladder from Medical Assistant to LVN to RN to NP in California. Certification requirements, salary milestones, and NHSC loan repayment at each level.",
  alternates: {
    canonical:
      "https://www.fqhctalent.com/blog/fqhc-career-ladder-ma-rn-provider",
  },
  openGraph: {
    title: "FQHC Career Ladder: MA to Provider",
    description:
      "How to climb the FQHC career ladder from Medical Assistant to LVN to RN to NP in California. Certification requirements, salary milestones, and NHSC loan repayment at each level.",
    url: "https://www.fqhctalent.com/blog/fqhc-career-ladder-ma-rn-provider",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
