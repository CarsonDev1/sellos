import {
	basePromptHeader,
	composePrompt,
	formatBiz,
	formatProducts,
	jsonOutputContract,
	type BizInfo,
	type ProductInfo,
} from './_shared';
import {
	howItWorksSection,
	faqSection,
	ctaSection,
	testimonialsSection,
} from './_sections';

/**
 * Coaching template — backward-compatible schema.
 * Field names match the existing CoachingRenderer; prompt is modular.
 */

export const coachingSchema = {
	seo: { title: '', description: '' },
	hero: {
		headline: '',
		subheadline: '',
		cta_primary: '',
		cta_secondary: '',
		badge: '',
		result1_number: '',
		result1_label: '',
		result2_number: '',
		result2_label: '',
		result3_number: '',
		result3_label: '',
	},
	about: {
		headline: '',
		bio: '',
		credential1: '',
		credential2: '',
		credential3: '',
		achievement: '',
	},
	programs: [
		{
			name: '',
			tagline: '',
			description: '',
			price: 0,
			duration: '',
			sessions: '',
			badge: '',
			features: ['', '', '', '', ''],
			cta: '',
		},
		{
			name: '',
			tagline: '',
			description: '',
			price: 0,
			duration: '',
			sessions: '',
			badge: 'Phổ biến nhất',
			features: ['', '', '', '', ''],
			cta: '',
		},
		{
			name: '',
			tagline: '',
			description: '',
			price: 0,
			duration: '',
			sessions: '',
			badge: '',
			features: ['', '', '', '', ''],
			cta: '',
		},
	],
	how_it_works: howItWorksSection.schema,
	testimonials: testimonialsSection.schema(testimonialsSection.count),
	faq: faqSection.schema(faqSection.count),
	cta_section: ctaSection.schema,
	footer: {
		tagline: '',
		phone: '',
		email: '',
		social_note: '',
	},
};

export type CoachingContent = typeof coachingSchema;

/* ── Section instructions specific to coaching ─────────────── */

const heroInstructions = `
HERO:
- headline: 1 câu mạnh, dưới 14 từ, mô tả CHUYỂN HOÁ (before → after) của khách (vd: "Từ kẹt cứng sự nghiệp đến doanh thu 1 tỷ trong 6 tháng").
- subheadline: 1-2 câu nói rõ cho ai và bằng cách nào.
- badge: nhãn ngắn (vd: "Coaching 1-1", "Đã có 200+ khách").
- cta_primary: "Đặt lịch tư vấn miễn phí" hoặc tương đương — không cam kết mua.
- cta_secondary: "Xem chương trình" / "Tải brochure".
- 3 result stats (result1/2/3 number+label): con số CHỨNG MINH KẾT QUẢ KHÁCH ĐẠT ĐƯỢC, không phải số khoá học.
  + Ví dụ tốt: "200+ khách đã hoàn thành", "Trung bình +35% thu nhập", "94% giữ kết quả sau 6 tháng".
  + Mỗi result phải khác loại.
`.trim();

const aboutInstructions = `
ABOUT (về coach):
- headline: 1 câu giới thiệu coach gắn với chuyên môn cụ thể.
- bio: 3-4 câu kể câu chuyện coach trở thành chuyên gia trong lĩnh vực này — chi tiết, không sáo.
- 3 credentials: chứng chỉ / năm kinh nghiệm / khách hàng tiêu biểu — phải cụ thể.
- achievement: 1 câu thành tích nổi bật nhất, có con số đo lường.
`.trim();

const programsInstructions = `
PROGRAMS — 3 gói coaching (cơ bản → cao cấp):
- Tên gói tiếng Việt hấp dẫn (vd: "Khởi Đầu", "Tăng Tốc", "Chuyên Sâu").
- tagline: 1 dòng định vị (vd: "Cho người mới muốn thử").
- description: 1-2 câu nói gói này phù hợp với ai.
- price: theo thị trường VN (gói 1: 3-8tr, gói 2: 15-25tr, gói 3: 35-60tr).
- duration: thời lượng (vd: "4 tuần", "3 tháng").
- sessions: số buổi (vd: "4 buổi 1-1", "12 buổi + group call").
- badge: gói 2 GIỮ "Phổ biến nhất". Gói 1 và 3 có thể để trống.
- features: 5 lợi ích cụ thể, mỗi cái 4-8 từ — gói cao có nhiều giá trị hơn.
- cta: "Đăng ký gói này", "Tư vấn gói này"...
- Nếu input có sản phẩm/dịch vụ, lấy làm cơ sở; nếu không, tự sáng tạo phù hợp với chuyên môn coach.
`.trim();

const ctaSectionCoaching = `
CTA SECTION (cuối trang):
- headline: lời mời cuối, có "bạn" và lợi ích.
- subtext: hạ rào cản (vd: "30 phút, miễn phí, không cam kết").
- button: dưới 5 từ.
`.trim();

const footerInstructions = `
FOOTER:
- tagline: 1 câu sứ mệnh coach (5-10 từ).
- phone: dùng phone từ THÔNG TIN COACH nếu có, không có thì để dạng "09xx xxx xxx".
- email: dạng "coach@<brand>.vn" hoặc "lienhe@<brand>.vn".
- social_note: 1 câu mời theo dõi mạng xã hội.
`.trim();

export const coachingPrompt = (biz: BizInfo, products: ProductInfo[]) =>
	composePrompt([
		basePromptHeader({
			persona: 'copywriter chuyên về marketing cho coach, mentor, trainer Việt Nam',
			audience:
				'người Việt đang cân nhắc đầu tư vào coaching để cải thiện sự nghiệp / sức khỏe / mối quan hệ',
			tone: 'chuyên nghiệp, truyền cảm hứng, có kết quả cụ thể đo được',
		}),
		`THÔNG TIN COACH/BRAND:\n${formatBiz(biz, 'coaching chuyên nghiệp, kết quả thực tế')}`,
		`CHƯƠNG TRÌNH/DỊCH VỤ:\n${formatProducts(products, 'Coaching 1-1 và coaching nhóm')}`,
		heroInstructions,
		aboutInstructions,
		programsInstructions,
		howItWorksSection.instructions,
		testimonialsSection.instructions(testimonialsSection.count),
		faqSection.instructions(faqSection.count),
		ctaSectionCoaching,
		footerInstructions,
		jsonOutputContract(coachingSchema),
	]);
