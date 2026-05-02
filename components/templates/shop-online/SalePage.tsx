"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { PRODUCTS } from "./data";
import { useCart } from "./CartContext";

function useCountdown(target: Date) {
  const calc = () => {
    const diff = Math.max(0, target.getTime() - Date.now());
    return {
      d: Math.floor(diff / 86400000),
      h: Math.floor((diff % 86400000) / 3600000),
      m: Math.floor((diff % 3600000) / 60000),
      s: Math.floor((diff % 60000) / 1000),
    };
  };
  const [t, setT] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return t;
}

export default function SalePage() {
  const target = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
  const { d, h, m, s } = useCountdown(target);
  const { addItem } = useCart();

  const saleProducts = PRODUCTS.filter((p) => p.originalPrice);

  return (
    <div className="min-h-screen bg-white pt-[88px]">
      {/* Sale hero banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 py-12 px-4">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-8 text-[120px] font-black text-white select-none leading-none">50%</div>
          <div className="absolute bottom-0 right-8 text-[120px] font-black text-white select-none leading-none">OFF</div>
        </div>

        <div className="container mx-auto max-w-4xl relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white text-sm font-bold px-4 py-1.5 rounded-full mb-4">
              🔥 Flash Sale — Kết thúc sau
            </span>

            <h1 className="font-heading font-black text-white text-4xl sm:text-5xl lg:text-6xl mb-2">
              SALE ĐẾN 50%
            </h1>
            <p className="text-white/80 mb-6 text-base">
              Hàng ngàn mẫu thời trang giảm giá — dùng code{" "}
              <span className="font-black text-white bg-white/20 px-2 py-0.5 rounded-lg">NOVA30</span>{" "}
              để giảm thêm 30%
            </p>

            {/* Countdown */}
            <div className="flex items-center justify-center gap-3">
              {[
                { value: d, label: "Ngày" },
                { value: h, label: "Giờ" },
                { value: m, label: "Phút" },
                { value: s, label: "Giây" },
              ].map(({ value, label }, i) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="flex flex-col items-center">
                    <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl w-14 h-14 flex items-center justify-center">
                      <span className="font-heading font-black text-white text-2xl tabular-nums">{String(value).padStart(2, "0")}</span>
                    </div>
                    <span className="text-white/70 text-xs mt-1">{label}</span>
                  </div>
                  {i < 3 && <span className="text-white/50 font-bold text-xl mb-4">:</span>}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="container mx-auto max-w-7xl px-4 py-4">
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <Link href="/templates/shop-online" className="hover:text-rose-600 transition-colors">Trang chủ</Link>
          <span>/</span>
          <span className="text-slate-700 font-semibold text-rose-600">Sale 🔥</span>
        </div>
      </div>

      {/* Products */}
      <div className="container mx-auto max-w-7xl px-4 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading font-bold text-slate-900 text-xl">{saleProducts.length} sản phẩm đang giảm giá</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
          {saleProducts.map((product, i) => {
            const discount = product.originalPrice
              ? Math.round((1 - product.price / product.originalPrice) * 100)
              : 0;
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="group"
              >
                <Link href={`/templates/shop-online/san-pham/${product.id}`} className="block relative overflow-hidden rounded-2xl bg-slate-100 aspect-[3/4] mb-3">
                  <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
                    <span className="bg-rose-600 text-white text-xs font-black px-2.5 py-1 rounded-lg">-{discount}%</span>
                  </div>
                  <div className="absolute top-2.5 right-2.5">
                    <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-lg">SALE</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <button
                      onClick={(e) => { e.preventDefault(); addItem(product, product.colors[0], product.sizes[0]); }}
                      className="w-full py-2.5 bg-white hover:bg-rose-600 hover:text-white text-slate-900 text-xs font-bold rounded-xl transition-all shadow-lg"
                    >
                      + Thêm vào giỏ
                    </button>
                  </div>
                </Link>

                <div className="flex gap-1.5 mb-1.5">
                  {product.colors.slice(0, 4).map((c) => (
                    <span key={c} className="w-3.5 h-3.5 rounded-full border border-slate-200" style={{ backgroundColor: c }} />
                  ))}
                </div>
                <Link href={`/templates/shop-online/san-pham/${product.id}`}>
                  <p className="text-sm font-semibold text-slate-900 hover:text-rose-600 transition-colors line-clamp-2 leading-snug">{product.name}</p>
                </Link>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-black text-rose-600 text-sm">{product.price.toLocaleString("vi-VN")}₫</span>
                  {product.originalPrice && (
                    <span className="text-xs text-slate-400 line-through">{product.originalPrice.toLocaleString("vi-VN")}₫</span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Promo code reminder */}
        <div className="mt-12 bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-200 rounded-3xl p-6 sm:p-8 text-center">
          <h3 className="font-heading font-bold text-slate-900 text-xl mb-2">Tiết kiệm thêm với mã giảm giá</h3>
          <p className="text-slate-500 mb-4">Áp dụng khi thanh toán tại giỏ hàng</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { code: "NOVA30", desc: "Giảm 30% toàn đơn" },
              { code: "NOVA10", desc: "Giảm 10% toàn đơn" },
              { code: "SALE50", desc: "Giảm 50% toàn đơn" },
            ].map((c) => (
              <div key={c.code} className="bg-white border-2 border-dashed border-rose-300 rounded-2xl px-6 py-3 text-center">
                <p className="font-black text-rose-600 text-lg tracking-wider">{c.code}</p>
                <p className="text-xs text-slate-500">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
