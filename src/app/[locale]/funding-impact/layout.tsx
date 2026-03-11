import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FQHC Funding Crisis 2026: $4.6B at Risk — H.R. 1 Medicaid Cuts & CalAIM Waiver Tracker",
  description:
    "Live tracker: $911B in Medicaid cuts (H.R. 1), CalAIM 1115 waiver expiring Dec 2026, PPS elimination for UIS patients July 2026. Revenue strategies, policy deadlines, and impact modeling for 214 California FQHCs. Updated weekly.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
