import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FQHC Career Assessment Guide | Discover Your Path in Community Health",
  description:
    "How to use behavioral assessments to find your ideal FQHC role. Understand the 5 behavioral domains and get personalized career guidance for community health workers in California.",
  alternates: {
    canonical:
      "https://www.fqhctalent.com/blog/fqhc-career-insights-assessment",
  },
  openGraph: {
    title: "FQHC Career Assessment Guide",
    description:
      "How to use behavioral assessments to find your ideal FQHC role. Understand the 5 behavioral domains and get personalized career guidance for community health workers in California.",
    url: "https://www.fqhctalent.com/blog/fqhc-career-insights-assessment",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
