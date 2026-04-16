import "./globals.css";

// Root layout: the [locale]/layout.tsx handles <html> and <body> with proper
// lang attribute and font classes. This shell just passes children through,
// which is the standard next-intl pattern for locale-aware routing.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
