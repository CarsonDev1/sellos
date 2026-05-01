"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "./CartContext";

const PAYMENT_METHODS = [
  { id: "momo", label: "MoMo", icon: "💜", desc: "Ví điện tử MoMo" },
  { id: "vnpay", label: "VNPay", icon: "🔵", desc: "Cổng thanh toán VNPay" },
  { id: "cod", label: "COD", icon: "💵", desc: "Thanh toán khi nhận hàng" },
  { id: "card", label: "Thẻ ngân hàng", icon: "💳", desc: "Visa / MasterCard / JCB" },
];

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [orderCode, setOrderCode] = useState("");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    district: "",
    note: "",
  });

  const step1Valid =
    form.name.trim() !== "" &&
    form.phone.trim().length >= 9 &&
    form.address.trim() !== "" &&
    form.district.trim() !== "";

  const handlePlaceOrder = () => {
    const code = `NOVA-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderCode(code);
    clearCart();
    setStep(3);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-16">
      {/* Breadcrumb */}
      <div className="container mx-auto max-w-4xl px-4 py-5">
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <Link href="/templates/shop-online" className="hover:text-rose-600 transition-colors">Trang chủ</Link>
          <span>/</span>
          <Link href="/templates/shop-online/gio-hang" className="hover:text-rose-600 transition-colors">Giỏ hàng</Link>
          <span>/</span>
          <span className="text-slate-700 font-medium">Thanh toán</span>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 pb-16">
        {/* Step indicator */}
        {step < 3 && (
          <div className="flex items-center gap-0 mb-8 max-w-xs mx-auto">
            {[1, 2].map((s) => (
              <div key={s} className="flex items-center flex-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${
                    s <= step ? "border-rose-500 bg-rose-500 text-white" : "border-slate-200 bg-white text-slate-400"
                  }`}
                >
                  {s}
                </div>
                {s < 2 && (
                  <div className={`flex-1 h-0.5 ${s < step ? "bg-rose-500" : "bg-slate-200"}`} />
                )}
              </div>
            ))}
          </div>
        )}

        {step < 3 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Step 1: Shipping */}
              {step === 1 && (
                <div className="bg-white rounded-2xl border border-slate-100 p-6">
                  <h2 className="font-heading font-bold text-slate-900 text-xl mb-5">Thông tin giao hàng</h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Họ và tên *</label>
                        <input
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="Nguyễn Thị Hoa"
                          className="w-full px-4 py-3 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-300 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Số điện thoại *</label>
                        <input
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          placeholder="0901 234 567"
                          className="w-full px-4 py-3 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-300 transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Địa chỉ giao hàng *</label>
                      <input
                        value={form.address}
                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                        placeholder="Số nhà, tên đường..."
                        className="w-full px-4 py-3 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-300 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Quận / Huyện *</label>
                      <select
                        value={form.district}
                        onChange={(e) => setForm({ ...form, district: e.target.value })}
                        className="w-full px-4 py-3 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-300 transition-all bg-white"
                      >
                        <option value="">Chọn quận / huyện...</option>
                        {["Quận 1", "Quận 3", "Quận 7", "Bình Thạnh", "Tân Bình", "Gò Vấp", "Thủ Đức", "Quận 2", "Quận 4", "Quận 5"].map((d) => (
                          <option key={d} value={d}>{d}, TP.HCM</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Ghi chú (tuỳ chọn)</label>
                      <textarea
                        value={form.note}
                        onChange={(e) => setForm({ ...form, note: e.target.value })}
                        placeholder="Giao giờ hành chính, gọi trước khi giao..."
                        rows={3}
                        className="w-full px-4 py-3 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-300 transition-all resize-none"
                      />
                    </div>
                    <button
                      onClick={() => setStep(2)}
                      disabled={!step1Valid}
                      className="w-full py-4 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 disabled:from-slate-300 disabled:to-slate-300 disabled:cursor-not-allowed text-white font-semibold rounded-2xl transition-all shadow-lg shadow-rose-200 disabled:shadow-none"
                    >
                      Tiếp tục →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Payment */}
              {step === 2 && (
                <div className="bg-white rounded-2xl border border-slate-100 p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <button onClick={() => setStep(1)} className="text-slate-400 hover:text-slate-700 transition-colors">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <h2 className="font-heading font-bold text-slate-900 text-xl">Phương thức thanh toán</h2>
                  </div>

                  <div className="space-y-3 mb-6">
                    {PAYMENT_METHODS.map((m) => (
                      <label
                        key={m.id}
                        className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                          paymentMethod === m.id
                            ? "border-rose-500 bg-rose-50"
                            : "border-slate-200 hover:border-rose-200"
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value={m.id}
                          checked={paymentMethod === m.id}
                          onChange={() => setPaymentMethod(m.id)}
                          className="sr-only"
                        />
                        <span className="text-2xl">{m.icon}</span>
                        <div className="flex-1">
                          <p className="font-semibold text-slate-900 text-sm">{m.label}</p>
                          <p className="text-slate-400 text-xs">{m.desc}</p>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                          paymentMethod === m.id ? "border-rose-500" : "border-slate-200"
                        }`}>
                          {paymentMethod === m.id && <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />}
                        </div>
                      </label>
                    ))}
                  </div>

                  {/* Shipping summary */}
                  <div className="bg-slate-50 rounded-xl p-4 mb-6 text-sm">
                    <p className="font-semibold text-slate-700 mb-2">Địa chỉ giao hàng</p>
                    <p className="text-slate-600">{form.name} · {form.phone}</p>
                    <p className="text-slate-500">{form.address}, {form.district}</p>
                  </div>

                  <button
                    onClick={handlePlaceOrder}
                    className="w-full py-4 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-semibold rounded-2xl transition-all shadow-lg shadow-rose-200 text-base"
                  >
                    Đặt hàng ngay →
                  </button>
                  <p className="text-center text-slate-400 text-xs mt-3">
                    🔒 Thông tin được mã hoá SSL 256-bit
                  </p>
                </div>
              )}
            </div>

            {/* Order summary sidebar */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5 h-fit">
              <p className="font-heading font-bold text-slate-900 mb-4">Đơn hàng của bạn</p>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`} className="flex gap-3">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-14 h-16 rounded-xl object-cover flex-shrink-0 border border-slate-100"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-slate-800 leading-snug line-clamp-2">{item.product.name}</p>
                      <p className="text-xs text-slate-400 mt-0.5">×{item.quantity}</p>
                    </div>
                    <p className="text-xs font-bold text-slate-900 flex-shrink-0">
                      {(item.product.price * item.quantity).toLocaleString("vi-VN")}₫
                    </p>
                  </div>
                ))}
              </div>
              <div className="border-t border-slate-100 mt-4 pt-4 space-y-2">
                <div className="flex justify-between text-sm text-slate-500">
                  <span>Tạm tính</span><span>{total.toLocaleString("vi-VN")}₫</span>
                </div>
                <div className="flex justify-between text-sm text-rose-600 font-semibold">
                  <span>Giao hàng</span><span>Miễn phí</span>
                </div>
                <div className="flex justify-between font-bold text-slate-900 pt-1 border-t border-slate-100">
                  <span>Tổng cộng</span>
                  <span className="text-rose-600">{total.toLocaleString("vi-VN")}₫</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Success */}
        {step === 3 && (
          <div className="max-w-md mx-auto text-center py-16">
            <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="font-heading font-bold text-slate-900 text-3xl mb-2">Đặt hàng thành công!</h2>
            <p className="text-slate-500 mb-3">Cảm ơn bạn đã mua sắm tại NOVA</p>
            <div className="bg-rose-50 border border-rose-200 rounded-2xl px-6 py-4 mb-6 inline-block">
              <p className="text-sm text-slate-500 mb-0.5">Mã đơn hàng</p>
              <p className="font-heading font-bold text-rose-600 text-2xl tracking-wider">{orderCode}</p>
            </div>
            <div className="text-sm text-slate-500 space-y-1 mb-6">
              <p>📦 Đơn hàng sẽ được giao trong <strong>2–4 giờ</strong></p>
              <p>📱 Chúng tôi sẽ gọi xác nhận trước khi giao</p>
            </div>
            <Link
              href="/templates/shop-online"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-2xl transition-colors"
            >
              Tiếp tục mua sắm →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
