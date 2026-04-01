import "./globals.css";
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: {
    default: "FQHC Talent | Strategic Intelligence for California FQHCs",
    template: "%s | FQHC Talent",
  },
  description:
    "Strategic intelligence platform for California's Federally Qualified Health Centers. Policy tracking, workforce data, salary benchmarks, and free career tools for FQHC professionals.",
  metadataBase: new URL("https://www.fqhctalent.com"),
  alternates: {
    types: {
      "application/rss+xml": [
        { url: "/blog-feed.xml", title: "FQHC Talent Exchange — Blog" },
        { url: "/intel-feed.xml", title: "FQHC Intel Brief" },
      ],
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
