"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    q: "Tôi không biết code có làm được không?",
    a: "Hoàn toàn được. Bạn chỉ cần chọn template và chat với AI ngay trên SellOS — AI tạo ra toàn bộ code, bạn không cần viết hay hiểu một dòng nào.",
  },
  {
    q: "Tôi có cần tài khoản Claude hay ChatGPT không?",
    a: "Không cần. AI đã được tích hợp sẵn vào SellOS. Bạn chat ngay trên nền tảng — không cần đăng ký thêm bất kỳ dịch vụ nào.",
  },
  {
    q: "Mỗi ngày cần bỏ ra bao nhiêu thời gian?",
    a: "Khoảng 1–2 giờ mỗi ngày. Không cần ngồi cả buổi. Mỗi giai đoạn có checklist rõ ràng — làm xong là nghỉ, hôm sau tiếp tục.",
  },
  {
    q: "Sau 7 ngày hệ thống có chạy thật không?",
    a: "Chạy thật. Bạn sẽ có landing page trên domain riêng, chatbot đang tư vấn khách, cổng thanh toán nhận tiền thật. Không phải demo.",
  },
  {
    q: "Nếu tôi bị kẹt ở một bước thì sao?",
    a: "Có video hướng dẫn chi tiết cho từng bước. Nếu vẫn kẹt — đăng vào support group, có người trả lời trong ngày. Gói Pro có mentor 1-1 phản hồi trong 2 giờ.",
  },
  {
    q: "Tôi có thể dùng cho nhiều sản phẩm khác nhau không?",
    a: "Được. Mỗi sản phẩm tạo một project riêng trên SellOS, điền thông tin mới — AI tự điền vào đúng chỗ.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="py-24 px-4 bg-white">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900">
            Câu Hỏi Thường Gặp
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {FAQS.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="bg-white border border-slate-200 rounded-xl px-6 hover:border-blue-200 transition-colors data-[state=open]:border-blue-300 shadow-sm"
              >
                <AccordionTrigger className="font-heading font-semibold text-slate-900 text-left py-5 hover:no-underline hover:text-blue-600 transition-colors text-[15px]">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 text-sm leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
