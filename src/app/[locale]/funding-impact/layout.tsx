import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "$4.6 Billion in FQHC Funding at Risk — Every Deadline, Every Cut, One Tracker (2026)",
  description:
    "Every funding cliff threatening California FQHCs in one place: $911B Medicaid cuts (H.R. 1), CalAIM waiver expiring Dec 2026, PPS elimination July 2026. Revenue strategies and deadline countdown for 220 health centers.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
