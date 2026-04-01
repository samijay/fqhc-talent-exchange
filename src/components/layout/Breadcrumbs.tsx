import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href?: string; // if undefined, it's the current page (no link)
}

/**
 * Visual breadcrumb navigation with BreadcrumbList JSON-LD schema.
 * Use on high-traffic pages to improve crawlability and rich results.
 */
export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  // Build JSON-LD BreadcrumbList schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href
        ? { item: `https://www.fqhctalent.com${item.href}` }
        : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="text-sm text-stone-500 mb-4">
        <ol className="flex items-center gap-1.5 flex-wrap">
          {items.map((item, i) => (
            <li key={i} className="flex items-center gap-1.5">
              {i > 0 && <span aria-hidden="true">/</span>}
              {item.href ? (
                <Link href={item.href} className="hover:text-teal-700 transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className="text-stone-900 font-medium">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
