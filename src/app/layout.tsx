import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FQHC Talent Exchange",
  description: "The talent exchange built for community health",
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
