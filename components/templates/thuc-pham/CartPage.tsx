"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "./CartContext";

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();
  const [promo, setPromo] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState(false);

  function applyPromo() {
    if (promo.toUpperCase() === "ORGANIC10") {
      setPromoApplied(true);
      setPromoError(false);
    } else {
      setPromoError(true);
      setPromoApplied(false);
    }
  }

  const discount = promoApplied ? Math.round(total * 0.1) : 0;
  const finalTotal = total - discount;

  return (
    <div className="pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-heading font-bold text-slate-900 text-2xl sm:text-3xl">Giỏ hàng của bạn</h1>
          <p className="text-slate-400 text-sm mt-1">
            {items.length === 0 ? "Giỏ hàng trống" : `${items.reduce((s, i) => s + i.quantity, 0)} sản phẩm`}
          </p>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-5 text-center">
            <div className="w-24 h-24 rounded-full bg-green-50 flex items-center justify-center">
              <svg className="w-12 h-12 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <p className="font-heading font-bold text-slate-900 text-xl">Giỏ hàng trống</p>
              <p className="text-slate-400 text-sm mt-1.5">Hãy chọn thêm sản phẩm hữu cơ cho bữa ăn lành mạnh!</p>
            </div>
            <Link
              href="/templates/thuc-pham#san-pham"
              className="mt-2 px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-colors text-sm"
            >
              Khám phá sản phẩm
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart items */}
            <div className="lg:col-span-2 space-y-4">
              {/* Clear cart */}
              <div className="flex justify-end">
                <button
                  onClick={clearCart}
                  className="text-xs text-slate-400 hover:text-red-500 transition-colors font-medium"
                >
                  Xóa tất cả
                </button>
              </div>

              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={item.product.id}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                    className="bg-white rounded-2xl border border-slate-100 p-4 sm:p-5 flex gap-4"
                  >
                    <Link href={`/templates/thuc-pham/san-pham/${item.product.id}`} className="flex-shrink-0">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover border border-slate-100"
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <Link
                            href={`/templates/thuc-pham/san-pham/${item.product.id}`}
                            className="font-semibold text-slate-900 text-sm sm:text-base hover:text-green-700 transition-colors line-clamp-2"
                          >
                            {item.product.name}
                          </Link>
                          <p className="text-xs text-green-700 font-semibold mt-0.5">{item.product.farm}</p>
                          <p className="text-xs text-slate-400 mt-0.5">{item.product.unit}</p>
                        </div>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="flex-shrink-0 w-7 h-7 rounded-full hover:bg-red-50 flex items-center justify-center text-slate-300 hover:text-red-400 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        {/* Quantity */}
                        <div className="flex items-center gap-1 border border-slate-200 rounded-xl overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-9 h-9 flex items-center justify-center text-slate-500 hover:bg-green-50 hover:text-green-700 transition-colors"
                          >
                            −
                          </button>
                          <span className="w-8 text-center text-sm font-semibold text-slate-900">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-9 h-9 flex items-center justify-center text-slate-500 hover:bg-green-50 hover:text-green-700 transition-colors"
                          >
                            +
                          </button>
                        </div>
                        {/* Price */}
                        <div className="text-right">
                          <p className="font-bold text-slate-900 text-base">
                            {(item.product.price * item.quantity).toLocaleString("vi-VN")}₫
                          </p>
                          <p className="text-xs text-slate-400">
                            {item.product.price.toLocaleString("vi-VN")}₫ x {item.quantity}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Continue shopping */}
              <Link
                href="/templates/thuc-pham#san-pham"
                className="inline-flex items-center gap-2 text-sm text-green-700 font-semibold hover:underline mt-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Tiếp tục mua sắm
              </Link>
            </div>

            {/* Order summary */}
            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-slate-100 p-5 space-y-4">
                <h2 className="font-heading font-bold text-slate-900 text-base">Tóm tắt đơn hàng</h2>

                {/* Promo code */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Mã giảm giá</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promo}
                      onChange={(e) => { setPromo(e.target.value); setPromoError(false); }}
                      placeholder="Nhập mã..."
                      className="flex-1 border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                    />
                    <button
                      onClick={applyPromo}
                      className="px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-xl transition-colors whitespace-nowrap"
                    >
                      Áp dụng
                    </button>
                  </div>
                  {promoApplied && (
                    <p className="text-xs text-green-600 font-semibold">✓ Đã áp dụng mã giảm 10%</p>
                  )}
                  {promoError && (
                    <p className="text-xs text-red-500">Mã không hợp lệ. Thử &quot;ORGANIC10&quot;</p>
                  )}
                </div>

                <div className="border-t border-slate-100 pt-4 space-y-2.5 text-sm">
                  <div className="flex justify-between text-slate-600">
                    <span>Tạm tính</span>
                    <span>{total.toLocaleString("vi-VN")}₫</span>
                  </div>
                  {promoApplied && (
                    <div className="flex justify-between text-green-600 font-semibold">
                      <span>Giảm giá (10%)</span>
                      <span>-{discount.toLocaleString("vi-VN")}₫</span>
                    </div>
                  )}
                  <div className="flex justify-between text-green-700 font-semibold">
                    <span>Phí giao hàng</span>
                    <span>Miễn phí</span>
                  </div>
                  <div className="flex justify-between font-heading font-bold text-slate-900 text-base pt-2 border-t border-slate-100">
                    <span>Tổng cộng</span>
                    <span className="text-green-700 text-lg">{finalTotal.toLocaleString("vi-VN")}₫</span>
                  </div>
                </div>

                <Link
                  href="/templates/thuc-pham/thanh-toan"
                  className="block w-full py-3.5 bg-green-600 hover:bg-green-700 text-white text-sm font-bold text-center rounded-xl transition-colors shadow-sm shadow-green-200"
                >
                  Tiến hành thanh toán →
                </Link>

                <p className="text-[11px] text-slate-400 text-center">
                  Bảo mật SSL · Giao hàng miễn phí · Đổi trả trong 24h
                </p>
              </div>

              {/* Trust badges */}
              <div className="bg-green-50 rounded-2xl border border-green-100 p-4 space-y-3">
                {[
                  { icon: "🚚", title: "Giao hàng miễn phí", desc: "Cho mọi đơn hàng" },
                  { icon: "↩", title: "Đổi trả trong 24h", desc: "Nếu sản phẩm không tươi" },
                  { icon: "🔒", title: "Thanh toán an toàn", desc: "Mã hóa SSL 256-bit" },
                ].map((b) => (
                  <div key={b.title} className="flex items-center gap-3">
                    <span className="text-xl">{b.icon}</span>
                    <div>
                      <p className="font-semibold text-slate-800 text-xs">{b.title}</p>
                      <p className="text-slate-500 text-[11px]">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
