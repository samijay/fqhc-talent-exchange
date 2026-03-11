import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo-config";
import { CourseJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = pageMetadata.okrTeamSprint;

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CourseJsonLd
        name="Team OKR Sprint for FQHC Executives"
        description="Free 4-session async sprint where executive teams build real OKRs together with AI readiness assessment."
        url="https://www.fqhctalent.com/strategy/okr-team-sprint"
        duration="PT120M"
        inLanguage={["en", "es"]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "FQHC Talent", url: "https://www.fqhctalent.com" },
          { name: "Strategy", url: "https://www.fqhctalent.com/strategy/okrs" },
          { name: "Team OKR Sprint", url: "https://www.fqhctalent.com/strategy/okr-team-sprint" },
        ]}
      />
      {children}
    </>
  );
}
