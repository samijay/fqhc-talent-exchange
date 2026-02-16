"use client";

import { Calendar, ArrowRight } from "lucide-react";
import { useLocale } from "next-intl";
import { CALENDLY_URL, BOOKING_VARIANTS } from "@/lib/booking-config";

type BookingVariant = "candidate" | "employer" | "fastTrack";

interface BookingCTAProps {
  /** Which copy variant to show */
  variant: BookingVariant;
  /** Optional override for the Calendly URL (e.g. with UTM params) */
  calendlyUrl?: string;
  /** Optional additional CSS classes */
  className?: string;
}

/**
 * BookingCTA — A reusable Calendly booking call-to-action card.
 *
 * Shows contextual copy based on variant (candidate, employer, fast-track)
 * and opens Calendly in a new tab. Bilingual EN/ES.
 *
 * Usage:
 *   <BookingCTA variant="candidate" />
 *   <BookingCTA variant="employer" />
 *   <BookingCTA variant="fastTrack" />
 */
export function BookingCTA({ variant, calendlyUrl, className = "" }: BookingCTAProps) {
  const locale = useLocale();
  const copy = BOOKING_VARIANTS[variant][locale === "es" ? "es" : "en"];
  const url = calendlyUrl ?? CALENDLY_URL;

  // Variant-specific styling
  const styles: Record<BookingVariant, { bg: string; border: string; heading: string; button: string; icon: string }> = {
    candidate: {
      bg: "bg-gradient-to-br from-teal-50 to-teal-100/50",
      border: "border-teal-200",
      heading: "text-teal-900",
      button: "bg-teal-700 hover:bg-teal-800 text-white",
      icon: "text-teal-600",
    },
    employer: {
      bg: "bg-gradient-to-br from-stone-50 to-stone-100/50",
      border: "border-stone-300",
      heading: "text-stone-900",
      button: "bg-stone-800 hover:bg-stone-900 text-white",
      icon: "text-stone-600",
    },
    fastTrack: {
      bg: "bg-gradient-to-br from-amber-50 to-amber-100/50",
      border: "border-amber-200",
      heading: "text-amber-900",
      button: "bg-amber-600 hover:bg-amber-700 text-white",
      icon: "text-amber-600",
    },
  };

  const s = styles[variant];

  return (
    <div className={`rounded-xl border ${s.border} ${s.bg} p-6 ${className}`}>
      <div className="flex items-start gap-4">
        <div className={`flex size-10 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm ${s.icon}`}>
          <Calendar className="size-5" />
        </div>
        <div className="flex-1">
          <h3 className={`text-lg font-bold ${s.heading}`}>
            {copy.heading}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-stone-600">
            {copy.description}
          </p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-4 inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold shadow-sm transition-all duration-200 hover:shadow-md ${s.button}`}
          >
            {copy.buttonText}
            <ArrowRight className="size-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
