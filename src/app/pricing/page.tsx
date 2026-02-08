import { pageMetadata } from "@/lib/seo-config";

export const metadata = pageMetadata.pricing;

import Link from "next/link";
import {
  Check,
  ArrowRight,
  Shield,
  Star,
  Zap,
  HelpCircle,
  BadgePercent,
  RefreshCcw,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const tiers = [
  {
    name: "Free Trial",
    price: "$0",
    period: "14 days",
    description: "Explore the platform and see candidate profiles risk-free.",
    features: [
      "Browse anonymized candidate profiles",
      "Post up to 2 job openings",
      "Basic search filters",
      "Email support",
    ],
    cta: "Start Free Trial",
    popular: false,
    accent: false,
  },
  {
    name: "Starter",
    price: "$299",
    period: "/month",
    description:
      "For smaller FQHCs filling a handful of critical roles each quarter.",
    features: [
      "Everything in Free Trial",
      "Post up to 5 active openings",
      "Full candidate contact info",
      "Advanced role & skills filters",
      "Dedicated account manager",
    ],
    cta: "Get Started",
    popular: false,
    accent: false,
  },
  {
    name: "Professional",
    price: "$599",
    period: "/month",
    description:
      "Our most popular plan — built for FQHCs with ongoing hiring needs.",
    features: [
      "Everything in Starter",
      "Unlimited job postings",
      "Priority candidate matching",
      "Custom intake questionnaires",
      "Quarterly hiring reports",
      "Phone & Slack support",
    ],
    cta: "Get Started",
    popular: true,
    accent: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description:
      "Tailored solutions for multi-site FQHCs and health center networks.",
    features: [
      "Everything in Professional",
      "Multi-location dashboard",
      "API integrations (ATS / HRIS)",
      "Dedicated recruitment partner",
      "Volume placement discounts",
      "Custom SLA & onboarding",
    ],
    cta: "Contact Us",
    popular: false,
    accent: false,
  },
];

const faqs = [
  {
    q: "How does the 14-day free trial work?",
    a: "Sign up and immediately access anonymized candidate profiles and post up to 2 openings. No credit card required. At the end of 14 days, choose a paid plan or your account pauses — no surprise charges.",
  },
  {
    q: "What is the success-based placement fee?",
    a: "When you hire a candidate sourced through FQHC Talent Exchange, a one-time fee of 15% of the candidate's first-year salary applies. This is only charged upon a successful hire — you never pay if you don't hire.",
  },
  {
    q: "What does the 90-day replacement guarantee cover?",
    a: "If a placed candidate leaves within the first 90 days for any reason, we'll source and present replacement candidates at no additional placement fee. Your subscription continues as normal.",
  },
  {
    q: "Can I switch plans at any time?",
    a: "Yes. Upgrade or downgrade at any time from your dashboard. Changes take effect at the start of your next billing cycle, and we'll prorate any differences.",
  },
  {
    q: "Do you integrate with our existing ATS or HRIS?",
    a: "Enterprise plans include API integrations with popular systems like Greenhouse, Lever, BambooHR, and others. Reach out and we'll confirm compatibility with your stack.",
  },
  {
    q: "Is there a long-term contract?",
    a: "No. All plans are month-to-month with no long-term commitment. Enterprise clients may opt for annual billing at a discounted rate.",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function PricingPage() {
  return (
    <div className="bg-stone-50">
      {/* ---------- Hero ---------- */}
      <section className="bg-gradient-to-br from-teal-600 via-teal-700 to-teal-800 py-14 text-center text-white sm:py-20">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
          Simple, Transparent Pricing
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-teal-100/80 sm:text-lg">
          No hidden fees. Pay only when you find the right hire.
        </p>
      </section>

      {/* ---------- Pricing Cards ---------- */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col justify-between rounded-2xl border p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md ${
                tier.accent
                  ? "border-teal-300 bg-white ring-2 ring-teal-500/20"
                  : "border-stone-200 bg-white"
              }`}
            >
              {tier.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 border-0 bg-amber-500 text-white">
                  <Star className="mr-1 size-3" /> Most Popular
                </Badge>
              )}

              <div>
                <h3 className="text-lg font-semibold text-stone-900">
                  {tier.name}
                </h3>

                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold tracking-tight text-stone-900">
                    {tier.price}
                  </span>
                  {tier.period && (
                    <span className="text-sm text-stone-500">{tier.period}</span>
                  )}
                </div>

                <p className="mt-3 text-sm leading-relaxed text-stone-500">
                  {tier.description}
                </p>

                <ul className="mt-6 space-y-3">
                  {tier.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-sm text-stone-700"
                    >
                      <Check className="mt-0.5 size-4 shrink-0 text-teal-600" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                className={`mt-8 w-full ${
                  tier.accent
                    ? "bg-teal-600 text-white hover:bg-teal-700"
                    : "border-teal-600 text-teal-600 hover:bg-teal-50 hover:text-teal-700"
                }`}
                variant={tier.accent ? "default" : "outline"}
                asChild
              >
                <Link href="/hire">
                  {tier.cta} <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- Success-Based Placement Fees ---------- */}
      <section className="bg-teal-600 py-16 text-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">
              Success-Based Placement Fees
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-teal-100/80 sm:text-lg">
              On top of your subscription, a placement fee applies only when you
              successfully hire a candidate through our platform.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {/* 15 % fee */}
            <div className="rounded-xl bg-white/10 p-6 text-center backdrop-blur">
              <BadgePercent className="mx-auto mb-3 size-10 text-amber-400" />
              <p className="text-3xl font-extrabold">15%</p>
              <p className="mt-1 text-sm font-medium text-teal-100">
                First-Year Salary
              </p>
              <p className="mt-3 text-sm leading-relaxed text-teal-100/70">
                One-time fee charged only when a placed candidate starts work.
                Nothing upfront — ever.
              </p>
            </div>

            {/* Retention bonus */}
            <div className="rounded-xl bg-white/10 p-6 text-center backdrop-blur">
              <Award className="mx-auto mb-3 size-10 text-amber-400" />
              <p className="text-3xl font-extrabold">20%</p>
              <p className="mt-1 text-sm font-medium text-teal-100">
                Candidate Retention Bonus
              </p>
              <p className="mt-3 text-sm leading-relaxed text-teal-100/70">
                Candidates placed through us receive a retention bonus,
                incentivizing long-term commitment to your center.
              </p>
            </div>

            {/* 90-day guarantee */}
            <div className="rounded-xl bg-white/10 p-6 text-center backdrop-blur">
              <RefreshCcw className="mx-auto mb-3 size-10 text-amber-400" />
              <p className="text-3xl font-extrabold">90 Days</p>
              <p className="mt-1 text-sm font-medium text-teal-100">
                Replacement Guarantee
              </p>
              <p className="mt-3 text-sm leading-relaxed text-teal-100/70">
                If a hire doesn&apos;t work out within 90 days, we source
                replacements at no extra placement cost.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <HelpCircle className="mx-auto mb-3 size-8 text-teal-600" />
          <h2 className="text-2xl font-bold text-stone-900 sm:text-3xl">
            Frequently Asked Questions
          </h2>
        </div>

        <dl className="mt-10 space-y-6">
          {faqs.map((faq) => (
            <div
              key={faq.q}
              className="rounded-xl border border-stone-200 bg-white p-6"
            >
              <dt className="text-base font-semibold text-stone-900">
                {faq.q}
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-stone-600">
                {faq.a}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ---------- Bottom CTA ---------- */}
      <section className="bg-gradient-to-br from-stone-800 via-stone-900 to-stone-950 py-16 text-center text-white">
        <Zap className="mx-auto mb-4 size-10 text-amber-400" />
        <h2 className="text-2xl font-bold sm:text-3xl">
          Ready to Start Hiring?
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-stone-300 sm:text-lg">
          Join dozens of FQHCs finding mission-driven talent faster. Start your
          free trial today — no credit card required.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            className="bg-teal-600 text-white hover:bg-teal-700"
            asChild
          >
            <Link href="/hire">
              Get Started Free <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-stone-500 text-stone-200 hover:bg-stone-800 hover:text-white"
            asChild
          >
            <Link href="/join">
              Apply for Early Access <Shield className="size-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
