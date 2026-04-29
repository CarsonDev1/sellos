"use client";

import { motion, type Variants } from "framer-motion";

const OUTCOMES = [
  "Tìm được sản phẩm có nhu cầu thực tế — không mò mẫm",
  "Xây landing page chuyên nghiệp bằng AI trong vài giờ",
  "Thiết lập chatbot tự động tư vấn và chốt đơn 24/7",
  "Tạo chuỗi email marketing nuôi dưỡng khách hàng",
  "Kết nối cổng thanh toán và quản lý đơn hàng tự động",
  "Chạy quảng cáo Facebook/TikTok hiệu quả với ngân sách thấp",
  "Đọc và tối ưu số liệu — biết đâu sinh lời, đâu cần cải thiện",
  "Nhân rộng mô hình sang sản phẩm thứ 2, thứ 3",
];

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const item: Variants = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.35 } },
};

export default function WhatYouLearn() {
  return (
    <section className="py-20 px-4 bg-slate-50">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-4 py-1.5 text-sm text-green-700 font-medium mb-4">
              ✓ Kết quả bạn đạt được
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Sau 7 Ngày, Bạn Sẽ Có Gì?
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Mỗi bài học đều có bài tập thực hành ngay lập tức. Đến cuối
              khóa, bạn không chỉ học — bạn đã có hệ thống bán hàng thật sự.
            </p>
            <div className="bg-blue-600 rounded-2xl p-6 text-white space-y-2">
              <p className="font-heading font-bold text-2xl">500+</p>
              <p className="text-blue-100 text-sm">
                học viên đã có đơn hàng đầu tiên trong vòng 7 ngày sau khi hoàn thành khóa học
              </p>
            </div>
          </motion.div>

          {/* Right: Outcomes list */}
          <motion.ul
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-3"
          >
            {OUTCOMES.map((outcome, i) => (
              <motion.li
                key={i}
                variants={item}
                className="flex items-start gap-3 bg-white rounded-xl border border-slate-200 p-4 hover:border-blue-200 hover:shadow-sm transition-all"
              >
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold text-xs mt-0.5">
                  ✓
                </span>
                <span className="text-slate-700 text-sm leading-relaxed">
                  {outcome}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
