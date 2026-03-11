import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo-config";
import { FAQPageJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = pageMetadata.complianceHipaa;

const HIPAA_FAQS = [
  {
    question: "What is required in a HIPAA Business Associate Agreement (BAA)?",
    answer: "Every vendor that creates, receives, maintains, or transmits Protected Health Information (PHI) must sign a BAA before receiving any patient data. This includes EHR vendors, clearinghouses, cloud storage providers, billing services, and telehealth platforms. A missing BAA is an automatic HIPAA violation if that vendor experiences a breach.",
  },
  {
    question: "How quickly must FQHCs report a HIPAA breach?",
    answer: "FQHCs must notify affected individuals within 60 days of discovering a breach. If 500+ individuals are affected in a state, prominent media outlets must also be notified. All breaches must be reported to HHS OCR via their breach portal. Breaches affecting fewer than 500 individuals must be logged and reported annually by March 1.",
  },
  {
    question: "What is the most common HIPAA violation at FQHCs?",
    answer: "The most common HIPAA violation for FQHCs is failure to conduct an annual Security Risk Assessment as required by 45 CFR § 164.308(a)(1). The assessment must cover all systems containing ePHI, physical security, workforce practices, and encryption status. FQHCs can use the free HHS SRA Tool or hire an external auditor.",
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <FAQPageJsonLd faqs={HIPAA_FAQS} />
      <BreadcrumbJsonLd
        items={[
          { name: "FQHC Talent", url: "https://www.fqhctalent.com" },
          { name: "Compliance", url: "https://www.fqhctalent.com/compliance" },
          { name: "HIPAA & Privacy", url: "https://www.fqhctalent.com/compliance/hipaa" },
        ]}
      />
      {children}
    </>
  );
}
