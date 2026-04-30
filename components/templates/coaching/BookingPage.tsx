"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

type Step = 1 | 2 | 3 | 4;

const SERVICES = [
  { id: "1-1", label: "Tư Vấn 1-1", price: "5.000.000₫ / tháng", desc: "4 buổi / tháng, hỗ trợ không giới hạn" },
  { id: "nhom", label: "Coaching Nhóm", price: "2.500.000₫ / tháng", desc: "4 buổi nhóm / tháng, tối đa 6 người" },
  { id: "vip", label: "VIP Intensive", price: "15.000.000₫ / ngày", desc: "1 ngày full-day, action plan hoàn chỉnh" },
  { id: "discovery", label: "Discovery Call (Miễn phí)", price: "0₫", desc: "30 phút, khám phá xem chúng ta có fit không" },
];

const DAYS = [
  { label: "T2", date: "30/4" },
  { label: "T3", date: "01/5" },
  { label: "T4", date: "02/5" },
  { label: "T5", date: "03/5" },
  { label: "T6", date: "04/5" },
  { label: "T7", date: "05/5" },
  { label: "CN", date: "06/5" },
];
const SLOTS = ["9:00", "10:30", "12:00", "14:00", "15:30", "17:00"];
const TAKEN_SLOTS = [1, 4, 7, 14, 20, 28, 31, 35];

const BUDGETS = ["Dưới 5 triệu/tháng", "5–10 triệu/tháng", "10–25 triệu/tháng", "Trên 25 triệu/tháng", "Chưa xác định"];

export default function BookingPage() {
  const [step, setStep] = useState<Step>(1);
  const [service, setService] = useState("discovery");
  const [day, setDay] = useState<number | null>(null);
  const [slot, setSlot] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", email: "", goal: "", budget: "" });
  const [booked, setBooked] = useState(false);

  function handleField(f: string, v: string) { setForm((prev) => ({ ...prev, [f]: v })); }
  function step3Valid() { return form.name && form.phone && form.email && form.goal && form.budget; }

  const bookingCode = `KB-${Math.floor(10000 + Math.random() * 90000)}`;

  if (booked) {
    return (
      <div className="pt-24 pb-16 px-4 min-h-screen bg-slate-50">
        <div className="container mx-auto max-w-lg text-center py-16">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", damping: 15 }}>
            <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="font-heading font-bold text-slate-900 text-2xl sm:text-3xl mb-3">Đặt lịch thành công! 🎉</h1>
            <p className="text-slate-500 mb-1">Mã booking: <span className="font-bold text-slate-900">{bookingCode}</span></p>
            <p className="text-slate-500 text-sm mb-8">Anh Khoa sẽ gửi xác nhận qua email và gọi điện xác nhận trong vòng 2 tiếng.</p>
            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 text-left space-y-2.5 text-sm mb-8">
              <div className="flex justify-between">
                <span className="text-slate-500">Dịch vụ</span>
                <span className="font-semibold text-slate-900">{SERVICES.find((s) => s.id === service)?.label}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Ngày</span>
                <span className="font-semibold text-slate-900">{day !== null ? `${DAYS[day].label} ${DAYS[day].date}/5` : "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Giờ</span>
                <span className="font-semibold text-slate-900">{slot !== null ? SLOTS[slot] : "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Họ tên</span>
                <span className="font-semibold text-slate-900">{form.name}</span>
              </div>
            </div>
            <Link href="/templates/coaching" className="inline-block px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-xl transition-colors text-sm">
              Về trang chủ
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 px-4 min-h-screen bg-slate-50">
      <div className="container mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/templates/coaching" className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-amber-600 transition-colors mb-4">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Quay lại
          </Link>
          <h1 className="font-heading font-bold text-slate-900 text-2xl sm:text-3xl">Đặt Lịch Tư Vấn</h1>
          <p className="text-slate-400 text-sm mt-1">Discovery Call hoàn toàn miễn phí · 30 phút · Qua Zoom</p>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-8">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="flex items-center gap-2 flex-1 last:flex-none">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-colors ${
                step > n ? "bg-amber-500 text-white" : step === n ? "bg-amber-500 text-white ring-4 ring-amber-100" : "bg-slate-200 text-slate-500"
              }`}>
                {step > n ? "✓" : n}
              </div>
              {n < 4 && <div className={`flex-1 h-0.5 rounded-full transition-colors ${step > n ? "bg-amber-400" : "bg-slate-200"}`} />}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">

          {/* Step 1 — Service */}
          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
              <h2 className="font-heading font-bold text-slate-900 text-base">Bạn muốn tư vấn về gì?</h2>
              {SERVICES.map((s) => (
                <button key={s.id} onClick={() => setService(s.id)} className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all ${service === s.id ? "border-amber-500 bg-amber-50" : "border-slate-200 bg-white hover:border-amber-300"}`}>
                  <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${service === s.id ? "border-amber-500 bg-amber-500" : "border-slate-300"}`}>
                    {service === s.id && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900 text-sm">{s.label}</p>
                    <p className="text-slate-400 text-xs mt-0.5">{s.desc}</p>
                  </div>
                  <span className="text-sm font-bold text-amber-600 flex-shrink-0">{s.price}</span>
                </button>
              ))}
              <button onClick={() => setStep(2)} className="w-full py-3.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm rounded-xl transition-colors mt-2">
                Tiếp theo →
              </button>
            </motion.div>
          )}

          {/* Step 2 — Date & Time */}
          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6 bg-white rounded-2xl border border-slate-100 p-6">
              <h2 className="font-heading font-bold text-slate-900 text-base">Chọn ngày và giờ</h2>

              <div>
                <p className="text-sm font-semibold text-slate-700 mb-3">Ngày</p>
                <div className="grid grid-cols-7 gap-1.5">
                  {DAYS.map((d, i) => (
                    <button key={i} onClick={() => { setDay(i); setSlot(null); }} className={`py-2 rounded-xl text-center text-xs font-semibold transition-all ${day === i ? "bg-amber-500 text-white shadow-md" : "bg-slate-50 text-slate-500 hover:bg-amber-50 hover:text-amber-700 border border-slate-200"}`}>
                      <span className="block">{d.label}</span>
                      <span className="block text-[10px] mt-0.5 opacity-70">{d.date}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-700 mb-3">Khung giờ</p>
                <div className="grid grid-cols-3 gap-2">
                  {SLOTS.map((s, i) => {
                    const idx = (day ?? 0) * 6 + i;
                    const taken = TAKEN_SLOTS.includes(idx);
                    return (
                      <button key={i} disabled={taken || day === null} onClick={() => setSlot(i)} className={`py-2.5 rounded-xl text-xs font-semibold transition-all ${
                        taken ? "bg-slate-50 text-slate-300 line-through cursor-not-allowed"
                        : slot === i ? "bg-amber-500 text-white shadow-md"
                        : day === null ? "bg-slate-50 text-slate-300 cursor-not-allowed"
                        : "bg-slate-50 text-slate-600 hover:bg-amber-50 hover:text-amber-700 border border-slate-200"
                      }`}>
                        {taken ? "Đã đặt" : s}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="flex-1 py-3.5 border border-slate-200 text-slate-700 hover:border-amber-400 font-semibold text-sm rounded-xl transition-colors">← Quay lại</button>
                <button disabled={day === null || slot === null} onClick={() => setStep(3)} className="flex-1 py-3.5 bg-amber-600 hover:bg-amber-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold text-sm rounded-xl transition-colors">Tiếp theo →</button>
              </div>
            </motion.div>
          )}

          {/* Step 3 — Info */}
          {step === 3 && (
            <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="bg-white rounded-2xl border border-slate-100 p-6 space-y-5">
              <h2 className="font-heading font-bold text-slate-900 text-base">Thông tin của bạn</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Họ và tên *</label>
                  <input type="text" value={form.name} onChange={(e) => handleField("name", e.target.value)} placeholder="Nguyễn Văn A" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Số điện thoại *</label>
                  <input type="tel" value={form.phone} onChange={(e) => handleField("phone", e.target.value)} placeholder="0901 234 567" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email *</label>
                <input type="email" value={form.email} onChange={(e) => handleField("email", e.target.value)} placeholder="ten@email.com" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Mục tiêu lớn nhất bạn muốn đạt trong 6 tháng tới? *</label>
                <textarea value={form.goal} onChange={(e) => handleField("goal", e.target.value)} placeholder="VD: Tăng doanh thu từ 200tr lên 500tr, mở thêm chi nhánh, xây team..." rows={3} className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent resize-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Ngân sách coaching hàng tháng? *</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {BUDGETS.map((b) => (
                    <button key={b} onClick={() => handleField("budget", b)} className={`py-2.5 px-4 rounded-xl text-xs font-semibold text-left border transition-all ${form.budget === b ? "bg-amber-50 border-amber-400 text-amber-700" : "bg-white border-slate-200 text-slate-600 hover:border-amber-300"}`}>{b}</button>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(2)} className="flex-1 py-3.5 border border-slate-200 text-slate-700 hover:border-amber-400 font-semibold text-sm rounded-xl transition-colors">← Quay lại</button>
                <button disabled={!step3Valid()} onClick={() => setStep(4)} className="flex-1 py-3.5 bg-amber-600 hover:bg-amber-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold text-sm rounded-xl transition-colors">Xem lại →</button>
              </div>
            </motion.div>
          )}

          {/* Step 4 — Confirm */}
          {step === 4 && (
            <motion.div key="s4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
              <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-3 text-sm">
                <h2 className="font-heading font-bold text-slate-900 text-base mb-4">Xác nhận đặt lịch</h2>
                {[
                  { label: "Dịch vụ", value: SERVICES.find((s) => s.id === service)?.label },
                  { label: "Ngày", value: day !== null ? `${DAYS[day].label}, ${DAYS[day].date}/05/2025` : "" },
                  { label: "Giờ", value: slot !== null ? SLOTS[slot] : "" },
                  { label: "Họ tên", value: form.name },
                  { label: "Điện thoại", value: form.phone },
                  { label: "Email", value: form.email },
                  { label: "Ngân sách", value: form.budget },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between gap-4">
                    <span className="text-slate-500">{row.label}</span>
                    <span className="font-semibold text-slate-900 text-right">{row.value}</span>
                  </div>
                ))}
                <div className="pt-2 border-t border-slate-100">
                  <p className="text-slate-500 text-xs leading-relaxed">Mục tiêu: <span className="text-slate-700">{form.goal}</span></p>
                </div>
              </div>

              <div className="bg-amber-50 rounded-xl border border-amber-100 p-4 text-xs text-amber-700">
                ✓ Anh Khoa sẽ xác nhận qua email và gọi điện trong vòng 2 tiếng. Discovery Call miễn phí, không ép mua.
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep(3)} className="flex-1 py-3.5 border border-slate-200 text-slate-700 hover:border-amber-400 font-semibold text-sm rounded-xl transition-colors">← Quay lại</button>
                <button onClick={() => setBooked(true)} className="flex-1 py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-sm rounded-xl transition-all shadow-sm shadow-amber-200">
                  Xác Nhận Đặt Lịch ✓
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
