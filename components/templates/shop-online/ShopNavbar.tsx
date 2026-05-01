"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "./CartContext";

const NAV_LINKS = [
  { label: "Mới về", href: "#san-pham-moi" },
  { label: "Sale", href: "#sale" },
  { label: "Bộ sưu tập", href: "#danh-muc" },
  { label: "Về chúng tôi", href: "#ve-chung-toi" },
];

export default function ShopNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { itemCount, openCart } = useCart();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-rose-100 shadow-sm">
      <div className="container mx-auto max-w-7xl px-4 h-16 flex items-center gap-4">
        {/* Logo */}
        <Link href="/templates/shop-online" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="font-heading font-bold text-slate-800 text-base tracking-wide">
            NO<span className="text-rose-600">VA</span>
          </span>
        </Link>

        {/* Search bar — desktop */}
        <div className="hidden lg:flex flex-1 max-w-xs ml-4">
          <div className="relative w-full">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-300 transition-all"
            />
          </div>
        </div>

        {/* Nav links — desktop */}
        <nav className="hidden md:flex items-center gap-1 ml-4 text-sm">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-3 py-2 rounded-lg text-slate-600 hover:text-rose-700 hover:bg-rose-50 font-medium transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-1.5 ml-auto">
          {/* Wishlist */}
          <button className="hidden sm:flex w-9 h-9 items-center justify-center rounded-full hover:bg-rose-50 transition-colors text-slate-500 hover:text-rose-600">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>

          {/* Cart */}
          <button
            onClick={openCart}
            className="relative flex w-9 h-9 items-center justify-center rounded-full hover:bg-rose-50 transition-colors text-slate-500 hover:text-rose-600"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {itemCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-rose-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {itemCount > 9 ? "9+" : itemCount}
              </span>
            )}
          </button>

          <a
            href="#danh-muc"
            className="hidden sm:block text-sm bg-rose-600 hover:bg-rose-700 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-sm shadow-rose-200"
          >
            Mua ngay
          </a>

          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden ml-1 w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <span className={`w-5 h-0.5 bg-slate-600 rounded-full transition-all ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`w-5 h-0.5 bg-slate-600 rounded-full transition-all ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`w-5 h-0.5 bg-slate-600 rounded-full transition-all ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-rose-100 shadow-lg">
          <div className="container mx-auto max-w-7xl px-4 py-4 space-y-1">
            <div className="relative mb-3">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="w-full pl-9 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-200"
              />
            </div>
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center px-4 py-3 rounded-xl text-slate-700 hover:bg-rose-50 hover:text-rose-700 font-medium text-sm transition-colors"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => { openCart(); setMobileOpen(false); }}
              className="flex items-center gap-2 w-full px-4 py-3 rounded-xl text-slate-700 hover:bg-rose-50 hover:text-rose-700 font-medium text-sm transition-colors"
            >
              Giỏ hàng
              {itemCount > 0 && (
                <span className="ml-auto w-5 h-5 bg-rose-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
