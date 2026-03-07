import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Working at the Top of Your Scope at an FQHC | Career & Revenue Impact",
  description:
    "How to work at the top of your license at a California FQHC — NP independent practice, MA delegation, RN co-visits, CHW scope expansion. Regulatory rules, revenue impact, and career growth implications.",
  alternates: {
    canonical:
      "https://www.fqhctalent.com/blog/working-at-top-of-scope-fqhc",
  },
  openGraph: {
    title: "Working at Top of Scope at an FQHC",
    description:
      "How to work at the top of your license at a California FQHC — NP independent practice, MA delegation, RN co-visits, CHW scope expansion. Regulatory rules, revenue impact, and career growth implications.",
    url: "https://www.fqhctalent.com/blog/working-at-top-of-scope-fqhc",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
