"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const DAYS = ["T2\n30/4", "T3\n01/5", "T4\n02/5", "T5\n03/5", "T6\n04/5", "T7\n05/5", "CN\n06/5"];
const SLOTS = ["9:00", "10:30", "14:00", "15:30", "17:00", "19:00"];
const TAKEN = [0, 2, 4, 8, 11, 15, 17, 20, 22, 30, 33, 35, 36, 38];

export default function CoachCTA() {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-slate-900 via-amber-950 to-slate-900">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          {/* Urgency badge */}
          <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-full px-4 py-2 text-sm text-red-400 font-semibold mb-6">
            🔴 Slot tháng 5 còn 3 chỗ — ưu tiên theo thứ tự đăng ký
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-3">
            Đặt Discovery Call<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
              Miễn Phí 30 Phút
            </span>
          </h2>
          <p className="text-slate-300 text-base max-w-md mx-auto">
            Chúng ta sẽ nói về tình huống của bạn — không pitch, không áp lực. Nếu fit, tôi sẽ đề xuất bước tiếp theo.
          </p>
        </motion.div>

        {/* Calendar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-sm"
        >
          {/* Days */}
          <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3">Chọn ngày</p>
          <div className="grid grid-cols-7 gap-2 mb-6">
            {DAYS.map((d, i) => (
              <button
                key={i}
                onClick={() => { setSelectedDay(i); setSelectedSlot(null); }}
                className={`py-2.5 rounded-xl text-center text-xs font-semibold transition-all whitespace-pre-line leading-tight ${
                  selectedDay === i
                    ? "bg-amber-500 text-white shadow-lg shadow-amber-500/30"
                    : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/10"
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          {/* Slots */}
          <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3">Chọn khung giờ</p>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-8">
            {SLOTS.map((slot, i) => {
              const idx = selectedDay !== null ? selectedDay * 6 + i : i;
              const isTaken = TAKEN.includes(idx);
              return (
                <button
                  key={i}
                  disabled={isTaken || selectedDay === null}
                  onClick={() => setSelectedSlot(i)}
                  className={`py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isTaken
                      ? "bg-white/5 text-slate-600 line-through cursor-not-allowed border border-white/5"
                      : selectedSlot === i && selectedDay !== null
                      ? "bg-amber-500 text-white shadow-lg shadow-amber-500/30"
                      : selectedDay === null
                      ? "bg-white/5 text-slate-600 cursor-not-allowed border border-white/5"
                      : "bg-white/10 text-slate-300 hover:bg-amber-500/20 hover:text-amber-300 border border-white/10"
                  }`}
                >
                  {isTaken ? "Đã đặt" : slot}
                </button>
              );
            })}
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3 items-center">
            <Link
              href="/templates/coaching/dat-lich"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold px-10 py-4 rounded-2xl text-sm transition-all shadow-lg shadow-amber-500/30"
            >
              {selectedDay !== null && selectedSlot !== null
                ? `Đặt lịch ${SLOTS[selectedSlot]} · ${DAYS[selectedDay].split("\n")[1]}`
                : "Đặt Discovery Call Ngay"
              }
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <p className="text-slate-400 text-xs text-center sm:text-left">
              Miễn phí · 30 phút · Qua Zoom<br />Không ép mua sau cuộc gọi
            </p>
          </div>
        </motion.div>

        {/* Final trust row */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mt-10">
          {["300+ clients đã tin tưởng", "Hoàn tiền nếu không đạt KPI", "Forbes 30 Under 30", "10 năm kinh nghiệm"].map((t) => (
            <div key={t} className="flex items-center gap-2 text-slate-400 text-sm">
              <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {t}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
