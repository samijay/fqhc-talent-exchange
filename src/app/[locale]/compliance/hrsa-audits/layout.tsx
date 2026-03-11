import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo-config";
import { HowToJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = pageMetadata.complianceHrsaAudits;

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HowToJsonLd
        name="How to Prepare for an HRSA Operational Site Visit (OSV)"
        description="Step-by-step guide for FQHC compliance officers to prepare for HRSA's Operational Site Visit covering all 19 program requirements."
        totalTime="PT160H"
        steps={[
          { name: "Conduct needs assessment review", text: "Verify your needs assessment is current (within 3 years), reflects the community served, and documents health disparities. Map UDS data to community demographics." },
          { name: "Audit required and additional services", text: "Confirm all required primary care services are available directly or through formal referral agreements. Document in-scope vs. out-of-scope services." },
          { name: "Verify clinical staffing compliance", text: "Ensure privileging and credentialing files are complete for all providers. Review CMO/medical director oversight documentation." },
          { name: "Review sliding fee schedule", text: "Confirm sliding fee discount program covers all in-scope services. Verify patients at/below 100% FPL pay nominal fees and the schedule has current FPL thresholds." },
          { name: "Prepare board governance documentation", text: "Verify board composition (51%+ patient majority), meeting minutes, authority documentation, and conflict of interest policies are current." },
          { name: "Complete financial management review", text: "Prepare annual audit, A-133 single audit if applicable, and verify financial policies cover procurement, travel, and cost allocation." },
          { name: "Run mock site visit", text: "Conduct an internal mock OSV using HRSA's compliance manual. Score each of the 19 requirements and create a remediation plan for any gaps." },
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "FQHC Talent", url: "https://www.fqhctalent.com" },
          { name: "Compliance", url: "https://www.fqhctalent.com/compliance" },
          { name: "HRSA Audits & OSV", url: "https://www.fqhctalent.com/compliance/hrsa-audits" },
        ]}
      />
      {children}
    </>
  );
}
