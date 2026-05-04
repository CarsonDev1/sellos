import {
	basePromptHeader,
	composePrompt,
	formatBiz,
	formatProducts,
	jsonOutputContract,
	type BizInfo,
	type ProductInfo,
} from './_shared';
import { newsletterSection } from './_sections';

/**
 * Shop Online template — fashion / consumer goods.
 * Schema kept backward-compatible with ShopOnlineRenderer.
 */

export const shopOnlineSchema = {
	seo: { title: '', description: '' },
	hero: {
		badge: '',
		headline: '',
		subheadline: '',
		cta_primary: '',
		cta_secondary: '',
		trust1: '',
		trust2: '',
		trust3: '',
		review_count: '',
		review_score: '4.9',
	},
	categories: [
		{ name: '', slug: '', description: '', image_keyword: '' },
		{ name: '', slug: '', description: '', image_keyword: '' },
		{ name: '', slug: '', description: '', image_keyword: '' },
		{ name: '', slug: '', description: '', image_keyword: '' },
	],
	sale: {
		headline: '',
		subtext: '',
		code: '',
		discount_text: '',
		end_days: 3,
		cta: '',
	},
	featured_section_title: '',
	new_arrivals_section_title: '',
	testimonials: Array.from({ length: 4 }, () => ({
		name: '',
		role: '',
		quote: '',
		rating: 5,
	})),
	newsletter: newsletterSection.schema,
	footer: {
		tagline: '',
		address: '',
		phone: '',
		email: '',
		return_policy: '',
	},
};

export type ShopOnlineContent = typeof shopOnlineSchema;

/* ── Section instructions specific to shop-online ──────────── */

const heroInstructions = `
HERO:
- badge: ngắn 3-6 từ, gắn nhãn bộ sưu tập / mùa / ưu đãi (vd: "Bộ sưu tập Hè 2025", "Mới ra mắt").
- headline: 1 câu, dưới 12 từ, gợi cảm xúc / tự tin (vd: "Mặc đẹp mỗi ngày — không cần nghĩ nhiều").
- subheadline: 1 câu nói rõ shop bán gì cho ai.
- cta_primary: "Mua ngay", "Khám phá BST", "Săn sale".
- cta_secondary: "Xem catalogue", "Tư vấn chọn size".
- 3 trust points: mỗi cái dưới 6 từ, KHÁC LOẠI nhau (vd: "Giao 2h nội thành", "Đổi trả 14 ngày", "Freeship đơn 500k").
- review_count: dạng "1.2k+", "5,000+" — thực tế.
- review_score: giữ "4.9" (đừng đổi).
`.trim();

const categoriesInstructions = `
CATEGORIES — 4 danh mục phù hợp với sản phẩm:
- name: tên tiếng Việt ngắn (vd: "Áo nữ", "Phụ kiện", "Giày dép").
- slug: chữ thường, không dấu, gạch ngang (vd: "ao-nu", "phu-kien").
- description: 1 câu rất ngắn (4-8 từ).
- image_keyword: 2-3 từ tiếng Anh để tìm ảnh Unsplash (vd: "women fashion", "leather accessories", "sneakers").
- 4 categories phải PHẢN ÁNH sản phẩm thật của shop, không bịa danh mục không liên quan.
`.trim();

const saleInstructions = `
SALE BANNER:
- headline: ngắn, có % giảm hoặc số tiền tiết kiệm (vd: "Giảm 30% toàn bộ BST Hè").
- subtext: 1 câu mở rộng, nhắc deadline.
- code: dạng <BRAND_VIẾT_HOA><SỐ> (vd: "NOVA30", "HE25"). 6-8 ký tự.
- discount_text: dưới 4 từ (vd: "Giảm 30%", "Mua 2 tặng 1").
- end_days: 3 (giữ nguyên).
- cta: "Săn sale ngay", "Dùng mã ngay".
`.trim();

const sectionTitlesInstructions = `
SECTION TITLES:
- featured_section_title: tiêu đề khu sản phẩm nổi bật (vd: "Hot nhất tuần này").
- new_arrivals_section_title: tiêu đề khu hàng mới về (vd: "Vừa cập bến").
`.trim();

const testimonialsInstructions = `
TESTIMONIALS — 4 đánh giá khách:
- name: tên tiếng Việt, đa số khách shop online là nữ.
- role: vd "Nhân viên văn phòng", "Sinh viên", "Mẹ 1 con". KHÔNG bịa nghề lạ.
- quote: 1-2 câu cụ thể về một sản phẩm, một trải nghiệm shop (chất vải, fit dáng, giao hàng, đóng gói).
- rating: 5.
- 4 testimonials phải nói về 4 ĐIỂM KHÁC NHAU (chất lượng / giao hàng / đóng gói / đổi trả).
`.trim();

const footerInstructions = `
FOOTER:
- tagline: 1 câu định vị shop (5-10 từ).
- address: địa chỉ giả thực tế ở TP.HCM hoặc Hà Nội.
- phone: dạng "0xxx xxx xxx".
- email: dạng "shop@<brand>.vn" hoặc "cskh@<brand>.vn".
- return_policy: 1 câu chính sách đổi trả (vd: "Đổi trả miễn phí trong 14 ngày").
`.trim();

export const shopOnlinePrompt = (biz: BizInfo, products: ProductInfo[]) =>
	composePrompt([
		basePromptHeader({
			persona: 'copywriter e-commerce thời trang & hàng tiêu dùng Việt Nam',
			audience: 'khách mua hàng online, đa số nữ 22-40 tuổi, ưu tiên giá tốt + giao nhanh + ảnh đẹp',
			tone: 'trẻ trung, năng động, gần gũi, nhẹ nhàng',
		}),
		`THÔNG TIN SHOP:\n${formatBiz(biz, 'shop online chất lượng, giao hàng nhanh')}`,
		`SẢN PHẨM ĐANG BÁN:\n${formatProducts(products, 'Hàng thời trang, phụ kiện các loại')}`,
		heroInstructions,
		categoriesInstructions,
		saleInstructions,
		sectionTitlesInstructions,
		testimonialsInstructions,
		newsletterSection.instructions,
		footerInstructions,
		jsonOutputContract(shopOnlineSchema),
	]);
