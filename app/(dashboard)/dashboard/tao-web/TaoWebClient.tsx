"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getTemplate } from "@/lib/templates";

const STEPS = [
  { event: "start",    label: "Khởi tạo project",             progress: 5 },
  { event: "progress", label: "AI đang viết nội dung...",      progress: 60 },
  { event: "parsing",  label: "Xử lý và cấu trúc dữ liệu",    progress: 92 },
  { event: "saving",   label: "Lưu vào cơ sở dữ liệu",        progress: 95 },
  { event: "done",     label: "Website đã sẵn sàng!",          progress: 100 },
];

export default function TaoWebClient() {
  const router = useRouter();
  const params = useSearchParams();
  const projectId = params.get("projectId");
  const templateId = params.get("templateId");
  const tpl = templateId ? getTemplate(templateId) : null;

  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  // token stream reserved for future use
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const started = useRef(false);

  useEffect(() => {
    if (!projectId || started.current) return;
    started.current = true;

    // Actually use fetch + ReadableStream since we already kicked off generation
    // The projectId was created by the POST — now we just need to read the response
    // But we already returned the stream in POST. So instead, we poll for project status.
    pollProject();

    return;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  async function pollProject() {
    // Simulate progressive steps while polling DB for completion
    const stepDurations = [300, 800, 1200, 1800, 2500, 3200];
    for (let i = 0; i < STEPS.length - 1; i++) {
      await delay(stepDurations[i] ?? 1000);
      setCurrentStep(i + 1);
      setProgress(STEPS[i + 1].progress - 5);
    }

    // Poll until project status = active
    let attempts = 0;
    while (attempts < 60) {
      await delay(2000);
      attempts++;
      try {
        const res = await fetch(`/api/projects/${projectId}`);
        const { project } = await res.json();
        if (project?.status === "active" && project?.generated_content) {
          setProgress(100);
          setCurrentStep(STEPS.length - 1);
          setDone(true);
          await delay(1200);
          router.push(`/dashboard/du-an/${projectId}`);
          return;
        }
      } catch { /* keep polling */ }
    }
    setError("Quá thời gian chờ. Vui lòng thử lại.");
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
        <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center">
          <svg className="w-7 h-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="text-center">
          <p className="font-semibold text-slate-900 mb-1">Có lỗi xảy ra</p>
          <p className="text-sm text-slate-500">{error}</p>
        </div>
        <button
          onClick={() => router.push("/dashboard/chon-template")}
          className="px-6 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl"
        >
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <div className="w-full max-w-md">
        {/* Icon */}
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg transition-all duration-500 ${
          done
            ? "bg-emerald-500 shadow-emerald-100"
            : `bg-gradient-to-br ${tpl?.color ?? "from-blue-500 to-indigo-600"} shadow-blue-100`
        }`}>
          {done ? (
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-8 h-8 text-white animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          )}
        </div>

        {/* Title */}
        <h1 className="text-xl font-heading font-bold text-slate-900 text-center mb-1">
          {done ? "Website đã sẵn sàng! 🎉" : "AI đang tạo website của bạn"}
        </h1>
        <p className="text-sm text-slate-400 text-center mb-8">
          {done
            ? "Đang chuyển đến trang quản lý..."
            : `Đang cá nhân hóa cho template ${tpl?.name ?? ""}...`}
        </p>

        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-slate-400 mb-2">
            <span>{STEPS[currentStep]?.label}</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-3">
          {STEPS.map((step, i) => {
            const isDone = i < currentStep;
            const isActive = i === currentStep;
            return (
              <div key={step.event} className={`flex items-center gap-3 transition-all duration-300 ${
                isActive ? "opacity-100" : isDone ? "opacity-60" : "opacity-30"
              }`}>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                  isDone ? "bg-emerald-100" : isActive ? "bg-blue-100" : "bg-slate-100"
                }`}>
                  {isDone ? (
                    <svg className="w-3 h-3 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : isActive ? (
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-slate-300" />
                  )}
                </div>
                <span className={`text-sm ${isActive ? "text-slate-900 font-medium" : "text-slate-500"}`}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Fun facts while waiting */}
        {!done && (
          <div className="mt-8 p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <p className="text-xs text-slate-400 text-center">
              💡 AI đang phân tích thông tin doanh nghiệp và viết copy phù hợp với thị trường Việt Nam...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
