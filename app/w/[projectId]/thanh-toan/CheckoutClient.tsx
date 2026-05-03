"use client";

import { useState } from "react";
import { useCart } from "../CartProviderWrapper";

const PAYMENT_METHODS = [
  { id: "cod", label: "Thanh toán khi nhận hàng (COD)", icon: "💵" },
  { id: "momo", label: "Ví MoMo", icon: "💜" },
  { id: "bank", label: "Chuyển khoản ngân hàng", icon: "🏦" },
  { id: "vnpay", label: "VNPay", icon: "🔵" },
];

export default function CheckoutClient({ projectId }: { projectId: string }) {
  const { items, total, clearCart } = useCart();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [orderNumber, setOrderNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({ name: "", phone: "", address: "", note: "" });
  const [payment, setPayment] = useState("cod");

  function fmt(n: number) { return n.toLocaleString("vi-VN") + "đ"; }

  async function handleSubmit() {
    setLoading(true);
    const res = await fetch(`/api/public/projects/${projectId}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customer_name: form.name,
        customer_phone: form.phone,
        customer_address: form.address,
        customer_note: form.note,
        items: items.map((i) => ({ id: i.product.id, name: i.product.name, qty: i.quantity, price: i.product.price ?? 0, image_url: i.product.image_url })),
        subtotal: total,
        discount: 0,
        total,
        payment_method: payment,
      }),
    });
    const { order } = await res.json();
    setOrderNumber(order?.order_number ?? "#DONE");
    clearCart();
    setStep(3);
    setLoading(false);
  }

  if (items.length === 0 && step !== 3) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-500 mb-4">Giỏ hàng trống</p>
          <a href={`/w/${projectId}`} className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-semibold">← Tiếp tục mua hàng</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-8 pb-16">
      <div className="container mx-auto max-w-4xl px-4">

        {/* Steps */}
        {step < 3 && (
          <div className="flex items-center justify-center gap-3 mb-8">
            {["Thông tin giao hàng", "Thanh toán", "Xác nhận"].map((label, i) => {
              const s = i + 1;
              return (
                <div key={s} className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step >= s ? "bg-rose-600 text-white" : "bg-slate-200 text-slate-400"}`}>{s}</div>
                  <span className={`text-sm font-medium hidden sm:block ${step >= s ? "text-slate-900" : "text-slate-400"}`}>{label}</span>
                  {i < 2 && <div className="w-8 h-px bg-slate-200 mx-1" />}
                </div>
              );
            })}
          </div>
        )}

        {step === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3 bg-white rounded-2xl p-6 border border-slate-200">
              <h2 className="font-heading font-bold text-lg text-slate-900 mb-5">Thông tin giao hàng</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5 block">Họ và tên *</label>
                  <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-100" placeholder="Nguyễn Văn A" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5 block">Số điện thoại *</label>
                  <input required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-100" placeholder="0912 345 678" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5 block">Địa chỉ giao hàng *</label>
                  <textarea required value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} rows={2}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-100 resize-none" placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5 block">Ghi chú</label>
                  <input value={form.note} onChange={e => setForm({ ...form, note: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-100" placeholder="Giao giờ hành chính, gọi trước khi giao..." />
                </div>
              </div>
              <button
                onClick={() => { if (form.name && form.phone && form.address) setStep(2); }}
                disabled={!form.name || !form.phone || !form.address}
                className="w-full mt-6 py-3.5 bg-rose-600 hover:bg-rose-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-semibold rounded-xl transition-all">
                Tiếp tục →
              </button>
            </div>
            <OrderSummary items={items} total={total} fmt={fmt} />
          </div>
        )}

        {step === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3 bg-white rounded-2xl p-6 border border-slate-200">
              <h2 className="font-heading font-bold text-lg text-slate-900 mb-5">Phương thức thanh toán</h2>
              <div className="space-y-3">
                {PAYMENT_METHODS.map((m) => (
                  <label key={m.id} className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${payment === m.id ? "border-rose-500 bg-rose-50" : "border-slate-200 hover:border-slate-300"}`}>
                    <input type="radio" name="payment" value={m.id} checked={payment === m.id} onChange={() => setPayment(m.id)} className="sr-only" />
                    <span className="text-xl">{m.icon}</span>
                    <span className="text-sm font-medium text-slate-800">{m.label}</span>
                    {payment === m.id && (
                      <svg className="w-4 h-4 text-rose-600 ml-auto shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    )}
                  </label>
                ))}
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setStep(1)} className="flex-1 py-3.5 border border-slate-200 text-slate-600 font-semibold rounded-xl hover:bg-slate-50 transition-colors">← Quay lại</button>
                <button onClick={handleSubmit} disabled={loading} className="flex-1 py-3.5 bg-rose-600 hover:bg-rose-700 disabled:opacity-60 text-white font-semibold rounded-xl transition-all">
                  {loading ? "Đang xử lý..." : "Đặt hàng"}
                </button>
              </div>
            </div>
            <OrderSummary items={items} total={total} fmt={fmt} />
          </div>
        )}

        {step === 3 && (
          <div className="max-w-md mx-auto text-center py-12">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center mx-auto mb-5">
              <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="font-heading font-bold text-2xl text-slate-900 mb-2">Đặt hàng thành công! 🎉</h2>
            <p className="text-slate-500 mb-2">Mã đơn hàng của bạn:</p>
            <div className="inline-block font-mono font-bold text-xl text-rose-600 bg-rose-50 border border-rose-200 px-5 py-2 rounded-xl mb-6">{orderNumber}</div>
            <p className="text-sm text-slate-500 mb-8">Chúng tôi sẽ liên hệ xác nhận đơn hàng trong thời gian sớm nhất.</p>
            <a href={`/w/${projectId}`} className="px-8 py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-xl transition-colors">
              Tiếp tục mua hàng
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

function OrderSummary({ items, total, fmt }: { items: ReturnType<typeof useCart>["items"]; total: number; fmt: (n: number) => string }) {
  return (
    <div className="lg:col-span-2">
      <div className="bg-white rounded-2xl p-5 border border-slate-200 sticky top-6">
        <h3 className="font-semibold text-slate-900 mb-4">Đơn hàng ({items.length} sản phẩm)</h3>
        <div className="space-y-3 mb-4">
          {items.map((item) => (
            <div key={item.product.id} className="flex gap-3">
              <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden shrink-0">
                {item.product.image_url && <img src={item.product.image_url} alt={item.product.name} className="w-full h-full object-cover" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-slate-800 line-clamp-1">{item.product.name}</p>
                {item.selectedSize && <p className="text-[10px] text-slate-400">Size: {item.selectedSize}</p>}
                <p className="text-xs text-slate-500">x{item.quantity}</p>
              </div>
              <span className="text-sm font-semibold text-slate-900 shrink-0">{fmt((item.product.price ?? 0) * item.quantity)}</span>
            </div>
          ))}
        </div>
        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between text-sm text-slate-500"><span>Tạm tính</span><span>{fmt(total)}</span></div>
          <div className="flex justify-between text-sm text-slate-500"><span>Phí vận chuyển</span><span className="text-emerald-600">Miễn phí</span></div>
          <div className="flex justify-between font-bold text-slate-900 pt-2 border-t"><span>Tổng cộng</span><span>{fmt(total)}</span></div>
        </div>
      </div>
    </div>
  );
}
