import type { Metadata } from "next";
import PlatformNavbar from "@/components/templates/khoa-hoc/shared/PlatformNavbar";
import PlatformFooter from "@/components/templates/khoa-hoc/shared/PlatformFooter";
import PlatformHero from "@/components/templates/khoa-hoc/home/PlatformHero";
import CategoryNav from "@/components/templates/khoa-hoc/home/CategoryNav";
import FeaturedCourses from "@/components/templates/khoa-hoc/home/FeaturedCourses";

export const metadata: Metadata = {
  title: "SellOS Academy — Học Kỹ Năng Bán Hàng Online",
  description:
    "Nền tảng học kỹ năng bán hàng online hàng đầu Việt Nam. 1,200+ học viên, 15+ khóa học thực chiến từ chuyên gia.",
};

export default function PlatformHomePage() {
  return (
    <main className="min-h-screen bg-white">
      <PlatformNavbar />
      <PlatformHero />
      <CategoryNav />
      <FeaturedCourses />

      {/* Instructors banner */}
      <section className="py-12 px-4 bg-slate-50 border-y border-slate-200">
        <div className="container mx-auto max-w-7xl text-center">
          <p className="text-slate-500 text-sm mb-6 font-medium">GIẢNG VIÊN ĐẾN TỪ CÁC TỔ CHỨC HÀNG ĐẦU</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-50">
            {["Shopee", "Lazada", "Meta", "Google", "Tiki", "VNG"].map((brand) => (
              <span key={brand} className="font-heading font-bold text-slate-400 text-lg">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Why SellOS Academy */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              {
                icon: "🎯",
                title: "Học Thực Chiến",
                desc: "Mỗi khóa học có bài tập thực hành — bạn làm, không chỉ xem",
              },
              {
                icon: "⚡",
                title: "Kết Quả Nhanh",
                desc: "Cam kết có kết quả thấy được trong 7 ngày hoặc hoàn tiền",
              },
              {
                icon: "♾️",
                title: "Truy Cập Trọn Đời",
                desc: "Mua một lần, học mãi mãi. Nội dung cập nhật miễn phí",
              },
            ].map((item, i) => (
              <div key={i} className="space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-2xl mx-auto">
                  {item.icon}
                </div>
                <h3 className="font-heading font-semibold text-slate-900 text-base">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PlatformFooter />
    </main>
  );
}
