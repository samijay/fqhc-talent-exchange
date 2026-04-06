import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Advocacy Watch — Tracking Actions to Protect FQHC Funding",
  description:
    "Track legislation, ballot initiatives, coalition actions, and legal rulings fighting Medicaid and Medi-Cal cuts. Follow-up dates, outcomes, and tools for California FQHCs.",
  openGraph: {
    title: "Advocacy Watch — Tracking Actions to Protect FQHC Funding",
    description:
      "Track legislation, ballot initiatives, coalition actions, and legal rulings fighting Medicaid and Medi-Cal cuts.",
    url: "https://www.fqhctalent.com/strategy/advocacy",
  },
  alternates: {
    canonical: "https://www.fqhctalent.com/strategy/advocacy",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
