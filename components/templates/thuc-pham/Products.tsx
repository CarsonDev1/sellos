"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { id: "all", label: "Tất cả" },
  { id: "rau", label: "Rau xanh" },
  { id: "cu-qua", label: "Củ & Quả" },
  { id: "trai-cay", label: "Trái cây" },
  { id: "hat-ngu-coc", label: "Hạt & Ngũ cốc" },
  { id: "thao-moc", label: "Thảo mộc" },
];

const PRODUCTS = [
  {
    id: 1,
    name: "Rau cải xanh hữu cơ",
    category: "rau",
    price: "35.000",
    unit: "500g",
    originalPrice: "45.000",
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=600&q=80",
    badge: "Mới nhất",
    badgeColor: "bg-green-500",
    farm: "Nông trại Đà Lạt",
    rating: 4.9,
    sold: 1240,
  },
  {
    id: 2,
    name: "Cà rốt baby hữu cơ",
    category: "cu-qua",
    price: "42.000",
    unit: "500g",
    originalPrice: "58.000",
    image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=600&q=80",
    badge: "Bán chạy",
    badgeColor: "bg-amber-500",
    farm: "Nông trại Mộc Châu",
    rating: 4.8,
    sold: 2180,
  },
  {
    id: 3,
    name: "Bơ Hass hữu cơ",
    category: "trai-cay",
    price: "85.000",
    unit: "2 quả",
    originalPrice: "110.000",
    image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=600&q=80",
    badge: "Hot",
    badgeColor: "bg-rose-500",
    farm: "Nông trại Đắk Lắk",
    rating: 4.9,
    sold: 980,
  },
  {
    id: 4,
    name: "Rau xà lách butter",
    category: "rau",
    price: "28.000",
    unit: "300g",
    originalPrice: "38.000",
    image: "https://images.unsplash.com/photo-1622205313162-be1d5712a43f?auto=format&fit=crop&w=600&q=80",
    badge: "Tươi sạch",
    badgeColor: "bg-teal-500",
    farm: "Nông trại Đà Lạt",
    rating: 4.7,
    sold: 760,
  },
  {
    id: 5,
    name: "Hạt quinoa hữu cơ",
    category: "hat-ngu-coc",
    price: "125.000",
    unit: "500g",
    originalPrice: "165.000",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80",
    badge: "Nhập khẩu",
    badgeColor: "bg-violet-500",
    farm: "Bolivia Organic",
    rating: 4.8,
    sold: 430,
  },
  {
    id: 6,
    name: "Dâu tây Đà Lạt hữu cơ",
    category: "trai-cay",
    price: "95.000",
    unit: "300g",
    originalPrice: "130.000",
    image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=600&q=80",
    badge: "Theo mùa",
    badgeColor: "bg-pink-500",
    farm: "Nông trại Đà Lạt",
    rating: 5.0,
    sold: 1560,
  },
  {
    id: 7,
    name: "Húng quế tươi hữu cơ",
    category: "thao-moc",
    price: "18.000",
    unit: "100g",
    originalPrice: "25.000",
    image: "https://images.unsplash.com/photo-1618375569909-3c8616cf7733?auto=format&fit=crop&w=600&q=80",
    badge: "Thảo mộc",
    badgeColor: "bg-emerald-500",
    farm: "Vườn hữu cơ HCM",
    rating: 4.6,
    sold: 890,
  },
  {
    id: 8,
    name: "Khoai lang tím hữu cơ",
    category: "cu-qua",
    price: "38.000",
    unit: "1kg",
    originalPrice: "52.000",
    image: "https://images.unsplash.com/photo-1596097635121-14b63b7a0c19?auto=format&fit=crop&w=600&q=80",
    badge: "Bestseller",
    badgeColor: "bg-purple-500",
    farm: "Nông trại Bến Tre",
    rating: 4.9,
    sold: 3200,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map((s) => (
        <svg key={s} className={`w-3 h-3 ${s <= Math.round(rating) ? "text-amber-400" : "text-slate-200"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      ))}
    </div>
  );
}

export default function Products() {
  const [active, setActive] = useState("all");

  const filtered = active === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === active);

  return (
    <section id="san-pham" className="py-20 px-4 bg-slate-50">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-white border border-green-200 rounded-full px-4 py-1.5 text-sm text-green-700 font-semibold mb-4">
            🛒 Sản phẩm tươi mỗi ngày
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
            Chọn Từ 500+ Sản Phẩm Sạch
          </h2>
          <p className="text-slate-500 text-base max-w-xl mx-auto">
            Toàn bộ được kiểm định hữu cơ. Cập nhật theo mùa vụ — luôn tươi nhất.
          </p>
        </motion.div>

        {/* Category filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8 justify-center flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all border",
                active === cat.id
                  ? "bg-green-600 text-white border-green-600 shadow-sm"
                  : "bg-white text-slate-600 border-slate-200 hover:border-green-300 hover:text-green-700"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Products grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5"
          >
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg hover:border-green-200 transition-all hover:-translate-y-0.5 flex flex-col"
              >
                {/* Image */}
                <div className="relative h-44 overflow-hidden bg-slate-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className={`absolute top-2.5 left-2.5 ${product.badgeColor} text-white text-[11px] font-bold px-2.5 py-1 rounded-full`}>
                    {product.badge}
                  </span>
                  {/* Quick add */}
                  <button className="absolute bottom-2.5 right-2.5 w-8 h-8 bg-green-600 hover:bg-green-700 text-white rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-all translate-y-1 group-hover:translate-y-0">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>

                {/* Info */}
                <div className="p-4 flex flex-col flex-1 gap-2">
                  <p className="text-[11px] text-green-700 font-semibold">{product.farm}</p>
                  <h3 className="font-heading font-semibold text-slate-900 text-sm leading-snug line-clamp-2 flex-1">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1.5">
                    <StarRating rating={product.rating} />
                    <span className="text-[11px] text-slate-400">({product.sold.toLocaleString()})</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <div>
                      <span className="font-heading font-bold text-slate-900 text-base">{product.price}₫</span>
                      <span className="text-slate-300 text-xs line-through ml-1.5">{product.originalPrice}₫</span>
                    </div>
                    <span className="text-[11px] text-slate-400">{product.unit}</span>
                  </div>
                  <button className="mt-1 w-full py-2 bg-green-50 hover:bg-green-600 text-green-700 hover:text-white text-xs font-bold rounded-xl transition-colors">
                    Thêm vào giỏ
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View all */}
        <div className="text-center mt-10">
          <button className="inline-flex items-center gap-2 px-8 py-3.5 bg-white border border-slate-200 hover:border-green-400 text-slate-700 hover:text-green-700 font-semibold text-sm rounded-2xl transition-all hover:shadow-sm">
            Xem tất cả 500+ sản phẩm
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
