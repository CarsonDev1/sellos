"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { Product } from "./data";
import { useCart } from "./CartContext";

const SAMPLE_REVIEWS = [
  {
    name: "Nguyễn Phương Anh",
    avatar: "https://randomuser.me/api/portraits/women/11.jpg",
    rating: 5,
    date: "12/04/2025",
    text: "Sản phẩm đúng như mô tả, chất vải rất đẹp và mềm. Giao hàng nhanh, đóng gói cẩn thận. Sẽ mua lại!",
    verified: true,
  },
  {
    name: "Trần Minh Châu",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    rating: 5,
    date: "08/04/2025",
    text: "Size chuẩn, màu sắc đẹp không bị chênh so với ảnh. Mặc thoải mái cả ngày. Highly recommend!",
    verified: true,
  },
  {
    name: "Lê Thu Hương",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 4,
    date: "02/04/2025",
    text: "Hàng đẹp, chất lượng ổn. Duy nhất màu hơi nhạt hơn ảnh một chút nhưng vẫn đẹp.",
    verified: false,
  },
];

interface Props {
  product: Product;
  related: Product[];
}

export default function ProductDetail({ product, related }: Props) {
  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"mo-ta" | "chat-lieu" | "danh-gia">("mo-ta");

  const { addItem } = useCart();

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product, selectedColor, selectedSize);
    }
  };

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Breadcrumb */}
      <div className="container mx-auto max-w-7xl px-4 py-4">
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <Link href="/templates/shop-online" className="hover:text-rose-600 transition-colors">Trang chủ</Link>
          <span>/</span>
          <span className="text-slate-600">{product.categoryLabel}</span>
          <span>/</span>
          <span className="text-slate-900 font-medium truncate max-w-xs">{product.name}</span>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Image gallery */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-2xl aspect-[3/4] bg-slate-100">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage}
                  src={product.images[activeImage]}
                  alt={product.name}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
              {product.badge && (
                <span className={`absolute top-3 left-3 text-white text-xs font-bold px-2.5 py-1 rounded-full ${product.badgeColor}`}>
                  {product.badge}
                </span>
              )}
            </div>
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`rounded-xl overflow-hidden aspect-square w-20 flex-shrink-0 border-2 transition-all ${
                    i === activeImage ? "border-rose-500 shadow-md" : "border-slate-200 opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product info */}
          <div className="space-y-5">
            <div>
              <p className="text-sm text-slate-400 mb-1">{product.categoryLabel}</p>
              <h1 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900">{product.name}</h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 fill-current ${i < Math.floor(product.rating) ? "text-amber-400" : "text-slate-200"}`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-slate-600 font-semibold">{product.rating}</span>
              <span className="text-sm text-slate-400">({product.reviewCount} đánh giá)</span>
              <span className="text-sm text-rose-600 font-semibold">· Đã bán {product.sold.toLocaleString()}</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="font-heading font-bold text-3xl text-slate-900">
                {product.price.toLocaleString("vi-VN")}₫
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-slate-400 line-through text-lg">
                    {product.originalPrice.toLocaleString("vi-VN")}₫
                  </span>
                  <span className="bg-rose-100 text-rose-600 text-sm font-bold px-2 py-0.5 rounded-lg">
                    -{discount}%
                  </span>
                </>
              )}
            </div>

            {/* Color picker */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-slate-700">
                  Màu sắc: <span className="font-normal text-slate-500">
                    {product.colorLabels[product.colors.indexOf(selectedColor)]}
                  </span>
                </p>
              </div>
              <div className="flex gap-2.5 flex-wrap">
                {product.colors.map((color, i) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    title={product.colorLabels[i]}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      selectedColor === color
                        ? "border-rose-500 scale-110 shadow-md"
                        : "border-slate-200 hover:border-slate-400"
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Size picker */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-slate-700">Size: <span className="font-normal text-slate-500">{selectedSize}</span></p>
                <button className="text-xs text-rose-600 font-semibold hover:underline">
                  Hướng dẫn chọn size →
                </button>
              </div>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[44px] h-10 px-3 rounded-xl text-sm font-semibold border-2 transition-all ${
                      selectedSize === size
                        ? "border-rose-500 bg-rose-50 text-rose-700"
                        : "border-slate-200 text-slate-600 hover:border-rose-300 hover:text-rose-600"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <p className="text-sm font-semibold text-slate-700">Số lượng:</p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-500 hover:border-rose-400 hover:text-rose-700 transition-colors font-bold"
                >
                  −
                </button>
                <span className="w-10 text-center font-semibold text-slate-900">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-500 hover:border-rose-400 hover:text-rose-700 transition-colors font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3.5 border-2 border-rose-500 text-rose-600 hover:bg-rose-50 font-semibold rounded-2xl transition-all text-sm"
              >
                + Thêm vào giỏ
              </button>
              <Link
                href="/templates/shop-online/thanh-toan"
                onClick={handleAddToCart}
                className="flex-1 py-3.5 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-semibold rounded-2xl transition-all text-center text-sm shadow-lg shadow-rose-200"
              >
                Mua ngay
              </Link>
            </div>

            {/* Trust */}
            <div className="grid grid-cols-3 gap-3 pt-2 border-t border-slate-100">
              {[
                { icon: "🚀", text: "Giao 2h" },
                { icon: "🔄", text: "Đổi 30 ngày" },
                { icon: "🔒", text: "Bảo mật SSL" },
              ].map((t) => (
                <div key={t.text} className="text-center">
                  <p className="text-xl">{t.icon}</p>
                  <p className="text-xs text-slate-500 mt-0.5 font-medium">{t.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-16 border-t border-slate-100 pt-10">
          <div className="flex gap-1 border-b border-slate-200 mb-8">
            {(["mo-ta", "chat-lieu", "danh-gia"] as const).map((tab) => {
              const labels = { "mo-ta": "Mô tả", "chat-lieu": "Chất liệu & Xuất xứ", "danh-gia": `Đánh giá (${product.reviewCount})` };
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-3 text-sm font-semibold border-b-2 transition-all -mb-px ${
                    activeTab === tab
                      ? "border-rose-500 text-rose-600"
                      : "border-transparent text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {labels[tab]}
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "mo-ta" && (
              <motion.div
                key="mo-ta"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="max-w-2xl"
              >
                <p className="text-slate-600 leading-relaxed">{product.description}</p>
              </motion.div>
            )}
            {activeTab === "chat-lieu" && (
              <motion.div
                key="chat-lieu"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="max-w-2xl space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: "Chất liệu", value: product.material },
                    { label: "Xuất xứ", value: product.origin },
                    { label: "Danh mục", value: product.categoryLabel },
                    { label: "SKU", value: product.id.toUpperCase() },
                  ].map((row) => (
                    <div key={row.label} className="bg-slate-50 rounded-xl p-4">
                      <p className="text-xs text-slate-400 uppercase tracking-wide">{row.label}</p>
                      <p className="font-semibold text-slate-800 mt-0.5 text-sm">{row.value}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
            {activeTab === "danh-gia" && (
              <motion.div
                key="danh-gia"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="max-w-2xl space-y-5"
              >
                {SAMPLE_REVIEWS.map((r) => (
                  <div key={r.name} className="border-b border-slate-100 pb-5 last:border-0">
                    <div className="flex items-center gap-3 mb-2">
                      <img src={r.avatar} alt={r.name} className="w-9 h-9 rounded-full object-cover" />
                      <div>
                        <p className="font-semibold text-slate-900 text-sm flex items-center gap-1.5">
                          {r.name}
                          {r.verified && (
                            <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-medium">✓ Đã mua</span>
                          )}
                        </p>
                        <p className="text-xs text-slate-400">{r.date}</p>
                      </div>
                    </div>
                    <div className="flex gap-0.5 mb-1.5">
                      {[...Array(r.rating)].map((_, j) => (
                        <svg key={j} className="w-3.5 h-3.5 text-amber-400 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-slate-600 text-sm">{r.text}</p>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="font-heading text-2xl font-bold text-slate-900 mb-6">Có Thể Bạn Thích</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((p) => (
                <Link
                  key={p.id}
                  href={`/templates/shop-online/san-pham/${p.id}`}
                  className="group rounded-2xl overflow-hidden border border-slate-100 hover:shadow-md hover:border-rose-100 transition-all bg-white"
                >
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-3">
                    <p className="font-semibold text-slate-900 text-sm line-clamp-2 group-hover:text-rose-700 transition-colors">
                      {p.name}
                    </p>
                    <p className="font-bold text-rose-600 text-sm mt-1">{p.price.toLocaleString("vi-VN")}₫</p>
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
