"use client";

import { useState } from "react";
import { X, Zap } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";

export default function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false);
  const locale = useLocale();
  const isEs = locale === "es";

  if (dismissed) return null;

  return (
    <div className="relative bg-gradient-to-r from-amber-500 to-amber-400 text-stone-900">
      <Link
        href="/fast-track"
        className="flex items-center justify-center gap-2 px-8 py-2 text-center text-xs font-semibold sm:text-sm"
      >
        <Zap className="size-3.5 shrink-0 sm:size-4" />
        <span>
          {isEs
            ? "¿Despedido/a de un FQHC? Obtén prioridad en 48 horas →"
            : "Laid off from an FQHC? Get fast-tracked in 48 hours →"}
        </span>
      </Link>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setDismissed(true);
        }}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-stone-700/60 transition-colors hover:bg-amber-600/20 hover:text-stone-900"
        aria-label={isEs ? "Cerrar" : "Dismiss"}
      >
        <X className="size-3.5" />
      </button>
    </div>
  );
}
