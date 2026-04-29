import Link from "next/link";

const LINKS = {
  "Sản phẩm": ["Rau xanh", "Củ & Quả", "Trái cây", "Hạt & Ngũ cốc", "Thảo mộc"],
  "Công ty": ["Về chúng tôi", "Nông trại đối tác", "Chứng nhận hữu cơ", "Blog & Công thức", "Tuyển dụng"],
  "Hỗ trợ": ["Hướng dẫn đặt hàng", "Chính sách đổi trả", "Giao hàng", "FAQs", "Liên hệ"],
};

export default function Footer() {
  return (
    <footer id="lien-he" className="bg-slate-900 text-slate-400">
      <div className="container mx-auto max-w-7xl px-4 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 3.636a1 1 0 010 1.414 7 7 0 000 9.9 1 1 0 11-1.414 1.414 9 9 0 010-12.728 1 1 0 011.414 0zm9.9 0a1 1 0 011.414 0 9 9 0 010 12.728 1 1 0 11-1.414-1.414 7 7 0 000-9.9 1 1 0 010-1.414zM7.879 6.464a1 1 0 010 1.414 3 3 0 000 4.243 1 1 0 11-1.415 1.414 5 5 0 010-7.07 1 1 0 011.415 0zm4.242 0a1 1 0 011.415 0 5 5 0 010 7.072 1 1 0 01-1.415-1.415 3 3 0 000-4.242 1 1 0 010-1.415zM10 9a1 1 0 011 1v.01a1 1 0 11-2 0V10a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="font-heading font-bold text-white text-lg">Organi<span className="text-green-500">ca</span></span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              Thực phẩm hữu cơ sạch — từ nông trại đến bàn ăn của bạn. Chứng nhận quốc tế, giao hàng trong ngày.
            </p>
            <div className="space-y-1.5 text-sm">
              <p>📍 123 Nguyễn Thị Minh Khai, Quận 3, TP.HCM</p>
              <p>📞 1800 1234 (miễn phí · 7:00–22:00)</p>
              <p>✉️ hello@organica.vn</p>
            </div>
            {/* Social */}
            <div className="flex gap-3 pt-1">
              {["Facebook", "Instagram", "TikTok", "YouTube"].map((s) => (
                <a key={s} href="#" className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-green-600 flex items-center justify-center transition-colors text-xs font-bold text-slate-400 hover:text-white">
                  {s[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(LINKS).map(([title, items]) => (
            <div key={title}>
              <p className="font-semibold text-white text-sm mb-4">{title}</p>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm hover:text-green-400 transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap gap-3">
            {["USDA Organic", "EU Organic", "VietGAP", "GlobalG.A.P"].map((cert) => (
              <span key={cert} className="text-xs font-semibold bg-slate-800 text-green-400 border border-slate-700 px-3 py-1.5 rounded-full">
                ✓ {cert}
              </span>
            ))}
          </div>
          <p className="text-xs text-slate-500">
            © 2025 Organica Vietnam. Được xây dựng bởi{" "}
            <Link href="/" className="text-green-500 hover:underline font-semibold">SellOS</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
