import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free FQHC Job Posting Builder | FQHC Talent Exchange",
  description:
    "Create professional, FQHC-optimized job postings with salary benchmarks, screening questions, and bilingual (EN/ES) output. Free for all Federally Qualified Health Centers.",
  openGraph: {
    title: "Free FQHC Job Posting Builder — FQHC Talent Exchange",
    description:
      "Create professional, FQHC-optimized job postings with salary benchmarks and bilingual output. Attract candidates with co-visit, care management, and revenue recovery experience.",
    url: "https://fqhctalent.com/job-posting-builder",
  },
  alternates: { canonical: "https://fqhctalent.com/job-posting-builder" },
};

export default function JobPostingBuilderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
