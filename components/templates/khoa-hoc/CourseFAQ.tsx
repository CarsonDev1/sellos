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
    q: "Tôi không biết gì về kỹ thuật/code — có học được không?",
    a: "Hoàn toàn được. Khóa học được thiết kế cho người không biết code. Bạn chỉ cần biết dùng điện thoại và máy tính cơ bản. AI sẽ làm phần kỹ thuật, bạn chỉ cần trả lời các câu hỏi và phê duyệt kết quả.",
  },
  {
    q: "7 ngày nghe có vẻ nhanh — thực sự có thể ra đơn trong 7 ngày không?",
    a: "Có. 500+ học viên đã làm được. Tất nhiên kết quả phụ thuộc vào mức độ nỗ lực của bạn. Nếu bạn dành 2-3 tiếng mỗi ngày và làm theo đúng lộ trình, khả năng cao bạn sẽ có hệ thống live vào cuối ngày 7. Đơn hàng đầu tiên có thể đến sớm hơn.",
  },
  {
    q: "Sau khi học xong tôi có phải trả phí hàng tháng cho công cụ không?",
    a: "Bạn sẽ cần SellOS subscription để duy trì hệ thống (từ 299.000₫/tháng). Nhưng chi phí này nhỏ hơn nhiều so với việc thuê developer hoặc tự xây từ đầu. Gói học phí chỉ là một lần, không gia hạn.",
  },
  {
    q: "Tôi có thể áp dụng cho nhiều sản phẩm khác nhau không?",
    a: "Hoàn toàn. Hệ thống và kiến thức bạn học được áp dụng được cho bất kỳ sản phẩm nào. Nhiều học viên đã nhân rộng sang sản phẩm thứ 2, thứ 3 chỉ trong vài giờ sau khi đã thành thạo quy trình.",
  },
  {
    q: "Nếu tôi bị kẹt hay gặp vấn đề kỹ thuật thì sao?",
    a: "Gói Tự Học có cộng đồng học viên và AI hỗ trợ. Gói VIP có thêm Mentor 1-1 qua Zalo ưu tiên trong 7 ngày — thường phản hồi trong vòng 30 phút trong giờ hành chính.",
  },
];

export default function CourseFAQ() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-1.5 text-sm text-blue-700 font-medium mb-4">
            ❓ Câu hỏi thường gặp
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
            Bạn Đang Thắc Mắc Gì?
          </h2>
          <p className="text-slate-500 text-base">
            Câu hỏi không có trong list? Nhắn trực tiếp cho chúng tôi.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {FAQS.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="border border-slate-200 rounded-xl px-6 bg-white shadow-sm data-[state=open]:border-blue-200 transition-all"
              >
                <AccordionTrigger className="hover:no-underline py-5 text-left text-slate-900 font-medium text-sm sm:text-base">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-slate-600 text-sm leading-relaxed pb-2">
                    {faq.a}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-center"
        >
          <p className="text-slate-500 text-sm">
            Vẫn còn câu hỏi?{" "}
            <a
              href="#"
              className="text-blue-600 font-semibold hover:underline"
            >
              Nhắn Zalo cho chúng tôi →
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
