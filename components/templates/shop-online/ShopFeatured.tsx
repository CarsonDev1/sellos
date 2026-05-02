"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { PRODUCTS } from "./data";
import { useCart } from "./CartContext";

const TABS = [
  { id: "all", label: "Tất cả" },
  { id: "ao", label: "Áo" },
  { id: "quan", label: "Quần & Váy" },
  { id: "giay", label: "Giày" },
  { id: "phu-kien", label: "Phụ kiện" },
];

function ProductCard({ product, index }: { product: (typeof PRODUCTS)[0]; index: number }) {
  const { addItem } = useCart();
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07 }}
      className="group"
    >
      {/* Image */}
      <Link href={`/templates/shop-online/san-pham/${product.id}`} className="block relative overflow-hidden rounded-2xl bg-slate-100 aspect-[3/4] mb-3">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
          {product.badge && (
            <span className={`text-white text-[10px] font-bold px-2 py-0.5 rounded-lg ${product.badgeColor}`}>
              {product.badge}
            </span>
          )}
          {discount > 0 && (
            <span className="bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-lg">
              -{discount}%
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 hover:bg-rose-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-sm">
          <svg className="w-4 h-4 text-slate-500 hover:text-rose-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        {/* Quick add overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={(e) => { e.preventDefault(); addItem(product, product.colors[0], product.sizes[0]); }}
            className="w-full py-2.5 bg-white hover:bg-rose-600 hover:text-white text-slate-900 text-xs font-bold rounded-xl transition-all shadow-lg"
          >
            + Thêm vào giỏ
          </button>
        </div>
      </Link>

      {/* Info */}
      <div>
        <div className="flex gap-1.5 mb-1.5">
          {product.colors.slice(0, 4).map((c) => (
            <span key={c} className="w-3.5 h-3.5 rounded-full border border-slate-200 flex-shrink-0" style={{ backgroundColor: c }} />
          ))}
          {product.colors.length > 4 && <span className="text-[10px] text-slate-400">+{product.colors.length - 4}</span>}
        </div>

        <Link href={`/templates/shop-online/san-pham/${product.id}`}>
          <p className="text-sm font-semibold text-slate-900 hover:text-rose-600 transition-colors line-clamp-2 leading-snug">{product.name}</p>
        </Link>

        <div className="flex items-center gap-0.5 mt-1">
          {[...Array(5)].map((_, j) => (
            <svg key={j} className={`w-3 h-3 fill-current ${j < Math.floor(product.rating) ? "text-amber-400" : "text-slate-200"}`} viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="text-[10px] text-slate-400 ml-1">({product.reviewCount})</span>
        </div>

        <div className="flex items-center gap-2 mt-1">
          <span className="font-bold text-slate-900 text-sm">{product.price.toLocaleString("vi-VN")}₫</span>
          {product.originalPrice && (
            <span className="text-xs text-slate-400 line-through">{product.originalPrice.toLocaleString("vi-VN")}₫</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function ShopFeatured() {
  return (
    <section className="py-12 px-4 bg-slate-50">
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-rose-600 text-xs font-bold uppercase tracking-widest">Bán chạy nhất</p>
            <h2 className="font-heading font-bold text-slate-900 text-xl sm:text-2xl mt-0.5">Được Yêu Thích Nhất</h2>
          </div>
          <Link href="/templates/shop-online/danh-muc/ao" className="hidden sm:inline-flex text-sm text-rose-600 font-semibold hover:underline items-center gap-1">
            Xem tất cả <span>→</span>
          </Link>
        </div>

        {/* Tab filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
          {TABS.map((tab) => (
            <Link
              key={tab.id}
              href={tab.id === "all" ? "/templates/shop-online" : `/templates/shop-online/danh-muc/${tab.id}`}
              className="flex-shrink-0 px-4 py-2 text-sm font-semibold rounded-xl border border-slate-200 bg-white hover:border-rose-300 hover:text-rose-700 transition-all text-slate-600"
            >
              {tab.label}
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
          {PRODUCTS.slice(0, 8).map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/templates/shop-online/danh-muc/ao"
            className="inline-flex items-center gap-2 px-8 py-3 border-2 border-slate-300 hover:border-rose-400 text-slate-700 hover:text-rose-700 font-semibold rounded-2xl transition-all text-sm"
          >
            Xem thêm sản phẩm →
          </Link>
        </div>
      </div>
    </section>
  );
}
