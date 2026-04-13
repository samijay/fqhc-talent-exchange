import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Progress | FQHC Talent",
  description:
    "Track your progress across FQHC career tools. Resume builder, interview prep, academy courses, and more.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
