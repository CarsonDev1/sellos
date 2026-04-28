"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FOR_LIST = [
  "Chủ shop online muốn bán hàng tự động",
  "Freelancer / coach muốn bán dịch vụ online",
  "Solopreneur không có team kỹ thuật",
  "Người mới bắt đầu kinh doanh online",
];

const NOT_FOR_LIST = [
  "Doanh nghiệp lớn cần enterprise solution",
  "Người muốn người khác làm hết thay mình (xem gói Done-For-You riêng)",
];

export default function WhoItsFor() {
  return (
    <section className="py-24 px-4 bg-white">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900">
            Dành Cho Ai?
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* For */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="h-full bg-white border-green-200 shadow-sm">
              <CardHeader>
                <CardTitle className="font-heading text-slate-900 text-xl flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-green-100 border border-green-200 flex items-center justify-center text-green-600 text-sm">
                    ✓
                  </span>
                  Phù hợp
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {FOR_LIST.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-green-100 border border-green-200 flex items-center justify-center text-green-600 text-xs">
                        ✓
                      </span>
                      <span className="text-slate-600 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Not for */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="h-full bg-white border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle className="font-heading text-slate-900 text-xl flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 text-sm">
                    ✗
                  </span>
                  Không phù hợp
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {NOT_FOR_LIST.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 text-xs">
                        ✗
                      </span>
                      <span className="text-slate-500 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
