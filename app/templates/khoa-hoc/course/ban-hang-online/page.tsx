import type { Metadata } from "next";
import Link from "next/link";
import PlatformNavbar from "@/components/templates/khoa-hoc/shared/PlatformNavbar";
import PlatformFooter from "@/components/templates/khoa-hoc/shared/PlatformFooter";
import Curriculum from "@/components/templates/khoa-hoc/Curriculum";
import Instructor from "@/components/templates/khoa-hoc/Instructor";

export const metadata: Metadata = {
  title: "Bán Hàng Online Từ 0 Đến Đơn Đầu Tiên | SellOS Academy",
  description:
    "Khóa học thực chiến 7 ngày — xây hệ thống bán hàng tự động hoàn chỉnh. 1,200+ học viên, 4.9★",
};

const WHAT_YOU_LEARN = [
  "Tìm sản phẩm có nhu cầu bằng dữ liệu thực",
  "Xây landing page chuyên nghiệp bằng AI",
  "Thiết lập chatbot tư vấn tự động 24/7",
  "Tạo chuỗi email marketing nuôi dưỡng khách",
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
  { icon: "👥", text: "Cộng đồng học viên hỗ trợ lẫn nhau" },
  { icon: "🛡️", text: "Hoàn tiền 100% trong 7 ngày" },
];

export default function CourseDetailPage() {
  return (
    <main className="min-h-screen bg-white">
      <PlatformNavbar />

      {/* Hero bar */}
      <div className="pt-16 bg-slate-900 text-white">
        <div className="container mx-auto max-w-7xl px-4 py-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-4">
            <Link href="/templates/khoa-hoc" className="hover:text-white transition-colors">
              Trang chủ
            </Link>
            <span>›</span>
            <Link href="/templates/khoa-hoc" className="hover:text-white transition-colors">
              Bán hàng
            </Link>
            <span>›</span>
            <span className="text-slate-200">Bán Hàng Online</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Course info */}
            <div className="lg:col-span-2 space-y-4">
              <h1 className="font-heading text-3xl sm:text-4xl font-bold leading-tight">
                Bán Hàng Online Từ 0 Đến Đơn Đầu Tiên Trong 7 Ngày
              </h1>
              <p className="text-slate-300 text-lg leading-relaxed">
                Xây hệ thống bán hàng tự động hoàn chỉnh — landing page, chatbot, email automation — không cần code, không cần vốn lớn.
              </p>

              {/* Rating row */}
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <span className="bg-amber-400 text-amber-900 font-bold px-2.5 py-0.5 rounded text-xs">Bestseller</span>
                <div className="flex items-center gap-1">
                  <span className="text-amber-400 font-bold">4.9</span>
                  <div className="flex text-amber-400 text-xs">{"★★★★★"}</div>
                  <span className="text-slate-400">(1,200 đánh giá)</span>
                </div>
                <span className="text-slate-400">·</span>
                <span className="text-slate-300">3,400+ học viên đã đăng ký</span>
              </div>

              {/* Instructor */}
              <div className="flex items-center gap-2 text-sm">
                <span className="text-slate-400">Giảng viên:</span>
                <Link href="#giang-vien" className="text-blue-400 hover:underline font-medium">
                  Nguyễn Thành Nam
                </Link>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                <span>🕐 Cập nhật tháng 4/2025</span>
                <span>🌐 Tiếng Việt</span>
                <span>📱 Học mọi lúc mọi nơi</span>
              </div>
            </div>

            {/* Right: placeholder space for sticky sidebar (desktop) */}
            <div className="hidden lg:block" />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto max-w-7xl px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left: Full course details */}
          <div className="lg:col-span-2 space-y-10">
            {/* What you learn */}
            <section>
              <h2 className="font-heading text-xl font-bold text-slate-900 mb-4">
                Bạn Sẽ Học Được Gì?
              </h2>
              <div className="border border-slate-200 rounded-xl p-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {WHAT_YOU_LEARN.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-green-500 font-bold text-sm mt-0.5 flex-shrink-0">✓</span>
                    <span className="text-slate-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Requirements */}
            <section>
              <h2 className="font-heading text-xl font-bold text-slate-900 mb-4">Yêu Cầu</h2>
              <ul className="space-y-2">
                {[
                  "Có máy tính hoặc điện thoại kết nối internet",
                  "Không cần kiến thức lập trình hay kỹ thuật",
                  "Có ý tưởng sản phẩm/dịch vụ muốn bán (hoặc học cách tìm)",
                  "Cam kết dành 2-3 tiếng/ngày trong 7 ngày",
                ].map((req, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-600 text-sm">
                    <span className="text-slate-400 mt-0.5">•</span>
                    {req}
                  </li>
                ))}
              </ul>
            </section>

            {/* Curriculum */}
            <section>
              <h2 className="font-heading text-xl font-bold text-slate-900 mb-1">
                Nội Dung Khóa Học
              </h2>
              <p className="text-slate-400 text-sm mb-6">4 modules · 16 bài học · 12.5 giờ video</p>
              <Curriculum />
            </section>

            {/* Instructor */}
            <section id="giang-vien">
              <h2 className="font-heading text-xl font-bold text-slate-900 mb-6">Giảng Viên</h2>
              <Instructor />
            </section>

            {/* Reviews summary */}
            <section>
              <h2 className="font-heading text-xl font-bold text-slate-900 mb-6">Đánh Giá Học Viên</h2>
              <div className="flex items-center gap-8 p-6 bg-slate-50 rounded-2xl border border-slate-200 mb-6">
                <div className="text-center">
                  <p className="font-heading font-bold text-6xl text-blue-600">4.9</p>
                  <div className="flex justify-center text-amber-400 text-lg mt-1">{"★★★★★"}</div>
                  <p className="text-slate-400 text-sm mt-1">Đánh giá khóa học</p>
                </div>
                <div className="flex-1 space-y-2">
                  {[
                    { stars: 5, pct: 89 },
                    { stars: 4, pct: 8 },
                    { stars: 3, pct: 2 },
                    { stars: 2, pct: 1 },
                    { stars: 1, pct: 0 },
                  ].map((row) => (
                    <div key={row.stars} className="flex items-center gap-3">
                      <div className="h-2 flex-1 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-400 rounded-full"
                          style={{ width: `${row.pct}%` }}
                        />
                      </div>
                      <div className="flex text-amber-400 text-xs w-16 justify-end">
                        {"★".repeat(row.stars)}
                      </div>
                      <span className="text-slate-400 text-xs w-8 text-right">{row.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sample reviews */}
              <div className="space-y-5">
                {[
                  {
                    name: "Minh Tuấn",
                    avatar: "MT",
                    color: "from-amber-400 to-orange-500",
                    stars: 5,
                    date: "15 tháng 3, 2025",
                    text: "Ra đơn đầu tiên sau 5 ngày học. Không ngờ đơn giản vậy! Khóa học rất thực tế, mỗi bài đều có bài tập làm ngay.",
                  },
                  {
                    name: "Linh Phương",
                    avatar: "LP",
                    color: "from-rose-400 to-pink-500",
                    stars: 5,
                    date: "22 tháng 2, 2025",
                    text: "Là mẹ bỉm sữa không biết gì về công nghệ mà còn làm được, thì ai cũng làm được. Mentor support cực kỳ nhiệt tình.",
                  },
                ].map((review, i) => (
                  <div key={i} className="border-b border-slate-100 pb-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${review.color} flex items-center justify-center text-white font-bold text-sm`}>
                        {review.avatar}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 text-sm">{review.name}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-amber-400 text-xs">{"★".repeat(review.stars)}</span>
                          <span className="text-slate-400 text-xs">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">{review.text}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right: Sticky sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-xl shadow-slate-200/50">
                {/* Course thumbnail */}
                <div className="h-44 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center relative">
                  <div className="text-center text-white space-y-1">
                    <div className="text-4xl">📚</div>
                    <p className="font-heading font-bold text-sm px-4">Bán Hàng Online</p>
                    <p className="text-blue-100 text-xs">Từ 0 → Đơn Đầu Tiên</p>
                  </div>
                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                    <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
                      <span className="text-blue-600 text-2xl ml-1">▶</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 space-y-4">
                  {/* Price */}
                  <div className="flex items-end gap-2">
                    <span className="font-heading font-bold text-3xl text-slate-900">1.490.000₫</span>
                    <span className="text-slate-300 line-through text-sm mb-1">2.490.000₫</span>
                    <span className="text-green-600 font-bold text-sm mb-1">-40%</span>
                  </div>

                  {/* Urgency */}
                  <div className="bg-orange-50 border border-orange-200 rounded-lg px-3 py-2 flex items-center gap-2">
                    <span className="text-orange-500 text-sm">⏰</span>
                    <span className="text-orange-700 text-xs font-medium">
                      Ưu đãi kết thúc sau <strong>2 ngày 14 giờ</strong>
                    </span>
                  </div>

                  {/* CTA buttons */}
                  <div className="space-y-2.5">
                    <Link
                      href="/templates/khoa-hoc/learn/ban-hang-online"
                      className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm py-3 rounded-xl text-center transition-colors"
                    >
                      🎓 Đăng Ký Ngay
                    </Link>
                    <button className="block w-full border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-sm py-3 rounded-xl text-center transition-colors w-full">
                      Thêm Vào Giỏ
                    </button>
                  </div>

                  <p className="text-slate-400 text-xs text-center">
                    🛡️ Cam kết hoàn tiền 100% trong 7 ngày
                  </p>

                  {/* Course includes */}
                  <div>
                    <p className="font-heading font-semibold text-slate-900 text-sm mb-3">
                      Khóa học bao gồm:
                    </p>
                    <ul className="space-y-2">
                      {INCLUDES.map((item, i) => (
                        <li key={i} className="flex items-center gap-2.5 text-slate-600 text-xs">
                          <span>{item.icon}</span>
                          {item.text}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Share */}
                  <div className="flex gap-3 pt-2 justify-center border-t border-slate-100">
                    <button className="text-xs text-blue-600 hover:underline font-medium">Chia sẻ</button>
                    <span className="text-slate-200">·</span>
                    <button className="text-xs text-blue-600 hover:underline font-medium">Tặng cho bạn bè</button>
                    <span className="text-slate-200">·</span>
                    <button className="text-xs text-blue-600 hover:underline font-medium">Coupon</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PlatformFooter />
    </main>
  );
}
