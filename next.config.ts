import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const securityHeaders = [
  // Prevent clickjacking — blocks iframe embedding
  { key: "X-Frame-Options", value: "DENY" },
  // Prevent MIME type sniffing
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Control referrer information sent with requests
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Disable browser features we don't need
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  // Force HTTPS (2 years, include subdomains)
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  // Block XSS attacks (defense-in-depth, largely superseded by CSP)
  { key: "X-XSS-Protection", value: "1; mode=block" },
  // Content Security Policy — primary XSS defense
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://*.tile.openstreetmap.org https://img.youtube.com https://i.ytimg.com https://static-media.fox.com",
      "font-src 'self'",
      "connect-src 'self' https://*.supabase.co https://www.google-analytics.com https://region1.google-analytics.com",
      "frame-src https://www.youtube.com https://www.youtube-nocookie.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      // Redirect fqhctalent.com → www.fqhctalent.com (canonical)
      {
        source: "/:path*",
        has: [{ type: "host", value: "fqhctalent.com" }],
        destination: "https://www.fqhctalent.com/:path*",
        permanent: true,
      },
      // Redirect fqhctalent.org → www.fqhctalent.com
      {
        source: "/:path*",
        has: [{ type: "host", value: "fqhctalent.org" }],
        destination: "https://www.fqhctalent.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.fqhctalent.org" }],
        destination: "https://www.fqhctalent.com/:path*",
        permanent: true,
      },
      // Redirect healthcaretalent.org → www.fqhctalent.com
      {
        source: "/:path*",
        has: [{ type: "host", value: "healthcaretalent.org" }],
        destination: "https://www.fqhctalent.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.healthcaretalent.org" }],
        destination: "https://www.fqhctalent.com/:path*",
        permanent: true,
      },
      // Redirect /insights → / (intelligence dashboard is now the homepage)
      {
        source: "/insights",
        destination: "/",
        permanent: true,
      },
      {
        source: "/:locale/insights",
        destination: "/:locale",
        permanent: true,
      },
      // Redirect /demo → / (demo page consolidated into homepage)
      {
        source: "/demo",
        destination: "/",
        permanent: true,
      },
      {
        source: "/:locale/demo",
        destination: "/:locale",
        permanent: true,
      },
      // Redirect /strategy/knowledge-map → /pathway (Learning Pathway is the successor)
      {
        source: "/strategy/knowledge-map",
        destination: "/pathway",
        permanent: true,
      },
      {
        source: "/:locale/strategy/knowledge-map",
        destination: "/:locale/pathway",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
