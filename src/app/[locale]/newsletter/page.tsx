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
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { NewsletterQuestionnaireForm } from "@/components/newsletter/NewsletterQuestionnaireForm";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const t = (obj: { en: string; es: string }, locale: string) =>
  locale === "es" ? obj.es : obj.en;

type AudienceChoice = "intel-brief" | "the-pulse" | "both";

/* ------------------------------------------------------------------ */
/*  Track Card                                                         */
/* ------------------------------------------------------------------ */

function TrackCard({
  locale,
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
        <span className="text-xs text-stone-500">
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

  // Which tracks are selected for TrackCard display (informational only — questionnaire handles actual subscribe)
  const [audience, setAudience] = useState<AudienceChoice>("both");
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
          <div className="mt-6 flex items-center gap-4 text-sm text-stone-500">
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
                en: "Weekly — Tuesdays",
                es: "Semanal — Martes",
              }}
              isSelected={pulseSelected}
              onSelect={() => handleTrackClick("the-pulse")}
            />
          </div>

          {/* Personalized Signup Questionnaire */}
          <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8">
            <div className="mb-5">
              <h3 className="text-lg font-bold text-stone-900">
                {isEs ? "Personaliza tu informe" : "Personalize your briefing"}
              </h3>
              <p className="text-sm text-stone-500 mt-1">
                {isEs
                  ? "4 preguntas rápidas para curar el contenido que más importa para ti."
                  : "4 quick questions so we curate exactly what matters to you."}
              </p>
            </div>
            <NewsletterQuestionnaireForm />
          </div>

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
              <Link href="/">
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
