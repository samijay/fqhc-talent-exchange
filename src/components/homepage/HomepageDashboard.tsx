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

/* ================================================================== */
/*  Types                                                              */
/* ================================================================== */

/** All data the homepage needs, pre-computed on the server */
export interface HomepageData {
  totalFQHCs: number;
  totalJobs: number;
  totalOrgs: number;
  totalIntel: number;
  nextCliff: FundingCliff | null;
  topIntelHeadline: { en: string; es: string };
  topIntelSource: string;
}

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

      {/* 2. For FQHC Leaders */}
      <LeaderPathSection
        nextCliff={data.nextCliff}
        topIntelHeadline={data.topIntelHeadline}
        topIntelSource={data.topIntelSource}
        totalFQHCs={data.totalFQHCs}
      />

      {/* 3. For Job Seekers */}
      <JobSeekerPathSection
        totalJobs={data.totalJobs}
        totalOrgs={data.totalOrgs}
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
