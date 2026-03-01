// NewsletterSignup — Reusable inline signup component
// Compact variant for embedding in blog posts, strategy pages, insights
// Full variant with track cards for the dedicated newsletter page
"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  Mail,
  CheckCircle2,
  Loader2,
  XCircle,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type AudienceChoice = "intel-brief" | "the-pulse" | "both";
type SignupVariant = "inline" | "card" | "banner";

interface NewsletterSignupProps {
  /** Visual variant: "inline" (minimal), "card" (bordered box), "banner" (full-width gradient) */
  variant?: SignupVariant;
  /** Pre-select audience. Default "both". */
  defaultAudience?: AudienceChoice;
  /** Show audience selector toggle? Default false for compact. */
  showAudienceToggle?: boolean;
  /** Custom heading override */
  heading?: { en: string; es: string };
  /** Custom subheading override */
  subheading?: { en: string; es: string };
  /** Additional CSS class for the container */
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const t = (obj: { en: string; es: string }, locale: string) =>
  locale === "es" ? obj.es : obj.en;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function NewsletterSignup({
  variant = "card",
  defaultAudience = "both",
  showAudienceToggle = false,
  heading,
  subheading,
  className = "",
}: NewsletterSignupProps) {
  const locale = useLocale();
  const isEs = locale === "es";

  const [email, setEmail] = useState("");
  const [audience, setAudience] = useState<AudienceChoice>(defaultAudience);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
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
        body: JSON.stringify({ email, audience }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(
          data.error ||
            (isEs
              ? "No se pudo completar la suscripci\u00f3n."
              : "Could not complete subscription."),
        );
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : isEs
            ? "Algo sali\u00f3 mal. Intenta de nuevo."
            : "Something went wrong. Please try again.",
      );
    }
  };

  const defaultHeading = heading || {
    en: "Get FQHC Intelligence Weekly",
    es: "Inteligencia FQHC Semanal",
  };
  const defaultSubheading = subheading || {
    en: "Policy, funding, workforce, and AI updates \u2014 backed by primary sources.",
    es: "Pol\u00edticas, financiamiento, fuerza laboral y actualizaciones de IA \u2014 respaldadas por fuentes primarias.",
  };

  // Success state
  if (status === "success") {
    const successClasses =
      variant === "banner"
        ? "rounded-2xl bg-green-900/50 border border-green-700 p-6 text-center"
        : "rounded-xl border border-green-200 bg-green-50 p-5 text-center";
    const textColor = variant === "banner" ? "text-green-100" : "text-green-700";
    const headColor = variant === "banner" ? "text-green-50" : "text-green-900";

    return (
      <div className={`${successClasses} ${className}`}>
        <CheckCircle2 className={`mx-auto size-8 ${variant === "banner" ? "text-green-400" : "text-green-600"} mb-2`} />
        <p className={`text-lg font-bold ${headColor}`}>
          {isEs ? "\u00a1Ya est\u00e1s dentro!" : "You're in!"}
        </p>
        <p className={`text-sm mt-1 ${textColor}`}>
          {isEs
            ? "Tu primer informe llegar\u00e1 pronto."
            : "Your first briefing is on its way."}
        </p>
      </div>
    );
  }

  // Variant-specific wrapper styles
  const wrapperClasses: Record<SignupVariant, string> = {
    inline: "",
    card: "rounded-2xl border border-stone-200 bg-white p-6",
    banner: "rounded-2xl bg-gradient-to-r from-teal-800 to-teal-700 p-6 sm:p-8 text-white",
  };

  const headingColor: Record<SignupVariant, string> = {
    inline: "text-stone-900",
    card: "text-stone-900",
    banner: "text-white",
  };

  const subColor: Record<SignupVariant, string> = {
    inline: "text-stone-500",
    card: "text-stone-500",
    banner: "text-teal-100",
  };

  const inputBorder: Record<SignupVariant, string> = {
    inline: "border-stone-300 bg-white text-stone-900 placeholder:text-stone-400",
    card: "border-stone-300 bg-white text-stone-900 placeholder:text-stone-400",
    banner: "border-teal-500 bg-teal-900/50 text-white placeholder:text-teal-300",
  };

  const btnClasses: Record<SignupVariant, string> = {
    inline: "bg-teal-700 hover:bg-teal-800 text-white",
    card: "bg-teal-700 hover:bg-teal-800 text-white",
    banner: "bg-white text-teal-800 hover:bg-stone-100",
  };

  return (
    <div className={`${wrapperClasses[variant]} ${className}`}>
      {/* Heading */}
      <div className={variant === "inline" ? "mb-3" : "mb-4"}>
        <div className="flex items-center gap-2 mb-1">
          <Mail className={`size-4 ${variant === "banner" ? "text-teal-300" : "text-teal-600"}`} />
          <h3 className={`text-lg font-bold ${headingColor[variant]}`}>
            {t(defaultHeading, locale)}
          </h3>
        </div>
        <p className={`text-sm ${subColor[variant]}`}>
          {t(defaultSubheading, locale)}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        {/* Audience toggle */}
        {showAudienceToggle && (
          <div className="flex flex-wrap gap-2 mb-3">
            {(
              [
                { value: "intel-brief" as const, en: "Leaders", es: "L\u00edderes" },
                { value: "the-pulse" as const, en: "Job Seekers", es: "Candidatos" },
                { value: "both" as const, en: "Both", es: "Ambos" },
              ] as const
            ).map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setAudience(opt.value)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  audience === opt.value
                    ? variant === "banner"
                      ? "bg-white text-teal-800"
                      : "bg-teal-100 text-teal-800 border border-teal-300"
                    : variant === "banner"
                      ? "bg-teal-900/50 text-teal-200 hover:bg-teal-900/80"
                      : "bg-stone-100 text-stone-500 hover:bg-stone-200"
                }`}
              >
                {t(opt, locale)}
              </button>
            ))}
          </div>
        )}

        {/* Email + Submit row */}
        <div className="flex gap-2">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={isEs ? "tu@correo.com" : "you@example.com"}
            className={`flex-1 rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/30 transition-colors ${inputBorder[variant]}`}
          />
          <Button
            type="submit"
            disabled={status === "loading" || !email}
            className={`shrink-0 ${btnClasses[variant]}`}
          >
            {status === "loading" ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <>
                <Mail className="size-4 mr-1.5" />
                {isEs ? "Suscribirse" : "Subscribe"}
              </>
            )}
          </Button>
        </div>

        {/* Error */}
        {status === "error" && (
          <div className={`mt-2 flex items-start gap-2 rounded-lg p-2 text-sm ${
            variant === "banner"
              ? "bg-red-900/30 text-red-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}>
            <XCircle className="size-4 shrink-0 mt-0.5" />
            {errorMessage}
          </div>
        )}
      </form>

      {/* Trust line */}
      <p className={`mt-2 text-xs ${variant === "banner" ? "text-teal-200" : "text-stone-400"}`}>
        {isEs
          ? "Fuentes primarias. Sin spam. Cancela en un clic."
          : "Primary sources. No spam. Unsubscribe anytime."}
      </p>
    </div>
  );
}
