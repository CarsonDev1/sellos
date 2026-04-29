"use client";

import { motion } from "framer-motion";

const REVIEWS = [
  {
    name: "Nguyễn Thị Mai",
    role: "Mẹ 2 con · Quận 7, TP.HCM",
    photo: "https://randomuser.me/api/portraits/women/32.jpg",
    stars: 5,
    text: "Từ khi dùng rau của Organica, tôi yên tâm hơn rất nhiều khi nấu cho con. Rau tươi thật sự, không có mùi hóa chất. Giao nhanh, đóng gói đẹp. Dùng được 8 tháng rồi, không thể đổi sang nơi khác!",
    product: "Gói rau tuần Premium",
    orderCount: "40+ đơn",
  },
  {
    name: "Trần Văn Hùng",
    role: "Chủ nhà hàng · Quận 1",
    photo: "https://randomuser.me/api/portraits/men/45.jpg",
    stars: 5,
    text: "Nhà hàng tôi dùng rau củ Organica cho menu healthy. Khách hàng khen tươi ngon khác hẳn. Quan trọng là nguồn gốc rõ ràng, tôi có thể nói thẳng với khách mà không lo. Giá cả hợp lý cho chất lượng này.",
    product: "Gói nhà hàng Business",
    orderCount: "120+ đơn",
  },
  {
    name: "Lê Phương Thảo",
    role: "Blogger ẩm thực · 85k followers",
    photo: "https://randomuser.me/api/portraits/women/68.jpg",
    stars: 5,
    text: "Tôi đã thử qua 5-6 đơn vị rau hữu cơ khác nhau. Organica là nơi tôi gắn bó lâu nhất. Chất lượng đồng đều, app đặt hàng dễ dùng, và khi có vấn đề thì team support xử lý rất nhanh và chu đáo.",
    product: "Rau củ theo mùa",
    orderCount: "65+ đơn",
  },
  {
    name: "Phạm Đình Khoa",
    role: "Gym owner · Bình Thạnh",
    photo: "https://randomuser.me/api/portraits/men/23.jpg",
    stars: 5,
    text: "Tôi đặt rau củ cho khoảng 200 thành viên gym theo từng tuần. Organica đáp ứng được số lượng lớn mà vẫn đảm bảo chất lượng. Delivery đúng giờ là yếu tố quan trọng nhất — và họ chưa bao giờ trễ.",
    product: "Gói bulk B2B",
    orderCount: "200+ đơn",
  },
  {
    name: "Hoàng Minh Châu",
    role: "Bà nội trợ · Gò Vấp",
    photo: "https://randomuser.me/api/portraits/women/15.jpg",
    stars: 5,
    text: "Ban đầu tôi nghi ngờ vì giá rẻ hơn tôi nghĩ. Nhưng sau lần đầu tiên, tôi hiểu tại sao — họ bỏ trung gian nên giá hợp lý hơn. Rau tươi hơn cả siêu thị, cải xanh để được 5-6 ngày mà vẫn xanh.",
    product: "Giỏ rau hỗn hợp",
    orderCount: "55+ đơn",
  },
  {
    name: "Vũ Thanh Tùng",
    role: "Bác sĩ dinh dưỡng · Bệnh viện Nhân Dân",
    photo: "https://randomuser.me/api/portraits/men/67.jpg",
    stars: 5,
    text: "Tôi khuyến nghị bệnh nhân dùng rau hữu cơ từ các nguồn uy tín. Organica có đủ giấy tờ kiểm định, minh bạch hoàn toàn. Tôi cũng dùng cho gia đình mình và tự tin giới thiệu cho bệnh nhân.",
    product: "Gói dinh dưỡng sạch",
    orderCount: "30+ đơn",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map((s) => (
        <svg key={s} className={`w-4 h-4 ${s <= count ? "text-amber-400" : "text-slate-200"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 bg-white border border-green-200 rounded-full px-4 py-1.5 text-sm text-green-700 font-semibold mb-4">
            ❤️ Khách hàng nói gì
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
            15,000 Gia Đình<br />
            <span className="text-green-600">Không Thể Sai</span>
          </h2>
          {/* Overall rating */}
          <div className="inline-flex items-center gap-3 bg-white border border-amber-200 rounded-2xl px-5 py-3 mt-2 shadow-sm">
            <Stars count={5} />
            <span className="font-heading font-bold text-slate-900 text-xl">4.9</span>
            <span className="text-slate-400 text-sm">/ 5 · 2,400+ đánh giá</span>
          </div>
        </motion.div>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {REVIEWS.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md hover:border-green-200 transition-all flex flex-col gap-4"
            >
              {/* Stars */}
              <Stars count={r.stars} />

              {/* Text */}
              <p className="text-slate-600 text-sm leading-relaxed flex-1">&ldquo;{r.text}&rdquo;</p>

              {/* Product tag */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] bg-green-50 text-green-700 border border-green-100 font-semibold px-2.5 py-1 rounded-full">
                  🛒 {r.product}
                </span>
                <span className="text-[11px] text-slate-400">{r.orderCount}</span>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                <img src={r.photo} alt={r.name} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{r.name}</p>
                  <p className="text-slate-400 text-xs">{r.role}</p>
                </div>
                {/* Verified */}
                <div className="ml-auto flex-shrink-0">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
