"use client";

import { useState, useEffect, useRef } from "react";
import { TEMPLATES } from "@/lib/templates";

interface Props {
  brandName: string;
  businessType: string;
}

const STORAGE_KEY = "sellos_generating";

export default function TemplatePickerClient({ brandName, businessType }: Props) {
  const [selected, setSelected] = useState<string | null>(() => {
    const map: Record<string, string> = {
      "shop-online": "shop-online",
      "khoa-hoc": "coaching",
      "coaching": "coaching",
      "dich-vu": "coaching",
    };
    return map[businessType] ?? null;
  });
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [projectId, setProjectId] = useState<string | null>(null);
  const tickerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Resume state if already generating
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      const saved = JSON.parse(raw) as { projectId: string; templateId: string; projectName: string };
      setProjectId(saved.projectId);
      setLoading(true);
      setProgress(50);
    } catch { /* ignore */ }
  }, []);

  function startProgressTicker(from: number) {
    if (tickerRef.current) clearInterval(tickerRef.current);
    let p = from;
    tickerRef.current = setInterval(() => {
      p = Math.min(p + Math.random() * 1.8, 90);
      setProgress(p);
    }, 1200);
  }

  async function handleGenerate() {
    if (!selected || loading) return;
    setLoading(true);
    setProgress(5);
    startProgressTicker(5);

    const projectName = `${brandName} — Website`;

    const res = await fetch("/api/generate-website", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ templateId: selected, projectName }),
    });

    const { projectId: newProjectId } = await res.json();
    setProjectId(newProjectId);
    setProgress(15);

    // Save to localStorage — GenerationToast picks this up
    const genState = {
      projectId: newProjectId,
      templateId: selected,
      projectName,
      startedAt: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(genState));

    // Notify GenerationToast in the same tab
    window.dispatchEvent(new CustomEvent("sellos:gen-start", { detail: genState }));

    startProgressTicker(15);
  }

  const displayProgress = Math.round(progress);

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
          Bước 2 / 3
        </div>
        <h1 className="text-2xl font-heading font-bold text-slate-900 mb-2">Chọn giao diện cho website</h1>
        <p className="text-slate-500 text-sm">
          AI sẽ tạo nội dung cá nhân hóa cho <span className="font-semibold text-slate-700">{brandName}</span> dựa trên template bạn chọn.
        </p>
      </div>

      {/* Template grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        {TEMPLATES.map((tpl) => {
          const isSelected = selected === tpl.id;
          return (
            <button
              key={tpl.id}
              onClick={() => !loading && setSelected(tpl.id)}
              className={`relative text-left rounded-2xl border-2 overflow-hidden transition-all ${
                isSelected
                  ? "border-blue-500 shadow-lg shadow-blue-100 scale-[1.02]"
                  : "border-slate-200 hover:border-slate-300 hover:shadow-md"
              } ${loading ? "pointer-events-none opacity-80" : ""}`}
            >
              {/* Preview thumbnail */}
              <div className={`h-40 bg-gradient-to-br ${tpl.color} relative`}>
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6">
                  <div className="w-full bg-white/20 backdrop-blur-sm rounded-xl p-3 space-y-2">
                    <div className="h-2 bg-white/60 rounded-full w-3/4" />
                    <div className="h-1.5 bg-white/40 rounded-full w-full" />
                    <div className="h-1.5 bg-white/40 rounded-full w-5/6" />
                    <div className="flex gap-2 mt-2">
                      <div className="h-6 w-20 bg-white/80 rounded-lg" />
                      <div className="h-6 w-16 bg-white/30 rounded-lg" />
                    </div>
                  </div>
                  <div className="flex gap-2 w-full">
                    <div className="flex-1 h-12 bg-white/20 rounded-xl" />
                    <div className="flex-1 h-12 bg-white/20 rounded-xl" />
                    <div className="flex-1 h-12 bg-white/20 rounded-xl" />
                  </div>
                </div>

                {isSelected && (
                  <div className="absolute top-3 right-3 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}

                <a
                  href={tpl.previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="absolute bottom-3 right-3 text-[10px] font-semibold text-white/80 hover:text-white bg-black/20 hover:bg-black/30 px-2.5 py-1 rounded-full transition-colors"
                >
                  Xem demo →
                </a>
              </div>

              {/* Info */}
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <h3 className="font-heading font-bold text-slate-900 text-sm">{tpl.name}</h3>
                  {businessType && (
                    (tpl.id === "shop-online" && businessType === "shop-online") ||
                    (tpl.id === "coaching" && (businessType === "coaching" || businessType === "khoa-hoc" || businessType === "dich-vu")) ||
                    (tpl.id === "thuc-pham" && businessType === "thuc-pham")
                  ) ? (
                    <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full whitespace-nowrap">
                      Phù hợp
                    </span>
                  ) : null}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{tpl.description}</p>

                <div className="flex flex-wrap gap-1.5 mt-3">
                  {tpl.adminSections.filter(s => s.key !== "settings" && s.key !== "content").map((s) => (
                    <span key={s.key} className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                      {s.label}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* CTA */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <a href="/dashboard/thong-tin" className="text-sm text-slate-400 hover:text-slate-600 transition-colors">
          ← Quay lại chỉnh thông tin
        </a>

        <div className="flex flex-col items-end gap-2">
          {loading && (
            <p className="text-xs text-slate-400">
              Tiến trình chạy nền — bạn có thể di chuyển sang trang khác
            </p>
          )}

          {/* Progress bar under button */}
          {loading && (
            <div className="w-64 h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full transition-all duration-1000"
                style={{ width: `${displayProgress}%` }}
              />
            </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={!selected || loading}
            className="flex items-center gap-2.5 px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-semibold rounded-xl transition-all shadow-sm hover:shadow-md min-w-[200px] justify-center"
          >
            {loading ? (
              <>
                <svg className="w-4 h-4 animate-spin flex-shrink-0" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                {displayProgress > 0 ? `Đang tạo... ${displayProgress}%` : "Đang khởi tạo..."}
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Tạo website với AI
              </>
            )}
          </button>

          {loading && projectId && (
            <a
              href={`/dashboard/du-an`}
              className="text-xs text-blue-600 hover:text-blue-700 underline underline-offset-2"
            >
              Đến trang dự án →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
