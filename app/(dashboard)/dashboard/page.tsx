import { currentUser } from "@clerk/nextjs/server";

export const metadata = {
  title: "Dashboard — SellOS",
};

const STATS = [
  { label: "Templates đã dùng", value: "0", icon: "🗂️", color: "bg-blue-50 text-blue-600" },
  { label: "Cuộc trò chuyện AI", value: "0", icon: "🤖", color: "bg-violet-50 text-violet-600" },
  { label: "Đơn hàng hôm nay", value: "0", icon: "🛒", color: "bg-rose-50 text-rose-600" },
  { label: "Doanh thu tháng", value: "0₫", icon: "💰", color: "bg-emerald-50 text-emerald-600" },
];

const QUICK_ACTIONS = [
  {
    title: "Chọn Template",
    desc: "Duyệt qua các template có sẵn và triển khai ngay.",
    href: "/dashboard/templates",
    icon: "🎨",
    cta: "Xem template",
  },
  {
    title: "Chat với AI",
    desc: "Nhờ AI tư vấn chiến lược bán hàng và tối ưu nội dung.",
    href: "/dashboard/ai-chat",
    icon: "💬",
    cta: "Bắt đầu chat",
  },
  {
    title: "Cài đặt tài khoản",
    desc: "Cập nhật thông tin, kết nối kênh bán hàng, cấu hình thanh toán.",
    href: "/dashboard/settings",
    icon: "⚙️",
    cta: "Vào cài đặt",
  },
];

export default async function DashboardPage() {
  const user = await currentUser();
  const firstName = user?.firstName ?? "bạn";

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-heading font-bold text-2xl sm:text-3xl text-slate-900">
          Chào {firstName} 👋
        </h1>
        <p className="text-slate-500 mt-1">
          Đây là tổng quan tài khoản SellOS của bạn.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
            <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center text-xl mb-3`}>
              {s.icon}
            </div>
            <p className="text-2xl font-bold text-slate-900">{s.value}</p>
            <p className="text-sm text-slate-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="font-heading font-semibold text-lg text-slate-800 mb-4">Bắt đầu nhanh</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {QUICK_ACTIONS.map((action) => (
            <div key={action.title} className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm flex flex-col gap-3">
              <span className="text-3xl">{action.icon}</span>
              <div>
                <h3 className="font-semibold text-slate-900">{action.title}</h3>
                <p className="text-sm text-slate-500 mt-1 leading-relaxed">{action.desc}</p>
              </div>
              <a
                href={action.href}
                className="mt-auto inline-flex items-center gap-1.5 text-sm text-blue-600 font-semibold hover:text-blue-700 transition-colors"
              >
                {action.cta} →
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Getting started checklist */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white">
        <h2 className="font-heading font-bold text-lg mb-1">Thiết lập tài khoản</h2>
        <p className="text-blue-100 text-sm mb-5">Hoàn thành các bước sau để bắt đầu bán hàng.</p>
        <div className="space-y-3">
          {[
            { done: true, label: "Tạo tài khoản SellOS" },
            { done: false, label: "Chọn template phù hợp" },
            { done: false, label: "Kết nối kênh bán hàng (Shopee, TikTok, ...)" },
            { done: false, label: "Thiết lập thanh toán tự động" },
            { done: false, label: "Chat với AI để tối ưu chiến lược" },
          ].map((step) => (
            <div key={step.label} className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${step.done ? "bg-white" : "border-2 border-white/40"}`}>
                {step.done && (
                  <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <span className={`text-sm ${step.done ? "line-through text-blue-200" : "text-white"}`}>
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
