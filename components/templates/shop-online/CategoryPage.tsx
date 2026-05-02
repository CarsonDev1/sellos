"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { PRODUCTS, type Product } from "./data";
import { useCart } from "./CartContext";

const CATEGORY_META: Record<string, { label: string; desc: string; banner: string }> = {
  ao: {
    label: "Áo Nữ",
    desc: "Áo thun, sơ mi, crop top và các kiểu áo thời trang nữ cao cấp",
    banner: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1400&q=80",
  },
  quan: {
    label: "Quần & Váy",
    desc: "Quần jeans, quần âu, váy midi và các loại quần váy thời trang",
    banner: "https://images.unsplash.com/photo-1594938298603-c8148c4b4357?auto=format&fit=crop&w=1400&q=80",
  },
  "phu-kien": {
    label: "Phụ Kiện",
    desc: "Túi xách, nón mũ, trang sức và các phụ kiện thời trang",
    banner: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1400&q=80",
  },
  giay: {
    label: "Giày Dép",
    desc: "Sneakers, loafers, sandals và các loại giày dép thời trang nữ",
    banner: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1400&q=80",
  },
};

const SORT_OPTIONS = [
  { id: "popular", label: "Phổ biến nhất" },
  { id: "newest", label: "Mới nhất" },
  { id: "price-asc", label: "Giá tăng dần" },
  { id: "price-desc", label: "Giá giảm dần" },
  { id: "rating", label: "Đánh giá cao" },
];

const SIZE_OPTIONS = ["XS", "S", "M", "L", "XL", "35", "36", "37", "38", "39", "40", "One size"];
const PRICE_RANGES = [
  { id: "0-200", label: "Dưới 200k" },
  { id: "200-500", label: "200k – 500k" },
  { id: "500-1000", label: "500k – 1 triệu" },
  { id: "1000+", label: "Trên 1 triệu" },
];

function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="group">
      <Link href={`/templates/shop-online/san-pham/${product.id}`} className="block relative overflow-hidden rounded-2xl bg-slate-100 aspect-[3/4] mb-3">
        <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
          {product.badge && <span className={`text-white text-[10px] font-bold px-2 py-0.5 rounded-lg ${product.badgeColor}`}>{product.badge}</span>}
          {discount > 0 && <span className="bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-lg">-{discount}%</span>}
        </div>
        <button className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 hover:bg-rose-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-sm">
          <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={(e) => { e.preventDefault(); addItem(product, product.colors[0], product.sizes[0]); }}
            className="w-full py-2.5 bg-white hover:bg-rose-600 hover:text-white text-slate-900 text-xs font-bold rounded-xl transition-all shadow-lg"
          >
            + Thêm vào giỏ
          </button>
        </div>
      </Link>

      <div className="flex gap-1.5 mb-1.5">
        {product.colors.slice(0, 4).map((c) => (
          <span key={c} className="w-3.5 h-3.5 rounded-full border border-slate-200" style={{ backgroundColor: c }} />
        ))}
      </div>
      <Link href={`/templates/shop-online/san-pham/${product.id}`}>
        <p className="text-sm font-semibold text-slate-900 hover:text-rose-600 transition-colors line-clamp-2 leading-snug">{product.name}</p>
      </Link>
      <div className="flex items-center gap-2 mt-1">
        <span className="font-bold text-slate-900 text-sm">{product.price.toLocaleString("vi-VN")}₫</span>
        {product.originalPrice && <span className="text-xs text-slate-400 line-through">{product.originalPrice.toLocaleString("vi-VN")}₫</span>}
      </div>
    </motion.div>
  );
}

interface Props {
  category: string;
}

export default function CategoryPage({ category }: Props) {
  const meta = CATEGORY_META[category] ?? { label: "Sản phẩm", desc: "", banner: "" };
  const [sortBy, setSortBy] = useState("popular");
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let products = PRODUCTS.filter((p) => p.category === category);

    if (selectedSizes.length > 0) {
      products = products.filter((p) => p.sizes.some((s) => selectedSizes.includes(s)));
    }
    if (selectedPriceRange) {
      const [min, max] = selectedPriceRange.split("-").map(Number);
      products = products.filter((p) =>
        max ? p.price >= min * 1000 && p.price <= max * 1000 : p.price >= min * 1000
      );
    }

    if (sortBy === "newest") products = [...products].reverse();
    else if (sortBy === "price-asc") products = [...products].sort((a, b) => a.price - b.price);
    else if (sortBy === "price-desc") products = [...products].sort((a, b) => b.price - a.price);
    else if (sortBy === "rating") products = [...products].sort((a, b) => b.rating - a.rating);
    else products = [...products].sort((a, b) => b.sold - a.sold);

    return products;
  }, [category, sortBy, selectedSizes, selectedPriceRange]);

  const toggleSize = (s: string) =>
    setSelectedSizes((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  return (
    <div className="min-h-screen bg-white pt-[88px]">
      {/* Category banner */}
      <div className="relative h-40 sm:h-52 overflow-hidden">
        {meta.banner && <img src={meta.banner} alt="" className="w-full h-full object-cover object-top" />}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 to-slate-900/30" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="flex items-center gap-2 text-white/70 text-xs mb-2">
              <Link href="/templates/shop-online" className="hover:text-white transition-colors">Trang chủ</Link>
              <span>/</span>
              <span className="text-white font-semibold">{meta.label}</span>
            </div>
            <h1 className="font-heading font-black text-white text-3xl sm:text-4xl">{meta.label}</h1>
            <p className="text-white/70 text-sm mt-1">{meta.desc}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6 gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen((v) => !v)}
              className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:border-rose-300 hover:text-rose-700 transition-all"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h18M6 8h12M9 12h6M12 16h0" />
              </svg>
              Bộ lọc {(selectedSizes.length + (selectedPriceRange ? 1 : 0)) > 0 && `(${selectedSizes.length + (selectedPriceRange ? 1 : 0)})`}
            </button>
            <span className="text-sm text-slate-400">{filteredProducts.length} sản phẩm</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-500 hidden sm:block">Sắp xếp:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-200 bg-white"
            >
              {SORT_OPTIONS.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
            </select>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar filters */}
          {sidebarOpen && (
            <div className="w-56 flex-shrink-0">
              <div className="sticky top-24 space-y-6">
                {/* Price */}
                <div>
                  <h3 className="font-semibold text-slate-900 text-sm mb-3">Khoảng giá</h3>
                  <div className="space-y-2">
                    {PRICE_RANGES.map((r) => (
                      <label key={r.id} className="flex items-center gap-2.5 cursor-pointer group">
                        <div
                          onClick={() => setSelectedPriceRange(selectedPriceRange === r.id ? null : r.id)}
                          className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all cursor-pointer ${
                            selectedPriceRange === r.id ? "border-rose-500 bg-rose-500" : "border-slate-300 group-hover:border-rose-300"
                          }`}
                        >
                          {selectedPriceRange === r.id && <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
                        </div>
                        <span className="text-sm text-slate-600">{r.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Size */}
                <div>
                  <h3 className="font-semibold text-slate-900 text-sm mb-3">Size</h3>
                  <div className="flex flex-wrap gap-2">
                    {SIZE_OPTIONS.map((s) => (
                      <button
                        key={s}
                        onClick={() => toggleSize(s)}
                        className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg border-2 transition-all ${
                          selectedSizes.includes(s)
                            ? "border-rose-500 bg-rose-50 text-rose-700"
                            : "border-slate-200 text-slate-600 hover:border-rose-300"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Reset */}
                {(selectedSizes.length > 0 || selectedPriceRange) && (
                  <button
                    onClick={() => { setSelectedSizes([]); setSelectedPriceRange(null); }}
                    className="text-sm text-rose-600 font-semibold hover:underline"
                  >
                    Xoá bộ lọc
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Product grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-slate-400 text-lg mb-4">Không tìm thấy sản phẩm phù hợp</p>
                <button onClick={() => { setSelectedSizes([]); setSelectedPriceRange(null); }} className="px-6 py-2.5 bg-rose-600 text-white rounded-xl font-semibold text-sm hover:bg-rose-700 transition-colors">
                  Xoá bộ lọc
                </button>
              </div>
            ) : (
              <div className={`grid gap-4 lg:gap-5 ${sidebarOpen ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"}`}>
                {filteredProducts.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
