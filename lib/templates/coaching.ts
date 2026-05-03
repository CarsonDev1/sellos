export const coachingSchema = {
  seo: { title: "", description: "" },
  hero: {
    headline: "",
    subheadline: "",
    cta_primary: "",
    cta_secondary: "",
    badge: "",
    result1_number: "",
    result1_label: "",
    result2_number: "",
    result2_label: "",
    result3_number: "",
    result3_label: "",
  },
  about: {
    headline: "",
    bio: "",
    credential1: "",
    credential2: "",
    credential3: "",
    achievement: "",
  },
  programs: [
    {
      name: "",
      tagline: "",
      description: "",
      price: 0,
      duration: "",
      sessions: "",
      badge: "",
      features: ["", "", "", "", ""],
      cta: "",
    },
    {
      name: "",
      tagline: "",
      description: "",
      price: 0,
      duration: "",
      sessions: "",
      badge: "Phổ biến nhất",
      features: ["", "", "", "", ""],
      cta: "",
    },
    {
      name: "",
      tagline: "",
      description: "",
      price: 0,
      duration: "",
      sessions: "",
      badge: "",
      features: ["", "", "", "", ""],
      cta: "",
    },
  ],
  how_it_works: [
    { step: "01", title: "", description: "" },
    { step: "02", title: "", description: "" },
    { step: "03", title: "", description: "" },
    { step: "04", title: "", description: "" },
  ],
  testimonials: [
    { name: "", role: "", result: "", quote: "", rating: 5 },
    { name: "", role: "", result: "", quote: "", rating: 5 },
    { name: "", role: "", result: "", quote: "", rating: 5 },
  ],
  faq: [
    { q: "", a: "" },
    { q: "", a: "" },
    { q: "", a: "" },
    { q: "", a: "" },
  ],
  cta_section: {
    headline: "",
    subtext: "",
    button: "",
  },
  footer: {
    tagline: "",
    phone: "",
    email: "",
    social_note: "",
  },
};

export type CoachingContent = typeof coachingSchema;

export const coachingPrompt = (bizInfo: {
  brand_name: string;
  description: string | null;
  phone: string | null;
  website: string | null;
}, products: Array<{ name: string; description: string | null; price: number | null }>) => `
Bạn là copywriter chuyên nghiệp về marketing cho coach, mentor, trainer Việt Nam.
Hãy tạo nội dung hoàn chỉnh cho landing page dịch vụ coaching/mentoring.

THÔNG TIN COACH/BRAND:
- Tên: ${bizInfo.brand_name}
- Mô tả: ${bizInfo.description ?? "coaching chuyên nghiệp, kết quả thực tế"}
- Điện thoại: ${bizInfo.phone ?? ""}
- Website: ${bizInfo.website ?? ""}

CHƯƠNG TRÌNH/DỊCH VỤ:
${products.map((p, i) => `${i + 1}. ${p.name}${p.price ? ` - ${p.price.toLocaleString("vi-VN")}đ` : ""}${p.description ? ` - ${p.description}` : ""}`).join("\n") || "Coaching 1-1 và coaching nhóm"}

YÊU CẦU:
- Tone: chuyên nghiệp, truyền cảm hứng, kết quả cụ thể
- Hero headline phải gây ấn tượng mạnh, tập trung vào transformation (before → after)
- Programs: tạo 3 gói coaching với giá tăng dần, tên gói hấp dẫn bằng tiếng Việt
  + Nếu có sản phẩm/dịch vụ từ input, lấy làm cơ sở; nếu không, tự sáng tạo
  + Giá realistic theo thị trường VN (triệu đồng)
- Testimonials: 3 học viên thực tế với kết quả cụ thể, đo lường được
- FAQ: 4 câu hỏi thường gặp của người cân nhắc mua coaching
- Credentials: 3 thành tích/chứng chỉ nổi bật của coach

Trả về JSON hợp lệ theo schema sau, KHÔNG có markdown, KHÔNG có \`\`\`json:
${JSON.stringify(coachingSchema, null, 2)}
`.trim();
