import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Presentation | FQHC Talent",
  description:
    "FQHC Talent presentation — California's strategic intelligence platform for community health centers.",
  alternates: {
    canonical: "https://www.fqhctalent.com/presentation",
  },
};

export default function PresentationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
