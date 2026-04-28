"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const KIT_FEATURES = [
  "Truy cập AI chat tích hợp trên SellOS",
  "Toàn bộ thư viện template",
  "Prompt tự động điền thông tin",
  "Video hướng dẫn từng bước",
  "Checklist 7 ngày",
  "Support qua group",
];

const PRO_EXTRAS = [
  "Mentor 1-1 trong 7 ngày",
  "Review và feedback từng bước của bạn",
  "Support ưu tiên, phản hồi trong 2 giờ",
  "1 buổi review hệ thống sau khi ra mắt",
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 px-4 bg-slate-50">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
            Chọn Gói Phù Hợp
          </h2>
          <p className="text-slate-500 text-base">
            Cả 2 gói đều dùng chung nền tảng SellOS với AI tích hợp sẵn.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Kit */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="h-full bg-white border-slate-200 shadow-sm flex flex-col">
              <CardHeader className="pb-4">
                <CardTitle className="font-heading text-slate-900 text-2xl">
                  SellOS Kit
                </CardTitle>
                <p className="text-slate-500 text-sm">Tự làm theo hướng dẫn</p>
                <div className="pt-3">
                  <span className="font-heading font-bold text-4xl text-slate-900">
                    [Liên hệ]
                  </span>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3">
                  {KIT_FEATURES.map((f, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2.5 text-sm text-slate-600"
                    >
                      <span className="text-green-500 flex-shrink-0 font-semibold">
                        ✓
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="w-full border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 h-12 font-semibold"
                >
                  <Link href="#final-cta">Bắt Đầu Ngay</Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          {/* Pro */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="h-full bg-white border-blue-300 shadow-lg shadow-blue-100 flex flex-col relative ring-1 ring-blue-200">
              {/* Popular badge */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <Badge className="bg-blue-600 text-white font-bold px-4 py-1 text-xs">
                  Phổ biến nhất
                </Badge>
              </div>

              <CardHeader className="pb-4 pt-8">
                <CardTitle className="font-heading text-slate-900 text-2xl">
                  SellOS Pro
                </CardTitle>
                <p className="text-slate-500 text-sm">Có mentor 1-1 cùng bạn</p>
                <div className="pt-3">
                  <span className="font-heading font-bold text-4xl text-slate-900">
                    [Liên hệ]
                  </span>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-xs text-slate-400 mb-3 uppercase tracking-wider font-semibold">
                  Tất cả trong Kit, cộng thêm:
                </p>
                <ul className="space-y-3">
                  {KIT_FEATURES.map((f, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2.5 text-sm text-slate-600"
                    >
                      <span className="text-green-500 flex-shrink-0 font-semibold">
                        ✓
                      </span>
                      {f}
                    </li>
                  ))}
                  <li className="h-px bg-slate-100 my-1" />
                  {PRO_EXTRAS.map((f, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2.5 text-sm text-blue-700 font-medium"
                    >
                      <span className="text-blue-500 flex-shrink-0 font-semibold">
                        ✓
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  asChild
                  size="lg"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 shadow-md shadow-blue-200"
                >
                  <Link href="#final-cta">Bắt Đầu Với Pro</Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>

        {/* Guarantee */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-8 text-slate-500 text-sm"
        >
          <span className="text-green-500 font-semibold">✓</span> Hoàn tiền 100%
          nếu sau 7 ngày bạn không có hệ thống chạy được —{" "}
          <span className="text-slate-700">không hỏi lý do.</span>
        </motion.p>
      </div>
    </section>
  );
}
