"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Check, Sparkles, ArrowLeft, Loader2, ExternalLink } from "lucide-react";
import { TEMPLATES } from "@/lib/templates";
import PageHeader from "@/components/dashboard/PageHeader";

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
    <div>
      <PageHeader
        crumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Tạo website mới" },
        ]}
        title="Chọn mẫu cho website của bạn"
        description={
          <>
            AI sẽ dựng nội dung cá nhân hoá cho{" "}
            <strong className="text-slate-900">{brandName}</strong> dựa trên mẫu bạn chọn.
          </>
        }
        actions={
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            Bước 2 / 3
          </span>
        }
      />


      {/* Template grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        {TEMPLATES.map((tpl) => {
          const isSelected = selected === tpl.id;
          const isMatch =
            (tpl.id === businessType) ||
            (tpl.id === "shop-online" && businessType === "shop-online") ||
            (tpl.id === "coaching" && (businessType === "coaching" || businessType === "khoa-hoc" || businessType === "dich-vu")) ||
            (tpl.id === "thuc-pham" && businessType === "thuc-pham");
          return (
            <button
              key={tpl.id}
              onClick={() => !loading && setSelected(tpl.id)}
              className={`group relative text-left rounded-2xl border-2 overflow-hidden transition-all bg-white ${
                isSelected
                  ? "border-blue-500 shadow-xl shadow-blue-200/40 ring-2 ring-blue-500/10"
                  : "border-slate-200 hover:border-slate-300 hover:shadow-md hover:-translate-y-0.5"
              } ${loading ? "pointer-events-none opacity-60" : ""}`}
            >
              {/* Preview thumbnail with iframe */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <iframe
                  src={tpl.previewUrl}
                  title={`${tpl.name} preview`}
                  className="absolute top-0 left-0 border-0 pointer-events-none"
                  style={{
                    width: "1280px",
                    height: "720px",
                    transform: "scale(0.34)",
                    transformOrigin: "top left",
                  }}
                  scrolling="no"
                  loading="lazy"
                  tabIndex={-1}
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/5 transition-colors" />

                {/* Selected check */}
                {isSelected && (
                  <div className="absolute top-3 right-3 w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center shadow-md">
                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                  </div>
                )}

                {/* Match badge */}
                {isMatch && !isSelected && (
                  <span className="absolute top-3 left-3 inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-full shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Phù hợp với bạn
                  </span>
                )}

                {/* Demo link */}
                <a
                  href={tpl.previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="absolute bottom-3 right-3 inline-flex items-center gap-1 text-[11px] font-semibold text-white bg-slate-900/80 hover:bg-slate-900 backdrop-blur-sm px-2.5 py-1.5 rounded-full transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  Xem demo
                </a>
              </div>

              {/* Info */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-heading font-bold text-slate-900 text-base">{tpl.name}</h3>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed mb-3 line-clamp-2">
                  {tpl.description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {tpl.adminSections
                    .filter((s) => s.key !== "settings" && s.key !== "content")
                    .map((s) => (
                      <span
                        key={s.key}
                        className="text-[10px] font-medium text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full"
                      >
                        {s.label}
                      </span>
                    ))}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* CTA bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sticky bottom-4 shadow-xl shadow-slate-900/5">
        <Link
          href="/dashboard/thong-tin"
          className="inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900 font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Quay lại chỉnh thông tin
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
          {loading && (
            <div className="flex flex-col gap-1.5 min-w-[200px]">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Đang tạo website...</span>
                <span className="font-bold text-blue-600 tabular-nums">{displayProgress}%</span>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-700"
                  style={{ width: `${displayProgress}%` }}
                />
              </div>
            </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={!selected || loading}
            className="inline-flex items-center justify-center gap-2 px-7 h-12 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-blue-600/20 hover:shadow-lg min-w-[200px]"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {displayProgress > 0 ? `Đang tạo...` : "Đang khởi tạo..."}
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Tạo website với AI
              </>
            )}
          </button>
        </div>
      </div>

      {loading && projectId && (
        <p className="text-center text-sm text-slate-500 mt-4">
          Tiến trình chạy nền — bạn có thể{" "}
          <Link
            href="/dashboard/du-an"
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            đến trang dự án →
          </Link>
        </p>
      )}
    </div>
  );
}
