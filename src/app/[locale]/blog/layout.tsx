import type { Metadata } from "next";
import { ReadingProgress } from "@/components/blog/ReadingProgress";

export const metadata: Metadata = {
  title: "FQHC Blog — Career Insights & Industry Intelligence",
  description: "Expert articles on FQHC careers, salary negotiation, interview prep, AI adoption, and policy updates. Bilingual EN/ES. Updated weekly.",
  alternates: {
    canonical: "https://www.fqhctalent.com/blog",
  },
  openGraph: {
    title: "FQHC Blog — Career Insights & Intelligence",
    description: "Expert articles on FQHC careers, salaries, AI, and policy. Bilingual.",
    url: "https://www.fqhctalent.com/blog",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ReadingProgress />
      {children}
    </>
  );
}
