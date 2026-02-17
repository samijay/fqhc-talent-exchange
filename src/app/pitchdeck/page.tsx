"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Heart,
  ChevronLeft,
  ChevronRight,
  Users,
  Briefcase,
  Building2,
  TrendingUp,
  Shield,
  Zap,
  DollarSign,
  BarChart3,
  Target,
  ArrowRight,
  Globe,
  FileText,
  Brain,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Star,
  XCircle,
  Search,
  Layers,
  Mail,
  Calendar,
  Rocket,
  Filter,
  Award,
  BookOpen,
} from "lucide-react";
import {
  getMarketOverview,
  getRegionalSnapshots,
  getRoleDemand,
} from "@/lib/market-intelligence";

/* ------------------------------------------------------------------ */
/*  Data (computed once at module level)                                */
/* ------------------------------------------------------------------ */
const overview = getMarketOverview();
const regions = getRegionalSnapshots();
const roles = getRoleDemand();
const hotRoles = roles.filter((r) => r.demandSignal === "hot").length;

/* ------------------------------------------------------------------ */
/*  Slide types                                                        */
/* ------------------------------------------------------------------ */
interface Slide {
  id: string;
  title: string;
  content: React.ReactNode;
}

function SlideWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[70vh] flex-col justify-center px-6 py-10 sm:px-10 md:px-16 lg:px-20">
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  All 16 slides matching PDF template                                */
/* ------------------------------------------------------------------ */
const slides: Slide[] = [
  /* ================================================================ */
  /*  Slide 1: Title                                                   */
  /* ================================================================ */
  {
    id: "title",
    title: "Title",
    content: (
      <SlideWrapper>
        <div className="text-center">
          <div className="mb-6 inline-flex items-center gap-3">
            <Heart className="size-12 fill-teal-700 text-teal-700" />
            <span className="text-4xl font-extrabold tracking-tight text-stone-900 sm:text-5xl">
              FQHC <span className="text-teal-700">Talent Exchange</span>
            </span>
          </div>

          <p className="mx-auto mt-4 max-w-2xl text-base font-medium text-stone-600">
            Strengthening California&apos;s safety-net workforce by connecting
            mission-driven health professionals with FQHCs — faster, smarter,
            and with the cultural fit that matters.
          </p>
          <p className="mt-4 text-sm font-medium text-stone-400">
            MVP Business Plan &middot; February 2026
          </p>

          <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { value: `${overview.totalFQHCs}`, label: "CA FQHCs Tracked" },
              { value: `${overview.totalJobs}+`, label: "Active Job Listings" },
              { value: `${regions.length}`, label: "Regions Covered" },
              { value: "EN/ES", label: "Fully Bilingual" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl bg-teal-50 p-4">
                <p className="text-2xl font-extrabold text-teal-700">{stat.value}</p>
                <p className="mt-1 text-xs font-medium text-stone-500">{stat.label}</p>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-10 max-w-2xl text-base text-stone-500">
            <strong>Mission:</strong> To strengthen California&apos;s safety-net workforce by connecting
            mission-driven health professionals with FQHCs — faster, smarter, and with the
            cultural fit that matters.
          </p>
        </div>
      </SlideWrapper>
    ),
  },

  /* ================================================================ */
  /*  Slide 2: The FQHC Staffing Crisis                                */
  /* ================================================================ */
  {
    id: "crisis",
    title: "Crisis",
    content: (
      <SlideWrapper>
        <h2 className="mb-2 text-sm font-bold uppercase tracking-widest text-red-600">
          The Problem
        </h2>
        <h3 className="text-3xl font-bold text-stone-900 sm:text-4xl">
          The FQHC Staffing Crisis
        </h3>
        <p className="mt-3 max-w-2xl text-stone-600">
          Community health centers serve 1 in 10 Americans but can&apos;t keep
          their teams staffed.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { value: "70%+", label: "Facing Critical Shortages", desc: "of FQHCs report physician, nurse, and behavioral health vacancies", color: "text-red-600 bg-red-50" },
            { value: "32%", label: "Annual Staff Turnover", desc: "Turnover in key FQHC roles — double the national healthcare average", color: "text-amber-600 bg-amber-50" },
            { value: "8,200+", label: "Annual Hires Needed (CA)", desc: "California FQHCs must fill 8,200+ positions yearly to maintain current service levels", color: "text-teal-600 bg-teal-50" },
            { value: "$7-9K", label: "Cost Per Day Per Vacancy", desc: "Revenue lost per unfilled provider position from missed patient visits", color: "text-red-600 bg-red-50" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-stone-200 bg-white p-5">
              <p className={`text-3xl font-extrabold ${stat.color.split(" ")[0]}`}>{stat.value}</p>
              <p className="mt-1 text-sm font-bold text-stone-800">{stat.label}</p>
              <p className="mt-2 text-xs leading-relaxed text-stone-500">{stat.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-xl border-2 border-red-200 bg-red-50 p-5">
          <h4 className="flex items-center gap-2 text-sm font-bold text-red-700">
            <AlertTriangle className="size-4" />
            The Perfect Storm
          </h4>
          <p className="mt-2 text-sm leading-relaxed text-stone-700">
            H.R. 1 Medicaid cuts + Medi-Cal PPS rate elimination (Oct 2026) + CalAIM waiver
            uncertainty + SB 525 minimum wage increase = FQHCs simultaneously losing revenue
            and needing to pay more. The staffing crisis is accelerating.
          </p>
        </div>
      </SlideWrapper>
    ),
  },

  /* ================================================================ */
  /*  Slide 3: Why Existing Solutions Fail                             */
  /* ================================================================ */
  {
    id: "competitors",
    title: "Competitors",
    content: (
      <SlideWrapper>
        <h2 className="mb-2 text-sm font-bold uppercase tracking-widest text-teal-600">
          Competitive Landscape
        </h2>
        <h3 className="text-3xl font-bold text-stone-900 sm:text-4xl">
          Why Existing Solutions Fail
        </h3>

        <div className="mt-10 overflow-hidden rounded-xl border border-stone-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-stone-50 text-left">
                <th className="px-4 py-3 font-semibold text-stone-700">Solution</th>
                <th className="px-4 py-3 font-semibold text-stone-700">What They Do</th>
                <th className="px-4 py-3 font-semibold text-stone-700">Why It Fails for FQHCs</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {[
                {
                  name: "Indeed / LinkedIn",
                  does: "Generic job boards with broad healthcare listings",
                  fails: "500+ unqualified applicants per post. No FQHC filters (EHR, programs, mission fit). HR teams drown in volume.",
                },
                {
                  name: "Traditional Recruiters",
                  does: "Agency staffing at 20-25% of first-year salary",
                  fails: "Cost $15-25K per placement. Don't understand FQHC pay scales, programs, or cultural requirements.",
                },
                {
                  name: "NACHC Job Board",
                  does: "National health center job postings",
                  fails: "Job board only — no matching, no assessment, no market intelligence. Passive listing, not active placement.",
                },
                {
                  name: "AMN / CHG (Locum Firms)",
                  does: "Temporary clinical staffing",
                  fails: "Temporary workers at 2-3x cost. No cultural fit assessment. Workers leave when contract ends.",
                },
              ].map((row) => (
                <tr key={row.name}>
                  <td className="whitespace-nowrap px-4 py-3 font-semibold text-stone-900">{row.name}</td>
                  <td className="px-4 py-3 text-stone-600">{row.does}</td>
                  <td className="px-4 py-3 text-stone-600">{row.fails}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 rounded-xl bg-teal-50 p-5">
          <h4 className="flex items-center gap-2 text-sm font-bold text-teal-700">
            <Star className="size-4 fill-teal-700" />
            Our Differentiator
          </h4>
          <p className="mt-2 text-sm leading-relaxed text-stone-700">
            <strong>FQHC Talent Exchange</strong> is the only platform that combines FQHC-specific
            AI matching, behavioral assessment, market intelligence, and weekly curated candidate
            delivery — at 50-70% less than traditional recruiters.
          </p>
        </div>
      </SlideWrapper>
    ),
  },

  /* ================================================================ */
  /*  Slide 4: Introducing the Talent Drop                             */
  /* ================================================================ */
  {
    id: "talent-drop",
    title: "Talent Drop",
    content: (
      <SlideWrapper>
        <h2 className="mb-2 text-sm font-bold uppercase tracking-widest text-amber-600">
          Revenue Engine
        </h2>
        <h3 className="text-3xl font-bold text-stone-900 sm:text-4xl">
          The Talent Drop: Our MVP Revenue Model
        </h3>
        <p className="mt-3 max-w-2xl text-lg text-stone-600">
          One key feature of the platform — a weekly curated batch of pre-assessed,
          role-matched candidates delivered every Wednesday at 9 AM.
        </p>

        <div className="mt-10 grid gap-1 sm:grid-cols-4">
          {[
            {
              step: "1",
              icon: FileText,
              title: "Candidates Build Profiles",
              desc: "Free resume builder, career assessment, EHR/program/language data collected",
              color: "bg-teal-700",
            },
            {
              step: "2",
              icon: Brain,
              title: "AI Scores & Matches",
              desc: "5-domain behavioral assessment + hard filters (EHR, certs, language, region) = match score",
              color: "bg-teal-600",
            },
            {
              step: "3",
              icon: Mail,
              title: "Wednesday 9AM Drop",
              desc: "Employers receive 3-5 curated candidates per open role, ranked by match score",
              color: "bg-amber-500",
            },
            {
              step: "4",
              icon: Calendar,
              title: "Employers Claim by Friday",
              desc: "Review profiles, request intros, schedule interviews. Unclaimed candidates roll to next week.",
              color: "bg-teal-700",
            },
          ].map((item) => (
            <div key={item.step} className="relative rounded-xl border border-stone-200 bg-white p-5 text-center">
              <div className={`mx-auto mb-3 flex size-12 items-center justify-center rounded-full ${item.color} text-white`}>
                <item.icon className="size-6" />
              </div>
              <span className="mb-2 inline-block rounded-full bg-stone-100 px-2 py-0.5 text-xs font-bold text-stone-600">
                Step {item.step}
              </span>
              <h4 className="mt-1 text-sm font-bold text-stone-900">{item.title}</h4>
              <p className="mt-2 text-xs leading-relaxed text-stone-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </SlideWrapper>
    ),
  },

  /* ================================================================ */
  /*  Slide 5: Why the Weekly Drop Changes Everything                   */
  /* ================================================================ */
  {
    id: "weekly-drop",
    title: "Weekly Drop",
    content: (
      <SlideWrapper>
        <h2 className="mb-2 text-sm font-bold uppercase tracking-widest text-teal-600">
          Why It Works
        </h2>
        <h3 className="text-3xl font-bold text-stone-900 sm:text-4xl">
          Why the Weekly Drop Changes Everything
        </h3>

        <div className="mt-10 space-y-4">
          {[
            {
              icon: Zap,
              title: "Urgency Creates Action",
              desc: "Friday claim deadline forces fast decisions. No more months-long requisitions sitting open.",
              color: "text-amber-600 bg-amber-50",
            },
            {
              icon: Filter,
              title: "No Overload",
              desc: "3-5 curated candidates per role, not 500 unfiltered applicants. HR teams can actually review every profile.",
              color: "text-teal-600 bg-teal-50",
            },
            {
              icon: TrendingUp,
              title: "Feedback Loop = Moat",
              desc: "Every claim/pass/hire improves our matching algorithm. More data = better matches = more employers = more candidates. Network effect compounds weekly.",
              color: "text-purple-600 bg-purple-50",
            },
            {
              icon: Users,
              title: "Candidate Engagement",
              desc: "Candidates know their profile is being actively reviewed every week. They stay engaged, update their profiles, complete assessments — unlike passive job boards.",
              color: "text-blue-600 bg-blue-50",
            },
            {
              icon: Layers,
              title: "Tiered Value",
              desc: "Free tier: see match count. Paid tier: see full profiles + scores. Premium: exclusive first-look + priority candidates.",
              color: "text-amber-600 bg-amber-50",
            },
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-4 rounded-xl border border-stone-200 bg-white p-5">
              <div className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${item.color}`}>
                <item.icon className="size-5" />
              </div>
              <div>
                <h4 className="font-bold text-stone-900">{item.title}</h4>
                <p className="mt-1 text-sm leading-relaxed text-stone-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </SlideWrapper>
    ),
  },

  /* ================================================================ */
  /*  Slide 6: AI Matching Engine                                      */
  /* ================================================================ */
  {
    id: "ai-matching",
    title: "AI Matching",
    content: (
      <SlideWrapper>
        <h2 className="mb-2 text-sm font-bold uppercase tracking-widest text-teal-600">
          Technology
        </h2>
        <h3 className="text-3xl font-bold text-stone-900 sm:text-4xl">
          AI Matching Engine
        </h3>
        <p className="mt-3 max-w-2xl text-stone-600">
          Three-layer scoring system that goes far beyond keyword matching.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {/* Hard Filters */}
          <div className="rounded-xl border-2 border-red-200 bg-red-50/30 p-6">
            <h4 className="mb-1 text-xs font-bold uppercase tracking-wider text-red-600">
              Layer 1: Hard Filters
            </h4>
            <p className="mb-4 text-sm font-bold text-stone-900">Must-Have Requirements</p>
            <div className="space-y-2">
              {["Active license/certification", "EHR system match (Epic, NextGen, eCW)", "Geographic availability", "Language requirements", "Minimum experience years"].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-stone-700">
                  <Shield className="size-3.5 shrink-0 text-red-500" />
                  {item}
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs font-medium text-red-600">
              Pass/fail — no exceptions
            </p>
          </div>

          {/* Scored Criteria */}
          <div className="rounded-xl border-2 border-teal-200 bg-teal-50/30 p-6">
            <h4 className="mb-1 text-xs font-bold uppercase tracking-wider text-teal-600">
              Layer 2: Scored Criteria
            </h4>
            <p className="mb-4 text-sm font-bold text-stone-900">Weighted Match Scoring</p>
            <div className="space-y-2">
              {[
                "Behavioral assessment (5 domains)",
                "Program experience (ECM, CCM, CalAIM)",
                "Revenue-generation capability",
                "Bilingual proficiency depth",
                "Career trajectory alignment",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-stone-700">
                  <BarChart3 className="size-3.5 shrink-0 text-teal-600" />
                  {item}
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs font-medium text-teal-600">
              0-100 weighted score
            </p>
          </div>

          {/* Preference Match */}
          <div className="rounded-xl border-2 border-amber-200 bg-amber-50/30 p-6">
            <h4 className="mb-1 text-xs font-bold uppercase tracking-wider text-amber-600">
              Layer 3: Preference Match
            </h4>
            <p className="mb-4 text-sm font-bold text-stone-900">Cultural & Values Fit</p>
            <div className="space-y-2">
              {[
                "Mission alignment score",
                "Work style preferences",
                "Commute/remote tolerance",
                "Salary expectation fit",
                "Organization size preference",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-stone-700">
                  <Heart className="size-3.5 shrink-0 text-amber-500" />
                  {item}
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs font-medium text-amber-600">
              Satisfaction multiplier
            </p>
          </div>
        </div>

        {/* Match Score Bar */}
        <div className="mt-8 rounded-xl bg-stone-50 p-5">
          <div className="flex items-center justify-between text-sm">
            <span className="font-bold text-stone-900">Combined Match Score</span>
            <span className="font-bold text-teal-700">87/100</span>
          </div>
          <div className="mt-2 h-4 w-full overflow-hidden rounded-full bg-stone-200">
            <div className="flex h-4">
              <div className="h-4 bg-red-400" style={{ width: "25%" }} />
              <div className="h-4 bg-teal-500" style={{ width: "45%" }} />
              <div className="h-4 bg-amber-400" style={{ width: "17%" }} />
            </div>
          </div>
          <div className="mt-2 flex justify-between text-xs text-stone-500">
            <span>Hard Filters: Pass</span>
            <span>Scored: 72/80</span>
            <span>Preference: 15/20</span>
          </div>
        </div>
      </SlideWrapper>
    ),
  },

  /* ================================================================ */
  /*  Slide 7: Content-First: Build the Moat                           */
  /* ================================================================ */
  {
    id: "content-moat",
    title: "Content Moat",
    content: (
      <SlideWrapper>
        <h2 className="mb-2 text-sm font-bold uppercase tracking-widest text-teal-600">
          Growth Strategy
        </h2>
        <h3 className="text-3xl font-bold text-stone-900 sm:text-4xl">
          Content-First: Build the Moat Before You Sell
        </h3>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {[
            {
              phase: "Phase 1",
              title: "SEO Hook",
              desc: "Free tools + content attract organic traffic. Blog, FQHC directory, salary data, funding tracker — all indexable, all useful.",
              items: ["12 SEO-optimized blog articles", "90-FQHC directory with profiles", "Market intelligence dashboard", "Bilingual (EN/ES) everything"],
              color: "border-teal-300 bg-teal-50",
              badge: "bg-teal-100 text-teal-700",
              status: "Live Now",
            },
            {
              phase: "Phase 2",
              title: "Talent Drop",
              desc: "Traffic converts to profiles. Profiles feed the Talent Drop. Employers pay for curated, pre-assessed candidates.",
              items: ["Resume builder captures profiles", "Assessment creates candidate scores", "Weekly batch delivery to employers", "Feedback loop improves matching"],
              color: "border-amber-300 bg-amber-50",
              badge: "bg-amber-100 text-amber-700",
              status: "Building",
            },
            {
              phase: "Phase 3",
              title: "Platform Scale",
              desc: "Data moat deepens. More matches = better algorithm = more employers = more candidates. Winner-take-most dynamics.",
              items: ["AI matching improves with every hire", "Network effect across 90+ FQHCs", "Expand beyond California", "Talent analytics for workforce planning"],
              color: "border-purple-300 bg-purple-50",
              badge: "bg-purple-100 text-purple-700",
              status: "Vision",
            },
          ].map((phase) => (
            <div key={phase.phase} className={`rounded-xl border-2 ${phase.color} p-6`}>
              <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-bold ${phase.badge}`}>
                {phase.phase} — {phase.status}
              </span>
              <h4 className="mt-3 text-lg font-bold text-stone-900">{phase.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">{phase.desc}</p>
              <ul className="mt-4 space-y-1.5">
                {phase.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-stone-700">
                    <CheckCircle2 className="mt-0.5 size-3 shrink-0 text-teal-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </SlideWrapper>
    ),
  },

  /* ================================================================ */
  /*  Slide 8: Assessment-First Tiers                                  */
  /* ================================================================ */
  {
    id: "assessment-tiers",
    title: "Assessment",
    content: (
      <SlideWrapper>
        <h2 className="mb-2 text-sm font-bold uppercase tracking-widest text-teal-600">
          Candidate Quality
        </h2>
        <h3 className="text-3xl font-bold text-stone-900 sm:text-4xl">
          Assessment-First: Know Before You Hire
        </h3>
        <p className="mt-3 max-w-2xl text-stone-600">
          Every candidate is scored across 5 behavioral domains and placed into a readiness tier
          before employers ever see their profile.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {/* Tier A */}
          <div className="rounded-xl border-2 border-green-300 bg-green-50 p-6">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-3xl font-extrabold text-green-700">A</span>
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                ~30% of candidates
              </span>
            </div>
            <h4 className="text-lg font-bold text-stone-900">Ready Now</h4>
            <p className="mt-2 text-sm leading-relaxed text-stone-600">
              Score 80%+. Strong across all 5 domains. Can start immediately. High behavioral
              fit, verified credentials, relevant program experience.
            </p>
            <div className="mt-4 rounded-lg bg-white p-3">
              <p className="text-xs font-bold text-green-700">Employer sees:</p>
              <p className="mt-1 text-xs text-stone-600">
                Full profile, assessment scores, match explanation, salary expectations
              </p>
            </div>
          </div>

          {/* Tier B */}
          <div className="rounded-xl border-2 border-amber-300 bg-amber-50 p-6">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-3xl font-extrabold text-amber-700">B</span>
              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700">
                ~45% of candidates
              </span>
            </div>
            <h4 className="text-lg font-bold text-stone-900">Near-Ready</h4>
            <p className="mt-2 text-sm leading-relaxed text-stone-600">
              Score 60-79%. Strong in most domains but has 1-2 growth areas. May need specific
              training (e.g., new EHR system, CalAIM orientation).
            </p>
            <div className="mt-4 rounded-lg bg-white p-3">
              <p className="text-xs font-bold text-amber-700">Employer sees:</p>
              <p className="mt-1 text-xs text-stone-600">
                Profile with growth areas flagged, recommended onboarding actions
              </p>
            </div>
          </div>

          {/* Tier C */}
          <div className="rounded-xl border-2 border-stone-300 bg-stone-50 p-6">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-3xl font-extrabold text-stone-500">C</span>
              <span className="rounded-full bg-stone-200 px-3 py-1 text-xs font-bold text-stone-600">
                ~25% of candidates
              </span>
            </div>
            <h4 className="text-lg font-bold text-stone-900">Developing</h4>
            <p className="mt-2 text-sm leading-relaxed text-stone-600">
              Score below 60%. Career changers or entry-level. Need significant development.
              Routed to training resources and career pathway guidance.
            </p>
            <div className="mt-4 rounded-lg bg-white p-3">
              <p className="text-xs font-bold text-stone-600">Employer sees:</p>
              <p className="mt-1 text-xs text-stone-600">
                Not included in Talent Drop. Available in self-service search only.
              </p>
            </div>
          </div>
        </div>
      </SlideWrapper>
    ),
  },

  /* ================================================================ */
  /*  Slide 9: Pricing                                                 */
  /* ================================================================ */
  {
    id: "pricing",
    title: "Pricing",
    content: (
      <SlideWrapper>
        <h2 className="mb-2 text-sm font-bold uppercase tracking-widest text-teal-600">
          Pricing
        </h2>
        <h3 className="text-3xl font-bold text-stone-900 sm:text-4xl">
          50-70% Cheaper Than Traditional Recruiting
        </h3>

        {/* Comparison */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="rounded-xl border border-red-200 bg-red-50/50 p-6">
            <h4 className="flex items-center gap-2 text-lg font-bold text-red-700">
              <XCircle className="size-5" />
              Traditional Recruiter
            </h4>
            <div className="mt-4 space-y-2 text-sm text-stone-700">
              <p>20-25% of first-year salary</p>
              <p>= <strong className="text-red-600">$15,000 - $25,000</strong> per placement</p>
              <p className="text-xs text-stone-500">No guarantee of cultural fit. No FQHC expertise. No retention data.</p>
            </div>
          </div>
          <div className="rounded-xl border-2 border-teal-300 bg-teal-50 p-6">
            <h4 className="flex items-center gap-2 text-lg font-bold text-teal-700">
              <CheckCircle2 className="size-5" />
              FQHC Talent Exchange
            </h4>
            <div className="mt-4 space-y-2 text-sm text-stone-700">
              <p>Subscription + per-placement</p>
              <p>= <strong className="text-teal-700">$999 - $5,000</strong> per hire</p>
              <p className="text-xs text-stone-500">Pre-assessed. Culturally matched. FQHC-specific. Retention tracked.</p>
            </div>
          </div>
        </div>

        {/* Subscription Tiers */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            {
              tier: "Explorer",
              price: "$0",
              period: "Free forever",
              features: ["Job board access", "FQHC directory", "Market intelligence", "See Talent Drop match counts"],
              color: "border-stone-300",
              badge: "bg-stone-100 text-stone-700",
            },
            {
              tier: "Growth",
              price: "$999",
              period: "/month",
              features: ["Weekly Talent Drop (3-5 candidates/role)", "Full candidate profiles + scores", "Priority support", "Employer dashboard"],
              color: "border-teal-300",
              badge: "bg-teal-100 text-teal-700",
            },
            {
              tier: "Enterprise",
              price: "$2,499",
              period: "/month",
              features: ["Everything in Growth", "Exclusive first-look on A-tier candidates", "Custom screening criteria", "Dedicated account manager", "Workforce analytics"],
              color: "border-amber-300",
              badge: "bg-amber-100 text-amber-700",
            },
          ].map((plan) => (
            <div key={plan.tier} className={`rounded-xl border-2 ${plan.color} bg-white p-5`}>
              <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-bold ${plan.badge}`}>
                {plan.tier}
              </span>
              <p className="mt-3 text-3xl font-extrabold text-stone-900">
                {plan.price}
                <span className="text-sm font-medium text-stone-500">{plan.period}</span>
              </p>
              <ul className="mt-4 space-y-1.5">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-stone-700">
                    <CheckCircle2 className="mt-0.5 size-3 shrink-0 text-teal-600" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </SlideWrapper>
    ),
  },

  /* ================================================================ */
  /*  Slide 10: Market Opportunity (TAM/SAM/SOM)                       */
  /* ================================================================ */
  {
    id: "market",
    title: "Market",
    content: (
      <SlideWrapper>
        <h2 className="mb-2 text-sm font-bold uppercase tracking-widest text-teal-600">
          Market Opportunity
        </h2>
        <h3 className="text-3xl font-bold text-stone-900 sm:text-4xl">
          TAM / SAM / SOM
        </h3>

        <div className="mt-10 grid items-center gap-10 lg:grid-cols-2">
          {/* Concentric Circles */}
          <div className="relative mx-auto flex items-center justify-center">
            <div className="flex size-72 items-center justify-center rounded-full bg-teal-100 sm:size-80">
              <div className="absolute left-1/2 top-4 -translate-x-1/2 text-center">
                <p className="text-xs font-bold text-teal-600">TAM</p>
                <p className="text-lg font-extrabold text-teal-700">$20.5B</p>
                <p className="text-[10px] text-teal-600">US Healthcare Staffing</p>
              </div>
              <div className="flex size-52 items-center justify-center rounded-full bg-teal-300/60 sm:size-56">
                <div className="absolute left-1/2 -translate-x-1/2 text-center" style={{ top: "32%" }}>
                  <p className="text-xs font-bold text-teal-700">SAM</p>
                  <p className="text-lg font-extrabold text-teal-800">$2.1B</p>
                  <p className="text-[10px] text-teal-700">FQHC Staffing (National)</p>
                </div>
                <div className="flex size-28 items-center justify-center rounded-full bg-teal-700 sm:size-32">
                  <div className="text-center">
                    <p className="text-xs font-bold text-teal-200">SOM</p>
                    <p className="text-lg font-extrabold text-white">$8.5M</p>
                    <p className="text-[10px] text-teal-200">California Y1-2</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Market Capture Scenarios */}
          <div>
            <h4 className="mb-4 text-lg font-bold text-stone-900">Market Capture Scenarios</h4>
            <div className="overflow-hidden rounded-xl border border-stone-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-stone-50">
                    <th className="px-4 py-2 text-left font-semibold text-stone-700">Capture</th>
                    <th className="px-4 py-2 text-left font-semibold text-stone-700">Revenue</th>
                    <th className="px-4 py-2 text-left font-semibold text-stone-700">Timeline</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  <tr>
                    <td className="px-4 py-2 font-medium text-stone-900">1% of SAM</td>
                    <td className="px-4 py-2 font-bold text-teal-700">$21M ARR</td>
                    <td className="px-4 py-2 text-stone-600">Year 3-4</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-medium text-stone-900">5% of SAM</td>
                    <td className="px-4 py-2 font-bold text-teal-700">$105M ARR</td>
                    <td className="px-4 py-2 text-stone-600">Year 5+</td>
                  </tr>
                  <tr className="bg-teal-50">
                    <td className="px-4 py-2 font-medium text-stone-900">California Only (Y1-2)</td>
                    <td className="px-4 py-2 font-bold text-teal-700">$8.5M ARR</td>
                    <td className="px-4 py-2 text-stone-600">Year 1-2 target</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 rounded-lg bg-stone-50 p-4">
              <p className="text-xs leading-relaxed text-stone-600">
                <strong>Bottom-up calculation:</strong> 270 CA health centers &times; avg. 15
                placements/year &times; $2,100 avg. revenue per placement = $8.5M addressable
                in California alone. 1% of national SAM = profitability.
              </p>
            </div>
          </div>
        </div>
      </SlideWrapper>
    ),
  },

  /* ================================================================ */
  /*  Slide 11: Go-to-Market Strategy                                  */
  /* ================================================================ */
  {
    id: "gtm",
    title: "GTM",
    content: (
      <SlideWrapper>
        <h2 className="mb-2 text-sm font-bold uppercase tracking-widest text-teal-600">
          Go-to-Market
        </h2>
        <h3 className="text-3xl font-bold text-stone-900 sm:text-4xl">
          Go-to-Market Strategy
        </h3>

        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {/* Candidate Acquisition */}
          <div className="rounded-xl border border-stone-200 bg-white p-6">
            <h4 className="mb-4 flex items-center gap-2 text-lg font-bold text-teal-700">
              <Users className="size-5" />
              Candidate Acquisition
            </h4>
            <div className="space-y-3">
              {[
                { ch: "SEO Content", desc: "12 blog articles, FQHC directory, salary data — all ranking for FQHC career queries" },
                { ch: "Displaced Worker Pipeline", desc: "Fast-Track form captures laid-off FQHC workers. 2,300+ already tracked in our layoff database." },
                { ch: "Resume Builder", desc: "Free FQHC-optimized resume tool captures profiles + assessment data" },
                { ch: "Community Outreach", desc: "Partnerships with CPCA, unions (NUHW, SEIU), workforce development boards" },
                { ch: "Referral Network", desc: "Placed candidates refer colleagues. FQHCs recommend to displaced staff." },
              ].map((item) => (
                <div key={item.ch} className="rounded-lg bg-stone-50 p-3">
                  <p className="text-sm font-semibold text-stone-900">{item.ch}</p>
                  <p className="mt-0.5 text-xs text-stone-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Employer Conversion */}
          <div className="rounded-xl border border-stone-200 bg-white p-6">
            <h4 className="mb-4 flex items-center gap-2 text-lg font-bold text-amber-600">
              <Building2 className="size-5" />
              Employer Conversion
            </h4>
            <div className="space-y-3">
              {[
                { ch: "Free Value First", desc: "Job posting builder, screening questions, market intelligence — give value before asking for money" },
                { ch: "Manual First Placement", desc: "Identify 1 FQHC with urgent need. Match from our pipeline. Prove the model with a real hire." },
                { ch: "Warm Outreach", desc: "Target HR directors at 10 high-vulnerability FQHCs with specific candidate matches" },
                { ch: "Talent Drop Pilot", desc: "3 FQHCs get 4-week free trial of weekly candidate drops. Convert to paid subscription." },
                { ch: "CPCA Conference", desc: "Demo at CPCA Annual Conference. 200+ health center leaders in one room." },
              ].map((item) => (
                <div key={item.ch} className="rounded-lg bg-stone-50 p-3">
                  <p className="text-sm font-semibold text-stone-900">{item.ch}</p>
                  <p className="mt-0.5 text-xs text-stone-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SlideWrapper>
    ),
  },

  /* ================================================================ */
  /*  Slide 12: 16-Week Validation Playbook                            */
  /* ================================================================ */
  {
    id: "playbook",
    title: "Playbook",
    content: (
      <SlideWrapper>
        <h2 className="mb-2 text-sm font-bold uppercase tracking-widest text-teal-600">
          Execution
        </h2>
        <h3 className="text-3xl font-bold text-stone-900 sm:text-4xl">
          16-Week Validation Playbook
        </h3>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              phase: "Weeks 1-4",
              title: "Foundation",
              items: [
                "Ship Talent Drop MVP",
                "10 employer outreach calls",
                "50 candidate profiles collected",
                "First manual match attempt",
              ],
              color: "border-teal-300 bg-teal-50",
            },
            {
              phase: "Weeks 5-8",
              title: "First Revenue",
              items: [
                "First paid placement",
                "3 employer pilot agreements",
                "100 candidate profiles",
                "Weekly Drop cadence begins",
              ],
              color: "border-amber-300 bg-amber-50",
            },
            {
              phase: "Weeks 9-12",
              title: "Signal",
              items: [
                "10+ employer accounts",
                "250 candidate profiles",
                "Repeat employers (2+ drops)",
                "$5K MRR milestone",
              ],
              color: "border-purple-300 bg-purple-50",
            },
            {
              phase: "Weeks 13-16",
              title: "Scale Decision",
              items: [
                "$10K+ MRR",
                "50%+ employer retention",
                "Positive unit economics",
                "Raise or bootstrap decision",
              ],
              color: "border-green-300 bg-green-50",
            },
          ].map((phase) => (
            <div key={phase.phase} className={`rounded-xl border-2 ${phase.color} p-5`}>
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                {phase.phase}
              </span>
              <h4 className="mt-1 text-lg font-bold text-stone-900">{phase.title}</h4>
              <ul className="mt-3 space-y-2">
                {phase.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-stone-700">
                    <CheckCircle2 className="mt-0.5 size-3 shrink-0 text-teal-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-xl border-2 border-red-200 bg-red-50 p-5">
          <h4 className="flex items-center gap-2 text-sm font-bold text-red-700">
            <AlertTriangle className="size-4" />
            Kill Criteria
          </h4>
          <p className="mt-2 text-sm leading-relaxed text-stone-700">
            If by Week 8 we have &lt;3 employer conversations, &lt;25 candidate profiles, and
            zero revenue signals — pivot or shut down. No zombie companies. Clear milestones,
            honest assessment.
          </p>
        </div>
      </SlideWrapper>
    ),
  },

  /* ================================================================ */
  /*  Slide 13: MVP Build Plan                                         */
  /* ================================================================ */
  {
    id: "mvp-build",
    title: "MVP Build",
    content: (
      <SlideWrapper>
        <h2 className="mb-2 text-sm font-bold uppercase tracking-widest text-teal-600">
          Technical
        </h2>
        <h3 className="text-3xl font-bold text-stone-900 sm:text-4xl">
          MVP Build Plan: Claude Code + Founder
        </h3>
        <p className="mt-3 max-w-2xl text-stone-600">
          Entire platform built by solo founder using AI-assisted development.
          39 features shipped. Zero external developers.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              phase: "Phase 1",
              title: "Content Platform",
              status: "complete",
              items: [
                "FQHC Directory (90 orgs)",
                "Job Listings (156+)",
                "Blog (12 articles)",
                "Bilingual (EN/ES)",
                "Market Intelligence",
              ],
            },
            {
              phase: "Phase 2",
              title: "Candidate Tools",
              status: "complete",
              items: [
                "Resume Builder (8 templates)",
                "Career Assessment (5 domains)",
                "Fast-Track Pipeline",
                "Layoff Tracker",
                "Career Pathways",
              ],
            },
            {
              phase: "Phase 3",
              title: "Employer Tools",
              status: "complete",
              items: [
                "Job Posting Builder",
                "Team Readiness Assessment",
                "Interactive Demo",
                "Screening Questions",
                "Salary Benchmarks",
              ],
            },
            {
              phase: "Phase 4",
              title: "Matching & Revenue",
              status: "building",
              items: [
                "AI Matching Engine",
                "Talent Drop (weekly delivery)",
                "Employer Dashboard",
                "Candidate Pipeline",
                "Analytics & Reporting",
              ],
            },
          ].map((phase) => (
            <div key={phase.phase} className="rounded-xl border border-stone-200 bg-white p-5">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-stone-500">{phase.phase}</span>
                {phase.status === "complete" ? (
                  <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-bold text-green-700">
                    Complete
                  </span>
                ) : (
                  <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-700">
                    Building
                  </span>
                )}
              </div>
              <h4 className="font-bold text-stone-900">{phase.title}</h4>
              <ul className="mt-3 space-y-1.5">
                {phase.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-stone-700">
                    {phase.status === "complete" ? (
                      <CheckCircle2 className="mt-0.5 size-3 shrink-0 text-green-600" />
                    ) : (
                      <Clock className="mt-0.5 size-3 shrink-0 text-amber-500" />
                    )}
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {[
            "Next.js 16", "React 19", "TypeScript", "Tailwind 4", "Supabase",
            "Vercel", "shadcn/ui", "Claude Code", "Zod", "next-intl",
          ].map((tech) => (
            <span key={tech} className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-600">
              {tech}
            </span>
          ))}
        </div>
      </SlideWrapper>
    ),
  },

  /* ================================================================ */
  /*  Slide 14: Success Metrics                                        */
  /* ================================================================ */
  {
    id: "metrics",
    title: "Metrics",
    content: (
      <SlideWrapper>
        <h2 className="mb-2 text-sm font-bold uppercase tracking-widest text-teal-600">
          Tracking Success
        </h2>
        <h3 className="text-3xl font-bold text-stone-900 sm:text-4xl">
          Success Metrics
        </h3>
        <p className="mt-3 max-w-2xl text-stone-600">
          16-week targets that prove product-market fit.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { value: "500+", label: "Candidate Resumes", desc: "Profiles in our system with assessment data by Week 16", icon: FileText, color: "text-teal-600 bg-teal-50" },
            { value: "60%", label: "Assessment Completion", desc: "Of candidates complete full 5-domain behavioral assessment", icon: Brain, color: "text-purple-600 bg-purple-50" },
            { value: "<21 days", label: "Time to Placement", desc: "Average days from candidate intake to employer hire", icon: Clock, color: "text-amber-600 bg-amber-50" },
            { value: "10+", label: "Employer Accounts", desc: "FQHCs actively receiving weekly Talent Drops", icon: Building2, color: "text-teal-600 bg-teal-50" },
            { value: "$10K", label: "Monthly Recurring Revenue", desc: "MRR by Week 16 — combination of subscriptions and placement fees", icon: DollarSign, color: "text-green-600 bg-green-50" },
            { value: "85%", label: "90-Day Retention", desc: "Of placed candidates still employed after 90 days", icon: Award, color: "text-amber-600 bg-amber-50" },
          ].map((metric) => (
            <div key={metric.label} className="rounded-xl border border-stone-200 bg-white p-6 text-center">
              <div className={`mx-auto mb-3 flex size-12 items-center justify-center rounded-full ${metric.color}`}>
                <metric.icon className="size-6" />
              </div>
              <p className="text-3xl font-extrabold text-stone-900">{metric.value}</p>
              <p className="mt-1 text-sm font-bold text-stone-700">{metric.label}</p>
              <p className="mt-2 text-xs leading-relaxed text-stone-500">{metric.desc}</p>
            </div>
          ))}
        </div>
      </SlideWrapper>
    ),
  },

  /* ================================================================ */
  /*  Slide 15: The 30-Second Pitch                                    */
  /* ================================================================ */
  {
    id: "pitch",
    title: "30-Sec Pitch",
    content: (
      <SlideWrapper>
        <div className="mx-auto max-w-3xl rounded-2xl bg-gradient-to-br from-teal-700 via-teal-800 to-teal-900 p-10 text-center sm:p-16">
          <Heart className="mx-auto size-10 fill-white text-white opacity-80" />

          <h3 className="mt-6 text-2xl font-bold leading-relaxed text-white sm:text-3xl">
            &ldquo;Community health centers serve 30 million Americans but can&apos;t
            keep their teams staffed — and when funding cuts hit, displaced workers
            have nowhere FQHC-specific to turn.
          </h3>

          <h3 className="mt-6 text-2xl font-bold leading-relaxed text-amber-300 sm:text-3xl">
            We built the only platform that combines FQHC market intelligence, expert career
            assessments, a layoff-to-hire accelerator, and mission-driven tools — so the right
            professionals find the right health centers, faster.&rdquo;
          </h3>

          <div className="mt-10 rounded-xl bg-white/10 p-5 backdrop-blur">
            <p className="text-lg font-bold text-teal-100">
              1% market capture = profitability.
            </p>
            <p className="mt-1 text-sm text-teal-200/80">
              $21M ARR at 1% of the $2.1B FQHC staffing market.
            </p>
          </div>
        </div>
      </SlideWrapper>
    ),
  },

  /* ================================================================ */
  /*  Slide 16: What Happens Next                                      */
  /* ================================================================ */
  {
    id: "next-steps",
    title: "Next Steps",
    content: (
      <SlideWrapper>
        <h2 className="mb-2 text-sm font-bold uppercase tracking-widest text-teal-600">
          Execution
        </h2>
        <h3 className="text-3xl font-bold text-stone-900 sm:text-4xl">
          What Happens Next
        </h3>

        <div className="mt-10 space-y-3">
          {[
            { time: "This Week", action: "Ship Talent Drop MVP. Begin manual outreach to 10 target FQHCs.", status: "active" },
            { time: "Week 2-4", action: "Collect 50 candidate profiles. First employer pilot conversations.", status: "upcoming" },
            { time: "Week 4-8", action: "First paid placement. 3 FQHCs on weekly Talent Drop pilot.", status: "upcoming" },
            { time: "Week 8-12", action: "100+ profiles. Refine AI matching. Track placement outcomes.", status: "upcoming" },
            { time: "Week 13-16", action: "Hit $10K MRR or kill criteria. Scale decision point.", status: "upcoming" },
            { time: "Month 6+", action: "Expand to 2nd state. Add employer dashboard. Series Seed if warranted.", status: "future" },
          ].map((step) => (
            <div
              key={step.time}
              className={`flex items-start gap-4 rounded-xl border p-5 ${
                step.status === "active"
                  ? "border-teal-300 bg-teal-50"
                  : step.status === "future"
                    ? "border-stone-200 bg-stone-50/50"
                    : "border-stone-200 bg-white"
              }`}
            >
              <span
                className={`mt-0.5 shrink-0 rounded-lg px-3 py-1 text-xs font-bold ${
                  step.status === "active"
                    ? "bg-teal-700 text-white"
                    : step.status === "future"
                      ? "bg-stone-200 text-stone-600"
                      : "bg-stone-100 text-stone-700"
                }`}
              >
                {step.time}
              </span>
              <p className={`text-sm ${step.status === "active" ? "font-semibold text-stone-900" : "text-stone-700"}`}>
                {step.action}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <div className="mb-4 inline-flex items-center gap-3">
            <Heart className="size-8 fill-teal-700 text-teal-700" />
            <span className="text-2xl font-extrabold tracking-tight text-stone-900">
              FQHC <span className="text-teal-700">Talent Exchange</span>
            </span>
          </div>
          <p className="mx-auto mt-2 max-w-lg text-sm text-stone-500">
            A California where every community health center is fully staffed
            with professionals who reflect the communities they serve.
          </p>
          <p className="mt-4 text-lg font-bold text-teal-700">fqhctalent.com</p>
          <p className="mt-1 text-sm text-stone-500">info@fqhctalent.com</p>
          <p className="mt-6 text-xs text-stone-400">
            Built with Claude Code &middot; Solo founder &middot; 39 features shipped
          </p>
        </div>
      </SlideWrapper>
    ),
  },
];

/* ------------------------------------------------------------------ */
/*  Pitch Deck Page Component                                          */
/* ------------------------------------------------------------------ */
export default function PitchDeckPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const goNext = useCallback(
    () => setCurrentSlide((s) => Math.min(s + 1, slides.length - 1)),
    []
  );
  const goPrev = useCallback(
    () => setCurrentSlide((s) => Math.max(s - 1, 0)),
    []
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev]);

  return (
    <div className="min-h-screen bg-white">
      {/* Top bar */}
      <div className="sticky top-0 z-50 border-b border-stone-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-12 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <Heart className="size-5 fill-teal-700 text-teal-700" />
            <span className="text-sm font-bold text-stone-900">
              FQHC <span className="text-teal-700">Talent</span>
            </span>
            <span className="ml-2 text-xs text-stone-400">Pitch Deck</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Slide indicators */}
            <div className="hidden items-center gap-0.5 sm:flex">
              {slides.map((slide, i) => (
                <button
                  key={slide.id}
                  onClick={() => setCurrentSlide(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === currentSlide
                      ? "w-5 bg-teal-600"
                      : "w-1.5 bg-stone-300 hover:bg-stone-400"
                  }`}
                  aria-label={`Go to slide: ${slide.title}`}
                />
              ))}
            </div>

            <span className="text-xs font-medium text-stone-500">
              {currentSlide + 1} / {slides.length}
            </span>
          </div>
        </div>
      </div>

      {/* Slide content */}
      <div className="mx-auto max-w-6xl">
        {slides[currentSlide].content}
      </div>

      {/* Navigation footer */}
      <div className="sticky bottom-0 border-t border-stone-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
          <button
            onClick={goPrev}
            disabled={currentSlide === 0}
            className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-100 disabled:opacity-30 disabled:hover:bg-transparent"
          >
            <ChevronLeft className="size-4" />
            Previous
          </button>

          {/* Slide titles (scrollable on larger screens) */}
          <div className="hidden overflow-x-auto sm:block">
            <div className="flex items-center gap-1">
              {slides.map((slide, i) => (
                <button
                  key={slide.id}
                  onClick={() => setCurrentSlide(i)}
                  className={`whitespace-nowrap rounded px-2 py-1 text-xs font-medium transition-colors ${
                    i === currentSlide
                      ? "bg-teal-100 text-teal-700"
                      : "text-stone-400 hover:text-stone-600"
                  }`}
                >
                  {slide.title}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={goNext}
            disabled={currentSlide === slides.length - 1}
            className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-100 disabled:opacity-30 disabled:hover:bg-transparent"
          >
            Next
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
