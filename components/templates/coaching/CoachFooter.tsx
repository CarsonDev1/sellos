import Link from "next/link";

export default function CoachFooter() {
  return (
    <footer className="bg-slate-950 text-slate-400">
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">K</span>
              </div>
              <span className="font-heading font-bold text-white text-base">KHOA<span className="text-amber-500">coach</span></span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              Business Coach chuyên giúp doanh nhân Việt đột phá doanh thu và xây dựng hệ thống bền vững.
            </p>
            <div className="space-y-1 text-sm">
              <p>📍 Quận 1, TP.HCM (và online toàn quốc)</p>
              <p>📞 0901 234 567</p>
              <p>✉️ khoa@khoacoach.vn</p>
            </div>
          </div>

          {/* Links */}
          <div>
            <p className="font-semibold text-white text-sm mb-4">Dịch vụ</p>
            <ul className="space-y-2.5 text-sm">
              {["Tư Vấn 1-1", "Coaching Nhóm", "VIP Intensive", "Discovery Call Miễn Phí", "Workshop & Seminar"].map((s) => (
                <li key={s}><a href="#" className="hover:text-amber-400 transition-colors">{s}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-semibold text-white text-sm mb-4">Tài nguyên</p>
            <ul className="space-y-2.5 text-sm">
              {["Blog & Case Study", "Podcast", "YouTube", "Newsletter miễn phí", "FAQ"].map((r) => (
                <li key={r}><a href="#" className="hover:text-amber-400 transition-colors">{r}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">
            © 2025 KHOAcoach. Được xây dựng bởi{" "}
            <Link href="/" className="text-amber-500 hover:underline font-semibold">SellOS</Link>
          </p>
          <div className="flex gap-4 text-xs">
            <a href="#" className="hover:text-amber-400 transition-colors">Chính sách bảo mật</a>
            <a href="#" className="hover:text-amber-400 transition-colors">Điều khoản sử dụng</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
