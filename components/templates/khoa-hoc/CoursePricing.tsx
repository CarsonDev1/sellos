"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PLANS = [
  {
    name: "Tự Học",
    price: "1.490.000",
    originalPrice: "2.490.000",
    desc: "Toàn bộ nội dung khóa học + công cụ AI để tự xây hệ thống theo tốc độ của bạn.",
    highlight: false,
    features: [
      "✓ 16 bài học video HD (truy cập trọn đời)",
      "✓ Tài liệu + template + checklist đầy đủ",
      "✓ AI assistant hỗ trợ xây hệ thống",
      "✓ Cộng đồng học viên trên nhóm riêng",
      "✓ Cập nhật nội dung miễn phí mãi mãi",
      "✗ Mentor review hệ thống",
      "✗ Hỗ trợ 1-1 ưu tiên",
    ],
    cta: "Đăng Ký Tự Học",
    ctaVariant: "outline" as const,
  },
  {
    name: "VIP + Mentor",
    price: "2.990.000",
    originalPrice: "4.990.000",
    desc: "Tất cả trong gói Tự Học + Mentor đồng hành 1-1 review hệ thống của bạn mỗi ngày trong 7 ngày.",
    highlight: true,
    badge: "Phổ biến nhất",
    features: [
      "✓ 16 bài học video HD (truy cập trọn đời)",
      "✓ Tài liệu + template + checklist đầy đủ",
      "✓ AI assistant hỗ trợ xây hệ thống",
      "✓ Cộng đồng học viên trên nhóm riêng",
      "✓ Cập nhật nội dung miễn phí mãi mãi",
      "✓ Mentor review hệ thống mỗi ngày (7 ngày)",
      "✓ Hỗ trợ 1-1 qua Zalo ưu tiên",
    ],
    cta: "Đăng Ký VIP + Mentor",
    ctaVariant: "default" as const,
  },
];

export default function CoursePricing() {
  return (
    <section id="gia" className="py-20 px-4 bg-slate-50">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-1.5 text-sm text-blue-700 font-medium mb-4">
            💰 Học phí
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
            Đầu Tư Một Lần — Thu Hoạch Mãi Mãi
          </h2>
          <p className="text-slate-500 text-base max-w-lg mx-auto">
            So với chi phí thuê developer (15-30 triệu/tháng), đây là khoản đầu
            tư có ROI cao nhất bạn từng thực hiện.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {PLANS.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={cn(
                "rounded-2xl border p-7 flex flex-col gap-5 relative",
                plan.highlight
                  ? "bg-blue-600 border-blue-600 shadow-2xl shadow-blue-200"
                  : "bg-white border-slate-200 shadow-sm"
              )}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-900 text-xs font-bold px-4 py-1 rounded-full">
                  {plan.badge}
                </div>
              )}

              <div>
                <p
                  className={cn(
                    "font-heading font-semibold text-base",
                    plan.highlight ? "text-blue-100" : "text-slate-500"
                  )}
                >
                  {plan.name}
                </p>
                <div className="flex items-end gap-2 mt-1">
                  <span
                    className={cn(
                      "font-heading font-bold text-4xl",
                      plan.highlight ? "text-white" : "text-slate-900"
                    )}
                  >
                    {plan.price}₫
                  </span>
                  <span
                    className={cn(
                      "text-sm line-through mb-1.5",
                      plan.highlight ? "text-blue-300" : "text-slate-400"
                    )}
                  >
                    {plan.originalPrice}₫
                  </span>
                </div>
                <p
                  className={cn(
                    "text-sm mt-2 leading-relaxed",
                    plan.highlight ? "text-blue-100" : "text-slate-500"
                  )}
                >
                  {plan.desc}
                </p>
              </div>

              <ul className="space-y-2.5 flex-1">
                {plan.features.map((f, fi) => (
                  <li
                    key={fi}
                    className={cn(
                      "text-sm flex items-start gap-2",
                      f.startsWith("✗")
                        ? plan.highlight
                          ? "text-blue-300/60"
                          : "text-slate-300"
                        : plan.highlight
                        ? "text-white"
                        : "text-slate-700"
                    )}
                  >
                    {f}
                  </li>
                ))}
              </ul>

              <Button
                size="lg"
                variant={plan.highlight ? "default" : plan.ctaVariant}
                className={cn(
                  "w-full font-semibold h-12",
                  plan.highlight
                    ? "bg-white text-blue-600 hover:bg-blue-50"
                    : "border-slate-300 hover:bg-slate-50"
                )}
                asChild
              >
                <a href="#">{plan.cta}</a>
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-white border border-slate-200 rounded-2xl p-6 max-w-3xl mx-auto flex items-center gap-4 shadow-sm"
        >
          <div className="text-4xl flex-shrink-0">🛡️</div>
          <div>
            <p className="font-heading font-semibold text-slate-900">
              Cam kết hoàn tiền 100% trong 7 ngày
            </p>
            <p className="text-slate-500 text-sm mt-0.5">
              Nếu bạn thấy không phù hợp trong 7 ngày đầu, chúng tôi hoàn toàn
              bộ học phí. Không hỏi lý do.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
