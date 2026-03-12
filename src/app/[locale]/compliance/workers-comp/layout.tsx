import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Workers' Compensation Cost Reduction | FQHC Talent Exchange",
  description: "Reduce FQHC workers' comp costs with California-specific hazard data, prevention strategies, cost calculators, and real case studies. Cal/OSHA compliance included.",
  keywords: [
    "workers compensation",
    "FQHC",
    "Cal-OSHA",
    "workplace safety",
    "healthcare",
    "California",
    "cost reduction",
    "safety prevention",
  ],
  openGraph: {
    title: "Workers' Compensation Cost Reduction | FQHC Talent Exchange",
    description:
      "Reduce FQHC workers' comp costs with California-specific hazard data, prevention strategies, and real case studies.",
    url: "https://www.fqhctalent.com/compliance/workers-comp",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "FQHC Talent", url: "https://www.fqhctalent.com" },
          { name: "Compliance", url: "https://www.fqhctalent.com/compliance" },
          {
            name: "Workers' Compensation",
            url: "https://www.fqhctalent.com/compliance/workers-comp",
          },
        ]}
      />
      {children}
    </>
  );
}
