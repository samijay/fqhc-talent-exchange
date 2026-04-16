"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Heart, Menu, X, Globe, ChevronDown, User, LogOut, LayoutDashboard, Bookmark, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { useAuth } from "@/components/auth/AuthProvider";
import { trackLanguageToggle } from "@/lib/analytics";
import { GlobalSearch } from "@/components/layout/GlobalSearch";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface DropdownItem {
  href: string;
  label: string;
  desc?: string;
}

interface DropdownGroup {
  heading: string;
  items: DropdownItem[];
}

interface NavItem {
  href?: string;
  label: string;
  children?: DropdownItem[];
  /** Grouped children render as a multi-column mega menu */
  groups?: DropdownGroup[];
}

/* ------------------------------------------------------------------ */
/*  NavDropdown — standard (scrollable if many items)                  */
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
  const [focusedIndex, setFocusedIndex] = useState(-1);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        if (isOpen) onToggle();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onToggle]);

  // Reset focus index when menu opens/closes
  useEffect(() => {
    if (!isOpen) setFocusedIndex(-1);
  }, [isOpen]);

  // Focus the active menu item when focusedIndex changes
  useEffect(() => {
    if (isOpen && focusedIndex >= 0) {
      const menuItems = ref.current?.querySelectorAll<HTMLElement>("[role='menuitem']");
      menuItems?.[focusedIndex]?.focus();
    }
  }, [isOpen, focusedIndex]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape" && isOpen) {
      e.preventDefault();
      onToggle();
      // Return focus to the trigger button
      ref.current?.querySelector("button")?.focus();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!isOpen) { onToggle(); setFocusedIndex(0); }
      else setFocusedIndex((prev) => (prev + 1) % items.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (isOpen) setFocusedIndex((prev) => (prev - 1 + items.length) % items.length);
    }
  }

  return (
    <div ref={ref} className="relative" onKeyDown={handleKeyDown}>
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className={`flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
          isOpen
            ? "bg-stone-900 text-white dark:bg-stone-800"
            : "text-stone-600 hover:bg-stone-100 hover:text-stone-900 dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-white"
        }`}
      >
        {label}
        <ChevronDown
          className={`size-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && (
        <div role="menu" className="absolute left-0 top-full z-50 mt-1 min-w-[260px] max-h-[calc(100vh-5rem)] overflow-y-auto rounded-lg border border-stone-700 bg-stone-900 py-2 shadow-xl">
          {items.map((item, i) => (
            <Link
              key={item.href}
              href={item.href as "/jobs"}
              role="menuitem"
              tabIndex={focusedIndex === i ? 0 : -1}
              className="block px-4 py-2.5 transition-colors hover:bg-stone-800 focus:bg-stone-800 focus:outline-none"
              onClick={() => {
                onToggle();
                onClose?.();
              }}
            >
              <span className="text-sm font-medium text-white">
                {item.label}
              </span>
              {item.desc && (
                <span className="block text-xs text-stone-500 mt-0.5">
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
/*  MegaMenu — multi-column grouped dropdown for Strategy              */
/* ------------------------------------------------------------------ */

function MegaMenu({
  label,
  groups,
  isOpen,
  onToggle,
  onClose,
}: {
  label: string;
  groups: DropdownGroup[];
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

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape" && isOpen) {
      e.preventDefault();
      onToggle();
      ref.current?.querySelector("button")?.focus();
    } else if (e.key === "ArrowDown" && isOpen) {
      e.preventDefault();
      const links = ref.current?.querySelectorAll<HTMLElement>("[role='menu'] a");
      const active = document.activeElement;
      const idx = links ? Array.from(links).indexOf(active as HTMLElement) : -1;
      links?.[(idx + 1) % (links?.length || 1)]?.focus();
    } else if (e.key === "ArrowUp" && isOpen) {
      e.preventDefault();
      const links = ref.current?.querySelectorAll<HTMLElement>("[role='menu'] a");
      const active = document.activeElement;
      const idx = links ? Array.from(links).indexOf(active as HTMLElement) : -1;
      links?.[(idx - 1 + (links?.length || 1)) % (links?.length || 1)]?.focus();
    }
  }

  return (
    <div ref={ref} className="relative" onKeyDown={handleKeyDown}>
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className={`flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
          isOpen
            ? "bg-stone-900 text-white dark:bg-stone-800"
            : "text-stone-600 hover:bg-stone-100 hover:text-stone-900 dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-white"
        }`}
      >
        {label}
        <ChevronDown
          className={`size-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && (
        <div role="menu" className="absolute left-0 top-full z-50 mt-1 rounded-lg border border-stone-700 bg-stone-900 py-3 shadow-xl max-h-[calc(100vh-5rem)] max-w-[calc(100vw-2rem)] overflow-y-auto">
          <div className="grid grid-cols-3 gap-0 min-w-[660px]">
            {groups.map((group) => (
              <div key={group.heading} className="px-3">
                <p className="px-2 pb-2 text-xs font-semibold uppercase tracking-wider text-stone-500">
                  {group.heading}
                </p>
                <div className="space-y-0.5">
                  {group.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href as "/jobs"}
                      tabIndex={-1}
                      className="block rounded-md px-2 py-1.5 transition-colors hover:bg-stone-800 focus:bg-stone-800 focus:outline-none"
                      onClick={() => {
                        onToggle();
                        onClose?.();
                      }}
                    >
                      <span className="text-sm font-medium text-white leading-tight">
                        {item.label}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Header                                                             */
/* ------------------------------------------------------------------ */

interface HeaderProps {
  fqhcIndex?: { name: string; slug: string; city: string; county: string }[];
}

export default function Header({ fqhcIndex = [] }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const avatarRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const { user, profile, loading, signOut } = useAuth();

  // Close avatar dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (avatarRef.current && !avatarRef.current.contains(e.target as Node)) {
        setAvatarOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Get user initials for avatar
  const userInitial = profile?.display_name
    ? profile.display_name.charAt(0).toUpperCase()
    : user?.email?.charAt(0).toUpperCase() || "?";

  const toggleDropdown = useCallback(
    (label: string) => {
      setOpenDropdown((prev) => (prev === label ? null : label));
    },
    []
  );

  const isEs = locale === "es";

  const navItems: NavItem[] = [
    {
      label: t("intelligence"),
      children: [
        { href: "/intelligence", label: t("dashboard"), desc: t("dashboardDesc") },
        { href: "/intelligence/legislation", label: t("legislativeTracker"), desc: t("legislativeTrackerDesc") },
        { href: "/layoffs", label: t("layoffs"), desc: t("layoffsDesc") },
        { href: "/salary-data", label: t("salaryData"), desc: t("salaryDataDesc") },
        { href: "/salary-calculator", label: isEs ? "Calculadora Salarial" : "Salary Calculator", desc: isEs ? "Verifique si su oferta es competitiva" : "Check if your offer is competitive" },
        { href: "/intelligence/los-angeles", label: t("regionalIntel"), desc: t("regionalIntelDesc") },
        { href: "/blog", label: t("blog"), desc: t("blogDesc") },
        { href: "/strategy/advocacy", label: isEs ? "Seguimiento de Abogacía" : "Advocacy Watch", desc: isEs ? "Legislación y coaliciones protegiendo FQHCs" : "Legislation & coalitions protecting FQHCs" },
        { href: "/intel-brief", label: "Intel Brief PDF", desc: isEs ? "Descargar informe semanal" : "Download weekly brief" },
      ],
    },
    {
      label: t("strategy"),
      groups: [
        {
          heading: isEs ? "Marcos y Herramientas" : "Frameworks & Tools",
          items: [
            { href: "/strategy/okrs", label: t("okrTemplates") },
            { href: "/strategy/frameworks", label: t("executionFrameworks") },
            { href: "/strategy/clinic-simulator", label: t("clinicSimulator") },
            { href: "/strategy/revenue-simulator", label: isEs ? "Simulador de Ingresos" : "Revenue Simulator" },
          ],
        },
        {
          heading: isEs ? "Datos y Análisis" : "Data & Analysis",
          items: [
            { href: "/strategy/economics", label: t("healthcareEconomics") },
            { href: "/funding-impact", label: t("fundingImpact") },
            { href: "/strategy/resilience", label: t("resilience") },
            { href: "/strategy/labor-relations", label: isEs ? "Relaciones Laborales" : "Labor Relations" },
            { href: "/strategy/scope-of-practice", label: t("scopeOfPractice") },
            { href: "/strategy/tech-stack", label: t("techStack") },
            { href: "/ai-tracker", label: t("aiTracker") },
          ],
        },
        {
          heading: isEs ? "Fuerza Laboral" : "Workforce",
          items: [
            { href: "/strategy/workforce-resilience", label: t("workforceResilience") },
            { href: "/strategy/offboarding", label: t("transitionResources") },
            { href: "/strategy/cultural-humility", label: t("culturalHumility") },
            { href: "/compliance", label: isEs ? "Cumplimiento" : "Compliance" },
          ],
        },
      ],
    },
    {
      label: isEs ? "Aprender" : "Learn",
      groups: [
        {
          heading: isEs ? "Para Líderes" : "For Leaders",
          items: [
            { href: "/strategy/masterclass", label: t("masterclass") },
            { href: "/strategy/okr-course", label: isEs ? "Curso de OKRs" : "OKR Course" },
            { href: "/strategy/research", label: isEs ? "Archivo Académico" : "Research Archive" },
            { href: "/strategy/guides", label: t("executiveGuides") },
          ],
        },
        {
          heading: isEs ? "Para Tu Carrera" : "For Your Career",
          items: [
            { href: "/academy", label: isEs ? "Academia FQHC" : "FQHC Academy" },
            { href: "/pathway", label: isEs ? "Ruta de Carrera" : "Career Pathway" },
            { href: "/career-insights", label: isEs ? "Evaluación de Carrera" : "Career Assessment" },
            { href: "/career-roadmap", label: t("careerRoadmap") },
            { href: "/certifications", label: t("certifications") },
            { href: "/interview-prep", label: t("interviewPrep") },
            { href: "/resume-builder", label: t("resumeBuilder") },
            { href: "/resources", label: isEs ? "Recursos de Carrera" : "Career Resources" },
          ],
        },
        {
          heading: isEs ? "Para Tu Práctica" : "For Your Practice",
          items: [
            { href: "/guides", label: isEs ? "Guías del Trabajo" : "Workplace Guides" },
            { href: "/glossary", label: isEs ? "Glosario FQHC" : "FQHC Glossary" },
          ],
        },
      ],
    },
    { href: "/jobs", label: isEs ? "Empleos" : "Jobs" },
    { href: "/directory", label: isEs ? "Directorio" : "Directory" },
  ];

  // Flatten groups into a single children list for mobile
  const flattenNav = (item: NavItem): DropdownItem[] => {
    if (item.children) return item.children;
    if (item.groups) return item.groups.flatMap((g) => g.items);
    return [];
  };

  function switchLocale() {
    const newLocale = locale === "en" ? "es" : "en";
    trackLanguageToggle(newLocale);
    router.replace(pathname, { locale: newLocale });
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-stone-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:border-stone-800 dark:bg-stone-950/95 dark:supports-[backdrop-filter]:bg-stone-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
        >
          <Heart className="size-7 fill-teal-700 text-teal-700" />
          <span className="text-xl font-bold tracking-tight text-stone-900 dark:text-white">
            FQHC <span className="text-teal-700 dark:text-teal-400">Talent</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav aria-label="Main navigation" className="hidden items-center gap-0.5 lg:flex">
          {navItems.map((item) =>
            item.groups ? (
              <MegaMenu
                key={item.label}
                label={item.label}
                groups={item.groups}
                isOpen={openDropdown === item.label}
                onToggle={() => toggleDropdown(item.label)}
              />
            ) : item.children ? (
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
                className="rounded-md px-3 py-2 text-sm font-medium text-stone-600 transition-all duration-150 hover:bg-stone-100 hover:text-stone-900 dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-white"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        {/* Desktop — Search + Newsletter CTA + Language toggle + Auth */}
        <div className="hidden items-center gap-2 lg:flex">
          <GlobalSearch fqhcIndex={fqhcIndex} />

          <Link
            href="/newsletter"
            className="flex items-center gap-1.5 rounded-md bg-teal-700 px-3 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-teal-800"
          >
            <Mail className="size-3.5" />
            {isEs ? "Boletín" : "Newsletter"}
          </Link>

          <ThemeToggle />

          <button
            onClick={switchLocale}
            className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-medium text-stone-500 transition-colors hover:bg-stone-100 hover:text-stone-900 dark:text-stone-400 dark:hover:bg-stone-800 dark:hover:text-white"
            title={t("languageToggle")}
          >
            <Globe className="size-4" />
            {locale === "en" ? "ES" : "EN"}
          </button>

          {!loading && !user && (
            <Link
              href="/login"
              className="rounded-md px-3 py-1.5 text-sm font-medium text-stone-500 transition-colors hover:bg-stone-100 hover:text-stone-900 dark:text-stone-400 dark:hover:bg-stone-800 dark:hover:text-white"
            >
              {t("signIn")}
            </Link>
          )}

          {!loading && user && (
            <div ref={avatarRef} className="relative">
              <button
                onClick={() => setAvatarOpen(!avatarOpen)}
                aria-expanded={avatarOpen}
                aria-haspopup="true"
                aria-label={profile?.display_name || user.email || "Account menu"}
                className="flex size-8 items-center justify-center rounded-full bg-teal-700 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                title={profile?.display_name || user.email || "Account"}
              >
                {userInitial}
              </button>
              {avatarOpen && (
                <div className="absolute right-0 top-full z-50 mt-2 min-w-[200px] rounded-lg border border-stone-700 bg-stone-900 py-2 shadow-xl">
                  <div className="border-b border-stone-700 px-4 py-2">
                    <p className="text-sm font-medium text-white truncate">
                      {profile?.display_name || user.email}
                    </p>
                    {profile?.organization && (
                      <p className="text-xs text-stone-500 truncate">{profile.organization}</p>
                    )}
                  </div>
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-white transition-colors hover:bg-stone-800"
                    onClick={() => setAvatarOpen(false)}
                  >
                    <LayoutDashboard className="size-4 text-stone-500" />
                    {t("myDashboard")}
                  </Link>
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-white transition-colors hover:bg-stone-800"
                    onClick={() => setAvatarOpen(false)}
                  >
                    <Bookmark className="size-4 text-stone-500" />
                    {t("favorites")}
                  </Link>
                  <button
                    onClick={() => {
                      setAvatarOpen(false);
                      signOut();
                    }}
                    className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-red-400 transition-colors hover:bg-stone-800"
                  >
                    <LogOut className="size-4" />
                    {t("signOutLabel")}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-stone-600 hover:bg-stone-100 hover:text-stone-900 dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-white lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
        >
          {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div id="mobile-menu" role="navigation" aria-label="Mobile navigation" className="border-t border-stone-200 bg-white lg:hidden max-h-[calc(100vh-4rem)] overflow-y-auto dark:border-stone-800 dark:bg-stone-950">
          <div className="space-y-1 px-4 pb-4 pt-2">
            {navItems.map((item) => {
              const flatItems = flattenNav(item);
              return flatItems.length > 0 ? (
                <div key={item.label}>
                  <button
                    onClick={() =>
                      setMobileExpanded(
                        mobileExpanded === item.label ? null : item.label
                      )
                    }
                    aria-expanded={mobileExpanded === item.label}
                    className="flex w-full items-center justify-between rounded-md px-3 py-2 text-base font-medium text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-900 dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-white"
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
                      {/* Show group headings on mobile for Strategy */}
                      {item.groups
                        ? item.groups.map((group) => (
                            <div key={group.heading}>
                              <p className="px-3 pt-3 pb-1 text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                                {group.heading}
                              </p>
                              {group.items.map((child) => (
                                <Link
                                  key={child.href}
                                  href={child.href as "/jobs"}
                                  className="block rounded-md px-3 py-2 text-sm text-stone-500 transition-colors hover:bg-stone-50 hover:text-stone-900 dark:text-stone-400 dark:hover:bg-stone-800 dark:hover:text-white"
                                  onClick={() => setMobileOpen(false)}
                                >
                                  {child.label}
                                </Link>
                              ))}
                            </div>
                          ))
                        : flatItems.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href as "/jobs"}
                              className="block rounded-md px-3 py-2 text-sm text-stone-500 transition-colors hover:bg-stone-50 hover:text-stone-900 dark:text-stone-400 dark:hover:bg-stone-800 dark:hover:text-white"
                              onClick={() => setMobileOpen(false)}
                            >
                              {child.label}
                              {child.desc && (
                                <span className="block text-xs text-stone-500 mt-0.5">
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
                  className="block rounded-md px-3 py-2 text-base font-medium text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-900 dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-white"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}

            {/* Mobile newsletter CTA */}
            <Link
              href="/newsletter"
              className="flex w-full items-center gap-2 rounded-md bg-teal-50 px-3 py-2.5 text-base font-semibold text-teal-700 transition-colors hover:bg-teal-100 dark:bg-teal-950 dark:text-teal-400 dark:hover:bg-teal-900"
              onClick={() => setMobileOpen(false)}
            >
              <Mail className="size-4" />
              {isEs ? "Suscríbete al Boletín" : "Subscribe to Newsletter"}
            </Link>

            {/* Mobile language toggle */}
            <button
              onClick={() => {
                switchLocale();
                setMobileOpen(false);
              }}
              className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-base font-medium text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-900 dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-white"
            >
              <Globe className="size-4" />
              {t("languageToggle")}
            </button>

            {/* Mobile auth section */}
            <div className="border-t border-stone-200 pt-2 mt-2 dark:border-stone-700">
              {!loading && !user && (
                <Link
                  href="/login"
                  className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-base font-medium text-teal-700 transition-colors hover:bg-teal-50 dark:text-teal-400 dark:hover:bg-teal-950"
                  onClick={() => setMobileOpen(false)}
                >
                  <User className="size-4" />
                  {t("signIn")}
                </Link>
              )}
              {!loading && user && (
                <>
                  <div className="px-3 py-2">
                    <p className="text-sm font-medium text-stone-900 truncate dark:text-stone-100">
                      {profile?.display_name || user.email}
                    </p>
                    {profile?.organization && (
                      <p className="text-xs text-stone-500 truncate dark:text-stone-400">{profile.organization}</p>
                    )}
                  </div>
                  <Link
                    href="/dashboard"
                    className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-base font-medium text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-900 dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-white"
                    onClick={() => setMobileOpen(false)}
                  >
                    <LayoutDashboard className="size-4" />
                    {t("myDashboard")}
                  </Link>
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      signOut();
                    }}
                    className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-base font-medium text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950"
                  >
                    <LogOut className="size-4" />
                    {t("signOutLabel")}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
