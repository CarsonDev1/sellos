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
    category: "Bán hàng",
    enrolled: "20/04/2025",
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
    category: "Quảng cáo",
    enrolled: "24/04/2025",
  },
];

const WISHLIST = [
  {
    id: "email-marketing",
    title: "Email Marketing Tự Động Hóa",
    instructor: "Lê Minh Châu",
    price: "990.000₫",
    originalPrice: "1.890.000₫",
    rating: 4.7,
    students: 620,
    gradient: "from-emerald-500 to-teal-600",
    emoji: "📧",
  },
  {
    id: "shopee-ads",
    title: "Shopee & Lazada: Tối Ưu Shop",
    instructor: "Phạm Quang Huy",
    price: "890.000₫",
    originalPrice: "1.590.000₫",
    rating: 4.9,
    students: 1050,
    gradient: "from-orange-500 to-red-500",
    emoji: "🛍️",
  },
  {
    id: "content-marketing",
    title: "Content Marketing & SEO Thực Chiến",
    instructor: "Vũ Thị Lan",
    price: "1.190.000₫",
    originalPrice: "2.290.000₫",
    rating: 4.8,
    students: 740,
    gradient: "from-violet-500 to-purple-600",
    emoji: "✍️",
  },
];

const WEEKLY_DATA = [
  { day: "T2", minutes: 45 },
  { day: "T3", minutes: 60 },
  { day: "T4", minutes: 0 },
  { day: "T5", minutes: 90 },
  { day: "T6", minutes: 30 },
  { day: "T7", minutes: 0 },
  { day: "CN", minutes: 75 },
];

const MODULE_PROGRESS = [
  { title: "Module 1: Tìm sản phẩm & định vị", done: 3, total: 4, pct: 75 },
  { title: "Module 2: Xây landing page bằng AI", done: 0, total: 5, pct: 0 },
  { title: "Module 3: Chatbot & Email tự động hóa", done: 0, total: 4, pct: 0 },
  { title: "Module 4: Chạy traffic & tối ưu", done: 0, total: 3, pct: 0 },
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
  const [courseTab, setCourseTab] = useState<"learning" | "completed" | "wishlist">("learning");
  const [profileEditing, setProfileEditing] = useState(false);
  const [notifSettings, setNotifSettings] = useState({
    emailReminder: true,
    courseUpdates: true,
    weeklyReport: true,
    promotions: false,
  });

  const maxMinutes = Math.max(...WEEKLY_DATA.map((d) => d.minutes), 1);

  function renderContent() {
    switch (activeNav) {
      case "courses":   return renderCourses();
      case "progress":  return renderProgress();
      case "certs":     return renderCerts();
      case "settings":  return renderSettings();
      default:          return renderOverview();
    }
  }

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
          <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
              <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838l-2.727 1.17 1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
              </svg>
            </div>
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
              <div className="min-w-0">
                <p className="font-heading font-bold text-slate-900 text-sm truncate">Nguyễn Văn A</p>
                <span className="text-xs bg-blue-100 text-blue-700 font-semibold px-2 py-0.5 rounded-full">Level 2</span>
                <p className="text-xs text-slate-400 mt-0.5">Người học tích cực</p>
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
          <div className="px-5 sm:px-8 py-8">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );

  function renderOverview() {
    return (
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-heading text-2xl font-bold text-slate-900">Xin chào, Văn A! 👋</h1>
            <p className="text-slate-500 text-sm mt-0.5">Hôm nay là Thứ Ba, 29/04/2025 · Bạn đang tiến bộ rất tốt!</p>
          </div>
          <div className="flex items-center gap-3 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl px-5 py-3 flex-shrink-0">
            <span className="text-2xl">🔥</span>
            <div>
              <p className="font-heading font-bold text-amber-700 text-lg leading-none">3 ngày</p>
              <p className="text-amber-600 text-xs mt-0.5">liên tiếp · Tiếp tục nhé!</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((stat, i) => (
            <div key={i} className={`${stat.bg} border ${stat.border} rounded-2xl p-4 flex items-center gap-4`}>
              <div className="w-11 h-11 rounded-xl bg-white shadow-sm flex items-center justify-center text-xl flex-shrink-0">{stat.icon}</div>
              <div>
                <p className={`font-heading font-bold text-2xl ${stat.color}`}>{stat.value}</p>
                <p className="text-slate-500 text-xs leading-tight mt-0.5">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div>
          <h2 className="font-heading font-bold text-slate-900 text-lg mb-4">Tiếp Tục Học</h2>
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col sm:flex-row">
              <div className={`sm:w-48 h-36 sm:h-auto bg-gradient-to-br ${ENROLLED[0].gradient} flex items-center justify-center flex-shrink-0 relative`}>
                <span className="text-5xl">{ENROLLED[0].emoji}</span>
                <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">Đang học</div>
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
                <Link href={ENROLLED[0].link} className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors shadow-sm shadow-blue-200">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" /></svg>
                  Tiếp tục học
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading font-bold text-slate-900 text-lg">Khóa Học Của Tôi</h2>
              <button onClick={() => setActiveNav("courses")} className="text-sm text-blue-600 font-semibold hover:underline">Xem tất cả →</button>
            </div>
            <div className="space-y-3">
              {ENROLLED.map((course) => (
                <div key={course.id} className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-4 hover:border-blue-200 hover:shadow-sm transition-all">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${course.gradient} flex items-center justify-center text-2xl flex-shrink-0`}>{course.emoji}</div>
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <p className="font-heading font-semibold text-slate-900 text-sm truncate">{course.title}</p>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${course.progress}%` }} />
                    </div>
                    <p className="text-slate-400 text-xs">{course.done}/{course.total} bài · {course.progress}%</p>
                  </div>
                  <Link href={course.link} className={cn("flex-shrink-0 text-xs font-semibold px-4 py-2 rounded-xl transition-colors", course.progress > 0 ? "bg-blue-600 text-white hover:bg-blue-700" : "border border-slate-200 text-slate-600 hover:bg-slate-50")}>
                    {course.progress > 0 ? "Tiếp tục" : "Bắt đầu"}
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-2">
            <h2 className="font-heading font-bold text-slate-900 text-lg mb-4">Hoạt Động Gần Đây</h2>
            <div className="bg-white border border-slate-200 rounded-2xl p-4">
              {ACTIVITY.map((item, i) => (
                <div key={i} className={cn("flex items-start gap-3 py-3.5", i !== ACTIVITY.length - 1 && "border-b border-slate-100")}>
                  <div className={`w-7 h-7 rounded-full ${item.color} flex items-center justify-center text-white text-[10px] flex-shrink-0 mt-0.5`}>{item.icon}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-slate-700 text-xs leading-relaxed">{item.text}</p>
                    <p className="text-slate-400 text-[11px] mt-0.5">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading font-bold text-slate-900 text-lg">Thành Tích</h2>
            <span className="text-sm text-slate-500">2/4 đạt được</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {ACHIEVEMENTS.map((a, i) => (
              <div key={i} className={cn("border rounded-2xl p-4 text-center transition-all", a.done ? "bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200 shadow-sm" : "bg-slate-50 border-slate-200 opacity-60")}>
                <span className={cn("text-3xl block mb-2", !a.done && "grayscale")}>{a.icon}</span>
                <p className="font-heading font-bold text-slate-900 text-sm">{a.label}</p>
                <p className="text-slate-500 text-xs leading-tight mt-1">{a.desc}</p>
                {a.done
                  ? <span className="inline-block mt-2 text-[10px] font-bold bg-amber-200 text-amber-800 px-2 py-0.5 rounded-full">✓ {a.date}</span>
                  : <span className="inline-block mt-2 text-[10px] text-slate-400">Chưa đạt</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  function renderCourses() {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="font-heading text-2xl font-bold text-slate-900">Khóa Học Của Tôi</h1>
          <p className="text-slate-500 text-sm mt-0.5">Quản lý tất cả khóa học bạn đang theo học</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-slate-100 rounded-xl p-1 w-fit">
          {([
            { id: "learning",  label: "Đang học",    count: 2 },
            { id: "completed", label: "Hoàn thành",  count: 0 },
            { id: "wishlist",  label: "Wishlist",     count: 3 },
          ] as const).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setCourseTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                courseTab === tab.id ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
              )}
            >
              {tab.label}
              <span className={cn("text-[11px] font-bold px-1.5 py-0.5 rounded-full min-w-[1.25rem] text-center", courseTab === tab.id ? "bg-blue-100 text-blue-700" : "bg-slate-200 text-slate-500")}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Đang học */}
        {courseTab === "learning" && (
          <div className="space-y-4">
            {ENROLLED.map((course) => (
              <div key={course.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-blue-200 hover:shadow-md transition-all">
                <div className="flex flex-col sm:flex-row">
                  <div className={`sm:w-40 h-32 sm:h-auto bg-gradient-to-br ${course.gradient} flex items-center justify-center flex-shrink-0 relative`}>
                    <span className="text-4xl">{course.emoji}</span>
                    {course.progress > 0 && (
                      <div className="absolute bottom-2 left-2 right-2">
                        <div className="h-1 bg-white/30 rounded-full overflow-hidden">
                          <div className="h-full bg-white rounded-full" style={{ width: `${course.progress}%` }} />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-5 flex-1 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">{course.category}</span>
                        <h3 className="font-heading font-bold text-slate-900 text-base mt-1.5">{course.title}</h3>
                        <p className="text-slate-400 text-sm">{course.instructor}</p>
                      </div>
                      <span className="text-[11px] text-slate-400 flex-shrink-0 whitespace-nowrap">Đăng ký: {course.enrolled}</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>{course.done}/{course.total} bài học</span>
                        <span className="font-bold text-blue-600">{course.progress}%</span>
                      </div>
                      <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{ width: `${course.progress}%`, background: course.progress > 0 ? "linear-gradient(to right,#3b82f6,#6366f1)" : undefined }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-slate-400 text-xs">
                        {course.progress > 0 ? `📌 ${course.lastLesson}` : "Chưa bắt đầu"} · {course.timeLeft}
                      </p>
                      <Link href={course.link} className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" /></svg>
                        {course.progress > 0 ? "Tiếp tục học" : "Bắt đầu"}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Hoàn thành */}
        {courseTab === "completed" && (
          <div className="text-center py-20">
            <span className="text-6xl">🎓</span>
            <h3 className="font-heading font-bold text-slate-900 text-lg mt-4 mb-2">Chưa hoàn thành khóa học nào</h3>
            <p className="text-slate-500 text-sm max-w-xs mx-auto">Hãy tiếp tục học để hoàn thành khóa học đầu tiên và nhận chứng chỉ!</p>
            <Link href="/templates/khoa-hoc/learn/ban-hang-online" className="inline-block mt-5 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors">
              Tiếp tục học ngay
            </Link>
          </div>
        )}

        {/* Wishlist */}
        {courseTab === "wishlist" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {WISHLIST.map((course) => (
              <div key={course.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-blue-200 hover:shadow-md transition-all">
                <div className={`h-32 bg-gradient-to-br ${course.gradient} flex items-center justify-center relative`}>
                  <span className="text-5xl">{course.emoji}</span>
                  <button className="absolute top-3 right-3 w-7 h-7 bg-white/20 rounded-full flex items-center justify-center text-sm hover:bg-white/40 transition-colors">❤️</button>
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="font-heading font-semibold text-slate-900 text-sm leading-snug">{course.title}</h3>
                  <p className="text-slate-400 text-xs">{course.instructor}</p>
                  <div className="flex items-center gap-1">
                    <span className="text-amber-400 text-xs">⭐</span>
                    <span className="text-xs font-semibold text-slate-700">{course.rating}</span>
                    <span className="text-xs text-slate-400">({course.students.toLocaleString()} học viên)</span>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <div>
                      <span className="font-heading font-bold text-slate-900 text-base">{course.price}</span>
                      <span className="text-slate-400 line-through text-xs ml-2">{course.originalPrice}</span>
                    </div>
                    <Link href="/templates/khoa-hoc/course/ban-hang-online" className="text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg transition-colors">
                      Đăng ký
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  function renderProgress() {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="font-heading text-2xl font-bold text-slate-900">Tiến Độ Học</h1>
          <p className="text-slate-500 text-sm mt-0.5">Theo dõi quá trình học tập của bạn</p>
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: "⏱️", value: "5h",  label: "Tuần này",       note: "+1.5h so tuần trước", up: true },
            { icon: "📖", value: "3",    label: "Bài hoàn thành", note: "+3 bài mới",           up: true },
            { icon: "🔥", value: "3",    label: "Ngày streak",    note: "Kỷ lục: 3 ngày",       up: null },
            { icon: "📈", value: "19%",  label: "Tiến độ TB",     note: "Đang học tích cực",    up: null },
          ].map((s, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-2xl p-4 space-y-1">
              <span className="text-2xl">{s.icon}</span>
              <p className="font-heading font-bold text-slate-900 text-2xl">{s.value}</p>
              <p className="text-slate-500 text-xs">{s.label}</p>
              <p className={cn("text-xs font-medium", s.up ? "text-green-600" : "text-slate-400")}>{s.note}</p>
            </div>
          ))}
        </div>

        {/* Weekly bar chart */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-heading font-bold text-slate-900 text-base">Thời Gian Học 7 Ngày Qua</h2>
            <span className="text-xs text-slate-400 bg-slate-100 px-3 py-1.5 rounded-full">Tổng: 5h 00p</span>
          </div>
          <div className="flex items-end gap-2 h-28">
            {WEEKLY_DATA.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                <div
                  className={cn("w-full rounded-t-lg transition-all", d.minutes > 0 ? "bg-blue-500 hover:bg-blue-600" : "bg-slate-100")}
                  style={{ height: `${d.minutes > 0 ? (d.minutes / maxMinutes) * 100 : 8}%` }}
                  title={`${d.day}: ${d.minutes} phút`}
                />
                <span className="text-[10px] text-slate-400">{d.day}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-blue-500 inline-block" /> Có học</div>
            <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-slate-100 border border-slate-200 inline-block" /> Không học</div>
          </div>
        </div>

        {/* Per-course module breakdown */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <h2 className="font-heading font-bold text-slate-900 text-base mb-5">Tiến Độ Từng Khóa Học</h2>
          <div className="space-y-7">
            {ENROLLED.map((course) => (
              <div key={course.id}>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${course.gradient} flex items-center justify-center text-lg flex-shrink-0`}>{course.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <p className="font-heading font-semibold text-slate-900 text-sm truncate">{course.title}</p>
                    <p className="text-slate-400 text-xs">{course.done}/{course.total} bài · {course.progress}% hoàn thành</p>
                  </div>
                  <span className={cn("text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0",
                    course.progress > 0 ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-500"
                  )}>
                    {course.progress > 0 ? "Đang học" : "Chưa bắt đầu"}
                  </span>
                </div>
                <div className="space-y-2 pl-12">
                  {MODULE_PROGRESS.map((mod, j) => (
                    <div key={j} className="flex items-center gap-3">
                      <p className="text-xs text-slate-600 w-52 flex-shrink-0 truncate">{mod.title}</p>
                      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-400 rounded-full" style={{ width: `${course.progress > 0 ? mod.pct : 0}%` }} />
                      </div>
                      <span className="text-[11px] text-slate-400 w-8 text-right flex-shrink-0">
                        {course.progress > 0 ? `${mod.done}/${mod.total}` : `0/${mod.total}`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Insights */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6">
          <h2 className="font-heading font-bold text-slate-900 text-base mb-4">💡 Gợi Ý Cá Nhân Hóa</h2>
          <div className="space-y-3">
            {[
              { icon: "🎯", title: "Gần xong Module 1", desc: "Chỉ còn 1 bài nữa là xong Module 1. Hãy học hôm nay để hoàn thành sớm!" },
              { icon: "⏰", title: "Học đều hơn", desc: "Bạn hay học vào cuối tuần. Thử học 20 phút mỗi ngày để duy trì streak tốt hơn." },
              { icon: "📊", title: "Tăng tốc một chút", desc: "Trung bình 43 phút/ngày. Tăng lên 60 phút sẽ giúp hoàn thành trong 2 tuần." },
            ].map((tip, i) => (
              <div key={i} className="flex items-start gap-3 bg-white rounded-xl p-4">
                <span className="text-xl flex-shrink-0">{tip.icon}</span>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{tip.title}</p>
                  <p className="text-slate-500 text-xs mt-0.5 leading-relaxed">{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  function renderCerts() {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="font-heading text-2xl font-bold text-slate-900">Chứng Chỉ</h1>
          <p className="text-slate-500 text-sm mt-0.5">Chứng nhận kỹ năng sau khi hoàn thành khóa học</p>
        </div>

        {/* In-progress certs */}
        <div>
          <h2 className="font-heading font-bold text-slate-900 text-base mb-4">Đang Tiến Hành</h2>
          <div className="space-y-4">
            {ENROLLED.map((course) => (
              <div key={course.id} className="bg-white border border-slate-200 rounded-2xl p-5">
                <div className="flex items-start gap-4">
                  {/* Locked icon */}
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${course.gradient} flex items-center justify-center flex-shrink-0 relative`}>
                    <span className="text-2xl">{course.emoji}</span>
                    <div className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0 space-y-3">
                    <div>
                      <h3 className="font-heading font-bold text-slate-900 text-base leading-snug">{course.title}</h3>
                      <p className="text-slate-400 text-sm mt-0.5">Cấp bởi SellOS Academy · {course.instructor}</p>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-500">Tiến độ hoàn thành</span>
                        <span className="font-bold text-slate-700">{course.progress}% / 100%</span>
                      </div>
                      <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all" style={{ width: `${course.progress}%` }} />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {[
                        { text: `Hoàn thành ${course.total} bài học`, done: course.done >= course.total },
                        { text: "Điểm bài kiểm tra ≥ 80%", done: false },
                        { text: "Nộp bài tập cuối khoá", done: false },
                      ].map((req, i) => (
                        <div key={i} className={cn("flex items-center gap-2 rounded-lg px-3 py-2 text-xs", req.done ? "bg-green-50 text-green-700" : "bg-slate-50 text-slate-500")}>
                          <span className="flex-shrink-0 text-base">{req.done ? "✅" : "⬜"}</span>
                          {req.text}
                        </div>
                      ))}
                    </div>
                    <Link href={course.link} className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition-colors">
                      Tiếp tục học để nhận chứng chỉ →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sample earned cert */}
        <div>
          <h2 className="font-heading font-bold text-slate-900 text-base mb-4">Chứng Chỉ Mẫu — Sau Khi Hoàn Thành</h2>
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6">
            {/* Certificate card */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl overflow-hidden shadow-xl max-w-sm mx-auto">
              <div className="h-1.5 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400" />
              <div className="p-8 text-center">
                <p className="text-amber-400 text-[11px] font-bold tracking-widest uppercase mb-3">SellOS Academy</p>
                <div className="w-16 h-16 rounded-full bg-amber-400/20 border-2 border-amber-400/50 flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🏆</span>
                </div>
                <p className="text-slate-300 text-xs mb-1">Chứng nhận hoàn thành khóa học</p>
                <p className="text-white font-heading font-bold text-base leading-snug mt-2 mb-4">Bán Hàng Online Từ 0 Đến Đơn Đầu Tiên</p>
                <div className="border-t border-white/10 pt-4 space-y-1">
                  <p className="text-slate-300 text-xs">Cấp cho: <span className="text-white font-semibold">Nguyễn Văn A</span></p>
                  <p className="text-slate-400 text-[11px]">Ngày cấp: 30/06/2025</p>
                  <p className="text-slate-600 text-[10px] mt-2">ID: SOSA-2025-BHO-001</p>
                </div>
              </div>
            </div>
            {/* Actions */}
            <div className="text-center space-y-3">
              <p className="text-slate-500 text-sm">Hoàn thành 100% khóa học để mở khoá chứng chỉ và tải xuống.</p>
              <div className="flex flex-wrap justify-center gap-2">
                <button disabled className="flex items-center gap-2 bg-slate-100 text-slate-400 font-semibold px-5 py-2.5 rounded-xl text-sm cursor-not-allowed">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  Tải PDF
                </button>
                <button disabled className="flex items-center gap-2 border border-slate-200 text-slate-400 font-semibold px-5 py-2.5 rounded-xl text-sm cursor-not-allowed">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                  Chia sẻ LinkedIn
                </button>
              </div>
              <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5 max-w-sm mx-auto">
                ⚠️ Đang khoá — hoàn thành 100% để mở tính năng này
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderSettings() {
    return (
      <div className="space-y-8 max-w-2xl">
        <div>
          <h1 className="font-heading text-2xl font-bold text-slate-900">Cài Đặt Tài Khoản</h1>
          <p className="text-slate-500 text-sm mt-0.5">Quản lý thông tin cá nhân và tùy chọn của bạn</p>
        </div>

        {/* Profile */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="font-heading font-bold text-slate-900 text-base">Thông Tin Cá Nhân</h2>
            <button
              onClick={() => setProfileEditing((v) => !v)}
              className={cn("text-sm font-semibold px-4 py-1.5 rounded-xl transition-colors", profileEditing ? "bg-blue-600 text-white hover:bg-blue-700" : "border border-slate-200 text-slate-600 hover:bg-slate-50")}
            >
              {profileEditing ? "💾 Lưu" : "✏️ Chỉnh sửa"}
            </button>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-2xl">A</div>
              {profileEditing && (
                <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs hover:bg-blue-700">+</button>
              )}
            </div>
            <div>
              <p className="font-semibold text-slate-900 text-sm">Nguyễn Văn A</p>
              <p className="text-slate-400 text-xs">Học viên · Tham gia tháng 4/2025</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: "Họ và tên",    value: "Nguyễn Văn A",              type: "text",  readonly: false },
              { label: "Email",        value: "nguyenvana@email.com",       type: "email", readonly: true  },
              { label: "Số điện thoại", value: "09xx xxx xxx",             type: "tel",   readonly: false },
              { label: "Múi giờ",      value: "Asia/Ho_Chi_Minh (GMT+7)", type: "text",  readonly: false },
            ].map((f, i) => (
              <div key={i}>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">{f.label}</label>
                <input
                  type={f.type}
                  defaultValue={f.value}
                  readOnly={!profileEditing || f.readonly}
                  className={cn("w-full border rounded-xl px-3.5 py-2.5 text-sm transition-all",
                    profileEditing && !f.readonly
                      ? "border-blue-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                      : "border-slate-100 bg-slate-50 text-slate-600 cursor-default"
                  )}
                />
              </div>
            ))}
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Giới thiệu bản thân</label>
            <textarea
              rows={3}
              readOnly={!profileEditing}
              defaultValue="Đang học bán hàng online để tự do tài chính."
              className={cn("w-full border rounded-xl px-3.5 py-2.5 text-sm transition-all resize-none",
                profileEditing
                  ? "border-blue-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                  : "border-slate-100 bg-slate-50 text-slate-600 cursor-default"
              )}
            />
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
          <h2 className="font-heading font-bold text-slate-900 text-base">Thông Báo</h2>
          {([
            { key: "emailReminder", label: "Nhắc nhở học tập",     desc: "Nhận email nhắc khi bạn chưa học trong 2 ngày" },
            { key: "courseUpdates", label: "Cập nhật khóa học",     desc: "Thông báo khi khóa học có nội dung mới" },
            { key: "weeklyReport",  label: "Báo cáo tuần",          desc: "Tóm tắt tiến độ gửi mỗi thứ Hai hàng tuần" },
            { key: "promotions",    label: "Khuyến mãi & ưu đãi",  desc: "Thông báo về chương trình giảm giá khóa học" },
          ] as const).map((item) => (
            <div key={item.key} className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-slate-900">{item.label}</p>
                <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
              </div>
              <button
                onClick={() => setNotifSettings((prev) => ({ ...prev, [item.key]: !prev[item.key] }))}
                className={cn("relative w-11 h-6 rounded-full transition-colors flex-shrink-0", notifSettings[item.key] ? "bg-blue-600" : "bg-slate-200")}
              >
                <span className={cn("absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform", notifSettings[item.key] ? "translate-x-5" : "translate-x-0.5")} />
              </button>
            </div>
          ))}
        </div>

        {/* Security */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
          <h2 className="font-heading font-bold text-slate-900 text-base">Bảo Mật</h2>
          <div className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors">
            <div>
              <p className="text-sm font-semibold text-slate-900">Mật khẩu</p>
              <p className="text-xs text-slate-400">Lần đổi cuối: 5 ngày trước</p>
            </div>
            <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors">Đổi mật khẩu</button>
          </div>
          <div className="flex items-center justify-between p-3 rounded-xl border border-slate-100">
            <div>
              <p className="text-sm font-semibold text-slate-900">Xác thực 2 bước (2FA)</p>
              <p className="text-xs text-slate-400">Bảo vệ tài khoản của bạn</p>
            </div>
            <span className="text-xs font-semibold bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full">Sắp ra mắt</span>
          </div>
        </div>

        {/* Subscription */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="font-heading font-bold text-slate-900 text-base">Gói Đăng Ký</h2>
              <div className="mt-1 flex items-center gap-2 flex-wrap">
                <span className="bg-blue-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">Gói Basic</span>
                <span className="text-slate-500 text-sm">· Học trọn đời</span>
              </div>
              <p className="text-slate-400 text-xs mt-1">Kích hoạt: 20/04/2025 · 2 khóa học</p>
            </div>
            <Link href="/templates/khoa-hoc" className="text-sm font-semibold text-blue-600 hover:text-blue-700 bg-white border border-blue-200 px-4 py-2 rounded-xl hover:shadow-sm transition-all flex-shrink-0">
              Nâng cấp VIP →
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
