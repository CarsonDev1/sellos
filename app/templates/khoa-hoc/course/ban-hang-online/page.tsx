import type { Metadata } from "next";
import Link from "next/link";
import PlatformNavbar from "@/components/templates/khoa-hoc/shared/PlatformNavbar";
import PlatformFooter from "@/components/templates/khoa-hoc/shared/PlatformFooter";
import Curriculum from "@/components/templates/khoa-hoc/Curriculum";
import Instructor from "@/components/templates/khoa-hoc/Instructor";

export const metadata: Metadata = {
  title: "Bán Hàng Online Từ 0 Đến Đơn Đầu Tiên | SellOS Academy",
  description: "Khóa học thực chiến 7 ngày — xây hệ thống bán hàng tự động hoàn chỉnh. 1,200+ học viên, 4.9★",
};

const WHAT_YOU_LEARN = [
  "Tìm sản phẩm có nhu cầu bằng dữ liệu thực",
  "Xây landing page chuyên nghiệp bằng AI trong vài giờ",
  "Thiết lập chatbot tư vấn tự động 24/7",
  "Tạo chuỗi email marketing nuôi dưỡng khách hàng",
  "Kết nối cổng thanh toán & quản lý đơn hàng",
  "Chạy quảng cáo Facebook/TikTok hiệu quả",
  "Đọc số liệu & tối ưu tỷ lệ chuyển đổi",
  "Nhân rộng mô hình sang sản phẩm mới",
];

const INCLUDES = [
  { icon: "🎬", text: "12.5 giờ video chất lượng cao" },
  { icon: "📄", text: "16 bài học + tài liệu downloadable" },
  { icon: "♾️", text: "Truy cập trọn đời trên mọi thiết bị" },
  { icon: "🏆", text: "Chứng chỉ hoàn thành khóa học" },
  { icon: "👥", text: "Cộng đồng học viên riêng" },
  { icon: "🛡️", text: "Hoàn tiền 100% trong 7 ngày" },
];

const REVIEWS = [
  { name: "Minh Tuấn", photo: "https://randomuser.me/api/portraits/men/52.jpg", stars: 5, date: "15/03/2025", title: "Khóa học tốt nhất tôi từng học!", text: "Ra đơn đầu tiên sau 5 ngày học. Không ngờ đơn giản vậy! Khóa học rất thực tế, mỗi bài đều có bài tập làm ngay. Mentor support cực kỳ nhiệt tình, phản hồi rất nhanh." },
  { name: "Linh Phương", photo: "https://randomuser.me/api/portraits/women/55.jpg", stars: 5, date: "22/02/2025", title: "Dành cho người không biết code", text: "Là mẹ bỉm sữa không biết gì về công nghệ mà còn làm được, thì ai cũng làm được. Giờ mỗi tháng bán 50-70 đơn mà không cần ngồi máy tính cả ngày." },
  { name: "Đức Anh", photo: "https://randomuser.me/api/portraits/men/76.jpg", stars: 5, date: "10/01/2025", title: "ROI tốt nhất trong các khóa học đã học", text: "Payback period chỉ 4 ngày. Email automation giúp tôi convert thêm 30% học viên mà gần như không tốn công sức. Rất đáng đồng tiền bỏ ra." },
];

function StarRow({ count }: { count: number }) {
  return (
    <div className="flex">
      {[1,2,3,4,5].map(s => (
        <svg key={s} className={`w-4 h-4 ${s <= count ? "text-amber-400" : "text-slate-200"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      ))}
    </div>
  );
}

export default function CourseDetailPage() {
  return (
    <main className="min-h-screen bg-white">
      <PlatformNavbar />

      {/* Course hero banner */}
      <div className="pt-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="container mx-auto max-w-7xl px-4 py-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6">
            <Link href="/templates/khoa-hoc" className="hover:text-white transition-colors">Trang chủ</Link>
            <span className="text-slate-600">›</span>
            <span className="hover:text-white transition-colors cursor-pointer">Bán hàng</span>
            <span className="text-slate-600">›</span>
            <span className="text-slate-300">Bán Hàng Online</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
            {/* Left: Info */}
            <div className="lg:col-span-2 space-y-5">
              {/* Tags */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-amber-400 text-amber-900 text-xs font-bold px-3 py-1 rounded-full">Bestseller</span>
                <span className="bg-blue-500/30 text-blue-200 text-xs font-medium px-3 py-1 rounded-full border border-blue-500/40">Bán hàng online</span>
                <span className="bg-white/10 text-slate-300 text-xs px-3 py-1 rounded-full">Tất cả trình độ</span>
              </div>

              <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                Bán Hàng Online Từ 0 Đến Đơn Đầu Tiên Trong 7 Ngày
              </h1>

              <p className="text-slate-300 text-base leading-relaxed max-w-2xl">
                Xây hệ thống bán hàng tự động hoàn chỉnh — landing page, chatbot, email automation. Không cần code, không cần vốn lớn. AI làm cho bạn.
              </p>

              {/* Rating row */}
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <div className="flex items-center gap-1.5">
                  <span className="text-amber-400 font-bold text-base">4.9</span>
                  <StarRow count={5} />
                  <span className="text-slate-400 text-sm">(1,247 đánh giá)</span>
                </div>
                <span className="text-slate-600">·</span>
                <span className="text-slate-300">3,400+ học viên</span>
                <span className="text-slate-600">·</span>
                <span className="text-slate-300">16 bài · 12.5 giờ</span>
              </div>

              {/* Instructor + meta */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                <span>
                  Giảng viên:{" "}
                  <a href="#giang-vien" className="text-blue-400 hover:underline font-medium">
                    Nguyễn Thành Nam
                  </a>
                </span>
                <span>🕐 Cập nhật 04/2025</span>
                <span>🌐 Tiếng Việt</span>
                <span>📱 Học mọi thiết bị</span>
              </div>
            </div>

            {/* Right: placeholder for sticky card on desktop */}
            <div className="hidden lg:block" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto max-w-7xl px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* Left: Full content */}
          <div className="lg:col-span-2 space-y-10">

            {/* What you'll learn */}
            <section className="border border-slate-200 rounded-2xl overflow-hidden">
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                <h2 className="font-heading text-lg font-bold text-slate-900">Bạn Sẽ Học Được Gì?</h2>
              </div>
              <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {WHAT_YOU_LEARN.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-green-100 text-green-600 text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">✓</span>
                    <span className="text-slate-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Requirements */}
            <section>
              <h2 className="font-heading text-xl font-bold text-slate-900 mb-4">Yêu Cầu</h2>
              <ul className="space-y-2.5">
                {[
                  "Có máy tính hoặc điện thoại kết nối internet",
                  "Không cần kiến thức lập trình hay kỹ thuật",
                  "Có ý tưởng sản phẩm/dịch vụ muốn bán (hoặc học cách tìm)",
                  "Cam kết dành 2–3 tiếng/ngày trong 7 ngày",
                ].map((req, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-600 text-sm">
                    <span className="text-slate-400 mt-1 flex-shrink-0">•</span>
                    {req}
                  </li>
                ))}
              </ul>
            </section>

            {/* Curriculum */}
            <section>
              <h2 className="font-heading text-xl font-bold text-slate-900 mb-1">Nội Dung Khóa Học</h2>
              <p className="text-slate-400 text-sm mb-6">4 modules · 16 bài học · 12.5 giờ video thực chiến</p>
              <Curriculum />
            </section>

            {/* Instructor */}
            <section id="giang-vien">
              <h2 className="font-heading text-xl font-bold text-slate-900 mb-6">Về Giảng Viên</h2>
              <Instructor />
            </section>

            {/* Reviews */}
            <section>
              <h2 className="font-heading text-xl font-bold text-slate-900 mb-6">Đánh Giá Học Viên</h2>

              {/* Summary */}
              <div className="flex flex-col sm:flex-row items-center gap-8 p-6 bg-amber-50 border border-amber-200 rounded-2xl mb-6">
                <div className="text-center">
                  <p className="font-heading font-bold text-6xl text-amber-500">4.9</p>
                  <StarRow count={5} />
                  <p className="text-slate-500 text-sm mt-1">Đánh giá khóa học</p>
                </div>
                <div className="flex-1 w-full space-y-2">
                  {[{ stars: 5, pct: 89, count: 1109 }, { stars: 4, pct: 8, count: 100 }, { stars: 3, pct: 2, count: 25 }, { stars: 2, pct: 1, count: 12 }, { stars: 1, pct: 0, count: 1 }].map((row) => (
                    <div key={row.stars} className="flex items-center gap-3">
                      <div className="h-2.5 flex-1 bg-white rounded-full overflow-hidden border border-amber-200">
                        <div className="h-full bg-amber-400 rounded-full transition-all" style={{ width: `${row.pct}%` }} />
                      </div>
                      <div className="flex items-center gap-1 w-20 justify-end">
                        <StarRow count={row.stars} />
                      </div>
                      <span className="text-slate-500 text-xs w-12 text-right">{row.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Review cards */}
              <div className="space-y-5">
                {REVIEWS.map((r, i) => (
                  <div key={i} className="border border-slate-200 rounded-2xl p-5 hover:border-blue-200 transition-colors">
                    <div className="flex items-start gap-4">
                      <img src={r.photo} alt={r.name} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <div>
                            <p className="font-semibold text-slate-900 text-sm">{r.name}</p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <StarRow count={r.stars} />
                              <span className="text-slate-400 text-xs">{r.date}</span>
                            </div>
                          </div>
                        </div>
                        <p className="font-semibold text-slate-900 text-sm mt-2">{r.title}</p>
                        <p className="text-slate-600 text-sm leading-relaxed mt-1">{r.text}</p>
                        <div className="flex items-center gap-3 mt-3 text-xs text-slate-400">
                          <span>Hữu ích không?</span>
                          <button className="hover:text-slate-700 transition-colors flex items-center gap-1">👍 Có <span className="text-slate-300">·</span> 12</button>
                          <button className="hover:text-slate-700 transition-colors">👎 Không</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="mt-5 w-full py-3 border border-slate-200 rounded-xl text-sm text-slate-600 hover:bg-slate-50 hover:border-slate-300 font-medium transition-colors">
                Xem tất cả 1,247 đánh giá →
              </button>
            </section>

            {/* Also bought */}
            <section className="pt-4 border-t border-slate-100">
              <h2 className="font-heading text-xl font-bold text-slate-900 mb-4">Học Viên Cũng Mua</h2>
              <div className="space-y-3">
                {[
                  { image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=200&q=80", title: "Facebook & TikTok Ads Từ A Đến Z", instructor: "Trần Hải Đăng", price: "990.000", rating: 4.8 },
                  { image: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?auto=format&fit=crop&w=200&q=80", title: "Email Marketing Tự Động", instructor: "Lê Thu Hương", price: "790.000", rating: 4.7 },
                ].map((c, i) => (
                  <Link key={i} href="/templates/khoa-hoc/course/ban-hang-online" className="flex items-center gap-4 p-3 rounded-xl border border-slate-200 hover:border-blue-200 hover:shadow-sm transition-all group">
                    <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-slate-200">
                      <img src={c.image} alt={c.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-heading font-semibold text-slate-900 text-sm truncate group-hover:text-blue-600 transition-colors">{c.title}</p>
                      <p className="text-slate-400 text-xs mt-0.5">{c.instructor}</p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-amber-500 font-bold text-xs">{c.rating}</span>
                        <StarRow count={Math.round(c.rating)} />
                      </div>
                    </div>
                    <span className="font-heading font-bold text-slate-900 text-sm flex-shrink-0">{c.price}₫</span>
                  </Link>
                ))}
              </div>
            </section>
          </div>

          {/* Right: Sticky sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-xl shadow-slate-200/60 bg-white">
                {/* Thumbnail */}
                <div className="h-48 relative overflow-hidden group cursor-pointer bg-slate-200">
                  <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80" alt="Bán Hàng Online" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/30" />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-lg">
                      <span className="text-blue-600 text-2xl ml-1">▶</span>
                    </div>
                  </div>
                  <span className="absolute top-3 right-3 bg-white/90 text-slate-800 text-xs font-bold px-2.5 py-1 rounded-full">Preview miễn phí</span>
                </div>

                <div className="p-5 space-y-4">
                  {/* Price */}
                  <div className="flex items-end gap-2">
                    <span className="font-heading font-bold text-3xl text-slate-900">1.490.000₫</span>
                    <span className="text-slate-300 line-through text-base mb-0.5">2.490.000₫</span>
                    <span className="text-green-600 font-bold text-sm mb-0.5 bg-green-50 px-2 py-0.5 rounded-full">-40%</span>
                  </div>

                  {/* Urgency */}
                  <div className="bg-orange-50 border border-orange-200 rounded-xl px-4 py-2.5 flex items-center gap-2">
                    <span className="text-orange-500">⏰</span>
                    <p className="text-orange-700 text-xs font-medium">
                      Ưu đãi kết thúc sau <strong>2 ngày 14 giờ 22 phút</strong>
                    </p>
                  </div>

                  {/* CTAs */}
                  <div className="space-y-2.5">
                    <Link
                      href="/templates/khoa-hoc/learn/ban-hang-online"
                      className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl text-sm transition-colors shadow-md shadow-blue-200"
                    >
                      🎓 Đăng Ký Ngay
                    </Link>
                    <button className="w-full border border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700 font-semibold py-3 rounded-xl text-sm transition-colors">
                      Thêm Vào Giỏ
                    </button>
                  </div>

                  <p className="text-slate-400 text-xs text-center">🛡️ Hoàn tiền 100% trong 7 ngày — không cần lý do</p>

                  {/* Includes */}
                  <div className="border-t border-slate-100 pt-4 space-y-2.5">
                    <p className="font-heading font-semibold text-slate-900 text-sm">Khóa học bao gồm:</p>
                    {INCLUDES.map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-slate-600 text-xs">
                        <span className="text-base w-5 text-center">{item.icon}</span>
                        <span>{item.text}</span>
                      </div>
                    ))}
                  </div>

                  {/* Share */}
                  <div className="border-t border-slate-100 pt-3 flex justify-center gap-4">
                    {["Chia sẻ", "Tặng bạn bè", "Áp dụng coupon"].map((action) => (
                      <button key={action} className="text-xs text-blue-600 hover:underline font-medium">{action}</button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Trust badges */}
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                {[
                  { icon: "🏆", label: "Bestseller" },
                  { icon: "⭐", label: "4.9/5 sao" },
                  { icon: "👥", label: "3,400+ học viên" },
                ].map((b, i) => (
                  <div key={i} className="bg-slate-50 border border-slate-200 rounded-xl p-2.5">
                    <p className="text-lg">{b.icon}</p>
                    <p className="text-slate-500 text-[11px] mt-0.5 font-medium">{b.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <PlatformFooter />
    </main>
  );
}
