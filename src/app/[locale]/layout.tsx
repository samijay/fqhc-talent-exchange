import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import CookieConsent from "@/components/analytics/CookieConsent";
import FeedbackButton from "@/components/layout/FeedbackButton";
import { Toaster } from "@/components/ui/sonner";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/seo/JsonLd";
import { rootMetadata } from "@/lib/seo-config";
import { AuthProvider } from "@/components/auth/AuthProvider";

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

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Enable static rendering for this layout
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <AuthProvider>
            <OrganizationJsonLd />
            <WebSiteJsonLd />
            <AnnouncementBar />
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <CookieConsent />
            <GoogleAnalytics />
            <FeedbackButton />
            <Toaster />
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
