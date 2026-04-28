"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Highlight } from "@/components/ui/highlight";

export default function WhatYouGet() {
  return (
    <section className="py-24 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-3 leading-[1.25]">
            Sau 7 Ngày Bạn Có{" "}
            <Highlight variant="green">Đủ 5 Thứ Này</Highlight>
          </h2>
          <p className="text-slate-500 text-base">
            Không phải demo. Hệ thống thật, chạy thật, nhận đơn thật.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr"
        >
          {/* Card 1: Landing Page — featured, spans 2 cols */}
          <div className="lg:col-span-2 rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-7 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 group relative overflow-hidden">
            {/* Big background icon */}
            <div className="absolute right-6 bottom-0 text-[100px] opacity-10 select-none pointer-events-none group-hover:opacity-15 transition-opacity">
              🏪
            </div>
            <div className="relative">
              <div className="text-3xl mb-4">🏪</div>
              <h3 className="font-heading font-bold text-slate-900 text-xl mb-2 leading-snug">
                Landing Page Chuyển Đổi Cao
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4 max-w-lg">
                Chọn từ hàng chục template đẹp có sẵn. AI điền nội dung theo
                sản phẩm của bạn, deploy lên domain riêng trong vài phút.
              </p>
              <Badge
                variant="outline"
                className="border-blue-300 text-blue-700 bg-blue-100 text-xs font-medium"
              >
                ✓ Template có sẵn
              </Badge>
            </div>
          </div>

          {/* Card 2: Chatbot */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 group relative overflow-hidden">
            <div className="absolute right-4 bottom-0 text-[70px] opacity-8 select-none pointer-events-none">
              🤖
            </div>
            <div className="relative">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🤖</span>
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              </div>
              <h3 className="font-heading font-bold text-slate-900 text-base mb-2 leading-snug">
                AI Chatbot Tư Vấn 24/7
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-3">
                Tự tư vấn và chốt đơn kể cả lúc 3 giờ sáng.
              </p>
              <Badge
                variant="outline"
                className="border-green-200 text-green-700 bg-green-50 text-xs"
              >
                ✓ Xây ngay trên SellOS
              </Badge>
            </div>
          </div>

          {/* Card 3: Payment */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 group relative overflow-hidden">
            <div className="absolute right-4 bottom-0 text-[70px] opacity-8 select-none pointer-events-none">
              💳
            </div>
            <div className="relative">
              <div className="text-2xl mb-4">💳</div>
              <h3 className="font-heading font-bold text-slate-900 text-base mb-2 leading-snug">
                Cổng Thanh Toán Tự Động
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-3">
                SePay / MoMo — khách đặt hàng, tiền về tài khoản.
              </p>
              <Badge
                variant="outline"
                className="border-green-200 text-green-700 bg-green-50 text-xs"
              >
                ✓ Video hướng dẫn 5 phút
              </Badge>
            </div>
          </div>

          {/* Card 4: Admin Panel — spans 2 cols */}
          <div className="lg:col-span-2 rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 to-purple-50 p-7 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 group relative overflow-hidden">
            <div className="absolute right-6 bottom-0 text-[100px] opacity-10 select-none pointer-events-none group-hover:opacity-15 transition-opacity">
              📊
            </div>
            <div className="relative">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="font-heading font-bold text-slate-900 text-xl mb-2 leading-snug">
                Admin Panel & Email Marketing Tự Động
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4 max-w-lg">
                Dashboard xem đơn hàng, doanh thu real-time. Cộng chuỗi 5 email
                tự chạy: xác nhận đơn → nhắc thanh toán → follow-up → upsell →
                xin review.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant="outline"
                  className="border-violet-300 text-violet-700 bg-violet-100 text-xs"
                >
                  ✓ Xây ngay trên SellOS
                </Badge>
                <Badge
                  variant="outline"
                  className="border-violet-300 text-violet-700 bg-violet-100 text-xs"
                >
                  ✓ Template email sẵn
                </Badge>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
