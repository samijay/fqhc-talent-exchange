import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "What Is Enhanced Care Management (ECM)? | FQHC Guide to CalAIM's Biggest Program",
  description:
    "ECM explained: eligibility criteria, covered services, PPS billing mechanics, staffing ratios, and what it means for FQHC revenue and jobs. California FQHCs earned $800M+ from ECM in 2024. Primary sources from DHCS.",
  alternates: {
    canonical:
      "https://www.fqhctalent.com/blog/what-is-enhanced-care-management-ecm",
  },
  openGraph: {
    title: "What Is Enhanced Care Management (ECM)?",
    description:
      "ECM explained: eligibility criteria, covered services, PPS billing mechanics, staffing ratios, and what it means for FQHC revenue and jobs. California FQHCs earned $800M+ from ECM in 2024. Primary sources from DHCS.",
    url: "https://www.fqhctalent.com/blog/what-is-enhanced-care-management-ecm",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
