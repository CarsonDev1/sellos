"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { ThucPhamContent } from "@/lib/templates";
import type { ProjectProduct } from "@/lib/supabase/projects";

interface Props {
  content: ThucPhamContent;
  products: ProjectProduct[];
  projectId: string;
  brandName: string;
  onAddToCart?: (product: ProjectProduct) => void;
  cartCount?: number;
  onCartOpen?: () => void;
}

const FOOD_UNSPLASH = "https://images.unsplash.com/photo-1498579150354-977475b7ea0b?auto=format&fit=crop&w=800&q=80";
const ICONS: Record<string, React.ReactNode> = {
  leaf: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />,
  shield: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />,
  truck: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0" />,
  star: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />,
};

export default function ThucPhamRenderer({ content, products, projectId, brandName, onAddToCart, cartCount = 0, onCartOpen }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);

  function fmt(n: number | null) {
    if (!n) return "";
    return n.toLocaleString("vi-VN") + "đ";
  }

  const displayProducts = products.length > 0 ? products : [];

  return (
    <div className="bg-white">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-green-100 shadow-sm">
        <div className="container mx-auto max-w-7xl px-4 h-16 flex items-center justify-between gap-4">
          <a href={`/w/${projectId}`} className="font-heading font-bold text-slate-900 text-lg">{brandName}</a>
          <nav className="hidden md:flex items-center gap-1 text-sm">
            {[["Sản phẩm", "#san-pham"], ["Câu chuyện", "#cau-chuyen"], ["Liên hệ", "#lien-he"]].map(([label, href]) => (
              <a key={label} href={href} className="px-3 py-2 rounded-lg text-slate-600 hover:text-green-700 hover:bg-green-50 font-medium transition-all">{label}</a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button onClick={onCartOpen} className="relative p-2 hover:bg-green-50 rounded-xl transition-colors">
              <svg className="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartCount > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">{cartCount}</span>}
            </button>
            <button className="hidden sm:flex px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-xl transition-colors">
              Đặt hàng ngay
            </button>
            <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        {mobileOpen && (
          <div className="md:hidden border-t border-green-50 bg-white px-4 py-3 flex flex-col gap-2">
            {[["Sản phẩm", "#san-pham"], ["Câu chuyện", "#cau-chuyen"], ["Liên hệ", "#lien-he"]].map(([label, href]) => (
              <a key={label} href={href} onClick={() => setMobileOpen(false)} className="px-3 py-2 text-sm text-slate-700 hover:bg-green-50 rounded-lg">{label}</a>
            ))}
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="pt-16 min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center overflow-hidden">
        <div className="container mx-auto max-w-7xl px-4 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-green-100 border border-green-200 rounded-full px-4 py-1.5 text-sm text-green-800 font-semibold">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                {content.hero.badge || "Thực phẩm sạch chứng nhận"}
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
                {content.hero.headline || brandName}
              </h1>
              <p className="text-slate-500 text-lg leading-relaxed max-w-lg">{content.hero.subheadline}</p>
              <div className="flex flex-wrap gap-3">
                <a href="#san-pham" className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-colors">
                  {content.hero.cta_primary || "Xem sản phẩm"}
                </a>
                <a href="#cau-chuyen" className="px-6 py-3 border border-green-200 hover:bg-green-50 text-green-700 font-semibold rounded-xl transition-colors">
                  {content.hero.cta_secondary || "Câu chuyện của chúng tôi"}
                </a>
              </div>
              <div className="flex flex-wrap gap-6 pt-2">
                {[
                  { n: content.hero.stat1_number, l: content.hero.stat1_label },
                  { n: content.hero.stat2_number, l: content.hero.stat2_label },
                  { n: content.hero.stat3_number, l: content.hero.stat3_label },
                ].filter(s => s.n).map((s, i) => (
                  <div key={i}>
                    <p className="font-heading font-bold text-2xl text-slate-900">{s.n}</p>
                    <p className="text-sm text-slate-500">{s.l}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.1 }} className="relative">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl">
                <img src={FOOD_UNSPLASH} alt={brandName} className="w-full h-full object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-slate-900 mb-3">{content.about.headline || "Tại sao chọn chúng tôi?"}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.why_us.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-green-50 border border-green-100 text-center">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {ICONS[item.icon] ?? ICONS.leaf}
                  </svg>
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-500">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      {displayProducts.length > 0 && (
        <section id="san-pham" className="py-20 bg-slate-50">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl font-bold text-slate-900 mb-3">Sản phẩm của chúng tôi</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {displayProducts.map((p, i) => (
                <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group">
                  <a href={`/w/${projectId}/san-pham/${p.slug ?? p.id}`} className="block">
                    <div className="relative aspect-square bg-green-50">
                      {p.image_url ? (
                        <img src={p.image_url} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg className="w-12 h-12 text-green-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                      {p.badge && (
                        <span className={`absolute top-2 left-2 text-xs font-bold px-2 py-0.5 rounded-full ${p.badge === "HOT" ? "bg-red-500 text-white" : p.badge === "NEW" ? "bg-blue-500 text-white" : "bg-orange-400 text-white"}`}>{p.badge}</span>
                      )}
                    </div>
                  </a>
                  <div className="p-4">
                    <h3 className="font-semibold text-slate-900 text-sm mb-1 line-clamp-2">{p.name}</h3>
                    <div className="flex items-center justify-between mt-3">
                      <div>
                        <span className="font-bold text-green-600">{fmt(p.price)}</span>
                        {p.original_price && p.original_price > (p.price ?? 0) && (
                          <span className="text-xs text-slate-400 line-through ml-2">{fmt(p.original_price)}</span>
                        )}
                      </div>
                      <button
                        onClick={() => onAddToCart?.(p)}
                        className="w-8 h-8 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center justify-center transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* About */}
      <section id="cau-chuyen" className="py-20 bg-white">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="font-heading text-3xl font-bold text-slate-900">{content.about.headline}</h2>
              <p className="text-slate-600 leading-relaxed">{content.about.story}</p>
              <p className="text-slate-600 leading-relaxed">{content.about.mission}</p>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { t: content.about.highlight1_title, d: content.about.highlight1_desc },
                  { t: content.about.highlight2_title, d: content.about.highlight2_desc },
                  { t: content.about.highlight3_title, d: content.about.highlight3_desc },
                ].filter(h => h.t).map((h, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">{h.t}</p>
                      <p className="text-sm text-slate-500">{h.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl overflow-hidden aspect-square shadow-xl">
              <img src="https://images.unsplash.com/photo-1470549813517-2fa741d25c92?auto=format&fit=crop&w=800&q=80" alt="About" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-green-50">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className="font-heading text-3xl font-bold text-slate-900 text-center mb-12">Khách hàng nói gì về chúng tôi</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.testimonials.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <svg key={j} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-200 flex items-center justify-center text-green-700 font-bold text-xs">
                    {t.name?.[0] ?? "K"}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">{t.name}</p>
                    <p className="text-xs text-slate-400">{t.role}</p>
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
            <input type="email" placeholder="Email của bạn" className="flex-1 px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-green-400" />
            <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-colors whitespace-nowrap">Đăng ký</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="lien-he" className="bg-slate-950 py-12">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-heading font-bold text-white text-lg mb-3">{brandName}</h3>
              <p className="text-slate-400 text-sm">{content.footer.tagline}</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Liên hệ</h4>
              <div className="space-y-1.5 text-sm text-slate-400">
                {content.footer.phone && <p>📞 {content.footer.phone}</p>}
                {content.footer.email && <p>✉️ {content.footer.email}</p>}
                {content.footer.address && <p>📍 {content.footer.address}</p>}
                {content.footer.hours && <p>🕒 {content.footer.hours}</p>}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Giao hàng</h4>
              <p className="text-sm text-slate-400">{content.footer.delivery_note}</p>
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
