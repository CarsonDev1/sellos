"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const STATS = [
  { value: "300+", label: "Clients đã tư vấn" },
  { value: "10", label: "Năm kinh nghiệm" },
  { value: "94%", label: "Tỷ lệ đạt mục tiêu" },
  { value: "1 tỷ+", label: "Doanh thu clients tạo ra" },
];

export default function CoachHero() {
  return (
    <section className="pt-24 pb-16 px-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-7"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-4 py-2 text-sm text-amber-400 font-semibold">
              🏆 Top Business Coach Vietnam 2024
            </div>

            <h1 className="font-heading font-bold text-white text-4xl sm:text-5xl lg:text-5xl leading-tight">
              Từ Startup Loay Hoay<br />
              Đến Doanh Thu<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                1 Tỷ / Tháng
              </span>
            </h1>

            <p className="text-slate-300 text-lg leading-relaxed max-w-lg">
              Tôi đã giúp 300+ doanh nhân Việt thoát khỏi vòng lặp &ldquo;cố gắng mà không lớn được&rdquo; — với lộ trình cá nhân hóa, cam kết kết quả rõ ràng.
            </p>

            {/* Proof points */}
            <ul className="space-y-2.5">
              {[
                "Phương pháp 3-layer đã kiểm chứng trên 300+ doanh nghiệp",
                "Cam kết hoàn tiền nếu không đạt mục tiêu sau 3 tháng",
                "Tư vấn 1-1, không nhóm lớn — focus 100% vào bạn",
              ].map((p) => (
                <li key={p} className="flex items-start gap-3 text-slate-300 text-sm">
                  <svg className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  {p}
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <Link
                href="/templates/coaching/dat-lich"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold px-8 py-4 rounded-2xl text-sm transition-all shadow-lg shadow-amber-500/30"
              >
                Đặt Discovery Call Miễn Phí
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <a
                href="#ket-qua"
                className="inline-flex items-center justify-center gap-2 border border-slate-600 text-slate-300 hover:border-amber-400 hover:text-amber-400 font-semibold px-7 py-4 rounded-2xl text-sm transition-all"
              >
                Xem kết quả clients
              </a>
            </div>

            <p className="text-slate-500 text-xs">
              Discovery call 30 phút · Hoàn toàn miễn phí · Không ép mua
            </p>
          </motion.div>

          {/* Right — Coach photo */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative flex justify-center"
          >
            <div className="relative">
              <div className="w-72 h-96 sm:w-80 sm:h-[420px] rounded-3xl overflow-hidden shadow-2xl shadow-black/40">
                <img
                  src="https://randomuser.me/api/portraits/men/34.jpg"
                  alt="Nguyễn Trọng Khoa — Business Coach"
                  className="w-full h-full object-cover object-top scale-110"
                />
                {/* Gradient overlay bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="text-white font-heading font-bold text-lg">Nguyễn Trọng Khoa</p>
                  <p className="text-amber-300 text-sm font-semibold">Business Coach · Forbes 30U30</p>
                </div>
              </div>

              {/* Floating cards */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute -left-6 top-12 bg-white rounded-2xl shadow-xl p-4 text-center"
              >
                <p className="font-heading font-bold text-2xl text-slate-900">300+</p>
                <p className="text-slate-500 text-xs">Clients tư vấn</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.65 }}
                className="absolute -right-6 top-40 bg-white rounded-2xl shadow-xl p-4 text-center"
              >
                <p className="font-heading font-bold text-2xl text-amber-600">94%</p>
                <p className="text-slate-500 text-xs">Đạt mục tiêu</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl shadow-xl px-5 py-3 flex items-center gap-2.5 whitespace-nowrap"
              >
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                <span className="text-white font-bold text-sm">4.9 / 5</span>
                <span className="text-white/80 text-xs">từ 240+ đánh giá</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-px mt-16 bg-slate-700 rounded-2xl overflow-hidden"
        >
          {STATS.map((s) => (
            <div key={s.label} className="bg-slate-800 px-6 py-5 text-center">
              <p className="font-heading font-bold text-2xl text-amber-400">{s.value}</p>
              <p className="text-slate-400 text-xs mt-1">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
