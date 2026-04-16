import { createClient } from "@supabase/supabase-js";
import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "Missing Supabase environment variables. " +
    "Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local or Vercel dashboard."
  );
}

// ── Auth-aware browser client (uses @supabase/ssr for cookie-based auth) ──

// Use globalThis so the singleton survives Next.js HMR module re-evaluation in dev.
// In production there is no HMR so this is equivalent to a plain module-level let.
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

// ── Public client ──
// In the browser: reuse the auth client singleton to avoid two GoTrueClient instances
// sharing the same storage key (which triggers a Supabase warning).
// On the server: use the standard createClient (no browser storage involved).
/** Public Supabase client — use in client components or non-sensitive server reads */
export const supabase =
  typeof window !== "undefined"
    ? createAuthClient()
    : createClient(supabaseUrl || "", supabaseAnonKey || "");

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

  // Server-side without the key
  if (process.env.NODE_ENV === "production") {
    // In production, this is a critical misconfiguration. API routes using
    // supabaseAdmin will silently bypass RLS protections with the anon client.
    // Log loudly so it shows up in Vercel logs.
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
  return supabase;
})();
