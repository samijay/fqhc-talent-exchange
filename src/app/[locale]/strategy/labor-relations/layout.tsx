import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "FQHC Labor Relations Monitor — Strategic Intelligence for Health Center Leaders",
  description:
    "Track NLRB cases, ballot measures, contract negotiations, and organizing drives affecting California FQHCs. Labor-friendly strategies for operational leaders. Updated daily.",
  openGraph: {
    title: "FQHC Labor Relations Monitor",
    description:
      "Track active labor cases, union dynamics, and paths forward for California's 220+ community health centers.",
    url: "https://www.fqhctalent.com/strategy/labor-relations",
  },
  alternates: {
    canonical: "https://www.fqhctalent.com/strategy/labor-relations",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
