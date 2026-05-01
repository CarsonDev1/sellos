"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ShopNewsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  };

  return (
    <section className="py-20 px-4 bg-slate-900">
      <div className="container mx-auto max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-rose-400 text-sm font-semibold uppercase tracking-wider">Newsletter</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mt-3 mb-3">
            Nhận Ưu Đãi Độc Quyền
          </h2>
          <p className="text-slate-400 text-base mb-8">
            Đăng ký ngay — tặng ngay <span className="text-rose-400 font-semibold">10% cho đơn đầu tiên</span>. Thông báo sớm nhất khi có hàng mới và flash sale.
          </p>

          {submitted ? (
            <div className="bg-rose-900/30 border border-rose-500/30 rounded-2xl px-8 py-6 text-rose-300">
              <p className="text-2xl mb-2">🎉</p>
              <p className="font-semibold text-white">Đăng ký thành công!</p>
              <p className="text-sm mt-1">Code giảm 10% đã gửi vào email của bạn.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 px-5 py-3.5 bg-white/10 border border-white/20 text-white placeholder-slate-500 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all text-sm"
              />
              <button
                type="submit"
                className="px-7 py-3.5 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-semibold rounded-2xl transition-all shadow-lg shadow-rose-500/30 text-sm whitespace-nowrap"
              >
                Đăng ký ngay →
              </button>
            </form>
          )}

          <p className="text-slate-600 text-xs mt-4">
            Không spam. Có thể hủy đăng ký bất kỳ lúc nào.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
