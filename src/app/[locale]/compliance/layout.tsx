import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo-config";
import { FAQPageJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = pageMetadata.compliance;

const COMPLIANCE_FAQS = [
  {
    question: "What are the 19 HRSA program requirements for FQHCs?",
    answer: "HRSA requires FQHCs to meet 19 program requirements covering: needs assessment, required/additional services, clinical staffing, accessible hours/locations, sliding fee scale, quality improvement/assurance, board authority, board composition, governance, financial management, billing/collections, budget, program data reporting, scope of project, federal/state requirements, health center controlled facilities, organizational structure, contracts/subawards, and conflict of interest policies. Noncompliance can result in conditions of award or loss of Section 330 funding.",
  },
  {
    question: "How often do FQHCs receive HRSA Operational Site Visits (OSV)?",
    answer: "FQHCs receive an Operational Site Visit from HRSA approximately every 3 years. The OSV reviews compliance with all 19 program requirements. FQHCs should maintain continuous readiness by conducting internal audits and keeping documentation current rather than scrambling before a scheduled visit.",
  },
  {
    question: "What are the HIPAA requirements for FQHCs?",
    answer: "FQHCs must comply with HIPAA Privacy, Security, and Breach Notification Rules including: Business Associate Agreements with all vendors handling PHI, annual security risk assessments (45 CFR § 164.308), workforce training within 30 days of hire and annually, breach notification to affected individuals within 60 days, and maintaining 6 years of HIPAA compliance documentation.",
  },
  {
    question: "Can FQHCs bill two encounters on the same day?",
    answer: "Under Medicare PPS, FQHCs can bill 2 encounters on the same day if the patient sees two different providers for two different services (e.g., medical + behavioral health). Under Medi-Cal, generally only 1 PPS encounter per day is allowed, though some managed care plans may allow exceptions. FQHCs cannot bill 'incident-to' like private practices.",
  },
  {
    question: "What is the False Claims Act penalty for FQHCs?",
    answer: "The Federal False Claims Act (31 USC § 3729-3733) imposes penalties of $13,946 to $27,894 per false claim plus treble damages (3× the overpayment). Common FQHC false claims include: billing incident-to, billing without face-to-face encounters, upcoding E/M levels, and 340B duplicate discounts. Whistleblowers receive 15-30% of recovered funds.",
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <FAQPageJsonLd faqs={COMPLIANCE_FAQS} />
      <BreadcrumbJsonLd
        items={[
          { name: "FQHC Talent", url: "https://www.fqhctalent.com" },
          { name: "Compliance", url: "https://www.fqhctalent.com/compliance" },
        ]}
      />
      {children}
    </>
  );
}
