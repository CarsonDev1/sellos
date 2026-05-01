"use client";

import { motion } from "framer-motion";

const REVIEWS = [
  {
    name: "Nguyễn Phương Anh",
    role: "Content Creator",
    avatar: "https://randomuser.me/api/portraits/women/11.jpg",
    rating: 5,
    text: "Chất vải đẹp hơn mình nghĩ, size chuẩn và giao hàng siêu nhanh! Đặt sáng nhận chiều, đúng như quảng cáo. Sẽ ủng hộ lâu dài.",
  },
  {
    name: "Trần Minh Châu",
    role: "Marketing Manager",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    rating: 5,
    text: "Mua áo linen về mặc thấy mát cực, không nhăn dù đi cả ngày. Màu cũng đúng như ảnh, không bị khác tông. Rất hài lòng!",
  },
  {
    name: "Lê Thu Hương",
    role: "Giáo viên",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    text: "Đổi trả rất thuận tiện, chỉ cần nhắn tin là có người hướng dẫn ngay. Váy midi đẹp, đi dạy được mà đi chơi cũng được.",
  },
  {
    name: "Vũ Khánh Ly",
    role: "Doanh nhân",
    avatar: "https://randomuser.me/api/portraits/women/57.jpg",
    rating: 5,
    text: "NOVA là shop mình tin tưởng nhất từ trước đến nay. Chất lượng đồng đều, không bao giờ bị lô hàng kém. Túi tote đang dùng được 6 tháng vẫn như mới.",
  },
];

export default function ShopTestimonials() {
  return (
    <section id="ve-chung-toi" className="py-20 px-4 bg-slate-50">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-rose-600 text-sm font-semibold uppercase tracking-wider">Khách hàng nói gì</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-3">
            50,000+ Khách Hàng Hài Lòng
          </h2>
          <p className="text-slate-500 text-base max-w-lg mx-auto">
            Không tin lời chúng tôi — hãy nghe từ khách hàng thật.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {REVIEWS.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-5 border border-slate-100 hover:shadow-md hover:border-rose-100 transition-all"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-3">
                {[...Array(r.rating)].map((_, j) => (
                  <svg key={j} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="text-slate-600 text-sm leading-relaxed mb-4">&ldquo;{r.text}&rdquo;</p>

              <div className="flex items-center gap-3">
                <img src={r.avatar} alt={r.name} className="w-10 h-10 rounded-full object-cover border-2 border-rose-100" />
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{r.name}</p>
                  <p className="text-slate-400 text-xs">{r.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-6 mt-12 pt-10 border-t border-slate-200"
        >
          {[
            { icon: "🔒", text: "Thanh toán bảo mật SSL" },
            { icon: "🔄", text: "Đổi trả 30 ngày" },
            { icon: "🚀", text: "Giao nhanh 2h" },
            { icon: "💬", text: "Hỗ trợ 24/7" },
          ].map((b) => (
            <div key={b.text} className="flex items-center gap-2 text-sm text-slate-600">
              <span className="text-lg">{b.icon}</span>
              <span className="font-medium">{b.text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
