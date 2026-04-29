"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface AuthModalProps {
  defaultMode?: "login" | "register";
  onClose: () => void;
}

export default function AuthModal({ defaultMode = "login", onClose }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "register">(defaultMode);
  const [showPassword, setShowPassword] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMode(defaultMode);
  }, [defaultMode]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={(e) => e.target === overlayRef.current && onClose()}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header gradient strip */}
        <div className="h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500" />

        <div className="p-8">
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors text-lg"
          >
            ×
          </button>

          {/* Logo */}
          <div className="flex items-center gap-2 mb-6">
            <span className="text-2xl">📚</span>
            <span className="font-heading font-bold text-slate-900">
              SellOS<span className="text-blue-600">Academy</span>
            </span>
          </div>

          {/* Mode toggle */}
          <div className="flex bg-slate-100 rounded-xl p-1 mb-6">
            <button
              onClick={() => setMode("login")}
              className={cn(
                "flex-1 py-2 text-sm font-semibold rounded-lg transition-all",
                mode === "login"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              )}
            >
              Đăng nhập
            </button>
            <button
              onClick={() => setMode("register")}
              className={cn(
                "flex-1 py-2 text-sm font-semibold rounded-lg transition-all",
                mode === "register"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              )}
            >
              Đăng ký
            </button>
          </div>

          {/* Title */}
          <div className="mb-5">
            <h2 className="font-heading font-bold text-xl text-slate-900">
              {mode === "login" ? "Chào mừng trở lại! 👋" : "Tạo tài khoản miễn phí"}
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              {mode === "login"
                ? "Đăng nhập để tiếp tục học"
                : "Tham gia cùng 1,200+ học viên"}
            </p>
          </div>

          {/* Social buttons */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            <button className="flex items-center justify-center gap-2.5 border border-slate-200 rounded-xl py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all">
              <svg width="18" height="18" viewBox="0 0 48 48" fill="none">
                <path d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 7.9 2.9l5.7-5.7C34.5 6.5 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.3-.4-3.5z" fill="#FFC107"/>
                <path d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.1 7.9 2.9l5.7-5.7C34.5 6.5 29.5 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" fill="#FF3D00"/>
                <path d="M24 44c5.4 0 10.3-2 14-5.4l-6.5-5.5C29.5 35 26.9 36 24 36c-5.3 0-9.8-3.6-11.3-8.5L6 32.1C9.4 39.3 16.1 44 24 44z" fill="#4CAF50"/>
                <path d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4-4 5.3l6.5 5.5C38 36.5 44 31 44 24c0-1.2-.1-2.3-.4-3.5z" fill="#1976D2"/>
              </svg>
              Google
            </button>
            <button className="flex items-center justify-center gap-2.5 border border-slate-200 rounded-xl py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all">
              <svg width="18" height="18" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.88v2.26h3.32l-.53 3.49h-2.79V24C19.62 23.1 24 18.1 24 12.07z"/>
              </svg>
              Facebook
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-slate-400 text-xs font-medium">hoặc tiếp tục với email</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* Form */}
          <form onSubmit={(e) => { e.preventDefault(); onClose(); }} className="space-y-4">
            {mode === "register" && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Họ và tên
                </label>
                <input
                  type="text"
                  placeholder="Nguyễn Văn A"
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Email
              </label>
              <input
                type="email"
                placeholder="email@example.com"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-slate-700">Mật khẩu</label>
                {mode === "login" && (
                  <button type="button" className="text-xs text-blue-600 hover:underline font-medium">
                    Quên mật khẩu?
                  </button>
                )}
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 pr-11 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-sm"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {mode === "register" && (
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" className="mt-0.5 accent-blue-600" />
                <span className="text-xs text-slate-500 leading-relaxed">
                  Tôi đồng ý với{" "}
                  <span className="text-blue-600 hover:underline">Điều khoản sử dụng</span>{" "}
                  và{" "}
                  <span className="text-blue-600 hover:underline">Chính sách bảo mật</span>
                </span>
              </label>
            )}

            {mode === "login" && (
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input type="checkbox" className="accent-blue-600" defaultChecked />
                <span className="text-sm text-slate-600">Ghi nhớ đăng nhập</span>
              </label>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl text-sm transition-colors shadow-md shadow-blue-200 mt-2"
            >
              {mode === "login" ? "Đăng Nhập" : "Tạo Tài Khoản"}
            </button>
          </form>

          {/* Switch mode */}
          <p className="text-center text-sm text-slate-500 mt-4">
            {mode === "login" ? "Chưa có tài khoản?" : "Đã có tài khoản?"}{" "}
            <button
              onClick={() => setMode(mode === "login" ? "register" : "login")}
              className="text-blue-600 font-semibold hover:underline"
            >
              {mode === "login" ? "Đăng ký miễn phí" : "Đăng nhập"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
