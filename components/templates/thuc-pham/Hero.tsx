"use client";

import { motion } from "framer-motion";

const STATS = [
  { value: "500+", label: "Sản phẩm hữu cơ" },
  { value: "15,000+", label: "Khách hàng tin dùng" },
  { value: "100%", label: "Chứng nhận Organic" },
  { value: "Giao trong 2h", label: "Nội thành HCM" },
];

const BADGES = [
  { label: "Không thuốc trừ sâu" },
  { label: "Kiểm định độc lập" },
  { label: "Bao bì tái chế" },
];

export default function FoodHero() {
  return (
    <section className="pt-16 min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left: Text content */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-7"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-green-100 border border-green-200 rounded-full px-4 py-1.5 text-sm text-green-800 font-semibold">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Chứng nhận hữu cơ quốc tế USDA &amp; EU
            </div>

            {/* Headline */}
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
              Thực Phẩm Sạch<br />
              <span className="text-green-600">Từ Vườn</span> Đến<br />
              Bàn Ăn
            </h1>

            <p className="text-slate-500 text-lg leading-relaxed max-w-lg">
              Rau củ quả hữu cơ tươi sạch — thu hoạch sáng, giao trưa. Không hóa chất, không chất bảo quản. Chỉ có hương vị tự nhiên thuần khiết.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-2">
              {BADGES.map((b) => (
                <span key={b.label} className="inline-flex items-center gap-1.5 text-xs font-medium bg-white border border-green-200 text-green-800 px-3 py-1.5 rounded-full shadow-sm">
                  <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {b.label}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#san-pham"
                className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-2xl text-base transition-colors shadow-lg shadow-green-200"
              >
                Mua ngay
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="#cau-chuyen"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-green-50 text-slate-700 font-semibold px-8 py-4 rounded-2xl text-base border border-slate-200 hover:border-green-300 transition-all"
              >
                Câu chuyện của chúng tôi
              </a>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-3 pt-2">
              <div className="flex -space-x-2">
                {[11, 22, 33, 44, 55].map((n) => (
                  <img
                    key={n}
                    src={`https://randomuser.me/api/portraits/women/${n}.jpg`}
                    alt=""
                    className="w-8 h-8 rounded-full border-2 border-white object-cover"
                  />
                ))}
              </div>
              <div className="text-sm text-slate-600">
                <span className="font-bold text-slate-900">15,000+</span> gia đình tin dùng mỗi tuần
                <div className="flex items-center gap-1 mt-0.5">
                  {[1,2,3,4,5].map((s) => (
                    <svg key={s} className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                  <span className="text-xs text-slate-500 ml-1">4.9/5 (2,400 đánh giá)</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Hero image */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative"
          >
            {/* Main image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-green-200/60">
              <img
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=85"
                alt="Rau củ hữu cơ tươi sạch"
                className="w-full h-[460px] object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Floating card: Delivery */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-xl shadow-slate-200/60 p-4 flex items-center gap-3 max-w-[220px]"
            >
              <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <div>
                <p className="font-bold text-slate-900 text-sm">Giao trong 2 giờ</p>
                <p className="text-green-600 text-xs font-medium">Nội thành TP.HCM</p>
              </div>
            </motion.div>

            {/* Floating card: Fresh */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl shadow-slate-200/60 p-3 flex items-center gap-2"
            >
              <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <div>
                <p className="font-bold text-slate-900 text-xs">Chứng nhận</p>
                <p className="text-amber-600 text-xs font-semibold">USDA Organic</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-16 pt-10 border-t border-green-100"
        >
          {STATS.map((stat, i) => (
            <div key={i} className="text-center">
              <p className="font-heading font-bold text-2xl sm:text-3xl text-green-700">{stat.value}</p>
              <p className="text-slate-500 text-sm mt-0.5">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
