import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo-config";
import { CourseJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = pageMetadata.okrCourse;

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
