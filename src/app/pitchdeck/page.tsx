"use client";

import { useState } from "react";
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
const SALARY_BENCHMARKS_COUNT = 30;

/* ------------------------------------------------------------------ */
/*  Slide data                                                         */
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
          <div className="mb-8 inline-flex items-center gap-3">
            <Heart className="size-12 fill-teal-700 text-teal-700" />
            <span className="text-4xl font-extrabold tracking-tight text-stone-900 sm:text-5xl">
              FQHC <span className="text-teal-700">Talent</span>
            </span>
          </div>

          <h1 className="text-2xl font-bold text-stone-700 sm:text-3xl">
            The only talent platform built for<br />
            community health centers.
          </h1>

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

          <p className="mx-auto mt-10 max-w-2xl text-lg text-stone-500">
            To strengthen California&apos;s safety-net workforce by connecting mission-driven
            health professionals with FQHCs — faster, smarter, and with the cultural fit
            that matters.
          </p>

          <p className="mt-4 text-sm font-medium text-stone-400">
            fqhctalent.com
          </p>
        </div>
      </SlideWrapper>
    ),
  },

  /* ================================================================ */
  /*  Slide 2: The Problem                                             */
  /* ================================================================ */
  {
    id: "problem",
    title: "The Problem",
    content: (
      <SlideWrapper>
        <h2 className="mb-2 text-sm font-bold uppercase tracking-widest text-teal-600">
          The Problem
        </h2>
        <h3 className="text-3xl font-bold text-stone-900 sm:text-4xl">
          California&apos;s safety net is fraying.
        </h3>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {[
            {
              icon: AlertTriangle,
              color: "text-red-600 bg-red-50",
              title: "Medi-Cal Funding Cuts",
              detail: "PPS rate elimination (Oct 2026), dental reimbursement cuts (Jul 2026), and CalAIM waiver uncertainty threaten FQHC financial viability.",
            },
            {
              icon: Users,
              color: "text-amber-600 bg-amber-50",
              title: "Workforce Displacement",
              detail: "Layoffs hitting community health workers, care coordinators, and behavioral health staff — the exact roles California needs most.",
            },
            {
              icon: Clock,
              color: "text-stone-600 bg-stone-100",
              title: "Hiring Disconnect",
              detail: "FQHCs post on Indeed/LinkedIn and get flooded with unqualified applicants. Displaced FQHC workers can't find other FQHC jobs. Nobody connects them.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-xl border border-stone-200 bg-white p-6">
              <div className={`inline-flex size-10 items-center justify-center rounded-lg ${item.color}`}>
                <item.icon className="size-5" />
              </div>
              <h4 className="mt-4 text-lg font-bold text-stone-900">{item.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">{item.detail}</p>
            </div>
          ))}
        </div>
      </SlideWrapper>
    ),
  },

  /* ================================================================ */
  /*  Slide 3: The Solution                                            */
  /* ================================================================ */
  {
    id: "solution",
    title: "The Solution",
    content: (
      <SlideWrapper>
        <h2 className="mb-2 text-sm font-bold uppercase tracking-widest text-teal-600">
          The Solution
        </h2>
        <h3 className="text-3xl font-bold text-stone-900 sm:text-4xl">
          A talent platform that speaks FQHC.
        </h3>
        <p className="mt-4 max-w-2xl text-lg text-stone-600">
          We don&apos;t do general healthcare staffing. We exclusively serve FQHCs and the
          mission-driven professionals who work in them. Every feature is built for
          community health — not adapted from hospital recruiting tools.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: Building2, label: `${overview.totalFQHCs} FQHC Directory`, desc: "Every CA FQHC with programs, EHR, Glassdoor ratings, and careers links" },
            { icon: Briefcase, label: `${overview.totalJobs}+ Job Listings`, desc: "Searchable by role, region, salary, language, and FQHC" },
            { icon: FileText, label: "Resume Builder", desc: "FQHC-optimized templates with role-specific bullet points, bilingual" },
            { icon: Brain, label: "Career Assessment", desc: "15-question behavioral assessment across 5 domains with transition readiness and role-specific insights" },
            { icon: Shield, label: "Displaced Worker Fast-Track", desc: "48-hour intake for laid-off FQHC workers with priority placement" },
            { icon: BarChart3, label: "Market Intelligence", desc: "Funding cliff tracking, salary data, regional snapshots, role demand" },
            { icon: Globe, label: "Union Directory", desc: "Labor data for 90 FQHCs with healthcare policy timeline" },
            { icon: TrendingUp, label: "Layoff Tracker", desc: "Real-time tracking of FQHC workforce displacements across CA" },
            { icon: DollarSign, label: "Job Posting Builder", desc: "Employer tool with salary benchmarks and screening questions" },
          ].map((feature) => (
            <div key={feature.label} className="flex items-start gap-3 rounded-lg bg-stone-50 p-4">
              <feature.icon className="mt-0.5 size-5 shrink-0 text-teal-600" />
              <div>
                <p className="text-sm font-semibold text-stone-900">{feature.label}</p>
                <p className="mt-0.5 text-xs text-stone-500">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </SlideWrapper>
    ),
  },

  /* ================================================================ */
  /*  Slide 4: Displaced Worker Pipeline                               */
  /* ================================================================ */
  {
    id: "fast-track",
    title: "Fast-Track Pipeline",
    content: (
      <SlideWrapper>
        <h2 className="mb-2 text-sm font-bold uppercase tracking-widest text-teal-600">
          Displaced Worker Pipeline
        </h2>
        <h3 className="text-3xl font-bold text-stone-900 sm:text-4xl">
          From layoff to new role in 21 days.
        </h3>
        <p className="mt-4 max-w-2xl text-lg text-stone-600">
          When FQHC workers are displaced, we fast-track them through our pipeline.
          They&apos;re already trained in community health — they just need a new home.
        </p>

        <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-start">
          {[
            { step: "1", time: "Day 0", title: "Intake", desc: "Displaced worker submits fast-track form. We capture role, EHR systems, programs, language, and region." },
            { step: "2", time: "Day 1", title: "Assessment + Resume", desc: "Quick career assessment → FQHC-optimized resume generated automatically from their fast-track data." },
            { step: "3", time: "Day 2–5", title: "First Intros", desc: "We match them to hiring FQHCs in their region and make warm introductions. 5-day target." },
            { step: "4", time: "Day 5–21", title: "Placement", desc: "Interview support, salary negotiation guidance. Average placement in 21 days." },
          ].map((item) => (
            <div key={item.step} className="relative flex-1 rounded-xl border border-stone-200 bg-white p-5">
              <div className="mb-3 flex items-center gap-2">
                <span className="flex size-8 items-center justify-center rounded-full bg-teal-700 text-sm font-bold text-white">
                  {item.step}
                </span>
                <span className="text-xs font-medium text-teal-600">{item.time}</span>
              </div>
              <h4 className="font-bold text-stone-900">{item.title}</h4>
              <p className="mt-1 text-sm text-stone-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </SlideWrapper>
    ),
  },

  /* ================================================================ */
  /*  Slide 5: Talent Assessment                                       */
  /* ================================================================ */
  {
    id: "assessment",
    title: "Talent Assessment",
    content: (
      <SlideWrapper>
        <h2 className="mb-2 text-sm font-bold uppercase tracking-widest text-teal-600">
          Candidate Assessment Engine
        </h2>
        <h3 className="text-3xl font-bold text-stone-900 sm:text-4xl">
          We don&apos;t just match on keywords.<br />
          We assess behavioral fit.
        </h3>

        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          <div>
            <h4 className="mb-4 text-lg font-bold text-stone-900">5-Domain Behavioral Assessment</h4>
            <div className="space-y-3">
              {[
                { domain: "Mission Alignment", desc: "Do they connect with community health's purpose?" },
                { domain: "People & Communication", desc: "Can they build trust across cultures and languages?" },
                { domain: "Execution & Reliability", desc: "Can they handle caseloads and documentation under pressure?" },
                { domain: "Growth & Adaptability", desc: "Will they learn CalAIM, ECM, and new program requirements?" },
                { domain: "Transition Readiness", desc: "Can they diagnose a new situation, align with their manager, and self-organize onboarding?" },
              ].map((d) => (
                <div key={d.domain} className="flex items-start gap-3 rounded-lg bg-stone-50 p-3">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-teal-600" />
                  <div>
                    <p className="text-sm font-semibold text-stone-900">{d.domain}</p>
                    <p className="text-xs text-stone-500">{d.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-bold text-stone-900">What Employers Get</h4>
            <div className="space-y-3">
              {[
                "Role-specific behavioral scores (not generic personality tests)",
                "Pre-assessed candidates with strengths/growth areas mapped",
                "Salary expectations aligned with market benchmarks",
                "Language proficiency verified (17 languages supported)",
                "EHR system experience and program familiarity confirmed",
                "Resume auto-generated with FQHC-specific bullet points",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <Star className="mt-0.5 size-4 shrink-0 text-amber-500" />
                  <p className="text-sm text-stone-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-purple-200 bg-purple-50/50 p-5">
          <h4 className="mb-2 text-sm font-bold uppercase tracking-widest text-purple-600">
            Our Competitive Moat
          </h4>
          <p className="text-sm leading-relaxed text-stone-700">
            Unlike generic personality tests, our 5-domain framework is purpose-built for
            community health. <strong>Transition Readiness</strong> — the ability to diagnose
            a new situation, build alignment with your manager, and self-organize your own
            onboarding — is the #1 predictor of first-year success that no other healthcare
            staffing platform measures.
          </p>
        </div>
      </SlideWrapper>
    ),
  },

  /* ================================================================ */
  /*  Slide 6: Market Intelligence                                     */
  /* ================================================================ */
  {
    id: "intelligence",
    title: "Market Intelligence",
    content: (
      <SlideWrapper>
        <h2 className="mb-2 text-sm font-bold uppercase tracking-widest text-teal-600">
          Market Intelligence
        </h2>
        <h3 className="text-3xl font-bold text-stone-900 sm:text-4xl">
          Data no one else has.
        </h3>
        <p className="mt-4 max-w-2xl text-lg text-stone-600">
          We track {overview.totalFQHCs} FQHCs, {overview.totalJobs}+ job listings,
          layoff events, funding vulnerability scores, salary benchmarks across{" "}
          {SALARY_BENCHMARKS_COUNT} roles, and policy impact timelines. This powers
          strategic foresight for both candidates and employers.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { value: `${regions.length}`, label: "Regional Snapshots", desc: "Job counts, salary ranges, vulnerability levels per region" },
            { value: `${hotRoles}`, label: "Hot Demand Roles", desc: "Roles with highest unfilled positions relative to supply" },
            { value: "3", label: "Funding Cliffs Tracked", desc: "PPS elimination, dental cuts, CalAIM waiver deadlines" },
            { value: `${SALARY_BENCHMARKS_COUNT}`, label: "Salary Benchmarks", desc: "P25/P50/P75 by role with listing comparison" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-stone-200 bg-white p-5 text-center">
              <p className="text-3xl font-extrabold text-teal-700">{stat.value}</p>
              <p className="mt-1 text-sm font-semibold text-stone-800">{stat.label}</p>
              <p className="mt-1 text-xs text-stone-500">{stat.desc}</p>
            </div>
          ))}
        </div>
      </SlideWrapper>
    ),
  },

  /* ================================================================ */
  /*  Slide 7: Revenue Model                                           */
  /* ================================================================ */
  {
    id: "revenue",
    title: "Revenue Model",
    content: (
      <SlideWrapper>
        <h2 className="mb-2 text-sm font-bold uppercase tracking-widest text-teal-600">
          Revenue Model
        </h2>
        <h3 className="text-3xl font-bold text-stone-900 sm:text-4xl">
          Talent Drop: Curated candidate delivery.
        </h3>

        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          <div className="rounded-xl border-2 border-teal-200 bg-teal-50 p-6">
            <h4 className="text-lg font-bold text-teal-900">For Employers (FQHCs)</h4>
            <div className="mt-4 space-y-3">
              {[
                { model: "Talent Drop ($500–$1,500/role)", desc: "Receive 3–5 pre-assessed, role-matched candidates per open position" },
                { model: "Placement Fee (15–20% of salary)", desc: "Pay only when a candidate is hired and starts" },
                { model: "Subscription ($500–$2,000/mo)", desc: "Unlimited access to candidate pipeline and market intelligence" },
              ].map((item) => (
                <div key={item.model} className="rounded-lg bg-white p-3">
                  <p className="text-sm font-semibold text-teal-800">{item.model}</p>
                  <p className="mt-0.5 text-xs text-stone-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-stone-200 bg-white p-6">
            <h4 className="text-lg font-bold text-stone-900">Free for Candidates — Always</h4>
            <div className="mt-4 space-y-3">
              {[
                "Resume builder (FQHC-optimized, bilingual)",
                "Career assessment (behavioral + role-specific)",
                "Job search (all listings, all regions)",
                "Displaced worker fast-track intake",
                "Market intelligence and salary data",
                "Career consultation booking",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-teal-600" />
                  <p className="text-sm text-stone-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SlideWrapper>
    ),
  },

  /* ================================================================ */
  /*  Slide 8: First Dollar Strategy                                   */
  /* ================================================================ */
  {
    id: "first-dollar",
    title: "First Dollar",
    content: (
      <SlideWrapper>
        <h2 className="mb-2 text-sm font-bold uppercase tracking-widest text-teal-600">
          Go-to-Market
        </h2>
        <h3 className="text-3xl font-bold text-stone-900 sm:text-4xl">
          Path to first revenue.
        </h3>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <div>
            <h4 className="mb-4 text-lg font-bold text-stone-900">Target Customer Profile</h4>
            <div className="space-y-3 rounded-xl bg-stone-50 p-5">
              {[
                { label: "Size", value: "200–500 staff (mid-size FQHC)" },
                { label: "Funding Risk", value: "High vulnerability score" },
                { label: "Hiring Need", value: "Active listings in RN, BH, or dental" },
                { label: "Pain Point", value: "Can't fill specialized roles via Indeed" },
                { label: "Decision Maker", value: "HR Director or COO" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-2 text-sm">
                  <span className="min-w-[100px] font-semibold text-stone-700">{item.label}</span>
                  <span className="text-stone-600">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-bold text-stone-900">GTM Sequence</h4>
            <div className="space-y-3">
              {[
                { phase: "Now", title: "Free Value", desc: "Platform is live with directory, jobs, resume builder, assessment, insights" },
                { phase: "Next", title: "Manual Outreach", desc: "Contact 10 target FQHCs with specific candidate matches from our pipeline" },
                { phase: "First $", title: "Manual Placement", desc: "Place one candidate manually. Charge placement fee. Prove the model." },
                { phase: "Scale", title: "Talent Drop Pilot", desc: "Offer 3 FQHCs a Talent Drop subscription. Deliver 3-5 candidates per open role." },
              ].map((item) => (
                <div key={item.phase} className="flex items-start gap-3 rounded-lg border border-stone-200 bg-white p-4">
                  <span className="mt-0.5 rounded bg-teal-100 px-2 py-0.5 text-xs font-bold text-teal-700">
                    {item.phase}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-stone-900">{item.title}</p>
                    <p className="text-xs text-stone-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SlideWrapper>
    ),
  },

  /* ================================================================ */
  /*  Slide 9: Vision + Contact                                        */
  /* ================================================================ */
  {
    id: "vision",
    title: "Vision & Contact",
    content: (
      <SlideWrapper>
        <div className="text-center">
          <Heart className="mx-auto size-12 fill-teal-700 text-teal-700" />

          <h3 className="mt-6 text-3xl font-bold text-stone-900 sm:text-4xl">
            A California where every community health center<br />
            is fully staffed with professionals who reflect<br />
            the communities they serve.
          </h3>

          <div className="mx-auto mt-10 max-w-xl space-y-3">
            {[
              "Candidate Advocacy — We work for the worker first",
              "FQHC Expertise — We only do community health",
              "Speed — 5 days to first intro, 21 days to placement",
              "Health Equity Impact — Every placement strengthens the safety net",
            ].map((pillar, i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg bg-teal-50 p-3 text-left">
                <CheckCircle2 className="size-5 shrink-0 text-teal-600" />
                <p className="text-sm font-medium text-stone-700">{pillar}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 space-y-2">
            <p className="text-xl font-bold text-teal-700">fqhctalent.com</p>
            <p className="text-sm text-stone-500">
              Contact: info@fqhctalent.com
            </p>
          </div>
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

  const goNext = () => setCurrentSlide((s) => Math.min(s + 1, slides.length - 1));
  const goPrev = () => setCurrentSlide((s) => Math.max(s - 1, 0));

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
            <div className="hidden items-center gap-1 sm:flex">
              {slides.map((slide, i) => (
                <button
                  key={slide.id}
                  onClick={() => setCurrentSlide(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === currentSlide ? "w-6 bg-teal-600" : "w-1.5 bg-stone-300 hover:bg-stone-400"
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

          {/* Slide title */}
          <div className="hidden sm:block">
            <div className="flex items-center gap-2">
              {slides.map((slide, i) => (
                <button
                  key={slide.id}
                  onClick={() => setCurrentSlide(i)}
                  className={`rounded px-2 py-1 text-xs font-medium transition-colors ${
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
