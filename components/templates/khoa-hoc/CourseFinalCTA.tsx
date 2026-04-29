"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function CourseFinalCTA() {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-blue-600 to-indigo-700 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4" />

      <div className="relative container mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm text-white font-medium">
            🔥 Ưu đãi kết thúc sớm — Chỉ còn 23 suất VIP
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Bắt Đầu Ngay Hôm Nay —<br className="hidden sm:block" /> Đơn Đầu
            Tiên Đang Chờ Bạn
          </h2>

          <p className="text-blue-100 text-lg max-w-xl mx-auto leading-relaxed">
            Mỗi ngày trì hoãn là một ngày đối thủ tiến lên. Bắt đầu ngay hôm
            nay và có hệ thống bán hàng hoàn chỉnh trong 7 ngày.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50 font-semibold text-base px-10 h-14 shadow-lg"
              asChild
            >
              <a href="#gia">🎓 Đăng Ký Ngay — Giảm 40%</a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/40 text-white hover:bg-white/10 hover:border-white text-base px-10 h-14"
              asChild
            >
              <a href="#chuong-trinh">Xem Chương Trình Trước</a>
            </Button>
          </div>

          {/* Guarantees */}
          <div className="flex flex-wrap justify-center gap-6 pt-4 text-sm text-blue-200">
            <span className="flex items-center gap-2">
              <span className="text-white">🛡️</span>
              Hoàn tiền 100% trong 7 ngày
            </span>
            <span className="text-white/30">·</span>
            <span className="flex items-center gap-2">
              <span className="text-white">♾️</span>
              Truy cập trọn đời
            </span>
            <span className="text-white/30">·</span>
            <span className="flex items-center gap-2">
              <span className="text-white">🚀</span>
              Ra đơn trong 7 ngày hoặc hoàn tiền
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
