"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCart, cartKey } from "./CartContext";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, itemCount, total } = useCart();

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 z-40"
            onClick={closeCart}
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-sm bg-white z-50 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <h2 className="font-heading font-bold text-slate-900 text-base">
                  Giỏ hàng
                  {itemCount > 0 && (
                    <span className="ml-1.5 text-xs text-slate-400 font-normal">({itemCount} sản phẩm)</span>
                  )}
                </h2>
              </div>
              <button
                onClick={closeCart}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-700"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-4 pb-20">
                  <div className="w-20 h-20 rounded-full bg-rose-50 flex items-center justify-center">
                    <svg className="w-10 h-10 text-rose-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-700 text-base">Giỏ hàng trống</p>
                    <p className="text-slate-400 text-sm mt-1">Chọn sản phẩm để thêm vào giỏ</p>
                  </div>
                  <button
                    onClick={closeCart}
                    className="mt-2 px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold rounded-xl transition-colors"
                  >
                    Tiếp tục mua sắm
                  </button>
                </div>
              ) : (
                items.map((item) => {
                  const key = cartKey(item.product.id, item.selectedColor, item.selectedSize);
                  return (
                    <motion.div
                      key={key}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex gap-3 pb-4 border-b border-slate-100 last:border-0"
                    >
                      <Link href={`/templates/shop-online/san-pham/${item.product.id}`} onClick={closeCart}>
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-[72px] h-[72px] rounded-xl object-cover flex-shrink-0 border border-slate-100"
                        />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/templates/shop-online/san-pham/${item.product.id}`}
                          onClick={closeCart}
                          className="font-semibold text-slate-900 text-sm leading-snug hover:text-rose-700 transition-colors line-clamp-2"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {item.selectedSize !== "One size" ? `Size ${item.selectedSize}` : ""}{item.selectedSize !== "One size" && " · "}
                          <span
                            className="inline-block w-2.5 h-2.5 rounded-full border border-slate-200 align-middle"
                            style={{ backgroundColor: item.selectedColor }}
                          />
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="font-bold text-slate-900 text-sm">
                            {(item.product.price * item.quantity).toLocaleString("vi-VN")}₫
                          </span>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => updateQuantity(key, item.quantity - 1)}
                              className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:border-rose-400 hover:text-rose-700 transition-colors text-sm"
                            >
                              −
                            </button>
                            <span className="w-6 text-center text-sm font-semibold text-slate-900">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(key, item.quantity + 1)}
                              className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:border-rose-400 hover:text-rose-700 transition-colors text-sm"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(key)}
                        className="flex-shrink-0 w-6 h-6 rounded-full hover:bg-red-50 flex items-center justify-center text-slate-300 hover:text-red-400 transition-colors"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </motion.div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-5 py-4 border-t border-slate-100 space-y-3 bg-white">
                <div className="flex justify-between text-sm text-slate-500">
                  <span>Tạm tính</span>
                  <span>{total.toLocaleString("vi-VN")}₫</span>
                </div>
                <div className="flex justify-between text-sm text-rose-600 font-semibold">
                  <span>Phí giao hàng</span>
                  <span>Miễn phí</span>
                </div>
                <div className="flex justify-between font-heading font-bold text-slate-900">
                  <span>Tổng cộng</span>
                  <span className="text-rose-600 text-lg">{total.toLocaleString("vi-VN")}₫</span>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <Link
                    href="/templates/shop-online/gio-hang"
                    onClick={closeCart}
                    className="py-3 rounded-xl border border-slate-200 text-slate-700 text-sm font-semibold text-center hover:border-rose-400 hover:text-rose-700 transition-colors"
                  >
                    Xem giỏ hàng
                  </Link>
                  <Link
                    href="/templates/shop-online/thanh-toan"
                    onClick={closeCart}
                    className="py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold text-center transition-colors shadow-sm"
                  >
                    Thanh toán
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
