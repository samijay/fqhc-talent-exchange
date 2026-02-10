import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
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
