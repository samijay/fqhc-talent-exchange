import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Request Priority Access | FQHC Recruitment Solutions",
  description:
    "Request access to FQHC Talent Exchange. We specialize in placing community health workers, care coordinators, and behavioral health specialists at FQHCs across California.",
  openGraph: {
    title: "Request Priority Access — FQHC Talent Exchange",
    description:
      "FQHC recruitment solutions for community health centers.",
    url: "https://fqhctalent.com/hire",
  },
  alternates: { canonical: "https://fqhctalent.com/hire" },
};

export default function HireLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
