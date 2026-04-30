"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const SERVICES = [
  {
    icon: "🎯",
    name: "Tư Vấn 1-1",
    tag: "Phổ biến nhất",
    tagColor: "bg-amber-500 text-white",
    price: "5.000.000₫",
    per: "/ tháng",
    desc: "Coaching cá nhân hoá hoàn toàn cho doanh nhân muốn đột phá trong 3–6 tháng",
    features: [
      "4 buổi coaching 60 phút / tháng",
      "Lộ trình 90 ngày cá nhân hóa",
      "WhatsApp support không giới hạn",
      "Review strategy hàng tháng",
      "Cam kết hoàn tiền nếu không đạt KPI",
    ],
    cta: "Đăng Ký 1-1",
    highlight: true,
  },
  {
    icon: "👥",
    name: "Coaching Nhóm",
    tag: "Tiết kiệm nhất",
    tagColor: "bg-slate-700 text-white",
    price: "2.500.000₫",
    per: "/ tháng",
    desc: "Nhóm tối đa 6 người — học từ case của nhau, mastermind format",
    features: [
      "4 buổi nhóm 90 phút / tháng",
      "Tối đa 6 thành viên / nhóm",
      "Community Slack riêng",
      "Tài liệu & framework độc quyền",
      "Peer learning + accountability",
    ],
    cta: "Tham Gia Nhóm",
    highlight: false,
  },
  {
    icon: "⚡",
    name: "VIP Intensive",
    tag: "Hiệu quả nhất",
    tagColor: "bg-orange-500 text-white",
    price: "15.000.000₫",
    per: "/ ngày",
    desc: "1 ngày full-day làm việc cùng nhau — chiến lược, kế hoạch, và action plan hoàn chỉnh",
    features: [
      "8 tiếng làm việc tập trung",
      "Audit toàn bộ business hiện tại",
      "Xây lộ trình 12 tháng chi tiết",
      "Follow-up 2 tuần sau",
      "Ghi hình toàn bộ buổi làm việc",
    ],
    cta: "Đặt Lịch VIP",
    highlight: false,
  },
];

export default function CoachServices() {
  return (
    <section id="dich-vu" className="py-20 px-4 bg-slate-50">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 bg-white border border-amber-200 rounded-full px-4 py-1.5 text-sm text-amber-700 font-semibold mb-4">
            🎯 Dịch vụ coaching
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
            Chọn Hình Thức<br />
            <span className="text-amber-600">Phù Hợp Với Bạn</span>
          </h2>
          <p className="text-slate-500 text-base max-w-lg mx-auto">
            Không có gói nào cho tất cả — tôi cùng bạn xác định hình thức phù hợp nhất trong Discovery Call.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {SERVICES.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-3xl border p-6 flex flex-col transition-all ${
                s.highlight
                  ? "bg-gradient-to-br from-amber-500 to-orange-600 border-amber-500 text-white shadow-xl shadow-amber-200/60 scale-105"
                  : "bg-white border-slate-200 hover:border-amber-300 hover:shadow-md"
              }`}
            >
              <span className={`inline-flex items-center self-start text-xs font-bold px-2.5 py-1 rounded-full mb-4 ${s.tagColor}`}>
                {s.tag}
              </span>

              <div className="text-3xl mb-3">{s.icon}</div>
              <h3 className={`font-heading font-bold text-xl mb-1 ${s.highlight ? "text-white" : "text-slate-900"}`}>{s.name}</h3>
              <p className={`text-sm mb-4 leading-relaxed flex-0 ${s.highlight ? "text-amber-100" : "text-slate-500"}`}>{s.desc}</p>

              <div className="flex items-baseline gap-1 mb-5">
                <span className={`font-heading font-bold text-3xl ${s.highlight ? "text-white" : "text-slate-900"}`}>{s.price}</span>
                <span className={`text-sm ${s.highlight ? "text-amber-200" : "text-slate-400"}`}>{s.per}</span>
              </div>

              <ul className="space-y-2.5 flex-1 mb-6">
                {s.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <svg className={`w-4 h-4 flex-shrink-0 mt-0.5 ${s.highlight ? "text-amber-200" : "text-amber-500"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className={s.highlight ? "text-amber-50" : "text-slate-600"}>{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/templates/coaching/dat-lich"
                className={`w-full py-3 rounded-xl text-sm font-bold text-center transition-colors ${
                  s.highlight
                    ? "bg-white text-amber-700 hover:bg-amber-50"
                    : "bg-amber-600 text-white hover:bg-amber-700"
                }`}
              >
                {s.cta}
              </Link>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-slate-400 text-sm mt-8">
          Chưa chắc gói nào phù hợp? · <Link href="/templates/coaching/dat-lich" className="text-amber-600 font-semibold hover:underline">Discovery Call miễn phí 30 phút</Link> · Tôi sẽ giúp bạn chọn đúng
        </p>
      </div>
    </section>
  );
}
