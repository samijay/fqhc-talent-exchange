// FQHC Talent Exchange v1
"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import {
  Shield,
  Users,
  Zap,
  ClipboardList,
  Handshake,
  Rocket,
  ArrowRight,
  Mail,
  Star,
  MapPin,
  Building2,
  Quote,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { californiaFQHCs } from "@/lib/california-fqhcs";

export default function Home() {
  const t = useTranslations("home");
  const tRoles = useTranslations("roles");
  const tNav = useTranslations("nav");

  const [email, setEmail] = useState("");
  const [emailStatus, setEmailStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [emailMessage, setEmailMessage] = useState("");

  /* ---------- Stats ---------- */
  const stats = [
    { value: t("stat1Value"), label: t("stat1Label") },
    { value: t("stat2Value"), label: t("stat2Label") },
    { value: t("stat3Value"), label: t("stat3Label") },
  ];

  /* ---------- Why Cards ---------- */
  const whyCards = [
    {
      icon: Shield,
      title: t("why1Title"),
      body: t("why1Description"),
    },
    {
      icon: Users,
      title: t("why2Title"),
      body: t("why2Description"),
    },
    {
      icon: Zap,
      title: t("why3Title"),
      body: t("why3Description"),
    },
  ];

  /* ---------- How It Works ---------- */
  const steps = [
    {
      icon: ClipboardList,
      step: "1",
      title: t("step1Title"),
      body: t("step1Description"),
    },
    {
      icon: Handshake,
      step: "2",
      title: t("step2Title"),
      body: t("step2Description"),
    },
    {
      icon: Rocket,
      step: "3",
      title: t("step3Title"),
      body: t("step3Description"),
    },
  ];

  /* ---------- Role Badges ---------- */
  const roles = [
    tRoles("communityHealthWorker"),
    tRoles("careCoordinator"),
    tRoles("medicalAssistant"),
    tRoles("caseManager"),
    tRoles("behavioralHealthSpecialist"),
    tRoles("registeredNurse"),
    tRoles("nursePractitioner"),
    tRoles("licensedClinicalSocialWorker"),
    tRoles("dentalHygienist"),
    tRoles("healthEducator"),
    tRoles("patientServicesRep"),
    tRoles("medicalDirector"),
  ];

  return (
    <div className="bg-stone-50">
      {/* ==================== HERO ==================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-700 via-teal-800 to-teal-900 text-white">
        {/* decorative blobs */}
        <div className="absolute -left-32 -top-32 size-96 rounded-full bg-teal-500/20 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 size-[28rem] rounded-full bg-amber-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-6 border-teal-400/30 bg-teal-500/20 text-teal-100 hover:bg-teal-500/30">
              {t("badge")}
            </Badge>

            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              {t("heroTitle", { days: "21" })}
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-teal-100/90 sm:text-xl">
              {t("heroSubtitle")}
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
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
                className="w-full border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white sm:w-auto"
                asChild
              >
                <Link href="/hire">{tNav("hireTalent")}</Link>
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
              <span className="text-3xl font-extrabold text-teal-700">
                {s.value}
              </span>
              <span className="mt-1 text-sm font-medium text-stone-500">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== DISPLACED WORKER BANNER ==================== */}
      <section className="bg-gradient-to-r from-amber-50 to-teal-50 border-b border-amber-200">
        <Link
          href="/fast-track"
          className="group mx-auto flex max-w-4xl items-center gap-4 px-4 py-4 sm:px-6 lg:px-8"
        >
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-amber-100">
            <Zap className="size-5 text-amber-600" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-stone-900 text-sm sm:text-base">
              {t("fastTrackTitle")}
            </p>
            <p className="text-xs sm:text-sm text-stone-600">
              {t("fastTrackSubtitle")}
            </p>
          </div>
          <ArrowRight className="size-5 shrink-0 text-stone-400 transition-transform group-hover:translate-x-1" />
        </Link>
      </section>

      {/* ==================== WHY WE'RE DIFFERENT ==================== */}
      <section className="bg-stone-50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
              {t("whyTitle")}
            </h2>
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {whyCards.map((card) => (
              <div
                key={card.title}
                className="group rounded-2xl border border-stone-200 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-5 inline-flex size-12 items-center justify-center rounded-xl bg-teal-50 text-teal-700 transition-colors group-hover:bg-teal-700 group-hover:text-white">
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
      <section className="bg-teal-700 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {t("howTitle")}
            </h2>
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((s) => (
              <div
                key={s.step}
                className="group rounded-2xl border border-teal-500/30 bg-teal-800/50 p-8 backdrop-blur transition-all hover:-translate-y-1 hover:bg-teal-800/70"
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
              {t("rolesTitle")}
            </h2>
            <p className="mt-4 text-lg text-stone-500">
              {t("rolesSubtitle")}
            </p>
          </div>

          <div className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-3">
            {roles.map((role) => (
              <Badge
                key={role}
                variant="outline"
                className="cursor-default border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 transition-colors hover:border-teal-400 hover:bg-teal-50 hover:text-teal-800"
              >
                {role}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== TESTIMONIALS ==================== */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
              {t("testimonialsTitle")}
            </h2>
            <p className="mt-4 text-lg text-stone-500">
              {t("testimonialsSubtitle")}
            </p>
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="relative rounded-2xl border border-stone-200 bg-stone-50 p-8"
              >
                <Quote className="mb-4 size-8 text-teal-200" />
                <p className="text-sm leading-relaxed text-stone-600 italic">
                  &ldquo;{t(`testimonial${i}Quote`)}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-teal-700 text-sm font-bold text-white">
                    {t(`testimonial${i}Name`).charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-stone-900">
                      {t(`testimonial${i}Name`)}
                    </p>
                    <p className="text-xs text-stone-500">
                      {t(`testimonial${i}Role`)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FEATURED FQHCS ==================== */}
      <section className="bg-stone-50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
              {t("featuredTitle")}
            </h2>
            <p className="mt-4 text-lg text-stone-500">
              {t("featuredSubtitle")}
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {californiaFQHCs
              .filter((f) => f.glassdoorRating || parseInt(f.staffCount) > 500)
              .slice(0, 6)
              .map((fqhc) => (
                <Link
                  key={fqhc.slug}
                  href={`/directory/${fqhc.slug}` as "/directory"}
                  className="group rounded-2xl border border-stone-200 bg-white p-6 transition-all hover:-translate-y-1 hover:border-teal-200 hover:shadow-md"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-stone-900 group-hover:text-teal-700">
                        {fqhc.name}
                      </h3>
                      <p className="mt-1 flex items-center gap-1 text-sm text-stone-500">
                        <MapPin className="size-3.5" />
                        {fqhc.city}, CA
                      </p>
                    </div>
                    {fqhc.glassdoorRating && (
                      <div className="flex items-center gap-1 rounded-lg bg-amber-50 px-2 py-1">
                        <Star className="size-3.5 fill-amber-500 text-amber-500" />
                        <span className="text-sm font-semibold text-amber-700">
                          {fqhc.glassdoorRating.toFixed(1)}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 flex items-center gap-4 text-xs text-stone-500">
                    <span className="flex items-center gap-1">
                      <Building2 className="size-3.5" />
                      {fqhc.siteCount} {t("featuredSites")}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="size-3.5" />
                      {fqhc.staffCount} {t("featuredStaff")}
                    </span>
                  </div>

                  <p className="mt-3 text-xs font-medium text-teal-700 opacity-0 transition-opacity group-hover:opacity-100">
                    {t("viewProfile")} <ArrowRight className="inline size-3" />
                  </p>
                </Link>
              ))}
          </div>

          <div className="mt-10 text-center">
            <Button variant="outline" size="lg" asChild>
              <Link href="/directory">
                {t("viewAllFqhcs")} <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ==================== EMAIL SIGNUP ==================== */}
      <section className="bg-stone-900 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-xl text-center">
            <Mail className="mx-auto mb-4 size-10 text-amber-400" />
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {t("newsletterTitle")}
            </h2>
            <p className="mt-4 text-base text-stone-400">
              {t("newsletterSubtitle")}
            </p>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setEmailStatus("loading");
                try {
                  const res = await fetch("/api/early-access", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email }),
                  });
                  const result = await res.json();
                  if (!res.ok) {
                    setEmailStatus("error");
                    setEmailMessage(result.error || "Something went wrong.");
                  } else {
                    setEmailStatus("success");
                    setEmailMessage(result.message);
                    setEmail("");
                  }
                } catch {
                  setEmailStatus("error");
                  setEmailMessage("Network error. Please try again.");
                }
              }}
              className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
            >
              <Input
                type="email"
                required
                placeholder={t("newsletterPlaceholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={emailStatus === "loading"}
                className="h-12 w-full border-stone-700 bg-stone-800 text-white placeholder:text-stone-500 focus-visible:border-teal-500 focus-visible:ring-teal-500/30 sm:w-72"
              />
              <Button
                type="submit"
                size="lg"
                disabled={emailStatus === "loading"}
                className="w-full bg-teal-700 text-white hover:bg-teal-500 sm:w-auto"
              >
                {emailStatus === "loading" ? (
                  "Signing up..."
                ) : (
                  <>{t("newsletterButton")} <ArrowRight className="size-4" /></>
                )}
              </Button>
            </form>

            {emailStatus === "success" && (
              <p className="mt-4 text-sm font-medium text-teal-400">
                {emailMessage}
              </p>
            )}
            {emailStatus === "error" && (
              <p className="mt-4 text-sm font-medium text-red-400">
                {emailMessage}
              </p>
            )}
            {emailStatus === "idle" && (
              <p className="mt-4 text-xs text-stone-500">
                {t("newsletterDisclaimer")}
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
