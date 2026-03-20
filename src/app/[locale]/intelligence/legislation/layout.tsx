import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FQHC Legislative Tracker | Bills Affecting Funding & Workforce | FQHC Talent",
  description:
    "Track federal and California legislation affecting FQHCs — H.R. 1 Medicaid cuts, CHCF reauthorization, SB 525, CalAIM, and workforce policy updates.",
  alternates: {
    canonical: "https://www.fqhctalent.com/intelligence/legislation",
  },
};

export default function LegislationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
