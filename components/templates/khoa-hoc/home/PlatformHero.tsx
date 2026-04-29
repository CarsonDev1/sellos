"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const POPULAR = ["Bán hàng online", "Facebook Ads", "Email marketing", "Shopee"];

export default function PlatformHero() {
  return (
    <section className="pt-24 pb-16 bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl -translate-y-1/3 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />

      <div className="relative container mx-auto max-w-7xl px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 rounded-full px-4 py-1.5 text-sm text-blue-300 font-medium">
              ✦ 1,200+ học viên đang học ngay hôm nay
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Học Kỹ Năng Bán Hàng Online —<br />
              <span className="text-blue-400">Phát Triển Sự Nghiệp</span>
            </h1>

            <p className="text-slate-300 text-lg max-w-xl mx-auto">
              Khóa học thực chiến từ chuyên gia hàng đầu. Học theo tốc độ của bạn, áp dụng ngay từ bài đầu tiên.
            </p>

            {/* Search bar */}
            <div className="flex max-w-xl mx-auto bg-white rounded-xl overflow-hidden shadow-2xl shadow-blue-900/40">
              <input
                type="text"
                placeholder="Bạn muốn học gì?"
                defaultValue=""
                className="flex-1 px-5 py-4 text-slate-900 text-sm focus:outline-none"
              />
              <Link
                href="/templates/khoa-hoc/course/ban-hang-online"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 text-sm flex items-center transition-colors"
              >
                Tìm kiếm
              </Link>
            </div>

            {/* Popular searches */}
            <div className="flex flex-wrap justify-center gap-2 text-sm">
              <span className="text-slate-400">Phổ biến:</span>
              {POPULAR.map((tag) => (
                <Link
                  key={tag}
                  href="/templates/khoa-hoc/course/ban-hang-online"
                  className="text-blue-300 hover:text-blue-200 hover:underline transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-8 mt-12 pt-12 border-t border-white/10"
          >
            {[
              { value: "1,200+", label: "Học viên" },
              { value: "15+", label: "Khóa học" },
              { value: "4.9★", label: "Đánh giá trung bình" },
              { value: "500+", label: "Đơn hàng đầu tiên" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <p className="font-heading font-bold text-2xl text-white">{s.value}</p>
                <p className="text-slate-400 text-sm mt-0.5">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
