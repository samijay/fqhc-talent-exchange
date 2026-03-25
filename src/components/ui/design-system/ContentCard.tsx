import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

interface ContentCardProps {
  href: string;
  icon?: React.ReactNode;
  /** Small uppercase label */
  label?: string;
  labelColor?: string;
  /** Card title */
  title: string;
  /** Card description — clamped to 2 lines */
  description?: string;
  /** Large metric (e.g., "214+") */
  metric?: string;
  metricSuffix?: string;
  /** CTA text shown on hover AND focus */
  cta?: string;
  ctaColor?: string;
  /** Border accent color class (e.g., "border-teal-200 hover:border-teal-400") */
  borderColor?: string;
  children?: React.ReactNode;
}

export function ContentCard({
  href,
  icon,
  label,
  labelColor = "text-teal-600",
  title,
  description,
  metric,
  metricSuffix,
  cta,
  ctaColor = "text-teal-600",
  borderColor = "border-stone-200 hover:border-teal-400",
  children,
}: ContentCardProps) {
  return (
    <Link
      href={href as any}
      className={`group flex flex-col rounded-xl border-2 bg-white p-6 transition-all duration-200 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500 ${borderColor}`}
    >
      {icon && <div className="mb-3">{icon}</div>}

      {label && (
        <p className={`text-xs font-bold uppercase tracking-wider ${labelColor}`}>
          {label}
        </p>
      )}

      {metric && (
        <p className="mt-2 text-3xl font-extrabold text-stone-900">
          {metric}
          {metricSuffix && (
            <span className="ml-1 text-lg font-semibold text-stone-500">
              {metricSuffix}
            </span>
          )}
        </p>
      )}

      {title && !metric && (
        <p className="mt-2 text-sm font-semibold leading-snug text-stone-900 line-clamp-2">
          {title}
        </p>
      )}

      {description && (
        <p className="mt-1 text-sm text-stone-600 line-clamp-2">{description}</p>
      )}

      {children}

      {cta && (
        <span className={`mt-auto pt-4 inline-flex items-center gap-1 text-xs font-semibold ${ctaColor} opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100`}>
          {cta} <ArrowRight className="size-3" />
        </span>
      )}
    </Link>
  );
}
