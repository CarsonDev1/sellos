"use client";

import { useState } from "react";
import Link from "next/link";
import AuthModal from "./AuthModal";

interface PlatformNavbarProps {
  isLoggedIn?: boolean;
}

export default function PlatformNavbar({ isLoggedIn = false }: PlatformNavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authModal, setAuthModal] = useState<{ open: boolean; mode: "login" | "register" }>({
    open: false,
    mode: "login",
  });

  const openAuth = (mode: "login" | "register") => {
    setAuthModal({ open: true, mode });
    setMobileOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="container mx-auto max-w-7xl px-4 h-16 flex items-center gap-3">
          {/* Logo */}
          <Link href="/templates/khoa-hoc" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838l-2.727 1.17 1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
              </svg>
            </div>
            <span className="font-heading font-bold text-slate-900 text-base">
              SellOS<span className="text-blue-600">Academy</span>
            </span>
          </Link>

          {/* Search */}
          <div className="flex-1 max-w-md hidden md:block mx-2">
            <div className="relative group">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4"
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Tìm kiếm khóa học..."
                className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-200 rounded-full bg-slate-50 focus:outline-none focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>
          </div>

          {/* Nav links */}
          <nav className="hidden lg:flex items-center gap-1 text-sm">
            {[
              { label: "Khóa học", href: "/templates/khoa-hoc" },
              { label: "Giảng viên", href: "#" },
              { label: "Blog", href: "#" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="px-3 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-medium transition-all"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2 ml-auto flex-shrink-0">
            {isLoggedIn ? (
              <>
                <Link
                  href="/templates/khoa-hoc/dashboard"
                  className="hidden sm:flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 font-medium px-3 py-2 rounded-lg hover:bg-slate-100 transition-all"
                >
                  <span>📚</span> Khóa học của tôi
                </Link>
                <Link href="/templates/khoa-hoc/dashboard" className="relative">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm ring-2 ring-white ring-offset-1">
                    A
                  </div>
                  <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white" />
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/templates/khoa-hoc/dashboard"
                  className="hidden sm:flex items-center gap-1.5 text-sm text-blue-600 font-semibold px-3.5 py-2 rounded-xl border border-blue-200 hover:bg-blue-50 transition-all"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Demo Dashboard
                </Link>
                <button
                  onClick={() => openAuth("login")}
                  className="hidden sm:block text-sm text-slate-700 hover:text-slate-900 font-medium px-4 py-2.5 rounded-lg hover:bg-slate-100 transition-all"
                >
                  Đăng nhập
                </button>
                <button
                  onClick={() => openAuth("register")}
                  className="text-sm bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-sm shadow-blue-200"
                >
                  Đăng ký miễn phí
                </button>
              </>
            )}

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden ml-1 w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <span className={`w-5 h-0.5 bg-slate-600 rounded-full transition-all ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`w-5 h-0.5 bg-slate-600 rounded-full transition-all ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`w-5 h-0.5 bg-slate-600 rounded-full transition-all ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-slate-200 shadow-lg">
            <div className="container mx-auto max-w-7xl px-4 py-4 space-y-1">
              {/* Search mobile */}
              <div className="relative mb-3">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Tìm kiếm khóa học..."
                  className="w-full pl-10 pr-4 py-3 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:border-blue-400"
                />
              </div>
              {[
                { label: "Khóa học", href: "/templates/khoa-hoc" },
                { label: "Giảng viên", href: "#" },
                { label: "Blog", href: "#" },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center px-4 py-3 rounded-xl text-slate-700 hover:bg-slate-100 font-medium text-sm transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              {!isLoggedIn && (
                <div className="pt-2 border-t border-slate-100 mt-2 space-y-2">
                  <Link
                    href="/templates/khoa-hoc/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-2 py-3 text-sm font-semibold text-blue-600 border border-blue-200 rounded-xl hover:bg-blue-50 transition-colors"
                  >
                    📊 Xem Demo Dashboard
                  </Link>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => openAuth("login")}
                      className="py-3 text-sm font-semibold text-slate-700 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      Đăng nhập
                    </button>
                    <button
                      onClick={() => openAuth("register")}
                      className="py-3 text-sm font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors"
                    >
                      Đăng ký
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Auth Modal */}
      {authModal.open && (
        <AuthModal
          defaultMode={authModal.mode}
          onClose={() => setAuthModal({ open: false, mode: "login" })}
        />
      )}
    </>
  );
}
