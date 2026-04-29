"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import PlatformNavbar from "@/components/templates/khoa-hoc/shared/PlatformNavbar";
import PlatformFooter from "@/components/templates/khoa-hoc/shared/PlatformFooter";
import { cn } from "@/lib/utils";

const CATEGORIES = ["Tất cả", "Bán hàng", "Quảng cáo", "Marketing", "Công nghệ", "Khởi nghiệp"];

const POSTS = [
  {
    id: 1,
    title: "5 Chiến Lược Bán Hàng Online Hiệu Quả Nhất 2025",
    excerpt: "Thị trường thay đổi nhanh chóng — những chiến lược nào đang thực sự tạo ra đơn hàng năm 2025? Chúng tôi phân tích dữ liệu từ 500+ học viên để tìm ra câu trả lời.",
    category: "Bán hàng",
    author: "Nguyễn Thành Nam",
    authorAvatar: "NTN",
    authorGradient: "from-blue-500 to-indigo-600",
    date: "28/04/2025",
    readTime: "8 phút",
    gradient: "from-blue-500 to-indigo-600",
    emoji: "🚀",
    featured: true,
    tags: ["Bán hàng", "Chiến lược", "2025"],
  },
  {
    id: 2,
    title: "Cách Viết Nội Dung Facebook Ads Tỉ Lệ Click Cao",
    excerpt: "Hook đầu tiên quyết định tất cả. Học cách viết 3 giây đầu tiên khiến người dùng dừng lại và nhấp vào quảng cáo của bạn.",
    category: "Quảng cáo",
    author: "Trần Hải Đăng",
    authorAvatar: "THD",
    authorGradient: "from-rose-500 to-pink-600",
    date: "25/04/2025",
    readTime: "6 phút",
    gradient: "from-rose-500 to-pink-600",
    emoji: "📱",
    featured: false,
    tags: ["Facebook Ads", "Copywriting"],
  },
  {
    id: 3,
    title: "Xây Dựng Funnel Bán Hàng Tự Động Với AI",
    excerpt: "AI đang thay đổi cách chúng ta bán hàng. Khám phá cách thiết lập funnel tự động từ traffic → lead → đơn hàng mà không cần can thiệp thủ công.",
    category: "Công nghệ",
    author: "Nguyễn Thành Nam",
    authorAvatar: "NTN",
    authorGradient: "from-blue-500 to-indigo-600",
    date: "22/04/2025",
    readTime: "10 phút",
    gradient: "from-violet-500 to-purple-600",
    emoji: "🤖",
    featured: false,
    tags: ["AI", "Automation", "Funnel"],
  },
  {
    id: 4,
    title: "Từ 0 Đến 100 Đơn/Tháng: Câu Chuyện Thực Tế",
    excerpt: "Minh Tuấn — giáo viên thể dục — đã bán được 100 đơn/tháng chỉ sau 6 tuần học. Đây là toàn bộ hành trình chi tiết của anh ấy.",
    category: "Bán hàng",
    author: "Nguyễn Thành Nam",
    authorAvatar: "NTN",
    authorGradient: "from-blue-500 to-indigo-600",
    date: "19/04/2025",
    readTime: "12 phút",
    gradient: "from-amber-500 to-orange-500",
    emoji: "🎯",
    featured: false,
    tags: ["Case study", "Bán hàng"],
  },
  {
    id: 5,
    title: "Email Marketing 2025: Những Xu Hướng Không Thể Bỏ Qua",
    excerpt: "Email vẫn là kênh ROI cao nhất — 42$ cho mỗi 1$ đầu tư. Nhưng cách làm đang thay đổi. Đây là những gì bạn cần biết để không bị bỏ lại.",
    category: "Marketing",
    author: "Lê Minh Châu",
    authorAvatar: "LMC",
    authorGradient: "from-emerald-500 to-teal-600",
    date: "16/04/2025",
    readTime: "7 phút",
    gradient: "from-emerald-500 to-teal-600",
    emoji: "📧",
    featured: false,
    tags: ["Email Marketing", "2025"],
  },
  {
    id: 6,
    title: "Shopee vs Lazada: Nên Bán Ở Đâu Năm 2025?",
    excerpt: "So sánh chi tiết phí, traffic, chuyển đổi và tiềm năng tăng trưởng của 2 sàn TMĐT lớn nhất Việt Nam để giúp bạn quyết định đúng.",
    category: "Bán hàng",
    author: "Phạm Quang Huy",
    authorAvatar: "PQH",
    authorGradient: "from-orange-500 to-red-500",
    date: "13/04/2025",
    readTime: "9 phút",
    gradient: "from-orange-500 to-red-500",
    emoji: "🛍️",
    featured: false,
    tags: ["Shopee", "Lazada", "TMĐT"],
  },
  {
    id: 7,
    title: "Landing Page Chuyển Đổi Cao: 10 Yếu Tố Không Thể Thiếu",
    excerpt: "Tại sao landing page của bạn không bán được hàng? Phân tích 100 landing page thực tế để tìm ra những yếu tố tạo nên tỉ lệ chuyển đổi 15%+.",
    category: "Marketing",
    author: "Vũ Thị Lan",
    authorAvatar: "VTL",
    authorGradient: "from-violet-500 to-purple-600",
    date: "10/04/2025",
    readTime: "11 phút",
    gradient: "from-cyan-500 to-blue-500",
    emoji: "📊",
    featured: false,
    tags: ["Landing Page", "Conversion"],
  },
  {
    id: 8,
    title: "Khởi Nghiệp Online Với 5 Triệu: Có Khả Thi Không?",
    excerpt: "5 triệu đủ để bắt đầu không? Câu trả lời là CÓ — nếu bạn biết chi đúng chỗ. Đây là roadmap chi tiết từ ý tưởng đến dòng tiền đầu tiên.",
    category: "Khởi nghiệp",
    author: "Hoàng Minh Đức",
    authorAvatar: "HMD",
    authorGradient: "from-amber-500 to-yellow-500",
    date: "07/04/2025",
    readTime: "14 phút",
    gradient: "from-amber-400 to-yellow-500",
    emoji: "💡",
    featured: false,
    tags: ["Khởi nghiệp", "Budget"],
  },
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("Tất cả");

  const featured = POSTS.find((p) => p.featured)!;

  const filtered = useMemo(() => {
    const rest = POSTS.filter((p) => !p.featured);
    if (activeCategory === "Tất cả") return rest;
    return rest.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <main className="min-h-screen bg-white">
      <PlatformNavbar />

      {/* Hero */}
      <section className="pt-16 bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white">
        <div className="container mx-auto max-w-7xl px-4 py-16 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 rounded-full px-4 py-1.5 text-sm text-blue-300 font-medium mb-5">
            📝 Blog kiến thức
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-4">
            Kiến Thức Bán Hàng<br />
            <span className="text-blue-400">Thực Chiến</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-xl mx-auto">
            Bài viết chuyên sâu từ các chuyên gia — áp dụng được ngay, không lý thuyết suông.
          </p>
        </div>
      </section>

      <div className="container mx-auto max-w-7xl px-4 py-12 space-y-12">

        {/* Featured post */}
        <div>
          <div className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-4">Bài nổi bật</div>
          <Link href="#" className="group block bg-white border border-slate-200 rounded-3xl overflow-hidden hover:shadow-lg hover:border-blue-200 transition-all">
            <div className="flex flex-col lg:flex-row">
              <div className={`lg:w-96 h-56 lg:h-auto flex-shrink-0 bg-gradient-to-br ${featured.gradient} flex items-center justify-center relative`}>
                <span className="text-8xl">{featured.emoji}</span>
                <div className="absolute top-4 left-4">
                  <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full">{featured.category}</span>
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col justify-center space-y-4">
                <div className="flex flex-wrap gap-2">
                  {featured.tags.map((tag) => (
                    <span key={tag} className="text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100 px-2.5 py-1 rounded-full">{tag}</span>
                  ))}
                </div>
                <h2 className="font-heading font-bold text-slate-900 text-2xl leading-snug group-hover:text-blue-600 transition-colors">
                  {featured.title}
                </h2>
                <p className="text-slate-500 leading-relaxed">{featured.excerpt}</p>
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${featured.authorGradient} flex items-center justify-center text-white font-bold text-xs`}>
                      {featured.authorAvatar}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{featured.author}</p>
                      <p className="text-xs text-slate-400">{featured.date} · {featured.readTime} đọc</p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-blue-600 group-hover:translate-x-1 transition-transform inline-block">
                    Đọc ngay →
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-semibold transition-all border",
                activeCategory === cat
                  ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                  : "bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-600"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Posts grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <p className="text-4xl mb-3">📭</p>
            <p className="font-semibold">Chưa có bài viết trong danh mục này</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post) => (
              <Link
                key={post.id}
                href="#"
                className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-md hover:border-blue-200 transition-all flex flex-col"
              >
                {/* Thumbnail */}
                <div className={`h-44 bg-gradient-to-br ${post.gradient} flex items-center justify-center flex-shrink-0 relative`}>
                  <span className="text-6xl">{post.emoji}</span>
                  <div className="absolute top-3 left-3">
                    <span className="bg-white/20 backdrop-blur-sm text-white text-[11px] font-bold px-2.5 py-1 rounded-full">{post.category}</span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="bg-black/20 backdrop-blur-sm text-white text-[11px] px-2 py-1 rounded-full">{post.readTime}</span>
                  </div>
                </div>
                {/* Content */}
                <div className="p-5 flex flex-col flex-1 space-y-3">
                  <h3 className="font-heading font-bold text-slate-900 text-base leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 flex-1">{post.excerpt}</p>
                  <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                    <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${post.authorGradient} flex items-center justify-center text-white font-bold text-[10px] flex-shrink-0`}>
                      {post.authorAvatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-slate-700 truncate">{post.author}</p>
                      <p className="text-[11px] text-slate-400">{post.date}</p>
                    </div>
                    <span className="text-xs font-semibold text-blue-600 group-hover:translate-x-0.5 transition-transform flex-shrink-0">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Newsletter CTA */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-10 text-center text-white">
          <h2 className="font-heading text-2xl font-bold mb-2">Nhận Bài Viết Mới Mỗi Tuần</h2>
          <p className="text-blue-100 mb-6 text-sm">Kiến thức thực chiến, tips & case study mỗi thứ Hai hàng tuần. Miễn phí.</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="email@example.com"
              className="flex-1 px-4 py-3 rounded-xl text-slate-900 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button className="bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold px-6 py-3 rounded-xl text-sm transition-colors whitespace-nowrap">
              Đăng ký nhận tin
            </button>
          </div>
          <p className="text-blue-300 text-xs mt-3">Đã có 3,200+ người đăng ký · Hủy bất kỳ lúc nào</p>
        </div>

      </div>

      <PlatformFooter />
    </main>
  );
}
