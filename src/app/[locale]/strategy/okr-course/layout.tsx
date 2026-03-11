import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo-config";
import { CourseJsonLd, BreadcrumbJsonLd, FAQPageJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = pageMetadata.okrCourse;

const OKR_COURSE_FAQS = [
  {
    question: "What are OKRs and how do they work?",
    answer: "OKRs (Objectives and Key Results) are a goal-setting framework where an Objective is a qualitative, ambitious description of what you want to achieve, and Key Results are 2-5 measurable outcomes that indicate whether the objective is being met. OKRs are typically set quarterly and scored on a 0-1.0 scale, with 0.7 considered successful.",
  },
  {
    question: "How long does the FQHC OKR course take?",
    answer: "The course takes approximately 45 minutes to complete across 6 interactive modules. Each module includes concept cards, exercises, and a scoring simulator. The capstone at the end lets you write real OKRs for your FQHC and get AI-powered critique on measurability, ambition, and alignment.",
  },
  {
    question: "Is the OKR course free?",
    answer: "Yes, the entire OKR course is completely free. It includes 6 modules, interactive exercises, scoring simulators, and an AI-powered capstone critique. The course is available in both English and Spanish.",
  },
  {
    question: "What is the difference between OKRs and KPIs?",
    answer: "KPIs (Key Performance Indicators) measure ongoing operational health — they track what you're already doing. OKRs drive change — they define what you want to achieve next. Example: a KPI might be 'patient no-show rate' (monitoring), while an OKR key result might be 'reduce no-show rate from 22% to 15% by Q2' (driving improvement).",
  },
  {
    question: "How can my FQHC team use OKRs together?",
    answer: "Use the Team OKR Sprint — a free 4-session async sprint where your executive team builds real OKRs together. Session 1 aligns on strategic priorities, Session 2 drafts objectives, Session 3 is a peer workshop for feedback, and Session 4 runs an AI readiness assessment to check measurability, alignment, and coverage.",
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CourseJsonLd
        name="Master OKRs for Your FQHC"
        description="Free 6-module OKR course for FQHC executives with interactive exercises, scoring simulators, and AI-powered capstone critique."
        url="https://www.fqhctalent.com/strategy/okr-course"
        duration="PT45M"
        inLanguage={["en", "es"]}
      />
      <FAQPageJsonLd faqs={OKR_COURSE_FAQS} />
      <BreadcrumbJsonLd
        items={[
          { name: "FQHC Talent", url: "https://www.fqhctalent.com" },
          { name: "Strategy", url: "https://www.fqhctalent.com/strategy/okrs" },
          { name: "OKR Course", url: "https://www.fqhctalent.com/strategy/okr-course" },
        ]}
      />
      {children}
    </>
  );
}
