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
    q: "Tôi không biết gì về máy tính, có làm được không?",
    a: "Hoàn toàn được. Bạn chỉ cần biết bấm chuột và gõ tiếng Việt. AI làm hết phần kỹ thuật — bạn chỉ cần điền thông tin sản phẩm và xem kết quả.",
  },
  {
    q: "Tôi có cần đăng ký tài khoản ChatGPT hay Claude không?",
    a: "Không. AI đã có sẵn trong SellOS. Bạn chat ngay trên trang web — không cần đăng ký thêm dịch vụ nào, không cần trả thêm tiền cho ai.",
  },
  {
    q: "Mỗi ngày tôi cần bỏ ra bao nhiêu thời gian?",
    a: "Khoảng 1–2 giờ mỗi ngày. Không cần ngồi cả buổi. Mỗi ngày có việc cụ thể cần làm — làm xong là nghỉ, hôm sau làm tiếp.",
  },
  {
    q: "Sau 7 ngày hệ thống có chạy thật không, hay chỉ là bản demo?",
    a: "Chạy thật. Bạn có website riêng với địa chỉ web riêng, có trợ lý ảo đang trả lời khách, có chỗ nhận tiền thật vào tài khoản — không phải demo.",
  },
  {
    q: "Nếu tôi bị kẹt ở bước nào đó thì sao?",
    a: "Mỗi bước đều có video hướng dẫn ngắn dưới 10 phút. Nếu vẫn kẹt — đăng vào group hỏi đáp, có người trả lời trong ngày. Gói Pro có người kèm 1-1, trả lời trong 2 giờ.",
  },
  {
    q: "Tôi có thể dùng SellOS cho nhiều sản phẩm khác nhau không?",
    a: "Được. Mỗi sản phẩm bạn tạo một dự án riêng trong SellOS, điền thông tin mới — AI tự điền vào đúng chỗ. Không cần trả thêm tiền cho mỗi sản phẩm.",
  },
  {
    q: "Tôi có giữ được website của mình mãi mãi không?",
    a: "Website là của bạn. Bạn có thể đổi tên miền, đổi nội dung, đổi mẫu bất cứ lúc nào. Nếu sau này không dùng SellOS nữa, bạn vẫn giữ được nội dung và hình ảnh.",
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
          className="text-center mb-14 max-w-2xl mx-auto"
        >
          <span className="inline-block text-xs font-semibold text-slate-600 uppercase tracking-[0.15em] mb-3">
            Câu hỏi thường gặp
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
            Bạn đang phân vân điều gì?
          </h2>
          <p className="text-slate-500 text-base">
            Đây là những câu hỏi hay được hỏi nhất. Còn thắc mắc khác — chat với chúng tôi nhé.
          </p>
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
