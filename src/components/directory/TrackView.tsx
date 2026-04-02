"use client";

import { useEffect } from "react";

const STORAGE_KEY = "recently-viewed-fqhcs";
const MAX_RECENT = 5;

export interface RecentFQHC {
  slug: string;
  name: string;
  city: string;
  resilienceGrade: string;
}

export function TrackView({ fqhc }: { fqhc: RecentFQHC }) {
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const current: RecentFQHC[] = raw ? JSON.parse(raw) : [];

      // Remove if already present (will re-add at front)
      const filtered = current.filter((f) => f.slug !== fqhc.slug);

      // Add to front, keep max 5
      const next = [fqhc, ...filtered].slice(0, MAX_RECENT);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));

      // Notify other components
      window.dispatchEvent(new Event("recently-viewed-changed"));
    } catch {}
  }, [fqhc]);

  return null;
}
