"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";

const COURSES = [
  {
    id: "ban-hang-online",
    title: "Bán Hàng Online Từ 0 Đến Đơn Đầu Tiên",
    instructor: "Nguyễn Thành Nam",
    rating: 4.9,
    reviews: 1200,
    price: "1.490.000",
    originalPrice: "2.490.000",
    lessons: 16,
    hours: "12.5",
    gradient: "from-blue-500 to-indigo-600",
    tag: "Bestseller",
    tagColor: "bg-amber-400 text-amber-900",
    emoji: "🚀",
    category: "Bán hàng",
    link: "/templates/khoa-hoc/course/ban-hang-online",
  },
  {
    id: "facebook-ads",
    title: "Facebook & TikTok Ads Từ A Đến Z",
    instructor: "Trần Hải Đăng",
    rating: 4.7,
    reviews: 843,
    price: "990.000",
    originalPrice: "1.990.000",
    lessons: 20,
    hours: "15",
    gradient: "from-rose-500 to-pink-600",
    tag: "Mới nhất",
    tagColor: "bg-green-500 text-white",
    emoji: "📱",
    category: "Quảng cáo",
    link: "/templates/khoa-hoc/course/ban-hang-online",
  },
  {
    id: "email-marketing",
    title: "Email Marketing Tự Động — Tăng Doanh Thu Thụ Động",
    instructor: "Lê Thu Hương",
    rating: 4.8,
    reviews: 562,
    price: "790.000",
    originalPrice: "1.490.000",
    lessons: 12,
    hours: "9",
    gradient: "from-violet-500 to-purple-600",
    tag: "Phổ biến",
    tagColor: "bg-violet-600 text-white",
    emoji: "📧",
    category: "Marketing",
    link: "/templates/khoa-hoc/course/ban-hang-online",
  },
  {
    id: "shopee-lazada",
    title: "Bán Hàng Shopee & Lazada Chuyên Nghiệp",
    instructor: "Phạm Đức Minh",
    rating: 4.6,
    reviews: 724,
    price: "890.000",
    originalPrice: "1.690.000",
    lessons: 18,
    hours: "13",
    gradient: "from-orange-500 to-amber-600",
    tag: "Hot",
    tagColor: "bg-red-500 text-white",
    emoji: "🛒",
    category: "Thương mại điện tử",
    link: "/templates/khoa-hoc/course/ban-hang-online",
  },
];

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function FeaturedCourses() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between mb-8"
        >
          <div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900">
              Khóa Học Nổi Bật
            </h2>
            <p className="text-slate-500 text-sm mt-1">Được lựa chọn nhiều nhất trong tháng</p>
          </div>
          <Link
            href="/templates/khoa-hoc"
            className="text-sm text-blue-600 font-semibold hover:underline hidden sm:block"
          >
            Xem tất cả →
          </Link>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {COURSES.map((course) => (
            <motion.div key={course.id} variants={item}>
              <Link href={course.link} className="block group">
                <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden hover:shadow-lg hover:border-blue-200 hover:-translate-y-1 transition-all">
                  {/* Thumbnail */}
                  <div className={`h-40 bg-gradient-to-br ${course.gradient} relative flex items-center justify-center`}>
                    <span className="text-4xl">{course.emoji}</span>
                    {/* Tag */}
                    <span className={`absolute top-3 left-3 text-[11px] font-bold px-2 py-0.5 rounded-full ${course.tagColor}`}>
                      {course.tag}
                    </span>
                    {/* Category */}
                    <span className="absolute bottom-3 left-3 text-[11px] font-medium bg-black/30 text-white px-2 py-0.5 rounded-full">
                      {course.category}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="p-4 space-y-2">
                    <h3 className="font-heading font-semibold text-slate-900 text-sm leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-slate-400 text-xs">{course.instructor}</p>

                    {/* Rating */}
                    <div className="flex items-center gap-1.5">
                      <span className="text-amber-500 font-bold text-xs">{course.rating}</span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <span key={s} className={`text-[10px] ${s <= Math.round(course.rating) ? "text-amber-400" : "text-slate-200"}`}>★</span>
                        ))}
                      </div>
                      <span className="text-slate-400 text-xs">({course.reviews.toLocaleString()})</span>
                    </div>

                    {/* Meta */}
                    <p className="text-slate-400 text-[11px]">
                      {course.lessons} bài · {course.hours} giờ video
                    </p>

                    {/* Price */}
                    <div className="flex items-center gap-2 pt-1">
                      <span className="font-heading font-bold text-slate-900 text-sm">
                        {course.price}₫
                      </span>
                      <span className="text-slate-300 text-xs line-through">
                        {course.originalPrice}₫
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
