import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

/**
 * OAuth callback handler.
 *
 * This route handles:
 * 1. Google OAuth redirects (after user approves in Google)
 * 2. Email confirmation links (after signup)
 * 3. Password reset links
 *
 * It exchanges the auth code for a session, then redirects to the dashboard.
 *
 * This route is outside [locale] because Supabase redirects to a fixed URL
 * (https://www.fqhctalent.com/auth/callback) — it can't include the locale prefix.
 * The middleware matcher also excludes /auth so i18n doesn't interfere.
 */

/**
 * Sanitize redirect path — must be a safe relative path, not an external URL.
 *
 * Blocks:
 *  - Protocol-relative URLs (//evil.com)
 *  - Backslash tricks (\/evil.com, \\evil.com)
 *  - Absolute URLs with schemes (http://, javascript:, etc.)
 *  - Paths with encoded characters that could bypass checks
 */
function sanitizeRedirectPath(path: string | null): string {
  if (!path) return "/dashboard";
  // Decode to catch %2F and other encoded bypass attempts
  const decoded = decodeURIComponent(path);
  // Must start with exactly one forward slash, not //, not \
  if (
    decoded.startsWith("/") &&
    !decoded.startsWith("//") &&
    !decoded.startsWith("/\\") &&
    !decoded.includes("://") &&
    !decoded.startsWith("/\\")
  ) {
    // Use the original (not decoded) to preserve intended encoding
    return path;
  }
  return "/dashboard";
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = sanitizeRedirectPath(searchParams.get("next"));

  if (!code) {
    console.error("[auth/callback] No authorization code in callback URL");
    return NextResponse.redirect(`${origin}/login?error=no_code`);
  }

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

  if (error) {
    console.error("[auth/callback] Code exchange failed:", error.message);
    return NextResponse.redirect(
      `${origin}/login?error=auth&reason=${encodeURIComponent(error.message)}`
    );
  }

  // Success — verify the user exists
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.error("[auth/callback] Code exchange succeeded but no user found");
    return NextResponse.redirect(`${origin}/login?error=auth&reason=no_user`);
  }

  // Redirect to dashboard (or wherever ?next= points)
  return NextResponse.redirect(`${origin}${next}`);
}
