"use client";

import { motion } from "framer-motion";

const STEPS = [
  {
    n: "01",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: "Đăng ký miễn phí",
    desc: "Điền form ngắn 2 phút — chia sẻ tình hình hiện tại và mục tiêu bạn muốn đạt được.",
  },
  {
    n: "02",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
      </svg>
    ),
    title: "Discovery Call 30 phút",
    desc: "Tôi lắng nghe và phân tích bottleneck thực sự của bạn. Không bán hàng — chỉ chẩn đoán.",
  },
  {
    n: "03",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
    title: "Xây lộ trình cùng nhau",
    desc: "Chúng ta thiết kế kế hoạch 90 ngày với KPI rõ ràng, milestone đo được, và ưu tiên đúng.",
  },
  {
    n: "04",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    title: "Thực thi & đo kết quả",
    desc: "Coaching đều đặn, accountability hàng tuần, và điều chỉnh linh hoạt theo kết quả thực tế.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-full px-4 py-1.5 text-sm text-slate-600 font-semibold mb-4">
            ⚙️ Quy trình làm việc
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
            Từ Cuộc Gọi Đầu Tiên<br />
            <span className="text-amber-600">Đến Kết Quả Thật</span>
          </h2>
          <p className="text-slate-500 text-base max-w-md mx-auto">
            4 bước đơn giản — nhưng được thiết kế để tạo ra sự thay đổi thật sự.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-14 left-[16.66%] right-[16.66%] h-0.5 bg-gradient-to-r from-amber-200 via-amber-400 to-orange-400" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {STEPS.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="text-center"
              >
                {/* Icon circle */}
                <div className="relative inline-flex w-28 h-28 rounded-full bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 items-center justify-center mb-5">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-lg shadow-amber-200">
                    {s.icon}
                  </div>
                  <span className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
                    {s.n}
                  </span>
                </div>
                <h3 className="font-heading font-bold text-slate-900 text-base mb-2">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
