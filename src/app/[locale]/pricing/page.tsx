"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
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
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function PricingPage() {
  const t = useTranslations("pricing");
  const tNav = useTranslations("nav");

  const tiers = [
    {
      name: t("tier1Name"),
      price: t("tier1Price"),
      period: t("tier1Period"),
      description: t("tier1Desc"),
      features: [
        t("tier1Feature1"),
        t("tier1Feature2"),
        t("tier1Feature3"),
        t("tier1Feature4"),
      ],
      cta: t("tier1Cta"),
      popular: false,
      accent: false,
    },
    {
      name: t("tier2Name"),
      price: t("tier2Price"),
      period: t("tier2Period"),
      description: t("tier2Desc"),
      features: [
        t("tier2Feature1"),
        t("tier2Feature2"),
        t("tier2Feature3"),
        t("tier2Feature4"),
        t("tier2Feature5"),
      ],
      cta: t("tier2Cta"),
      popular: false,
      accent: false,
    },
    {
      name: t("tier3Name"),
      price: t("tier3Price"),
      period: t("tier3Period"),
      description: t("tier3Desc"),
      features: [
        t("tier3Feature1"),
        t("tier3Feature2"),
        t("tier3Feature3"),
        t("tier3Feature4"),
        t("tier3Feature5"),
        t("tier3Feature6"),
      ],
      cta: t("tier3Cta"),
      popular: true,
      accent: true,
    },
    {
      name: t("tier4Name"),
      price: t("tier4Price"),
      period: "",
      description: t("tier4Desc"),
      features: [
        t("tier4Feature1"),
        t("tier4Feature2"),
        t("tier4Feature3"),
        t("tier4Feature4"),
        t("tier4Feature5"),
        t("tier4Feature6"),
      ],
      cta: t("tier4Cta"),
      popular: false,
      accent: false,
    },
  ];

  const faqs = [
    {
      q: t("faq1Q"),
      a: t("faq1A"),
    },
    {
      q: t("faq2Q"),
      a: t("faq2A"),
    },
    {
      q: t("faq3Q"),
      a: t("faq3A"),
    },
    {
      q: t("faq4Q"),
      a: t("faq4A"),
    },
    {
      q: t("faq5Q"),
      a: t("faq5A"),
    },
    {
      q: t("faq6Q"),
      a: t("faq6A"),
    },
  ];

  return (
    <div className="bg-stone-50">
      {/* ---------- Hero ---------- */}
      <section className="bg-gradient-to-br from-teal-600 via-teal-700 to-teal-800 py-14 text-center text-white sm:py-20">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
          {t("title")}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-teal-100/80 sm:text-lg">
          {t("subtitle")}
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
                  <Star className="mr-1 size-3" /> {t("mostPopular")}
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
              {t("placementFeesTitle")}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-teal-100/80 sm:text-lg">
              {t("placementFeesSubtitle")}
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {/* 15 % fee */}
            <div className="rounded-xl bg-white/10 p-6 text-center backdrop-blur">
              <BadgePercent className="mx-auto mb-3 size-10 text-amber-400" />
              <p className="text-3xl font-extrabold">15%</p>
              <p className="mt-1 text-sm font-medium text-teal-100">
                {t("fee15Title")}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-teal-100/70">
                {t("fee15Desc")}
              </p>
            </div>

            {/* Retention bonus */}
            <div className="rounded-xl bg-white/10 p-6 text-center backdrop-blur">
              <Award className="mx-auto mb-3 size-10 text-amber-400" />
              <p className="text-3xl font-extrabold">20%</p>
              <p className="mt-1 text-sm font-medium text-teal-100">
                {t("retentionTitle")}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-teal-100/70">
                {t("retentionDesc")}
              </p>
            </div>

            {/* 90-day guarantee */}
            <div className="rounded-xl bg-white/10 p-6 text-center backdrop-blur">
              <RefreshCcw className="mx-auto mb-3 size-10 text-amber-400" />
              <p className="text-3xl font-extrabold">90 Days</p>
              <p className="mt-1 text-sm font-medium text-teal-100">
                {t("guaranteeTitle")}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-teal-100/70">
                {t("guaranteeDesc")}
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
            {t("faqTitle")}
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
          {t("ctaTitle")}
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-stone-300 sm:text-lg">
          {t("ctaSubtitle")}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            className="bg-teal-600 text-white hover:bg-teal-700"
            asChild
          >
            <Link href="/hire">
              {t("ctaGetStarted")} <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-stone-500 text-stone-200 hover:bg-stone-800 hover:text-white"
            asChild
          >
            <Link href="/join">
              {tNav("earlyAccess")} <Shield className="size-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
