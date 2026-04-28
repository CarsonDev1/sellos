"use client";

import { motion, type Variants } from "framer-motion";

const PHASES = [
  {
    days: "Ngày 1–2",
    title: "Offer & Landing Page",
    accent: "blue",
    borderClass: "border-blue-200",
    bgClass: "bg-blue-50",
    textClass: "text-blue-600",
    dotClass: "bg-blue-500",
    steps: [
      "Điền thông tin sản phẩm vào SellOS",
      "Chọn template từ thư viện có sẵn",
      "AI viết toàn bộ nội dung theo sản phẩm của bạn",
      "Deploy lên domain riêng",
    ],
    output: "Landing page live trên domain của bạn",
  },
  {
    days: "Ngày 3–4",
    title: "Thu Thập & Tracking Khách Hàng",
    accent: "cyan",
    borderClass: "border-sky-200",
    bgClass: "bg-sky-50",
    textClass: "text-sky-600",
    dotClass: "bg-sky-500",
    steps: [
      "Gắn form thu thập thông tin lead",
      "Facebook Pixel + Google Analytics",
      "Kết nối Zalo OA / Messenger",
      "Tự động gửi thông báo đơn hàng",
    ],
    output: "Lead tự vào Sheets, thông báo tức thì",
  },
  {
    days: "Ngày 5–6",
    title: "AI Agent & Chatbot Bán Hàng",
    accent: "violet",
    borderClass: "border-violet-200",
    bgClass: "bg-violet-50",
    textClass: "text-violet-600",
    dotClass: "bg-violet-500",
    steps: [
      "Chat với AI trên SellOS để xây chatbot",
      "Train bot theo kịch bản chốt đơn",
      "Chatbot tư vấn và xử lý FAQ 24/7",
      "Tích hợp vào landing page",
    ],
    output: "Chatbot đang tư vấn khách tự động",
  },
  {
    days: "Ngày 7",
    title: "Kết Nối & Ra Mắt 🎉",
    accent: "green",
    borderClass: "border-green-200",
    bgClass: "bg-green-50",
    textClass: "text-green-600",
    dotClass: "bg-green-500",
    steps: [
      "Tích hợp cổng thanh toán SePay / MoMo",
      "Admin panel xem đơn + doanh thu real-time",
      "Setup email automation 5 bước tự chạy",
      "Checklist kiểm tra toàn hệ thống → Ra mắt",
    ],
    output: "Hệ thống live, sẵn sàng nhận đơn thật",
  },
];

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const item: Variants = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
};

export default function Roadmap() {
  return (
    <section id="roadmap" className="py-24 px-4 bg-slate-50">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
            7 Ngày — Từ 0 Đến Hệ Thống Chạy Thật
          </h2>
          <p className="text-slate-500 text-base max-w-lg mx-auto">
            Mỗi ngày chỉ 1–2 giờ. Làm xong giai đoạn này mới qua giai đoạn
            tiếp theo.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-4"
        >
          {PHASES.map((phase, i) => (
            <motion.div
              key={i}
              variants={item}
              className={`rounded-2xl border ${phase.borderClass} bg-white p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-5">
                {/* Phase label */}
                <div className="flex-shrink-0 sm:w-40">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${phase.bgClass} ${phase.textClass} mb-2`}
                  >
                    {phase.days}
                  </span>
                  <h3 className="font-heading font-bold text-slate-900 text-xl leading-tight">
                    {phase.title}
                  </h3>
                </div>

                {/* Steps */}
                <div className="flex-1">
                  <ul className="space-y-2.5 mb-5">
                    {phase.steps.map((step, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2.5 text-sm text-slate-600"
                      >
                        <span
                          className={`flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full ${phase.dotClass}`}
                        />
                        {step}
                      </li>
                    ))}
                  </ul>

                  {/* Output */}
                  <div className={`flex items-center gap-2.5 pt-4 border-t ${phase.borderClass}`}>
                    <span className="text-slate-400 text-xs uppercase tracking-wider font-medium">
                      Output:
                    </span>
                    <span className={`text-sm font-semibold ${phase.textClass}`}>
                      &quot;{phase.output}&quot;
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
