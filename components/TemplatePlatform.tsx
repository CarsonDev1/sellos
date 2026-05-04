"use client";

import { motion, type Variants } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const TEMPLATES = [
  {
    icon: "📚",
    name: "Khóa học",
    industry: "Giáo dục / Online course",
    gradient: "from-blue-500 to-indigo-600",
    tag: "Phổ biến",
    tagColor: "border-blue-200 text-blue-700 bg-blue-50",
    previewUrl: "/templates/khoa-hoc",
    link: "/templates/khoa-hoc",
  },
  {
    icon: "🛒",
    name: "Shop online",
    industry: "Thời trang / Tiêu dùng",
    gradient: "from-rose-500 to-pink-600",
    tag: "Mới nhất",
    tagColor: "border-rose-200 text-rose-700 bg-rose-50",
    previewUrl: "/templates/shop-online",
    link: "/templates/shop-online",
  },
  {
    icon: "💼",
    name: "Dịch vụ & Agency",
    industry: "B2B / Tư vấn / Agency",
    gradient: "from-indigo-500 to-blue-600",
    tag: "Mới ra mắt",
    tagColor: "border-indigo-200 text-indigo-700 bg-indigo-50",
    previewUrl: "/templates/dich-vu",
    link: "/templates/dich-vu",
  },
  {
    icon: "🎯",
    name: "Coaching",
    industry: "Mentor / Coach 1-1",
    gradient: "from-violet-500 to-purple-600",
    tag: "Phổ biến",
    tagColor: "border-violet-200 text-violet-700 bg-violet-50",
    previewUrl: "/templates/coaching",
    link: "/templates/coaching",
  },
  {
    icon: "🎉",
    name: "Sự kiện",
    industry: "Workshop / Hội nghị",
    gradient: "from-amber-500 to-rose-500",
    tag: "Mới ra mắt",
    tagColor: "border-amber-200 text-amber-700 bg-amber-50",
    previewUrl: "/templates/su-kien",
    link: "/templates/su-kien",
  },
  {
    icon: "🥗",
    name: "Thực phẩm",
    industry: "F&B / Đồ tươi sạch",
    gradient: "from-emerald-500 to-green-600",
    tag: "Phổ biến",
    tagColor: "border-emerald-200 text-emerald-700 bg-emerald-50",
    previewUrl: "/templates/thuc-pham",
    link: "/templates/thuc-pham",
  },
];

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};

export default function TemplatePlatform() {
  return (
    <section id="templates" className="py-24 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-5 max-w-2xl mx-auto"
        >
          <span className="inline-block text-xs font-semibold text-rose-600 uppercase tracking-[0.15em] mb-3">
            Mẫu website có sẵn
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
            Chọn mẫu — xem trước — dùng ngay
          </h2>
          <p className="text-slate-500 text-base">
            Không phải tưởng tượng. Bấm vào xem website thật trước khi quyết định dùng.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-12"
        >
          {TEMPLATES.map((t, i) => (
            <motion.div
              key={i}
              variants={item}
              className="group rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-lg hover:border-blue-200 transition-all overflow-hidden hover:-translate-y-1"
            >
              {/* Template preview */}
              {t.previewUrl ? (
                <div className="h-36 relative overflow-hidden bg-slate-100">
                  <iframe
                    src={t.previewUrl}
                    title={`${t.name} preview`}
                    className="absolute top-0 left-0 border-0 pointer-events-none"
                    style={{
                      width: "1280px",
                      height: "720px",
                      transform: "scale(0.29)",
                      transformOrigin: "top left",
                    }}
                    scrolling="no"
                    loading="lazy"
                    tabIndex={-1}
                  />
                  {/* Subtle overlay so card hover looks clean */}
                  <div className="absolute inset-0 bg-transparent group-hover:bg-blue-600/5 transition-colors" />
                </div>
              ) : (
                <div className={`h-36 bg-gradient-to-br ${t.gradient} p-4 flex flex-col justify-between relative overflow-hidden`}>
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage:
                        'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)',
                      backgroundSize: '14px 14px',
                    }}
                  />
                  <div className="relative flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                  </div>
                  <div className="relative space-y-1.5">
                    <div className="h-2.5 bg-white/60 rounded w-4/5" />
                    <div className="h-2 bg-white/40 rounded w-3/5" />
                    <div className="h-5 bg-white/80 rounded-md w-2/5 mt-2" />
                  </div>
                  <div className="absolute top-3 right-3 inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-md border border-white/25 px-2.5 py-1 rounded-full text-[11px] text-white font-medium">
                    Sắp ra mắt
                  </div>
                </div>
              )}

              {/* Card info */}
              <div className="p-4 space-y-3">
                <div>
                  <p className="font-heading font-semibold text-slate-900 text-sm">
                    {t.name}
                  </p>
                  <p className="text-slate-400 text-xs mt-0.5">{t.industry}</p>
                </div>
                <div className="flex items-center justify-between">
                  <Badge
                    variant="outline"
                    className={`text-xs font-medium ${t.tagColor}`}
                  >
                    {t.tag}
                  </Badge>
                  {t.link ? (
                    <Link
                      href={t.link}
                      className="text-xs text-blue-600 font-semibold hover:underline"
                    >
                      Xem website →
                    </Link>
                  ) : (
                    <button className="text-xs text-slate-400 font-semibold cursor-not-allowed">
                      Sắp ra mắt
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-10 space-y-3"
        >
          <Button
            asChild
            variant="outline"
            className="border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold px-8"
          >
            <Link href="#pricing">Xem toàn bộ mẫu →</Link>
          </Button>
          <p className="text-slate-400 text-sm">
            Ưng mẫu nào → bấm &quot;Dùng mẫu này&quot; → AI điền thông tin sản phẩm của bạn vào ngay.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
