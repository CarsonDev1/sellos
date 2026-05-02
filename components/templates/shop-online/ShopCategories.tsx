"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function ShopCategories() {
  return (
    <section className="py-10 px-4 bg-white">
      <div className="container mx-auto max-w-7xl">
        {/* Section title */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading font-bold text-slate-900 text-xl">Danh Mục</h2>
          <Link href="/templates/shop-online/danh-muc/ao" className="text-sm text-rose-600 font-semibold hover:underline">Xem tất cả →</Link>
        </div>

        {/* 5-col icon categories */}
        <div className="grid grid-cols-5 gap-3 mb-10">
          {[
            { label: "Áo Nữ", href: "/templates/shop-online/danh-muc/ao", emoji: "👕", bg: "bg-rose-50 hover:bg-rose-100" },
            { label: "Quần & Váy", href: "/templates/shop-online/danh-muc/quan", emoji: "👗", bg: "bg-pink-50 hover:bg-pink-100" },
            { label: "Phụ Kiện", href: "/templates/shop-online/danh-muc/phu-kien", emoji: "👜", bg: "bg-amber-50 hover:bg-amber-100" },
            { label: "Giày Dép", href: "/templates/shop-online/danh-muc/giay", emoji: "👠", bg: "bg-violet-50 hover:bg-violet-100" },
            { label: "Sale 🔥", href: "/templates/shop-online/sale", emoji: "🏷️", bg: "bg-red-50 hover:bg-red-100" },
          ].map((cat, i) => (
            <motion.div key={cat.label} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              <Link
                href={cat.href}
                className={`flex flex-col items-center gap-2 py-4 rounded-2xl ${cat.bg} transition-colors group`}
              >
                <span className="text-2xl sm:text-3xl">{cat.emoji}</span>
                <span className="text-xs sm:text-sm font-semibold text-slate-700 text-center leading-tight">{cat.label}</span>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Large promo grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Main hero promo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-7 relative rounded-3xl overflow-hidden h-64 sm:h-80 group"
          >
            <img
              src="https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=900&q=80"
              alt=""
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/65 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
              <span className="text-rose-300 text-xs font-bold uppercase tracking-widest">Áo Nữ Mùa Hè</span>
              <h3 className="font-heading font-black text-white text-2xl sm:text-3xl mt-1 leading-tight">Linen &<br />Cotton Shirts</h3>
              <Link
                href="/templates/shop-online/danh-muc/ao"
                className="inline-flex items-center gap-2 mt-3 bg-white text-slate-900 hover:bg-rose-50 text-sm font-bold px-5 py-2.5 rounded-xl transition-colors"
              >
                Shop now →
              </Link>
            </div>
          </motion.div>

          {/* 2 small promos stacked */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative rounded-3xl overflow-hidden h-[145px] sm:h-[150px] group"
            >
              <img
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80"
                alt=""
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-rose-900/70 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4 sm:p-5">
                <span className="text-rose-200 text-[10px] font-bold uppercase tracking-wider">Giày & Dép</span>
                <h3 className="font-heading font-black text-white text-lg sm:text-xl">Sneakers<br />& Loafers</h3>
                <Link href="/templates/shop-online/danh-muc/giay" className="text-white/80 text-xs font-semibold hover:text-white transition-colors">Xem ngay →</Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative rounded-3xl overflow-hidden h-[145px] sm:h-[150px] group"
            >
              <img
                src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=700&q=80"
                alt=""
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-amber-900/70 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4 sm:p-5">
                <span className="text-amber-200 text-[10px] font-bold uppercase tracking-wider">Túi & Phụ Kiện</span>
                <h3 className="font-heading font-black text-white text-lg sm:text-xl">Bags &<br />Accessories</h3>
                <Link href="/templates/shop-online/danh-muc/phu-kien" className="text-white/80 text-xs font-semibold hover:text-white transition-colors">Xem ngay →</Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
