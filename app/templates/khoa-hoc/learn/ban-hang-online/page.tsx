"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const MODULES = [
  {
    title: "Module 1: Tìm Sản Phẩm & Định Vị",
    lessons: [
      { id: "1-1", title: "Xác định nhu cầu thị trường", duration: "14:32", done: true },
      { id: "1-2", title: "Checklist chọn sản phẩm", duration: "18:45", done: true },
      { id: "1-3", title: "Định vị USP của bạn", duration: "22:10", done: false, active: true },
      { id: "1-4", title: "Xây dựng avatar khách hàng", duration: "16:20", done: false },
    ],
  },
  {
    title: "Module 2: Xây Landing Page Bằng AI",
    lessons: [
      { id: "2-1", title: "Giới thiệu SellOS AI builder", duration: "10:15", done: false },
      { id: "2-2", title: "Cấu trúc 8 sections chuyển đổi cao", duration: "28:30", done: false },
      { id: "2-3", title: "Viết headline bằng AI", duration: "19:45", done: false },
      { id: "2-4", title: "Tích hợp thanh toán & pixel", duration: "24:00", done: false },
      { id: "2-5", title: "Deploy & kiểm tra live", duration: "12:30", done: false },
    ],
  },
  {
    title: "Module 3: Chatbot & Email Tự Động",
    lessons: [
      { id: "3-1", title: "Thiết lập chatbot tư vấn", duration: "20:15", done: false },
      { id: "3-2", title: "Train chatbot theo sản phẩm", duration: "25:40", done: false },
      { id: "3-3", title: "Chuỗi email welcome + nurture", duration: "22:55", done: false },
      { id: "3-4", title: "Automation flows không cần tay", duration: "18:30", done: false },
    ],
  },
  {
    title: "Module 4: Traffic & Tối Ưu",
    lessons: [
      { id: "4-1", title: "Facebook Ads cơ bản", duration: "31:20", done: false },
      { id: "4-2", title: "TikTok Ads & organic content", duration: "27:10", done: false },
      { id: "4-3", title: "Đọc số liệu & A/B test", duration: "19:45", done: false },
    ],
  },
];

const ACTIVE_LESSON = { module: 1, lesson: "1-3", title: "Định Vị USP Của Bạn" };
const TOTAL_LESSONS = MODULES.reduce((acc, m) => acc + m.lessons.length, 0);
const DONE_LESSONS = MODULES.reduce(
  (acc, m) => acc + m.lessons.filter((l) => l.done).length,
  0
);
const PROGRESS = Math.round((DONE_LESSONS / TOTAL_LESSONS) * 100);

export default function LearnPage() {
  const [openModules, setOpenModules] = useState<number[]>([0, 1]);
  const [activeTab, setActiveTab] = useState<"overview" | "notes" | "qa">("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleModule = (i: number) => {
    setOpenModules((prev) =>
      prev.includes(i) ? prev.filter((m) => m !== i) : [...prev, i]
    );
  };

  return (
    <div className="h-screen flex flex-col bg-slate-950 overflow-hidden">
      {/* Top navbar */}
      <header className="h-14 bg-slate-900 border-b border-slate-800 flex items-center px-4 gap-4 flex-shrink-0 z-20">
        <Link
          href="/templates/khoa-hoc"
          className="flex items-center gap-2 flex-shrink-0"
        >
          <span className="text-lg">📚</span>
          <span className="font-heading font-bold text-white text-base hidden sm:block">
            SellOS<span className="text-blue-400">Academy</span>
          </span>
        </Link>

        <span className="text-slate-700 hidden sm:block">|</span>

        <h1 className="text-slate-200 text-sm font-medium truncate flex-1 hidden sm:block">
          Bán Hàng Online Từ 0 Đến Đơn Đầu Tiên
        </h1>

        {/* Progress bar */}
        <div className="hidden md:flex items-center gap-3">
          <div className="w-32 h-1.5 bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full transition-all"
              style={{ width: `${PROGRESS}%` }}
            />
          </div>
          <span className="text-slate-400 text-xs whitespace-nowrap">
            {DONE_LESSONS}/{TOTAL_LESSONS} bài · {PROGRESS}%
          </span>
        </div>

        <div className="flex items-center gap-2 ml-auto flex-shrink-0">
          <button
            onClick={() => setSidebarOpen((v) => !v)}
            className="text-slate-400 hover:text-white text-xs flex items-center gap-1 px-2 py-1 rounded border border-slate-700 hover:border-slate-500 transition-colors"
          >
            <span>☰</span>
            <span className="hidden sm:inline">Nội dung</span>
          </button>
          <Link
            href="/templates/khoa-hoc/dashboard"
            className="text-xs text-slate-400 hover:text-white transition-colors px-2"
          >
            Dashboard
          </Link>
        </div>
      </header>

      {/* Main area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Video + content area */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          {/* Video player */}
          <div className="bg-black flex-shrink-0 relative" style={{ aspectRatio: "16/9", maxHeight: "55vh" }}>
            {/* Fake video player */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white space-y-4">
              <div className="text-6xl opacity-20">📹</div>
              <p className="text-slate-400 text-sm">Bài 1.3 — {ACTIVE_LESSON.title}</p>
              {/* Play button */}
              <button className="w-16 h-16 rounded-full bg-blue-600/80 hover:bg-blue-600 flex items-center justify-center transition-colors">
                <span className="text-2xl ml-1">▶</span>
              </button>
            </div>

            {/* Video controls bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-4 pb-3 pt-8">
              <div className="h-1 bg-white/20 rounded-full overflow-hidden mb-3 cursor-pointer">
                <div className="h-full bg-blue-500 w-[35%] rounded-full" />
              </div>
              <div className="flex items-center gap-3 text-white text-xs">
                <button className="hover:text-blue-400 transition-colors text-base">▶</button>
                <span className="text-slate-300">7:44 / 22:10</span>
                <div className="flex-1" />
                <button className="hover:text-blue-400 transition-colors">1x</button>
                <button className="hover:text-blue-400 transition-colors text-sm">⛶</button>
              </div>
            </div>
          </div>

          {/* Lesson info & tabs */}
          <div className="bg-white flex-1 p-5 md:p-8">
            {/* Lesson title */}
            <div className="flex items-start justify-between gap-4 mb-5">
              <div>
                <p className="text-slate-400 text-xs mb-1">Module 1 · Bài 3</p>
                <h2 className="font-heading font-bold text-slate-900 text-xl">
                  {ACTIVE_LESSON.title}
                </h2>
              </div>
              <button className="flex-shrink-0 flex items-center gap-2 border border-slate-200 text-slate-600 text-sm px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors">
                <span className="text-green-500">✓</span> Đánh dấu hoàn thành
              </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 border-b border-slate-200 mb-6">
              {(["overview", "notes", "qa"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px",
                    activeTab === tab
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-slate-500 hover:text-slate-900"
                  )}
                >
                  {tab === "overview" ? "Tổng quan" : tab === "notes" ? "Ghi chú" : "Hỏi & Đáp"}
                </button>
              ))}
            </div>

            {/* Tab content */}
            {activeTab === "overview" && (
              <div className="space-y-4 text-slate-600 text-sm leading-relaxed max-w-2xl">
                <p>
                  Trong bài học này, bạn sẽ học cách xác định và viết rõ USP (Unique Selling Proposition)
                  — lý do tại sao khách hàng nên chọn bạn thay vì đối thủ. Đây là nền tảng quan trọng
                  nhất trước khi xây dựng bất kỳ nội dung marketing nào.
                </p>
                <p>
                  Bạn sẽ áp dụng framework <strong className="text-slate-800">3C: Customer, Competitor, Company</strong> để
                  tìm ra điểm khác biệt thật sự của mình, và cách diễn đạt nó thành 1 câu dễ nhớ, dễ share.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <p className="font-semibold text-blue-900 mb-2">📎 Tài liệu bài học</p>
                  <ul className="space-y-1">
                    <li>
                      <a href="#" className="text-blue-600 hover:underline flex items-center gap-2">
                        <span>📄</span> Template USP Canvas (PDF)
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-blue-600 hover:underline flex items-center gap-2">
                        <span>📊</span> Bảng phân tích đối thủ cạnh tranh (Google Sheets)
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            )}
            {activeTab === "notes" && (
              <div>
                <textarea
                  className="w-full h-40 border border-slate-200 rounded-xl p-4 text-sm text-slate-700 focus:outline-none focus:border-blue-300 resize-none"
                  placeholder="Ghi chú của bạn cho bài này..."
                />
                <button className="mt-2 text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Lưu ghi chú
                </button>
              </div>
            )}
            {activeTab === "qa" && (
              <div className="space-y-4">
                <div className="border border-slate-200 rounded-xl p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">HN</div>
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">Hoàng Nam</p>
                      <p className="text-slate-600 text-sm mt-0.5">Nếu mình bán 2-3 sản phẩm khác nhau thì có cần viết USP riêng cho từng cái không?</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 ml-8">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">GV</div>
                    <div className="bg-blue-50 rounded-xl p-3">
                      <p className="font-semibold text-blue-900 text-sm">Nguyễn Thành Nam (Giảng viên)</p>
                      <p className="text-blue-800 text-sm mt-0.5">Đúng vậy! Mỗi sản phẩm nên có USP riêng vì khách hàng mục tiêu và vấn đề cần giải quyết thường khác nhau...</p>
                    </div>
                  </div>
                </div>
                <textarea
                  className="w-full h-24 border border-slate-200 rounded-xl p-4 text-sm text-slate-700 focus:outline-none focus:border-blue-300 resize-none"
                  placeholder="Đặt câu hỏi của bạn..."
                />
                <button className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Gửi câu hỏi
                </button>
              </div>
            )}

            {/* Prev / Next navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
              <button className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors">
                ← <span>Bài trước: Checklist chọn sản phẩm</span>
              </button>
              <Link
                href="/templates/khoa-hoc/learn/ban-hang-online"
                className="flex items-center gap-2 text-sm bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-semibold transition-colors"
              >
                Bài tiếp theo →
              </Link>
            </div>
          </div>
        </div>

        {/* Lesson sidebar */}
        {sidebarOpen && (
          <aside className="w-80 xl:w-96 bg-white border-l border-slate-200 flex flex-col overflow-hidden flex-shrink-0 hidden md:flex">
            {/* Sidebar header */}
            <div className="px-4 py-3 border-b border-slate-200 bg-slate-50">
              <p className="font-heading font-semibold text-slate-900 text-sm">Nội Dung Khóa Học</p>
              <p className="text-slate-400 text-xs mt-0.5">
                {DONE_LESSONS}/{TOTAL_LESSONS} bài đã hoàn thành ({PROGRESS}%)
              </p>
              <div className="h-1 bg-slate-200 rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${PROGRESS}%` }} />
              </div>
            </div>

            {/* Lesson list */}
            <div className="flex-1 overflow-y-auto">
              {MODULES.map((mod, mi) => (
                <div key={mi} className="border-b border-slate-100">
                  {/* Module header */}
                  <button
                    onClick={() => toggleModule(mi)}
                    className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
                  >
                    <div className="flex-1 min-w-0 pr-2">
                      <p className="font-heading font-semibold text-slate-800 text-xs leading-snug">
                        {mod.title}
                      </p>
                      <p className="text-slate-400 text-[11px] mt-0.5">
                        {mod.lessons.length} bài ·{" "}
                        {mod.lessons.filter((l) => l.done).length}/{mod.lessons.length} hoàn thành
                      </p>
                    </div>
                    <span className="text-slate-400 text-xs flex-shrink-0">
                      {openModules.includes(mi) ? "▼" : "▶"}
                    </span>
                  </button>

                  {/* Lessons */}
                  {openModules.includes(mi) && (
                    <ul>
                      {mod.lessons.map((lesson) => (
                        <li key={lesson.id}>
                          <button
                            className={cn(
                              "w-full flex items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-slate-50",
                              lesson.active ? "bg-blue-50 border-l-2 border-blue-600" : ""
                            )}
                          >
                            {/* Status icon */}
                            <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px]"
                              style={{
                                background: lesson.done ? "#22c55e" : lesson.active ? "#3b82f6" : "#e2e8f0",
                                color: lesson.done || lesson.active ? "white" : "#94a3b8",
                              }}
                            >
                              {lesson.done ? "✓" : lesson.active ? "▶" : "○"}
                            </span>
                            <div className="flex-1 min-w-0">
                              <p className={cn(
                                "text-xs leading-snug",
                                lesson.active ? "font-semibold text-blue-700" : lesson.done ? "text-slate-500" : "text-slate-700"
                              )}>
                                {lesson.title}
                              </p>
                              <p className="text-[10px] text-slate-400 mt-0.5">{lesson.duration}</p>
                            </div>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
