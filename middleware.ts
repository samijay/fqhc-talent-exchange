import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./src/i18n/routing";

/**
 * Composed middleware: Supabase auth token refresh + next-intl i18n routing.
 *
 * 1. Refreshes Supabase auth session (prevents silent logouts)
 * 2. Runs next-intl locale routing
 *
 * The matcher excludes /api, /auth, /_next, etc. so those routes
 * are never intercepted by i18n or auth refresh logic.
 */

const intlMiddleware = createIntlMiddleware(routing);

export async function middleware(request: NextRequest) {
  // Step 1: Refresh Supabase auth session via cookie
  // This prevents sessions from silently expiring between requests
  let response = NextResponse.next({
    request: { headers: request.headers },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // Set cookies on the request (for downstream handlers)
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          // Set cookies on the response (for the browser)
          response = NextResponse.next({
            request: { headers: request.headers },
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // This refreshes the session if it exists and is close to expiry.
  // IMPORTANT: Do not remove — suppressing the return value is intentional.
  await supabase.auth.getUser();

  // Step 2: Run next-intl locale routing
  const intlResponse = intlMiddleware(request);

  // Merge auth cookies onto the intl response
  if (intlResponse) {
    response.cookies.getAll().forEach((cookie) => {
      intlResponse.cookies.set(cookie.name, cookie.value);
    });
    return intlResponse;
  }

  return response;
}

export const config = {
  matcher: [
    // Exclude: /api, /auth (OAuth callback), /_next, /_vercel, /pitchdeck, static files
    "/((?!api|auth|_next|_vercel|pitchdeck|.*\\..*).*)",
  ],
};
