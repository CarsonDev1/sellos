import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-10 px-4 bg-white">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex flex-col items-center md:items-start leading-none">
            <span className="font-heading font-bold text-lg text-slate-900">
              SellOS
            </span>
            <span className="text-xs text-slate-400 mt-0.5">
              Nền Tảng Bán Hàng Tự Động
            </span>
          </div>

          {/* Links */}
          <nav className="flex items-center gap-6 text-sm text-slate-500">
            <Link href="#" className="hover:text-slate-700 transition-colors">
              Chính sách
            </Link>
            <Link href="#" className="hover:text-slate-700 transition-colors">
              Liên hệ
            </Link>
            <Link href="#" className="hover:text-slate-700 transition-colors">
              Facebook
            </Link>
          </nav>

          {/* Copyright */}
          <p className="text-xs text-slate-400">
            © 2026 SellOS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
