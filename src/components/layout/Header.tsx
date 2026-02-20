"use client";

import { useState, useRef, useEffect } from "react";
import { Heart, Menu, X, Globe, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";

interface DropdownItem {
  href: string;
  label: string;
}

interface NavItem {
  href?: string;
  label: string;
  children?: DropdownItem[];
}

function NavDropdown({ label, items, onClose }: { label: string; items: DropdownItem[]; onClose?: () => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-900"
      >
        {label}
        <ChevronDown className={`size-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute left-0 top-full z-50 mt-1 min-w-[200px] rounded-lg border border-stone-200 bg-white py-1.5 shadow-lg">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href as "/jobs"}
              className="block px-4 py-2 text-sm text-stone-600 transition-colors hover:bg-stone-50 hover:text-stone-900"
              onClick={() => { setOpen(false); onClose?.(); }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const navItems: NavItem[] = [
    { href: "/jobs", label: t("jobs") },
    { href: "/directory", label: t("directory") },
    {
      label: t("insights"),
      children: [
        { href: "/insights", label: t("insights") },
        { href: "/layoffs", label: t("layoffs") },
        { href: "/blog", label: t("blog") },
      ],
    },
    {
      label: t("tools"),
      children: [
        { href: "/resume-builder", label: t("resumeBuilder") },
        { href: "/career-insights", label: t("careerAssessment") },
        { href: "/career-roadmap", label: t("careerRoadmap") },
        { href: "/certifications", label: t("certifications") },
      ],
    },
    { href: "/join", label: t("findAJob") },
    { href: "/hire", label: t("postAJob") },
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
          <Heart className="size-7 fill-teal-700 text-teal-700" />
          <span className="text-xl font-bold tracking-tight text-stone-900">
            FQHC <span className="text-teal-700">Talent</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-0.5 lg:flex">
          {navItems.map((item) =>
            item.children ? (
              <NavDropdown
                key={item.label}
                label={item.label}
                items={item.children}
              />
            ) : (
              <Link
                key={item.href}
                href={item.href as "/jobs"}
                className="rounded-md px-3 py-2 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-900"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        {/* Desktop CTA buttons + Language toggle */}
        <div className="hidden items-center gap-3 lg:flex">
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
            className="border-teal-700 text-teal-700 hover:bg-teal-50 hover:text-teal-800"
            asChild
          >
            <Link href="/resume-builder">{t("buildResume")}</Link>
          </Button>
          <Button
            className="bg-stone-800 text-white hover:bg-stone-900"
            asChild
          >
            <Link href="/hire">{t("hireTalent")}</Link>
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-stone-600 hover:bg-stone-100 hover:text-stone-900 lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-stone-200 bg-white lg:hidden">
          <div className="space-y-1 px-4 pb-4 pt-2">
            {navItems.map((item) =>
              item.children ? (
                <div key={item.label}>
                  <button
                    onClick={() =>
                      setMobileExpanded(
                        mobileExpanded === item.label ? null : item.label
                      )
                    }
                    className="flex w-full items-center justify-between rounded-md px-3 py-2 text-base font-medium text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-900"
                  >
                    {item.label}
                    <ChevronDown
                      className={`size-4 transition-transform ${
                        mobileExpanded === item.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {mobileExpanded === item.label && (
                    <div className="ml-4 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href as "/jobs"}
                          className="block rounded-md px-3 py-2 text-sm text-stone-500 transition-colors hover:bg-stone-50 hover:text-stone-900"
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href as "/jobs"}
                  className="block rounded-md px-3 py-2 text-base font-medium text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-900"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              )
            )}

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
                className="w-full border-teal-700 text-teal-700 hover:bg-teal-50 hover:text-teal-800"
                asChild
              >
                <Link href="/resume-builder" onClick={() => setMobileOpen(false)}>{t("buildResume")}</Link>
              </Button>
              <Button
                className="w-full bg-stone-800 text-white hover:bg-stone-900"
                asChild
              >
                <Link href="/hire" onClick={() => setMobileOpen(false)}>{t("hireTalent")}</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
