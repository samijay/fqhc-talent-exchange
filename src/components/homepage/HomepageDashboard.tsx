// FQHC Talent — Homepage (Focused Landing Page)
"use client";

import { useAuth } from "@/components/auth/AuthProvider";
import { ExecutiveDashboard } from "./ExecutiveDashboard";
import { JobSeekerDashboard } from "./JobSeekerDashboard";
import { HeroSection } from "./HeroSection";
import { LeaderPathSection } from "./LeaderPathSection";
import { JobSeekerPathSection } from "./JobSeekerPathSection";
import { TrustStrip } from "./TrustStrip";
import { NewsletterCTASection } from "./NewsletterCTASection";
import type { FundingCliff } from "@/lib/market-intelligence";
import type { IntelBriefItem } from "@/components/intel/IntelBriefPDF";

/* ================================================================== */
/*  Types                                                              */
/* ================================================================== */

/** All data the homepage needs, pre-computed on the server */
export interface HomepageData {
  totalFQHCs: number;
  totalJobs: number;
  totalOrgs: number;
  totalIntel: number;
  totalSalaryRoles: number;
  nextCliff: FundingCliff | null;
  topIntelHeadline: { en: string; es: string };
  topIntelSource: string;
  /** Serialized intel items for PDF export */
  intelBriefItems: IntelBriefItem[];
  /** Advocacy watch — upcoming actions with follow-up dates */
  advocacyItems?: {
    id: string;
    headline: { en: string; es: string };
    status: string;
    followUpDate: string | null;
    region: string;
  }[];
  advocacyCounts?: { total: number; active: number; pendingVote: number; upcoming: number };
}

/* ================================================================== */
/*  Advocacy Watch Strip                                               */
/* ================================================================== */
/*  Component                                                          */
/* ================================================================== */

export function HomepageDashboard({ data }: { data: HomepageData }) {
  const { user, profile } = useAuth();
  const isExecutive = profile?.role === "executive" || profile?.role === "manager";

  return (
    <div className="min-h-screen">
      {/* Personalized dashboards for logged-in users */}
      {user && isExecutive && <ExecutiveDashboard />}
      {user && !isExecutive && <JobSeekerDashboard />}

      {/* 1. Hero with two-path CTA split */}
      <HeroSection
        totalFQHCs={data.totalFQHCs}
        totalJobs={data.totalJobs}
        totalIntel={data.totalIntel}
      />

      {/* 2. For FQHC Leaders + Advocacy Watch (same audience) */}
      <LeaderPathSection
        nextCliff={data.nextCliff}
        topIntelHeadline={data.topIntelHeadline}
        topIntelSource={data.topIntelSource}
        totalFQHCs={data.totalFQHCs}
        intelBriefItems={data.intelBriefItems}
        advocacyItems={data.advocacyItems}
        advocacyCounts={data.advocacyCounts}
      />

      {/* 3. For Community Health Professionals */}
      <JobSeekerPathSection
        totalJobs={data.totalJobs}
        totalOrgs={data.totalOrgs}
        totalSalaryRoles={data.totalSalaryRoles}
      />

      {/* 4. Trust strip */}
      <TrustStrip
        totalFQHCs={data.totalFQHCs}
        totalJobs={data.totalJobs}
        totalIntel={data.totalIntel}
      />

      {/* 5. Newsletter CTA */}
      <NewsletterCTASection />

      {/* Data disclaimer */}
      <div className="bg-stone-50 px-4 py-4 text-center text-xs text-stone-400">
        Data aggregated from HRSA, BLS, CA EDD WARN Act, DHCS, and FQHC job postings. Updated March 2026.
      </div>
    </div>
  );
}
