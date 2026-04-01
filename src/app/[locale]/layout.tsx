import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, type Locale } from "@/i18n/routing";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
// Cookie consent banner removed — CCPA requires opt-out only (not opt-in).
// GA now loads immediately; users can opt out via privacy policy or GA browser add-on.
import FeedbackButton from "@/components/layout/FeedbackButton";
import { BackToTop } from "@/components/layout/BackToTop";
import { Toaster } from "@/components/ui/sonner";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/seo/JsonLd";
import { rootMetadata } from "@/lib/seo-config";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { californiaFQHCs } from "@/lib/california-fqhcs";

export const metadata: Metadata = rootMetadata;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  // Enable static rendering for this layout
  setRequestLocale(locale);

  const messages = await getMessages();

  // Lightweight FQHC index for global search (only name/slug/city/county)
  const fqhcIndex = californiaFQHCs.map((f) => ({
    name: f.name,
    slug: f.slug,
    city: f.city,
    county: f.county,
  }));

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${GeistSans.variable} ${GeistMono.variable} antialiased bg-white text-stone-900 dark:bg-stone-950 dark:text-stone-100`}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <AuthProvider>
              {/* Skip-to-content link for keyboard/screen reader users */}
              <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-md focus:bg-teal-700 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg"
              >
                {locale === "es" ? "Saltar al contenido" : "Skip to content"}
              </a>
              <OrganizationJsonLd />
              <WebSiteJsonLd />
              <AnnouncementBar />
              <Header fqhcIndex={fqhcIndex} />
              <main id="main-content" className="min-h-screen">{children}</main>
              <Footer />
              <GoogleAnalytics />
              <FeedbackButton />
              <BackToTop />
              <Toaster />
            </AuthProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
