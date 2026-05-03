export const thucPhamSchema = {
  seo: { title: "", description: "" },
  hero: {
    headline: "",
    subheadline: "",
    badge: "",
    cta_primary: "",
    cta_secondary: "",
    stat1_number: "",
    stat1_label: "",
    stat2_number: "",
    stat2_label: "",
    stat3_number: "",
    stat3_label: "",
  },
  about: {
    headline: "",
    story: "",
    mission: "",
    highlight1_title: "",
    highlight1_desc: "",
    highlight2_title: "",
    highlight2_desc: "",
    highlight3_title: "",
    highlight3_desc: "",
  },
  why_us: [
    { icon: "leaf", title: "", description: "" },
    { icon: "shield", title: "", description: "" },
    { icon: "truck", title: "", description: "" },
    { icon: "star", title: "", description: "" },
  ],
  categories: [
    { name: "", slug: "", description: "" },
    { name: "", slug: "", description: "" },
    { name: "", slug: "", description: "" },
    { name: "", slug: "", description: "" },
  ],
  testimonials: [
    { name: "", role: "", quote: "", rating: 5 },
    { name: "", role: "", quote: "", rating: 5 },
    { name: "", role: "", quote: "", rating: 5 },
  ],
  newsletter: { headline: "", subtext: "" },
  footer: {
    tagline: "",
    address: "",
    phone: "",
    email: "",
    hours: "",
    delivery_note: "",
  },
};

export type ThucPhamContent = typeof thucPhamSchema;

export const thucPhamPrompt = (bizInfo: {
  brand_name: string;
  description: string | null;
  phone: string | null;
  website: string | null;
}, products: Array<{ name: string; description: string | null; price: number | null }>) => `
Bạn là copywriter chuyên nghiệp về thương mại điện tử thực phẩm Việt Nam.
Hãy tạo nội dung hoàn chỉnh cho landing page của thương hiệu thực phẩm/nông sản/đồ ăn.

THÔNG TIN THƯƠNG HIỆU:
- Tên thương hiệu: ${bizInfo.brand_name}
- Mô tả: ${bizInfo.description ?? "thực phẩm sạch, chất lượng cao"}
- Điện thoại: ${bizInfo.phone ?? ""}
- Website: ${bizInfo.website ?? ""}

SẢN PHẨM:
${products.map((p, i) => `${i + 1}. ${p.name}${p.price ? ` - ${p.price.toLocaleString("vi-VN")}đ` : ""}${p.description ? ` - ${p.description}` : ""}`).join("\n") || "Thực phẩm sạch các loại"}

YÊU CẦU:
- Viết copy hấp dẫn, đậm chất Việt Nam, gần gũi nhưng đáng tin cậy
- Nhấn mạnh sự tươi sạch, nguồn gốc rõ ràng, giao hàng nhanh
- Các con số thống kê phải cụ thể và realistic (khách hàng, năm hoạt động, sản phẩm...)
- Testimonials từ 3 khách hàng thực tế với tên và nghề nghiệp Việt Nam
- Đặt tên 4 danh mục sản phẩm phù hợp với loại thực phẩm đang bán
- Slug của category: chữ thường, gạch ngang, không dấu

Trả về JSON hợp lệ theo schema sau, KHÔNG có markdown, KHÔNG có \`\`\`json:
${JSON.stringify(thucPhamSchema, null, 2)}
`.trim();
