"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { ProjectProduct } from "@/lib/supabase/projects";
import { useCart } from "../../CartProviderWrapper";

interface Props {
  product: ProjectProduct;
  related: ProjectProduct[];
  projectId: string;
  brandName: string;
}

function fmt(n: number | null) {
  if (!n) return "";
  return n.toLocaleString("vi-VN") + "đ";
}

export default function ProductDetailClient({ product, related, projectId, brandName }: Props) {
  const { addItem, openCart, itemCount } = useCart();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState<string | undefined>(product.sizes?.[0]);
  const [color, setColor] = useState<string | undefined>(product.colors?.[0]);
  const [activeImage, setActiveImage] = useState(0);

  const images = [
    ...(product.image_url ? [product.image_url] : []),
    ...(product.images ?? []),
  ];
  const mainImage = images[activeImage] ?? null;

  const hasDiscount =
    product.original_price &&
    product.price &&
    product.original_price > product.price;
  const discountPct = hasDiscount
    ? Math.round((1 - (product.price! / product.original_price!)) * 100)
    : 0;

  function handleAdd() {
    for (let i = 0; i < qty; i++) {
      addItem(product, size, color);
    }
  }

  function handleBuyNow() {
    handleAdd();
    openCart();
  }

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

      <div className="container mx-auto max-w-7xl px-4 py-6">
        {/* Breadcrumb */}
        <nav className="text-xs text-slate-500 mb-6 flex items-center gap-1.5">
          <Link href={`/w/${projectId}`} className="hover:text-rose-600">Trang chủ</Link>
          <span>/</span>
          <Link href={`/w/${projectId}/san-pham`} className="hover:text-rose-600">Sản phẩm</Link>
          {product.category && (
            <>
              <span>/</span>
              <span>{product.category}</span>
            </>
          )}
          <span>/</span>
          <span className="text-slate-700 line-clamp-1">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          {/* Image gallery */}
          <div>
            <div className="aspect-square rounded-3xl bg-rose-50 overflow-hidden mb-3 relative">
              {mainImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={mainImage} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-rose-200">
                  <svg className="w-24 h-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
              )}
              {hasDiscount && (
                <span className="absolute top-4 left-4 bg-rose-600 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                  -{discountPct}%
                </span>
              )}
              {product.badge && (
                <span className="absolute top-4 right-4 bg-amber-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                  {product.badge}
                </span>
              )}
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-5 gap-2">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`aspect-square rounded-xl overflow-hidden border-2 transition-colors ${
                      activeImage === i ? "border-rose-500" : "border-transparent"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {product.category && (
              <p className="text-xs uppercase tracking-wider text-rose-600 font-semibold mb-2">
                {product.category}
              </p>
            )}
            <h1 className="font-heading text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              {product.name}
            </h1>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-rose-600">
                {fmt(product.price)}
              </span>
              {hasDiscount && (
                <span className="text-lg text-slate-400 line-through">
                  {fmt(product.original_price)}
                </span>
              )}
            </div>

            {product.description && (
              <p className="text-slate-600 leading-relaxed mb-6 whitespace-pre-line">
                {product.description}
              </p>
            )}

            {/* Stock */}
            {product.available ? (
              <p className="text-xs font-semibold text-emerald-600 mb-6 inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                {product.stock > 0 ? `Còn ${product.stock} sản phẩm` : "Sẵn hàng"}
              </p>
            ) : (
              <p className="text-xs font-semibold text-slate-400 mb-6">Tạm hết hàng</p>
            )}

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <p className="text-sm font-semibold text-slate-700 mb-2">Kích cỡ</p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`min-w-[44px] h-11 px-3 rounded-xl border-2 text-sm font-semibold transition-colors ${
                        size === s
                          ? "border-rose-500 bg-rose-50 text-rose-700"
                          : "border-slate-200 text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <p className="text-sm font-semibold text-slate-700 mb-2">Màu sắc</p>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c}
                      onClick={() => setColor(c)}
                      className={`px-4 h-11 rounded-xl border-2 text-sm font-semibold transition-colors ${
                        color === c
                          ? "border-rose-500 bg-rose-50 text-rose-700"
                          : "border-slate-200 text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-slate-700 mb-2">Số lượng</p>
              <div className="inline-flex items-center border-2 border-slate-200 rounded-xl">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  disabled={qty <= 1}
                  className="w-11 h-11 text-lg font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-40 transition-colors"
                >
                  −
                </button>
                <input
                  type="number"
                  value={qty}
                  onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-14 h-11 text-center font-semibold border-x border-slate-200 focus:outline-none"
                />
                <button
                  onClick={() => setQty(qty + 1)}
                  className="w-11 h-11 text-lg font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <button
                onClick={handleAdd}
                disabled={!product.available}
                className="flex-1 py-4 border-2 border-rose-600 text-rose-600 hover:bg-rose-50 font-bold rounded-xl transition-colors disabled:border-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed"
              >
                Thêm vào giỏ
              </button>
              <button
                onClick={handleBuyNow}
                disabled={!product.available}
                className="flex-1 py-4 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl transition-colors disabled:bg-slate-200 disabled:cursor-not-allowed"
              >
                Mua ngay
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-slate-100">
              <TrustBadge icon="truck" text="Giao hàng nhanh" />
              <TrustBadge icon="shield" text="Đổi trả 14 ngày" />
              <TrustBadge icon="card" text="Thanh toán an toàn" />
            </div>
          </motion.div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="border-t border-slate-100 pt-12 pb-16">
            <h2 className="font-heading text-2xl font-bold text-slate-900 mb-6">
              Sản phẩm tương tự
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map((p) => (
                <Link
                  key={p.id}
                  href={`/w/${projectId}/san-pham/${p.slug ?? p.id}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-md transition-all"
                >
                  <div className="aspect-[3/4] bg-rose-50">
                    {p.image_url && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={p.image_url}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                  </div>
                  <div className="p-4">
                    <p className="font-medium text-slate-900 text-sm line-clamp-1">{p.name}</p>
                    <p className="font-bold text-rose-600 text-sm mt-2">{fmt(p.price)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function TrustBadge({ icon, text }: { icon: string; text: string }) {
  const paths: Record<string, string> = {
    truck: "M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z M3 8h13l3 4v5h-2 M3 8v9h2 M16 12h3",
    shield: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    card: "M3 10h18M7 15h2m3 0h2 M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z",
  };
  return (
    <div className="flex flex-col items-center text-center gap-1.5">
      <div className="w-9 h-9 bg-rose-50 rounded-xl flex items-center justify-center">
        <svg className="w-4 h-4 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={paths[icon]} />
        </svg>
      </div>
      <p className="text-[11px] text-slate-500 font-medium">{text}</p>
    </div>
  );
}
