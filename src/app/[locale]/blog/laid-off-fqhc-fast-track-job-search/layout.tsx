import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Laid Off from an FQHC? Fast-Track Job Search Guide for Community Health Workers",
  description:
    "What to do immediately after a community health center layoff — WARN Act rights, free career tools, resume tips, NHSC loan repayment status, and how to land your next FQHC role faster.",
  alternates: {
    canonical:
      "https://www.fqhctalent.com/blog/laid-off-fqhc-fast-track-job-search",
  },
  openGraph: {
    title: "Laid Off From an FQHC? Your Next Steps",
    description:
      "What to do immediately after a community health center layoff — WARN Act rights, free career tools, resume tips, NHSC loan repayment status, and how to land your next FQHC role faster.",
    url: "https://www.fqhctalent.com/blog/laid-off-fqhc-fast-track-job-search",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
