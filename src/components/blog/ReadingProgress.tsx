"use client";
import { useState, useEffect } from "react";

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-transparent print:hidden">
      <div
        className="h-full bg-teal-600 transition-[width] duration-100"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
