"use client";

import { useState, useEffect } from "react";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { Clock, MapPin, ChevronRight } from "lucide-react";
import type { RecentFQHC } from "./TrackView";

const STORAGE_KEY = "recently-viewed-fqhcs";

function gradeColor(grade: string): string {
  switch (grade) {
    case "A":
      return "bg-teal-100 text-teal-800";
    case "B":
      return "bg-blue-100 text-blue-800";
    case "C":
      return "bg-amber-100 text-amber-800";
    case "D":
      return "bg-orange-100 text-orange-800";
    case "F":
      return "bg-red-100 text-red-800";
    default:
      return "bg-stone-100 text-stone-600";
  }
}

export function RecentlyViewed() {
  const locale = useLocale();
  const isEs = locale === "es";
  const [recent, setRecent] = useState<RecentFQHC[]>([]);

  useEffect(() => {
    function load() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        setRecent(raw ? JSON.parse(raw) : []);
      } catch {
        setRecent([]);
      }
    }
    load();

    window.addEventListener("recently-viewed-changed", load);
    window.addEventListener("storage", load);
    return () => {
      window.removeEventListener("recently-viewed-changed", load);
      window.removeEventListener("storage", load);
    };
  }, []);

  if (recent.length === 0) return null;

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Clock className="size-4 text-stone-500" />
        <h3 className="text-sm font-semibold text-stone-700">
          {isEs ? "Vistos Recientemente" : "Recently Viewed"}
        </h3>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
        {recent.map((fqhc) => (
          <Link
            key={fqhc.slug}
            href={`/directory/${fqhc.slug}` as "/directory"}
            className="group flex-shrink-0 w-52 rounded-xl border border-stone-200 bg-white p-3 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md hover:border-teal-300"
          >
            <div className="flex items-start justify-between gap-2">
              <h4 className="text-sm font-semibold text-stone-900 leading-tight line-clamp-2 group-hover:text-teal-700 transition-colors">
                {fqhc.name}
              </h4>
              <span
                className={`shrink-0 inline-flex items-center justify-center size-6 rounded-full text-xs font-bold ${gradeColor(
                  fqhc.resilienceGrade
                )}`}
              >
                {fqhc.resilienceGrade}
              </span>
            </div>
            <div className="mt-1.5 flex items-center gap-1 text-xs text-stone-500">
              <MapPin className="size-3" />
              {fqhc.city}, CA
            </div>
            <div className="mt-2 flex items-center gap-0.5 text-xs font-medium text-teal-700 opacity-0 group-hover:opacity-100 transition-opacity">
              {isEs ? "Ver perfil" : "View profile"}
              <ChevronRight className="size-3" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
