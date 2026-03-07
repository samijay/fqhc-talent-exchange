import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FQHC Funding Crisis 2026 — HR 1 Medicaid Cuts & California Impact Tracker",
  description:
    "Live tracker: $4.6B in FQHC funding threatened, LA County hospital closure possible, CalAIM waiver expiring Dec 2026. Updated weekly from HRSA, NACHC, KFF.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
