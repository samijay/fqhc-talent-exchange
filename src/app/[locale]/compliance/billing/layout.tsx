import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo-config";
import { FAQPageJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = pageMetadata.complianceBilling;

const BILLING_FAQS = [
  {
    question: "Can FQHCs bill two PPS encounters on the same day?",
    answer: "Under Medicare, yes — if the patient sees two different providers for two different qualifying services (e.g., medical + behavioral health). Under Medi-Cal, generally only 1 PPS encounter per day is allowed, though some managed care plans may allow exceptions. FQHCs cannot bill 'incident-to' like private practices.",
  },
  {
    question: "What is the False Claims Act penalty for FQHC billing fraud?",
    answer: "The Federal False Claims Act imposes penalties of $13,946 to $27,894 per false claim plus treble damages (3× the overpayment). Common violations include billing without face-to-face encounters, upcoding E/M levels, incident-to billing (prohibited for FQHCs), and 340B duplicate discounts. Self-disclosure to OIG dramatically reduces penalties.",
  },
  {
    question: "What documentation is required for FQHC billing compliance?",
    answer: "Every visit note must include: History of Present Illness (HPI), Review of Systems, Physical Exam findings, Assessment/Diagnosis, and Treatment Plan. E/M level must match documentation complexity. Time-based billing requires documenting total time and what was discussed. Copy-forward notes are an audit red flag.",
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <FAQPageJsonLd faqs={BILLING_FAQS} />
      <BreadcrumbJsonLd
        items={[
          { name: "FQHC Talent", url: "https://www.fqhctalent.com" },
          { name: "Compliance", url: "https://www.fqhctalent.com/compliance" },
          { name: "Billing & Fraud Prevention", url: "https://www.fqhctalent.com/compliance/billing" },
        ]}
      />
      {children}
    </>
  );
}
