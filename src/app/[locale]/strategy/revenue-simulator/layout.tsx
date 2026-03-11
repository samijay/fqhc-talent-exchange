import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Revenue Impact Simulator | FQHC Talent Exchange",
  description:
    "Model revenue scenarios for your California FQHC. Explore the impact of federal funding changes, 340B pharmacy optimization, top-of-scope staffing, and turnover reduction — with real data and instant results.",
  openGraph: {
    title: "Revenue Impact Simulator | FQHC Talent Exchange",
    description:
      "What if federal funding drops 20%? What if you optimize 340B? Explore revenue scenarios for your California FQHC.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
