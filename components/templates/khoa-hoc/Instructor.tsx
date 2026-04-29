"use client";

import { motion } from "framer-motion";

const CREDENTIALS = [
  "Founder SellOS — nền tảng AI bán hàng #1 Việt Nam",
  "Đã giúp 500+ doanh nghiệp nhỏ có hệ thống bán hàng tự động",
  "8 năm kinh nghiệm trong lĩnh vực e-commerce và digital marketing",
  "Cựu Product Manager tại Top 3 sàn thương mại điện tử Đông Nam Á",
];

const STATS = [
  { value: "500+", label: "Học viên thành công" },
  { value: "8 năm", label: "Kinh nghiệm" },
  { value: "4.9★", label: "Đánh giá trung bình" },
];

export default function Instructor() {
  return (
    <section className="py-20 px-4 bg-slate-50">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-1.5 text-sm text-blue-700 font-medium mb-4">
            👨‍🏫 Giảng viên
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900">
            Người Sẽ Đồng Hành Cùng Bạn
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Avatar & name */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-10 flex flex-col items-center justify-center text-center text-white space-y-4">
              <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white/40 shadow-xl">
                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Nguyễn Thành Nam" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-2xl">
                  Nguyễn Thành Nam
                </h3>
                <p className="text-blue-200 text-sm mt-1">Founder & CEO, SellOS</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 w-full mt-4 pt-4 border-t border-white/20">
                {STATS.map((s, i) => (
                  <div key={i} className="text-center">
                    <p className="font-heading font-bold text-xl">{s.value}</p>
                    <p className="text-blue-200 text-[11px] mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bio */}
            <div className="p-8 md:p-10 space-y-6">
              <div>
                <p className="text-slate-600 leading-relaxed text-sm">
                  Tôi từng là người không biết code, không có vốn lớn, chỉ có ý
                  tưởng và ý chí. Mất 2 năm mò mẫm, thất bại nhiều lần, trước
                  khi tìm ra công thức giúp tôi có đơn hàng đầu tiên rồi nhân
                  rộng lên hàng trăm đơn mỗi tháng.
                </p>
                <p className="text-slate-600 leading-relaxed text-sm mt-3">
                  SellOS được sinh ra để rút ngắn hành trình đó — từ 2 năm xuống
                  còn <strong className="text-slate-800">7 ngày</strong>. Khóa
                  học này là tổng hợp tất cả những gì tôi biết, được đóng gói để
                  bạn có thể làm theo ngay hôm nay.
                </p>
              </div>

              <ul className="space-y-3">
                {CREDENTIALS.map((c, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span className="text-slate-700 text-sm">{c}</span>
                  </li>
                ))}
              </ul>

              <div className="flex gap-3 pt-2">
                <a
                  href="#"
                  className="text-sm text-blue-600 hover:underline font-medium"
                >
                  Facebook →
                </a>
                <a
                  href="#"
                  className="text-sm text-blue-600 hover:underline font-medium"
                >
                  LinkedIn →
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
