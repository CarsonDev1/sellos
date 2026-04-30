"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const PLANS = [
  {
    name: "Starter",
    price: "4.900.000",
    per: "/ tháng",
    desc: "Bắt đầu với coaching nhóm nhỏ",
    badge: null,
    features: [
      "Coaching nhóm 4 buổi / tháng",
      "Tối đa 6 người / nhóm",
      "Community Slack + tài liệu",
      "Accountability check-in hàng tuần",
      "Review case study thực tế",
    ],
    cta: "Bắt Đầu Starter",
    highlight: false,
  },
  {
    name: "Growth",
    price: "9.900.000",
    per: "/ tháng",
    desc: "Coaching 1-1 — được chọn nhiều nhất",
    badge: "Phổ biến nhất",
    features: [
      "4 buổi 1-1 coaching / tháng",
      "Lộ trình 90 ngày cá nhân hóa",
      "WhatsApp support không giới hạn",
      "Review strategy hàng tháng",
      "Cam kết hoàn tiền nếu miss KPI",
      "Ghi hình tất cả buổi coaching",
    ],
    cta: "Chọn Growth",
    highlight: true,
  },
  {
    name: "VIP",
    price: "24.000.000",
    per: "/ tháng",
    desc: "Full access — cho doanh nhân nghiêm túc",
    badge: null,
    features: [
      "8 buổi 1-1 coaching / tháng",
      "Hotline trực tiếp 24/7",
      "1 VIP Intensive day / quý",
      "Intro network với investors / partners",
      "Priority slot booking",
      "Mọi thứ trong Growth",
    ],
    cta: "Liên Hệ VIP",
    highlight: false,
  },
];

export default function CoachPricing() {
  return (
    <section id="gia" className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-4 py-1.5 text-sm text-amber-700 font-semibold mb-4">
            💰 Bảng giá minh bạch
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
            Đầu Tư Vào Bản Thân —<br />
            <span className="text-amber-600">ROI Cao Nhất Bạn Từng Làm</span>
          </h2>
          <p className="text-slate-500 text-base max-w-lg mx-auto">
            Mọi gói đều bao gồm Discovery Call miễn phí để đảm bảo chúng ta phù hợp với nhau trước khi cam kết.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {PLANS.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-3xl border p-6 flex flex-col ${
                p.highlight
                  ? "bg-gradient-to-br from-amber-500 to-orange-600 border-amber-500 text-white shadow-xl shadow-amber-200/60 scale-105"
                  : "bg-white border-slate-200 hover:border-amber-300 hover:shadow-md transition-all"
              }`}
            >
              {p.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs font-bold px-4 py-1.5 rounded-full whitespace-nowrap">
                  {p.badge}
                </span>
              )}

              <div className="mb-5">
                <p className={`font-heading font-bold text-lg ${p.highlight ? "text-white" : "text-slate-900"}`}>{p.name}</p>
                <p className={`text-xs mt-0.5 ${p.highlight ? "text-amber-100" : "text-slate-400"}`}>{p.desc}</p>
                <div className="flex items-baseline gap-1 mt-3">
                  <span className={`font-heading font-bold text-3xl ${p.highlight ? "text-white" : "text-slate-900"}`}>{p.price}₫</span>
                  <span className={`text-sm ${p.highlight ? "text-amber-200" : "text-slate-400"}`}>{p.per}</span>
                </div>
              </div>

              <ul className="space-y-2.5 flex-1 mb-6">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <svg className={`w-4 h-4 flex-shrink-0 mt-0.5 ${p.highlight ? "text-amber-200" : "text-amber-500"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className={p.highlight ? "text-amber-50" : "text-slate-600"}>{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/templates/coaching/dat-lich"
                className={`w-full py-3 rounded-xl text-sm font-bold text-center transition-colors ${
                  p.highlight
                    ? "bg-white text-amber-700 hover:bg-amber-50"
                    : "bg-amber-600 text-white hover:bg-amber-700"
                }`}
              >
                {p.cta}
              </Link>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-slate-400 text-sm mt-8">
          Tất cả gói · Discovery Call miễn phí · Hợp đồng minh bạch · Hoàn tiền nếu không đạt KPI
        </p>
      </div>
    </section>
  );
}
