// Newsletter Signup — Two tracks: Intel Brief (executives) + The Pulse (candidates)
"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  Mail,
  ArrowRight,
  Briefcase,
  Users,
  CheckCircle2,
  Shield,
  FileText,
  TrendingUp,
  Cpu,
  BookOpen,
  Loader2,
  AlertCircle,
  MapPin,
  Sparkles,
  XCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const t = (obj: { en: string; es: string }, locale: string) =>
  locale === "es" ? obj.es : obj.en;

type AudienceChoice = "intel-brief" | "the-pulse" | "both";

const REGIONS = [
  { value: "los-angeles", en: "Los Angeles", es: "Los Angeles" },
  { value: "san-diego", en: "San Diego", es: "San Diego" },
  { value: "bay-area", en: "Bay Area", es: "Area de la Bahia" },
  { value: "sacramento", en: "Sacramento", es: "Sacramento" },
  { value: "central-valley", en: "Central Valley", es: "Valle Central" },
  { value: "inland-empire", en: "Inland Empire", es: "Inland Empire" },
  { value: "central-coast", en: "Central Coast", es: "Costa Central" },
  { value: "north-state", en: "North State", es: "Norte del Estado" },
  { value: "north-coast", en: "North Coast", es: "Costa Norte" },
];

/* ------------------------------------------------------------------ */
/*  Track Card                                                         */
/* ------------------------------------------------------------------ */

function TrackCard({
  locale,
  isEs,
  icon: Icon,
  title,
  badgeLabel,
  badgeColor,
  description,
  bullets,
  frequency,
  isSelected,
  onSelect,
}: {
  locale: string;
  isEs: boolean;
  icon: React.ElementType;
  title: string;
  badgeLabel: string;
  badgeColor: string;
  description: { en: string; es: string };
  bullets: { icon: React.ElementType; label: { en: string; es: string } }[];
  frequency: { en: string; es: string };
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full text-left rounded-2xl border-2 bg-white p-6 transition-all hover:shadow-md ${
        isSelected
          ? "border-teal-600 shadow-md ring-1 ring-teal-600/20"
          : "border-stone-200 hover:border-stone-300"
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div
            className={`flex size-10 items-center justify-center rounded-xl ${
              isSelected ? "bg-teal-100" : "bg-stone-100"
            }`}
          >
            <Icon
              className={`size-5 ${
                isSelected ? "text-teal-700" : "text-stone-500"
              }`}
            />
          </div>
          <div>
            <h3 className="text-lg font-bold text-stone-900">{title}</h3>
          </div>
        </div>
        <Badge
          variant="secondary"
          className={`text-xs shrink-0 ${badgeColor}`}
        >
          {badgeLabel}
        </Badge>
      </div>

      <p className="text-sm text-stone-500 leading-relaxed mb-4">
        {t(description, locale)}
      </p>

      <ul className="space-y-2 mb-4">
        {bullets.map((bullet, i) => (
          <li
            key={i}
            className="flex items-center gap-2 text-sm text-stone-600"
          >
            <bullet.icon className="size-4 text-teal-600 shrink-0" />
            {t(bullet.label, locale)}
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between pt-3 border-t border-stone-100">
        <span className="text-xs text-stone-400">
          {t(frequency, locale)}
        </span>
        <div
          className={`size-5 rounded-full border-2 flex items-center justify-center transition-colors ${
            isSelected
              ? "border-teal-600 bg-teal-600"
              : "border-stone-300"
          }`}
        >
          {isSelected && <CheckCircle2 className="size-3 text-white" />}
        </div>
      </div>
    </button>
  );
}

/* ================================================================== */
/*  Newsletter Signup Page                                              */
/* ================================================================== */

export default function NewsletterPage() {
  const locale = useLocale();
  const isEs = locale === "es";

  const [email, setEmail] = useState("");
  const [audience, setAudience] = useState<AudienceChoice>("both");
  const [region, setRegion] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, audience, region: region || null }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(
          data.error ||
            (isEs
              ? "No se pudo completar la suscripcion."
              : "Could not complete subscription.")
        );
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : isEs
            ? "Algo salio mal. Intenta de nuevo."
            : "Something went wrong. Please try again."
      );
    }
  };

  // Which tracks are selected based on audience choice
  const intelSelected = audience === "intel-brief" || audience === "both";
  const pulseSelected = audience === "the-pulse" || audience === "both";

  const handleTrackClick = (track: "intel-brief" | "the-pulse") => {
    if (track === "intel-brief") {
      if (audience === "both") setAudience("the-pulse");
      else if (audience === "the-pulse") setAudience("both");
      else setAudience("intel-brief");
    } else {
      if (audience === "both") setAudience("intel-brief");
      else if (audience === "intel-brief") setAudience("both");
      else setAudience("the-pulse");
    }
  };

  return (
    <div className="bg-stone-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 text-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-4">
            <Mail className="size-5 text-teal-400" />
            <span className="text-sm font-medium uppercase tracking-wider text-teal-400">
              {isEs ? "Inteligencia" : "Intelligence"}
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            {isEs
              ? "Informes de Inteligencia FQHC"
              : "FQHC Intelligence Briefings"}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-stone-300">
            {isEs
              ? "Analisis semanal de politicas, financiamiento, fuerza laboral y tecnologia para el sector de salud comunitaria de California. Cada dato respaldado por fuentes primarias."
              : "Weekly analysis of policy, funding, workforce, and technology for California's community health sector. Every insight backed by primary sources."}
          </p>
          <div className="mt-6 flex items-center gap-4 text-sm text-stone-400">
            <span>
              {isEs ? "2 informes semanales" : "2 weekly briefings"}
            </span>
            <span className="text-stone-600">·</span>
            <span>
              {isEs ? "Fuentes primarias" : "Primary sources"}
            </span>
            <span className="text-stone-600">·</span>
            <span>
              {isEs ? "Cancela cuando quieras" : "Unsubscribe anytime"}
            </span>
          </div>
        </div>
      </section>

      {/* Track Cards + Signup Form */}
      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-stone-900 sm:text-2xl">
              {isEs
                ? "Elige tu informe"
                : "Choose Your Briefing"}
            </h2>
            <p className="mt-2 text-sm text-stone-500">
              {isEs
                ? "Selecciona uno o ambos. Haz clic en las tarjetas para alternar."
                : "Select one or both. Click the cards to toggle."}
            </p>
          </div>

          {/* Two Track Cards */}
          <div className="grid gap-4 sm:grid-cols-2 mb-10">
            <TrackCard
              locale={locale}
              isEs={isEs}
              icon={Briefcase}
              title="Intel Brief"
              badgeLabel={isEs ? "Para Lideres" : "For Leaders"}
              badgeColor="bg-stone-800 text-white"
              description={{
                en: "Weekly executive briefing for FQHC leaders and HR directors. Policy analysis, funding alerts, and workforce data you can act on.",
                es: "Informe ejecutivo semanal para lideres de FQHCs y directores de RR.HH. Analisis de politicas, alertas de financiamiento y datos de fuerza laboral accionables.",
              }}
              bullets={[
                {
                  icon: FileText,
                  label: {
                    en: "Policy timeline updates",
                    es: "Actualizaciones de politicas",
                  },
                },
                {
                  icon: AlertCircle,
                  label: {
                    en: "Funding cliff alerts",
                    es: "Alertas de precipicio fiscal",
                  },
                },
                {
                  icon: Cpu,
                  label: {
                    en: "AI adoption tracking",
                    es: "Seguimiento de adopcion de IA",
                  },
                },
                {
                  icon: BookOpen,
                  label: {
                    en: "Case study highlights",
                    es: "Destacados de estudios de caso",
                  },
                },
              ]}
              frequency={{
                en: "Weekly — Tuesdays",
                es: "Semanal — Martes",
              }}
              isSelected={intelSelected}
              onSelect={() => handleTrackClick("intel-brief")}
            />

            <TrackCard
              locale={locale}
              isEs={isEs}
              icon={Users}
              title="The Pulse"
              badgeLabel={isEs ? "Para Candidatos" : "For Job Seekers"}
              badgeColor="bg-teal-100 text-teal-800"
              description={{
                en: "Weekly career update for healthcare professionals. Job market intel, free tools, salary trends, and opportunities at California FQHCs.",
                es: "Actualizacion semanal para profesionales de salud. Inteligencia del mercado laboral, herramientas gratuitas, tendencias salariales y oportunidades en FQHCs de California.",
              }}
              bullets={[
                {
                  icon: TrendingUp,
                  label: {
                    en: "New FQHC job listings",
                    es: "Nuevas vacantes en FQHCs",
                  },
                },
                {
                  icon: TrendingUp,
                  label: {
                    en: "Salary & market trends",
                    es: "Tendencias salariales y del mercado",
                  },
                },
                {
                  icon: Sparkles,
                  label: {
                    en: "Free tool highlights",
                    es: "Herramientas gratuitas destacadas",
                  },
                },
                {
                  icon: BookOpen,
                  label: {
                    en: "Career development tips",
                    es: "Consejos de desarrollo profesional",
                  },
                },
              ]}
              frequency={{
                en: "Weekly — Wednesdays",
                es: "Semanal — Miercoles",
              }}
              isSelected={pulseSelected}
              onSelect={() => handleTrackClick("the-pulse")}
            />
          </div>

          {/* Signup Form */}
          {status === "success" ? (
            <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
              <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-green-100">
                <CheckCircle2 className="size-7 text-green-700" />
              </div>
              <h3 className="text-xl font-bold text-green-900">
                {isEs ? "Ya estas dentro!" : "You're in!"}
              </h3>
              <p className="mt-2 text-sm text-green-700">
                {isEs
                  ? "Revisa tu correo para confirmar tu suscripcion. Tu primer informe llegara pronto."
                  : "Check your email to confirm your subscription. Your first briefing is on its way."}
              </p>
              <div className="mt-6 flex items-center justify-center gap-4">
                <Button variant="outline" asChild>
                  <Link href="/insights">
                    {isEs ? "Ver Dashboard" : "View Dashboard"}{" "}
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/blog">
                    {isEs ? "Leer Blog" : "Read Blog"}{" "}
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8"
            >
              <h3 className="text-lg font-bold text-stone-900 mb-1">
                {isEs ? "Suscribete" : "Subscribe"}
              </h3>
              <p className="text-sm text-stone-500 mb-6">
                {isEs
                  ? "Ingresa tu correo y selecciona tu region (opcional)."
                  : "Enter your email and select your region (optional)."}
              </p>

              {/* Email */}
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-stone-700 mb-1.5"
                >
                  {isEs ? "Correo electronico" : "Email address"} *
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={
                    isEs ? "tu@correo.com" : "you@example.com"
                  }
                  className="w-full rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-colors"
                />
              </div>

              {/* Audience selector */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  {isEs ? "Informe" : "Briefing"}
                </label>
                <div className="flex flex-wrap gap-2">
                  {(
                    [
                      {
                        value: "intel-brief" as AudienceChoice,
                        en: "Intel Brief (Executive)",
                        es: "Intel Brief (Ejecutivo)",
                      },
                      {
                        value: "the-pulse" as AudienceChoice,
                        en: "The Pulse (Career)",
                        es: "The Pulse (Carrera)",
                      },
                      {
                        value: "both" as AudienceChoice,
                        en: "Both",
                        es: "Ambos",
                      },
                    ] as const
                  ).map((option) => (
                    <label
                      key={option.value}
                      className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm cursor-pointer transition-colors ${
                        audience === option.value
                          ? "border-teal-600 bg-teal-50 text-teal-800"
                          : "border-stone-200 bg-white text-stone-600 hover:border-stone-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="audience"
                        value={option.value}
                        checked={audience === option.value}
                        onChange={() => setAudience(option.value)}
                        className="sr-only"
                      />
                      <div
                        className={`size-4 rounded-full border-2 flex items-center justify-center ${
                          audience === option.value
                            ? "border-teal-600"
                            : "border-stone-300"
                        }`}
                      >
                        {audience === option.value && (
                          <div className="size-2 rounded-full bg-teal-600" />
                        )}
                      </div>
                      {t(option, locale)}
                    </label>
                  ))}
                </div>
              </div>

              {/* Region dropdown */}
              <div className="mb-6">
                <label
                  htmlFor="region"
                  className="block text-sm font-medium text-stone-700 mb-1.5"
                >
                  <span className="flex items-center gap-1.5">
                    <MapPin className="size-3.5" />
                    {isEs ? "Region (opcional)" : "Region (optional)"}
                  </span>
                </label>
                <select
                  id="region"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-sm text-stone-900 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-colors"
                >
                  <option value="">
                    {isEs ? "Todas las regiones" : "All regions"}
                  </option>
                  {REGIONS.map((r) => (
                    <option key={r.value} value={r.value}>
                      {isEs ? r.es : r.en}
                    </option>
                  ))}
                </select>
              </div>

              {/* Error message */}
              {status === "error" && (
                <div className="mb-4 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3">
                  <XCircle className="size-4 text-red-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{errorMessage}</p>
                </div>
              )}

              {/* Submit */}
              <Button
                type="submit"
                disabled={status === "loading" || !email}
                className="w-full bg-teal-700 hover:bg-teal-800 text-white py-2.5"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="size-4 animate-spin mr-2" />
                    {isEs ? "Suscribiendo..." : "Subscribing..."}
                  </>
                ) : (
                  <>
                    <Mail className="size-4 mr-2" />
                    {isEs ? "Suscribirse" : "Subscribe"}
                  </>
                )}
              </Button>
            </form>
          )}

          {/* Trust section */}
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="flex items-start gap-3 rounded-xl border border-stone-100 bg-white p-4">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-teal-50">
                <FileText className="size-4 text-teal-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-stone-800">
                  {isEs
                    ? "Fuentes primarias"
                    : "Primary sources"}
                </p>
                <p className="text-xs text-stone-500 mt-0.5">
                  {isEs
                    ? "Cada dato respaldado por fuentes verificables"
                    : "Every insight backed by verifiable sources"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-xl border border-stone-100 bg-white p-4">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-teal-50">
                <Shield className="size-4 text-teal-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-stone-800">
                  {isEs
                    ? "Cancela en un clic"
                    : "Unsubscribe anytime"}
                </p>
                <p className="text-xs text-stone-500 mt-0.5">
                  {isEs
                    ? "Un clic para cancelar. Sin compromisos."
                    : "One click to unsubscribe. No commitments."}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-xl border border-stone-100 bg-white p-4">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-teal-50">
                <Sparkles className="size-4 text-teal-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-stone-800">
                  {isEs
                    ? "Sin spam, sin relleno"
                    : "No spam, no fluff"}
                </p>
                <p className="text-xs text-stone-500 mt-0.5">
                  {isEs
                    ? "Solo inteligencia FQHC que importa"
                    : "Just FQHC intelligence that matters"}
                </p>
              </div>
            </div>
          </div>

          {/* Related links */}
          <div className="mt-10 flex items-center justify-center gap-4">
            <Button variant="outline" asChild>
              <Link href="/insights">
                {isEs ? "Dashboard de Inteligencia" : "Intelligence Dashboard"}{" "}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/blog">
                {isEs ? "Leer Articulos" : "Read Articles"}{" "}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
