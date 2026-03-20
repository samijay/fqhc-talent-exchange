// useRoleContext — resolve user's role from URL params → localStorage → default
// Used across certifications, masterclass, guides, and other filterable pages
// to pre-select the right content based on the user's learning pathway role.
"use client";

import { useSearchParams } from "next/navigation";
import { useState, useCallback } from "react";

const STORAGE_KEY = "fqhc-selected-role";

/**
 * Read localStorage safely (returns null on SSR or error).
 */
function readStoredRole(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

/**
 * Resolves the user's role selection using this priority chain:
 * 1. URL search param `?role=X` (highest — from pathway deep links)
 * 2. localStorage `fqhc-selected-role` (remembered from pathway page)
 * 3. Fallback to "all" (default — show everything)
 *
 * Also provides setRole() to update localStorage when user manually changes.
 */
export function useRoleContext(fallback = "all"): {
  role: string;
  setRole: (roleId: string) => void;
  isFromUrl: boolean;
} {
  const searchParams = useSearchParams();
  const urlRole = searchParams.get("role");

  // Initialize from URL param → localStorage → fallback (no effect needed)
  const [role, setRoleState] = useState<string>(
    () => urlRole || readStoredRole() || fallback
  );
  const isFromUrl = !!urlRole;

  const setRole = useCallback((roleId: string) => {
    setRoleState(roleId);
    try {
      localStorage.setItem(STORAGE_KEY, roleId);
    } catch {
      // ignore
    }
  }, []);

  return { role, setRole, isFromUrl };
}
