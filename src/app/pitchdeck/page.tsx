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
/*  All 16 slides — matching PDF exactly                               */
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

          <h1 className="mt-2 text-2xl font-bold text-stone-700 sm:text-3xl">
            The Talent Drop
          </h1>
          <p className="mt-2 text-lg text-stone-500">
            AI-Powered Weekly Candidate Matching for Community Health Centers
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
            The Perfect Storm (2025-2026)
          </h4>
          <ul className="mt-3 space-y-2 text-sm text-stone-700">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-red-500">&bull;</span>
              <span><strong>H.R. 1 Medicaid cuts</strong> threaten $8.3B in annual FQHC funding nationally</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-red-500">&bull;</span>
              <span><strong>Alameda Health System closure</strong> displaced 3,500+ workers — largest CA healthcare layoff in a decade</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-red-500">&bull;</span>
              <span><strong>ECM/CCM program uncertainty</strong> freezing hiring in care coordination roles statewide</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-red-500">&bull;</span>
              <span><strong>SB 525 minimum wage</strong> increasing FQHC labor costs 15-25% by 2027</span>
            </li>
          </ul>
        </div>
      </SlideWrapper>
    ),
  },

  /* ================================================================ */
  /*  Slide 3: Why Existing Solutions Fail FQHCs                       */
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
          Why Existing Solutions Fail FQHCs
        </h3>

        <div className="mt-10 space-y-4">
          {[
            {
              name: "Indeed / LinkedIn",
              icon: XCircle,
              problem: "500+ unqualified applicants per post. No FQHC-specific filters. HR teams spend 20+ hours per role screening.",
              color: "text-red-500",
            },
            {
              name: "Traditional Recruiters",
              icon: XCircle,
              problem: "$15-25K per placement (20-25% of salary). Don't understand PPS, CalAIM, or FQHC program requirements.",
              color: "text-red-500",
            },
            {
              name: "NACHC Job Board",
              icon: XCircle,
              problem: "Passive job postings only. No matching, no assessment, no intelligence. A bulletin board, not a platform.",
              color: "text-red-500",
            },
            {
              name: "Locum Firms (AMN/CHG)",
              icon: XCircle,
              problem: "Temporary workers at 2-3x cost. No cultural fit. No commitment to community health mission. Workers leave when contract ends.",
              color: "text-red-500",
            },
          ].map((item) => (
            <div key={item.name} className="flex items-start gap-4 rounded-xl border border-stone-200 bg-white p-5">
              <item.icon className={`mt-0.5 size-5 shrink-0 ${item.color}`} />
              <div>
                <h4 className="font-bold text-stone-900">{item.name}</h4>
                <p className="mt-1 text-sm text-stone-600">{item.problem}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-xl bg-teal-50 p-5">
          <h4 className="flex items-center gap-2 text-sm font-bold text-teal-700">
            <CheckCircle2 className="size-4" />
            FQHC Talent Exchange: The Only FQHC-Native Solution
          </h4>
          <p className="mt-2 text-sm leading-relaxed text-stone-700">
            Purpose-built for community health. Every feature — from assessment to matching
            to market intelligence — is designed exclusively for FQHCs and the mission-driven
            professionals who work in them.
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
        <div className="rounded-2xl bg-gradient-to-br from-teal-800 to-teal-900 p-8 sm:p-12">
          <h2 className="mb-2 text-sm font-bold uppercase tracking-widest text-teal-300">
            The Product
          </h2>
          <h3 className="text-3xl font-bold text-white sm:text-4xl">
            Introducing the Talent Drop
          </h3>
          <p className="mt-3 max-w-2xl text-teal-200">
            Every Wednesday at 9 AM, subscribing FQHCs receive a curated batch
            of pre-assessed, role-matched candidates — ranked by fit score.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            <div className="rounded-xl bg-white/10 p-6 backdrop-blur">
              <Mail className="size-8 text-amber-400" />
              <h4 className="mt-3 text-lg font-bold text-white">Wednesday 9 AM</h4>
              <p className="mt-2 text-sm text-teal-200">
                Top 10 matched candidates delivered per open role. Ranked by AI match score.
                Full profiles, assessment results, salary expectations.
              </p>
            </div>
            <div className="rounded-xl bg-white/10 p-6 backdrop-blur">
              <Calendar className="size-8 text-amber-400" />
              <h4 className="mt-3 text-lg font-bold text-white">Claim by Friday</h4>
              <p className="mt-2 text-sm text-teal-200">
                Employers review, claim candidates, request intros. Friday 5 PM deadline
                creates urgency. Unclaimed candidates roll to next week.
              </p>
            </div>
            <div className="rounded-xl bg-white/10 p-6 backdrop-blur">
              <TrendingUp className="size-8 text-amber-400" />
              <h4 className="mt-3 text-lg font-bold text-white">Feedback Loop</h4>
              <p className="mt-2 text-sm text-teal-200">
                Every claim, pass, and hire improves the matching algorithm.
                More data = better matches = more employers = more candidates.
              </p>
            </div>
          </div>
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
        <p className="mt-3 max-w-2xl text-stone-500 italic">
          Inspired by &ldquo;The Dore Drop&rdquo; at Stanford &mdash; scarcity and cadence drive action.
        </p>

        <div className="mt-10 space-y-4">
          {[
            {
              icon: Zap,
              title: "Urgency Creates Action",
              desc: "Friday claim deadline forces fast decisions. No more months-long requisitions sitting open. FQHCs that don't act lose candidates to competitors.",
              color: "text-amber-600 bg-amber-50",
            },
            {
              icon: Filter,
              title: "Quality Over Volume",
              desc: "Top 10 curated candidates per role, not 500 unfiltered applicants. HR teams can actually review every profile in 30 minutes.",
              color: "text-teal-600 bg-teal-50",
            },
            {
              icon: TrendingUp,
              title: "Network Effect = Competitive Moat",
              desc: "Every claim/pass/hire improves matching. More data = better matches = more employers = more candidates. Weekly cadence compounds the advantage.",
              color: "text-purple-600 bg-purple-50",
            },
            {
              icon: Users,
              title: "Candidates Stay Engaged",
              desc: "Candidates know their profile is being actively reviewed every week. They stay current, complete assessments, update availability — unlike passive job boards where profiles go stale.",
              color: "text-blue-600 bg-blue-50",
            },
            {
              icon: Layers,
              title: "Tiered Access Drives Revenue",
              desc: "Free tier: see that matches exist. Paid tier: see full profiles + scores. Premium: exclusive first-look before other FQHCs.",
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
          Three-layer scoring system. Match Score: 0-100 per candidate per role.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          <div className="rounded-xl border-2 border-red-200 bg-red-50/30 p-6">
            <h4 className="mb-1 text-xs font-bold uppercase tracking-wider text-red-600">
              Layer 1: Hard Filters (Pass/Fail)
            </h4>
            <div className="mt-4 space-y-2">
              {["Active license/certification required", "EHR system match (Epic, NextGen, eCW, Athena)", "Geographic availability (commute ≤45 min or remote)", "Language requirements (verified proficiency)", "Minimum experience threshold"].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-stone-700">
                  <Shield className="size-3.5 shrink-0 text-red-500" />
                  {item}
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs font-medium text-red-600">
              Fail any filter = excluded from drop
            </p>
          </div>

          <div className="rounded-xl border-2 border-teal-200 bg-teal-50/30 p-6">
            <h4 className="mb-1 text-xs font-bold uppercase tracking-wider text-teal-600">
              Layer 2: Weighted Scoring (0-80 pts)
            </h4>
            <div className="mt-4 space-y-2">
              {[
                "Behavioral assessment (5 domains, 25 pts)",
                "Program experience — ECM, CCM, CalAIM (15 pts)",
                "Revenue-generation capability (15 pts)",
                "Bilingual proficiency depth (15 pts)",
                "Career trajectory alignment (10 pts)",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-stone-700">
                  <BarChart3 className="size-3.5 shrink-0 text-teal-600" />
                  {item}
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs font-medium text-teal-600">
              Data from assessment + resume + profile
            </p>
          </div>

          <div className="rounded-xl border-2 border-amber-200 bg-amber-50/30 p-6">
            <h4 className="mb-1 text-xs font-bold uppercase tracking-wider text-amber-600">
              Layer 3: Preference Match (0-20 pts)
            </h4>
            <div className="mt-4 space-y-2">
              {[
                "Mission alignment score (verified)",
                "Work style compatibility",
                "Commute / remote preference fit",
                "Salary expectation alignment",
                "Organization size preference",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-stone-700">
                  <Heart className="size-3.5 shrink-0 text-amber-500" />
                  {item}
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs font-medium text-amber-600">
              Reduces early turnover risk
            </p>
          </div>
        </div>
      </SlideWrapper>
    ),
  },

  /* ================================================================ */
  /*  Slide 7: Content-First: Build the Moat Before You Sell           */
  /* ================================================================ */
  {
    id: "content-moat",
    title: "Content Moat",
    content: (
      <SlideWrapper>
        <h2 className="mb-2 text-sm font-bold uppercase tracking-widest text-teal-600">
          Strategy
        </h2>
        <h3 className="text-3xl font-bold text-stone-900 sm:text-4xl">
          Content-First: Build the Moat Before You Sell
        </h3>
        <p className="mt-3 max-w-2xl text-stone-600">
          We don&apos;t start with sales. We start with value. Free tools attract traffic.
          Traffic becomes profiles. Profiles feed the Talent Drop.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {[
            {
              phase: "Phase 1: SEO + Free Tools",
              status: "Live Now",
              items: [
                `${overview.totalFQHCs} FQHC directory (searchable, with profiles)`,
                `${overview.totalJobs}+ job listings (role, region, salary)`,
                "13 SEO-optimized blog articles (EN/ES)",
                "Market intelligence dashboard",
                "Resume builder (8 FQHC templates)",
                "Layoff tracker (2,300+ workers tracked)",
              ],
              color: "border-teal-300 bg-teal-50",
              badge: "bg-teal-100 text-teal-700",
            },
            {
              phase: "Phase 2: Profile Capture",
              status: "Live Now",
              items: [
                "Resume builder captures structured profiles",
                "Career assessment (5 domains, 15 universal + 40 role-specific questions)",
                "Fast-track pipeline for displaced workers",
                "Language proficiency verification (17 languages)",
                "EHR + program experience data",
                "Salary expectation calibration (30 role benchmarks)",
              ],
              color: "border-teal-300 bg-teal-50",
              badge: "bg-teal-100 text-teal-700",
            },
            {
              phase: "Phase 3: Talent Drop",
              status: "Next",
              items: [
                "AI matching scores every candidate-role pair",
                "Weekly curated delivery to subscribing FQHCs",
                "Claim/pass feedback improves algorithm",
                "Network effect compounds weekly",
                "Expand beyond California",
                "Workforce planning analytics",
              ],
              color: "border-purple-300 bg-purple-50",
              badge: "bg-purple-100 text-purple-700",
            },
          ].map((phase) => (
            <div key={phase.phase} className={`rounded-xl border-2 ${phase.color} p-6`}>
              <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-bold ${phase.badge}`}>
                {phase.status}
              </span>
              <h4 className="mt-3 text-sm font-bold text-stone-900">{phase.phase}</h4>
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
  /*  Slide 8: Assessment-First                                        */
  /* ================================================================ */
  {
    id: "assessment-tiers",
    title: "Assessment",
    content: (
      <SlideWrapper>
        <h2 className="mb-2 text-sm font-bold uppercase tracking-widest text-teal-600">
          Quality Control
        </h2>
        <h3 className="text-3xl font-bold text-stone-900 sm:text-4xl">
          Assessment-First: Promise Only What You Can Deliver
        </h3>
        <p className="mt-3 max-w-2xl text-stone-600">
          Every candidate completes a 5-domain behavioral assessment (15 universal +
          40 role-specific questions) before employers see their profile. No unvetted
          candidates. No surprises.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          <div className="rounded-xl border-2 border-green-300 bg-green-50 p-6">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-3xl font-extrabold text-green-700">A</span>
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                Score 80-100
              </span>
            </div>
            <h4 className="text-lg font-bold text-stone-900">Ready Now</h4>
            <p className="mt-2 text-sm leading-relaxed text-stone-600">
              Strong across all domains. Verified credentials. Relevant program
              experience. Can start within 2 weeks.
            </p>
            <div className="mt-4 rounded-lg bg-white p-3">
              <p className="text-xs font-bold text-green-700">In Talent Drop:</p>
              <p className="mt-1 text-xs text-stone-600">
                Full profile, scores, match explanation, salary data. Priority placement.
              </p>
            </div>
          </div>

          <div className="rounded-xl border-2 border-amber-300 bg-amber-50 p-6">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-3xl font-extrabold text-amber-700">B</span>
              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700">
                Score 60-79
              </span>
            </div>
            <h4 className="text-lg font-bold text-stone-900">Near-Ready</h4>
            <p className="mt-2 text-sm leading-relaxed text-stone-600">
              Strong in most areas, 1-2 gaps identified. May need EHR training
              or program orientation (CalAIM, ECM).
            </p>
            <div className="mt-4 rounded-lg bg-white p-3">
              <p className="text-xs font-bold text-amber-700">In Talent Drop:</p>
              <p className="mt-1 text-xs text-stone-600">
                Profile with growth areas flagged. Recommended onboarding actions included.
              </p>
            </div>
          </div>

          <div className="rounded-xl border-2 border-stone-300 bg-stone-50 p-6">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-3xl font-extrabold text-stone-500">C</span>
              <span className="rounded-full bg-stone-200 px-3 py-1 text-xs font-bold text-stone-600">
                Score &lt;60
              </span>
            </div>
            <h4 className="text-lg font-bold text-stone-900">Developing</h4>
            <p className="mt-2 text-sm leading-relaxed text-stone-600">
              Career changers or entry-level. Need significant development
              before placement. Routed to training resources.
            </p>
            <div className="mt-4 rounded-lg bg-white p-3">
              <p className="text-xs font-bold text-stone-600">Not in Talent Drop:</p>
              <p className="mt-1 text-xs text-stone-600">
                Get career pathway guidance, free resume builder, and assessment feedback.
                Re-assess in 90 days.
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
          50-70% Less Than Traditional Recruiters
        </h3>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="rounded-xl border border-red-200 bg-red-50/50 p-6">
            <h4 className="flex items-center gap-2 text-lg font-bold text-red-700">
              <XCircle className="size-5" />
              Traditional Recruiter
            </h4>
            <div className="mt-4 space-y-2 text-sm text-stone-700">
              <p>20-25% of first-year salary</p>
              <p>= <strong className="text-red-600">$15,000 - $25,000</strong> per placement</p>
              <p className="text-xs text-stone-500">No FQHC expertise. No cultural fit guarantee. No retention data.</p>
            </div>
          </div>
          <div className="rounded-xl border-2 border-teal-300 bg-teal-50 p-6">
            <h4 className="flex items-center gap-2 text-lg font-bold text-teal-700">
              <CheckCircle2 className="size-5" />
              FQHC Talent Exchange
            </h4>
            <div className="mt-4 space-y-2 text-sm text-stone-700">
              <p>Subscription + per-placement</p>
              <p>= <strong className="text-teal-700">$5,000 - $8,000</strong> per hire (all-in)</p>
              <p className="text-xs text-stone-500">Pre-assessed. Culturally matched. FQHC-specific. 90-day retention tracked.</p>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            {
              tier: "Explorer",
              price: "Free",
              period: "forever",
              features: ["Job board access", "FQHC directory + profiles", "Market intelligence", "See Talent Drop match counts (not profiles)"],
              color: "border-stone-300",
              badge: "bg-stone-100 text-stone-700",
            },
            {
              tier: "Growth",
              price: "$1,500",
              period: "/month",
              features: ["Weekly Talent Drop (Top 10 per role)", "Full candidate profiles + scores", "Priority support", "Employer dashboard + analytics"],
              color: "border-teal-300",
              badge: "bg-teal-100 text-teal-700",
            },
            {
              tier: "Enterprise",
              price: "$3,500",
              period: "/month",
              features: ["Everything in Growth", "Exclusive first-look (Tuesday preview)", "Custom screening criteria", "Dedicated account manager", "Workforce planning reports"],
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
                <span className="text-sm font-medium text-stone-500"> {plan.period}</span>
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
                  <tr className="bg-teal-50">
                    <td className="px-4 py-2 font-medium text-stone-900">California Only (Y1-2)</td>
                    <td className="px-4 py-2 font-bold text-teal-700">$8.5M ARR</td>
                    <td className="px-4 py-2 text-stone-600">Year 1-2 target</td>
                  </tr>
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
                </tbody>
              </table>
            </div>

            <div className="mt-4 rounded-lg bg-stone-50 p-4">
              <p className="text-xs leading-relaxed text-stone-600">
                <strong>Bottom-up:</strong> 270 CA health centers &times; avg. 15
                placements/year &times; $2,100 avg. revenue per placement = $8.5M
                addressable in California alone.
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
          <div className="rounded-xl border border-stone-200 bg-white p-6">
            <h4 className="mb-4 flex items-center gap-2 text-lg font-bold text-teal-700">
              <Users className="size-5" />
              Candidate Acquisition (Supply)
            </h4>
            <div className="space-y-3">
              {[
                { ch: "SEO Content", desc: "13 blog articles, FQHC directory, salary data — all ranking for FQHC career queries" },
                { ch: "Displaced Worker Pipeline", desc: "Free career tools + priority intake captures displaced workers. 2,600+ tracked across 15 layoff events." },
                { ch: "Free Resume Builder", desc: "FQHC-optimized templates capture structured profile data + assessment scores" },
                { ch: "Community Partners", desc: "CPCA, unions (NUHW, SEIU), workforce development boards, CHW associations" },
                { ch: "Word of Mouth", desc: "Placed candidates refer colleagues. FQHCs recommend to displaced staff." },
              ].map((item) => (
                <div key={item.ch} className="rounded-lg bg-stone-50 p-3">
                  <p className="text-sm font-semibold text-stone-900">{item.ch}</p>
                  <p className="mt-0.5 text-xs text-stone-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-stone-200 bg-white p-6">
            <h4 className="mb-4 flex items-center gap-2 text-lg font-bold text-amber-600">
              <Building2 className="size-5" />
              Employer Conversion (Demand)
            </h4>
            <div className="space-y-3">
              {[
                { ch: "Free Value First", desc: "Market intelligence, job posting builder, salary benchmarks — give value before asking for money" },
                { ch: "Manual First Placement", desc: "Identify 1 FQHC with urgent need. Match from our pipeline. Prove the model with a real hire." },
                { ch: "Warm Outreach to 10 FQHCs", desc: "Target HR directors at high-vulnerability FQHCs with specific candidate matches ready" },
                { ch: "Talent Drop Pilot", desc: "3 FQHCs get 4-week free trial. Weekly candidate drops. Convert to paid subscription." },
                { ch: "CPCA Conference Demo", desc: "Present at CPCA Annual Conference. 200+ health center leaders in one room." },
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
            zero revenue signals — pivot or shut down. No zombie companies.
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
          What&apos;s Built &amp; What&apos;s Next
        </h3>
        <p className="mt-3 max-w-2xl text-stone-600">
          Solo founder + Claude Code. 39 features shipped. Zero external developers.
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
                "Blog (13 articles, EN/ES)",
                "Market Intelligence",
                "Sitemap + SEO",
              ],
            },
            {
              phase: "Phase 2",
              title: "Candidate Tools",
              status: "complete",
              items: [
                "Resume Builder (8 templates)",
                "Career Assessment (5 domains, 55 questions)",
                "Fast-Track Displaced Worker Pipeline",
                "Layoff Tracker (2,300+ workers)",
                "Funding Impact Tracker (H.R. 1)",
              ],
            },
            {
              phase: "Phase 3",
              title: "Employer Tools",
              status: "complete",
              items: [
                "Job Posting Builder + Screening Questions",
                "Team Readiness Assessment (35 questions)",
                "Interactive Demo (9 sections)",
                "Manager 90-Day Onboarding (STARS/FOGLAMP)",
                "Salary Benchmarks (30 roles, P25/P50/P75)",
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
                "Candidate Pipeline CRM",
                "Placement Tracking",
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
          Success Metrics (16-Week Targets)
        </h3>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { value: "500+", label: "Candidate Profiles", desc: "With assessment data in our system by Week 16", icon: FileText, color: "text-teal-600 bg-teal-50" },
            { value: "60%", label: "Assessment Completion", desc: "Of candidates complete full behavioral assessment", icon: Brain, color: "text-purple-600 bg-purple-50" },
            { value: "<21 days", label: "Time to Placement", desc: "From candidate intake to employer hire", icon: Clock, color: "text-amber-600 bg-amber-50" },
            { value: "10+", label: "Employer Accounts", desc: "FQHCs actively receiving weekly Talent Drops", icon: Building2, color: "text-teal-600 bg-teal-50" },
            { value: "$10K", label: "Monthly Recurring Revenue", desc: "MRR by Week 16 — subscriptions + placement fees", icon: DollarSign, color: "text-green-600 bg-green-50" },
            { value: "85%", label: "90-Day Retention", desc: "Placed candidates still employed after 90 days", icon: Award, color: "text-amber-600 bg-amber-50" },
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
            keep their teams staffed — 70% face critical shortages while spending
            $15-25K per hire on recruiters who don&apos;t understand their world.
          </h3>

          <h3 className="mt-6 text-2xl font-bold leading-relaxed text-amber-300 sm:text-3xl">
            We built the only talent platform exclusively for FQHCs. Every Wednesday,
            our AI delivers the top 10 pre-assessed, mission-aligned candidates for
            every open role — at 50-70% less than traditional recruiting.&rdquo;
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
            { time: "This Week", action: "Ship Talent Drop MVP. Begin outreach to 10 target FQHCs with specific candidate matches.", status: "active" },
            { time: "Week 2-4", action: "Collect 50 candidate profiles. First employer pilot conversations. First manual match.", status: "upcoming" },
            { time: "Week 4-8", action: "First paid placement. 3 FQHCs on weekly Talent Drop pilot. 100 profiles.", status: "upcoming" },
            { time: "Week 8-12", action: "10+ employer accounts. 250 profiles. Refine AI matching with claim/pass data.", status: "upcoming" },
            { time: "Week 13-16", action: "Hit $10K MRR or kill criteria. Scale decision point.", status: "upcoming" },
            { time: "Month 6+", action: "Expand to 2nd state. Employer dashboard. Series Seed if warranted.", status: "future" },
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
          <p className="mt-3 text-lg font-bold text-teal-700">fqhctalent.com</p>
          <p className="mt-1 text-sm text-stone-500">info@fqhctalent.com</p>
          <p className="mt-6 text-xs text-stone-400">
            Solo founder &middot; 39 features shipped &middot; Built with Claude Code
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
