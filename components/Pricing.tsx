"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SignUpButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { Check } from "lucide-react";

const KIT_FEATURES = [
  "Dùng AI dựng web ngay trên SellOS — không cần tài khoản ChatGPT",
  "Toàn bộ thư viện mẫu website đẹp theo ngành",
  "Tự động điền thông tin sản phẩm vào đúng chỗ",
  "Video hướng dẫn từng bước, mỗi video dưới 10 phút",
  "Danh sách việc cần làm 7 ngày — không bị lạc đường",
  "Hỏi đáp qua group — có người trả lời trong ngày",
];

const PRO_EXTRAS = [
  "Có người kèm 1-1 trong 7 ngày",
  "Xem và góp ý cho từng bước bạn làm",
  "Trả lời ưu tiên, trong vòng 2 giờ",
  "1 buổi xem lại toàn hệ thống sau khi ra mắt",
];

export default function Pricing() {
  const { isSignedIn } = useAuth();

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
          <span className="inline-block text-xs font-semibold text-blue-600 uppercase tracking-[0.15em] mb-3">
            Chi phí
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
            Chọn cách phù hợp với bạn
          </h2>
          <p className="text-slate-500 text-base">
            Cả 2 gói đều dùng chung SellOS với AI tích hợp sẵn — chỉ khác việc bạn tự làm hay có người kèm.
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
                <p className="text-slate-500 text-sm">Bạn tự làm theo hướng dẫn</p>
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
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0" strokeWidth={3} />
                      {f}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                {isSignedIn ? (
                  <Button asChild variant="outline" size="lg" className="w-full border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 h-12 font-semibold">
                    <Link href="/dashboard">Vào Dashboard</Link>
                  </Button>
                ) : (
                  <SignUpButton mode="modal">
                    <Button variant="outline" size="lg" className="w-full border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 h-12 font-semibold">
                      Bắt Đầu Ngay
                    </Button>
                  </SignUpButton>
                )}
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
                <p className="text-slate-500 text-sm">Có người kèm 1-1 trong 7 ngày</p>
                <div className="pt-3">
                  <span className="font-heading font-bold text-4xl text-slate-900">
                    [Liên hệ]
                  </span>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-xs text-slate-400 mb-3 uppercase tracking-wider font-semibold">
                  Có tất cả của Kit, kèm thêm:
                </p>
                <ul className="space-y-3">
                  {KIT_FEATURES.map((f, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2.5 text-sm text-slate-600"
                    >
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0" strokeWidth={3} />
                      {f}
                    </li>
                  ))}
                  <li className="h-px bg-slate-100 my-1" />
                  {PRO_EXTRAS.map((f, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2.5 text-sm text-blue-700 font-medium"
                    >
                      <Check className="w-4 h-4 text-blue-600 flex-shrink-0" strokeWidth={3} />
                      {f}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                {isSignedIn ? (
                  <Button asChild size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 shadow-md shadow-blue-200">
                    <Link href="/dashboard">Vào Dashboard</Link>
                  </Button>
                ) : (
                  <SignUpButton mode="modal">
                    <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 shadow-md shadow-blue-200">
                      Bắt Đầu Với Pro
                    </Button>
                  </SignUpButton>
                )}
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
          <span className="inline-flex items-center gap-1.5 align-middle">
            <Check className="w-4 h-4 text-green-600" strokeWidth={3} />
            <span className="font-semibold text-slate-700">Hoàn tiền 100%</span>
          </span>{" "}
          nếu sau 7 ngày bạn vẫn chưa có hệ thống chạy được —{" "}
          <span className="text-slate-700">không cần giải thích lý do.</span>
        </motion.p>
      </div>
    </section>
  );
}
