"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const KIT_ITEMS = [
  {
    icon: "🧠",
    title: "50+ Prompt Sẵn Sàng Dùng",
    description:
      "Phân loại theo từng bước — copy và paste là xong. Không cần viết hay chỉnh sửa gì.",
  },
  {
    icon: "📄",
    title: "Template Library",
    description:
      "Landing page, email, kịch bản chatbot — điền thông tin sản phẩm vào là dùng ngay.",
  },
  {
    icon: "🎥",
    title: "Video Hướng Dẫn Dưới 10 Phút",
    description:
      "Mỗi bước có video riêng. Làm theo từng thao tác, không bị kẹt ở đâu.",
  },
  {
    icon: "✅",
    title: "Checklist 7 Ngày",
    description:
      "Tick từng bước — biết chính xác hôm nay cần làm gì. Không bị lạc hướng.",
  },
  {
    icon: "🔧",
    title: "Tool Stack Được Chọn Sẵn",
    description:
      "Toàn bộ free hoặc dưới 200k/tháng. Không cần nghiên cứu tool nào phù hợp.",
  },
  {
    icon: "💬",
    title: "Support Group Hỏi Đáp",
    description:
      "Kẹt bước nào — đăng vào group, có người trả lời trong ngày. Không bị bỏ lại một mình.",
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};

export default function WhatsInKit() {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="font-syne text-3xl sm:text-4xl font-bold text-white mb-4">
            Bạn Nhận Được Gì Trong Bộ Kit?
          </h2>
          <p className="text-zinc-400 text-base max-w-md mx-auto">
            Mọi thứ bạn cần đều đã có sẵn — chỉ cần làm theo.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {KIT_ITEMS.map((kitItem, i) => (
            <motion.div key={i} variants={item}>
              <Card className="h-full bg-[#0d0d12] border-white/5 hover:border-[#00FF87]/20 transition-all hover:-translate-y-1 group">
                <CardHeader className="pb-2">
                  <div className="text-2xl mb-2">{kitItem.icon}</div>
                  <CardTitle className="font-syne text-white text-base leading-snug">
                    {kitItem.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {kitItem.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
