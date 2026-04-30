"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Product } from "./data";
import { useCart } from "./CartContext";

const REVIEWS = [
  { name: "Nguyễn Thị Lan", avatar: "https://randomuser.me/api/portraits/women/22.jpg", stars: 5, date: "12/04/2025", text: "Sản phẩm rất tươi, đúng như mô tả. Giao hàng đúng giờ, đóng gói cẩn thận. Sẽ tiếp tục đặt dài dài!" },
  { name: "Trần Minh Khôi", avatar: "https://randomuser.me/api/portraits/men/33.jpg", stars: 5, date: "08/04/2025", text: "Chất lượng vượt trội so với giá tiền. Mua về làm salad, cả nhà khen tươi ngon hơn siêu thị rất nhiều." },
  { name: "Lê Bảo Châu", avatar: "https://randomuser.me/api/portraits/women/55.jpg", stars: 4, date: "02/04/2025", text: "Rất ổn, chỉ tiếc hôm đó giao hơi trễ 30 phút. Nhưng chất lượng sản phẩm thì không có gì chê." },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map((s) => (
        <svg key={s} className={`w-4 h-4 ${s <= count ? "text-amber-400" : "text-slate-200"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      ))}
    </div>
  );
}

export default function ProductDetail({ product, related }: { product: Product; related: Product[] }) {
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"mo-ta" | "dinh-duong" | "danh-gia">("mo-ta");
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  function handleAddToCart() {
    for (let i = 0; i < quantity; i++) addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  const discount = Math.round((1 - product.price / product.originalPrice) * 100);

  return (
    <div className="pt-16">
      {/* Breadcrumb */}
      <div className="container mx-auto max-w-7xl px-4 py-4">
        <nav className="flex items-center gap-2 text-sm text-slate-400">
          <Link href="/templates/thuc-pham" className="hover:text-green-600 transition-colors">Trang chủ</Link>
          <span>/</span>
          <Link href="/templates/thuc-pham#san-pham" className="hover:text-green-600 transition-colors">{product.categoryLabel}</Link>
          <span>/</span>
          <span className="text-slate-700 font-medium line-clamp-1">{product.name}</span>
        </nav>
      </div>

      {/* Main product section */}
      <div className="container mx-auto max-w-7xl px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

          {/* Images */}
          <div className="space-y-3">
            <motion.div
              key={activeImage}
              initial={{ opacity: 0.6 }}
              animate={{ opacity: 1 }}
              className="relative rounded-3xl overflow-hidden bg-slate-100 aspect-square"
            >
              <img
                src={product.images[activeImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <span className={`absolute top-4 left-4 ${product.badgeColor} text-white text-xs font-bold px-3 py-1.5 rounded-full`}>
                {product.badge}
              </span>
              {discount > 0 && (
                <span className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                  -{discount}%
                </span>
              )}
            </motion.div>
            {/* Thumbnails */}
            <div className="flex gap-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                    activeImage === i ? "border-green-500 shadow-md" : "border-slate-200 hover:border-green-300"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product info */}
          <div className="space-y-5">
            {/* Farm */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-green-700 bg-green-50 px-3 py-1 rounded-full border border-green-100">
                🌿 {product.farm}
              </span>
              <span className="text-xs text-slate-400">{product.farmLocation}</span>
            </div>

            <h1 className="font-heading font-bold text-slate-900 text-2xl sm:text-3xl leading-snug">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <Stars count={Math.round(product.rating)} />
              <span className="font-semibold text-slate-900">{product.rating}</span>
              <span className="text-slate-400 text-sm">({product.reviewCount.toLocaleString()} đánh giá)</span>
              <span className="text-slate-300">·</span>
              <span className="text-slate-400 text-sm">Đã bán {product.sold.toLocaleString()}</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 py-3 border-y border-slate-100">
              <span className="font-heading font-bold text-3xl text-green-700">
                {product.price.toLocaleString("vi-VN")}₫
              </span>
              <span className="text-slate-300 line-through text-lg">
                {product.originalPrice.toLocaleString("vi-VN")}₫
              </span>
              <span className="text-sm font-semibold text-slate-500">/ {product.unit}</span>
              {discount > 0 && (
                <span className="ml-auto bg-red-50 text-red-600 text-xs font-bold px-2.5 py-1 rounded-full">
                  Tiết kiệm {(product.originalPrice - product.price).toLocaleString("vi-VN")}₫
                </span>
              )}
            </div>

            {/* Highlights */}
            <ul className="space-y-2">
              {product.highlights.map((h) => (
                <li key={h} className="flex items-center gap-2.5 text-sm text-slate-700">
                  <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  {h}
                </li>
              ))}
            </ul>

            {/* Quantity + Add to cart */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 border border-slate-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-12 flex items-center justify-center text-slate-500 hover:bg-green-50 hover:text-green-700 transition-colors text-lg"
                >
                  −
                </button>
                <span className="w-10 text-center font-semibold text-slate-900">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-10 h-12 flex items-center justify-center text-slate-500 hover:bg-green-50 hover:text-green-700 transition-colors text-lg"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${
                  added
                    ? "bg-green-100 text-green-700"
                    : "bg-green-600 hover:bg-green-700 text-white shadow-sm shadow-green-200"
                }`}
              >
                {added ? "✓ Đã thêm vào giỏ!" : "Thêm vào giỏ hàng"}
              </button>
              <Link
                href="/templates/thuc-pham/thanh-toan"
                className="py-3 px-5 rounded-xl border border-slate-200 text-slate-700 hover:border-green-400 hover:text-green-700 font-semibold text-sm transition-colors whitespace-nowrap"
              >
                Mua ngay
              </Link>
            </div>

            {/* Product meta */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {[
                { label: "Khối lượng", value: product.weight },
                { label: "Bảo quản", value: product.expiry },
                { label: "Xuất xứ", value: product.origin },
              ].map((m) => (
                <div key={m.label} className="bg-slate-50 rounded-xl p-3 text-center">
                  <p className="text-[10px] text-slate-400 uppercase font-semibold tracking-wide">{m.label}</p>
                  <p className="text-xs font-semibold text-slate-700 mt-1 leading-snug">{m.value}</p>
                </div>
              ))}
            </div>

            {/* Delivery badges */}
            <div className="flex flex-wrap gap-2 pt-1">
              {["🚚 Giao trong 2h nội thành", "✓ USDA Organic", "↩ Đổi trả trong 24h"].map((b) => (
                <span key={b} className="text-xs bg-green-50 text-green-700 border border-green-100 px-3 py-1.5 rounded-full font-semibold">
                  {b}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-14">
          <div className="flex gap-1 border-b border-slate-200 mb-6">
            {([
              { id: "mo-ta", label: "Mô tả sản phẩm" },
              { id: "dinh-duong", label: "Thông tin dinh dưỡng" },
              { id: "danh-gia", label: `Đánh giá (${product.reviewCount})` },
            ] as const).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-3 text-sm font-semibold border-b-2 -mb-px transition-colors ${
                  activeTab === tab.id
                    ? "border-green-600 text-green-700"
                    : "border-transparent text-slate-500 hover:text-slate-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === "mo-ta" && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
              <p className="text-slate-600 leading-relaxed text-base">{product.description}</p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {product.highlights.map((h) => (
                  <div key={h} className="flex items-start gap-2.5 p-3.5 bg-green-50 rounded-xl">
                    <svg className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-slate-700 leading-snug">{h}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "dinh-duong" && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="max-w-md">
              <p className="text-slate-500 text-sm mb-4">Thành phần dinh dưỡng trung bình trên 100g sản phẩm</p>
              <div className="border border-slate-200 rounded-2xl overflow-hidden">
                {product.nutrition.map((n, i) => (
                  <div key={n.label} className={`flex justify-between px-5 py-3 text-sm ${i % 2 === 0 ? "bg-white" : "bg-slate-50"}`}>
                    <span className="text-slate-600 font-medium">{n.label}</span>
                    <span className="font-semibold text-slate-900">{n.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "danh-gia" && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-5 max-w-2xl">
              {/* Summary */}
              <div className="flex items-center gap-5 p-5 bg-green-50 rounded-2xl border border-green-100">
                <div className="text-center">
                  <p className="font-heading font-bold text-4xl text-slate-900">{product.rating}</p>
                  <Stars count={Math.round(product.rating)} />
                  <p className="text-xs text-slate-400 mt-1">{product.reviewCount} đánh giá</p>
                </div>
                <div className="flex-1 space-y-1.5">
                  {[5,4,3,2,1].map((s) => (
                    <div key={s} className="flex items-center gap-2">
                      <span className="text-xs text-slate-400 w-2">{s}</span>
                      <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-400 rounded-full"
                          style={{ width: `${s === 5 ? 78 : s === 4 ? 15 : s === 3 ? 5 : 2}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {REVIEWS.map((r, i) => (
                <div key={i} className="p-5 border border-slate-100 rounded-2xl space-y-3">
                  <div className="flex items-center gap-3">
                    <img src={r.avatar} alt={r.name} className="w-9 h-9 rounded-full object-cover" />
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">{r.name}</p>
                      <p className="text-slate-400 text-xs">{r.date}</p>
                    </div>
                    <Stars count={r.stars} />
                    <svg className="ml-auto w-5 h-5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">{r.text}</p>
                </div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="font-heading font-bold text-slate-900 text-2xl mb-6">Sản phẩm liên quan</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {related.map((p) => (
                <Link
                  key={p.id}
                  href={`/templates/thuc-pham/san-pham/${p.id}`}
                  className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg hover:border-green-200 transition-all hover:-translate-y-0.5"
                >
                  <div className="h-36 overflow-hidden bg-slate-100">
                    <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-3">
                    <p className="text-[11px] text-green-700 font-semibold">{p.farm}</p>
                    <p className="font-semibold text-slate-900 text-sm leading-snug mt-0.5 line-clamp-2">{p.name}</p>
                    <p className="font-bold text-slate-900 text-sm mt-1.5">{p.price.toLocaleString("vi-VN")}₫</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
