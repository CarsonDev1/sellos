"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function CourseHero() {
  return (
    <section className="relative pt-28 pb-20 bg-gradient-to-b from-blue-50 to-white overflow-hidden">
      {/* Background decoration */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(to right, #bfdbfe 1px, transparent 1px), linear-gradient(to bottom, #bfdbfe 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-40 -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-100 rounded-full blur-3xl opacity-30 translate-y-1/2 -translate-x-1/4" />

      <div className="relative container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16 items-center">
          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="space-y-6"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-4 py-1.5 text-sm text-amber-700 font-medium">
              <span>⭐</span>
              4.9/5 — 1,200+ học viên đã hoàn thành
            </div>

            {/* Headline */}
            <h1
              className="font-heading text-3xl sm:text-4xl xl:text-5xl font-bold tracking-normal text-slate-900"
              style={{ lineHeight: "1.3" }}
            >
              Bán Hàng Online Từ 0 Đến{" "}
              <span className="text-blue-600 relative">
                Đơn Đầu Tiên
                <svg
                  className="absolute -bottom-1 left-0 w-full"
                  viewBox="0 0 300 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 9C50 4 150 2 298 9"
                    stroke="#3b82f6"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>{" "}
              Trong{" "}
              <span className="bg-blue-600 text-white px-3 py-1 rounded-lg inline-block">
                7 Ngày
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg text-slate-600 leading-relaxed max-w-lg">
              Hệ thống bán hàng tự động hoàn chỉnh — không cần kỹ thuật, không
              cần vốn lớn. AI xây toàn bộ cho bạn.
            </p>

            {/* Bullet benefits */}
            <ul className="space-y-3">
              {[
                "🚀 Landing page chuyển đổi cao — AI tạo trong vài phút",
                "🤖 Chatbot tư vấn tự động 24/7 — không cần thuê nhân sự",
                "📧 Email marketing tự động nuôi dưỡng khách hàng",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-700">
                  <span className="text-base leading-6">{item.slice(0, 2)}</span>
                  <span className="text-sm leading-6">{item.slice(3)}</span>
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                asChild
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base px-8 h-12 shadow-md shadow-blue-200"
              >
                <a href="#gia">🎓 Đăng Ký Ngay</a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 text-base px-8 h-12"
              >
                <a href="#chuong-trinh">📋 Xem Chương Trình Học</a>
              </Button>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap items-center gap-4 pt-1 text-sm text-slate-500 border-t border-slate-100 pt-4">
              <span className="flex items-center gap-1.5">
                <span className="text-green-500 font-semibold">✓</span>
                Hoàn tiền 100% trong 7 ngày
              </span>
              <span className="text-slate-200">·</span>
              <span className="flex items-center gap-1.5">
                <span className="text-green-500 font-semibold">✓</span>
                Truy cập trọn đời
              </span>
              <span className="text-slate-200">·</span>
              <span className="flex items-center gap-1.5">
                <span className="text-green-500 font-semibold">✓</span>
                Cộng đồng hỗ trợ
              </span>
            </div>
          </motion.div>

          {/* Right: Stats & Preview */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            className="space-y-4"
          >
            {/* Dashboard mockup */}
            <div className="rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-200/80 overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 bg-slate-100 border-b border-slate-200">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-yellow-400" />
                <span className="w-3 h-3 rounded-full bg-green-400" />
                <div className="flex-1 ml-2 bg-white rounded-md px-3 py-1 text-xs text-slate-400 font-mono border border-slate-200">
                  khoa-hoc.sellos.vn
                </div>
              </div>
              <div className="p-4 space-y-3">
                {/* Course thumbnail */}
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl h-32 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white text-center space-y-1 px-4">
                      <div className="text-3xl font-bold font-heading">📚</div>
                      <p className="text-white font-semibold text-sm font-heading">
                        Bán Hàng Online
                      </p>
                      <p className="text-blue-100 text-xs">Từ 0 → Đơn Đầu Tiên</p>
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    LIVE
                  </div>
                </div>
                {/* Stats row */}
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: "1,200+", label: "Học viên" },
                    { value: "4.9★", label: "Đánh giá" },
                    { value: "7 ngày", label: "Ra đơn" },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className="bg-slate-50 rounded-lg p-2.5 text-center"
                    >
                      <p className="font-heading font-bold text-slate-900 text-sm">
                        {stat.value}
                      </p>
                      <p className="text-slate-400 text-[10px] mt-0.5">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
                {/* Progress bar sample */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Module 1: Tìm sản phẩm</span>
                    <span className="text-green-600 font-medium">Hoàn thành</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full w-full" />
                  </div>
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Module 2: Xây landing page</span>
                    <span className="text-blue-600 font-medium">60%</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full w-3/5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Social proof mini card */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                MT
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-800">
                  Minh Tuấn
                </p>
                <p className="text-xs text-slate-500 truncate">
                  &ldquo;Ra đơn đầu tiên sau 5 ngày học. Không ngờ đơn giản vậy!&rdquo;
                </p>
              </div>
              <div className="text-amber-400 text-sm flex-shrink-0">⭐⭐⭐⭐⭐</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
