"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";

interface GenState {
  projectId: string;
  templateId: string;
  projectName: string;
  startedAt: number;
}

const STORAGE_KEY = "sellos_generating";

export default function GenerationToast() {
  const [state, setState] = useState<GenState | null>(null);
  const [progress, setProgress] = useState(15);
  const [done, setDone] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const tickerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pollerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function clearTimers() {
    if (tickerRef.current) clearInterval(tickerRef.current);
    if (pollerRef.current) clearInterval(pollerRef.current);
  }

  const markDone = useCallback(() => {
    clearTimers();
    setProgress(100);
    setDone(true);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const checkStatus = useCallback(async (id: string) => {
    try {
      const res = await fetch(`/api/projects/${id}`);
      if (!res.ok) return;
      const data = await res.json();
      const project = data.project ?? data;
      if (project?.status === "active" && project?.generated_content) {
        markDone();
      }
    } catch { /* ignore network errors */ }
  }, [markDone]);

  function startTracking(gen: GenState, initialProgress = 15) {
    clearTimers();
    setProgress(initialProgress);
    setDone(false);
    setDismissed(false);

    // Slowly tick progress 15 → 90 over ~2 minutes
    let p = initialProgress;
    tickerRef.current = setInterval(() => {
      p = Math.min(p + Math.random() * 1.5, 90);
      setProgress(p);
    }, 1500);

    // Poll project status every 4 seconds
    pollerRef.current = setInterval(() => {
      checkStatus(gen.projectId);
    }, 4000);

    // Also check immediately after a short delay
    setTimeout(() => checkStatus(gen.projectId), 3000);
  }

  // Mount: read localStorage for any in-progress generation
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      const gen = JSON.parse(raw) as GenState;
      setState(gen);
      startTracking(gen, 20);
    } catch { /* ignore */ }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Listen for same-tab dispatch from TemplatePickerClient
  useEffect(() => {
    function onGenStart(e: Event) {
      const gen = (e as CustomEvent<GenState>).detail;
      setState(gen);
      startTracking(gen, 15);
    }
    window.addEventListener("sellos:gen-start", onGenStart);
    return () => window.removeEventListener("sellos:gen-start", onGenStart);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Listen for cross-tab localStorage updates
  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key !== STORAGE_KEY) return;
      if (!e.newValue) {
        setState(null);
        clearTimers();
        return;
      }
      try {
        const gen = JSON.parse(e.newValue) as GenState;
        setState(gen);
        startTracking(gen, 15);
      } catch { /* ignore */ }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => clearTimers();
  }, []);

  if (!state || dismissed) return null;

  const displayProgress = Math.round(progress);

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
      {/* Progress bar */}
      <div className="h-1 bg-slate-100">
        <div
          className={`h-full transition-all duration-1000 ease-out ${done ? "bg-emerald-500" : "bg-blue-500"}`}
          style={{ width: `${displayProgress}%` }}
        />
      </div>

      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center ${done ? "bg-emerald-50" : "bg-blue-50"}`}>
            {done ? (
              <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-blue-600 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {done ? (
              <>
                <p className="text-sm font-semibold text-emerald-700 leading-snug">Website đã sẵn sàng!</p>
                <p className="text-xs text-slate-500 truncate mt-0.5">{state.projectName}</p>
              </>
            ) : (
              <>
                <p className="text-sm font-semibold text-slate-800 leading-snug">
                  AI đang tạo website <span className="text-blue-600">{displayProgress}%</span>
                </p>
                <p className="text-xs text-slate-500 truncate mt-0.5">{state.projectName}</p>
              </>
            )}
          </div>

          {/* Dismiss */}
          <button
            onClick={() => setDismissed(true)}
            className="flex-shrink-0 text-slate-300 hover:text-slate-500 transition-colors p-0.5"
            aria-label="Đóng"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {done && (
          <Link
            href={`/dashboard/du-an/${state.projectId}`}
            className="mt-3 flex items-center justify-center gap-1.5 w-full py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl transition-colors"
          >
            Xem dự án ngay
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        )}
      </div>
    </div>
  );
}
