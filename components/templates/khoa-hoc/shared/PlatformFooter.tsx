import Link from "next/link";

export default function PlatformFooter() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">📚</span>
              <span className="font-heading font-bold text-white text-base">
                SellOS<span className="text-blue-400">Academy</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              Nền tảng học kỹ năng bán hàng online hàng đầu Việt Nam.
            </p>
          </div>
          <div>
            <p className="font-semibold text-white text-sm mb-3">Khóa học</p>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">Bán hàng online</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Marketing digital</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Xây dựng thương hiệu</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Kỹ năng mềm</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-white text-sm mb-3">Công ty</p>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">Về chúng tôi</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Tuyển dụng</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">SellOS Platform</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-white text-sm mb-3">Hỗ trợ</p>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">Trung tâm hỗ trợ</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Điều khoản sử dụng</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Chính sách bảo mật</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Liên hệ</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <p>© 2025 SellOS Academy · Powered by <Link href="/" className="text-blue-400 hover:underline">SellOS AI</Link></p>
          <p className="text-slate-600 italic">Template này được tạo tự động bởi SellOS AI trong 7 ngày</p>
        </div>
      </div>
    </footer>
  );
}
