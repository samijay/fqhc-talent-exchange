import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Top 10 FQHC Interview Questions | Prepare for Community Health Interviews",
  description:
    "The 10 most common FQHC interview questions with sample answers for CHWs, care coordinators, nurses, and behavioral health staff. What community health center hiring managers actually want to hear.",
  alternates: {
    canonical:
      "https://www.fqhctalent.com/blog/top-10-fqhc-interview-questions",
  },
  openGraph: {
    title: "Top 10 FQHC Interview Questions",
    description:
      "The 10 most common FQHC interview questions with sample answers for CHWs, care coordinators, nurses, and behavioral health staff. What community health center hiring managers actually want to hear.",
    url: "https://www.fqhctalent.com/blog/top-10-fqhc-interview-questions",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
