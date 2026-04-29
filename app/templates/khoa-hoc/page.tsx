import type { Metadata } from "next";
import CourseNavbar from "@/components/templates/khoa-hoc/CourseNavbar";
import CourseHero from "@/components/templates/khoa-hoc/CourseHero";
import CourseBenefits from "@/components/templates/khoa-hoc/CourseBenefits";
import WhatYouLearn from "@/components/templates/khoa-hoc/WhatYouLearn";
import Curriculum from "@/components/templates/khoa-hoc/Curriculum";
import Instructor from "@/components/templates/khoa-hoc/Instructor";
import StudentResults from "@/components/templates/khoa-hoc/StudentResults";
import CoursePricing from "@/components/templates/khoa-hoc/CoursePricing";
import CourseFAQ from "@/components/templates/khoa-hoc/CourseFAQ";
import CourseFinalCTA from "@/components/templates/khoa-hoc/CourseFinalCTA";

export const metadata: Metadata = {
  title: "Bán Hàng Online Từ 0 Đến Đơn Đầu Tiên Trong 7 Ngày | SellOS",
  description:
    "Khóa học thực chiến giúp bạn xây hệ thống bán hàng tự động trong 7 ngày — không cần kỹ thuật, không cần vốn lớn. 1,200+ học viên đã thành công.",
};

export default function KhoaHocPage() {
  return (
    <main className="bg-white min-h-screen">
      <CourseNavbar />
      <CourseHero />
      <CourseBenefits />
      <WhatYouLearn />
      <Curriculum />
      <Instructor />
      <StudentResults />
      <CoursePricing />
      <CourseFAQ />
      <CourseFinalCTA />

      {/* Footer */}
      <footer className="bg-slate-900 py-10 px-4 text-center">
        <p className="text-slate-400 text-sm">
          © 2025 SellOS · Powered by{" "}
          <a href="/" className="text-blue-400 hover:underline font-medium">
            SellOS AI
          </a>{" "}
          · Template này được tạo tự động bởi AI
        </p>
        <p className="text-slate-600 text-xs mt-2">
          Đây là trang demo — được xây dựng bởi SellOS trong &lt; 7 ngày
        </p>
      </footer>
    </main>
  );
}
