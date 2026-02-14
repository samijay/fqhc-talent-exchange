"use client";

import { useState } from "react";
import { Heart, Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const navLinks = [
    { href: "/jobs" as const, label: t("jobs") },
    { href: "/directory" as const, label: t("directory") },
    { href: "/resume-builder" as const, label: t("resumeBuilder") },
    { href: "/join" as const, label: t("forJobSeekers") },
    { href: "/hire" as const, label: t("forEmployers") },
  ];

  function switchLocale() {
    const newLocale = locale === "en" ? "es" : "en";
    router.replace(pathname, { locale: newLocale });
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-stone-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <Heart className="size-7 fill-violet-600 text-violet-600" />
          <span className="text-xl font-bold tracking-tight text-stone-900">
            FQHC <span className="text-violet-600">Talent</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA buttons + Language toggle */}
        <div className="hidden items-center gap-3 md:flex">
          {/* Language toggle */}
          <button
            onClick={switchLocale}
            className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-medium text-stone-500 transition-colors hover:bg-stone-100 hover:text-stone-900"
            title={t("languageToggle")}
          >
            <Globe className="size-4" />
            {locale === "en" ? "ES" : "EN"}
          </button>

          <Button
            variant="outline"
            className="border-violet-600 text-violet-600 hover:bg-violet-50 hover:text-violet-700"
            asChild
          >
            <Link href="/join">{t("earlyAccess")}</Link>
          </Button>
          <Button
            className="bg-violet-600 text-white hover:bg-violet-700"
            asChild
          >
            <Link href="/hire">{t("priorityAccess")}</Link>
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-stone-600 hover:bg-stone-100 hover:text-stone-900 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-stone-200 bg-white md:hidden">
          <div className="space-y-1 px-4 pb-4 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-md px-3 py-2 text-base font-medium text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-900"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile language toggle */}
            <button
              onClick={() => {
                switchLocale();
                setMobileOpen(false);
              }}
              className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-base font-medium text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-900"
            >
              <Globe className="size-4" />
              {t("languageToggle")}
            </button>

            <div className="flex flex-col gap-2 pt-3">
              <Button
                variant="outline"
                className="w-full border-violet-600 text-violet-600 hover:bg-violet-50 hover:text-violet-700"
                asChild
              >
                <Link href="/join" onClick={() => setMobileOpen(false)}>{t("earlyAccess")}</Link>
              </Button>
              <Button
                className="w-full bg-violet-600 text-white hover:bg-violet-700"
                asChild
              >
                <Link href="/hire" onClick={() => setMobileOpen(false)}>{t("priorityAccess")}</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
