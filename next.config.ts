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
      // Redirect fqhctalent.org → fqhctalent.com
      {
        source: "/:path*",
        has: [{ type: "host", value: "fqhctalent.org" }],
        destination: "https://fqhctalent.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.fqhctalent.org" }],
        destination: "https://fqhctalent.com/:path*",
        permanent: true,
      },
      // Redirect healthcaretalent.org → fqhctalent.com
      {
        source: "/:path*",
        has: [{ type: "host", value: "healthcaretalent.org" }],
        destination: "https://fqhctalent.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.healthcaretalent.org" }],
        destination: "https://fqhctalent.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
