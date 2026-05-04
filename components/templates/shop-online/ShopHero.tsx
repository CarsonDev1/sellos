"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Truck, RotateCcw, Lock, Gift, ArrowRight } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const SLIDES = [
  {
    badge: "Bộ sưu tập Hè 2025",
    headline: "Mặc đẹp\nmỗi ngày",
    sub: "Thời trang nữ cao cấp — chất liệu premium, thiết kế tinh tế, giao trong 2h.",
    cta: "Khám phá ngay",
    ctaHref: "/templates/shop-online/danh-muc/ao",
    cta2: "Xem sale 50%",
    cta2Href: "/templates/shop-online/sale",
    image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&w=1400&q=80",
    accent: "from-rose-900/70 via-slate-900/40 to-slate-900/80",
    tag: "Hàng mới về hàng tuần",
  },
  {
    badge: "Flash sale — hôm nay",
    headline: "Giảm đến\n50% all items",
    sub: "Hàng ngàn mẫu thời trang giảm giá — số lượng có hạn, đừng bỏ lỡ.",
    cta: "Mua ngay",
    ctaHref: "/templates/shop-online/sale",
    cta2: "Xem danh mục",
    cta2Href: "/templates/shop-online/danh-muc/ao",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1400&q=80",
    accent: "from-pink-900/70 via-rose-900/40 to-rose-950/80",
    tag: "Chỉ còn 3 ngày",
  },
  {
    badge: "New Arrivals — tuần này",
    headline: "Phong cách\ntối giản hiện đại",
    sub: "Capsule wardrobe cho người bận rộn — mix&match dễ dàng với 5 items.",
    cta: "Xem hàng mới",
    ctaHref: "/templates/shop-online/danh-muc/ao",
    cta2: "Phụ kiện",
    cta2Href: "/templates/shop-online/danh-muc/phu-kien",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=80",
    accent: "from-slate-900/65 via-zinc-900/40 to-zinc-950/80",
    tag: "Mới về 48 giờ trước",
  },
];

const TRUST = [
  { icon: Truck, label: "Giao trong 2 giờ", sub: "Nội thành HCM & HN" },
  { icon: RotateCcw, label: "Đổi trả 30 ngày", sub: "Miễn phí, không cần lý do" },
  { icon: Lock, label: "Thanh toán bảo mật", sub: "SSL 256-bit" },
  { icon: Gift, label: "Quà tặng hàng ngày", sub: "Cho đơn trên 1 triệu" },
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
                    <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/25 text-white text-[11px] font-semibold uppercase tracking-[0.15em] px-3 py-1.5 rounded-full mb-5">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-300 animate-pulse" />
                      {slide.tag}
                    </span>

                    {/* Headline */}
                    <h1
                      className="font-heading font-bold text-white leading-[1.05] mb-5 tracking-tight"
                      style={{ fontSize: "clamp(2.2rem, 5vw, 4.2rem)" }}
                    >
                      <span className="text-white/90 font-medium block mb-1" style={{ fontSize: "0.42em" }}>
                        {slide.badge}
                      </span>
                      <span className="block">{slide.headline.split("\n")[0]}</span>
                      <span className="block bg-gradient-to-r from-rose-200 to-amber-200 bg-clip-text text-transparent">
                        {slide.headline.split("\n")[1]}
                      </span>
                    </h1>

                    <p className="text-white/85 text-sm sm:text-base mb-7 leading-relaxed max-w-sm">
                      {slide.sub}
                    </p>

                    <div className="flex flex-wrap gap-3">
                      <Link
                        href={slide.ctaHref}
                        className="inline-flex items-center gap-2 px-7 h-12 bg-white text-slate-900 hover:bg-rose-50 font-bold rounded-xl text-sm transition-all shadow-xl"
                      >
                        {slide.cta}
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                      <Link
                        href={slide.cta2Href}
                        className="inline-flex items-center px-7 h-12 bg-white/10 backdrop-blur-md border border-white/25 text-white hover:bg-white/20 font-semibold rounded-xl text-sm transition-all"
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

      {/* Trust strip */}
      <div className="bg-white border-b border-slate-100">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-slate-100">
            {TRUST.map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-3 px-4 py-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-rose-50 to-pink-50 border border-rose-100 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-rose-600" />
                </div>
                <div className="leading-tight min-w-0">
                  <p className="text-sm font-semibold text-slate-900 truncate">{label}</p>
                  <p className="text-xs text-slate-400 truncate">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
