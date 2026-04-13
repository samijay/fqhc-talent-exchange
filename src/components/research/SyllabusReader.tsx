"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useLocale } from "next-intl";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Circle,
  Clock,
  ExternalLink,
  GraduationCap,
  Lock,
  Quote,
  Lightbulb,
  ArrowRight,
  RotateCcw,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  LEVEL_META,
  AUDIENCE_TRACKS,
  RESEARCH_ENTRIES,
  type CurriculumTrack,
  type SyllabusLesson,
  type ResearchEntry,
} from "@/lib/fqhc-research-archive";
import { t } from "@/lib/i18n-helpers";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */


const STORAGE_KEY = "fqhc-syllabus-progress";

interface Progress {
  [trackId: string]: {
    completedLessons: string[]; // entryIds
    currentLevel: number; // 0, 1, 2
    currentLesson: number; // index within level
  };
}

function loadProgress(): Progress {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveProgress(progress: Progress) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

/* ------------------------------------------------------------------ */
/*  Lesson View                                                        */
/* ------------------------------------------------------------------ */

function LessonView({
  lesson,
  entry,
  locale,
  lessonNumber,
  totalLessons,
  levelLabel,
  isCompleted,
  onMarkComplete,
  onNext,
  onPrev,
  onClose,
  hasPrev,
  hasNext,
}: {
  lesson: SyllabusLesson;
  entry: ResearchEntry;
  locale: string;
  lessonNumber: number;
  totalLessons: number;
  levelLabel: string;
  isCompleted: boolean;
  onMarkComplete: () => void;
  onNext: () => void;
  onPrev: () => void;
  onClose: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}) {
  const isEs = locale === "es";

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-sm text-stone-500 dark:text-stone-500">
          <BookOpen className="h-4 w-4" />
          <span>{levelLabel}</span>
          <span>·</span>
          <span>
            {isEs ? "Lección" : "Lesson"} {lessonNumber}/{totalLessons}
          </span>
          <span>·</span>
          <Clock className="h-3.5 w-3.5" />
          <span>{lesson.readingMinutes} min</span>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-500"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Title + metadata */}
      <h2 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 mb-1">
        {t(entry.title, locale)}
      </h2>
      <p className="text-sm text-stone-500 dark:text-stone-500 mb-6">
        {entry.authors} ({entry.year})
        {entry.journal && <> · <em>{entry.journal}</em></>}
      </p>

      {/* Narrative */}
      <div className="prose prose-stone dark:prose-invert max-w-none mb-8">
        {t(lesson.narrative, locale)
          .split("\n\n")
          .map((para, i) => (
            <p key={i} className="text-[15px] leading-relaxed text-stone-700 dark:text-stone-300">
              {para}
            </p>
          ))}
      </div>

      {/* Quotes */}
      {lesson.quotes.length > 0 && (
        <div className="space-y-3 mb-8">
          {lesson.quotes.map((q, i) => (
            <blockquote
              key={i}
              className="border-l-4 border-amber-400 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-600 pl-4 py-3 pr-4 rounded-r-lg"
            >
              <div className="flex gap-2">
                <Quote className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm italic text-stone-700 dark:text-stone-300">
                    &ldquo;{t(q.text, locale)}&rdquo;
                  </p>
                  <p className="text-xs text-stone-500 dark:text-stone-500 mt-1 not-italic">
                    {q.attribution}
                  </p>
                </div>
              </div>
            </blockquote>
          ))}
        </div>
      )}

      {/* Key Insight */}
      <div className="bg-teal-50 dark:bg-teal-900/30 border border-teal-200 dark:border-teal-700 rounded-xl p-4 mb-8">
        <div className="flex gap-2">
          <Lightbulb className="h-5 w-5 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold text-teal-800 dark:text-teal-300 uppercase tracking-wide mb-1">
              {isEs ? "Idea Clave" : "Key Insight"}
            </p>
            <p className="text-sm text-teal-700 dark:text-teal-400 leading-relaxed">
              {t(lesson.keyInsight, locale)}
            </p>
          </div>
        </div>
      </div>

      {/* Source link */}
      <a
        href={entry.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-sm text-teal-700 hover:text-teal-900 dark:text-teal-400 font-medium mb-8"
      >
        {isEs ? "Leer fuente original" : "Read original source"}
        <ExternalLink className="h-3.5 w-3.5" />
      </a>

      {/* Transition note */}
      {lesson.transitionNote && hasNext && (
        <div className="bg-stone-100 dark:bg-stone-800 rounded-lg p-4 mb-8">
          <p className="text-sm text-stone-600 dark:text-stone-500 italic flex gap-2">
            <ArrowRight className="h-4 w-4 shrink-0 mt-0.5 text-stone-500" />
            {t(lesson.transitionNote, locale)}
          </p>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-stone-200 dark:border-stone-700">
        <Button
          variant="outline"
          size="sm"
          onClick={onPrev}
          disabled={!hasPrev}
          className="gap-1"
        >
          <ChevronLeft className="h-4 w-4" />
          {isEs ? "Anterior" : "Previous"}
        </Button>

        <Button
          variant={isCompleted ? "outline" : "default"}
          size="sm"
          onClick={onMarkComplete}
          className={
            isCompleted
              ? "gap-1 text-teal-700 border-teal-200 dark:text-teal-400"
              : "gap-1 bg-teal-700 hover:bg-teal-800"
          }
        >
          {isCompleted ? (
            <>
              <CheckCircle2 className="h-4 w-4" />
              {isEs ? "Completada" : "Completed"}
            </>
          ) : (
            <>
              <Circle className="h-4 w-4" />
              {isEs ? "Marcar como leída" : "Mark as Read"}
            </>
          )}
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={onNext}
          disabled={!hasNext}
          className="gap-1"
        >
          {isEs ? "Siguiente" : "Next"}
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Track Overview (level selector + lesson list)                      */
/* ------------------------------------------------------------------ */

function TrackOverview({
  track,
  locale,
  progress,
  onStartLesson,
  onResetTrack,
}: {
  track: CurriculumTrack;
  locale: string;
  progress: Progress;
  onStartLesson: (levelIdx: number, lessonIdx: number) => void;
  onResetTrack: () => void;
}) {
  const isEs = locale === "es";
  const trackProgress = progress[track.id] || {
    completedLessons: [],
    currentLevel: 0,
    currentLesson: 0,
  };

  const totalLessons = track.levels.reduce(
    (sum, l) => sum + (l.lessons?.length || l.entryIds.length),
    0
  );
  const completedCount = trackProgress.completedLessons.length;
  const progressPct = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  return (
    <div>
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-stone-700 dark:text-stone-300">
            {completedCount}/{totalLessons} {isEs ? "lecciones completadas" : "lessons completed"}
          </span>
          <span className="text-sm font-bold text-teal-700 dark:text-teal-400">{progressPct}%</span>
        </div>
        <div className="h-2.5 bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-teal-600 rounded-full transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        {completedCount > 0 && (
          <button
            onClick={onResetTrack}
            className="text-xs text-stone-500 hover:text-stone-600 mt-1 flex items-center gap-1"
          >
            <RotateCcw className="h-3 w-3" />
            {isEs ? "Reiniciar progreso" : "Reset progress"}
          </button>
        )}
      </div>

      {/* Levels */}
      <div className="space-y-6">
        {track.levels.map((level, levelIdx) => {
          const levelMeta = LEVEL_META.find((l) => l.id === level.level);
          const lessons = level.lessons || [];
          const previousLevelsComplete =
            levelIdx === 0 ||
            track.levels
              .slice(0, levelIdx)
              .every((prevLevel) =>
                (prevLevel.lessons || []).every((l) =>
                  trackProgress.completedLessons.includes(l.entryId)
                )
              );

          return (
            <div key={level.level}>
              <div className="flex items-center gap-2 mb-2">
                {levelMeta && (
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${levelMeta.color}`}>
                    {t(levelMeta, locale)}
                  </span>
                )}
                <h3 className="font-semibold text-stone-900 dark:text-stone-100 text-sm">
                  {t(level.label, locale)}
                </h3>
              </div>
              {level.overview && (
                <p className="text-xs text-stone-500 dark:text-stone-500 mb-3 ml-1">
                  {t(level.overview, locale)}
                </p>
              )}

              <div className="space-y-1.5 ml-1">
                {lessons.map((lesson, lessonIdx) => {
                  const entry = RESEARCH_ENTRIES.find((e) => e.id === lesson.entryId);
                  const isComplete = trackProgress.completedLessons.includes(lesson.entryId);
                  const isLocked = !previousLevelsComplete && levelIdx > 0;

                  return (
                    <button
                      key={lesson.entryId}
                      onClick={() => !isLocked && onStartLesson(levelIdx, lessonIdx)}
                      disabled={isLocked}
                      className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center gap-3 transition-colors ${
                        isLocked
                          ? "opacity-50 cursor-not-allowed bg-stone-50 dark:bg-stone-800/50"
                          : isComplete
                          ? "bg-teal-50 dark:bg-teal-900/20 hover:bg-teal-100 dark:hover:bg-teal-900/30"
                          : "bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700 border border-stone-200 dark:border-stone-700"
                      }`}
                    >
                      {isLocked ? (
                        <Lock className="h-4 w-4 text-stone-500 shrink-0" />
                      ) : isComplete ? (
                        <CheckCircle2 className="h-4 w-4 text-teal-600 dark:text-teal-400 shrink-0" />
                      ) : (
                        <Circle className="h-4 w-4 text-stone-300 dark:text-stone-600 shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-sm font-medium truncate ${
                            isComplete
                              ? "text-teal-800 dark:text-teal-300"
                              : "text-stone-700 dark:text-stone-200"
                          }`}
                        >
                          {entry ? t(entry.title, locale) : lesson.entryId}
                        </p>
                        <p className="text-xs text-stone-500 dark:text-stone-500">
                          {entry?.authors} ({entry?.year}) · {lesson.readingMinutes} min
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main SyllabusReader                                                */
/* ------------------------------------------------------------------ */

export function SyllabusReader({ tracks }: { tracks: CurriculumTrack[] }) {
  const locale = useLocale();
  const isEs = locale === "es";
  const [selectedTrackId, setSelectedTrackId] = useState<string | null>(null);
  const [activeLesson, setActiveLesson] = useState<{
    levelIdx: number;
    lessonIdx: number;
  } | null>(null);
  const [progress, setProgress] = useState<Progress>({});

  // Load progress from localStorage on mount
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProgress(loadProgress());
  }, []);

  const selectedTrack = useMemo(
    () => tracks.find((t) => t.id === selectedTrackId) || null,
    [tracks, selectedTrackId]
  );

  // Get current lesson + entry
  const currentLesson = useMemo(() => {
    if (!selectedTrack || !activeLesson) return null;
    const level = selectedTrack.levels[activeLesson.levelIdx];
    if (!level?.lessons) return null;
    return level.lessons[activeLesson.lessonIdx] || null;
  }, [selectedTrack, activeLesson]);

  const currentEntry = useMemo(() => {
    if (!currentLesson) return null;
    return RESEARCH_ENTRIES.find((e) => e.id === currentLesson.entryId) || null;
  }, [currentLesson]);

  // Flatten all lessons for navigation
  const allLessons = useMemo(() => {
    if (!selectedTrack) return [];
    const flat: { levelIdx: number; lessonIdx: number; lesson: SyllabusLesson }[] = [];
    selectedTrack.levels.forEach((level, li) => {
      (level.lessons || []).forEach((lesson, lsi) => {
        flat.push({ levelIdx: li, lessonIdx: lsi, lesson });
      });
    });
    return flat;
  }, [selectedTrack]);

  const currentFlatIdx = useMemo(() => {
    if (!activeLesson) return -1;
    return allLessons.findIndex(
      (l) => l.levelIdx === activeLesson.levelIdx && l.lessonIdx === activeLesson.lessonIdx
    );
  }, [allLessons, activeLesson]);

  const markComplete = useCallback(() => {
    if (!selectedTrack || !currentLesson) return;
    setProgress((prev) => {
      const next = { ...prev };
      const tp = next[selectedTrack.id] || {
        completedLessons: [],
        currentLevel: 0,
        currentLesson: 0,
      };
      if (!tp.completedLessons.includes(currentLesson.entryId)) {
        tp.completedLessons = [...tp.completedLessons, currentLesson.entryId];
      } else {
        tp.completedLessons = tp.completedLessons.filter((id) => id !== currentLesson.entryId);
      }
      next[selectedTrack.id] = tp;
      saveProgress(next);
      return next;
    });
  }, [selectedTrack, currentLesson]);

  const resetTrack = useCallback(() => {
    if (!selectedTrack) return;
    setProgress((prev) => {
      const next = { ...prev };
      next[selectedTrack.id] = { completedLessons: [], currentLevel: 0, currentLesson: 0 };
      saveProgress(next);
      return next;
    });
  }, [selectedTrack]);

  const goNext = useCallback(() => {
    if (currentFlatIdx < allLessons.length - 1) {
      const next = allLessons[currentFlatIdx + 1];
      setActiveLesson({ levelIdx: next.levelIdx, lessonIdx: next.lessonIdx });
      window.scrollTo(0, 0);
    }
  }, [currentFlatIdx, allLessons]);

  const goPrev = useCallback(() => {
    if (currentFlatIdx > 0) {
      const prev = allLessons[currentFlatIdx - 1];
      setActiveLesson({ levelIdx: prev.levelIdx, lessonIdx: prev.lessonIdx });
      window.scrollTo(0, 0);
    }
  }, [currentFlatIdx, allLessons]);

  // Track selector view
  if (!selectedTrackId) {
    return (
      <div className="space-y-4">
        {tracks.map((track) => {
          const audienceMeta = AUDIENCE_TRACKS.find((a) => a.id === track.audience);
          const tp = progress[track.id];
          const totalLessons = track.levels.reduce(
            (sum, l) => sum + (l.lessons?.length || l.entryIds.length),
            0
          );
          const completed = tp?.completedLessons?.length || 0;
          const pct = totalLessons > 0 ? Math.round((completed / totalLessons) * 100) : 0;

          return (
            <button
              key={track.id}
              onClick={() => setSelectedTrackId(track.id)}
              className="w-full text-left rounded-xl border-2 border-teal-200 dark:border-teal-700 bg-white dark:bg-stone-800 p-5 hover:shadow-lg hover:border-teal-400 dark:hover:border-teal-500 transition-all"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <GraduationCap className="h-5 w-5 text-teal-700 dark:text-teal-400" />
                    <h3 className="font-bold text-stone-900 dark:text-stone-100">
                      {t(track.name, locale)}
                    </h3>
                  </div>
                  <p className="text-sm text-stone-600 dark:text-stone-500 mb-2">
                    {t(track.description, locale)}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-stone-500 dark:text-stone-500">
                    <span>{totalLessons} {isEs ? "lecciones" : "lessons"}</span>
                    <span>·</span>
                    <span>{track.levels.length} {isEs ? "niveles" : "levels"}</span>
                    {audienceMeta && (
                      <>
                        <span>·</span>
                        <span>{t(audienceMeta, locale)}</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  {pct > 0 && (
                    <span className="text-lg font-bold text-teal-700 dark:text-teal-400">
                      {pct}%
                    </span>
                  )}
                  <ChevronRight className="h-5 w-5 text-stone-500 ml-auto mt-1" />
                </div>
              </div>
              {/* Mini progress bar */}
              {completed > 0 && (
                <div className="mt-3 h-1.5 bg-stone-100 dark:bg-stone-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-teal-500 rounded-full"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              )}
            </button>
          );
        })}
      </div>
    );
  }

  // Active lesson view
  if (selectedTrack && activeLesson && currentLesson && currentEntry) {
    const level = selectedTrack.levels[activeLesson.levelIdx];
    const levelMeta = LEVEL_META.find((l) => l.id === level.level);
    const tp = progress[selectedTrack.id];
    const isCompleted = tp?.completedLessons?.includes(currentLesson.entryId) || false;

    return (
      <div>
        {/* Breadcrumb */}
        <button
          onClick={() => setActiveLesson(null)}
          className="flex items-center gap-1 text-sm text-teal-700 dark:text-teal-400 hover:text-teal-900 mb-4"
        >
          <ChevronLeft className="h-4 w-4" />
          {t(selectedTrack.name, locale)}
        </button>

        <LessonView
          lesson={currentLesson}
          entry={currentEntry}
          locale={locale}
          lessonNumber={currentFlatIdx + 1}
          totalLessons={allLessons.length}
          levelLabel={levelMeta ? t(levelMeta, locale) : ""}
          isCompleted={isCompleted}
          onMarkComplete={markComplete}
          onNext={goNext}
          onPrev={goPrev}
          onClose={() => setActiveLesson(null)}
          hasPrev={currentFlatIdx > 0}
          hasNext={currentFlatIdx < allLessons.length - 1}
        />
      </div>
    );
  }

  // Track overview (selected track, no active lesson)
  if (selectedTrack) {
    return (
      <div>
        {/* Back to tracks */}
        <button
          onClick={() => setSelectedTrackId(null)}
          className="flex items-center gap-1 text-sm text-teal-700 dark:text-teal-400 hover:text-teal-900 mb-4"
        >
          <ChevronLeft className="h-4 w-4" />
          {isEs ? "Todos los currículos" : "All Tracks"}
        </button>

        <div className="flex items-center gap-2 mb-2">
          <GraduationCap className="h-6 w-6 text-teal-700 dark:text-teal-400" />
          <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">
            {t(selectedTrack.name, locale)}
          </h2>
        </div>
        <p className="text-sm text-stone-600 dark:text-stone-500 mb-6">
          {t(selectedTrack.description, locale)}
        </p>

        <TrackOverview
          track={selectedTrack}
          locale={locale}
          progress={progress}
          onStartLesson={(li, lsi) => {
            setActiveLesson({ levelIdx: li, lessonIdx: lsi });
            window.scrollTo(0, 0);
          }}
          onResetTrack={resetTrack}
        />
      </div>
    );
  }

  return null;
}
