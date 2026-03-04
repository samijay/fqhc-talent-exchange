import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join the FQHC Talent Network | Free Career Tools",
  description:
    "Join the FQHC Talent — completely free for job seekers. Access career tools, aggregated job postings, and resources for community health professionals across California.",
  openGraph: {
    title: "Join the FQHC Talent Network — Free Career Tools",
    description: "Free career tools and resources for community health professionals.",
    url: "https://www.fqhctalent.com/join",
  },
  alternates: { canonical: "https://www.fqhctalent.com/join" },
};

export default function JoinLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
