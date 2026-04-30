"use client";

import { useState } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Dịch vụ", href: "#dich-vu" },
  { label: "Kết quả", href: "#ket-qua" },
  { label: "Về tôi", href: "#ve-toi" },
  { label: "Bảng giá", href: "#gia" },
];

export default function CoachNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-amber-100 shadow-sm">
      <div className="container mx-auto max-w-7xl px-4 h-16 flex items-center gap-4">
        {/* Logo */}
        <Link href="/templates/coaching" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">K</span>
          </div>
          <span className="font-heading font-bold text-slate-900 text-base">
            KHOA<span className="text-amber-600">coach</span>
          </span>
        </Link>

        {/* Nav links — desktop */}
        <nav className="hidden md:flex items-center gap-1 ml-6 text-sm">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-3 py-2 rounded-lg text-slate-600 hover:text-amber-700 hover:bg-amber-50 font-medium transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 ml-auto">
          <a
            href="#gia"
            className="hidden sm:block text-sm text-slate-600 hover:text-slate-900 font-medium px-4 py-2 rounded-lg hover:bg-slate-100 transition-all"
          >
            Xem bảng giá
          </a>
          <Link
            href="/templates/coaching/dat-lich"
            className="text-sm bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold px-5 py-2.5 rounded-xl transition-all shadow-sm shadow-amber-200 whitespace-nowrap"
          >
            Đặt Lịch Tư Vấn
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden ml-1 w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <span className={`w-5 h-0.5 bg-slate-600 rounded-full transition-all ${open ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`w-5 h-0.5 bg-slate-600 rounded-full transition-all ${open ? "opacity-0" : ""}`} />
            <span className={`w-5 h-0.5 bg-slate-600 rounded-full transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-amber-100 shadow-lg">
          <div className="container mx-auto max-w-7xl px-4 py-4 space-y-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-center px-4 py-3 rounded-xl text-slate-700 hover:bg-amber-50 hover:text-amber-700 font-medium text-sm transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 border-t border-slate-100 mt-2">
              <Link
                href="/templates/coaching/dat-lich"
                onClick={() => setOpen(false)}
                className="block w-full text-center py-3 text-sm font-semibold text-white bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl"
              >
                Đặt Lịch Tư Vấn Ngay
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
