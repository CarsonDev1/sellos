"use client";

import { motion } from "framer-motion";
import { Highlight } from "@/components/ui/highlight";

const TESTIMONIALS = [
  {
    quote:
      "Tôi không biết gì về code. Vào SellOS, chọn template, chat với AI — 6 ngày sau hệ thống đang chạy thật.",
    name: "Minh Anh",
    role: "Bán khóa học luyện thi",
    result: "3 đơn đầu tiên trong 24 giờ",
    avatar: "MA",
    avatarBg: "bg-blue-100 text-blue-700",
    accent: "border-l-blue-500",
  },
  {
    quote:
      "Chatbot chốt đơn lúc 2 giờ sáng khi tôi đang ngủ. Sáng dậy thấy tiền về tài khoản.",
    name: "Linh Phương",
    role: "Shop mỹ phẩm online",
    result: "Tăng 40% đơn hàng tháng đầu",
    avatar: "LP",
    avatarBg: "bg-rose-100 text-rose-700",
    accent: "border-l-rose-500",
  },
  {
    quote:
      "Tiết kiệm được 15 triệu so với thuê dev. Tự cập nhật được bất cứ lúc nào.",
    name: "Tuấn Kiệt",
    role: "Freelance coach",
    result: "ROI trong tuần đầu tiên",
    avatar: "TK",
    avatarBg: "bg-violet-100 text-violet-700",
    accent: "border-l-violet-500",
  },
  {
    quote:
      "Cài xong chatbot, khách hàng cũ quay lại mua thêm vì nhận được email tự động đúng lúc.",
    name: "Hải Đăng",
    role: "Bán phần mềm quản lý",
    result: "30% doanh thu từ email auto",
    avatar: "HĐ",
    avatarBg: "bg-teal-100 text-teal-700",
    accent: "border-l-teal-500",
  },
  {
    quote:
      "Trước đây mất 2–3 tiếng trả lời khách mỗi ngày. Giờ chatbot làm hết, tôi chỉ xác nhận đơn.",
    name: "Thu Hằng",
    role: "Shop thời trang online",
    result: "Tiết kiệm 3 giờ/ngày",
    avatar: "TH",
    avatarBg: "bg-amber-100 text-amber-700",
    accent: "border-l-amber-500",
  },
  {
    quote:
      "Landing page cũ của tôi do dev làm tốn 8 triệu. SellOS làm đẹp hơn, nhanh hơn, rẻ hơn nhiều.",
    name: "Văn Khoa",
    role: "Dịch vụ digital marketing",
    result: "Tiết kiệm 8 triệu, ra mắt trong 5 ngày",
    avatar: "VK",
    avatarBg: "bg-indigo-100 text-indigo-700",
    accent: "border-l-indigo-500",
  },
];

// Triple for seamless infinite loop
const TRACK = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

function TestimonialCard({ t }: { t: (typeof TESTIMONIALS)[0] }) {
  return (
    <div
      className={`w-[300px] sm:w-[320px] flex-shrink-0 bg-white rounded-2xl border border-slate-200 shadow-sm p-5 border-l-[3px] ${t.accent} mx-2 flex flex-col`}
    >
      {/* Stars */}
      <div className="flex gap-0.5 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className="text-amber-400 text-xs">★</span>
        ))}
      </div>

      {/* Quote */}
      <p className="text-slate-700 text-sm leading-relaxed flex-1 mb-4">
        &ldquo;{t.quote}&rdquo;
      </p>

      {/* Result badge — own row, no competition for space */}
      <div className="mb-3">
        <span className="inline-flex items-center gap-1 text-xs text-green-700 font-semibold bg-green-50 border border-green-200 px-2.5 py-1 rounded-full">
          📈 {t.result}
        </span>
      </div>

      {/* Footer: avatar + name/role only */}
      <div className="flex items-center gap-2.5 pt-3 border-t border-slate-100">
        <div
          className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold ${t.avatarBg}`}
        >
          {t.avatar}
        </div>
        <div>
          <p className="text-slate-900 font-semibold text-xs leading-tight">{t.name}</p>
          <p className="text-slate-400 text-xs mt-0.5">{t.role}</p>
        </div>
      </div>
    </div>
  );
}

export default function SocialProof() {
  return (
    <section className="py-24 bg-slate-50 overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-14 px-4 max-w-2xl mx-auto"
      >
        <span className="inline-block text-xs font-semibold text-blue-600 uppercase tracking-[0.15em] mb-3">
          Khách hàng nói gì
        </span>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
          Người thật, đơn thật,{" "}
          <Highlight variant="blue">tiền thật</Highlight>
        </h2>
        <p className="text-slate-500 text-base">
          Đây là những chủ shop, thầy cô, freelancer đã dùng SellOS để tự dựng hệ thống bán hàng.
        </p>
      </motion.div>

      {/* Infinite scroll track */}
      <div className="relative">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

        {/* Scrolling track */}
        <div
          className="flex hover:[animation-play-state:paused]"
          style={{
            width: "max-content",
            animation: "marquee 32s linear infinite",
          }}
        >
          {TRACK.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
