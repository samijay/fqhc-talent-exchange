import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join the FQHC Talent Network | Free Job Placement",
  description:
    "Join the FQHC Talent Exchange — completely free for job seekers. Get matched with community health centers hiring across California.",
  openGraph: {
    title: "Join the FQHC Talent Network — Free Job Placement",
    description: "Free job placement for community health professionals.",
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
