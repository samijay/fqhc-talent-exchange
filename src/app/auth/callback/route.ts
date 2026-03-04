import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

/**
 * OAuth callback handler.
 *
 * This route handles:
 * 1. Google OAuth redirects (after user approves in Google)
 * 2. Email confirmation links (after signup)
 *
 * It exchanges the auth code for a session, then redirects to the dashboard.
 *
 * This route is outside [locale] because Supabase redirects to a fixed URL
 * (https://www.fqhctalent.com/auth/callback) — it can't include the locale prefix.
 */
/** Sanitize redirect path — must be a relative path, not an external URL */
function sanitizeRedirectPath(path: string | null): string {
  if (!path) return "/dashboard";
  // Must start with / and must NOT start with // (protocol-relative URL)
  if (path.startsWith("/") && !path.startsWith("//")) return path;
  return "/dashboard";
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = sanitizeRedirectPath(searchParams.get("next"));

  if (code) {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          },
        },
      }
    );

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Success — redirect to dashboard (or wherever ?next= points)
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Auth error — redirect to login with error message
  return NextResponse.redirect(`${origin}/login?error=auth`);
}
