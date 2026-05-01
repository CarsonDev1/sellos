"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function useCountdown(targetDate: Date) {
  const calc = () => {
    const diff = Math.max(0, targetDate.getTime() - Date.now());
    return {
      d: Math.floor(diff / 86400000),
      h: Math.floor((diff % 86400000) / 3600000),
      m: Math.floor((diff % 3600000) / 60000),
      s: Math.floor((diff % 60000) / 1000),
    };
  };

  const [time, setTime] = useState(calc);

  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return time;
}

function Digit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-white/20 backdrop-blur-sm rounded-xl w-14 h-14 flex items-center justify-center border border-white/30">
        <span className="font-heading font-bold text-white text-2xl tabular-nums">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="text-white/70 text-xs mt-1 font-medium">{label}</span>
    </div>
  );
}

export default function ShopSaleBanner() {
  const target = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
  const { d, h, m, s } = useCountdown(target);

  return (
    <section id="sale" className="py-20 px-4 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 left-10 text-9xl font-bold text-white select-none">SALE</div>
        <div className="absolute bottom-4 right-10 text-9xl font-bold text-white select-none">50%</div>
      </div>

      <div className="container mx-auto max-w-4xl relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            🔥 Flash Sale — Chỉ còn
          </span>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
            Giảm Đến 50% Toàn Bộ
          </h2>
          <p className="text-white/80 text-base mb-8">
            Dùng code <span className="font-bold text-white bg-white/20 px-2 py-0.5 rounded-lg">NOVA30</span> để giảm thêm 30% cho đơn từ 500k
          </p>

          {/* Countdown */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <Digit value={d} label="Ngày" />
            <span className="text-white/60 font-bold text-2xl mb-5">:</span>
            <Digit value={h} label="Giờ" />
            <span className="text-white/60 font-bold text-2xl mb-5">:</span>
            <Digit value={m} label="Phút" />
            <span className="text-white/60 font-bold text-2xl mb-5">:</span>
            <Digit value={s} label="Giây" />
          </div>

          <a
            href="#san-pham-moi"
            className="inline-flex items-center gap-2 bg-white text-rose-600 hover:bg-rose-50 font-bold px-8 py-4 rounded-2xl transition-all shadow-xl text-base"
          >
            Mua ngay trước khi hết →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
