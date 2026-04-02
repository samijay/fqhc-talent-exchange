"use client";

import { useLocale } from "next-intl";
import { Globe, RefreshCw, Shield, Languages } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function SocialProof() {
  const locale = useLocale();
  const isEs = locale === "es";

  const dataSources = [
    { name: "HRSA", fullName: "Health Resources & Services Administration" },
    { name: "BLS", fullName: "Bureau of Labor Statistics" },
    { name: "CA EDD", fullName: "Employment Development Department" },
    { name: "DHCS", fullName: "Dept. of Health Care Services" },
    { name: "NACHC", fullName: "National Assoc. of Community Health Centers" },
    { name: "CHCF", fullName: "California Health Care Foundation" },
    { name: "KFF", fullName: "KFF (Kaiser Family Foundation)" },
    { name: "CMS", fullName: "Centers for Medicare & Medicaid Services" },
  ];

  const attributes = [
    {
      icon: RefreshCw,
      text: isEs ? "Actualizado semanalmente" : "Updated weekly",
    },
    {
      icon: Shield,
      text: isEs ? "100% gratuito" : "100% free",
    },
    {
      icon: Languages,
      text: isEs ? "Bilingue EN/ES" : "Bilingual EN/ES",
    },
    {
      icon: Globe,
      text: isEs ? "Fuentes primarias" : "Primary sources",
    },
  ];

  return (
    <section className="bg-stone-50 px-4 py-12 sm:py-14">
      <div className="mx-auto max-w-5xl">
        {/* Headline */}
        <p className="text-center text-lg font-semibold text-stone-800 sm:text-xl">
          {isEs
            ? "Creado para los 220+ FQHCs de California y 50,000+ trabajadores de salud comunitaria"
            : "Built for California's 220+ FQHCs and 50,000+ community health workers"}
        </p>

        {/* Data source badges */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <span className="mr-1 text-xs font-medium uppercase tracking-wider text-stone-400">
            {isEs ? "Datos de" : "Data from"}:
          </span>
          {dataSources.map((src) => (
            <span
              key={src.name}
              className="rounded-full border border-stone-200 bg-white px-3 py-1 text-xs font-semibold text-stone-600 shadow-sm"
              title={src.fullName}
            >
              {src.name}
            </span>
          ))}
        </div>

        {/* Attribute pills */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          {attributes.map(({ icon: Icon, text }) => (
            <div
              key={text}
              className="flex items-center gap-1.5 text-sm text-stone-500"
            >
              <Icon className="size-3.5 text-teal-600" />
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
