"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
  {
    q: "Coaching với anh Khoa khác gì với đi học khóa học online?",
    a: "Khóa học online cho bạn kiến thức chung. Coaching là tôi ngồi cùng bạn, phân tích tình huống cụ thể của bạn, và xây kế hoạch riêng cho business của bạn — không phải template. Tôi không dạy lý thuyết, tôi giúp bạn giải quyết vấn đề thật đang xảy ra hôm nay.",
  },
  {
    q: "Tôi phù hợp với coaching không? Tôi chưa có nhiều kinh nghiệm.",
    a: "Coaching phù hợp nhất khi bạn đã có direction và đang bị stuck — không phải người chưa biết bắt đầu từ đâu. Lý tưởng là bạn đang chạy business, có doanh thu nhất định, và muốn tăng trưởng nhanh hơn hoặc giải quyết bottleneck cụ thể. Nếu bạn hoàn toàn mới, tôi sẽ honest nói bạn chưa cần coaching.",
  },
  {
    q: "Anh có cam kết kết quả không? Nếu không đạt thì sao?",
    a: "Có. Trước khi bắt đầu, chúng ta sẽ cùng xác định KPI rõ ràng và đo được. Nếu sau thời gian cam kết mà bạn không đạt do coaching không hiệu quả (không phải do bạn không thực thi), tôi sẽ hoàn tiền 100% hoặc kéo dài coaching miễn phí. Tôi không bán cam kết mơ hồ.",
  },
  {
    q: "Một buổi coaching diễn ra như thế nào?",
    a: "Mỗi buổi 60 phút qua Zoom hoặc gặp trực tiếp (nếu ở HCM/HN). Trước buổi tôi sẽ yêu cầu bạn chuẩn bị update tiến độ và vấn đề muốn focus. Trong buổi: review kết quả, phân tích bottleneck, xây action plan cho tuần tới. Sau buổi: bạn nhận tóm tắt và việc cần làm trong email.",
  },
  {
    q: "Tôi có thể hủy hoặc tạm dừng không?",
    a: "Gói Starter và Growth: báo trước 7 ngày là hủy được, không bị phạt. Gói VIP: báo trước 14 ngày. Tôi không muốn giữ bạn lại nếu coaching không còn phù hợp — điều đó không tốt cho cả hai.",
  },
  {
    q: "Anh có coaching online không? Tôi ở tỉnh / nước ngoài.",
    a: "Có. Phần lớn clients của tôi ở các tỉnh thành khác và nhiều người ở nước ngoài (Mỹ, Singapore, Úc). Coaching qua Zoom hoàn toàn hiệu quả — nhiều clients nói online còn focused hơn vì không bị phân tâm bởi môi trường.",
  },
];

function Item({ faq }: { faq: typeof FAQS[0] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-200 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-between w-full px-6 py-5 text-left hover:bg-slate-50 transition-colors gap-4"
      >
        <span className="font-semibold text-slate-900 text-sm leading-snug">{faq.q}</span>
        <span className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${open ? "border-amber-500 bg-amber-500 text-white rotate-45" : "border-slate-300 text-slate-400"}`}>
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
          </svg>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 text-slate-500 text-sm leading-relaxed border-t border-slate-100 pt-4">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function CoachFAQ() {
  return (
    <section className="py-20 px-4 bg-slate-50">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-1.5 text-sm text-slate-600 font-semibold mb-4">
            ❓ Câu hỏi thường gặp
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900">
            Bạn Đang Tự Hỏi...
          </h2>
        </motion.div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <Item faq={faq} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
