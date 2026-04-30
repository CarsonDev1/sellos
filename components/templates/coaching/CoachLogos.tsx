"use client";

import { motion } from "framer-motion";

const CLIENTS = ["Shopee Vietnam", "VNDirect", "VinGroup", "The Coffee House", "VTV", "Shark Tank VN"];
const MEDIA = ["Forbes Vietnam", "CafeBiz", "VnExpress", "Doanh Nhân Sài Gòn", "Nhịp Cầu Đầu Tư"];

export default function CoachLogos() {
  return (
    <section className="py-12 px-4 bg-slate-50 border-y border-slate-100">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Clients */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap flex-shrink-0">
              Đã tư vấn cho
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
              {CLIENTS.map((c) => (
                <span key={c} className="font-heading font-bold text-slate-300 text-base sm:text-lg hover:text-slate-400 transition-colors cursor-default">
                  {c}
                </span>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-200" />

          {/* Media */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap flex-shrink-0">
              Xuất hiện trên
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
              {MEDIA.map((m) => (
                <span key={m} className="font-semibold text-slate-300 text-sm hover:text-amber-400 transition-colors cursor-default">
                  {m}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
