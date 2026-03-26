"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Building2, Briefcase, ArrowRight } from "lucide-react";

interface HeroSectionProps {
  totalFQHCs: number;
  totalJobs: number;
  totalIntel: number;
}

export function HeroSection({ totalFQHCs, totalJobs, totalIntel }: HeroSectionProps) {
  const locale = useLocale();
  const isEs = locale === "es";

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-900/20 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            {isEs
              ? "Plataforma de Inteligencia FQHC de California"
              : "California's FQHC Intelligence Platform"}
          </h1>

          {/* Clickable stat pills */}
          <div className="mx-auto mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Link
              href="/directory"
              className="inline-flex items-center gap-1.5 rounded-full border border-teal-500/30 bg-teal-900/30 px-4 py-1.5 text-sm font-semibold text-teal-300 transition-colors hover:border-teal-400 hover:bg-teal-800/40 hover:text-teal-200"
            >
              <span className="text-white">{totalFQHCs}+</span>{" "}
              {isEs ? "FQHCs" : "FQHCs Tracked"}
            </Link>
            <Link
              href="/jobs"
              className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-900/30 px-4 py-1.5 text-sm font-semibold text-amber-300 transition-colors hover:border-amber-400 hover:bg-amber-800/40 hover:text-amber-200"
            >
              <span className="text-white">{totalJobs.toLocaleString()}+</span>{" "}
              {isEs ? "Empleos" : "Jobs"}
            </Link>
            <Link
              href="/layoffs"
              className="inline-flex items-center gap-1.5 rounded-full border border-stone-500/30 bg-stone-700/30 px-4 py-1.5 text-sm font-semibold text-stone-300 transition-colors hover:border-stone-400 hover:bg-stone-600/40 hover:text-stone-200"
            >
              <span className="text-white">{totalIntel}</span>{" "}
              {isEs ? "Items de Intel" : "Intel Items"}
            </Link>
          </div>

          <p className="mx-auto mt-4 max-w-xl text-sm text-stone-400">
            {isEs
              ? "Actualizado semanalmente con fuentes primarias."
              : "Updated weekly from primary sources."}
          </p>
        </div>

        {/* Two-path CTA cards */}
        <div className="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-2 sm:gap-6">
          {/* Leader path */}
          <button
            onClick={() => scrollTo("for-leaders")}
            className="group rounded-2xl border-2 border-teal-600/30 bg-white/5 p-8 text-left backdrop-blur transition-all duration-300 hover:border-teal-400 hover:bg-white/10 sm:p-10"
          >
            <Building2 className="mb-4 size-8 text-teal-400" />
            <h2 className="text-xl font-bold text-white sm:text-2xl">
              {isEs ? "Lidero un FQHC" : "I Lead an FQHC"}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-stone-400">
              {isEs
                ? "Inteligencia estrategica, alertas de financiamiento, OKRs, puntajes de resiliencia"
                : "Strategic intelligence, funding alerts, OKRs, resilience scores"}
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-teal-400 transition-transform group-hover:translate-x-1">
              {isEs ? "Explorar" : "Explore"} <ArrowRight className="size-4" />
            </span>
          </button>

          {/* Job seeker path */}
          <button
            onClick={() => scrollTo("for-job-seekers")}
            className="group rounded-2xl border-2 border-amber-500/30 bg-white/5 p-8 text-left backdrop-blur transition-all duration-300 hover:border-amber-400 hover:bg-white/10 sm:p-10"
          >
            <Briefcase className="mb-4 size-8 text-amber-400" />
            <h2 className="text-xl font-bold text-white sm:text-2xl">
              {isEs ? "Busco Trabajo" : "I'm Building My Career"}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-stone-400">
              {isEs
                ? "Empleos, datos salariales, herramientas de carrera gratuitas, constructor de curriculum"
                : "Jobs, salary data, free career tools, resume builder, certifications"}
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-amber-400 transition-transform group-hover:translate-x-1">
              {isEs ? "Explorar" : "Explore"} <ArrowRight className="size-4" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
