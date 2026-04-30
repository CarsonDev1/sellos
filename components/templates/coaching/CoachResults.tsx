"use client";

import { motion } from "framer-motion";

const TESTIMONIALS = [
  {
    name: "Trần Việt Anh",
    role: "CEO · Startup FinTech",
    photo: "https://randomuser.me/api/portraits/men/22.jpg",
    result: "Doanh thu tăng 3x",
    period: "trong 6 tháng",
    stars: 5,
    text: "Trước khi gặp anh Khoa, tôi có product tốt nhưng không biết cách scale. Sau 6 tháng coaching, doanh thu tháng từ 300 triệu lên 900 triệu. Không phải may mắn — là hệ thống.",
    service: "Tư Vấn 1-1",
  },
  {
    name: "Lê Minh Phương",
    role: "Founder · Thương hiệu thời trang",
    photo: "https://randomuser.me/api/portraits/women/45.jpg",
    result: "Thoát lỗ sau 3 tháng",
    period: "từ -50tr/tháng",
    stars: 5,
    text: "Công ty đang lỗ 50 triệu mỗi tháng, gần như muốn đóng cửa. Anh Khoa giúp tôi tìm ra 3 điểm rò rỉ chính và tái cấu trúc toàn bộ. Tháng thứ 4 tôi có lãi lần đầu.",
    service: "VIP Intensive",
  },
  {
    name: "Nguyễn Đức Hòa",
    role: "Director · Agency digital",
    photo: "https://randomuser.me/api/portraits/men/67.jpg",
    result: "Team tăng từ 5 → 18 người",
    period: "trong 9 tháng",
    stars: 5,
    text: "Vấn đề của tôi không phải doanh thu — là không scale được team. Anh Khoa giúp tôi xây hệ thống tuyển dụng và onboarding. Bây giờ mỗi hire mới đều produce trong tuần đầu.",
    service: "Tư Vấn 1-1",
  },
  {
    name: "Phạm Thị Bích Ngọc",
    role: "Owner · Chuỗi spa",
    photo: "https://randomuser.me/api/portraits/women/28.jpg",
    result: "Mở thêm 3 chi nhánh",
    period: "sau 12 tháng",
    stars: 5,
    text: "Từ 1 spa hoạt động hiệu quả, tôi muốn nhân rộng nhưng cứ thất bại khi thêm chi nhánh mới. Anh Khoa giúp tôi xây playbook chuẩn hóa — giờ mở chi nhánh mới như copy-paste.",
    service: "Coaching Nhóm",
  },
  {
    name: "Hoàng Thanh Long",
    role: "Freelancer → Agency Owner",
    photo: "https://randomuser.me/api/portraits/men/44.jpg",
    result: "Từ 20tr → 200tr/tháng",
    period: "trong 8 tháng",
    stars: 5,
    text: "Tôi là freelancer kiếm 20 triệu/tháng và muốn xây agency. Anh Khoa không chỉ cho tôi strategy — mà còn dạy tôi tư duy của người chủ doanh nghiệp thật sự.",
    service: "Tư Vấn 1-1",
  },
  {
    name: "Vũ Thị Hải Yến",
    role: "Co-founder · EdTech startup",
    photo: "https://randomuser.me/api/portraits/women/61.jpg",
    result: "Gọi vốn 2 tỷ thành công",
    period: "sau 4 tháng chuẩn bị",
    stars: 5,
    text: "Pitch deck của chúng tôi bị từ chối 6 lần. Anh Khoa giúp tôi nhìn ra điểm yếu trong story và business model. Round sau đó được nhận ngay lần pitch đầu.",
    service: "VIP Intensive",
  },
];

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map((s) => (
        <svg key={s} className={`w-4 h-4 ${s <= n ? "text-amber-400" : "text-slate-200"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      ))}
    </div>
  );
}

export default function CoachResults() {
  return (
    <section id="ket-qua" className="py-20 px-4 bg-gradient-to-br from-slate-50 to-amber-50/40">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 bg-white border border-amber-200 rounded-full px-4 py-1.5 text-sm text-amber-700 font-semibold mb-4">
            ❤️ Kết quả thật từ clients
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
            300+ Doanh Nhân<br />
            <span className="text-amber-600">Đã Đột Phá Cùng Tôi</span>
          </h2>
          <div className="inline-flex items-center gap-3 bg-white border border-amber-200 rounded-2xl px-5 py-3 mt-2 shadow-sm">
            <Stars n={5} />
            <span className="font-heading font-bold text-slate-900 text-xl">4.9</span>
            <span className="text-slate-400 text-sm">/ 5 · 240+ đánh giá</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md hover:border-amber-200 transition-all flex flex-col gap-4"
            >
              {/* Result highlight */}
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl px-4 py-3 text-white">
                <p className="font-heading font-bold text-lg leading-tight">{t.result}</p>
                <p className="text-amber-100 text-xs mt-0.5">{t.period}</p>
              </div>

              <Stars n={t.stars} />
              <p className="text-slate-600 text-sm leading-relaxed flex-1">&ldquo;{t.text}&rdquo;</p>

              <span className="text-[11px] bg-amber-50 text-amber-700 border border-amber-100 font-semibold px-2.5 py-1 rounded-full self-start">
                {t.service}
              </span>

              <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                <img src={t.photo} alt={t.name} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{t.name}</p>
                  <p className="text-slate-400 text-xs">{t.role}</p>
                </div>
                <svg className="ml-auto w-5 h-5 text-amber-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
