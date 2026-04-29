"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const MODULES = [
  {
    id: "module-1",
    title: "Module 1: Tìm Sản Phẩm & Định Vị Thị Trường",
    duration: "4 bài · ~3 giờ",
    lessons: [
      "Bài 1.1 — Cách xác định nhu cầu thị trường bằng dữ liệu thực",
      "Bài 1.2 — Chọn sản phẩm: checklist 10 tiêu chí không thể bỏ qua",
      "Bài 1.3 — Định vị USP — lý do khách chọn bạn thay vì đối thủ",
      "Bài 1.4 — Xây dựng avatar khách hàng lý tưởng (ICP)",
    ],
    tag: "Nền tảng",
    tagColor: "bg-violet-100 text-violet-700",
  },
  {
    id: "module-2",
    title: "Module 2: Xây Landing Page Bằng AI",
    duration: "5 bài · ~4 giờ",
    lessons: [
      "Bài 2.1 — Giới thiệu SellOS và cách dùng AI chat để xây page",
      "Bài 2.2 — Cấu trúc landing page chuyển đổi cao (8 sections)",
      "Bài 2.3 — Viết headline và copy thuyết phục bằng AI",
      "Bài 2.4 — Tích hợp form, cổng thanh toán, pixel tracking",
      "Bài 2.5 — Deploy live và kiểm tra trước khi chạy traffic",
    ],
    tag: "Thực hành",
    tagColor: "bg-blue-100 text-blue-700",
  },
  {
    id: "module-3",
    title: "Module 3: Chatbot & Email Tự Động Hóa",
    duration: "4 bài · ~3 giờ",
    lessons: [
      "Bài 3.1 — Thiết lập chatbot tư vấn tự động trên web và Messenger",
      "Bài 3.2 — Train chatbot theo sản phẩm của bạn — 15 câu hỏi phổ biến",
      "Bài 3.3 — Xây chuỗi email welcome + nurture + upsell",
      "Bài 3.4 — Automation flows: từ lead đến khách hàng không cần tay",
    ],
    tag: "Tự động hóa",
    tagColor: "bg-teal-100 text-teal-700",
  },
  {
    id: "module-4",
    title: "Module 4: Chạy Traffic & Tối Ưu",
    duration: "3 bài · ~2.5 giờ",
    lessons: [
      "Bài 4.1 — Facebook Ads cơ bản: target đúng người, ngân sách thấp",
      "Bài 4.2 — TikTok Ads và content organic — cách tăng traffic 0 đồng",
      "Bài 4.3 — Đọc số liệu, A/B test và nhân rộng những gì đang chạy tốt",
    ],
    tag: "Scale",
    tagColor: "bg-amber-100 text-amber-700",
  },
];

export default function Curriculum() {
  return (
    <section id="chuong-trinh" className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-1.5 text-sm text-blue-700 font-medium mb-4">
            📋 Chương trình học
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
            Lộ Trình 7 Ngày — Chi Tiết Từng Bước
          </h2>
          <p className="text-slate-500 text-base max-w-lg mx-auto">
            16 bài học thực chiến. Mỗi bài có video hướng dẫn + file tài liệu
            + bài tập thực hành ngay.
          </p>

          {/* Summary stats */}
          <div className="flex justify-center gap-8 mt-6">
            {[
              { value: "4", label: "Modules" },
              { value: "16", label: "Bài học" },
              { value: "12.5h", label: "Video" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <p className="font-heading font-bold text-2xl text-blue-600">
                  {s.value}
                </p>
                <p className="text-slate-400 text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Accordion type="multiple" className="space-y-3">
            {MODULES.map((mod) => (
              <AccordionItem
                key={mod.id}
                value={mod.id}
                className="border border-slate-200 rounded-xl px-6 bg-white shadow-sm data-[state=open]:border-blue-200 data-[state=open]:shadow-md transition-all"
              >
                <AccordionTrigger className="hover:no-underline py-5">
                  <div className="flex items-center gap-4 text-left w-full pr-4">
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${mod.tagColor}`}
                    >
                      {mod.tag}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-heading font-semibold text-slate-900 text-sm sm:text-base">
                        {mod.title}
                      </p>
                      <p className="text-slate-400 text-xs mt-0.5">
                        {mod.duration}
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 pb-2">
                    {mod.lessons.map((lesson, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-3 text-slate-600 text-sm py-1.5 border-t border-slate-50 first:border-0"
                      >
                        <span className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xs flex-shrink-0">
                          ▶
                        </span>
                        {lesson}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
