"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import type { ShopOnlineContent } from "@/lib/templates";
import type { ProjectProduct } from "@/lib/supabase/projects";

interface Props {
  content: ShopOnlineContent;
  products: ProjectProduct[];
  projectId: string;
  brandName: string;
  onAddToCart?: (product: ProjectProduct) => void;
  cartCount?: number;
  onCartOpen?: () => void;
}

const CATEGORY_IMGS: Record<string, string> = {
  default: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=80",
  fashion: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80",
  accessories: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=600&q=80",
  shoes: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
  bags: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80",
};

function getCatImg(keyword: string) {
  const k = keyword?.toLowerCase() ?? "";
  if (k.includes("fashion") || k.includes("cloth") || k.includes("ao") || k.includes("vay")) return CATEGORY_IMGS.fashion;
  if (k.includes("access") || k.includes("phu kien")) return CATEGORY_IMGS.accessories;
  if (k.includes("shoe") || k.includes("giay")) return CATEGORY_IMGS.shoes;
  if (k.includes("bag") || k.includes("tui")) return CATEGORY_IMGS.bags;
  return CATEGORY_IMGS.default;
}

function fmt(n: number | null) {
  if (!n) return "";
  return n.toLocaleString("vi-VN") + "đ";
}

export default function ShopOnlineRenderer({ content, products, projectId, brandName, onAddToCart, cartCount = 0, onCartOpen }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [countdown, setCountdown] = useState({ d: "03", h: "12", m: "00", s: "00" });

  useEffect(() => {
    const end = new Date();
    end.setDate(end.getDate() + (content.sale.end_days ?? 3));
    const tick = () => {
      const diff = end.getTime() - Date.now();
      if (diff <= 0) return;
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setCountdown({
        d: String(d).padStart(2, "0"),
        h: String(h).padStart(2, "0"),
        m: String(m).padStart(2, "0"),
        s: String(s).padStart(2, "0"),
      });
    };
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [content.sale.end_days]);

  const featured = products.slice(0, 4);
  const newArrivals = products.slice(4, 8);

  return (
    <div className="bg-white">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-rose-100 shadow-sm">
        <div className="container mx-auto max-w-7xl px-4 h-16 flex items-center justify-between gap-4">
          <a href={`/w/${projectId}`} className="font-heading font-bold text-slate-900 text-xl tracking-tight">{brandName}</a>
          <nav className="hidden md:flex items-center gap-1 text-sm">
            {[["Mới về", "#moi-ve"], ["Sale", "#sale"], ["Bộ sưu tập", "#bo-suu-tap"], ["Về chúng tôi", "#ve-chung-toi"]].map(([l, h]) => (
              <a key={l} href={h} className="px-3 py-2 rounded-lg text-slate-600 hover:text-rose-700 hover:bg-rose-50 font-medium transition-all">{l}</a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button onClick={onCartOpen} className="relative p-2 hover:bg-rose-50 rounded-xl transition-colors">
              <svg className="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">{cartCount}</span>}
            </button>
            <a href={`/w/${projectId}/san-pham`} className="hidden sm:flex px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold rounded-xl transition-colors">Mua ngay</a>
            <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        {mobileOpen && (
          <div className="md:hidden border-t bg-white px-4 py-3 flex flex-col gap-2">
            {[["Mới về", "#moi-ve"], ["Sale", "#sale"], ["Về chúng tôi", "#ve-chung-toi"]].map(([l, h]) => (
              <a key={l} href={h} onClick={() => setMobileOpen(false)} className="px-3 py-2 text-sm text-slate-700 hover:bg-rose-50 rounded-lg">{l}</a>
            ))}
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="pt-16 min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 flex items-center overflow-hidden">
        <div className="container mx-auto max-w-7xl px-4 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-rose-100 border border-rose-200 rounded-full px-4 py-1.5 text-sm text-rose-700 font-semibold">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                {content.hero.badge || "Bộ sưu tập mới"}
              </div>
              <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 leading-tight">
                {content.hero.headline || brandName}
              </h1>
              <p className="text-slate-500 text-lg">{content.hero.subheadline}</p>
              <div className="flex flex-wrap gap-2">
                {[content.hero.trust1, content.hero.trust2, content.hero.trust3].filter(Boolean).map((t, i) => (
                  <span key={i} className="flex items-center gap-1.5 text-xs text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded-full shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />{t}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <a href="#bo-suu-tap" className="px-7 py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-xl transition-colors">
                  {content.hero.cta_primary || "Khám phá ngay"}
                </a>
                <a href="#sale" className="px-7 py-3.5 border border-rose-200 hover:bg-rose-50 text-rose-700 font-semibold rounded-xl transition-colors">
                  {content.hero.cta_secondary || "Xem sale"}
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span>{content.hero.review_score} · {content.hero.review_count || "hàng ngàn"} đánh giá</span>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
              <div className="relative rounded-3xl overflow-hidden aspect-[3/4] shadow-2xl shadow-rose-100">
                <img src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80" alt={brandName} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-rose-900/20 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="bo-suu-tap" className="py-20 bg-white">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className="font-heading text-3xl font-bold text-slate-900 text-center mb-10">Danh mục sản phẩm</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {content.categories.map((cat, i) => (
              <motion.a key={i} href={`/w/${projectId}/danh-muc/${cat.slug}`}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="group relative rounded-2xl overflow-hidden aspect-square cursor-pointer">
                <img src={getCatImg(cat.image_keyword)} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="font-heading font-bold text-white text-lg">{cat.name}</p>
                  <p className="text-white/70 text-xs mt-0.5">{cat.description}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featured.length > 0 && (
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto max-w-7xl px-4">
            <h2 className="font-heading text-3xl font-bold text-slate-900 text-center mb-10">
              {content.featured_section_title || "Bán chạy nhất"}
            </h2>
            <ProductGrid products={featured} projectId={projectId} onAddToCart={onAddToCart} />
          </div>
        </section>
      )}

      {/* Sale Banner */}
      <section id="sale" className="py-20 bg-gradient-to-br from-rose-600 to-pink-600">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="font-heading text-4xl font-bold text-white mb-3">{content.sale.headline}</h2>
          <p className="text-rose-100 text-lg mb-6">{content.sale.subtext}</p>
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-6 py-3 mb-8">
            <span className="text-white/70 text-sm">Mã giảm giá:</span>
            <span className="font-mono font-bold text-xl text-white tracking-widest">{content.sale.code}</span>
            <span className="px-3 py-1 bg-white text-rose-600 text-sm font-bold rounded-lg">{content.sale.discount_text}</span>
          </div>
          <div className="flex justify-center gap-4 mb-8">
            {[{ v: countdown.d, l: "Ngày" }, { v: countdown.h, l: "Giờ" }, { v: countdown.m, l: "Phút" }, { v: countdown.s, l: "Giây" }].map(({ v, l }) => (
              <div key={l} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 min-w-[64px] text-center">
                <p className="font-heading font-bold text-3xl text-white">{v}</p>
                <p className="text-white/60 text-xs mt-1">{l}</p>
              </div>
            ))}
          </div>
          <a href="#bo-suu-tap" className="inline-flex px-8 py-3.5 bg-white text-rose-600 font-bold rounded-xl hover:bg-rose-50 transition-colors">
            {content.sale.cta || "Mua ngay"}
          </a>
        </div>
      </section>

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section id="moi-ve" className="py-20 bg-white">
          <div className="container mx-auto max-w-7xl px-4">
            <h2 className="font-heading text-3xl font-bold text-slate-900 text-center mb-10">
              {content.new_arrivals_section_title || "Mới về tuần này"}
            </h2>
            <ProductGrid products={newArrivals} projectId={projectId} onAddToCart={onAddToCart} />
          </div>
        </section>
      )}

      {/* Testimonials */}
      <section id="ve-chung-toi" className="py-20 bg-rose-50">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="font-heading text-3xl font-bold text-slate-900 text-center mb-12">Khách hàng yêu thích</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {content.testimonials.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl p-5 shadow-sm">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <svg key={j} className="w-3.5 h-3.5 text-amber-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 font-bold text-xs">{t.name?.[0] ?? "K"}</div>
                  <div>
                    <p className="font-semibold text-slate-900 text-xs">{t.name}</p>
                    <p className="text-[10px] text-slate-400">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto max-w-xl px-4 text-center">
          <h2 className="font-heading text-2xl font-bold text-white mb-3">{content.newsletter.headline}</h2>
          <p className="text-slate-400 mb-6">{content.newsletter.subtext}</p>
          <div className="flex gap-3">
            <input type="email" placeholder="Email của bạn" className="flex-1 px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-rose-400" />
            <button className="px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-xl transition-colors whitespace-nowrap">
              {content.newsletter.button || "Đăng ký"}
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 py-12">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-heading font-bold text-white text-xl mb-3">{brandName}</h3>
              <p className="text-slate-400 text-sm">{content.footer.tagline}</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Liên hệ</h4>
              <div className="space-y-1.5 text-sm text-slate-400">
                {content.footer.phone && <p>📞 {content.footer.phone}</p>}
                {content.footer.email && <p>✉️ {content.footer.email}</p>}
                {content.footer.address && <p>📍 {content.footer.address}</p>}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Chính sách</h4>
              <p className="text-sm text-slate-400">{content.footer.return_policy}</p>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-6 text-center">
            <p className="text-xs text-slate-600">© {new Date().getFullYear()} {brandName}. Được tạo bởi <a href="/" className="text-blue-400 hover:text-blue-300">SellOS</a></p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ProductGrid({ products, projectId, onAddToCart }: { products: ProjectProduct[]; projectId: string; onAddToCart?: (p: ProjectProduct) => void }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
      {products.map((p, i) => (
        <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
          className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group">
          <a href={`/w/${projectId}/san-pham/${p.slug ?? p.id}`} className="block">
            <div className="relative aspect-[3/4] bg-rose-50">
              {p.image_url ? (
                <img src={p.image_url} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-rose-200">
                  <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
              )}
              {p.badge && (
                <span className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${p.badge === "HOT" ? "bg-red-500 text-white" : p.badge === "NEW" ? "bg-blue-500 text-white" : p.badge === "SALE" ? "bg-rose-500 text-white" : "bg-slate-700 text-white"}`}>{p.badge}</span>
              )}
            </div>
          </a>
          <div className="p-4">
            <p className="font-medium text-slate-900 text-sm line-clamp-1">{p.name}</p>
            <div className="flex items-center justify-between mt-2">
              <div>
                <span className="font-bold text-rose-600 text-sm">{fmt(p.price)}</span>
                {p.original_price && p.original_price > (p.price ?? 0) && (
                  <span className="text-[11px] text-slate-400 line-through ml-1">{fmt(p.original_price)}</span>
                )}
              </div>
              <button onClick={() => onAddToCart?.(p)} className="w-8 h-8 bg-rose-600 hover:bg-rose-700 text-white rounded-lg flex items-center justify-center transition-colors">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
