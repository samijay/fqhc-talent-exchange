import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Saved Jobs | FQHC Talent",
  description:
    "View and manage your saved FQHC job listings. Keep track of positions you're interested in across California's community health centers.",
  openGraph: {
    title: "Saved Jobs — FQHC Talent",
    description:
      "Your saved FQHC job listings in one place. Compare salaries, locations, and organizations.",
    url: "https://www.fqhctalent.com/saved-jobs",
  },
  alternates: { canonical: "https://www.fqhctalent.com/saved-jobs" },
  robots: { index: false, follow: true },
};

export default function SavedJobsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
