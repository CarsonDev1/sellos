"use client";

import { motion } from "framer-motion";
import { Highlight } from "@/components/ui/highlight";

const ITEMS = [
  {
    icon: "🤖",
    title: "AI Chat Tích Hợp Sẵn",
    description:
      "Không cần tài khoản Claude hay ChatGPT — chat với AI ngay trên SellOS.",
    accent: "border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50",
    badge: "text-blue-700 bg-blue-100 border-blue-200",
    featured: true,
  },
  {
    icon: "🎨",
    title: "Thư Viện Template Đẹp",
    description: "Hàng chục mẫu theo từng ngành, xem live demo trước khi chọn.",
    accent: "border-rose-200 bg-gradient-to-br from-rose-50 to-pink-50",
    badge: "text-rose-700 bg-rose-100 border-rose-200",
    featured: false,
  },
  {
    icon: "🧠",
    title: "Prompt Tự Động Điền",
    description:
      "Hệ thống tự điền thông tin sản phẩm vào đúng chỗ — không cần viết prompt thủ công.",
    accent: "border-violet-200 bg-gradient-to-br from-violet-50 to-purple-50",
    badge: "text-violet-700 bg-violet-100 border-violet-200",
    featured: false,
  },
  {
    icon: "🎥",
    title: "Video Hướng Dẫn < 10 Phút",
    description:
      "Làm theo từng thao tác cụ thể, không bị kẹt ở bước nào.",
    accent: "border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50",
    badge: "text-amber-700 bg-amber-100 border-amber-200",
    featured: true,
  },
  {
    icon: "✅",
    title: "Checklist 7 Ngày",
    description:
      "Tick từng bước — biết chính xác hôm nay cần làm gì.",
    accent: "border-teal-200 bg-gradient-to-br from-teal-50 to-emerald-50",
    badge: "text-teal-700 bg-teal-100 border-teal-200",
    featured: false,
  },
  {
    icon: "💬",
    title: "Support Group Hỏi Đáp",
    description:
      "Kẹt bước nào — đăng vào group, có người trả lời trong ngày.",
    accent: "border-slate-200 bg-slate-50",
    badge: "text-slate-700 bg-slate-100 border-slate-200",
    featured: false,
  },
];

export default function WhatsInPlatform() {
  return (
    <section className="py-24 px-4 bg-slate-50">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-3 leading-[1.25]">
            Bạn Nhận Được Gì Khi{" "}
            <Highlight variant="violet">Dùng SellOS?</Highlight>
          </h2>
          <p className="text-slate-500 text-base max-w-md mx-auto">
            Mọi thứ trong 1 nền tảng — không cần ghép tool, không cần tab khác.
          </p>
        </motion.div>

        {/* Bento Grid — S-curve layout */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {/* Row 1: AI Chat (2) + Template (1) */}
          <div
            className={`lg:col-span-2 rounded-2xl border p-7 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 relative overflow-hidden group ${ITEMS[0].accent}`}
          >
            <div className="absolute right-6 bottom-0 text-[90px] opacity-10 select-none pointer-events-none group-hover:opacity-15 transition-opacity">
              {ITEMS[0].icon}
            </div>
            <div className="relative">
              <div className="text-3xl mb-4">{ITEMS[0].icon}</div>
              <h3 className="font-heading font-bold text-slate-900 text-xl mb-2">
                {ITEMS[0].title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4 max-w-lg">
                {ITEMS[0].description}
              </p>
              <span
                className={`inline-block text-xs font-medium border px-2.5 py-1 rounded-full ${ITEMS[0].badge}`}
              >
                Tích hợp sẵn — không cần đăng ký thêm
              </span>
            </div>
          </div>

          <SmallCard item={ITEMS[1]} />

          {/* Row 2: Prompt (1) + Video (2) */}
          <SmallCard item={ITEMS[2]} />

          <div
            className={`lg:col-span-2 rounded-2xl border p-7 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 relative overflow-hidden group ${ITEMS[3].accent}`}
          >
            <div className="absolute right-6 bottom-0 text-[90px] opacity-10 select-none pointer-events-none group-hover:opacity-15 transition-opacity">
              {ITEMS[3].icon}
            </div>
            <div className="relative">
              <div className="text-3xl mb-4">{ITEMS[3].icon}</div>
              <h3 className="font-heading font-bold text-slate-900 text-xl mb-2">
                {ITEMS[3].title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4 max-w-lg">
                {ITEMS[3].description}
              </p>
              <span
                className={`inline-block text-xs font-medium border px-2.5 py-1 rounded-full ${ITEMS[3].badge}`}
              >
                Mỗi bước dưới 10 phút
              </span>
            </div>
          </div>

          {/* Row 3: Checklist (2) + Support (1) */}
          <div
            className={`lg:col-span-2 rounded-2xl border p-7 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 relative overflow-hidden group ${ITEMS[4].accent}`}
          >
            <div className="absolute right-6 bottom-0 text-[90px] opacity-10 select-none pointer-events-none group-hover:opacity-15 transition-opacity">
              {ITEMS[4].icon}
            </div>
            <div className="relative">
              <div className="text-3xl mb-4">{ITEMS[4].icon}</div>
              <h3 className="font-heading font-bold text-slate-900 text-xl mb-2">
                {ITEMS[4].title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4 max-w-lg">
                {ITEMS[4].description}
              </p>
              {/* Visual checklist */}
              <div className="flex flex-wrap gap-2">
                {["Ngày 1–2", "Ngày 3–4", "Ngày 5–6", "Ngày 7"].map(
                  (day, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 text-xs font-medium bg-white border border-teal-200 text-teal-700 px-2.5 py-1 rounded-full"
                    >
                      <span className="text-teal-500">✓</span> {day}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>

          <SmallCard item={ITEMS[5]} />
        </motion.div>
      </div>
    </section>
  );
}

function SmallCard({ item }: { item: (typeof ITEMS)[0] }) {
  return (
    <div
      className={`rounded-2xl border p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 relative overflow-hidden group ${item.accent}`}
    >
      <div className="absolute right-3 bottom-0 text-[60px] opacity-10 select-none pointer-events-none group-hover:opacity-15 transition-opacity">
        {item.icon}
      </div>
      <div className="relative">
        <div className="text-2xl mb-3">{item.icon}</div>
        <h3 className="font-heading font-bold text-slate-900 text-base mb-2 leading-snug">
          {item.title}
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed">{item.description}</p>
      </div>
    </div>
  );
}
