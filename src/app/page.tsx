"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Heart,
  Shield,
  Users,
  Zap,
  ClipboardList,
  Handshake,
  Rocket,
  ArrowRight,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

/* ---------- Stats ---------- */
const stats = [
  { value: "5 Days", label: "to First Intro" },
  { value: "21 Days", label: "Avg Placement" },
  { value: "100%", label: "FQHC Focused" },
];

/* ---------- Why Cards ---------- */
const whyCards = [
  {
    icon: Shield,
    title: "FQHC Expertise",
    body: "We understand 330 grants, sliding-fee scales, UDS reporting and the unique culture of community health centers.",
  },
  {
    icon: Users,
    title: "Candidate Advocacy",
    body: "Every candidate gets a dedicated advocate who guides them from first conversation through day one on the job.",
  },
  {
    icon: Zap,
    title: "Speed to Hire",
    body: "Our streamlined process and pre-vetted talent pool means you can fill critical roles before burnout sets in.",
  },
];

/* ---------- How It Works ---------- */
const steps = [
  {
    icon: ClipboardList,
    step: "1",
    title: "Tell Us What You Need",
    body: "Share your open roles, must-haves and culture — we listen first.",
  },
  {
    icon: Handshake,
    step: "2",
    title: "We Match & Introduce",
    body: "Within days, you receive pre-vetted candidates who align with your mission.",
  },
  {
    icon: Rocket,
    step: "3",
    title: "Hire with Confidence",
    body: "We support the offer process and follow up post-placement to ensure success.",
  },
];

/* ---------- Role Badges ---------- */
const roles = [
  "Family Medicine Physician",
  "Nurse Practitioner",
  "Dentist",
  "Behavioral Health Specialist",
  "Medical Director",
  "Clinical Pharmacist",
  "Care Coordinator",
  "Health Center CEO",
  "CFO / Finance Director",
  "IT / EHR Specialist",
  "Registered Nurse",
  "Physician Assistant",
];

export default function Home() {
  const [email, setEmail] = useState("");

  return (
    <div className="bg-stone-50">
      {/* ==================== HERO ==================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-600 via-teal-700 to-teal-800 text-white">
        {/* decorative blobs */}
        <div className="absolute -left-32 -top-32 size-96 rounded-full bg-teal-500/20 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 size-[28rem] rounded-full bg-amber-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-6 border-teal-400/30 bg-teal-500/20 text-teal-100 hover:bg-teal-500/30">
              The talent exchange built for community health
            </Badge>

            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Find Your Next FQHC Role in{" "}
              <span className="text-amber-400">21 Days</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-teal-100/90 sm:text-xl">
              We connect mission-driven healthcare professionals with Federally
              Qualified Health Centers across the country — faster and more
              personally than any job board.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="w-full bg-amber-500 text-stone-900 shadow-lg hover:bg-amber-400 sm:w-auto"
                asChild
              >
                <Link href="/join">
                  Join as Candidate <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full border-white/30 text-white hover:bg-white/10 sm:w-auto"
                asChild
              >
                <Link href="/employers">I&apos;m Hiring</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== STATS BAR ==================== */}
      <section className="border-b border-stone-200 bg-white">
        <div className="mx-auto grid max-w-4xl grid-cols-1 divide-y divide-stone-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center py-8">
              <span className="text-3xl font-extrabold text-teal-600">
                {s.value}
              </span>
              <span className="mt-1 text-sm font-medium text-stone-500">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== WHY WE'RE DIFFERENT ==================== */}
      <section className="bg-stone-50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
              Why We&apos;re Different
            </h2>
            <p className="mt-4 text-lg text-stone-500">
              We&apos;re not a generic job board. Every part of our process is
              designed for the unique needs of FQHCs.
            </p>
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {whyCards.map((card) => (
              <div
                key={card.title}
                className="group rounded-2xl border border-stone-200 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-5 inline-flex size-12 items-center justify-center rounded-xl bg-teal-50 text-teal-600 transition-colors group-hover:bg-teal-600 group-hover:text-white">
                  <card.icon className="size-6" />
                </div>
                <h3 className="text-lg font-semibold text-stone-900">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-500">
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== HOW IT WORKS ==================== */}
      <section className="bg-teal-600 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-4 text-lg text-teal-100/80">
              Three simple steps to your next great hire — or your next great
              role.
            </p>
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((s) => (
              <div
                key={s.step}
                className="group rounded-2xl border border-teal-500/30 bg-teal-700/50 p-8 backdrop-blur transition-all hover:-translate-y-1 hover:bg-teal-700/70"
              >
                <span className="mb-4 inline-flex size-10 items-center justify-center rounded-full bg-amber-500 text-lg font-bold text-stone-900">
                  {s.step}
                </span>
                <div className="mb-3 inline-flex items-center gap-2">
                  <s.icon className="size-5 text-teal-200" />
                  <h3 className="text-lg font-semibold text-white">
                    {s.title}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-teal-100/80">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== ROLES WE FILL ==================== */}
      <section className="bg-stone-50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
              Roles We Fill
            </h2>
            <p className="mt-4 text-lg text-stone-500">
              From clinical providers to executive leadership — if it&apos;s
              FQHC, we know it.
            </p>
          </div>

          <div className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-3">
            {roles.map((role) => (
              <Badge
                key={role}
                variant="outline"
                className="cursor-default border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 transition-colors hover:border-teal-400 hover:bg-teal-50 hover:text-teal-700"
              >
                {role}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== EMAIL SIGNUP ==================== */}
      <section className="bg-stone-900 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-xl text-center">
            <Mail className="mx-auto mb-4 size-10 text-amber-400" />
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Stay in the Loop
            </h2>
            <p className="mt-4 text-base text-stone-400">
              Get weekly FQHC job alerts, salary insights and community health
              career tips — no spam, ever.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setEmail("");
              }}
              className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
            >
              <Input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 w-full border-stone-700 bg-stone-800 text-white placeholder:text-stone-500 focus-visible:border-teal-500 focus-visible:ring-teal-500/30 sm:w-72"
              />
              <Button
                type="submit"
                size="lg"
                className="w-full bg-teal-600 text-white hover:bg-teal-500 sm:w-auto"
              >
                Subscribe <ArrowRight className="size-4" />
              </Button>
            </form>

            <p className="mt-4 text-xs text-stone-500">
              Unsubscribe anytime. We respect your inbox.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
