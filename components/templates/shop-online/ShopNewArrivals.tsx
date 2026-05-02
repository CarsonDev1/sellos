"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { PRODUCTS } from "./data";
import { useCart } from "./CartContext";

const NEW_IDS = ["ao-02", "ao-03", "quan-02", "pk-02"];

export default function ShopNewArrivals() {
  const { addItem } = useCart();
  const newItems = PRODUCTS.filter((p) => NEW_IDS.includes(p.id));

  return (
    <section className="py-12 px-4 bg-white">
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-blue-600 text-xs font-bold uppercase tracking-widest">Mới về tuần này</p>
            <h2 className="font-heading font-bold text-slate-900 text-xl sm:text-2xl mt-0.5">Hàng Mới Vừa Về</h2>
          </div>
          <Link href="/templates/shop-online/danh-muc/ao" className="hidden sm:inline-flex text-sm text-blue-600 font-semibold hover:underline items-center gap-1">
            Xem tất cả →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 lg:gap-5">
          {newItems.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <Link href={`/templates/shop-online/san-pham/${product.id}`} className="block relative overflow-hidden rounded-2xl bg-slate-100 aspect-[3/4] mb-3">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2.5 left-2.5 bg-blue-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-lg">NEW</span>
                <button
                  className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-sm"
                >
                  <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
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
                <span className="font-bold text-slate-900 text-sm">{product.price.toLocaleString("vi-VN")}₫</span>
                {product.originalPrice && (
                  <span className="text-xs text-slate-400 line-through">{product.originalPrice.toLocaleString("vi-VN")}₫</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
