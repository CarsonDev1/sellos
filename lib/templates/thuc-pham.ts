import {
	basePromptHeader,
	composePrompt,
	formatBiz,
	formatProducts,
	jsonOutputContract,
	type BizInfo,
	type ProductInfo,
} from './_shared';
import { whyUsSection, testimonialsSection } from './_sections';

/**
 * Thuc Pham (food / organic / fresh produce) template.
 * Schema kept backward-compatible with ThucPhamRenderer.
 */

export const thucPhamSchema = {
	seo: { title: '', description: '' },
	hero: {
		headline: '',
		subheadline: '',
		badge: '',
		cta_primary: '',
		cta_secondary: '',
		stat1_number: '',
		stat1_label: '',
		stat2_number: '',
		stat2_label: '',
		stat3_number: '',
		stat3_label: '',
	},
	about: {
		headline: '',
		story: '',
		mission: '',
		highlight1_title: '',
		highlight1_desc: '',
		highlight2_title: '',
		highlight2_desc: '',
		highlight3_title: '',
		highlight3_desc: '',
	},
	why_us: whyUsSection.schema,
	categories: [
		{ name: '', slug: '', description: '' },
		{ name: '', slug: '', description: '' },
		{ name: '', slug: '', description: '' },
		{ name: '', slug: '', description: '' },
	],
	testimonials: testimonialsSection.schema(testimonialsSection.count).map((t) => ({
		name: t.name,
		role: t.role,
		quote: t.quote,
		rating: t.rating,
	})),
	newsletter: { headline: '', subtext: '' },
	footer: {
		tagline: '',
		address: '',
		phone: '',
		email: '',
		hours: '',
		delivery_note: '',
	},
};

export type ThucPhamContent = typeof thucPhamSchema;

/* ── Section instructions specific to thuc-pham ────────────── */

const heroInstructions = `
HERO:
- badge: ngắn (vd: "Rau hữu cơ Đà Lạt", "Đặt sáng — giao chiều").
- headline: 1 câu nhấn vào TƯƠI / SẠCH / NGUỒN GỐC, dưới 12 từ (vd: "Rau sạch từ vườn — đến bàn ăn trong 24h").
- subheadline: 1-2 câu nói rõ giao đâu, mua như thế nào.
- cta_primary: "Đặt hàng ngay", "Xem sản phẩm".
- cta_secondary: "Câu chuyện của chúng tôi", "Kiểm tra giao hàng".
- 3 stats: con số xây niềm tin (KHÁC LOẠI nhau).
  + Ví dụ tốt: "5 năm kinh nghiệm", "1,000+ hộ gia đình", "97% khách quay lại".
  + KHÔNG nói "uy tín #1" — phải có số.
`.trim();

const aboutInstructions = `
ABOUT (câu chuyện thương hiệu):
- headline: tiêu đề ngắn (vd: "Từ vườn nhà — đến bàn ăn của bạn").
- story: 3-4 câu kể câu chuyện thật (vùng trồng, nông dân, quy trình). Tránh "chất lượng hàng đầu" sáo rỗng.
- mission: 1 câu sứ mệnh (vd: "Đưa rau sạch tận nơi, giá hợp lý").
- 3 highlights: title 2-4 từ + desc 1 câu cụ thể.
  + Chọn 3 trong: nguồn gốc rõ ràng, không thuốc bảo vệ, đóng gói hút chân không, giao trong ngày, tủ mát chuyên dụng, kiểm dịch độc lập.
`.trim();

const categoriesInstructions = `
CATEGORIES — 4 danh mục:
- name: tiếng Việt ngắn (vd: "Rau lá", "Củ quả", "Trái cây", "Đồ khô").
- slug: chữ thường, không dấu, gạch ngang.
- description: 1 câu rất ngắn (4-8 từ).
- 4 categories phải khớp với sản phẩm thực tế.
`.trim();

const testimonialsInstructionsThucPham = `
TESTIMONIALS — 3 đánh giá khách:
- name: tên Việt, role là người mua thực phẩm (mẹ bỉm, đầu bếp tại gia, nhân viên văn phòng).
- quote: 1-2 câu cụ thể về vị / độ tươi / cách giao hàng.
- rating: 5.
- 3 testimonials nói về 3 ĐIỂM khác nhau.
`.trim();

const newsletterInstructions = `
NEWSLETTER (đăng ký nhận tin):
- headline: ưu đãi rõ ràng (vd: "Giảm 15% đơn đầu cho khách mới").
- subtext: 1 câu nói tần suất gửi và loại nội dung (vd: "1 email/tuần — tin mùa, công thức, ưu đãi riêng").
`.trim();

const footerInstructions = `
FOOTER:
- tagline: 1 câu sứ mệnh ngắn.
- address: địa chỉ giả hợp lý ở TP.HCM hoặc Hà Nội (gồm quận).
- phone: dạng "0xxx xxx xxx".
- email: dạng "lienhe@<brand>.vn" hoặc "shop@<brand>.vn".
- hours: thời gian thực tế (vd: "7:00 - 21:00, T2-CN").
- delivery_note: 1 câu về phạm vi/thời gian giao (vd: "Giao trong 4 giờ tại TP.HCM, freeship đơn 300k").
`.trim();

export const thucPhamPrompt = (biz: BizInfo, products: ProductInfo[]) =>
	composePrompt([
		basePromptHeader({
			persona: 'copywriter chuyên về thực phẩm sạch / nông sản / hàng tươi sống Việt Nam',
			audience:
				'người Việt thành thị 25-45 tuổi quan tâm đến chất lượng thực phẩm cho gia đình',
			tone: 'gần gũi, đáng tin cậy, đậm chất Việt — không khoe, không sáo',
		}),
		`THÔNG TIN THƯƠNG HIỆU:\n${formatBiz(biz, 'thực phẩm sạch, chất lượng cao')}`,
		`SẢN PHẨM:\n${formatProducts(products, 'Thực phẩm sạch các loại')}`,
		heroInstructions,
		aboutInstructions,
		whyUsSection.instructions,
		categoriesInstructions,
		testimonialsInstructionsThucPham,
		newsletterInstructions,
		footerInstructions,
		jsonOutputContract(thucPhamSchema),
	]);
