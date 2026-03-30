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
        href="/"
        className="flex items-center justify-center gap-2 py-2 pl-4 pr-10 text-center text-xs font-semibold sm:pl-8 sm:text-sm"
      >
        <Zap className="size-3.5 shrink-0 sm:size-4" />
        <span>
          {isEs
            ? "CalOptima e IEHP proyectan perder 1.3M miembros para 2028 — precipicio de ingresos para FQHCs →"
            : "CalOptima & IEHP project losing 1.3M members by 2028 — managed care revenue cliff for FQHCs →"}
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
