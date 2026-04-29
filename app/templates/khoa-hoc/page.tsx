import type { Metadata } from "next";
import PlatformNavbar from "@/components/templates/khoa-hoc/shared/PlatformNavbar";
import PlatformFooter from "@/components/templates/khoa-hoc/shared/PlatformFooter";
import PlatformHero from "@/components/templates/khoa-hoc/home/PlatformHero";
import CourseCatalog from "@/components/templates/khoa-hoc/home/CourseCatalog";

export const metadata: Metadata = {
  title: "SellOS Academy — Học Kỹ Năng Bán Hàng Online",
  description:
    "Nền tảng học kỹ năng bán hàng online hàng đầu Việt Nam. 1,200+ học viên, 15+ khóa học thực chiến từ chuyên gia.",
};

const TESTIMONIALS = [
  {
    name: "Minh Tuấn",
    role: "Bán khóa học fitness",
    avatar: "MT",
    gradient: "from-amber-400 to-orange-500",
    quote: "Ra đơn đầu tiên sau 5 ngày học. Không ngờ đơn giản vậy!",
    result: "3 đơn trong tuần đầu",
  },
  {
    name: "Linh Phương",
    role: "Kinh doanh handmade",
    avatar: "LP",
    gradient: "from-rose-400 to-pink-500",
    quote: "Là mẹ bỉm sữa không biết gì về công nghệ mà vẫn làm được. Hệ thống chạy tự động 24/7.",
    result: "50-70 đơn/tháng",
  },
  {
    name: "Đức Anh",
    role: "Bán khóa học tiếng Anh",
    avatar: "DA",
    gradient: "from-violet-400 to-purple-500",
    quote: "Payback period chỉ 4 ngày. ROI tốt nhất tôi từng đầu tư cho business của mình.",
    result: "ROI 800% sau 30 ngày",
  },
];

export default function PlatformHomePage() {
  return (
    <main className="min-h-screen bg-white">
      <PlatformNavbar />
      <PlatformHero />
      <CourseCatalog />

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mx-8" />

      {/* Testimonials */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-4 py-1.5 text-sm text-amber-700 font-medium mb-4">
              ⭐ Kết quả học viên thực tế
            </div>
            <h2 className="font-heading text-3xl font-bold text-slate-900 mb-2">
              Họ Đã Làm Được — Bạn Cũng Sẽ Làm Được
            </h2>
            <p className="text-slate-500 text-base max-w-lg mx-auto">
              Kết quả thực tế từ học viên bình thường — không có background kỹ thuật, không có vốn lớn.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-blue-200 transition-all"
              >
                <div className="flex mb-3">
                  {[1,2,3,4,5].map(s => (
                    <svg key={s} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed mb-4 flex-1">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white font-bold text-xs`}>
                      {t.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">{t.name}</p>
                      <p className="text-slate-400 text-xs">{t.role}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold bg-green-50 text-green-700 border border-green-200 px-2.5 py-1 rounded-full">
                    🎯 {t.result}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Overall stats */}
          <div className="mt-10 bg-blue-600 rounded-2xl p-8 text-white grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "1,200+", label: "Học viên đã hoàn thành" },
              { value: "4.9/5", label: "Đánh giá trung bình" },
              { value: "500+", label: "Hệ thống đang chạy live" },
              { value: "97%", label: "Học viên hài lòng" },
            ].map((s, i) => (
              <div key={i}>
                <p className="font-heading font-bold text-3xl">{s.value}</p>
                <p className="text-blue-200 text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-slate-900 mb-2">
              Tại Sao Chọn SellOS Academy?
            </h2>
            <p className="text-slate-500 text-base max-w-lg mx-auto">
              Không chỉ là video giảng dạy — chúng tôi cung cấp hệ sinh thái học tập hoàn chỉnh.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "🎯", title: "Học Thực Chiến 100%", desc: "Mỗi bài học có bài tập thực hành ngay. Bạn làm, không chỉ xem.", color: "bg-blue-50" },
              { icon: "⚡", title: "Kết Quả Trong 7 Ngày", desc: "Cam kết có kết quả thấy được trong 7 ngày hoặc hoàn tiền 100%.", color: "bg-amber-50" },
              { icon: "🤖", title: "AI Hỗ Trợ 24/7", desc: "AI assistant giúp bạn trong từng bước — tùy chỉnh theo sản phẩm của bạn.", color: "bg-violet-50" },
              { icon: "♾️", title: "Truy Cập Trọn Đời", desc: "Mua một lần, học mãi mãi. Nội dung cập nhật miễn phí suốt đời.", color: "bg-green-50" },
              { icon: "👥", title: "Cộng Đồng Học Viên", desc: "Tham gia group riêng với 1,000+ học viên — hỏi đáp, chia sẻ kinh nghiệm.", color: "bg-rose-50" },
              { icon: "🏆", title: "Chứng Chỉ Hoàn Thành", desc: "Nhận chứng chỉ được công nhận sau khi hoàn thành khóa học.", color: "bg-teal-50" },
            ].map((item, i) => (
              <div key={i} className={`${item.color} rounded-2xl p-6 border border-white hover:shadow-md transition-all`}>
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-heading font-semibold text-slate-900 text-base mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-12 px-4 bg-slate-50 border-y border-slate-200">
        <div className="container mx-auto max-w-7xl">
          <p className="text-slate-400 text-xs font-semibold tracking-widest text-center mb-8 uppercase">
            Giảng viên đến từ các tổ chức hàng đầu
          </p>
          <div className="flex flex-wrap justify-center items-center gap-10">
            {["Shopee", "Lazada", "Meta", "Google", "Tiki", "VNG", "Sendo"].map((brand) => (
              <span key={brand} className="font-heading font-bold text-slate-300 text-xl hover:text-slate-400 transition-colors">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-600 to-indigo-700 text-white text-center">
        <div className="container mx-auto max-w-3xl space-y-6">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold">
            Bắt Đầu Học Miễn Phí Ngay Hôm Nay
          </h2>
          <p className="text-blue-100 text-lg">
            Tham gia cùng 1,200+ học viên đang xây dựng hệ thống bán hàng tự động.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/templates/khoa-hoc/course/ban-hang-online"
              className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-3.5 rounded-xl text-sm transition-colors shadow-lg"
            >
              🎓 Xem Khóa Học Nổi Bật
            </a>
            <a
              href="/templates/khoa-hoc/dashboard"
              className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-8 py-3.5 rounded-xl text-sm transition-colors"
            >
              📊 Xem Demo Dashboard
            </a>
          </div>
          <p className="text-blue-200 text-xs">
            🛡️ Hoàn tiền 100% trong 7 ngày · ♾️ Truy cập trọn đời · 🎓 Chứng chỉ hoàn thành
          </p>
        </div>
      </section>

      <PlatformFooter />
    </main>
  );
}
