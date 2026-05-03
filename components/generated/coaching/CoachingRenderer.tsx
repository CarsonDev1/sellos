"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { CoachingContent } from "@/lib/templates";
import type { ProjectProduct } from "@/lib/supabase/projects";

interface Props {
  content: CoachingContent;
  programs: ProjectProduct[];
  projectId: string;
  brandName: string;
  onBooking?: (programName: string) => void;
}

const COACHING_IMG = "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80";

export default function CoachingRenderer({ content, programs, projectId, brandName, onBooking }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);

  function fmt(n: number | null) {
    if (!n) return "Liên hệ";
    return n.toLocaleString("vi-VN") + "đ";
  }

  const displayPrograms = programs.length > 0
    ? programs
    : content.programs.map((p, i) => ({ id: String(i), name: p.name, description: p.description, price: p.price, category: "program" } as ProjectProduct));

  return (
    <div className="bg-white">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-violet-100 shadow-sm">
        <div className="container mx-auto max-w-7xl px-4 h-16 flex items-center justify-between gap-4">
          <a href={`/w/${projectId}`} className="font-heading font-bold text-slate-900 text-lg">{brandName}</a>
          <nav className="hidden md:flex items-center gap-1 text-sm">
            {[["Chương trình", "#chuong-trinh"], ["Về tôi", "#ve-toi"], ["Kết quả", "#ket-qua"], ["Đặt lịch", "#dat-lich"]].map(([l, h]) => (
              <a key={l} href={h} className="px-3 py-2 rounded-lg text-slate-600 hover:text-violet-700 hover:bg-violet-50 font-medium transition-all">{l}</a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a href="#dat-lich" className="hidden sm:flex px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold rounded-xl transition-colors">
              {content.cta_section.button || "Đặt lịch ngay"}
            </a>
            <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        {mobileOpen && (
          <div className="md:hidden border-t bg-white px-4 py-3 flex flex-col gap-2">
            {[["Chương trình", "#chuong-trinh"], ["Về tôi", "#ve-toi"], ["Đặt lịch", "#dat-lich"]].map(([l, h]) => (
              <a key={l} href={h} onClick={() => setMobileOpen(false)} className="px-3 py-2 text-sm text-slate-700 hover:bg-violet-50 rounded-lg">{l}</a>
            ))}
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="pt-16 min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50 flex items-center">
        <div className="container mx-auto max-w-7xl px-4 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="space-y-7">
              <div className="inline-flex items-center gap-2 bg-violet-100 border border-violet-200 rounded-full px-4 py-1.5 text-sm text-violet-800 font-semibold">
                <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
                {content.hero.badge || "Coaching chuyên nghiệp"}
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
                {content.hero.headline || brandName}
              </h1>
              <p className="text-slate-500 text-lg leading-relaxed">{content.hero.subheadline}</p>
              <div className="flex flex-wrap gap-3">
                <a href="#dat-lich" className="px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-xl transition-colors">
                  {content.hero.cta_primary || "Đặt lịch tư vấn"}
                </a>
                <a href="#chuong-trinh" className="px-6 py-3 border border-violet-200 hover:bg-violet-50 text-violet-700 font-semibold rounded-xl transition-colors">
                  {content.hero.cta_secondary || "Xem chương trình"}
                </a>
              </div>
              <div className="flex flex-wrap gap-8 pt-2">
                {[
                  { n: content.hero.result1_number, l: content.hero.result1_label },
                  { n: content.hero.result2_number, l: content.hero.result2_label },
                  { n: content.hero.result3_number, l: content.hero.result3_label },
                ].filter(s => s.n).map((s, i) => (
                  <div key={i}>
                    <p className="font-heading font-bold text-3xl text-violet-600">{s.n}</p>
                    <p className="text-sm text-slate-500">{s.l}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.1 }}>
              <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl shadow-violet-100">
                <img src={COACHING_IMG} alt={brandName} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-violet-900/40 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4">
                  <p className="text-sm font-semibold text-slate-900">{content.about.achievement || "Kết quả thực tế từ học viên"}</p>
                  <div className="flex gap-0.5 mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-xs text-slate-500 ml-1">5.0 từ học viên</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="ve-toi" className="py-20 bg-white">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            <div className="lg:col-span-3 space-y-5">
              <h2 className="font-heading text-3xl font-bold text-slate-900">{content.about.headline || `Về ${brandName}`}</h2>
              <p className="text-slate-600 leading-relaxed text-lg">{content.about.bio}</p>
              <div className="space-y-3">
                {[content.about.credential1, content.about.credential2, content.about.credential3].filter(Boolean).map((c, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-violet-100 flex items-center justify-center shrink-0">
                      <svg className="w-3.5 h-3.5 text-violet-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-slate-700 text-sm">{c}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-2 space-y-4">
              {content.how_it_works.map((step, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="font-heading font-bold text-2xl text-violet-200 shrink-0">{step.step}</span>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">{step.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section id="chuong-trinh" className="py-20 bg-slate-50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-slate-900 mb-3">Chương trình Coaching</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.programs.map((prog, i) => {
              const dbProg = displayPrograms[i];
              const name = dbProg?.name ?? prog.name;
              const price = dbProg?.price ?? prog.price;
              const desc = dbProg?.description ?? prog.description;
              const isPopular = prog.badge === "Phổ biến nhất";
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className={`relative rounded-2xl border p-6 ${isPopular ? "bg-violet-600 border-violet-600 text-white shadow-xl shadow-violet-200 scale-[1.02]" : "bg-white border-slate-200"}`}>
                  {isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-amber-400 text-slate-900 text-xs font-bold rounded-full">
                      Phổ biến nhất
                    </div>
                  )}
                  <div className="mb-4">
                    <h3 className={`font-heading font-bold text-xl mb-1 ${isPopular ? "text-white" : "text-slate-900"}`}>{name}</h3>
                    <p className={`text-xs ${isPopular ? "text-violet-200" : "text-slate-400"}`}>{prog.tagline}</p>
                  </div>
                  <div className="mb-6">
                    <span className={`text-3xl font-bold ${isPopular ? "text-white" : "text-violet-600"}`}>{fmt(price)}</span>
                    <span className={`text-sm ml-1 ${isPopular ? "text-violet-200" : "text-slate-400"}`}>{prog.duration}</span>
                  </div>
                  <p className={`text-sm mb-5 ${isPopular ? "text-violet-100" : "text-slate-500"}`}>{desc}</p>
                  <ul className="space-y-2.5 mb-6">
                    {prog.features.filter(Boolean).map((f, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm">
                        <svg className={`w-4 h-4 shrink-0 mt-0.5 ${isPopular ? "text-violet-200" : "text-violet-500"}`} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className={isPopular ? "text-violet-100" : "text-slate-600"}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => onBooking?.(name)}
                    className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${isPopular ? "bg-white text-violet-700 hover:bg-violet-50" : "bg-violet-600 hover:bg-violet-700 text-white"}`}
                  >
                    {prog.cta || "Đăng ký ngay"}
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="ket-qua" className="py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="font-heading text-3xl font-bold text-slate-900 text-center mb-12">Học viên nói gì</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.testimonials.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="rounded-2xl p-6 bg-violet-50 border border-violet-100">
                <p className="text-sm text-violet-700 font-semibold mb-1">{t.result}</p>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-violet-200 flex items-center justify-center text-violet-700 font-bold text-sm">{t.name?.[0] ?? "H"}</div>
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

      {/* FAQ */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto max-w-2xl px-4">
          <h2 className="font-heading text-3xl font-bold text-slate-900 text-center mb-10">Câu hỏi thường gặp</h2>
          <div className="space-y-4">
            {content.faq.map((item, i) => (
              <FaqItem key={i} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <section id="dat-lich" className="py-20 bg-gradient-to-br from-violet-600 to-purple-700">
        <div className="container mx-auto max-w-xl px-4 text-center">
          <h2 className="font-heading text-3xl font-bold text-white mb-3">{content.cta_section.headline}</h2>
          <p className="text-violet-200 mb-8">{content.cta_section.subtext}</p>
          <BookingForm projectId={projectId} onBooking={onBooking} buttonText={content.cta_section.button} />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 py-12">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <h3 className="font-heading font-bold text-white text-xl mb-2">{brandName}</h3>
          <p className="text-slate-400 text-sm mb-4">{content.footer.tagline}</p>
          <div className="flex justify-center gap-6 text-sm text-slate-500">
            {content.footer.phone && <span>📞 {content.footer.phone}</span>}
            {content.footer.email && <span>✉️ {content.footer.email}</span>}
          </div>
          <p className="text-xs text-slate-700 mt-6">© {new Date().getFullYear()} {brandName}. Được tạo bởi <a href="/" className="text-blue-400 hover:text-blue-300">SellOS</a></p>
        </div>
      </footer>
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-5 py-4 text-left">
        <span className="font-medium text-slate-900 text-sm">{q}</span>
        <svg className={`w-4 h-4 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <div className="px-5 pb-4 text-sm text-slate-500 leading-relaxed">{a}</div>}
    </div>
  );
}

function BookingForm({ projectId, onBooking, buttonText }: { projectId: string; onBooking?: (p: string) => void; buttonText?: string }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [program, setProgram] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await fetch(`/api/public/projects/${projectId}/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ client_name: name, client_phone: phone, program_name: program }),
    });
    setSent(true);
    setLoading(false);
    onBooking?.(program);
  }

  if (sent) return (
    <div className="bg-white/10 rounded-2xl p-8 text-white">
      <p className="text-2xl mb-2">✅</p>
      <p className="font-semibold text-lg">Đã nhận yêu cầu!</p>
      <p className="text-violet-200 text-sm mt-1">Chúng tôi sẽ liên hệ bạn trong 24 giờ.</p>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 space-y-3 text-left">
      <input required value={name} onChange={e => setName(e.target.value)} placeholder="Họ và tên *" className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-white/60 text-sm" />
      <input required value={phone} onChange={e => setPhone(e.target.value)} placeholder="Số điện thoại *" className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-white/60 text-sm" />
      <input value={program} onChange={e => setProgram(e.target.value)} placeholder="Chương trình quan tâm" className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-white/60 text-sm" />
      <button type="submit" disabled={loading} className="w-full py-3 bg-white text-violet-700 font-bold rounded-xl hover:bg-violet-50 transition-colors disabled:opacity-60">
        {loading ? "Đang gửi..." : (buttonText || "Đặt lịch tư vấn miễn phí")}
      </button>
    </form>
  );
}
