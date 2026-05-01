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
    <section id="san-pham-moi" className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <span className="text-rose-600 text-sm font-semibold uppercase tracking-wider">Mới về tuần này</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mt-1">
              Hàng Mới Vừa Về
            </h2>
          </div>
          <Link href="#danh-muc" className="hidden sm:inline-flex text-sm text-rose-600 font-semibold hover:underline">
            Xem tất cả →
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          {newItems.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-lg hover:border-rose-100 transition-all hover:-translate-y-1"
            >
              <Link href={`/templates/shop-online/san-pham/${product.id}`} className="block relative overflow-hidden aspect-[3/4]">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-2.5 left-2.5 bg-blue-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  NEW
                </span>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
              </Link>

              <div className="p-3">
                <p className="text-xs text-slate-400 mb-0.5">{product.categoryLabel}</p>
                <Link href={`/templates/shop-online/san-pham/${product.id}`}>
                  <p className="font-heading font-semibold text-slate-900 text-sm leading-snug hover:text-rose-700 transition-colors line-clamp-2">
                    {product.name}
                  </p>
                </Link>

                <div className="flex items-center gap-1 mt-1">
                  <svg className="w-3 h-3 text-amber-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-xs text-slate-500">{product.rating} ({product.reviewCount})</span>
                </div>

                <div className="flex items-center justify-between mt-2">
                  <div>
                    <span className="font-bold text-slate-900 text-sm">{product.price.toLocaleString("vi-VN")}₫</span>
                    {product.originalPrice && (
                      <span className="text-xs text-slate-400 line-through ml-1.5">
                        {product.originalPrice.toLocaleString("vi-VN")}₫
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => addItem(product, product.colors[0], product.sizes[0])}
                  className="mt-2.5 w-full py-2 text-xs font-semibold text-rose-600 border border-rose-200 hover:bg-rose-600 hover:text-white hover:border-rose-600 rounded-xl transition-all"
                >
                  + Thêm vào giỏ
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
