"use client";

import { useState, useEffect, useCallback } from "react";
import { List, X } from "lucide-react";

interface TOCItem {
  id: string;
  label: string;
  level?: 1 | 2;
}

interface TableOfContentsProps {
  items: TOCItem[];
  title?: string;
}

export function TableOfContents({ items, title }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [mobileOpen, setMobileOpen] = useState(false);

  // Track which section is currently visible using IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first entry that is intersecting from the top
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-80px 0px -60% 0px",
        threshold: 0,
      },
    );

    const elements = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [items]);

  const handleClick = useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        setActiveId(id);
        setMobileOpen(false);
      }
    },
    [],
  );

  const tocContent = (
    <nav aria-label="Table of contents">
      {title && (
        <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
          {title}
        </h3>
      )}
      <ul className="space-y-0.5">
        {items.map((item) => {
          const isActive = activeId === item.id;
          const isLevel2 = item.level === 2;
          return (
            <li key={item.id}>
              <button
                onClick={() => handleClick(item.id)}
                className={`w-full text-left text-sm py-1.5 px-3 rounded-md transition-colors leading-snug ${
                  isLevel2 ? "pl-6" : ""
                } ${
                  isActive
                    ? "bg-teal-50 text-teal-800 font-semibold border-l-2 border-teal-600"
                    : "text-stone-500 hover:text-stone-800 hover:bg-stone-100"
                }`}
              >
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );

  return (
    <>
      {/* Desktop: sticky sidebar */}
      <div className="hidden xl:block no-print" data-no-print>
        <div className="sticky top-24 w-56 max-h-[calc(100vh-8rem)] overflow-y-auto rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
          {tocContent}
        </div>
      </div>

      {/* Mobile: floating toggle button + slide-out panel */}
      <div className="xl:hidden no-print" data-no-print>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="fixed bottom-20 right-4 z-40 flex items-center justify-center size-11 rounded-full bg-teal-700 text-white shadow-lg hover:bg-teal-800 transition-colors"
          aria-label="Table of contents"
        >
          {mobileOpen ? <X className="size-5" /> : <List className="size-5" />}
        </button>

        {mobileOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40 bg-black/30"
              onClick={() => setMobileOpen(false)}
            />
            {/* Panel */}
            <div className="fixed bottom-32 right-4 z-50 w-72 max-h-[60vh] overflow-y-auto rounded-xl border border-stone-200 bg-white p-4 shadow-xl">
              {tocContent}
            </div>
          </>
        )}
      </div>
    </>
  );
}
