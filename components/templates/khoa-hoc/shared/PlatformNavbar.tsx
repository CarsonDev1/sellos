"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface PlatformNavbarProps {
  isLoggedIn?: boolean;
}

export default function PlatformNavbar({ isLoggedIn = false }: PlatformNavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled ? "bg-white shadow-sm border-b border-slate-200" : "bg-white/95 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto max-w-7xl px-4 h-16 flex items-center gap-4">
        {/* Logo */}
        <Link
          href="/templates/khoa-hoc"
          className="flex items-center gap-2 flex-shrink-0"
        >
          <span className="text-2xl">📚</span>
          <span className="font-heading font-bold text-slate-900 text-lg">
            SellOS<span className="text-blue-600">Academy</span>
          </span>
        </Link>

        {/* Search */}
        <div className="flex-1 max-w-xl hidden md:block">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
              🔍
            </span>
            <input
              type="text"
              placeholder="Tìm kiếm khóa học..."
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-full bg-slate-50 focus:outline-none focus:border-blue-300 focus:bg-white transition-colors"
            />
          </div>
        </div>

        {/* Nav links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm text-slate-600">
          <Link href="/templates/khoa-hoc" className="hover:text-slate-900 transition-colors font-medium">
            Danh mục
          </Link>
          <Link href="#" className="hover:text-slate-900 transition-colors font-medium">
            Giảng viên
          </Link>
        </nav>

        {/* Auth */}
        <div className="flex items-center gap-2 ml-auto flex-shrink-0">
          {isLoggedIn ? (
            <>
              <Link
                href="/templates/khoa-hoc/dashboard"
                className="text-sm text-slate-600 hover:text-slate-900 font-medium hidden sm:block"
              >
                Khóa học của tôi
              </Link>
              <Link href="/templates/khoa-hoc/dashboard">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                  A
                </div>
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/templates/khoa-hoc/dashboard"
                className="text-sm text-slate-700 hover:text-slate-900 font-medium px-4 py-2 hidden sm:block"
              >
                Đăng nhập
              </Link>
              <Link
                href="/templates/khoa-hoc/course/ban-hang-online"
                className="text-sm bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg transition-colors"
              >
                Đăng ký
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
