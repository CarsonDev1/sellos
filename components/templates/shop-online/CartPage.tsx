"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCart, cartKey } from "./CartContext";

const PROMO_CODES: Record<string, number> = {
  NOVA30: 0.3,
  NOVA10: 0.1,
  SALE50: 0.5,
};

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();
  const [promoInput, setPromoInput] = useState("");
  const [promoApplied, setPromoApplied] = useState<string | null>(null);
  const [promoError, setPromoError] = useState("");

  const discount = promoApplied ? PROMO_CODES[promoApplied] : 0;
  const discountAmount = Math.round(total * discount);
  const finalTotal = total - discountAmount;

  const applyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (PROMO_CODES[code]) {
      setPromoApplied(code);
      setPromoError("");
    } else {
      setPromoError("Mã không hợp lệ hoặc đã hết hạn.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-16">
      {/* Breadcrumb */}
      <div className="container mx-auto max-w-6xl px-4 py-5">
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <Link href="/templates/shop-online" className="hover:text-rose-600 transition-colors">Trang chủ</Link>
          <span>/</span>
          <span className="text-slate-700 font-medium">Giỏ hàng</span>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 pb-16">
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 mb-8">
          Giỏ hàng ({items.length} sản phẩm)
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 rounded-full bg-rose-50 flex items-center justify-center mx-auto mb-5">
              <svg className="w-12 h-12 text-rose-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <p className="font-heading font-bold text-slate-700 text-xl mb-2">Giỏ hàng trống</p>
            <p className="text-slate-400 mb-6">Khám phá bộ sưu tập mới nhất của NOVA nhé!</p>
            <Link
              href="/templates/shop-online"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-2xl transition-colors"
            >
              ← Tiếp tục mua sắm
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart items */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500">{items.length} sản phẩm</span>
                <button
                  onClick={clearCart}
                  className="text-sm text-red-400 hover:text-red-600 font-semibold transition-colors"
                >
                  Xóa tất cả
                </button>
              </div>

              <AnimatePresence>
                {items.map((item) => {
                  const key = cartKey(item.product.id, item.selectedColor, item.selectedSize);
                  return (
                    <motion.div
                      key={key}
                      layout
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="bg-white rounded-2xl border border-slate-100 p-4 flex gap-4"
                    >
                      <Link href={`/templates/shop-online/san-pham/${item.product.id}`}>
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-24 h-28 rounded-xl object-cover flex-shrink-0 border border-slate-100"
                        />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <Link href={`/templates/shop-online/san-pham/${item.product.id}`}>
                          <p className="font-heading font-semibold text-slate-900 hover:text-rose-700 transition-colors leading-snug">{item.product.name}</p>
                        </Link>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-slate-400">
                            {item.selectedSize !== "One size" ? `Size ${item.selectedSize}` : "One size"}
                          </span>
                          <span
                            className="inline-block w-3 h-3 rounded-full border border-slate-200"
                            style={{ backgroundColor: item.selectedColor }}
                          />
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(key, item.quantity - 1)}
                              className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:border-rose-400 hover:text-rose-700 transition-colors"
                            >
                              −
                            </button>
                            <span className="w-8 text-center font-semibold text-slate-900 text-sm">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(key, item.quantity + 1)}
                              className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:border-rose-400 hover:text-rose-700 transition-colors"
                            >
                              +
                            </button>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-slate-900">
                              {(item.product.price * item.quantity).toLocaleString("vi-VN")}₫
                            </p>
                            <p className="text-xs text-slate-400">{item.product.price.toLocaleString("vi-VN")}₫/cái</p>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(key)}
                        className="flex-shrink-0 w-7 h-7 rounded-full hover:bg-red-50 flex items-center justify-center text-slate-300 hover:text-red-400 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              <Link
                href="/templates/shop-online"
                className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-rose-600 font-medium transition-colors mt-4"
              >
                ← Tiếp tục mua sắm
              </Link>
            </div>

            {/* Order summary */}
            <div className="space-y-4">
              {/* Promo code */}
              <div className="bg-white rounded-2xl border border-slate-100 p-5">
                <p className="font-semibold text-slate-800 text-sm mb-3">Mã giảm giá</p>
                {promoApplied ? (
                  <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-xl px-4 py-2.5">
                    <span className="text-green-700 font-semibold text-sm">{promoApplied} — -{Math.round(discount * 100)}%</span>
                    <button
                      onClick={() => { setPromoApplied(null); setPromoInput(""); }}
                      className="text-green-600 hover:text-red-500 text-xs font-medium transition-colors"
                    >
                      Xóa
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      value={promoInput}
                      onChange={(e) => { setPromoInput(e.target.value); setPromoError(""); }}
                      placeholder="Nhập mã..."
                      className="flex-1 px-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-300 transition-all"
                    />
                    <button
                      onClick={applyPromo}
                      className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold rounded-xl transition-colors"
                    >
                      Áp dụng
                    </button>
                  </div>
                )}
                {promoError && <p className="text-red-500 text-xs mt-1.5">{promoError}</p>}
                <p className="text-slate-400 text-xs mt-2">Thử: NOVA30, NOVA10, SALE50</p>
              </div>

              {/* Summary */}
              <div className="bg-white rounded-2xl border border-slate-100 p-5 space-y-3">
                <p className="font-heading font-bold text-slate-900">Tóm tắt đơn hàng</p>
                <div className="flex justify-between text-sm text-slate-500">
                  <span>Tạm tính</span>
                  <span>{total.toLocaleString("vi-VN")}₫</span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between text-sm text-green-600 font-semibold">
                    <span>Giảm giá ({promoApplied})</span>
                    <span>-{discountAmount.toLocaleString("vi-VN")}₫</span>
                  </div>
                )}
                <div className="flex justify-between text-sm text-rose-600 font-semibold">
                  <span>Phí giao hàng</span>
                  <span>Miễn phí</span>
                </div>
                <div className="flex justify-between font-heading font-bold text-slate-900 text-base pt-3 border-t border-slate-100">
                  <span>Tổng cộng</span>
                  <span className="text-rose-600">{finalTotal.toLocaleString("vi-VN")}₫</span>
                </div>

                <Link
                  href="/templates/shop-online/thanh-toan"
                  className="block w-full text-center py-4 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-semibold rounded-2xl transition-all shadow-lg shadow-rose-200 mt-2"
                >
                  Tiến hành thanh toán →
                </Link>

                <div className="flex justify-center gap-3 pt-2">
                  {["🔒 SSL", "💳 MoMo", "🏦 VNPay"].map((b) => (
                    <span key={b} className="text-xs text-slate-400">{b}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
