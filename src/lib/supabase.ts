import { createClient } from "@supabase/supabase-js";

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

// ── Server-only client (bypasses RLS — NEVER expose to the browser) ──
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

// Fail loudly in production if the service role key is missing
if (!supabaseServiceRoleKey && process.env.NODE_ENV === "production") {
  console.error(
    "CRITICAL: SUPABASE_SERVICE_ROLE_KEY is missing in production. " +
    "All API routes using supabaseAdmin will fail. " +
    "Set this variable in your Vercel dashboard."
  );
}

/**
 * Server-side Supabase client using the service role key.
 * This bypasses RLS and should ONLY be used in API routes (server-side).
 * Falls back to the anon client in development if the service role key is not set.
 */
export const supabaseAdmin = supabaseServiceRoleKey
  ? createClient(supabaseUrl || "", supabaseServiceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  : supabase; // Dev fallback — in production this will log an error above
