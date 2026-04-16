import { createClient } from "@supabase/supabase-js";

// ── Server-only Supabase clients ──────────────────────────────────────────────
// This file is imported by API routes only. Do NOT import it from client
// components or hooks — use @/lib/supabase-client instead.
// ─────────────────────────────────────────────────────────────────────────────

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "Missing Supabase environment variables. " +
    "Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local or Vercel dashboard."
  );
}

// ── Server-only admin client (bypasses RLS — NEVER expose to the browser) ──

const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

// Note: SUPABASE_SERVICE_ROLE_KEY is a server-only env var (no NEXT_PUBLIC_ prefix).
// It will ALWAYS be undefined in the browser — that's expected and correct.

/**
 * Server-side Supabase client using the service role key.
 * This bypasses RLS and should ONLY be used in API routes (server-side).
 *
 * Falls back to the anon client when the service role key is unavailable.
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

  // Server-side without the key
  if (process.env.NODE_ENV === "production") {
    console.error(
      "CRITICAL: SUPABASE_SERVICE_ROLE_KEY is missing in production server. " +
      "API routes using supabaseAdmin will fail or be limited by RLS. " +
      "Set this variable in your Vercel dashboard."
    );
  } else {
    console.warn(
      "⚠️  SUPABASE_SERVICE_ROLE_KEY is not set — supabaseAdmin is using the anon client.\n" +
      "   Admin queries will be limited by RLS. Set this key for full functionality."
    );
  }

  // Return anon client as fallback — API routes should check for errors
  return createClient(supabaseUrl || "", supabaseAnonKey || "");
})();
