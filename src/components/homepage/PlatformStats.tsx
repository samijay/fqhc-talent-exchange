"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  Building2,
  Briefcase,
  Newspaper,
  DollarSign,
  BookOpen,
  MapPin,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Animated counter hook                                              */
/* ------------------------------------------------------------------ */

function useCountUp(target: number, duration = 1400): number {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!ref.current || hasAnimated.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return;
        hasAnimated.current = true;

        const startTime = performance.now();
        const animate = (now: number) => {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease-out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(eased * target));
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      },
      { threshold: 0.3 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return count;
}

/* ------------------------------------------------------------------ */
/*  Counter cell (wrapper that exposes the ref for IntersectionObserver) */
/* ------------------------------------------------------------------ */

function CounterCell({
  target,
  suffix,
  label,
  href,
  icon: Icon,
  color,
}: {
  target: number;
  suffix: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}) {
  const count = useCountUp(target);
  const cellRef = useRef<HTMLDivElement>(null);

  // Expose the ref for the IntersectionObserver inside useCountUp
  // We need a separate approach — let's inline observer here
  const [displayCount, setDisplayCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!cellRef.current || hasAnimated.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return;
        hasAnimated.current = true;

        const duration = 1400;
        const startTime = performance.now();
        const animate = (now: number) => {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplayCount(Math.round(eased * target));
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      },
      { threshold: 0.3 }
    );

    observer.observe(cellRef.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={cellRef}>
      <Link
        href={href as "/directory" | "/jobs" | "/layoffs" | "/salary-data" | "/glossary" | "/intelligence/los-angeles"}
        className="group flex flex-col items-center gap-2 text-center transition-transform hover:-translate-y-0.5"
      >
        <div
          className={`flex size-10 items-center justify-center rounded-xl ${color} transition-shadow group-hover:shadow-md`}
        >
          <Icon className="size-5 text-white" />
        </div>
        <p className="text-2xl font-extrabold tracking-tight text-stone-900 sm:text-3xl">
          {displayCount.toLocaleString()}{suffix}
        </p>
        <p className="text-xs font-medium uppercase tracking-wider text-stone-500 group-hover:text-teal-600">
          {label}
        </p>
      </Link>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */

interface PlatformStatsProps {
  totalFQHCs: number;
  totalJobs: number;
  totalIntel: number;
  totalSalaryRoles: number;
  totalGlossaryTerms: number;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function PlatformStats({
  totalFQHCs,
  totalJobs,
  totalIntel,
  totalSalaryRoles,
  totalGlossaryTerms,
}: PlatformStatsProps) {
  const locale = useLocale();
  const isEs = locale === "es";

  const stats = [
    {
      target: totalFQHCs,
      suffix: "+",
      label: isEs ? "FQHCs Rastreados" : "FQHCs Tracked",
      href: "/directory",
      icon: Building2,
      color: "bg-teal-700",
    },
    {
      target: totalJobs,
      suffix: "+",
      label: isEs ? "Posiciones Abiertas" : "Open Positions",
      href: "/jobs",
      icon: Briefcase,
      color: "bg-amber-600",
    },
    {
      target: totalIntel,
      suffix: "+",
      label: isEs ? "Items de Intel" : "Intel Items",
      href: "/layoffs",
      icon: Newspaper,
      color: "bg-stone-700",
    },
    {
      target: totalSalaryRoles,
      suffix: "",
      label: isEs ? "Benchmarks Salariales" : "Salary Benchmarks",
      href: "/salary-data",
      icon: DollarSign,
      color: "bg-emerald-700",
    },
    {
      target: totalGlossaryTerms,
      suffix: "",
      label: isEs ? "Términos del Glosario" : "Glossary Terms",
      href: "/glossary",
      icon: BookOpen,
      color: "bg-indigo-700",
    },
    {
      target: 9,
      suffix: "",
      label: isEs ? "Regiones de CA" : "CA Regions Covered",
      href: "/intelligence/los-angeles",
      icon: MapPin,
      color: "bg-rose-700",
    },
  ];

  return (
    <section className="border-y border-stone-200 bg-white px-4 py-12 sm:py-16">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-8 text-center text-sm font-semibold uppercase tracking-widest text-stone-400">
          {isEs ? "La Plataforma en Números" : "Platform at a Glance"}
        </h2>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
          {stats.map((stat) => (
            <CounterCell key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
