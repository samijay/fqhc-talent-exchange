import { Link } from "@/i18n/navigation";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="px-4 py-3 sm:px-6 lg:px-8">
      <ol className="mx-auto flex max-w-6xl items-center gap-1.5 text-sm text-stone-500">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="size-3.5 text-stone-400" />}
            {item.href ? (
              <Link
                href={item.href as any}
                className="underline underline-offset-2 transition-colors hover:text-teal-700"
              >
                {item.label}
              </Link>
            ) : (
              <span className="font-medium text-stone-900">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
