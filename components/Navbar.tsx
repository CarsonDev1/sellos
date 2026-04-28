"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const NAV_LINKS = [
  { href: "#how-it-works", label: "Cách hoạt động" },
  { href: "#templates", label: "Template" },
  { href: "#pricing", label: "Chi phí" },
  { href: "#faq", label: "FAQ" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm"
          : "bg-white border-b border-slate-100"
      }`}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none group">
            <span className="font-heading font-bold text-xl text-slate-900 group-hover:text-blue-600 transition-colors">
              SellOS
            </span>
            <span className="text-[10px] text-slate-400 font-normal">
              Nền Tảng Bán Hàng Tự Động
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-slate-600 hover:text-slate-900 font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button
              asChild
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold"
            >
              <Link href="#pricing">Bắt Đầu Ngay</Link>
            </Button>
          </div>

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                className="md:hidden flex flex-col gap-1.5 p-2"
                aria-label="Menu"
              >
                <span className="w-5 h-0.5 bg-slate-700 block" />
                <span className="w-5 h-0.5 bg-slate-700 block" />
                <span className="w-5 h-0.5 bg-slate-700 block" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-white border-slate-200 w-72"
            >
              <div className="flex flex-col gap-8 pt-8">
                <Link href="/" className="flex flex-col leading-none">
                  <span className="font-heading font-bold text-2xl text-slate-900">
                    SellOS
                  </span>
                  <span className="text-xs text-slate-400 mt-0.5">
                    Nền Tảng Bán Hàng Tự Động
                  </span>
                </Link>
                <nav className="flex flex-col gap-3">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="text-base text-slate-700 hover:text-blue-600 font-medium transition-colors py-1.5 border-b border-slate-100"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <Button
                  asChild
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                  onClick={() => setOpen(false)}
                >
                  <Link href="#pricing">Bắt Đầu Ngay</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
