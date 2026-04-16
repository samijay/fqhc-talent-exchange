import { createBrowserClient } from "@supabase/ssr";

// ── Browser-only Supabase client ──────────────────────────────────────────────
// Import this file ONLY from "use client" components and client-side hooks.
// For API routes and server components use @/lib/supabase (supabaseAdmin) or
// @/lib/supabase-server (auth-aware server client).
// ─────────────────────────────────────────────────────────────────────────────

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

type BrowserClient = ReturnType<typeof createBrowserClient>;
declare global {
  // eslint-disable-next-line no-var
  var _supabaseBrowserClient: BrowserClient | undefined;
}

/**
 * Returns the auth-aware Supabase client for "use client" components.
 * Lazily created and cached as a singleton; safe to call from multiple components.
 * Uses globalThis to survive HMR reloads in development.
 */
export function createAuthClient(): BrowserClient {
  if (!globalThis._supabaseBrowserClient) {
    globalThis._supabaseBrowserClient = createBrowserClient(
      supabaseUrl || "",
      supabaseAnonKey || ""
    );
  }
  return globalThis._supabaseBrowserClient;
}

/** Convenience export for client components that just need a Supabase client. */
export const supabase = createAuthClient();
