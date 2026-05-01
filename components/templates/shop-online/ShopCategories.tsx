"use client";

import { motion } from "framer-motion";

const CATEGORIES = [
  {
    name: "Áo Nữ",
    count: "120+ mẫu",
    href: "#san-pham-moi",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80",
    gradient: "from-rose-600/60 to-pink-700/40",
  },
  {
    name: "Quần & Váy",
    count: "80+ mẫu",
    href: "#san-pham-moi",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4b4357?auto=format&fit=crop&w=600&q=80",
    gradient: "from-slate-800/60 to-slate-900/40",
  },
  {
    name: "Phụ Kiện",
    count: "200+ mẫu",
    href: "#san-pham-moi",
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=600&q=80",
    gradient: "from-amber-700/60 to-orange-800/40",
  },
  {
    name: "Sale -50%",
    count: "Hàng trăm mẫu",
    href: "#sale",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=600&q=80",
    gradient: "from-rose-700/70 to-pink-800/50",
    isHot: true,
  },
];

export default function ShopCategories() {
  return (
    <section id="danh-muc" className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
            Khám Phá Danh Mục
          </h2>
          <p className="text-slate-500 text-base max-w-lg mx-auto">
            Từ áo đến phụ kiện — tất cả những gì bạn cần để mix&match phong cách riêng.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((cat, i) => (
            <motion.a
              key={cat.name}
              href={cat.href}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative rounded-2xl overflow-hidden aspect-[3/4] group cursor-pointer block"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${cat.gradient} transition-opacity group-hover:opacity-80`} />

              {cat.isHot && (
                <span className="absolute top-3 left-3 bg-rose-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                  🔥 HOT
                </span>
              )}

              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="font-heading font-bold text-white text-lg leading-tight">{cat.name}</p>
                <p className="text-white/70 text-xs mt-0.5">{cat.count}</p>
                <span className="inline-flex items-center gap-1 mt-2 text-white text-xs font-semibold bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full group-hover:bg-white/30 transition-colors">
                  Xem tất cả →
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
