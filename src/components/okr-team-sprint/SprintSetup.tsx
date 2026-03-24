"use client";

import { useState, useCallback } from "react";
import { useLocale } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  Copy,
  CheckCircle2,
  Zap,
} from "lucide-react";
import { generateInviteCode } from "@/lib/okr-team-sprint-engine";
import { toast } from "sonner";

interface SprintSetupProps {
  onSprintCreated: (sprint: {
    id: string;
    name: string;
    description: string;
    inviteCode: string;
  }) => void;
}

export function SprintSetup({ onSprintCreated }: SprintSetupProps) {
  const locale = useLocale();
  const isEs = locale === "es";

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [creating, setCreating] = useState(false);

  const handleCreate = useCallback(() => {
    if (!name.trim()) return;
    setCreating(true);

    const inviteCode = generateInviteCode();
    const id = `sprint-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;

    // Store sprint in localStorage (Supabase upgrade later)
    const sprint = {
      id,
      name: name.trim(),
      description: description.trim(),
      inviteCode,
      status: "active" as const,
      createdAt: new Date().toISOString(),
    };

    try {
      const existingSprints = JSON.parse(
        localStorage.getItem("okr-team-sprints") || "[]"
      );
      localStorage.setItem(
        "okr-team-sprints",
        JSON.stringify([...existingSprints, sprint])
      );
    } catch {
      // Proceed anyway
    }

    setTimeout(() => {
      setCreating(false);
      onSprintCreated(sprint);
    }, 500);
  }, [name, description, onSprintCreated]);

  const isValid = name.trim().length >= 3;

  return (
    <div className="flex flex-col gap-6 w-full max-w-lg mx-auto">
      <div className="text-center space-y-2">
        <Users className="h-10 w-10 text-teal-500 mx-auto" />
        <h2 className="text-2xl font-bold text-stone-800 dark:text-stone-100">
          {isEs ? "Crear Sprint de OKR en Equipo" : "Create Team OKR Sprint"}
        </h2>
        <p className="text-sm text-stone-500 dark:text-stone-500">
          {isEs
            ? "Configura un sprint de 4 sesiones para tu equipo ejecutivo"
            : "Set up a 4-session sprint for your executive team"}
        </p>
      </div>

      {/* Sprint name */}
      <div>
        <label className="text-sm font-medium text-stone-700 dark:text-stone-300 mb-2 block">
          {isEs ? "Nombre del Sprint" : "Sprint Name"}
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={
            isEs
              ? "Ej: OKRs Q3 2026 — Equipo de Liderazgo"
              : "E.g.: Q3 2026 OKRs — Leadership Team"
          }
          className="w-full h-11 px-4 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
        />
      </div>

      {/* Description (optional) */}
      <div>
        <label className="text-sm font-medium text-stone-700 dark:text-stone-300 mb-2 block">
          {isEs ? "Descripción (opcional)" : "Description (optional)"}
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={
            isEs
              ? "Contexto para tu equipo sobre el enfoque de este trimestre"
              : "Context for your team about this quarter's focus"
          }
          rows={3}
          className="w-full px-4 py-3 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none resize-none"
        />
      </div>

      {/* Sprint overview */}
      <Card className="border-stone-200 dark:border-stone-700">
        <CardContent className="p-4">
          <p className="text-sm font-medium text-stone-700 dark:text-stone-300 mb-3">
            {isEs ? "Tu sprint incluye:" : "Your sprint includes:"}
          </p>
          <div className="space-y-2">
            {[
              {
                num: 1,
                title: isEs ? "Alineación del Equipo" : "Team Alignment",
                time: "20 min",
              },
              {
                num: 2,
                title: isEs
                  ? "Redacción de Objetivos"
                  : "Objective Drafting",
                time: "30 min",
              },
              {
                num: 3,
                title: isEs
                  ? "Taller de Resultados Clave"
                  : "Key Results Workshop",
                time: "35 min",
              },
              {
                num: 4,
                title: isEs
                  ? "Revisión de Preparación"
                  : "Readiness Review",
                time: "25 min",
              },
            ].map((session) => (
              <div
                key={session.num}
                className="flex items-center gap-3 text-sm"
              >
                <div className="w-6 h-6 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center text-xs font-bold text-teal-700 dark:text-teal-300">
                  {session.num}
                </div>
                <span className="flex-1 text-stone-700 dark:text-stone-300">
                  {session.title}
                </span>
                <span className="text-stone-500 dark:text-stone-500 text-xs">
                  ~{session.time}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Create button */}
      <Button
        onClick={handleCreate}
        disabled={!isValid || creating}
        className="bg-teal-600 hover:bg-teal-700 text-white h-12"
      >
        {creating ? (
          <span className="motion-safe:animate-pulse">
            {isEs ? "Creando..." : "Creating..."}
          </span>
        ) : (
          <>
            <Zap className="h-4 w-4 mr-2" />
            {isEs ? "Crear Sprint" : "Create Sprint"}
          </>
        )}
      </Button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Invite Code Display (shown after creation)                         */
/* ------------------------------------------------------------------ */

export function InviteCodeDisplay({
  inviteCode,
  sprintName,
}: {
  inviteCode: string;
  sprintName: string;
}) {
  const locale = useLocale();
  const isEs = locale === "es";
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(inviteCode);
    setCopied(true);
    toast.success(isEs ? "Código copiado" : "Code copied");
    setTimeout(() => setCopied(false), 2000);
  }, [inviteCode, isEs]);

  return (
    <Card className="border-teal-200 bg-teal-50/50 dark:border-teal-800 dark:bg-teal-950/50">
      <CardContent className="p-5 text-center space-y-3">
        <CheckCircle2 className="h-8 w-8 text-green-500 mx-auto" />
        <p className="font-medium text-stone-800 dark:text-stone-200">
          {isEs ? "Sprint creado:" : "Sprint created:"} {sprintName}
        </p>
        <p className="text-sm text-stone-500 dark:text-stone-500">
          {isEs
            ? "Comparte este código con tu equipo para que se unan:"
            : "Share this code with your team to join:"}
        </p>
        <div className="flex items-center justify-center gap-2">
          <code className="text-3xl font-mono font-bold tracking-widest text-teal-700 dark:text-teal-300 bg-white dark:bg-stone-900 px-4 py-2 rounded-lg border border-teal-200 dark:border-teal-700">
            {inviteCode}
          </code>
          <Button variant="ghost" size="sm" onClick={handleCopy}>
            {copied ? (
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            ) : (
              <Copy className="h-5 w-5 text-stone-500" />
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
