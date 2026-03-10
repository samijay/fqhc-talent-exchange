"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import type {
  TeamSprint,
  SprintSession,
  DraftObjective,
  DraftKeyResult,
  MemberRole,
  DraftStatus,
} from "@/lib/okr-team-sprint-engine";
import {
  SPRINT_SESSION_TEMPLATES,
  scoreMeasurability,
} from "@/lib/okr-team-sprint-engine";
import type { OKRDomain } from "@/lib/fqhc-okr-templates";

/* ------------------------------------------------------------------ */
/*  Context Type                                                       */
/* ------------------------------------------------------------------ */

interface SprintContextType {
  sprint: TeamSprint | null;
  sessions: SprintSession[];
  objectives: DraftObjective[];
  userRole: MemberRole;
  currentUserId: string;
  loading: boolean;

  // Session actions
  startSession: (sessionNumber: number) => void;
  completeSession: (sessionNumber: number) => void;

  // Objective CRUD
  addObjective: (
    domain: OKRDomain,
    text: string,
    textEs?: string
  ) => void;
  updateObjective: (id: string, text: string) => void;
  deleteObjective: (id: string) => void;

  // Key Result CRUD
  addKeyResult: (
    objectiveId: string,
    text: string,
    metric?: string,
    target?: string
  ) => void;
  updateKeyResult: (
    objectiveId: string,
    krId: string,
    text: string
  ) => void;
  deleteKeyResult: (objectiveId: string, krId: string) => void;

  // Feedback
  addFeedback: (objectiveId: string, comment: string) => void;

  // Voting (Session 1)
  submitVotes: (priorityIds: string[]) => void;
  votes: Record<string, string[]>; // userId -> priorityIds
}

const SprintContext = createContext<SprintContextType | null>(null);

export function useSprintContext() {
  const context = useContext(SprintContext);
  if (!context) {
    throw new Error("useSprintContext must be used within SprintProvider");
  }
  return context;
}

/* ------------------------------------------------------------------ */
/*  Provider (localStorage-based for now, Supabase upgrade later)      */
/* ------------------------------------------------------------------ */

interface SprintProviderProps {
  sprintId: string;
  userId: string;
  userName: string;
  userRole: MemberRole;
  children: ReactNode;
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function SprintProvider({
  sprintId,
  userId,
  userName,
  userRole,
  children,
}: SprintProviderProps) {
  const storageKey = `okr-team-sprint-${sprintId}`;

  // Initialize state from localStorage
  const [sprint] = useState<TeamSprint | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const saved = localStorage.getItem(`${storageKey}-sprint`);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [sessions, setSessions] = useState<SprintSession[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = localStorage.getItem(`${storageKey}-sessions`);
      if (saved) return JSON.parse(saved);
    } catch {
      // fall through
    }
    // Initialize from templates
    return SPRINT_SESSION_TEMPLATES.map((tmpl) => ({
      ...tmpl,
      id: generateId(),
      sprintId,
      startedAt: null,
      completedAt: null,
      data: {},
    }));
  });

  const [objectives, setObjectives] = useState<DraftObjective[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = localStorage.getItem(`${storageKey}-objectives`);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [votes, setVotes] = useState<Record<string, string[]>>(() => {
    if (typeof window === "undefined") return {};
    try {
      const saved = localStorage.getItem(`${storageKey}-votes`);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [loading] = useState(false);

  // Persist to localStorage on changes
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (sprint) {
        localStorage.setItem(`${storageKey}-sprint`, JSON.stringify(sprint));
      }
      localStorage.setItem(`${storageKey}-sessions`, JSON.stringify(sessions));
      localStorage.setItem(`${storageKey}-objectives`, JSON.stringify(objectives));
      localStorage.setItem(`${storageKey}-votes`, JSON.stringify(votes));
    } catch {
      // Storage full
    }
  }, [sprint, sessions, objectives, votes, storageKey]);

  // Session actions
  const startSession = useCallback((sessionNumber: number) => {
    setSessions((prev) =>
      prev.map((s) =>
        s.sessionNumber === sessionNumber
          ? { ...s, startedAt: new Date().toISOString() }
          : s
      )
    );
  }, []);

  const completeSession = useCallback((sessionNumber: number) => {
    setSessions((prev) =>
      prev.map((s) =>
        s.sessionNumber === sessionNumber
          ? { ...s, completedAt: new Date().toISOString() }
          : s
      )
    );
  }, []);

  // Objective CRUD
  const addObjective = useCallback(
    (domain: OKRDomain, text: string, textEs?: string) => {
      const newObj: DraftObjective = {
        id: generateId(),
        sprintId,
        ownerId: userId,
        ownerName: userName,
        domain,
        objectiveText: text,
        objectiveTextEs: textEs,
        status: "draft" as DraftStatus,
        feedback: [],
        keyResults: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setObjectives((prev) => [...prev, newObj]);
    },
    [sprintId, userId, userName]
  );

  const updateObjective = useCallback((id: string, text: string) => {
    setObjectives((prev) =>
      prev.map((o) =>
        o.id === id
          ? { ...o, objectiveText: text, updatedAt: new Date().toISOString() }
          : o
      )
    );
  }, []);

  const deleteObjective = useCallback((id: string) => {
    setObjectives((prev) => prev.filter((o) => o.id !== id));
  }, []);

  // Key Result CRUD
  const addKeyResult = useCallback(
    (
      objectiveId: string,
      text: string,
      metric?: string,
      target?: string
    ) => {

      const newKR: DraftKeyResult = {
        id: generateId(),
        objectiveId,
        text,
        metric,
        target,
        measurabilityScore: scoreMeasurability(text),
        ambitionScore: 50,
        comments: [],
        createdAt: new Date().toISOString(),
      };
      setObjectives((prev) =>
        prev.map((o) =>
          o.id === objectiveId
            ? {
                ...o,
                keyResults: [...o.keyResults, newKR],
                updatedAt: new Date().toISOString(),
              }
            : o
        )
      );
    },
    []
  );

  const updateKeyResult = useCallback(
    (objectiveId: string, krId: string, text: string) => {

      setObjectives((prev) =>
        prev.map((o) =>
          o.id === objectiveId
            ? {
                ...o,
                keyResults: o.keyResults.map((kr) =>
                  kr.id === krId
                    ? {
                        ...kr,
                        text,
                        measurabilityScore: scoreMeasurability(text),
                      }
                    : kr
                ),
                updatedAt: new Date().toISOString(),
              }
            : o
        )
      );
    },
    []
  );

  const deleteKeyResult = useCallback(
    (objectiveId: string, krId: string) => {
      setObjectives((prev) =>
        prev.map((o) =>
          o.id === objectiveId
            ? {
                ...o,
                keyResults: o.keyResults.filter((kr) => kr.id !== krId),
                updatedAt: new Date().toISOString(),
              }
            : o
        )
      );
    },
    []
  );

  // Feedback
  const addFeedback = useCallback(
    (objectiveId: string, comment: string) => {
      setObjectives((prev) =>
        prev.map((o) =>
          o.id === objectiveId
            ? {
                ...o,
                feedback: [
                  ...o.feedback,
                  {
                    authorId: userId,
                    authorName: userName,
                    comment,
                    createdAt: new Date().toISOString(),
                  },
                ],
                updatedAt: new Date().toISOString(),
              }
            : o
        )
      );
    },
    [userId, userName]
  );

  // Voting
  const submitVotes = useCallback(
    (priorityIds: string[]) => {
      setVotes((prev) => ({ ...prev, [userId]: priorityIds }));
    },
    [userId]
  );

  const value: SprintContextType = {
    sprint,
    sessions,
    objectives,
    userRole,
    currentUserId: userId,
    loading,
    startSession,
    completeSession,
    addObjective,
    updateObjective,
    deleteObjective,
    addKeyResult,
    updateKeyResult,
    deleteKeyResult,
    addFeedback,
    submitVotes,
    votes,
  };

  return (
    <SprintContext.Provider value={value}>{children}</SprintContext.Provider>
  );
}
