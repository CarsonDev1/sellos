"use client";

import { motion } from "framer-motion";

const BENEFITS = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    color: "bg-green-100 text-green-700",
    title: "Chứng nhận hữu cơ quốc tế",
    desc: "100% sản phẩm được kiểm định bởi tổ chức USDA và EU Organic — không phân bón hóa học, không thuốc trừ sâu.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    color: "bg-amber-100 text-amber-700",
    title: "Thu hoạch sáng, giao trưa",
    desc: "Liên kết trực tiếp với 50+ nông trại tại Đà Lạt và Mộc Châu. Rau củ được hái buổi sáng, giao đến tay bạn trong ngày.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
      </svg>
    ),
    color: "bg-teal-100 text-teal-700",
    title: "Không hóa chất bảo quản",
    desc: "Bao bì tái chế, không dùng túi nilon. Chúng tôi cam kết bảo vệ môi trường từ nông trại đến tận cửa nhà bạn.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    color: "bg-blue-100 text-blue-700",
    title: "Giao hàng siêu tốc 2 giờ",
    desc: "Đặt trước 10h sáng, giao trước 12h trưa. Giao hàng miễn phí cho đơn từ 300.000₫. Theo dõi đơn hàng real-time.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    color: "bg-rose-100 text-rose-700",
    title: "Đổi trả trong 24 giờ",
    desc: "Không hài lòng với chất lượng? Chúng tôi đổi trả hoặc hoàn tiền 100% trong vòng 24 giờ — không cần giải thích.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    color: "bg-violet-100 text-violet-700",
    title: "Gói đặt hàng tuần linh hoạt",
    desc: "Đăng ký gói rau củ hàng tuần — tự chọn danh mục, điều chỉnh số lượng, tạm dừng bất kỳ lúc nào. Tiết kiệm 15%.",
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Benefits() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-4 py-1.5 text-sm text-green-700 font-semibold mb-4">
            🌱 Tại sao chọn Organica?
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
            Chuẩn Hữu Cơ — Không Thỏa Hiệp
          </h2>
          <p className="text-slate-500 text-base max-w-xl mx-auto">
            Mỗi sản phẩm đều trải qua 3 lớp kiểm định trước khi đến tay bạn. Chúng tôi không bán thứ chúng tôi không tự ăn.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {BENEFITS.map((b, i) => (
            <motion.div
              key={i}
              variants={item}
              className="group p-6 rounded-2xl border border-slate-100 bg-white hover:border-green-200 hover:shadow-md transition-all"
            >
              <div className={`w-12 h-12 rounded-xl ${b.color} flex items-center justify-center mb-4`}>
                {b.icon}
              </div>
              <h3 className="font-heading font-bold text-slate-900 text-base mb-2">{b.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Certifications strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 p-6 bg-green-50 border border-green-100 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div>
            <p className="font-heading font-bold text-slate-900 text-lg">Được chứng nhận bởi các tổ chức uy tín</p>
            <p className="text-slate-500 text-sm mt-0.5">Kiểm định định kỳ mỗi quý — kết quả công khai trên website</p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            {["USDA Organic", "EU Organic", "VietGAP", "GlobalG.A.P"].map((cert) => (
              <div key={cert} className="bg-white border border-green-200 rounded-xl px-4 py-2 text-sm font-bold text-green-800 shadow-sm">
                ✓ {cert}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
