export const shopOnlineSchema = {
  seo: { title: "", description: "" },
  hero: {
    badge: "",
    headline: "",
    subheadline: "",
    cta_primary: "",
    cta_secondary: "",
    trust1: "",
    trust2: "",
    trust3: "",
    review_count: "",
    review_score: "4.9",
  },
  categories: [
    { name: "", slug: "", description: "", image_keyword: "" },
    { name: "", slug: "", description: "", image_keyword: "" },
    { name: "", slug: "", description: "", image_keyword: "" },
    { name: "", slug: "", description: "", image_keyword: "" },
  ],
  sale: {
    headline: "",
    subtext: "",
    code: "",
    discount_text: "",
    end_days: 3,
    cta: "",
  },
  featured_section_title: "",
  new_arrivals_section_title: "",
  testimonials: [
    { name: "", role: "", quote: "", rating: 5 },
    { name: "", role: "", quote: "", rating: 5 },
    { name: "", role: "", quote: "", rating: 5 },
    { name: "", role: "", quote: "", rating: 5 },
  ],
  newsletter: { headline: "", subtext: "", button: "" },
  footer: {
    tagline: "",
    address: "",
    phone: "",
    email: "",
    return_policy: "",
  },
};

export type ShopOnlineContent = typeof shopOnlineSchema;

export const shopOnlinePrompt = (bizInfo: {
  brand_name: string;
  description: string | null;
  phone: string | null;
  website: string | null;
}, products: Array<{ name: string; description: string | null; price: number | null }>) => `
Bạn là copywriter chuyên nghiệp về e-commerce và thời trang/hàng tiêu dùng Việt Nam.
Hãy tạo nội dung hoàn chỉnh cho landing page shop online.

THÔNG TIN SHOP:
- Tên thương hiệu: ${bizInfo.brand_name}
- Mô tả: ${bizInfo.description ?? "shop online chất lượng, giao hàng nhanh"}
- Điện thoại: ${bizInfo.phone ?? ""}
- Website: ${bizInfo.website ?? ""}

SẢN PHẨM ĐANG BÁN:
${products.map((p, i) => `${i + 1}. ${p.name}${p.price ? ` - ${p.price.toLocaleString("vi-VN")}đ` : ""}${p.description ? ` - ${p.description}` : ""}`).join("\n") || "Hàng thời trang, phụ kiện các loại"}

YÊU CẦU:
- Tone: trẻ trung, năng động, thời thượng
- Hero badge ngắn gọn (vd: "✨ Bộ sưu tập Hè 2025")
- Trust points: 3 điểm bán hàng ngắn gọn (vd: "Giao 2h nội thành")
- 4 categories phù hợp với sản phẩm đang bán, slug không dấu gạch ngang
  + image_keyword: từ khóa tiếng Anh để tìm ảnh Unsplash (vd: "fashion women", "accessories")
- Sale code: dạng BRANDNAME + số (vd: NOVA30), realistic discount 15-40%
- Testimonials: 4 khách hàng nữ điển hình, quote về chất lượng + giao hàng
- Newsletter: offer hấp dẫn (giảm giá đơn đầu tiên)

Trả về JSON hợp lệ theo schema sau, KHÔNG có markdown, KHÔNG có \`\`\`json:
${JSON.stringify(shopOnlineSchema, null, 2)}
`.trim();
