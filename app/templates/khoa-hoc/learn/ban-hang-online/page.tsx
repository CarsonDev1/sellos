"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const MODULES = [
  {
    title: "Module 1: Tìm Sản Phẩm & Định Vị",
    duration: "1 giờ 12 phút",
    lessons: [
      { id: "1-1", title: "Xác định nhu cầu thị trường", duration: "14:32", done: true },
      { id: "1-2", title: "Checklist 10 tiêu chí chọn sản phẩm", duration: "18:45", done: true },
      { id: "1-3", title: "Định vị USP của bạn", duration: "22:10", done: false, active: true },
      { id: "1-4", title: "Xây dựng avatar khách hàng (ICP)", duration: "16:20", done: false },
    ],
  },
  {
    title: "Module 2: Xây Landing Page Bằng AI",
    duration: "1 giờ 35 phút",
    lessons: [
      { id: "2-1", title: "Giới thiệu SellOS AI Builder", duration: "10:15", done: false },
      { id: "2-2", title: "Cấu trúc 8 sections chuyển đổi cao", duration: "28:30", done: false },
      { id: "2-3", title: "Viết headline & copy bằng AI", duration: "19:45", done: false },
      { id: "2-4", title: "Tích hợp thanh toán & pixel tracking", duration: "24:00", done: false },
      { id: "2-5", title: "Deploy live & kiểm tra trước khi chạy", duration: "12:30", done: false },
    ],
  },
  {
    title: "Module 3: Chatbot & Email Automation",
    duration: "1 giờ 27 phút",
    lessons: [
      { id: "3-1", title: "Thiết lập chatbot tư vấn trên web", duration: "20:15", done: false },
      { id: "3-2", title: "Train chatbot theo sản phẩm của bạn", duration: "25:40", done: false },
      { id: "3-3", title: "Chuỗi email welcome + nurture + upsell", duration: "22:55", done: false },
      { id: "3-4", title: "Automation flows không cần tay", duration: "18:30", done: false },
    ],
  },
  {
    title: "Module 4: Traffic & Tối Ưu Doanh Thu",
    duration: "1 giờ 18 phút",
    lessons: [
      { id: "4-1", title: "Facebook Ads cơ bản — ngân sách thấp", duration: "31:20", done: false },
      { id: "4-2", title: "TikTok Ads & nội dung organic", duration: "27:10", done: false },
      { id: "4-3", title: "Đọc số liệu, A/B test & nhân rộng", duration: "19:45", done: false },
    ],
  },
];

const TOTAL_LESSONS = MODULES.reduce((acc, m) => acc + m.lessons.length, 0);
const DONE_LESSONS = MODULES.reduce((acc, m) => acc + m.lessons.filter((l) => l.done).length, 0);
const PROGRESS = Math.round((DONE_LESSONS / TOTAL_LESSONS) * 100);

export default function LearnPage() {
  const [openModules, setOpenModules] = useState<number[]>([0, 1]);
  const [activeTab, setActiveTab] = useState<"overview" | "notes" | "qa">("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [noteText, setNoteText] = useState("");

  const toggleModule = (i: number) =>
    setOpenModules((prev) => prev.includes(i) ? prev.filter((m) => m !== i) : [...prev, i]);

  return (
    <div className="h-screen flex flex-col bg-slate-950 overflow-hidden select-none">
      {/* Top navbar */}
      <header className="h-14 bg-slate-900 border-b border-slate-800 flex items-center px-4 gap-3 flex-shrink-0 z-20">
        <Link href="/templates/khoa-hoc" className="flex items-center gap-2 flex-shrink-0 group">
          <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
              <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838l-2.727 1.17 1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
              </svg>
            </div>
          <span className="font-heading font-bold text-white text-sm hidden sm:block group-hover:text-blue-300 transition-colors">
            SellOS<span className="text-blue-400">Academy</span>
          </span>
        </Link>

        <div className="text-slate-700 hidden sm:block">|</div>

        <p className="text-slate-300 text-xs sm:text-sm font-medium truncate flex-1 hidden sm:block">
          Bán Hàng Online Từ 0 Đến Đơn Đầu Tiên
        </p>

        {/* Progress */}
        <div className="hidden md:flex items-center gap-3 flex-shrink-0">
          <span className="text-slate-500 text-xs">Tiến độ</span>
          <div className="w-32 h-1.5 bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${PROGRESS}%` }} />
          </div>
          <span className="text-slate-400 text-xs font-medium">{DONE_LESSONS}/{TOTAL_LESSONS}</span>
        </div>

        <div className="flex items-center gap-1.5 ml-auto flex-shrink-0">
          <button
            onClick={() => setSidebarOpen((v) => !v)}
            className={cn(
              "flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-colors",
              sidebarOpen
                ? "border-blue-500/50 bg-blue-500/10 text-blue-300"
                : "border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200"
            )}
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
            </svg>
            <span className="hidden sm:inline">Nội dung</span>
          </button>
          <Link
            href="/templates/khoa-hoc/dashboard"
            className="text-xs text-slate-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-slate-800"
          >
            Dashboard
          </Link>
        </div>
      </header>

      {/* Main */}
      <div className="flex flex-1 overflow-hidden">
        {/* Video + content */}
        <div className="flex-1 flex flex-col overflow-y-auto bg-white">
          {/* Video player */}
          <div className="bg-black w-full flex-shrink-0" style={{ aspectRatio: "16/9", maxHeight: "58vh" }}>
            <div className="h-full flex flex-col relative">
              {/* Video area */}
              <div className="flex-1 flex flex-col items-center justify-center text-white relative">
                {/* Fake thumbnail */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                  <div className="text-center space-y-3">
                    <div className="w-20 h-20 rounded-full bg-slate-700/50 flex items-center justify-center mx-auto">
                      <span className="text-4xl opacity-40">📹</span>
                    </div>
                    <p className="text-slate-500 text-sm">Bài 1.3 — Định Vị USP Của Bạn</p>
                  </div>
                </div>
                {/* Play button overlay */}
                <button className="relative z-10 w-16 h-16 rounded-full bg-white/15 hover:bg-white/25 border border-white/30 flex items-center justify-center transition-all backdrop-blur-sm group">
                  <svg className="w-7 h-7 text-white ml-1 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                </button>
              </div>

              {/* Controls */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent px-4 pb-3 pt-12">
                {/* Progress scrubber */}
                <div className="relative h-1 bg-white/20 rounded-full mb-3 cursor-pointer group">
                  <div className="h-full bg-blue-500 rounded-full w-[35%]" />
                  <div className="absolute left-[35%] top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="flex items-center gap-3 text-white">
                  <button className="hover:text-blue-300 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </button>
                  <span className="text-slate-300 text-xs font-mono">7:44 / 22:10</span>
                  <button className="text-slate-300 hover:text-white text-xs ml-1">🔊</button>
                  <div className="flex-1" />
                  <button className="text-slate-300 hover:text-white text-xs border border-white/20 px-2 py-0.5 rounded">1×</button>
                  <button className="text-slate-300 hover:text-white text-xs border border-white/20 px-2 py-0.5 rounded">CC</button>
                  <button className="text-slate-300 hover:text-white">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Lesson content */}
          <div className="flex-1 bg-white">
            {/* Lesson header */}
            <div className="border-b border-slate-100 px-6 py-5 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs bg-blue-50 text-blue-600 font-semibold px-2.5 py-0.5 rounded-full border border-blue-200">Module 1 · Bài 3</span>
                  <span className="text-slate-400 text-xs">22:10</span>
                </div>
                <h2 className="font-heading font-bold text-slate-900 text-xl">Định Vị USP Của Bạn</h2>
              </div>
              <button className="flex-shrink-0 flex items-center gap-2 border border-slate-200 hover:border-green-400 hover:bg-green-50 text-slate-600 hover:text-green-700 text-sm px-4 py-2 rounded-xl transition-all font-medium">
                <span className="text-green-500">✓</span>
                <span className="hidden sm:inline">Đánh dấu hoàn thành</span>
              </button>
            </div>

            {/* Tabs */}
            <div className="border-b border-slate-200 px-6">
              <div className="flex gap-0">
                {[
                  { id: "overview", label: "Tổng quan" },
                  { id: "notes", label: "Ghi chú" },
                  { id: "qa", label: "Hỏi & Đáp" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as "overview" | "notes" | "qa")}
                    className={cn(
                      "px-5 py-3.5 text-sm font-semibold border-b-2 -mb-px transition-colors",
                      activeTab === tab.id
                        ? "border-blue-600 text-blue-600"
                        : "border-transparent text-slate-500 hover:text-slate-800"
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab content */}
            <div className="p-6 max-w-3xl">
              {activeTab === "overview" && (
                <div className="space-y-5 text-slate-700 text-sm leading-relaxed">
                  <p>Trong bài học này, bạn sẽ học cách xác định và viết rõ <strong className="text-slate-900">USP (Unique Selling Proposition)</strong> — lý do tại sao khách hàng nên chọn bạn thay vì đối thủ.</p>
                  <p>Áp dụng framework <strong className="text-slate-900">3C: Customer · Competitor · Company</strong> để tìm điểm khác biệt thật sự và diễn đạt thành 1 câu dễ nhớ, dễ share.</p>
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 space-y-3">
                    <p className="font-heading font-semibold text-blue-900 flex items-center gap-2">
                      <span>📎</span> Tài liệu bài học
                    </p>
                    {[
                      { icon: "📄", name: "Template USP Canvas (PDF)", size: "1.2 MB" },
                      { icon: "📊", name: "Bảng phân tích đối thủ (Google Sheets)", size: "Mở online" },
                      { icon: "🎯", name: "Checklist 10 câu hỏi định vị thương hiệu", size: "380 KB" },
                    ].map((f, i) => (
                      <a key={i} href="#" className="flex items-center gap-3 text-blue-700 hover:text-blue-900 hover:bg-blue-100 p-2 rounded-lg transition-colors -mx-2">
                        <span className="text-lg">{f.icon}</span>
                        <span className="flex-1 text-sm font-medium">{f.name}</span>
                        <span className="text-blue-400 text-xs">{f.size}</span>
                        <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </a>
                    ))}
                  </div>
                  <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
                    <p className="font-semibold text-slate-900 text-sm mb-2">🏋️ Bài tập thực hành</p>
                    <p className="text-slate-600 text-sm">Dùng Template USP Canvas để viết USP cho sản phẩm của bạn. Chia sẻ kết quả lên nhóm học viên để nhận feedback từ mentor và cộng đồng.</p>
                  </div>
                </div>
              )}

              {activeTab === "notes" && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-500">Ghi chú của bạn cho bài này</p>
                    <span className="text-xs text-slate-400">Tự động lưu</span>
                  </div>
                  <textarea
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    className="w-full h-40 border border-slate-200 rounded-xl p-4 text-sm text-slate-800 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 resize-none transition-all placeholder:text-slate-300"
                    placeholder="Viết ghi chú của bạn tại đây... Ghi chú sẽ được lưu tự động."
                  />
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-slate-400">{noteText.length} ký tự</p>
                    <button className="text-xs bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">Lưu ghi chú</button>
                  </div>
                </div>
              )}

              {activeTab === "qa" && (
                <div className="space-y-5">
                  {/* Sample Q&A */}
                  <div className="border border-slate-200 rounded-xl overflow-hidden">
                    <div className="flex items-start gap-3 p-4">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">HN</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-slate-900 text-sm">Hoàng Nam</p>
                          <span className="text-slate-300 text-xs">·</span>
                          <span className="text-slate-400 text-xs">2 ngày trước</span>
                        </div>
                        <p className="text-slate-600 text-sm mt-1">Nếu mình bán 2–3 sản phẩm khác nhau thì có cần viết USP riêng cho từng cái không?</p>
                        <div className="flex items-center gap-3 mt-2">
                          <button className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1">👍 12</button>
                          <button className="text-xs text-slate-400 hover:text-slate-600">Trả lời</button>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-blue-50 border-t border-blue-100">
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">GV</div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-blue-900 text-sm">Nguyễn Thành Nam</p>
                          <span className="text-xs bg-blue-200 text-blue-800 px-2 py-0.5 rounded-full font-medium">Giảng viên</span>
                        </div>
                        <p className="text-blue-800 text-sm mt-1">Đúng vậy! Mỗi sản phẩm nên có USP riêng vì khách hàng mục tiêu và vấn đề cần giải quyết thường khác nhau. Tuy nhiên, brand USP tổng thể của bạn vẫn có thể chung...</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <textarea
                      className="w-full h-24 border border-slate-200 rounded-xl p-4 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 resize-none transition-all placeholder:text-slate-300"
                      placeholder="Đặt câu hỏi của bạn về bài học này..."
                    />
                    <div className="flex justify-end">
                      <button className="text-sm bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-colors font-semibold">Gửi câu hỏi</button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Prev / Next */}
            <div className="flex items-center justify-between px-6 py-5 border-t border-slate-100 bg-slate-50">
              <button className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors py-2 px-4 rounded-xl hover:bg-white border border-transparent hover:border-slate-200">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="hidden sm:inline">Bài trước</span>
              </button>
              <div className="text-center">
                <p className="text-xs text-slate-400">Bài 3 / 4 — Module 1</p>
                <div className="flex gap-1 mt-1 justify-center">
                  {[1, 2, 3, 4].map((d, i) => (
                    <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === 2 ? "bg-blue-600" : i < 2 ? "bg-green-500" : "bg-slate-200"}`} />
                  ))}
                </div>
              </div>
              <Link
                href="/templates/khoa-hoc/learn/ban-hang-online"
                className="flex items-center gap-2 text-sm bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-colors"
              >
                <span className="hidden sm:inline">Bài tiếp theo</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Lesson sidebar */}
        {sidebarOpen && (
          <aside className="w-72 xl:w-80 bg-white border-l border-slate-200 flex-col overflow-hidden flex-shrink-0 hidden md:flex">
            {/* Header */}
            <div className="px-4 py-4 border-b border-slate-200 bg-slate-50">
              <p className="font-heading font-bold text-slate-900 text-sm">Nội Dung Khóa Học</p>
              <div className="flex items-center justify-between mt-2">
                <p className="text-slate-400 text-xs">{DONE_LESSONS}/{TOTAL_LESSONS} bài hoàn thành</p>
                <span className="text-xs font-bold text-blue-600">{PROGRESS}%</span>
              </div>
              <div className="h-1.5 bg-slate-200 rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${PROGRESS}%` }} />
              </div>
            </div>

            {/* Lesson list */}
            <div className="flex-1 overflow-y-auto">
              {MODULES.map((mod, mi) => (
                <div key={mi} className="border-b border-slate-100">
                  <button
                    onClick={() => toggleModule(mi)}
                    className="w-full flex items-start justify-between gap-3 px-4 py-3.5 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-heading font-semibold text-slate-800 text-xs leading-snug">{mod.title}</p>
                      <p className="text-slate-400 text-[11px] mt-0.5">
                        {mod.lessons.length} bài · {mod.duration} ·{" "}
                        <span className="text-green-600 font-medium">{mod.lessons.filter((l) => l.done).length} hoàn thành</span>
                      </p>
                    </div>
                    <svg className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform mt-0.5 ${openModules.includes(mi) ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {openModules.includes(mi) && (
                    <ul>
                      {mod.lessons.map((lesson) => (
                        <li key={lesson.id}>
                          <button
                            className={cn(
                              "w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-slate-50 transition-colors border-l-2 border-transparent",
                              lesson.active ? "bg-blue-50 border-l-blue-500" : ""
                            )}
                          >
                            {/* Status */}
                            <div className={cn(
                              "w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-bold",
                              lesson.done ? "bg-green-500 text-white" : lesson.active ? "bg-blue-600 text-white" : "border-2 border-slate-200 text-slate-300"
                            )}>
                              {lesson.done ? (
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              ) : lesson.active ? "▶" : ""}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className={cn(
                                "text-xs leading-snug truncate",
                                lesson.active ? "font-semibold text-blue-700" : lesson.done ? "text-slate-400 line-through" : "text-slate-700"
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

            {/* Footer */}
            <div className="p-3 border-t border-slate-200 bg-slate-50">
              <Link
                href="/templates/khoa-hoc/dashboard"
                className="flex items-center gap-2 text-xs text-slate-500 hover:text-slate-900 transition-colors p-2 rounded-lg hover:bg-white"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Về Dashboard
              </Link>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
