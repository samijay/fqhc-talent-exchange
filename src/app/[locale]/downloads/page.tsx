"use client";

import { useState, useMemo } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  Download,
  FileSpreadsheet,
  FileText,
  File,
  ArrowRight,
  ArrowLeft,
  Target,
  Calendar,
  Shield,
  Briefcase,
  Building2,
  BarChart3,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DOWNLOAD_ITEMS,
  DOWNLOAD_CATEGORIES,
  type DownloadCategory,
  type DownloadFormat,
} from "@/lib/downloads-catalog";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

const FORMAT_ICONS: Record<DownloadFormat, typeof FileText> = {
  xlsx: FileSpreadsheet,
  pdf: FileText,
  docx: File,
  csv: FileSpreadsheet,
  ics: Calendar,
  txt: FileText,
};

const FORMAT_COLORS: Record<DownloadFormat, string> = {
  xlsx: "bg-green-50 text-green-700 border-green-200",
  pdf: "bg-red-50 text-red-700 border-red-200",
  docx: "bg-blue-50 text-blue-700 border-blue-200",
  csv: "bg-emerald-50 text-emerald-700 border-emerald-200",
  ics: "bg-purple-50 text-purple-700 border-purple-200",
  txt: "bg-stone-50 text-stone-700 border-stone-200",
};

const CATEGORY_ICONS: Record<DownloadCategory, typeof Target> = {
  okr: Target,
  schedule: Calendar,
  compliance: Shield,
  career: Briefcase,
  "clinic-sim": Building2,
  intelligence: BarChart3,
};

export default function DownloadsPage() {
  const locale = useLocale();
  const isEs = locale === "es";
  const [selectedCategory, setSelectedCategory] = useState<
    DownloadCategory | "all"
  >("all");
  const [selectedFormat, setSelectedFormat] = useState<DownloadFormat | "all">(
    "all"
  );

  const filteredItems = useMemo(() => {
    return DOWNLOAD_ITEMS.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      const matchesFormat =
        selectedFormat === "all" || item.format === selectedFormat;
      return matchesCategory && matchesFormat;
    });
  }, [selectedCategory, selectedFormat]);

  // Get unique formats from all items
  const availableFormats = useMemo(
    () => Array.from(new Set(DOWNLOAD_ITEMS.map((i) => i.format))),
    []
  );

  return (
    <main className="min-h-screen">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://www.fqhctalent.com" },
          {
            name: "Downloads",
            url: "https://www.fqhctalent.com/downloads",
          },
        ]}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-900 via-teal-800 to-stone-900 py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <Badge
            variant="outline"
            className="mb-4 border-teal-400/30 text-teal-200"
          >
            <Download className="h-3 w-3 mr-1" />
            {isEs ? "100% Gratis" : "100% Free"}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {isEs ? "Descargas Gratuitas" : "Free Downloads"}
          </h1>
          <p className="text-xl text-teal-100/80 max-w-2xl mx-auto leading-relaxed">
            {isEs
              ? "Plantillas, informes y herramientas generados por nuestras herramientas interactivas. Excel, PDF, Word y más."
              : "Templates, reports, and tools generated from our interactive tools. Excel, PDF, Word, and more."}
          </p>
          <p className="text-sm text-teal-300/60 mt-4">
            {isEs
              ? `${DOWNLOAD_ITEMS.length} descargas disponibles`
              : `${DOWNLOAD_ITEMS.length} downloads available`}
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 px-6 border-b border-stone-100 sticky top-0 bg-white/95 backdrop-blur-sm z-30">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Category tabs */}
            <div className="flex gap-2 overflow-x-auto pb-1 -mb-1 flex-1 scrollbar-hide">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`shrink-0 px-3 py-1.5 text-xs rounded-full border transition-colors ${
                  selectedCategory === "all"
                    ? "bg-teal-600 text-white border-teal-600"
                    : "bg-white text-stone-600 border-stone-200 hover:border-teal-300"
                }`}
              >
                {isEs ? "Todos" : "All"} ({DOWNLOAD_ITEMS.length})
              </button>
              {DOWNLOAD_CATEGORIES.filter((cat) =>
                DOWNLOAD_ITEMS.some((i) => i.category === cat.id)
              ).map((cat) => {
                const count = DOWNLOAD_ITEMS.filter(
                  (i) => i.category === cat.id
                ).length;
                const Icon = CATEGORY_ICONS[cat.id];
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`shrink-0 px-3 py-1.5 text-xs rounded-full border transition-colors inline-flex items-center gap-1.5 ${
                      selectedCategory === cat.id
                        ? "bg-teal-600 text-white border-teal-600"
                        : "bg-white text-stone-600 border-stone-200 hover:border-teal-300"
                    }`}
                  >
                    <Icon className="h-3 w-3" />
                    {isEs ? cat.esTitle : cat.title} ({count})
                  </button>
                );
              })}
            </div>

            {/* Format filter */}
            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => setSelectedFormat("all")}
                className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${
                  selectedFormat === "all"
                    ? "bg-stone-800 text-white border-stone-800"
                    : "bg-white text-stone-600 border-stone-200 hover:border-stone-400"
                }`}
              >
                {isEs ? "Todos los formatos" : "All formats"}
              </button>
              {availableFormats.map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => setSelectedFormat(fmt)}
                  className={`px-3 py-1.5 text-xs rounded-full border transition-colors uppercase ${
                    selectedFormat === fmt
                      ? "bg-stone-800 text-white border-stone-800"
                      : "bg-white text-stone-600 border-stone-200 hover:border-stone-400"
                  }`}
                >
                  .{fmt}
                </button>
              ))}
            </div>
          </div>

          <p className="text-sm text-stone-500 mt-3">
            {filteredItems.length}{" "}
            {isEs
              ? filteredItems.length === 1
                ? "descarga"
                : "descargas"
              : filteredItems.length === 1
                ? "download"
                : "downloads"}
          </p>
        </div>
      </section>

      {/* Download cards */}
      <section className="py-10 px-6">
        <div className="max-w-5xl mx-auto">
          {filteredItems.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-stone-500 text-lg">
                {isEs
                  ? "No se encontraron descargas."
                  : "No downloads found."}
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSelectedFormat("all");
                }}
                className="mt-3 text-teal-600 hover:text-teal-700 text-sm font-medium"
              >
                {isEs ? "Limpiar filtros" : "Clear filters"}
              </button>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredItems.map((item) => {
                const FormatIcon = FORMAT_ICONS[item.format];
                const CatIcon = CATEGORY_ICONS[item.category];
                const catInfo = DOWNLOAD_CATEGORIES.find(
                  (c) => c.id === item.category
                );

                return (
                  <Link
                    key={item.id}
                    href={item.sourcePage}
                    className="group block rounded-xl border border-stone-200 bg-white p-5 hover:shadow-md hover:-translate-y-0.5 transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <Badge
                        variant="outline"
                        className={`text-[10px] uppercase ${FORMAT_COLORS[item.format]}`}
                      >
                        <FormatIcon className="h-3 w-3 mr-1" />
                        .{item.format}
                      </Badge>
                      <span className="text-[10px] text-stone-400 flex items-center gap-1">
                        <CatIcon className="h-3 w-3" />
                        {isEs
                          ? catInfo?.esTitle ?? item.category
                          : catInfo?.title ?? item.category}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-stone-900 group-hover:text-teal-700 transition-colors mb-1.5">
                      {isEs ? item.esTitle : item.title}
                    </h3>
                    <p className="text-xs text-stone-500 leading-relaxed mb-4 line-clamp-3">
                      {isEs ? item.esDescription : item.description}
                    </p>

                    <div className="flex items-center gap-1 text-xs font-medium text-teal-600 group-hover:translate-x-0.5 transition-transform">
                      {isEs ? "Ir a la herramienta" : "Go to tool"}
                      <ArrowRight className="h-3 w-3" />
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {/* Note */}
          <div className="mt-10 rounded-lg border border-stone-200 bg-stone-50 p-5 text-center">
            <p className="text-sm text-stone-600">
              {isEs
                ? "Todas las descargas se generan directamente desde nuestras herramientas interactivas. Haz clic en cualquier tarjeta para ir a la herramienta donde puedes personalizar y descargar tu archivo."
                : "All downloads are generated directly from our interactive tools. Click any card to go to the tool where you can customize and download your file."}
            </p>
          </div>
        </div>
      </section>

      {/* Back link */}
      <section className="pb-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-teal-600 hover:text-teal-700 font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            {isEs ? "Volver al inicio" : "Back to home"}
          </Link>
        </div>
      </section>
    </main>
  );
}
