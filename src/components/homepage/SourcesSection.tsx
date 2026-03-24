"use client";

import { ExternalLink } from "lucide-react";
import { useLocale } from "next-intl";

interface SourcesSectionProps {
  allSources: { org: string; url: string }[];
}

export function SourcesSection({ allSources }: SourcesSectionProps) {
  const locale = useLocale();
  const isEs = locale === "es";

  return (
    <section className="py-8 sm:py-12 border-t border-stone-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-stone-200 bg-stone-50 p-6">
          <h2 className="text-lg font-bold text-stone-800 mb-3">
            {isEs ? "Indice de Fuentes" : "Sources Index"}
          </h2>
          <p className="text-sm text-stone-500 mb-4">
            {isEs
              ? "Toda la inteligencia proviene de fuentes primarias verificables."
              : "All intelligence is sourced from verifiable primary sources."}
          </p>
          <ul className="grid gap-1 sm:grid-cols-2 lg:grid-cols-3">
            {allSources.map((src, i) => (
              <li key={i} className="text-sm">
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-700 hover:text-teal-900 hover:underline inline-flex items-center gap-1"
                >
                  <ExternalLink className="h-3 w-3 flex-shrink-0" />
                  <span className="font-medium">{src.org}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
