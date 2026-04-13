// ModeToggle — wizard/manual mode toggle for all simulator tools
// Voice: friendly, inviting — not intimidating technical jargon
"use client";

import { Sparkles, Settings2 } from "lucide-react";
import { t } from "@/lib/i18n-helpers";


export type SimMode = "wizard" | "manual";

interface ModeToggleProps {
  mode: SimMode;
  onChange: (mode: SimMode) => void;
  locale: string;
}

export function ModeToggle({ mode, onChange, locale }: ModeToggleProps) {
  return (
    <div className="inline-flex rounded-full border border-stone-200 bg-white p-1">
      <button
        onClick={() => onChange("wizard")}
        className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all ${
          mode === "wizard"
            ? "bg-teal-700 text-white shadow-sm"
            : "text-stone-500 hover:text-stone-700"
        }`}
      >
        <Sparkles className="size-3.5" />
        {t(
          { en: "Guided Setup", es: "Configuración Guiada" },
          locale,
        )}
      </button>
      <button
        onClick={() => onChange("manual")}
        className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all ${
          mode === "manual"
            ? "bg-teal-700 text-white shadow-sm"
            : "text-stone-500 hover:text-stone-700"
        }`}
      >
        <Settings2 className="size-3.5" />
        {t(
          { en: "Manual Mode", es: "Modo Manual" },
          locale,
        )}
      </button>
    </div>
  );
}
