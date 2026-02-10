import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apply for Early Access | Free FQHC Job Placement",
  description:
    "Join the FQHC Talent Exchange waitlist — completely free for job seekers. Get matched with community health centers hiring across California.",
  openGraph: {
    title: "Apply for Early Access — FQHC Talent Exchange",
    description: "Free job placement for community health professionals.",
    url: "https://fqhctalent.com/join",
  },
  alternates: { canonical: "https://fqhctalent.com/join" },
};

export default function JoinLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
