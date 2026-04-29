import type { Metadata } from "next";
import Link from "next/link";
import PlatformNavbar from "@/components/templates/khoa-hoc/shared/PlatformNavbar";
import PlatformFooter from "@/components/templates/khoa-hoc/shared/PlatformFooter";

export const metadata: Metadata = {
  title: "Giảng Viên — SellOS Academy",
  description: "Học từ các chuyên gia hàng đầu với kinh nghiệm thực chiến.",
};

const INSTRUCTORS = [
  {
    id: "nguyen-thanh-nam",
    name: "Nguyễn Thành Nam",
    title: "Founder SellOS · Chuyên gia Bán hàng Online",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    gradient: "from-blue-500 to-indigo-600",
    bio: "10 năm kinh nghiệm xây dựng hệ thống bán hàng tự động. Từng giúp 500+ học viên có đơn hàng đầu tiên trong vòng 7 ngày. Founder của SellOS — nền tảng AI bán hàng #1 Việt Nam.",
    specialties: ["Bán hàng tự động", "AI & Automation", "Funnel Marketing"],
    courses: 3,
    students: 1200,
    rating: 4.9,
    featured: true,
    orgs: ["SellOS", "VNG", "Shopee"],
  },
  {
    id: "tran-hai-dang",
    name: "Trần Hải Đăng",
    title: "Facebook & TikTok Ads Expert",
    photo: "https://randomuser.me/api/portraits/men/45.jpg",
    gradient: "from-rose-500 to-pink-600",
    bio: "Cựu Creative Strategist tại Meta Vietnam. Đã quản lý ngân sách quảng cáo lên đến $500k/tháng cho các thương hiệu lớn. Tác giả của framework 'Hook-Story-Offer' được 10,000+ người áp dụng.",
    specialties: ["Facebook Ads", "TikTok Ads", "Creative Strategy"],
    courses: 2,
    students: 890,
    rating: 4.8,
    featured: false,
    orgs: ["Meta Vietnam", "Dentsu"],
  },
  {
    id: "le-minh-chau",
    name: "Lê Minh Châu",
    title: "Email Marketing & CRM Specialist",
    photo: "https://randomuser.me/api/portraits/women/28.jpg",
    gradient: "from-emerald-500 to-teal-600",
    bio: "7 năm kinh nghiệm Email Marketing với tỉ lệ mở email trung bình 45% — gấp 3 lần ngành. Đã xây dựng danh sách email 200k+ subscribers cho các thương hiệu B2C Việt Nam.",
    specialties: ["Email Marketing", "CRM", "Marketing Automation"],
    courses: 2,
    students: 620,
    rating: 4.7,
    featured: false,
    orgs: ["Mailchimp Partner", "HubSpot"],
  },
  {
    id: "pham-quang-huy",
    name: "Phạm Quang Huy",
    title: "Shopee & Lazada Top Seller",
    photo: "https://randomuser.me/api/portraits/men/67.jpg",
    gradient: "from-orange-500 to-red-500",
    bio: "Top Seller Shopee 3 năm liên tiếp với doanh thu 15 tỷ+/năm. Đã đào tạo hơn 1,000 người bán hàng TMĐT từ 0 lên thu nhập ổn định. Chuyên gia tối ưu shop và quảng cáo nội sàn.",
    specialties: ["Shopee", "Lazada", "TMĐT", "Quảng cáo nội sàn"],
    courses: 2,
    students: 1050,
    rating: 4.9,
    featured: false,
    orgs: ["Shopee Star", "Lazada LazMall"],
  },
  {
    id: "vu-thi-lan",
    name: "Vũ Thị Lan",
    title: "Content Marketing & SEO Strategist",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    gradient: "from-violet-500 to-purple-600",
    bio: "Content Strategist với portfolio 200+ bài SEO top 1 Google. Founder của blog kinh doanh 500k view/tháng. Chuyên đào tạo Content Marketing thực chiến cho người mới bắt đầu.",
    specialties: ["SEO", "Content Marketing", "Copywriting"],
    courses: 2,
    students: 740,
    rating: 4.8,
    featured: false,
    orgs: ["Google Partner", "SEMrush"],
  },
  {
    id: "hoang-minh-duc",
    name: "Hoàng Minh Đức",
    title: "Serial Entrepreneur · Business Mentor",
    photo: "https://randomuser.me/api/portraits/men/23.jpg",
    gradient: "from-amber-500 to-yellow-500",
    bio: "3 startup thành công với tổng định giá 50 tỷ+. Mentor tại Vietnam Startup Ecosystem và nhiều chương trình ươm tạo. Chuyên tư vấn mô hình kinh doanh online từ ý tưởng đến dòng tiền.",
    specialties: ["Khởi nghiệp", "Business Model", "Fundraising"],
    courses: 1,
    students: 580,
    rating: 4.7,
    featured: false,
    orgs: ["VINAI", "VSV"],
  },
];

const STATS = [
  { value: "6", label: "Giảng viên chuyên gia" },
  { value: "12+", label: "Khóa học thực chiến" },
  { value: "5,000+", label: "Học viên đã học" },
  { value: "4.8★", label: "Đánh giá trung bình" },
];

export default function InstructorsPage() {
  const featured = INSTRUCTORS.find((i) => i.featured)!;
  const rest = INSTRUCTORS.filter((i) => !i.featured);

  return (
    <main className="min-h-screen bg-white">
      <PlatformNavbar />

      {/* Hero */}
      <section className="pt-16 bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white">
        <div className="container mx-auto max-w-7xl px-4 py-16 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 rounded-full px-4 py-1.5 text-sm text-blue-300 font-medium mb-5">
            👨‍🏫 Đội ngũ giảng viên
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-4">
            Học Từ Những Người<br />
            <span className="text-blue-400">Đã Làm Được</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-xl mx-auto mb-10">
            Mỗi giảng viên đều có kết quả thực tế — không lý thuyết suông, chỉ có kinh nghiệm thực chiến.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto">
            {STATS.map((s, i) => (
              <div key={i} className="text-center">
                <p className="font-heading font-bold text-2xl text-white">{s.value}</p>
                <p className="text-slate-400 text-xs mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured instructor */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-4">Giảng viên nổi bật</div>
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Avatar side */}
              <div className={`lg:w-72 flex-shrink-0 bg-gradient-to-br ${featured.gradient} flex items-center justify-center p-12`}>
                <div className="text-center">
                  <div className="w-28 h-28 rounded-full overflow-hidden mx-auto mb-4 ring-4 ring-white/40 shadow-xl">
                    <img src={featured.photo} alt={featured.name} className="w-full h-full object-cover" />
                  </div>
                  <p className="text-white font-heading font-bold text-lg">{featured.name}</p>
                  <p className="text-white/80 text-sm mt-1">⭐ {featured.rating} · {featured.students.toLocaleString()} học viên</p>
                </div>
              </div>
              {/* Info side */}
              <div className="p-8 flex-1 space-y-5">
                <div>
                  <h2 className="font-heading font-bold text-slate-900 text-2xl">{featured.name}</h2>
                  <p className="text-blue-600 font-semibold text-sm mt-1">{featured.title}</p>
                </div>
                <p className="text-slate-600 leading-relaxed">{featured.bio}</p>
                <div className="flex flex-wrap gap-2">
                  {featured.specialties.map((s) => (
                    <span key={s} className="text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1.5 rounded-full">{s}</span>
                  ))}
                </div>
                <div className="flex items-center gap-6 text-sm text-slate-500 pt-2 border-t border-slate-100">
                  <span>📚 {featured.courses} khóa học</span>
                  <span>👥 {featured.students.toLocaleString()} học viên</span>
                  <span>⭐ {featured.rating}/5</span>
                </div>
                <div className="flex gap-3">
                  <Link href="/templates/khoa-hoc/course/ban-hang-online" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors">
                    Xem khóa học
                  </Link>
                  <button className="border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors">
                    Xem hồ sơ
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All instructors grid */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <h2 className="font-heading text-2xl font-bold text-slate-900 mb-8">Tất Cả Giảng Viên</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((inst) => (
              <div key={inst.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-md hover:border-blue-200 transition-all group">
                {/* Header gradient */}
                <div className={`h-24 bg-gradient-to-br ${inst.gradient} relative`}>
                  <div className="absolute -bottom-8 left-6">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-md ring-2 ring-white">
                      <img src={inst.photo} alt={inst.name} className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
                <div className="pt-10 px-5 pb-5 space-y-3">
                  <div>
                    <h3 className="font-heading font-bold text-slate-900 text-base">{inst.name}</h3>
                    <p className="text-blue-600 text-xs font-semibold mt-0.5">{inst.title}</p>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">{inst.bio}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {inst.specialties.slice(0, 2).map((s) => (
                      <span key={s} className="text-[11px] font-semibold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">{s}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span>📚 {inst.courses} khóa</span>
                      <span>👥 {inst.students.toLocaleString()}</span>
                      <span>⭐ {inst.rating}</span>
                    </div>
                    <Link href="/templates/khoa-hoc/course/ban-hang-online" className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline">
                      Xem khóa →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Become instructor CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-600 to-indigo-700 text-white text-center">
        <div className="container mx-auto max-w-2xl space-y-5">
          <div className="text-4xl">🎓</div>
          <h2 className="font-heading text-3xl font-bold">Bạn Muốn Trở Thành Giảng Viên?</h2>
          <p className="text-blue-100 text-base">
            Chia sẻ kiến thức, xây dựng thu nhập thụ động. SellOS Academy hỗ trợ bạn từ nội dung đến marketing.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-3 rounded-xl text-sm transition-colors shadow-lg">
              Đăng ký làm giảng viên
            </button>
            <button className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-8 py-3 rounded-xl text-sm transition-colors">
              Tìm hiểu thêm
            </button>
          </div>
        </div>
      </section>

      <PlatformFooter />
    </main>
  );
}
