import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Medi-Cal Funding Cuts & Community Health Workers | What You Need to Know",
  description:
    "How H.R. 1 Medicaid cuts and CalAIM changes affect FQHC jobs and wages in California. Roles at risk, protected programs, and what community health workers should do now.",
  alternates: {
    canonical:
      "https://www.fqhctalent.com/blog/medi-cal-funding-cuts-community-health-workers",
  },
  openGraph: {
    title: "Medi-Cal Funding Cuts Impact on CHWs",
    description:
      "How H.R. 1 Medicaid cuts and CalAIM changes affect FQHC jobs and wages in California. Roles at risk, protected programs, and what community health workers should do now.",
    url: "https://www.fqhctalent.com/blog/medi-cal-funding-cuts-community-health-workers",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
