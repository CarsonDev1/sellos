"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const SLIDES = [
  {
    badge: "Bộ Sưu Tập Hè 2025",
    headline: "Mặc Đẹp\nMỗi Ngày",
    sub: "Thời trang nữ cao cấp — chất liệu premium, thiết kế tinh tế, giao trong 2h.",
    cta: "Khám phá ngay",
    ctaHref: "/templates/shop-online/danh-muc/ao",
    cta2: "Xem Sale 50%",
    cta2Href: "/templates/shop-online/sale",
    image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&w=1400&q=80",
    accent: "from-rose-900/60 to-slate-900/80",
    tag: "✨ Hàng mới về hàng tuần",
  },
  {
    badge: "Flash Sale — Hôm Nay",
    headline: "Giảm Đến\n50% All Items",
    sub: "Hàng ngàn mẫu thời trang giảm giá — số lượng có hạn, đừng bỏ lỡ.",
    cta: "Mua ngay",
    ctaHref: "/templates/shop-online/sale",
    cta2: "Xem danh mục",
    cta2Href: "/templates/shop-online/danh-muc/ao",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1400&q=80",
    accent: "from-pink-900/60 to-rose-900/80",
    tag: "🔥 Chỉ còn 3 ngày",
  },
  {
    badge: "New Arrivals — Tuần Này",
    headline: "Phong Cách\nTối Giản Hiện Đại",
    sub: "Capsule wardrobe cho người bận rộn — mix&match dễ dàng với 5 items.",
    cta: "Xem hàng mới",
    ctaHref: "/templates/shop-online/danh-muc/ao",
    cta2: "Phụ kiện",
    cta2Href: "/templates/shop-online/danh-muc/phu-kien",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=80",
    accent: "from-slate-900/50 to-zinc-900/80",
    tag: "🆕 Mới về 48 giờ trước",
  },
];

export default function ShopHero() {
  return (
    <div className="relative w-full pt-[88px]">
      <style>{`
        .nova-swiper .swiper-pagination-bullet {
          width: 8px; height: 8px; background: rgba(255,255,255,0.5); opacity: 1;
        }
        .nova-swiper .swiper-pagination-bullet-active {
          background: #fff; width: 28px; border-radius: 4px;
        }
        .nova-swiper .swiper-button-next,
        .nova-swiper .swiper-button-prev {
          color: white; width: 44px; height: 44px;
          background: rgba(255,255,255,0.15); backdrop-filter: blur(8px);
          border-radius: 50%; border: 1px solid rgba(255,255,255,0.25);
          transition: background 0.2s;
        }
        .nova-swiper .swiper-button-next:hover,
        .nova-swiper .swiper-button-prev:hover { background: rgba(255,255,255,0.3); }
        .nova-swiper .swiper-button-next::after,
        .nova-swiper .swiper-button-prev::after { font-size: 14px; font-weight: 700; }
      `}</style>

      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        navigation
        pagination={{ clickable: true }}
        loop
        className="nova-swiper w-full h-[420px] sm:h-[520px] lg:h-[600px]"
      >
        {SLIDES.map((slide, i) => (
          <SwiperSlide key={i}>
            <div className="relative w-full h-full overflow-hidden">
              {/* Background image */}
              <img
                src={slide.image}
                alt=""
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-r ${slide.accent}`} />

              {/* Content */}
              <div className="relative h-full flex items-center">
                <div className="container mx-auto max-w-7xl px-6 sm:px-8">
                  <div className="max-w-lg">
                    {/* Badge */}
                    <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
                      {slide.tag}
                    </span>

                    {/* Headline */}
                    <h1 className="font-heading font-black text-white leading-none mb-4 whitespace-pre-line"
                      style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)" }}>
                      {slide.badge.split(" — ")[0]}
                      <br />
                      <span className="text-rose-300">{slide.headline.split("\n")[0]}</span>
                      <br />
                      {slide.headline.split("\n")[1]}
                    </h1>

                    <p className="text-white/80 text-sm sm:text-base mb-6 leading-relaxed max-w-sm">
                      {slide.sub}
                    </p>

                    <div className="flex flex-wrap gap-3">
                      <Link
                        href={slide.ctaHref}
                        className="px-6 py-3 bg-white text-slate-900 hover:bg-rose-50 font-bold rounded-2xl text-sm transition-all shadow-lg"
                      >
                        {slide.cta} →
                      </Link>
                      <Link
                        href={slide.cta2Href}
                        className="px-6 py-3 bg-white/15 backdrop-blur-sm border border-white/30 text-white hover:bg-white/25 font-semibold rounded-2xl text-sm transition-all"
                      >
                        {slide.cta2}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Stats strip */}
      <div className="bg-white border-b border-slate-100">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-slate-100">
            {[
              { icon: "🚀", label: "Giao trong 2h", sub: "Nội thành HCM & HN" },
              { icon: "🔄", label: "Đổi trả 30 ngày", sub: "Miễn phí, không cần lý do" },
              { icon: "🔒", label: "Thanh toán bảo mật", sub: "SSL 256-bit" },
              { icon: "🎁", label: "Quà tặng hàng ngày", sub: "Cho đơn trên 1 triệu" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-3 px-4 py-3.5">
                <span className="text-xl">{s.icon}</span>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{s.label}</p>
                  <p className="text-xs text-slate-400">{s.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
