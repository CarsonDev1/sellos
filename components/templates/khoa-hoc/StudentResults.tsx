"use client";

import { motion, type Variants } from "framer-motion";

const TESTIMONIALS = [
  {
    name: "Minh Tuấn",
    role: "Bán khóa học fitness online",
    avatar: "MT",
    avatarColor: "from-amber-400 to-orange-500",
    result: "Ra đơn sau 5 ngày",
    resultColor: "bg-amber-50 text-amber-700 border-amber-200",
    stars: 5,
    quote:
      "Trước đây tôi tốn 3 tháng để học code mà không xong trang web. Với SellOS, tôi chat với AI 2 buổi tối là có landing page hoàn chỉnh. Tuần đầu đã có 3 đơn đầu tiên. Không thể tin được!",
    highlight: "3 đơn đầu tiên trong tuần đầu",
  },
  {
    name: "Linh Phương",
    role: "Bán sản phẩm handmade",
    avatar: "LP",
    avatarColor: "from-rose-400 to-pink-500",
    result: "Doanh thu 15tr/tháng",
    resultColor: "bg-rose-50 text-rose-700 border-rose-200",
    stars: 5,
    quote:
      "Tôi là bà mẹ bỉm sữa, không biết gì về công nghệ. Vậy mà sau 7 ngày học, tôi đã có hệ thống bán hàng tự động, chatbot trả lời khách 24/7. Giờ mỗi tháng bán được 50-70 đơn mà không cần ngồi máy tính cả ngày.",
    highlight: "50-70 đơn/tháng hoàn toàn tự động",
  },
  {
    name: "Đức Anh",
    role: "Bán khóa học tiếng Anh",
    avatar: "DA",
    avatarColor: "from-violet-400 to-purple-500",
    result: "ROI 800% sau 30 ngày",
    resultColor: "bg-violet-50 text-violet-700 border-violet-200",
    stars: 5,
    quote:
      "Đầu tư vào khóa học này là quyết định tốt nhất tôi từng làm cho business. Hệ thống email automation giúp tôi convert thêm 30% học viên mà gần như không tốn thêm công sức. Payback period chỉ 4 ngày.",
    highlight: "Payback period chỉ 4 ngày",
  },
];

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export default function StudentResults() {
  return (
    <section id="hoc-vien" className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-4 py-1.5 text-sm text-amber-700 font-medium mb-4">
            ⭐ Kết quả học viên thực tế
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
            Họ Đã Làm Được — Bạn Cũng Làm Được
          </h2>
          <p className="text-slate-500 text-base max-w-lg mx-auto">
            Đây là kết quả thực tế từ học viên bình thường — không có background
            kỹ thuật, không có vốn lớn.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              variants={item}
              className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-blue-200 transition-all flex flex-col gap-4"
            >
              {/* Stars */}
              <div className="flex gap-0.5">
                {Array.from({ length: t.stars }).map((_, s) => (
                  <span key={s} className="text-amber-400 text-sm">
                    ⭐
                  </span>
                ))}
              </div>

              {/* Quote */}
              <p className="text-slate-600 text-sm leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Result highlight */}
              <div
                className={`text-xs font-semibold border rounded-full px-3 py-1 inline-fit w-fit ${t.resultColor}`}
              >
                🎯 {t.result}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.avatarColor} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">
                    {t.name}
                  </p>
                  <p className="text-slate-400 text-xs">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-10 bg-blue-50 border border-blue-200 rounded-2xl p-6 text-center"
        >
          <p className="text-slate-700 font-medium">
            <strong className="text-blue-600">1,200+</strong> học viên đã hoàn
            thành khóa học ·{" "}
            <strong className="text-blue-600">4.9/5</strong> đánh giá trung
            bình ·{" "}
            <strong className="text-blue-600">500+</strong> hệ thống bán hàng
            đang chạy live
          </p>
        </motion.div>
      </div>
    </section>
  );
}
