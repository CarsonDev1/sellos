const PROMPTS_BY_TYPE: Record<string, { label: string; prompt: string }[]> = {
  "khoa-hoc": [
    { label: "✍️ Script TikTok", prompt: "Viết script video TikTok 60 giây giới thiệu khóa học của tôi, format hook mạnh ở đầu." },
    { label: "📧 Email sequence", prompt: "Tạo email sequence 5 bước nurture lead cho khóa học của tôi, từ lúc đăng ký lead magnet đến mua." },
    { label: "💰 Gợi ý combo giá", prompt: "Gợi ý 3 gói giá (Basic/Pro/VIP) cho khóa học của tôi với chiến lược anchoring price." },
    { label: "📱 Caption Facebook", prompt: "Viết 3 caption Facebook Ads cho khóa học, mỗi caption một angle khác nhau (pain point, social proof, FOMO)." },
  ],
  "shop-online": [
    { label: "🛍️ Mô tả sản phẩm", prompt: "Viết mô tả sản phẩm chuẩn SEO và thuyết phục cho sản phẩm của tôi dùng trên Shopee và website." },
    { label: "📣 Script Ads TikTok", prompt: "Viết script video TikTok Ads 30 giây cho sản phẩm của tôi, format ugc tự nhiên." },
    { label: "🔥 Flash Sale campaign", prompt: "Lên kế hoạch Flash Sale 48h cho shop của tôi: timeline, discount strategy, content cần chuẩn bị." },
    { label: "💬 Kịch bản chốt sale", prompt: "Viết kịch bản chat chốt sale cho khách hỏi giá nhưng chưa mua, xử lý 5 objection phổ biến." },
  ],
  "coaching": [
    { label: "🌟 Landing page copy", prompt: "Viết copy landing page bán gói coaching 1-1 của tôi theo framework AIDA, đầy đủ các section." },
    { label: "📩 DM script Instagram", prompt: "Viết script DM cold outreach trên Instagram để mời khách hàng tiềm năng book call tư vấn miễn phí." },
    { label: "📊 Case study", prompt: "Giúp tôi viết case study từ kết quả của khách hàng, format story-telling theo Before/After/How." },
    { label: "🎯 Webinar pitch", prompt: "Viết pitch bán hàng 10 phút cuối webinar cho gói coaching của tôi, có urgency và bonus stack." },
  ],
  "dich-vu": [
    { label: "📋 Proposal mẫu", prompt: "Viết mẫu proposal chuyên nghiệp cho dịch vụ của tôi, bao gồm overview, scope, timeline, pricing." },
    { label: "💼 Pricing packages", prompt: "Gợi ý 3 gói dịch vụ với tên gọi hấp dẫn và cách trình bày giá để tối đa conversion." },
    { label: "📞 Sales call script", prompt: "Viết script cuộc gọi bán hàng 20 phút: mở đầu, khám phá nhu cầu, present solution, close deal." },
    { label: "🤝 Referral program", prompt: "Thiết kế chương trình referral cho dịch vụ của tôi để khách hàng cũ giới thiệu khách mới." },
  ],
};

const DEFAULT_PROMPTS = [
  { label: "📈 Chiến lược tăng trưởng", prompt: "Phân tích và đề xuất chiến lược tăng trưởng doanh thu trong 90 ngày tới cho doanh nghiệp của tôi." },
  { label: "🎯 Xác định USP", prompt: "Giúp tôi xác định và trình bày điểm khác biệt (USP) của doanh nghiệp so với đối thủ cạnh tranh." },
  { label: "📱 Kế hoạch content", prompt: "Tạo kế hoạch content 30 ngày cho mạng xã hội: chủ đề, format, tần suất đăng phù hợp với doanh nghiệp." },
  { label: "💡 Ý tưởng marketing", prompt: "Cho tôi 10 ý tưởng marketing sáng tạo, chi phí thấp phù hợp với doanh nghiệp của tôi." },
];

interface Props {
  businessType?: string;
  onSelect: (prompt: string) => void;
}

export default function QuickPrompts({ businessType, onSelect }: Props) {
  const prompts = (businessType && PROMPTS_BY_TYPE[businessType]) || DEFAULT_PROMPTS;

  return (
    <div className="grid grid-cols-2 gap-2">
      {prompts.map((p) => (
        <button
          key={p.label}
          onClick={() => onSelect(p.prompt)}
          className="text-left px-3.5 py-3 bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-2xl text-xs font-medium text-slate-600 hover:text-blue-700 transition-all leading-snug"
        >
          {p.label}
        </button>
      ))}
    </div>
  );
}
