import { createClient } from "@supabase/supabase-js";
import { createBrowserClient } from "@supabase/ssr";

// ── Public client (for client-side use only — limited by RLS) ──
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "Missing Supabase environment variables. " +
    "Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local or Vercel dashboard."
  );
}

/** Public Supabase client — use only in client components or non-sensitive reads */
export const supabase = createClient(
  supabaseUrl || "",
  supabaseAnonKey || ""
);

// ── Auth-aware browser client (uses @supabase/ssr for cookie-based auth) ──

/**
 * Creates an auth-aware Supabase client for use in "use client" components.
 * This handles auth sessions via cookies automatically.
 * Use this instead of the plain `supabase` export when you need auth state.
 */
export function createAuthClient() {
  return createBrowserClient(
    supabaseUrl || "",
    supabaseAnonKey || ""
  );
}

// ── Server-only admin client (bypasses RLS — NEVER expose to the browser) ──

const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

// Note: SUPABASE_SERVICE_ROLE_KEY is a server-only env var (no NEXT_PUBLIC_ prefix).
// It will ALWAYS be undefined in the browser — that's expected and correct.
// We must NOT throw at module evaluation time because this file is imported by
// AuthProvider (which only uses createAuthClient), and the throw would crash
// the entire client-side app.

/**
 * Server-side Supabase client using the service role key.
 * This bypasses RLS and should ONLY be used in API routes (server-side).
 *
 * Falls back to the anon client when the service role key is unavailable
 * (browser environment, or development without the key set).
 * Logs a warning in production server context if the key is missing.
 */
export const supabaseAdmin = (() => {
  if (supabaseServiceRoleKey) {
    return createClient(supabaseUrl || "", supabaseServiceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }

  // In the browser, the service role key is NEVER available (not NEXT_PUBLIC_).
  // This is expected — just fall back to the anon client silently.
  if (typeof window !== "undefined") {
    return supabase;
  }

  // Server-side without the key — warn loudly but don't crash
  if (process.env.NODE_ENV === "production") {
    console.error(
      "CRITICAL: SUPABASE_SERVICE_ROLE_KEY is missing in production server. " +
      "All API routes using supabaseAdmin will be limited by RLS. " +
      "Set this variable in your Vercel dashboard."
    );
  } else {
    console.warn(
      "⚠️  SUPABASE_SERVICE_ROLE_KEY is not set — supabaseAdmin is using the anon client.\n" +
      "   Admin queries will be limited by RLS. Set this key for full functionality."
    );
  }

  return supabase;
})();
