"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Heart, Menu, X, Globe, ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface DropdownItem {
  href: string;
  label: string;
  desc?: string; // Mini description under label
}

interface NavItem {
  href?: string;
  label: string;
  children?: DropdownItem[];
}

/* ------------------------------------------------------------------ */
/*  NavDropdown — dark-themed, closes others on open                   */
/* ------------------------------------------------------------------ */

function NavDropdown({
  label,
  items,
  isOpen,
  onToggle,
  onClose,
}: {
  label: string;
  items: DropdownItem[];
  isOpen: boolean;
  onToggle: () => void;
  onClose?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        if (isOpen) onToggle();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onToggle]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={onToggle}
        className={`flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
          isOpen
            ? "bg-stone-900 text-white"
            : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
        }`}
      >
        {label}
        <ChevronDown
          className={`size-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-1 min-w-[260px] rounded-lg border border-stone-700 bg-stone-900 py-2 shadow-xl">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href as "/jobs"}
              className="block px-4 py-2.5 transition-colors hover:bg-stone-800"
              onClick={() => {
                onToggle();
                onClose?.();
              }}
            >
              <span className="text-sm font-medium text-white">
                {item.label}
              </span>
              {item.desc && (
                <span className="block text-xs text-stone-400 mt-0.5">
                  {item.desc}
                </span>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Header                                                             */
/* ------------------------------------------------------------------ */

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const toggleDropdown = useCallback(
    (label: string) => {
      setOpenDropdown((prev) => (prev === label ? null : label));
    },
    []
  );

  const navItems: NavItem[] = [
    {
      label: t("strategy"),
      children: [
        { href: "/strategy/guides", label: t("executiveGuides"), desc: t("executiveGuidesDesc") },
        { href: "/strategy/okrs", label: t("okrTemplates"), desc: t("okrTemplatesDesc") },
        { href: "/strategy/case-studies", label: t("caseStudies"), desc: t("caseStudiesDesc") },
        { href: "/strategy/economics", label: t("healthcareEconomics"), desc: t("healthcareEconomicsDesc") },
        { href: "/strategy/frameworks", label: t("executionFrameworks"), desc: t("executionFrameworksDesc") },
        { href: "/funding-impact", label: t("fundingImpact"), desc: t("fundingImpactDesc") },
      ],
    },
    {
      label: t("intelligence"),
      children: [
        { href: "/insights", label: t("dashboard"), desc: t("dashboardDesc") },
        { href: "/ai-tracker", label: t("aiTracker"), desc: t("aiTrackerDesc") },
        { href: "/layoffs", label: t("layoffs"), desc: t("layoffsDesc") },
        { href: "/blog", label: t("blog"), desc: t("blogDesc") },
      ],
    },
    {
      label: t("tools"),
      children: [
        { href: "/resume-builder", label: t("resumeBuilder") },
        { href: "/career-insights", label: t("careerAssessment") },
        { href: "/career-roadmap", label: t("careerRoadmap") },
        { href: "/certifications", label: t("certifications") },
        { href: "/resources", label: t("careerResources") },
        { href: "/guides", label: t("guides") },
      ],
    },
    { href: "/jobs", label: t("jobs") },
    { href: "/directory", label: t("directory") },
  ];

  function switchLocale() {
    const newLocale = locale === "en" ? "es" : "en";
    router.replace(pathname, { locale: newLocale });
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-stone-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
        >
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
                isOpen={openDropdown === item.label}
                onToggle={() => toggleDropdown(item.label)}
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

        {/* Desktop — Language toggle only (no CTAs) */}
        <div className="hidden items-center gap-3 lg:flex">
          <button
            onClick={switchLocale}
            className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-medium text-stone-500 transition-colors hover:bg-stone-100 hover:text-stone-900"
            title={t("languageToggle")}
          >
            <Globe className="size-4" />
            {locale === "en" ? "ES" : "EN"}
          </button>
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
                          {child.desc && (
                            <span className="block text-xs text-stone-400 mt-0.5">
                              {child.desc}
                            </span>
                          )}
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
          </div>
        </div>
      )}
    </header>
  );
}
