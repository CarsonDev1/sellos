"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CourseNavbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm"
          : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="text-xs text-slate-400 hover:text-slate-600 transition-colors"
          >
            ← SellOS
          </Link>
          <span className="text-slate-200">|</span>
          <div className="flex items-center gap-2">
            <span className="text-xl">📚</span>
            <span className="font-heading font-semibold text-slate-900 text-sm hidden sm:block">
              Bán Hàng Online Từ 0 Đến Đơn Đầu Tiên
            </span>
            <span className="font-heading font-semibold text-slate-900 text-sm sm:hidden">
              Khóa Học Online
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="#chuong-trinh"
            className="hidden sm:block text-sm text-slate-600 hover:text-slate-900 transition-colors font-medium"
          >
            Chương trình
          </a>
          <a
            href="#hoc-vien"
            className="hidden sm:block text-sm text-slate-600 hover:text-slate-900 transition-colors font-medium"
          >
            Học viên
          </a>
          <a
            href="#gia"
            className="hidden sm:block text-sm text-slate-600 hover:text-slate-900 transition-colors font-medium"
          >
            Học phí
          </a>
          <Button
            asChild
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5"
          >
            <a href="#gia">Đăng Ký Ngay</a>
          </Button>
        </div>
      </div>
    </header>
  );
}
