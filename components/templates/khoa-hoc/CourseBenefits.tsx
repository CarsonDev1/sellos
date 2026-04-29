"use client";

import { motion, type Variants } from "framer-motion";

const BENEFITS = [
  {
    icon: "🤖",
    title: "Hệ thống AI tự động",
    desc: "AI xây landing page, chatbot, email chỉ từ thông tin bạn cung cấp. Không cần code.",
    color: "bg-blue-50 border-blue-100",
    iconBg: "bg-blue-100",
  },
  {
    icon: "🎓",
    title: "Mentor 1-1 đồng hành",
    desc: "Gói VIP có mentor review hệ thống của bạn mỗi ngày trong suốt 7 ngày.",
    color: "bg-violet-50 border-violet-100",
    iconBg: "bg-violet-100",
  },
  {
    icon: "🚀",
    title: "Landing page chuyển đổi cao",
    desc: "Template tối ưu CRO, tích hợp Google Analytics, Facebook Pixel sẵn sàng.",
    color: "bg-rose-50 border-rose-100",
    iconBg: "bg-rose-100",
  },
  {
    icon: "💬",
    title: "Chatbot tư vấn 24/7",
    desc: "Chatbot được train theo sản phẩm của bạn — trả lời khách, chốt đơn tự động.",
    color: "bg-amber-50 border-amber-100",
    iconBg: "bg-amber-100",
  },
  {
    icon: "📧",
    title: "Email automation",
    desc: "Chuỗi email nuôi dưỡng khách hàng tự động — tăng tỷ lệ mua lại không cần thêm quảng cáo.",
    color: "bg-teal-50 border-teal-100",
    iconBg: "bg-teal-100",
  },
  {
    icon: "👥",
    title: "Cộng đồng học viên",
    desc: "Tham gia group riêng với 1,000+ học viên — hỏi đáp, chia sẻ kinh nghiệm, cùng nhau phát triển.",
    color: "bg-green-50 border-green-100",
    iconBg: "bg-green-100",
  },
];

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function CourseBenefits() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-1.5 text-sm text-blue-700 font-medium mb-4">
            ✦ Tại sao chọn khóa học này?
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
            Tất Cả Công Cụ Bạn Cần — Trong Một Khóa Học
          </h2>
          <p className="text-slate-500 text-base max-w-xl mx-auto">
            Không chỉ học lý thuyết. Bạn sẽ có hệ thống bán hàng thật sự chạy
            được ngay sau khóa học.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {BENEFITS.map((b, i) => (
            <motion.div
              key={i}
              variants={item}
              className={`rounded-2xl border p-6 ${b.color} transition-all hover:shadow-md hover:-translate-y-0.5`}
            >
              <div
                className={`w-12 h-12 rounded-xl ${b.iconBg} flex items-center justify-center text-2xl mb-4`}
              >
                {b.icon}
              </div>
              <h3 className="font-heading font-semibold text-slate-900 text-base mb-2">
                {b.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
