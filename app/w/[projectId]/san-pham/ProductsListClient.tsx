"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { ProjectProduct } from "@/lib/supabase/projects";
import { useCart } from "../CartProviderWrapper";

interface Props {
  products: ProjectProduct[];
  projectId: string;
  brandName: string;
}

function fmt(n: number | null) {
  if (!n) return "";
  return n.toLocaleString("vi-VN") + "đ";
}

type Sort = "default" | "price-asc" | "price-desc" | "newest";

export default function ProductsListClient({ products, projectId, brandName }: Props) {
  const { addItem, openCart, itemCount } = useCart();
  const [activeCat, setActiveCat] = useState<string>("all");
  const [sort, setSort] = useState<Sort>("default");

  const categories = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => p.category && set.add(p.category));
    return Array.from(set);
  }, [products]);

  const visible = useMemo(() => {
    const list =
      activeCat === "all"
        ? [...products]
        : products.filter((p) => p.category === activeCat);
    if (sort === "price-asc") list.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
    if (sort === "price-desc") list.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    if (sort === "newest")
      list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    return list;
  }, [products, activeCat, sort]);

  return (
    <div className="bg-white min-h-screen">
      {/* Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-rose-100 shadow-sm">
        <div className="container mx-auto max-w-7xl px-4 h-16 flex items-center justify-between gap-4">
          <Link href={`/w/${projectId}`} className="font-heading font-bold text-slate-900 text-xl">
            {brandName}
          </Link>
          <nav className="hidden md:flex items-center gap-1 text-sm">
            <Link href={`/w/${projectId}`} className="px-3 py-2 text-slate-600 hover:text-rose-700 font-medium">
              Trang chủ
            </Link>
            <Link href={`/w/${projectId}/san-pham`} className="px-3 py-2 text-rose-700 font-semibold">
              Sản phẩm
            </Link>
          </nav>
          <button
            onClick={openCart}
            className="relative p-2 hover:bg-rose-50 rounded-xl transition-colors"
          >
            <svg className="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </header>

      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <p className="text-xs uppercase tracking-wider text-rose-600 font-bold mb-2">
            Cửa hàng
          </p>
          <h1 className="font-heading text-4xl font-bold text-slate-900 mb-2">
            Tất cả sản phẩm
          </h1>
          <p className="text-slate-500 text-sm">{products.length} sản phẩm</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-100">
          <div className="flex flex-wrap items-center gap-2">
            <FilterPill active={activeCat === "all"} onClick={() => setActiveCat("all")}>
              Tất cả
            </FilterPill>
            {categories.map((cat) => (
              <FilterPill
                key={cat}
                active={activeCat === cat}
                onClick={() => setActiveCat(cat)}
              >
                {cat}
              </FilterPill>
            ))}
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="px-4 py-2 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-rose-500"
          >
            <option value="default">Mặc định</option>
            <option value="newest">Mới nhất</option>
            <option value="price-asc">Giá thấp → cao</option>
            <option value="price-desc">Giá cao → thấp</option>
          </select>
        </div>

        {visible.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-slate-400">Không có sản phẩm nào.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {visible.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.04, 0.4) }}
                className="bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-md transition-all group"
              >
                <Link href={`/w/${projectId}/san-pham/${p.slug ?? p.id}`} className="block">
                  <div className="relative aspect-[3/4] bg-rose-50">
                    {p.image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={p.image_url}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-rose-200">
                        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                      </div>
                    )}
                    {p.badge && (
                      <span
                        className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          p.badge === "HOT"
                            ? "bg-red-500 text-white"
                            : p.badge === "NEW"
                            ? "bg-blue-500 text-white"
                            : p.badge === "SALE"
                            ? "bg-rose-500 text-white"
                            : "bg-slate-700 text-white"
                        }`}
                      >
                        {p.badge}
                      </span>
                    )}
                  </div>
                </Link>
                <div className="p-4">
                  <Link href={`/w/${projectId}/san-pham/${p.slug ?? p.id}`}>
                    <p className="font-medium text-slate-900 text-sm line-clamp-1 hover:text-rose-600 transition-colors">
                      {p.name}
                    </p>
                  </Link>
                  <div className="flex items-center justify-between mt-2">
                    <div>
                      <span className="font-bold text-rose-600 text-sm">{fmt(p.price)}</span>
                      {p.original_price && p.original_price > (p.price ?? 0) && (
                        <span className="text-[11px] text-slate-400 line-through ml-1">
                          {fmt(p.original_price)}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => addItem(p)}
                      disabled={!p.available}
                      className="w-8 h-8 bg-rose-600 hover:bg-rose-700 disabled:bg-slate-200 text-white rounded-lg flex items-center justify-center transition-colors"
                      aria-label="Thêm vào giỏ"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`text-xs font-semibold px-3.5 py-1.5 rounded-full transition-colors ${
        active
          ? "bg-rose-600 text-white"
          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
      }`}
    >
      {children}
    </button>
  );
}
