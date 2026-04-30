"use client";

import { motion } from "framer-motion";

const VALUES = [
  { icon: "🎯", label: "Cam kết kết quả", desc: "Đặt mục tiêu số liệu cụ thể trước khi bắt đầu" },
  { icon: "🧩", label: "Cá nhân hóa 100%", desc: "Không công thức chung chung — đúng bối cảnh của bạn" },
  { icon: "🔍", label: "Minh bạch hoàn toàn", desc: "Báo cáo tiến độ hàng tuần, đo lường rõ ràng" },
  { icon: "🌱", label: "Tư duy dài hạn", desc: "Xây hệ thống, không chạy theo trend ngắn hạn" },
];

const CERTS = [
  { label: "ICF Certified Coach", sub: "International Coach Federation" },
  { label: "Forbes 30 Under 30", sub: "Vietnam 2019" },
  { label: "MBA — INSEAD", sub: "Business Strategy" },
];

export default function CoachAbout() {
  return (
    <section id="ve-toi" className="py-20 px-4 bg-white overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* Left — Photo + certs */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="rounded-3xl overflow-hidden shadow-xl shadow-amber-100/80">
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=85"
                alt="Nguyễn Trọng Khoa — Business Coach"
                className="w-full h-[420px] object-cover"
              />
            </div>
            {/* Certs */}
            <div className="absolute -bottom-6 -right-4 space-y-2 max-w-[200px]">
              {CERTS.map((c) => (
                <div key={c.label} className="bg-white shadow-lg rounded-xl px-4 py-2.5 border border-slate-100">
                  <p className="font-bold text-slate-900 text-xs">{c.label}</p>
                  <p className="text-slate-400 text-[11px]">{c.sub}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — Story */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            <div>
              <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-4 py-1.5 text-sm text-amber-700 font-semibold mb-4">
                🌾 Câu chuyện của tôi
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 leading-snug">
                Tôi Từng Là<br />
                <span className="text-amber-600">Startup Thất Bại</span>
              </h2>
            </div>

            <div className="space-y-4 text-slate-600 text-base leading-relaxed">
              <p>
                Năm 2012, tôi gần như phá sản sau 2 năm loay hoay với startup đầu tiên. Không phải vì thiếu effort — mà vì thiếu hệ thống và thiếu người dẫn đường đúng.
              </p>
              <p>
                Sau đó tôi tìm được mentor, học lại từ đầu về strategy và execution. 18 tháng sau, công ty thứ hai của tôi đạt 1 tỷ/tháng.
              </p>
              <p>
                Từ 2015, tôi dành toàn thời gian để làm điều mình ước mình có khi còn trẻ: trở thành người dẫn đường đó cho các doanh nhân Việt.
              </p>
            </div>

            {/* Values */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {VALUES.map((v) => (
                <div key={v.label} className="p-4 bg-amber-50/60 border border-amber-100 rounded-2xl">
                  <span className="text-xl">{v.icon}</span>
                  <p className="font-semibold text-slate-900 text-sm mt-2">{v.label}</p>
                  <p className="text-slate-500 text-xs mt-0.5 leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
