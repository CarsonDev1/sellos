"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import Link from "next/link";

const ALL_COURSES = [
  {
    id: "ban-hang-online",
    title: "Bán Hàng Online Từ 0 Đến Đơn Đầu Tiên",
    instructor: "Nguyễn Thành Nam",
    rating: 4.9,
    reviews: 1247,
    price: "1.490.000",
    originalPrice: "2.490.000",
    discount: 40,
    lessons: 16,
    hours: "12.5",
    gradient: "from-blue-500 to-indigo-600",
    accentColor: "bg-amber-400 text-amber-900",
    tag: "Bestseller",
    emoji: "🚀",
    category: "Bán hàng",
    level: "Tất cả trình độ",
    link: "/templates/khoa-hoc/course/ban-hang-online",
  },
  {
    id: "dropship",
    title: "Bán Hàng Dropship Không Cần Vốn — Thu Nhập Thụ Động",
    instructor: "Trần Quốc Bảo",
    rating: 4.7,
    reviews: 618,
    price: "890.000",
    originalPrice: "1.690.000",
    discount: 47,
    lessons: 14,
    hours: "10",
    gradient: "from-cyan-500 to-blue-600",
    accentColor: "bg-green-500 text-white",
    tag: "Mới",
    emoji: "📦",
    category: "Bán hàng",
    level: "Người mới bắt đầu",
    link: "/templates/khoa-hoc/course/ban-hang-online",
  },
  {
    id: "facebook-ads",
    title: "Facebook & TikTok Ads Từ A Đến Z — ROAS 300%+",
    instructor: "Trần Hải Đăng",
    rating: 4.8,
    reviews: 956,
    price: "990.000",
    originalPrice: "1.990.000",
    discount: 50,
    lessons: 20,
    hours: "15",
    gradient: "from-rose-500 to-pink-600",
    accentColor: "bg-red-500 text-white",
    tag: "Hot",
    emoji: "📱",
    category: "Quảng cáo",
    level: "Trung cấp",
    link: "/templates/khoa-hoc/course/ban-hang-online",
  },
  {
    id: "tiktok-content",
    title: "TikTok Content Creator Chuyên Nghiệp — Triệu View",
    instructor: "Nguyễn Mai Linh",
    rating: 4.9,
    reviews: 423,
    price: "790.000",
    originalPrice: "1.290.000",
    discount: 39,
    lessons: 18,
    hours: "12",
    gradient: "from-pink-500 to-violet-600",
    accentColor: "bg-violet-600 text-white",
    tag: "Phổ biến",
    emoji: "🎬",
    category: "Quảng cáo",
    level: "Người mới bắt đầu",
    link: "/templates/khoa-hoc/course/ban-hang-online",
  },
  {
    id: "email-marketing",
    title: "Email Marketing Tự Động — Tăng Doanh Thu Thụ Động",
    instructor: "Lê Thu Hương",
    rating: 4.7,
    reviews: 562,
    price: "790.000",
    originalPrice: "1.490.000",
    discount: 47,
    lessons: 12,
    hours: "9",
    gradient: "from-violet-500 to-purple-600",
    accentColor: "bg-purple-600 text-white",
    tag: "Phổ biến",
    emoji: "📧",
    category: "Marketing",
    level: "Tất cả trình độ",
    link: "/templates/khoa-hoc/course/ban-hang-online",
  },
  {
    id: "personal-brand",
    title: "Xây Dựng Thương Hiệu Cá Nhân Trên Mạng Xã Hội",
    instructor: "Phạm Thanh Hà",
    rating: 4.8,
    reviews: 384,
    price: "690.000",
    originalPrice: "1.190.000",
    discount: 42,
    lessons: 10,
    hours: "7.5",
    gradient: "from-amber-500 to-orange-600",
    accentColor: "bg-amber-400 text-amber-900",
    tag: "Mới nhất",
    emoji: "⭐",
    category: "Marketing",
    level: "Người mới bắt đầu",
    link: "/templates/khoa-hoc/course/ban-hang-online",
  },
  {
    id: "shopee",
    title: "Bán Hàng Shopee & Lazada Lên Top — Tăng 10x Đơn",
    instructor: "Phạm Đức Minh",
    rating: 4.6,
    reviews: 724,
    price: "890.000",
    originalPrice: "1.690.000",
    discount: 47,
    lessons: 18,
    hours: "13",
    gradient: "from-orange-500 to-amber-600",
    accentColor: "bg-red-500 text-white",
    tag: "Hot",
    emoji: "🛒",
    category: "Thương mại điện tử",
    level: "Trung cấp",
    link: "/templates/khoa-hoc/course/ban-hang-online",
  },
  {
    id: "startup-ai",
    title: "Khởi Nghiệp 0 Vốn Với AI — Từ Ý Tưởng Đến Doanh Thu",
    instructor: "Vũ Đức Anh",
    rating: 4.9,
    reviews: 291,
    price: "990.000",
    originalPrice: "1.990.000",
    discount: 50,
    lessons: 15,
    hours: "11",
    gradient: "from-teal-500 to-emerald-600",
    accentColor: "bg-teal-600 text-white",
    tag: "Mới nhất",
    emoji: "🤖",
    category: "Khởi nghiệp",
    level: "Người mới bắt đầu",
    link: "/templates/khoa-hoc/course/ban-hang-online",
  },
];

const CATEGORIES = [
  { id: "all", icon: "✨", label: "Tất cả" },
  { id: "Bán hàng", icon: "🛍️", label: "Bán hàng" },
  { id: "Quảng cáo", icon: "📱", label: "Quảng cáo" },
  { id: "Marketing", icon: "📢", label: "Marketing" },
  { id: "Thương mại điện tử", icon: "🛒", label: "TMĐT" },
  { id: "Khởi nghiệp", icon: "🚀", label: "Khởi nghiệp" },
];

const SORT_OPTIONS = [
  { value: "popular", label: "Phổ biến nhất" },
  { value: "newest", label: "Mới nhất" },
  { value: "price-asc", label: "Giá tăng dần" },
  { value: "price-desc", label: "Giá giảm dần" },
  { value: "rating", label: "Đánh giá cao nhất" },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35 } },
  exit: { opacity: 0, scale: 0.96, transition: { duration: 0.2 } },
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} className={`w-3.5 h-3.5 ${s <= Math.round(rating) ? "text-amber-400" : "text-slate-200"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function CourseCard({ course }: { course: typeof ALL_COURSES[0] }) {
  return (
    <Link href={course.link} className="group block h-full">
      <div className="h-full flex flex-col rounded-2xl border border-slate-200 bg-white overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/60 hover:border-blue-200 hover:-translate-y-1">
        {/* Thumbnail — fixed height */}
        <div className={`h-44 bg-gradient-to-br ${course.gradient} relative flex items-center justify-center flex-shrink-0 overflow-hidden`}>
          {/* Pattern overlay */}
          <div className="absolute inset-0 opacity-10" style={{backgroundImage: "radial-gradient(circle at 20% 80%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "30px 30px"}} />

          <span className="text-5xl relative z-10">{course.emoji}</span>

          {/* Tag */}
          <span className={`absolute top-3 left-3 text-[11px] font-bold px-2.5 py-1 rounded-full ${course.accentColor}`}>
            {course.tag}
          </span>

          {/* Discount badge */}
          <span className="absolute top-3 right-3 text-[11px] font-bold bg-white/90 text-slate-800 px-2 py-0.5 rounded-full">
            -{course.discount}%
          </span>

          {/* Category pill */}
          <span className="absolute bottom-3 left-3 text-[11px] font-medium bg-black/40 backdrop-blur-sm text-white px-2.5 py-1 rounded-full">
            {course.category}
          </span>

          {/* Level */}
          <span className="absolute bottom-3 right-3 text-[11px] text-white/80 bg-black/30 px-2 py-0.5 rounded-full">
            {course.level}
          </span>
        </div>

        {/* Card body — flex-col flex-1 for uniform height */}
        <div className="p-5 flex flex-col flex-1 gap-3">
          {/* Title — min height for 2 lines */}
          <h3 className="font-heading font-semibold text-slate-900 text-sm leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors min-h-[2.5rem]">
            {course.title}
          </h3>

          {/* Instructor */}
          <p className="text-slate-500 text-xs">{course.instructor}</p>

          {/* Rating */}
          <div className="flex items-center gap-1.5">
            <span className="text-amber-500 font-bold text-xs">{course.rating}</span>
            <StarRating rating={course.rating} />
            <span className="text-slate-400 text-xs">({course.reviews.toLocaleString()})</span>
          </div>

          {/* Spacer — pushes footer down */}
          <div className="flex-1" />

          {/* Footer — always at bottom */}
          <div className="pt-3 border-t border-slate-100 space-y-3">
            <div className="flex items-center gap-2 text-slate-400 text-[11px]">
              <span>🎬 {course.hours}h video</span>
              <span>·</span>
              <span>📝 {course.lessons} bài</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-2">
                <span className="font-heading font-bold text-slate-900 text-base">
                  {course.price}₫
                </span>
                <span className="text-slate-300 text-xs line-through">
                  {course.originalPrice}₫
                </span>
              </div>
            </div>
            <div className="w-full text-center text-xs font-semibold bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white py-2 rounded-xl transition-colors">
              Xem khóa học →
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function CourseCatalog() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popular");

  const filtered = useMemo(() => {
    const courses = activeCategory === "all"
      ? ALL_COURSES
      : ALL_COURSES.filter((c) => c.category === activeCategory);

    switch (sortBy) {
      case "newest": return [...courses].reverse();
      case "price-asc": return [...courses].sort((a, b) => parseInt(a.price.replace(/\./g, "")) - parseInt(b.price.replace(/\./g, "")));
      case "price-desc": return [...courses].sort((a, b) => parseInt(b.price.replace(/\./g, "")) - parseInt(a.price.replace(/\./g, "")));
      case "rating": return [...courses].sort((a, b) => b.rating - a.rating);
      default: return [...courses].sort((a, b) => b.reviews - a.reviews);
    }
  }, [activeCategory, sortBy]);

  return (
    <section className="py-12 px-4 bg-white">
      <div className="container mx-auto max-w-7xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900">
                Khóa Học Nổi Bật
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                {filtered.length} khóa học{activeCategory !== "all" ? ` về ${activeCategory}` : ""} · Được cập nhật liên tục
              </p>
            </div>

            {/* Sort dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-500 whitespace-nowrap hidden sm:block">Sắp xếp:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border border-slate-200 rounded-xl px-3 py-2 text-slate-700 bg-white focus:outline-none focus:border-blue-400 cursor-pointer hover:border-slate-300 transition-colors"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Category tabs */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            {CATEGORIES.map((cat) => {
              const count = cat.id === "all"
                ? ALL_COURSES.length
                : ALL_COURSES.filter((c) => c.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                    activeCategory === cat.id
                      ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                  }`}
                >
                  <span>{cat.icon}</span>
                  {cat.label}
                  <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded-full ${activeCategory === cat.id ? "bg-white/20" : "bg-slate-200"}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Course grid */}
        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <motion.div
              key={activeCategory + sortBy}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
              variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            >
              {filtered.map((course) => (
                <motion.div key={course.id} variants={cardVariants} className="h-full">
                  <CourseCard course={course} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16"
            >
              <div className="text-5xl mb-4">🔍</div>
              <p className="font-heading font-semibold text-slate-700 text-lg">Chưa có khóa học nào</p>
              <p className="text-slate-400 text-sm mt-1">Thử chọn danh mục khác nhé!</p>
              <button
                onClick={() => setActiveCategory("all")}
                className="mt-4 text-sm text-blue-600 font-semibold hover:underline"
              >
                Xem tất cả khóa học →
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
