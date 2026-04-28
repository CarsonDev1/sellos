"use client";

import { motion, type Variants } from "framer-motion";

const STEPS = [
  {
    number: "01",
    icon: "📝",
    title: "Điền thông tin sản phẩm",
    description:
      "Tên sản phẩm, giá, target khách hàng, màu sắc thương hiệu — 1 form duy nhất, 5 phút.",
    time: "5 phút",
  },
  {
    number: "02",
    icon: "🎨",
    title: "Chọn template trên SellOS",
    description:
      "Xem live demo hàng chục mẫu landing page có sẵn. Filter theo ngành. Ưng mẫu nào → chọn.",
    time: "3 phút",
  },
  {
    number: "03",
    icon: "🤖",
    title: "Chat với AI ngay trên SellOS",
    description:
      "Prompt đã được điền sẵn thông tin của bạn. AI xây hệ thống ngay trong nền tảng — không cần mở tab khác, không cần tài khoản AI.",
    time: "1–2 giờ/ngày",
  },
  {
    number: "04",
    icon: "🚀",
    title: "Preview → Deploy → Nhận đơn",
    description:
      "Xem preview ngay trên web. Deploy 1 click. Hệ thống chạy thật, nhận đơn thật.",
    time: "< 5 phút",
  },
];

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-4 bg-white">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
            Đơn Giản Hơn Bạn Nghĩ
          </h2>
          <p className="text-slate-500 text-base max-w-lg mx-auto">
            4 bước. Tất cả diễn ra trong 1 nền tảng.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5"
        >
          {STEPS.map((step, i) => (
            <motion.div
              key={i}
              variants={item}
              className="relative p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-200 transition-all group"
            >
              {/* Step number */}
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-2xl group-hover:bg-blue-100 transition-colors">
                  {step.icon}
                </div>
                <span className="font-heading font-bold text-3xl text-slate-100 select-none">
                  {step.number}
                </span>
              </div>

              <h3 className="font-heading font-bold text-slate-900 text-lg mb-2 leading-snug">
                {step.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-4">
                {step.description}
              </p>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-600 text-xs font-medium">
                ⏱ {step.time}
              </span>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-10 text-slate-500 text-sm"
        >
          Tất cả diễn ra trong 1 nền tảng duy nhất.{" "}
          <span className="text-slate-700 font-medium">
            Không cần biết code. Không cần rời SellOS.
          </span>
        </motion.p>
      </div>
    </section>
  );
}
