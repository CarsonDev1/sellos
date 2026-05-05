"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ProjectProduct } from "@/lib/supabase/projects";
import { useCart } from "../../CartProviderWrapper";

interface Props {
  products: ProjectProduct[];
  projectId: string;
  brandName: string;
  categoryName: string;
  categoryDesc: string;
  hasMatch: boolean;
}

function fmt(n: number | null) {
  if (!n) return "";
  return n.toLocaleString("vi-VN") + "đ";
}

export default function CategoryClient({
  products,
  projectId,
  brandName,
  categoryName,
  categoryDesc,
  hasMatch,
}: Props) {
  const { addItem, openCart, itemCount } = useCart();

  return (
    <div className="bg-white min-h-screen">
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-rose-100 shadow-sm">
        <div className="container mx-auto max-w-7xl px-4 h-16 flex items-center justify-between gap-4">
          <Link href={`/w/${projectId}`} className="font-heading font-bold text-slate-900 text-xl">
            {brandName}
          </Link>
          <nav className="hidden md:flex items-center gap-1 text-sm">
            <Link href={`/w/${projectId}`} className="px-3 py-2 text-slate-600 hover:text-rose-700 font-medium">
              Trang chủ
            </Link>
            <Link href={`/w/${projectId}/san-pham`} className="px-3 py-2 text-slate-600 hover:text-rose-700 font-medium">
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
        <nav className="text-xs text-slate-500 mb-4 flex items-center gap-1.5">
          <Link href={`/w/${projectId}`} className="hover:text-rose-600">Trang chủ</Link>
          <span>/</span>
          <Link href={`/w/${projectId}/san-pham`} className="hover:text-rose-600">Sản phẩm</Link>
          <span>/</span>
          <span className="text-slate-700 capitalize">{categoryName}</span>
        </nav>

        <div className="mb-8">
          <h1 className="font-heading text-4xl font-bold text-slate-900 mb-2 capitalize">
            {categoryName}
          </h1>
          {categoryDesc && <p className="text-slate-500">{categoryDesc}</p>}
          {!hasMatch && (
            <p className="mt-3 text-xs text-amber-700 bg-amber-50 border border-amber-200 inline-block px-3 py-1.5 rounded-full">
              Chưa có sản phẩm gắn với danh mục này — đang hiển thị toàn bộ.
            </p>
          )}
        </div>

        {products.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-slate-400">Không có sản phẩm nào.</p>
            <Link
              href={`/w/${projectId}/san-pham`}
              className="mt-4 inline-block text-rose-600 hover:text-rose-700 font-semibold"
            >
              Xem tất cả sản phẩm →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {products.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.04, 0.4) }}
                className="bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-md transition-all group"
              >
                <Link href={`/w/${projectId}/san-pham/${p.slug ?? p.id}`}>
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
                  </div>
                </Link>
                <div className="p-4">
                  <Link href={`/w/${projectId}/san-pham/${p.slug ?? p.id}`}>
                    <p className="font-medium text-slate-900 text-sm line-clamp-1 hover:text-rose-600 transition-colors">
                      {p.name}
                    </p>
                  </Link>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-bold text-rose-600 text-sm">{fmt(p.price)}</span>
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
