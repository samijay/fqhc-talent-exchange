import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo-config";
import { TeamReadinessAssessment } from "@/components/team-readiness/TeamReadinessAssessment";

export const metadata: Metadata = pageMetadata.teamReadiness;

export default function TeamReadinessPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-stone-50 to-white">
      <TeamReadinessAssessment />
    </main>
  );
}
