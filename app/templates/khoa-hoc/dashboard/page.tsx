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

const ENROLLED_COURSES = [
  {
    id: "ban-hang-online",
    title: "Bán Hàng Online Từ 0 Đến Đơn Đầu Tiên",
    instructor: "Nguyễn Thành Nam",
    progress: 19,
    totalLessons: 16,
    doneLessons: 3,
    gradient: "from-blue-500 to-indigo-600",
    emoji: "🚀",
    lastLesson: "Bài 1.3 — Định vị USP của bạn",
    link: "/templates/khoa-hoc/learn/ban-hang-online",
  },
  {
    id: "facebook-ads",
    title: "Facebook & TikTok Ads Từ A Đến Z",
    instructor: "Trần Hải Đăng",
    progress: 0,
    totalLessons: 20,
    doneLessons: 0,
    gradient: "from-rose-500 to-pink-600",
    emoji: "📱",
    lastLesson: "Chưa bắt đầu",
    link: "/templates/khoa-hoc/learn/ban-hang-online",
  },
];

const STATS = [
  { icon: "📚", value: "2", label: "Khóa đang học", color: "bg-blue-50 text-blue-600" },
  { icon: "✅", value: "3", label: "Bài đã hoàn thành", color: "bg-green-50 text-green-600" },
  { icon: "⏱️", value: "4.5h", label: "Thời gian học", color: "bg-violet-50 text-violet-600" },
  { icon: "🔥", value: "3", label: "Ngày liên tiếp", color: "bg-amber-50 text-amber-600" },
];

const ACHIEVEMENTS = [
  { icon: "🚀", label: "Khởi đầu", desc: "Hoàn thành bài học đầu tiên", done: true },
  { icon: "🔥", label: "Đà tốt", desc: "Học 3 ngày liên tiếp", done: true },
  { icon: "⭐", label: "Ngôi sao", desc: "Hoàn thành 10 bài học", done: false },
  { icon: "🏆", label: "Tốt nghiệp", desc: "Hoàn thành 1 khóa học", done: false },
];

export default function DashboardPage() {
  const [activeNav, setActiveNav] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top bar */}
      <header className="h-16 bg-white border-b border-slate-200 flex items-center px-4 gap-4 sticky top-0 z-20">
        <button
          className="text-slate-500 hover:text-slate-900 lg:hidden"
          onClick={() => setSidebarOpen((v) => !v)}
        >
          ☰
        </button>
        <Link href="/templates/khoa-hoc" className="flex items-center gap-2">
          <span className="text-xl">📚</span>
          <span className="font-heading font-bold text-slate-900 text-base">
            SellOS<span className="text-blue-600">Academy</span>
          </span>
        </Link>
        <div className="flex-1" />
        <Link
          href="/templates/khoa-hoc"
          className="text-sm text-slate-500 hover:text-slate-900 transition-colors hidden sm:block"
        >
          Khám phá khóa học
        </Link>
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm cursor-pointer">
          A
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={cn(
            "w-64 bg-white border-r border-slate-200 flex flex-col pt-4 transition-all duration-200",
            "fixed lg:static inset-y-0 left-0 z-30 top-16 lg:translate-x-0",
            sidebarOpen ? "translate-x-0 shadow-xl" : "-translate-x-full lg:translate-x-0"
          )}
        >
          {/* Profile */}
          <div className="px-4 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-base">
                A
              </div>
              <div>
                <p className="font-heading font-semibold text-slate-900 text-sm">Nguyễn Văn A</p>
                <p className="text-slate-400 text-xs">vana@email.com</p>
              </div>
            </div>
            {/* XP bar */}
            <div className="mt-3">
              <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                <span>Level 2 · Người mới bắt đầu</span>
                <span>320/500 XP</span>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full w-[64%]" />
              </div>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 p-3 space-y-0.5">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => { setActiveNav(item.id); setSidebarOpen(false); }}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left",
                  activeNav === item.id
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>

          {/* Bottom CTA */}
          <div className="p-4 border-t border-slate-100">
            <Link
              href="/templates/khoa-hoc"
              className="block w-full text-center text-sm bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl transition-colors"
            >
              + Khóa học mới
            </Link>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
            {/* Welcome */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-heading text-2xl font-bold text-slate-900">
                  Chào buổi sáng, Văn A! 👋
                </h1>
                <p className="text-slate-500 text-sm mt-1">
                  Hôm nay tiếp tục học nhé — bạn đang học tốt lắm!
                </p>
              </div>
              <div className="hidden sm:flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-2">
                <span className="text-amber-500 text-lg">🔥</span>
                <div>
                  <p className="font-bold text-amber-700 text-sm">3 ngày</p>
                  <p className="text-amber-600 text-xs">liên tiếp</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {STATS.map((stat, i) => (
                <div
                  key={i}
                  className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-3 shadow-sm"
                >
                  <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center text-xl`}>
                    {stat.icon}
                  </div>
                  <div>
                    <p className="font-heading font-bold text-slate-900 text-xl">{stat.value}</p>
                    <p className="text-slate-400 text-xs leading-tight">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Continue learning */}
            <div>
              <h2 className="font-heading font-bold text-slate-900 text-lg mb-4">Tiếp Tục Học</h2>
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row">
                  <div className={`w-full sm:w-40 h-32 sm:h-auto bg-gradient-to-br ${ENROLLED_COURSES[0].gradient} flex items-center justify-center flex-shrink-0`}>
                    <span className="text-4xl">{ENROLLED_COURSES[0].emoji}</span>
                  </div>
                  <div className="p-5 flex-1 space-y-3">
                    <div>
                      <p className="text-slate-400 text-xs">Đang học</p>
                      <h3 className="font-heading font-semibold text-slate-900 text-base mt-0.5">
                        {ENROLLED_COURSES[0].title}
                      </h3>
                      <p className="text-slate-400 text-sm">{ENROLLED_COURSES[0].instructor}</p>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-1.5">
                        <span>Tiến độ: {ENROLLED_COURSES[0].doneLessons}/{ENROLLED_COURSES[0].totalLessons} bài</span>
                        <span>{ENROLLED_COURSES[0].progress}%</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: `${ENROLLED_COURSES[0].progress}%` }}
                        />
                      </div>
                      <p className="text-slate-400 text-xs mt-1">
                        Đang học: {ENROLLED_COURSES[0].lastLesson}
                      </p>
                    </div>
                    <Link
                      href={ENROLLED_COURSES[0].link}
                      className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors"
                    >
                      ▶ Tiếp tục học
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* All courses */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-heading font-bold text-slate-900 text-lg">Khóa Học Của Tôi</h2>
                <Link
                  href="/templates/khoa-hoc"
                  className="text-sm text-blue-600 font-semibold hover:underline"
                >
                  + Tìm khóa học mới
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {ENROLLED_COURSES.map((course) => (
                  <div
                    key={course.id}
                    className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className={`h-28 bg-gradient-to-br ${course.gradient} flex items-center justify-center`}>
                      <span className="text-3xl">{course.emoji}</span>
                    </div>
                    <div className="p-4 space-y-3">
                      <div>
                        <h3 className="font-heading font-semibold text-slate-900 text-sm line-clamp-2">
                          {course.title}
                        </h3>
                        <p className="text-slate-400 text-xs mt-0.5">{course.instructor}</p>
                      </div>
                      <div>
                        <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                          <span>{course.doneLessons}/{course.totalLessons} bài</span>
                          <span>{course.progress}%</span>
                        </div>
                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500 rounded-full"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                      </div>
                      <Link
                        href={course.link}
                        className="block w-full text-center text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors"
                      >
                        {course.progress > 0 ? "Tiếp tục →" : "Bắt đầu →"}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div>
              <h2 className="font-heading font-bold text-slate-900 text-lg mb-4">Thành Tích</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {ACHIEVEMENTS.map((a, i) => (
                  <div
                    key={i}
                    className={cn(
                      "border rounded-2xl p-4 text-center space-y-2 transition-all",
                      a.done
                        ? "bg-white border-amber-200 shadow-sm"
                        : "bg-slate-50 border-slate-200 opacity-50"
                    )}
                  >
                    <span className={cn("text-3xl block", !a.done && "grayscale")}>{a.icon}</span>
                    <p className="font-heading font-semibold text-slate-900 text-sm">{a.label}</p>
                    <p className="text-slate-400 text-xs leading-tight">{a.desc}</p>
                    {a.done && (
                      <span className="inline-block text-[10px] font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                        Đạt được!
                      </span>
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
