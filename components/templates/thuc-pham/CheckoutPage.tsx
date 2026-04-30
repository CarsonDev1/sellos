"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "./CartContext";

type Step = 1 | 2 | 3;

const STEPS = [
  { n: 1, label: "Thông tin giao hàng" },
  { n: 2, label: "Phương thức thanh toán" },
  { n: 3, label: "Xác nhận đơn hàng" },
];

const PAYMENT_METHODS = [
  { id: "momo", label: "MoMo", icon: "💜", desc: "Thanh toán qua ví MoMo" },
  { id: "vnpay", label: "VNPay QR", icon: "🏦", desc: "Quét QR mọi ngân hàng" },
  { id: "cod", label: "Tiền mặt", icon: "💵", desc: "Thanh toán khi nhận hàng" },
  { id: "card", label: "Thẻ quốc tế", icon: "💳", desc: "Visa / Mastercard / JCB" },
];

const TIME_SLOTS = [
  "7:00 – 9:00",
  "9:00 – 11:00",
  "11:00 – 13:00",
  "14:00 – 16:00",
  "16:00 – 18:00",
  "18:00 – 20:00",
];

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const [step, setStep] = useState<Step>(1);
  const [payment, setPayment] = useState("momo");
  const [timeSlot, setTimeSlot] = useState(TIME_SLOTS[0]);
  const [ordered, setOrdered] = useState(false);
  const [form, setForm] = useState({
    name: "", phone: "", address: "", ward: "", district: "", note: "",
  });

  function handleField(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function step1Valid() {
    return form.name && form.phone && form.address && form.district;
  }

  function placeOrder() {
    setOrdered(true);
    clearCart();
  }

  const discount = 0;
  const finalTotal = total - discount;

  if (ordered) {
    return (
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-lg text-center py-16">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 15 }}
          >
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="font-heading font-bold text-slate-900 text-2xl sm:text-3xl mb-3">
              Đặt hàng thành công! 🎉
            </h1>
            <p className="text-slate-500 text-base mb-2">
              Mã đơn hàng: <span className="font-bold text-slate-900">#ORG-{Math.floor(100000 + Math.random() * 900000)}</span>
            </p>
            <p className="text-slate-500 text-sm mb-8">
              Chúng tôi đã gửi xác nhận đến số điện thoại của bạn. Shipper sẽ liên hệ trước khi giao hàng.
            </p>
            <div className="bg-green-50 rounded-2xl border border-green-100 p-5 text-left space-y-2.5 mb-8">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Giao đến</span>
                <span className="font-semibold text-slate-900 text-right max-w-[55%]">{form.address || "123 Nguyễn Trãi, Q.5"}, {form.district || "Quận 5"}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Khung giờ</span>
                <span className="font-semibold text-slate-900">{timeSlot}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Thanh toán</span>
                <span className="font-semibold text-slate-900">{PAYMENT_METHODS.find((p) => p.id === payment)?.label}</span>
              </div>
              <div className="flex justify-between font-bold border-t border-green-200 pt-2.5">
                <span className="text-slate-900">Tổng cộng</span>
                <span className="text-green-700 text-lg">{finalTotal.toLocaleString("vi-VN")}₫</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/templates/thuc-pham"
                className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-colors text-sm"
              >
                Tiếp tục mua sắm
              </Link>
              <Link
                href="/templates/thuc-pham#san-pham"
                className="px-8 py-3 border border-slate-200 text-slate-700 hover:border-green-400 hover:text-green-700 font-semibold rounded-xl transition-colors text-sm"
              >
                Xem sản phẩm khác
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/templates/thuc-pham/gio-hang" className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-green-600 transition-colors mb-4">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Quay lại giỏ hàng
          </Link>
          <h1 className="font-heading font-bold text-slate-900 text-2xl sm:text-3xl">Thanh toán</h1>
        </div>

        {/* Step indicator */}
        <div className="flex items-center mb-10">
          {STEPS.map((s, i) => (
            <div key={s.n} className="flex items-center">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                  step > s.n ? "bg-green-600 text-white" : step === s.n ? "bg-green-600 text-white ring-4 ring-green-100" : "bg-slate-200 text-slate-500"
                }`}>
                  {step > s.n ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : s.n}
                </div>
                <span className={`text-sm font-semibold hidden sm:block ${step === s.n ? "text-slate-900" : "text-slate-400"}`}>
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-0.5 mx-3 min-w-[2rem] rounded-full transition-colors ${step > s.n ? "bg-green-500" : "bg-slate-200"}`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main form */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">

              {/* Step 1 */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-2xl border border-slate-100 p-6 space-y-5"
                >
                  <h2 className="font-heading font-bold text-slate-900 text-base">Thông tin người nhận</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Họ và tên *</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => handleField("name", e.target.value)}
                        placeholder="Nguyễn Văn A"
                        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Số điện thoại *</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => handleField("phone", e.target.value)}
                        placeholder="0901 234 567"
                        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Địa chỉ *</label>
                    <input
                      type="text"
                      value={form.address}
                      onChange={(e) => handleField("address", e.target.value)}
                      placeholder="Số nhà, tên đường..."
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Phường / Xã</label>
                      <input
                        type="text"
                        value={form.ward}
                        onChange={(e) => handleField("ward", e.target.value)}
                        placeholder="Phường 1"
                        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Quận / Huyện *</label>
                      <select
                        value={form.district}
                        onChange={(e) => handleField("district", e.target.value)}
                        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent bg-white"
                      >
                        <option value="">Chọn quận/huyện</option>
                        {["Quận 1","Quận 2","Quận 3","Quận 4","Quận 5","Quận 6","Quận 7","Quận 8","Quận 9","Quận 10","Quận 11","Quận 12","Bình Thạnh","Gò Vấp","Phú Nhuận","Tân Bình","Tân Phú","Thủ Đức"].map((d) => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Delivery time */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Khung giờ giao hàng</label>
                    <div className="grid grid-cols-3 gap-2">
                      {TIME_SLOTS.map((t) => (
                        <button
                          key={t}
                          onClick={() => setTimeSlot(t)}
                          className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-colors ${
                            timeSlot === t
                              ? "bg-green-600 text-white border-green-600"
                              : "bg-white text-slate-600 border-slate-200 hover:border-green-300"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Ghi chú</label>
                    <textarea
                      value={form.note}
                      onChange={(e) => handleField("note", e.target.value)}
                      placeholder="Giao trước cổng, gọi trước 10 phút..."
                      rows={2}
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent resize-none"
                    />
                  </div>

                  <button
                    onClick={() => step1Valid() && setStep(2)}
                    disabled={!step1Valid()}
                    className="w-full py-3.5 bg-green-600 hover:bg-green-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold text-sm rounded-xl transition-colors"
                  >
                    Tiếp theo — Chọn thanh toán →
                  </button>
                </motion.div>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-2xl border border-slate-100 p-6 space-y-5"
                >
                  <h2 className="font-heading font-bold text-slate-900 text-base">Phương thức thanh toán</h2>
                  <div className="space-y-3">
                    {PAYMENT_METHODS.map((m) => (
                      <button
                        key={m.id}
                        onClick={() => setPayment(m.id)}
                        className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${
                          payment === m.id
                            ? "border-green-500 bg-green-50"
                            : "border-slate-200 hover:border-green-300 bg-white"
                        }`}
                      >
                        <span className="text-2xl">{m.icon}</span>
                        <div className="flex-1">
                          <p className="font-semibold text-slate-900 text-sm">{m.label}</p>
                          <p className="text-slate-400 text-xs mt-0.5">{m.desc}</p>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                          payment === m.id ? "border-green-500 bg-green-500" : "border-slate-300"
                        }`}>
                          {payment === m.id && (
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>

                  {payment === "card" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="space-y-3 p-4 bg-slate-50 rounded-xl border border-slate-100"
                    >
                      <input placeholder="Số thẻ" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 bg-white" />
                      <div className="grid grid-cols-2 gap-3">
                        <input placeholder="MM / YY" className="border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 bg-white" />
                        <input placeholder="CVV" className="border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 bg-white" />
                      </div>
                      <input placeholder="Tên chủ thẻ" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 bg-white" />
                    </motion.div>
                  )}

                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep(1)}
                      className="flex-1 py-3.5 border border-slate-200 text-slate-700 hover:border-green-400 hover:text-green-700 font-semibold text-sm rounded-xl transition-colors"
                    >
                      ← Quay lại
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      className="flex-1 py-3.5 bg-green-600 hover:bg-green-700 text-white font-bold text-sm rounded-xl transition-colors"
                    >
                      Xem lại đơn hàng →
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 3 */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  {/* Order review */}
                  <div className="bg-white rounded-2xl border border-slate-100 p-6">
                    <h2 className="font-heading font-bold text-slate-900 text-base mb-4">Xác nhận đơn hàng</h2>
                    <div className="space-y-3">
                      {items.map((item) => (
                        <div key={item.product.id} className="flex items-center gap-3">
                          <img src={item.product.images[0]} alt={item.product.name} className="w-12 h-12 rounded-xl object-cover border border-slate-100 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-slate-900 line-clamp-1">{item.product.name}</p>
                            <p className="text-xs text-slate-400">{item.product.unit} × {item.quantity}</p>
                          </div>
                          <p className="font-bold text-slate-900 text-sm flex-shrink-0">
                            {(item.product.price * item.quantity).toLocaleString("vi-VN")}₫
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Delivery info */}
                  <div className="bg-white rounded-2xl border border-slate-100 p-5 space-y-2.5 text-sm">
                    <h3 className="font-semibold text-slate-900">Thông tin giao hàng</h3>
                    <p className="text-slate-600">{form.name || "Nguyễn Văn A"} · {form.phone || "0901 234 567"}</p>
                    <p className="text-slate-600">{form.address || "123 Nguyễn Trãi"}{form.ward ? `, ${form.ward}` : ""}, {form.district || "Quận 5"}, TP.HCM</p>
                    <p className="text-green-700 font-semibold">🕐 {timeSlot} hôm nay</p>
                    <p className="text-slate-500 font-semibold">
                      {PAYMENT_METHODS.find((p) => p.id === payment)?.icon}{" "}
                      {PAYMENT_METHODS.find((p) => p.id === payment)?.label}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep(2)}
                      className="flex-1 py-3.5 border border-slate-200 text-slate-700 hover:border-green-400 hover:text-green-700 font-semibold text-sm rounded-xl transition-colors"
                    >
                      ← Quay lại
                    </button>
                    <button
                      onClick={placeOrder}
                      className="flex-1 py-3.5 bg-green-600 hover:bg-green-700 text-white font-bold text-sm rounded-xl transition-colors shadow-sm shadow-green-200"
                    >
                      Đặt hàng ngay ✓
                    </button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {/* Order summary sidebar */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-slate-100 p-5">
              <h2 className="font-heading font-bold text-slate-900 text-sm mb-4">Đơn hàng ({items.reduce((s, i) => s + i.quantity, 0)} sản phẩm)</h2>
              <div className="space-y-3 mb-4">
                {items.slice(0, 3).map((item) => (
                  <div key={item.product.id} className="flex items-center gap-2.5">
                    <div className="relative">
                      <img src={item.product.images[0]} alt={item.product.name} className="w-10 h-10 rounded-lg object-cover border border-slate-100 flex-shrink-0" />
                      <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-green-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 flex-1 line-clamp-2">{item.product.name}</p>
                    <p className="text-xs font-semibold text-slate-900 flex-shrink-0">
                      {(item.product.price * item.quantity).toLocaleString("vi-VN")}₫
                    </p>
                  </div>
                ))}
                {items.length > 3 && (
                  <p className="text-xs text-slate-400 text-center">+{items.length - 3} sản phẩm khác</p>
                )}
              </div>
              <div className="border-t border-slate-100 pt-3 space-y-2 text-sm">
                <div className="flex justify-between text-slate-500">
                  <span>Tạm tính</span>
                  <span>{total.toLocaleString("vi-VN")}₫</span>
                </div>
                <div className="flex justify-between text-green-700 font-semibold">
                  <span>Phí giao hàng</span>
                  <span>Miễn phí</span>
                </div>
                <div className="flex justify-between font-heading font-bold text-slate-900 text-base pt-1 border-t border-slate-100">
                  <span>Tổng cộng</span>
                  <span className="text-green-700">{finalTotal.toLocaleString("vi-VN")}₫</span>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-2xl border border-green-100 p-4 space-y-2">
              <p className="text-xs text-green-700 font-semibold">🔒 Thanh toán bảo mật SSL 256-bit</p>
              <p className="text-xs text-slate-500">Thông tin của bạn được mã hóa và bảo vệ hoàn toàn.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
