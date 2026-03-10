// PolicyGenerator.tsx — Fill-in-the-blank policy template generator
"use client";

import { useState, useCallback } from "react";
import { useLocale } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Download,
  Copy,
  Check,
  ArrowLeft,
  ChevronRight,
} from "lucide-react";
import type { PolicyTemplate, ComplianceDomain } from "@/lib/compliance-data";

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */

interface PolicyGeneratorProps {
  domain: ComplianceDomain;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

// Find [PLACEHOLDER] patterns in text
function findPlaceholders(text: string): string[] {
  const matches = text.match(/\[[A-Z\s/()]+\]/g) || [];
  return [...new Set(matches)];
}

// Replace placeholders with user values
function fillTemplate(text: string, values: Record<string, string>): string {
  let result = text;
  for (const [placeholder, value] of Object.entries(values)) {
    if (value.trim()) {
      result = result.replaceAll(placeholder, value);
    }
  }
  return result;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function PolicyGenerator({ domain }: PolicyGeneratorProps) {
  const locale = useLocale();
  const isEs = locale === "es";
  const t = (obj: { en: string; es: string }) => (isEs ? obj.es : obj.en);

  const [selectedTemplate, setSelectedTemplate] = useState<PolicyTemplate | null>(null);
  const [values, setValues] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  const templates = domain.policyTemplates;

  // Collect all placeholders from selected template
  const placeholders = selectedTemplate
    ? selectedTemplate.sections
        .flatMap((s) => [
          ...findPlaceholders(t(s.heading)),
          ...findPlaceholders(t(s.content)),
        ])
        .filter((p, i, arr) => arr.indexOf(p) === i)
    : [];

  const handleCopyToClipboard = useCallback(() => {
    if (!selectedTemplate) return;

    const text = selectedTemplate.sections
      .map((section) => {
        const heading = fillTemplate(t(section.heading), values);
        const content = fillTemplate(t(section.content), values);
        return `${heading}\n\n${content}`;
      })
      .join("\n\n---\n\n");

    const header = `${t(selectedTemplate.title)}\n${selectedTemplate.sourceRegulation ? `Reference: ${selectedTemplate.sourceRegulation}` : ""}\nGenerated: ${new Date().toLocaleDateString()}\n\n`;

    navigator.clipboard.writeText(header + text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [selectedTemplate, values, isEs]);

  // ---- Template list view ----
  if (!selectedTemplate) {
    if (templates.length === 0) {
      return (
        <div className="py-8 text-center text-stone-400">
          <FileText className="h-8 w-8 mx-auto mb-2" />
          <p className="text-sm">
            {isEs
              ? "No hay plantillas de políticas disponibles para este dominio aún."
              : "No policy templates available for this domain yet."}
          </p>
        </div>
      );
    }

    return (
      <div>
        <h3 className="text-lg font-bold text-stone-800 dark:text-stone-200 mb-4 flex items-center gap-2">
          <FileText className="h-5 w-5 text-indigo-500" />
          {isEs ? "Plantillas de Políticas" : "Policy Templates"}
        </h3>
        <div className="space-y-2">
          {templates.map((tmpl) => (
            <button
              key={tmpl.id}
              onClick={() => {
                setSelectedTemplate(tmpl);
                setValues({});
              }}
              className="w-full text-left rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 p-4 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-sm transition-all"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-stone-800 dark:text-stone-200">
                    {t(tmpl.title)}
                  </p>
                  <p className="text-xs text-stone-500 mt-0.5">
                    {t(tmpl.description)}
                  </p>
                  {tmpl.sourceRegulation && (
                    <p className="text-[10px] text-stone-400 mt-1">
                      {tmpl.sourceRegulation}
                    </p>
                  )}
                </div>
                <ChevronRight className="h-4 w-4 text-stone-400 shrink-0" />
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ---- Template editor view ----
  return (
    <div>
      <button
        onClick={() => setSelectedTemplate(null)}
        className="flex items-center gap-1 text-sm text-stone-500 hover:text-stone-700 dark:hover:text-stone-300 mb-4 transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        {isEs ? "Volver a plantillas" : "Back to templates"}
      </button>

      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-stone-800 dark:text-stone-200">
            {t(selectedTemplate.title)}
          </h3>
          {selectedTemplate.sourceRegulation && (
            <p className="text-xs text-stone-400 mt-0.5">
              {selectedTemplate.sourceRegulation}
            </p>
          )}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopyToClipboard}
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 mr-1 text-green-600" />
          ) : (
            <Copy className="h-3.5 w-3.5 mr-1" />
          )}
          {copied ? (isEs ? "Copiado" : "Copied") : (isEs ? "Copiar texto" : "Copy text")}
        </Button>
      </div>

      {/* Placeholder inputs */}
      {placeholders.length > 0 && (
        <Card className="mb-4 border-indigo-200 dark:border-indigo-800">
          <CardContent className="p-4">
            <p className="text-xs font-semibold text-indigo-700 dark:text-indigo-300 mb-3">
              {isEs ? "Completa los campos:" : "Fill in the fields:"}
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {placeholders.map((placeholder) => (
                <div key={placeholder}>
                  <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">
                    {placeholder.replace(/[\[\]]/g, "")}
                  </label>
                  <input
                    type="text"
                    value={values[placeholder] || ""}
                    onChange={(e) =>
                      setValues({ ...values, [placeholder]: e.target.value })
                    }
                    placeholder={placeholder}
                    className="w-full rounded-md border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 px-2.5 py-1.5 text-sm text-stone-800 dark:text-stone-200 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Preview sections */}
      <div className="space-y-4">
        {selectedTemplate.sections.map((section, i) => {
          const heading = fillTemplate(t(section.heading), values);
          const content = fillTemplate(t(section.content), values);

          return (
            <Card key={i}>
              <CardContent className="p-4">
                <h4 className="text-sm font-bold text-stone-800 dark:text-stone-200 mb-2 flex items-center gap-2">
                  {heading}
                  {section.isEditable && (
                    <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 text-[9px]">
                      {isEs ? "Editable" : "Editable"}
                    </Badge>
                  )}
                </h4>
                <div className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed whitespace-pre-line">
                  {content}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-4 text-center text-[10px] text-stone-400">
        {isEs
          ? "Esta plantilla es un punto de partida. Consulte con un abogado antes de implementar."
          : "This template is a starting point. Consult with legal counsel before implementing."}
      </div>
    </div>
  );
}
