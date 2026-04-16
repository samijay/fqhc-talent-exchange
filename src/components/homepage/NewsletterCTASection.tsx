"use client";

import { useState } from "react";
import { NewsletterSignup } from "@/components/newsletter/NewsletterSignup";

export function NewsletterCTASection() {
  const [track, setTrack] = useState<"intel-brief" | "the-pulse">("intel-brief");

  return (
    <section className="bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-2xl">
        {/* Track toggle */}
        <div className="mb-8 flex justify-center">
          <div className="inline-flex rounded-full border border-stone-700 bg-stone-800/60 p-1">
            <button
              onClick={() => setTrack("intel-brief")}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                track === "intel-brief"
                  ? "bg-teal-600 text-white"
                  : "text-stone-400 hover:text-stone-200"
              }`}
            >
              For Leaders
            </button>
            <button
              onClick={() => setTrack("the-pulse")}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                track === "the-pulse"
                  ? "bg-amber-500 text-white"
                  : "text-stone-400 hover:text-stone-200"
              }`}
            >
              For Professionals
            </button>
          </div>
        </div>

        <div className="text-center">
          {track === "intel-brief" ? (
            <NewsletterSignup
              variant="card"
              defaultAudience="intel-brief"
              showAudienceToggle={false}
              heading={{
                en: "Stay ahead of the crisis",
                es: "Mantente adelante de la crisis",
              }}
              subheading={{
                en: "FQHC Intel Brief — policy, funding, workforce intelligence. Every Tuesday.",
                es: "Intel Brief FQHC — política, financiamiento, inteligencia laboral. Cada martes.",
              }}
            />
          ) : (
            <NewsletterSignup
              variant="card"
              defaultAudience="the-pulse"
              showAudienceToggle={false}
              heading={{
                en: "Grow your FQHC career",
                es: "Impulsa tu carrera en FQHC",
              }}
              subheading={{
                en: "The Pulse — job highlights, salary data, certification tips, career moves. Every Tuesday.",
                es: "The Pulse — empleos, datos salariales, certificaciones, movimientos de carrera. Cada martes.",
              }}
            />
          )}
        </div>
      </div>
    </section>
  );
}
