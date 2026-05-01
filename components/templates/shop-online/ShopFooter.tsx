import Link from "next/link";

export default function ShopFooter() {
  return (
    <footer className="bg-slate-950 text-slate-400">
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="font-heading font-bold text-white text-base">NO<span className="text-rose-500">VA</span></span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              Thời trang nữ cao cấp — chất liệu tốt, thiết kế đẹp, giá hợp lý. Hàng mới về mỗi tuần.
            </p>
            <div className="space-y-1 text-sm">
              <p>📍 Quận 3, TP.HCM (và giao toàn quốc)</p>
              <p>📞 0901 234 567</p>
              <p>✉️ hello@novastore.vn</p>
            </div>
          </div>

          {/* Danh mục */}
          <div>
            <p className="font-semibold text-white text-sm mb-4">Danh mục</p>
            <ul className="space-y-2.5 text-sm">
              {["Áo nữ", "Quần & Váy", "Phụ kiện", "Giày dép", "Sale cuối mùa", "Hàng mới về"].map((s) => (
                <li key={s}><a href="#danh-muc" className="hover:text-rose-400 transition-colors">{s}</a></li>
              ))}
            </ul>
          </div>

          {/* Hỗ trợ */}
          <div>
            <p className="font-semibold text-white text-sm mb-4">Hỗ trợ</p>
            <ul className="space-y-2.5 text-sm">
              {["Hướng dẫn chọn size", "Chính sách đổi trả", "Tra cứu đơn hàng", "FAQ", "Liên hệ & Hợp tác"].map((r) => (
                <li key={r}><a href="#" className="hover:text-rose-400 transition-colors">{r}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">
            © 2025 NOVA Store. Được xây dựng bởi{" "}
            <Link href="/" className="text-rose-500 hover:underline font-semibold">SellOS</Link>
          </p>
          <div className="flex gap-4 text-xs">
            <a href="#" className="hover:text-rose-400 transition-colors">Chính sách bảo mật</a>
            <a href="#" className="hover:text-rose-400 transition-colors">Điều khoản sử dụng</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
