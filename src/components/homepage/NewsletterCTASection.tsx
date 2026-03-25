"use client";

import { NewsletterSignup } from "@/components/newsletter/NewsletterSignup";

export function NewsletterCTASection() {
  return (
    <section className="bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-2xl text-center">
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
            es: "Intel Brief FQHC — politica, financiamiento, inteligencia laboral. Cada martes.",
          }}
        />
      </div>
    </section>
  );
}
