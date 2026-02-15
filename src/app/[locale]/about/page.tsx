"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  Handshake,
  Zap,
  Building2,
  Heart,
  ArrowRight,
  MapPin,
  Briefcase,
  Users,
  BadgeDollarSign,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  const t = useTranslations("about");
  const tNav = useTranslations("nav");

  /* ---------- Stats ---------- */
  const stats = [
    { value: t("stat1Value"), label: t("stat1Label"), icon: Building2 },
    { value: t("stat2Value"), label: t("stat2Label"), icon: Briefcase },
    { value: t("stat3Value"), label: t("stat3Label"), icon: MapPin },
    { value: t("stat4Value"), label: t("stat4Label"), icon: BadgeDollarSign },
  ];

  /* ---------- Approach cards ---------- */
  const approachCards = [
    { icon: Handshake, title: t("approach1Title"), desc: t("approach1Desc") },
    { icon: Zap, title: t("approach2Title"), desc: t("approach2Desc") },
    { icon: Building2, title: t("approach3Title"), desc: t("approach3Desc") },
    { icon: Heart, title: t("approach4Title"), desc: t("approach4Desc") },
  ];

  return (
    <div className="bg-stone-50">
      {/* ==================== HERO ==================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-700 via-teal-800 to-teal-900 text-white">
        <div className="absolute -left-32 -top-32 size-96 rounded-full bg-teal-500/20 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 size-[28rem] rounded-full bg-amber-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-28 lg:px-8">
          <Badge className="mb-6 border-teal-400/30 bg-teal-500/20 text-teal-100 hover:bg-teal-500/30">
            {t("subtitle")}
          </Badge>

          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            {t("heroTitle")}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-teal-100/90">
            {t("heroSubtitle")}
          </p>
        </div>
      </section>

      {/* ==================== STATS BAR ==================== */}
      <section className="border-b border-stone-200 bg-white">
        <div className="mx-auto grid max-w-5xl grid-cols-2 divide-x divide-stone-200 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center py-8">
              <s.icon className="mb-2 size-5 text-teal-600" />
              <span className="text-2xl font-extrabold text-stone-900">
                {s.value}
              </span>
              <span className="mt-1 text-sm font-medium text-stone-500">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== THE PROBLEM ==================== */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-stone-900">
            {t("problemTitle")}
          </h2>
          <div className="mt-6 space-y-6 text-lg leading-relaxed text-stone-700">
            <p>{t("problemP1")}</p>
            <p>{t("problemP2")}</p>
            <p>{t("problemP3")}</p>
          </div>
        </div>
      </section>

      {/* ==================== OUR APPROACH ==================== */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-stone-900">
            {t("approachTitle")}
          </h2>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {approachCards.map((card) => (
              <div
                key={card.title}
                className="group rounded-2xl border border-stone-200 bg-stone-50 p-8 transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-5 inline-flex size-12 items-center justify-center rounded-xl bg-teal-50 text-teal-700 transition-colors group-hover:bg-teal-700 group-hover:text-white">
                  <card.icon className="size-6" />
                </div>
                <h3 className="text-xl font-semibold text-stone-900">
                  {card.title}
                </h3>
                <p className="mt-3 leading-relaxed text-stone-600">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== WHO WE SERVE ==================== */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="inline-flex size-10 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
              <Users className="size-5" />
            </div>
            <h2 className="text-3xl font-bold text-stone-900">
              {t("serveTitle")}
            </h2>
          </div>
          <div className="mt-6 space-y-6 text-lg leading-relaxed text-stone-700">
            <p>{t("serveP1")}</p>
            <p>{t("serveP2")}</p>
          </div>
        </div>
      </section>

      {/* ==================== WHY IT MATTERS ==================== */}
      <section className="bg-gradient-to-br from-teal-50 via-teal-50 to-stone-50 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-stone-900">
            {t("mattersTitle")}
          </h2>
          <div className="mt-6 space-y-6 text-lg leading-relaxed text-stone-700">
            <p>{t("mattersP1")}</p>
            <p>{t("mattersP2")}</p>
          </div>
        </div>
      </section>

      {/* ==================== FOUNDER NOTE ==================== */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <Heart className="mx-auto mb-4 size-8 text-teal-700" />
          <h2 className="text-2xl font-bold text-stone-900">
            {t("founderTitle")}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-stone-600">
            {t("founderP1")}
          </p>
        </div>
      </section>

      {/* ==================== CTA ==================== */}
      <section className="bg-stone-900 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white">
            {t("ctaTitle")}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-stone-400">
            {t("ctaSubtitle")}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="w-full bg-amber-500 text-stone-900 shadow-lg hover:bg-amber-400 sm:w-auto"
              asChild
            >
              <Link href="/resume-builder">
                {tNav("buildResume")} <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full border-stone-600 bg-transparent text-stone-300 hover:bg-stone-800 hover:text-white sm:w-auto"
              asChild
            >
              <Link href="/hire">{tNav("hireTalent")}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
