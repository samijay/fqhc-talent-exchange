import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Personalize Your Newsletter — FQHC Talent Exchange",
  description:
    "Tell us your role and challenges so we can send you the most relevant FQHC intelligence — targeted to your region, role, and priorities.",
  robots: { index: false, follow: false }, // Don't index questionnaire in search
};

export default function QuestionnaireLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
