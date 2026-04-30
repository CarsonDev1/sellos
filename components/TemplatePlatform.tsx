"use client";

import { motion, type Variants } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const TEMPLATES = [
  {
    icon: "📚",
    name: "Khóa học",
    industry: "Giáo dục",
    gradient: "from-blue-500 to-indigo-600",
    tag: "Conversion cao",
    tagColor: "border-blue-200 text-blue-700 bg-blue-50",
    previewUrl: "/templates/khoa-hoc",
    link: "/templates/khoa-hoc",
  },
  {
    icon: "🛒",
    name: "Shop online",
    industry: "Thương mại",
    gradient: "from-rose-500 to-pink-600",
    tag: "Mới nhất",
    tagColor: "border-rose-200 text-rose-700 bg-rose-50",
    previewUrl: null,
    link: null,
  },
  {
    icon: "💼",
    name: "Dịch vụ",
    industry: "B2B / Agency",
    gradient: "from-violet-500 to-purple-600",
    tag: "Conversion cao",
    tagColor: "border-violet-200 text-violet-700 bg-violet-50",
    previewUrl: null,
    link: null,
  },
  {
    icon: "🎯",
    name: "Coaching",
    industry: "Tư vấn / Mentor",
    gradient: "from-amber-500 to-orange-600",
    tag: "Mới nhất",
    tagColor: "border-amber-200 text-amber-700 bg-amber-50",
    previewUrl: null,
    link: null,
  },
  {
    icon: "🎉",
    name: "Sự kiện",
    industry: "Events",
    gradient: "from-teal-500 to-emerald-600",
    tag: "Conversion cao",
    tagColor: "border-teal-200 text-teal-700 bg-teal-50",
    previewUrl: null,
    link: null,
  },
  {
    icon: "🥗",
    name: "Thực phẩm",
    industry: "F&B / Organic",
    gradient: "from-green-500 to-lime-600",
    tag: "Mới nhất",
    tagColor: "border-green-200 text-green-700 bg-green-50",
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
          className="text-center mb-5"
        >
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
            Hàng Chục Template Đẹp — Xem Live, Chọn Ngay
          </h2>
          <p className="text-slate-500 text-base max-w-lg mx-auto">
            Không cần tưởng tượng. Xem demo thật trước khi làm.
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
                  <div className="flex gap-1 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                  </div>
                  <div className="space-y-1.5">
                    <div className="h-2.5 bg-white/50 rounded w-4/5" />
                    <div className="h-2 bg-white/30 rounded w-3/5" />
                    <div className="h-5 bg-white/70 rounded w-2/5 mt-2" />
                  </div>
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-lg">
                    {t.icon}
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
                      Xem Demo →
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
            <Link href="#pricing">Xem Toàn Bộ Template →</Link>
          </Button>
          <p className="text-slate-400 text-sm">
            Ưng mẫu nào → click &quot;Dùng mẫu này&quot; → AI điền thông tin
            của bạn vào ngay.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
