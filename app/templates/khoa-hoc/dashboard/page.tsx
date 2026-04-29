"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { icon: "🏠", label: "Tổng quan", id: "overview" },
  { icon: "📚", label: "Khóa học của tôi", id: "courses" },
  { icon: "📊", label: "Tiến độ học", id: "progress" },
  { icon: "🏆", label: "Chứng chỉ", id: "certs" },
  { icon: "⚙️", label: "Cài đặt", id: "settings" },
];

const ENROLLED = [
  {
    id: "ban-hang-online",
    title: "Bán Hàng Online Từ 0 Đến Đơn Đầu Tiên",
    instructor: "Nguyễn Thành Nam",
    progress: 19,
    total: 16,
    done: 3,
    gradient: "from-blue-500 to-indigo-600",
    emoji: "🚀",
    lastLesson: "Bài 1.3 — Định vị USP của bạn",
    link: "/templates/khoa-hoc/learn/ban-hang-online",
    timeLeft: "~10.5 giờ còn lại",
  },
  {
    id: "facebook-ads",
    title: "Facebook & TikTok Ads Từ A Đến Z",
    instructor: "Trần Hải Đăng",
    progress: 0,
    total: 20,
    done: 0,
    gradient: "from-rose-500 to-pink-600",
    emoji: "📱",
    lastLesson: "Chưa bắt đầu",
    link: "/templates/khoa-hoc/learn/ban-hang-online",
    timeLeft: "~15 giờ",
  },
];

const STATS = [
  { icon: "📚", value: "2", label: "Khóa đang học", bg: "bg-blue-50", color: "text-blue-600", border: "border-blue-200" },
  { icon: "✅", value: "3", label: "Bài đã hoàn thành", bg: "bg-green-50", color: "text-green-600", border: "border-green-200" },
  { icon: "⏱️", value: "4.5h", label: "Thời gian học", bg: "bg-violet-50", color: "text-violet-600", border: "border-violet-200" },
  { icon: "🔥", value: "3", label: "Ngày liên tiếp", bg: "bg-amber-50", color: "text-amber-600", border: "border-amber-200" },
];

const ACHIEVEMENTS = [
  { icon: "🚀", label: "Khởi đầu", desc: "Hoàn thành bài học đầu tiên", done: true, date: "20/04/2025" },
  { icon: "🔥", label: "Đà tốt", desc: "Học 3 ngày liên tiếp", done: true, date: "22/04/2025" },
  { icon: "⭐", label: "Ngôi sao", desc: "Hoàn thành 10 bài học", done: false, date: null },
  { icon: "🏆", label: "Tốt nghiệp", desc: "Hoàn thành 1 khóa học", done: false, date: null },
];

const ACTIVITY = [
  { icon: "▶", text: "Hoàn thành bài 1.2 — Checklist chọn sản phẩm", time: "2 giờ trước", color: "bg-green-500" },
  { icon: "▶", text: "Hoàn thành bài 1.1 — Xác định nhu cầu thị trường", time: "Hôm qua", color: "bg-green-500" },
  { icon: "📚", text: "Đăng ký khóa học Facebook & TikTok Ads", time: "3 ngày trước", color: "bg-blue-500" },
  { icon: "🎉", text: "Tham gia SellOS Academy", time: "5 ngày trước", color: "bg-violet-500" },
];

export default function DashboardPage() {
  const [activeNav, setActiveNav] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top bar */}
      <header className="h-16 bg-white border-b border-slate-200 flex items-center px-4 gap-3 sticky top-0 z-30 shadow-sm">
        <button
          className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors text-slate-500"
          onClick={() => setSidebarOpen((v) => !v)}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <Link href="/templates/khoa-hoc" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white text-sm">📚</div>
          <span className="font-heading font-bold text-slate-900 text-base">
            SellOS<span className="text-blue-600">Academy</span>
          </span>
        </Link>

        <div className="flex-1" />

        {/* Search */}
        <div className="relative hidden sm:block">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input placeholder="Tìm khóa học..." className="pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-full bg-slate-50 focus:outline-none focus:border-blue-400 w-52 transition-all" />
        </div>

        {/* Notification */}
        <button className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors text-slate-500">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </button>

        {/* Avatar */}
        <div className="flex items-center gap-2.5 cursor-pointer group">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm ring-2 ring-blue-200 ring-offset-1">
            A
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-slate-900 leading-tight">Nguyễn Văn A</p>
            <p className="text-xs text-slate-400">Level 2</p>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className={cn(
          "w-60 xl:w-64 bg-white border-r border-slate-200 flex flex-col flex-shrink-0",
          "fixed lg:static inset-y-0 left-0 z-20 top-16 transition-transform duration-200",
          sidebarOpen ? "translate-x-0 shadow-xl" : "-translate-x-full lg:translate-x-0"
        )}>
          {/* Profile */}
          <div className="p-5 border-b border-slate-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg ring-2 ring-blue-100">
                A
              </div>
              <div>
                <p className="font-heading font-bold text-slate-900 text-sm">Nguyễn Văn A</p>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs bg-blue-100 text-blue-700 font-semibold px-2 py-0.5 rounded-full">Level 2</span>
                  <span className="text-xs text-slate-400">· Người học tích cực</span>
                </div>
              </div>
            </div>
            {/* XP progress */}
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-500">320 XP / 500 XP</span>
                <span className="text-blue-600 font-semibold">64%</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full w-[64%] bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full" />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">180 XP nữa để lên Level 3</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => { setActiveNav(item.id); setSidebarOpen(false); }}
                className={cn(
                  "w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all text-left",
                  activeNav === item.id
                    ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                )}
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>

          {/* Bottom */}
          <div className="p-4 border-t border-slate-100 space-y-2">
            <Link
              href="/templates/khoa-hoc"
              className="flex items-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors justify-center"
            >
              + Khóa học mới
            </Link>
            <Link
              href="/templates/khoa-hoc/learn/ban-hang-online"
              className="flex items-center gap-2 w-full border border-slate-200 hover:bg-slate-50 text-slate-600 font-medium py-2.5 rounded-xl text-sm transition-colors justify-center"
            >
              ▶ Tiếp tục học
            </Link>
          </div>
        </aside>

        {/* Overlay mobile */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/40 z-10 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">

            {/* Welcome header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="font-heading text-2xl font-bold text-slate-900">
                  Xin chào, Văn A! 👋
                </h1>
                <p className="text-slate-500 text-sm mt-0.5">
                  Hôm nay là Thứ Ba, 29/04/2025 · Bạn đang tiến bộ rất tốt!
                </p>
              </div>
              <div className="flex items-center gap-3 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl px-5 py-3 flex-shrink-0">
                <span className="text-2xl">🔥</span>
                <div>
                  <p className="font-heading font-bold text-amber-700 text-lg leading-none">3 ngày</p>
                  <p className="text-amber-600 text-xs mt-0.5">liên tiếp · Tiếp tục nhé!</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {STATS.map((stat, i) => (
                <div key={i} className={`${stat.bg} border ${stat.border} rounded-2xl p-4 flex items-center gap-4`}>
                  <div className={`w-11 h-11 rounded-xl bg-white shadow-sm flex items-center justify-center text-xl flex-shrink-0`}>
                    {stat.icon}
                  </div>
                  <div>
                    <p className={`font-heading font-bold text-2xl ${stat.color}`}>{stat.value}</p>
                    <p className="text-slate-500 text-xs leading-tight mt-0.5">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Continue learning */}
            <div>
              <h2 className="font-heading font-bold text-slate-900 text-lg mb-4">Tiếp Tục Học</h2>
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row">
                  <div className={`sm:w-48 h-36 sm:h-auto bg-gradient-to-br ${ENROLLED[0].gradient} flex items-center justify-center flex-shrink-0 relative`}>
                    <span className="text-5xl">{ENROLLED[0].emoji}</span>
                    <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">
                      Đang học
                    </div>
                  </div>
                  <div className="p-5 flex-1 space-y-4">
                    <div>
                      <h3 className="font-heading font-bold text-slate-900 text-base">{ENROLLED[0].title}</h3>
                      <p className="text-slate-400 text-sm">{ENROLLED[0].instructor}</p>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>Đang học: <span className="text-blue-600 font-medium">{ENROLLED[0].lastLesson}</span></span>
                        <span className="font-semibold">{ENROLLED[0].progress}%</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${ENROLLED[0].progress}%` }} />
                      </div>
                      <p className="text-slate-400 text-xs">{ENROLLED[0].done}/{ENROLLED[0].total} bài · {ENROLLED[0].timeLeft}</p>
                    </div>
                    <Link
                      href={ENROLLED[0].link}
                      className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors shadow-sm shadow-blue-200"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                      Tiếp tục học
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Two column: Courses + Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* Enrolled courses */}
              <div className="lg:col-span-3">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-heading font-bold text-slate-900 text-lg">Khóa Học Của Tôi</h2>
                  <Link href="/templates/khoa-hoc" className="text-sm text-blue-600 font-semibold hover:underline">
                    + Thêm khóa
                  </Link>
                </div>
                <div className="space-y-3">
                  {ENROLLED.map((course) => (
                    <div key={course.id} className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-4 hover:border-blue-200 hover:shadow-sm transition-all">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${course.gradient} flex items-center justify-center text-2xl flex-shrink-0`}>
                        {course.emoji}
                      </div>
                      <div className="flex-1 min-w-0 space-y-1.5">
                        <p className="font-heading font-semibold text-slate-900 text-sm truncate">{course.title}</p>
                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: `${course.progress}%` }} />
                        </div>
                        <p className="text-slate-400 text-xs">{course.done}/{course.total} bài · {course.progress}%</p>
                      </div>
                      <Link
                        href={course.link}
                        className={cn(
                          "flex-shrink-0 text-xs font-semibold px-4 py-2 rounded-xl transition-colors",
                          course.progress > 0
                            ? "bg-blue-600 text-white hover:bg-blue-700"
                            : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                        )}
                      >
                        {course.progress > 0 ? "Tiếp tục" : "Bắt đầu"}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              {/* Activity feed */}
              <div className="lg:col-span-2">
                <h2 className="font-heading font-bold text-slate-900 text-lg mb-4">Hoạt Động Gần Đây</h2>
                <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-0">
                  {ACTIVITY.map((item, i) => (
                    <div key={i} className={cn("flex items-start gap-3 py-3.5", i !== ACTIVITY.length - 1 && "border-b border-slate-100")}>
                      <div className={`w-7 h-7 rounded-full ${item.color} flex items-center justify-center text-white text-[10px] flex-shrink-0 mt-0.5`}>
                        {item.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-slate-700 text-xs leading-relaxed">{item.text}</p>
                        <p className="text-slate-400 text-[11px] mt-0.5">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-heading font-bold text-slate-900 text-lg">Thành Tích</h2>
                <span className="text-sm text-slate-500">2/4 đạt được</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {ACHIEVEMENTS.map((a, i) => (
                  <div
                    key={i}
                    className={cn(
                      "border rounded-2xl p-4 text-center transition-all",
                      a.done
                        ? "bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200 shadow-sm"
                        : "bg-slate-50 border-slate-200 opacity-60"
                    )}
                  >
                    <span className={cn("text-3xl block mb-2", !a.done && "grayscale")}>{a.icon}</span>
                    <p className="font-heading font-bold text-slate-900 text-sm">{a.label}</p>
                    <p className="text-slate-500 text-xs leading-tight mt-1">{a.desc}</p>
                    {a.done ? (
                      <span className="inline-block mt-2 text-[10px] font-bold bg-amber-200 text-amber-800 px-2 py-0.5 rounded-full">
                        ✓ {a.date}
                      </span>
                    ) : (
                      <span className="inline-block mt-2 text-[10px] text-slate-400">Chưa đạt</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
