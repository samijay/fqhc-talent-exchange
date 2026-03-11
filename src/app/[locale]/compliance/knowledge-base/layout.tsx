import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo-config";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = pageMetadata.complianceKnowledgeBase;

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "FQHC Talent", url: "https://www.fqhctalent.com" },
          { name: "Compliance", url: "https://www.fqhctalent.com/compliance" },
          { name: "Knowledge Base", url: "https://www.fqhctalent.com/compliance/knowledge-base" },
        ]}
      />
      {children}
    </>
  );
}
