"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const PLANS = [
  {
    name: "Gói Cơ Bản",
    price: "299.000",
    per: "/ tuần",
    desc: "Phù hợp cho 1–2 người",
    features: ["5 loại rau củ theo mùa", "500g–1kg / loại", "Giao 1 lần / tuần", "Đổi trả miễn phí"],
    cta: "Bắt đầu dùng thử",
    highlight: false,
  },
  {
    name: "Gói Gia Đình",
    price: "549.000",
    per: "/ tuần",
    desc: "Lý tưởng cho 3–5 người",
    features: ["10 loại rau củ quả", "1kg–2kg / loại", "Giao 2 lần / tuần", "Tặng thảo mộc tươi", "Tiết kiệm 15%"],
    cta: "Chọn gói này",
    highlight: true,
    badge: "Phổ biến nhất",
  },
  {
    name: "Gói Premium",
    price: "899.000",
    per: "/ tuần",
    desc: "Cho người yêu thích đa dạng",
    features: ["20+ loại sản phẩm", "Ưu tiên hàng theo mùa", "Giao 3 lần / tuần", "Tư vấn dinh dưỡng 1-1", "Tiết kiệm 20%"],
    cta: "Liên hệ tư vấn",
    highlight: false,
  },
];

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      {/* Weekly Plans */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-4 py-1.5 text-sm text-green-700 font-semibold mb-4">
              📦 Gói đặt hàng tuần
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
              Đặt Một Lần — Tươi Sạch Cả Tuần
            </h2>
            <p className="text-slate-500 text-base max-w-lg mx-auto">
              Tự chọn danh mục, điều chỉnh số lượng, tạm dừng bất kỳ lúc nào. Không ràng buộc hợp đồng.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {PLANS.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative rounded-3xl border p-6 flex flex-col ${
                  plan.highlight
                    ? "bg-green-600 border-green-600 text-white shadow-xl shadow-green-200/60 scale-105"
                    : "bg-white border-slate-200 text-slate-900 hover:border-green-300 hover:shadow-md transition-all"
                }`}
              >
                {plan.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-900 text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                    {plan.badge}
                  </span>
                )}
                <div className="mb-5">
                  <p className={`font-heading font-bold text-lg ${plan.highlight ? "text-white" : "text-slate-900"}`}>{plan.name}</p>
                  <p className={`text-xs mt-0.5 ${plan.highlight ? "text-green-200" : "text-slate-400"}`}>{plan.desc}</p>
                  <div className="flex items-baseline gap-1 mt-3">
                    <span className={`font-heading font-bold text-3xl ${plan.highlight ? "text-white" : "text-slate-900"}`}>{plan.price}₫</span>
                    <span className={`text-sm ${plan.highlight ? "text-green-200" : "text-slate-400"}`}>{plan.per}</span>
                  </div>
                </div>
                <ul className="space-y-2.5 flex-1 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <svg className={`w-4 h-4 flex-shrink-0 ${plan.highlight ? "text-green-200" : "text-green-500"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className={plan.highlight ? "text-green-50" : "text-slate-600"}>{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-xl text-sm font-bold transition-colors ${
                    plan.highlight
                      ? "bg-white text-green-700 hover:bg-green-50"
                      : "bg-green-600 text-white hover:bg-green-700"
                  }`}
                >
                  {plan.cta}
                </button>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-slate-400 text-sm mt-8">
            Tạm dừng hoặc huỷ bất kỳ lúc nào · Giao hàng miễn phí mọi gói · Đổi trả trong 24h
          </p>
        </div>
      </section>

      {/* Newsletter */}
      <section id="lien-he" className="py-16 px-4 bg-gradient-to-br from-green-700 to-emerald-800 text-white">
        <div className="container mx-auto max-w-3xl text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-4xl mb-4">🌿</div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-2">
              Nhận Ưu Đãi & Thực Đơn Healthy Hàng Tuần
            </h2>
            <p className="text-green-200 text-sm">
              Mỗi thứ Hai: công thức nấu ăn từ đầu bếp, ưu đãi thành viên và tin tức nông trại. Miễn phí.
            </p>
          </motion.div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/10 border border-white/20 rounded-2xl px-8 py-6"
            >
              <p className="text-xl font-bold">🎉 Đăng ký thành công!</p>
              <p className="text-green-200 text-sm mt-1">Kiểm tra email để nhận ưu đãi 10% cho đơn đầu tiên.</p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                className="flex-1 px-4 py-3.5 rounded-xl text-slate-900 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button
                onClick={() => email && setSubmitted(true)}
                className="bg-amber-400 hover:bg-amber-500 text-amber-900 font-bold px-6 py-3.5 rounded-xl text-sm transition-colors whitespace-nowrap shadow-lg"
              >
                Đăng ký — Tặng 10%
              </button>
            </motion.div>
          )}
          <p className="text-green-300 text-xs">Đã có 5,800+ người đăng ký · Không spam · Huỷ bất kỳ lúc nào</p>
        </div>
      </section>
    </>
  );
}
