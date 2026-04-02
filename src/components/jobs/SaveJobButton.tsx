"use client";

import { useState, useEffect, useCallback } from "react";
import { Bookmark } from "lucide-react";

const STORAGE_KEY = "saved-jobs";

function getSavedJobs(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function setSavedJobs(ids: string[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {}
}

export function SaveJobButton({
  jobId,
  size = "sm",
}: {
  jobId: string;
  size?: "sm" | "md";
}) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(getSavedJobs().includes(jobId));
  }, [jobId]);

  const toggle = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      const current = getSavedJobs();
      let next: string[];
      if (current.includes(jobId)) {
        next = current.filter((id) => id !== jobId);
        setSaved(false);
      } else {
        next = [...current, jobId];
        setSaved(true);
      }
      setSavedJobs(next);
      // Dispatch a storage event so other components (like the saved-jobs page) can react
      window.dispatchEvent(new Event("saved-jobs-changed"));
    },
    [jobId]
  );

  const iconSize = size === "md" ? "size-5" : "size-4";

  return (
    <button
      onClick={toggle}
      className="shrink-0 transition-colors"
      title={saved ? "Remove from saved jobs" : "Save job"}
      aria-label={saved ? "Remove from saved jobs" : "Save job"}
    >
      <Bookmark
        className={`${iconSize} transition-colors ${
          saved
            ? "fill-teal-600 text-teal-600"
            : "text-stone-300 hover:text-teal-500"
        }`}
      />
    </button>
  );
}

/** Hook to get all saved job IDs (reactive to changes) */
export function useSavedJobs() {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    setIds(getSavedJobs());

    const handler = () => setIds(getSavedJobs());
    window.addEventListener("saved-jobs-changed", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("saved-jobs-changed", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  const remove = useCallback((jobId: string) => {
    const next = getSavedJobs().filter((id) => id !== jobId);
    setSavedJobs(next);
    setIds(next);
    window.dispatchEvent(new Event("saved-jobs-changed"));
  }, []);

  return { ids, remove };
}
