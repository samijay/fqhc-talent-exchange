import { createServerClient } from "@supabase/ssr";
import { type NextRequest } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Create the next-intl middleware for locale routing
const intlMiddleware = createIntlMiddleware(routing);

export async function middleware(request: NextRequest) {
  // Step 1: Let next-intl handle locale routing first
  // This produces a response with locale redirect headers if needed
  const intlResponse = intlMiddleware(request);

  // Step 2: Create a Supabase client that reads cookies from the request
  // and writes refreshed cookies to the intl response
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // Write refreshed auth cookies to both the request
          // (for downstream server components) and the response
          // (for the browser to persist)
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            intlResponse.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  // Step 3: Refresh the auth session
  // getUser() validates the JWT and refreshes it if expired.
  // Wrapped in try/catch so the site still works if Supabase is
  // unreachable (paused project, network issue, missing env vars).
  try {
    await supabase.auth.getUser();
  } catch {
    // Supabase unreachable — continue without auth refresh
  }

  return intlResponse;
}

export const config = {
  // Match all paths except:
  // - /api routes (they handle auth separately)
  // - /_next (Next.js internals)
  // - Static files (images, fonts, etc.)
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
