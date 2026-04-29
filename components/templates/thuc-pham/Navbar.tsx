"use client";

import { useState } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Sản phẩm", href: "#san-pham" },
  { label: "Câu chuyện", href: "#cau-chuyen" },
  { label: "Blog", href: "#blog" },
  { label: "Liên hệ", href: "#lien-he" },
];

export default function FoodNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-green-100 shadow-sm">
      <div className="container mx-auto max-w-7xl px-4 h-16 flex items-center gap-4">
        {/* Logo */}
        <Link href="/templates/thuc-pham" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 3.636a1 1 0 010 1.414 7 7 0 000 9.9 1 1 0 11-1.414 1.414 9 9 0 010-12.728 1 1 0 011.414 0zm9.9 0a1 1 0 011.414 0 9 9 0 010 12.728 1 1 0 11-1.414-1.414 7 7 0 000-9.9 1 1 0 010-1.414zM7.879 6.464a1 1 0 010 1.414 3 3 0 000 4.243 1 1 0 11-1.415 1.414 5 5 0 010-7.07 1 1 0 011.415 0zm4.242 0a1 1 0 011.415 0 5 5 0 010 7.072 1 1 0 01-1.415-1.415 3 3 0 000-4.242 1 1 0 010-1.415zM10 9a1 1 0 011 1v.01a1 1 0 11-2 0V10a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="font-heading font-bold text-slate-800 text-base">
            Organi<span className="text-green-600">ca</span>
          </span>
        </Link>

        {/* Nav links — desktop */}
        <nav className="hidden md:flex items-center gap-1 ml-6 text-sm">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-3 py-2 rounded-lg text-slate-600 hover:text-green-700 hover:bg-green-50 font-medium transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2 ml-auto">
          {/* Cart icon */}
          <button className="hidden sm:flex relative w-9 h-9 items-center justify-center rounded-full hover:bg-green-50 transition-colors text-slate-600 hover:text-green-700">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="absolute top-1 right-1 w-4 h-4 bg-green-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">3</span>
          </button>

          <a
            href="#san-pham"
            className="hidden sm:block text-sm text-slate-600 hover:text-slate-900 font-medium px-4 py-2 rounded-lg hover:bg-slate-100 transition-all"
          >
            Đăng nhập
          </a>
          <a
            href="#san-pham"
            className="text-sm bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-sm shadow-green-200"
          >
            Đặt hàng
          </a>

          {/* Mobile hamburger */}
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
        <div className="md:hidden bg-white border-t border-green-100 shadow-lg">
          <div className="container mx-auto max-w-7xl px-4 py-4 space-y-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center px-4 py-3 rounded-xl text-slate-700 hover:bg-green-50 hover:text-green-700 font-medium text-sm transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 border-t border-slate-100 mt-2">
              <a
                href="#san-pham"
                onClick={() => setMobileOpen(false)}
                className="block w-full text-center py-3 text-sm font-semibold text-white bg-green-600 rounded-xl hover:bg-green-700 transition-colors"
              >
                Đặt hàng ngay
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
