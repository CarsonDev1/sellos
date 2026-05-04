import {
	basePromptHeader,
	composePrompt,
	formatBiz,
	formatProducts,
	jsonOutputContract,
	type BizInfo,
	type ProductInfo,
} from './_shared';
import { faqSection, testimonialsSection } from './_sections';

/**
 * Khóa học (online course) template.
 *
 * Used by an instructor / academy selling online courses.
 * Schema covers: hero, instructor profile, course outcomes,
 * curriculum modules, pricing tiers, student results, FAQ, CTA.
 */

export const khoaHocSchema = {
	seo: { title: '', description: '' },
	hero: {
		badge: '',
		headline: '',
		subheadline: '',
		cta_primary: '',
		cta_secondary: '',
		stat1_number: '',
		stat1_label: '',
		stat2_number: '',
		stat2_label: '',
		stat3_number: '',
		stat3_label: '',
	},
	pain_points: [
		{ icon: 'frown', title: '', description: '' },
		{ icon: 'clock', title: '', description: '' },
		{ icon: 'wallet', title: '', description: '' },
	],
	what_you_learn: {
		headline: '',
		subheadline: '',
		outcomes: ['', '', '', '', '', ''],
	},
	curriculum: {
		headline: '',
		subheadline: '',
		modules: [
			{ number: '01', title: '', description: '', lessons: '', duration: '' },
			{ number: '02', title: '', description: '', lessons: '', duration: '' },
			{ number: '03', title: '', description: '', lessons: '', duration: '' },
			{ number: '04', title: '', description: '', lessons: '', duration: '' },
			{ number: '05', title: '', description: '', lessons: '', duration: '' },
		],
	},
	instructor: {
		name: '',
		title: '',
		bio: '',
		credential1: '',
		credential2: '',
		credential3: '',
	},
	pricing: [
		{
			name: '',
			tagline: '',
			price: 0,
			original_price: 0,
			badge: '',
			features: ['', '', '', '', ''],
			cta: '',
		},
		{
			name: '',
			tagline: '',
			price: 0,
			original_price: 0,
			badge: 'Phổ biến nhất',
			features: ['', '', '', '', '', ''],
			cta: '',
		},
		{
			name: '',
			tagline: '',
			price: 0,
			original_price: 0,
			badge: '',
			features: ['', '', '', '', '', ''],
			cta: '',
		},
	],
	student_results: testimonialsSection.schema(testimonialsSection.count),
	faq: faqSection.schema(faqSection.count),
	cta_section: {
		headline: '',
		subtext: '',
		button: '',
	},
	footer: {
		tagline: '',
		phone: '',
		email: '',
		social_note: '',
	},
};

export type KhoaHocContent = typeof khoaHocSchema;

/* ── Section instructions ─────────────────────────────────── */

const heroInstructions = `
HERO:
- badge: nhãn ngắn (vd: "Khoá học online", "Khai giảng tháng 11").
- headline: 1 câu, mô tả CHUYỂN HOÁ học viên đạt được, có con số nếu có thể (vd: "Bán hàng online ra đơn đầu tiên trong 7 ngày").
- subheadline: 1-2 câu nói khoá dành cho ai và đặc biệt ở điểm gì.
- cta_primary: "Đăng ký học ngay", "Mua khoá học".
- cta_secondary: "Xem nội dung", "Bài học miễn phí".
- 3 stats: con số chứng minh uy tín (KHÁC LOẠI nhau).
  + Ví dụ tốt: "1,200+ học viên", "4.9★ đánh giá", "5 năm xây dựng".
`.trim();

const painPointsInstructions = `
PAIN POINTS — 3 vấn đề học viên đang gặp (phải GIỐNG CÁCH NGƯỜI VIỆT NÓI):
- title: 4-7 từ, ngắn gọn (vd: "Không biết bắt đầu từ đâu").
- description: 1 câu nói rõ vấn đề ấy gây khó chịu thế nào.
- Mỗi vấn đề khác nhau: thiếu kiến thức / thiếu thời gian / sợ tốn tiền sai cách...
- Giữ field "icon" — không đổi.
`.trim();

const whatYouLearnInstructions = `
WHAT YOU LEARN:
- headline: 1 câu kiểu "Sau khi học xong, bạn sẽ...".
- subheadline: 1 câu nói tổng quan kết quả.
- 6 outcomes: mỗi outcome bắt đầu bằng động từ + KỸ NĂNG/KẾT QUẢ CỤ THỂ (vd: "Viết được landing page bán hàng có conversion cao").
  + KHÔNG dùng "hiểu rõ", "nắm vững" — phải là việc làm được.
`.trim();

const curriculumInstructions = `
CURRICULUM — 5 module:
- headline: 1 câu giới thiệu nội dung.
- subheadline: 1 câu nói tổng số bài / tổng thời lượng / cách học.
- Mỗi module:
  + title: 4-7 từ, có cấu trúc (vd: "Nền tảng — Hiểu khách hàng").
  + description: 1-2 câu nói module này dạy gì cụ thể.
  + lessons: dạng "5 bài" hoặc "8 video".
  + duration: dạng "2 giờ", "45 phút".
- Modules đi theo lộ trình logic (cơ bản → nâng cao → áp dụng).
`.trim();

const instructorInstructions = `
INSTRUCTOR (giảng viên):
- name: tên Việt thật.
- title: chức danh chuyên môn (vd: "Founder XYZ — 10 năm kinh nghiệm").
- bio: 3-4 câu kể câu chuyện trở thành chuyên gia. Cụ thể, không sáo.
- 3 credentials: thành tích/kinh nghiệm/chứng chỉ — phải có con số hoặc tên cụ thể.
`.trim();

const pricingInstructions = `
PRICING — 3 gói (cơ bản / pro / vip):
- name: tên gói (vd: "Starter", "Pro", "VIP" — hoặc tiếng Việt).
- tagline: 1 dòng định vị (vd: "Cho người mới muốn thử").
- price: theo thị trường VN
  + Gói 1: 199k - 499k
  + Gói 2: 999k - 1.999k
  + Gói 3: 2.999k - 9.999k
- original_price: gấp 1.3x đến 1.5x price (để hiện "đang giảm").
- badge: gói 2 GIỮ "Phổ biến nhất". Gói 1 và 3 có thể là "Tiết kiệm" / "Đầy đủ nhất".
- features: gói 1 có 5, gói 2 có 6, gói 3 có 6 — gói cao thừa hưởng + thêm.
- cta: "Đăng ký gói này", "Chọn gói này".
- Nếu input có sản phẩm/khoá học, lấy làm cơ sở; không có thì sáng tạo phù hợp.
`.trim();

const ctaInstructions = `
CTA SECTION:
- headline: lời mời cuối, có "bạn".
- subtext: hạ rào cản (vd: "Hoàn tiền 100% trong 7 ngày, không cần lý do").
- button: dưới 5 từ.
`.trim();

const footerInstructions = `
FOOTER:
- tagline: 1 câu sứ mệnh.
- phone: dùng phone có sẵn nếu có.
- email: dạng "hello@<brand>.vn" hoặc "info@<brand>.vn".
- social_note: 1 câu mời theo dõi.
`.trim();

export const khoaHocPrompt = (biz: BizInfo, products: ProductInfo[]) =>
	composePrompt([
		basePromptHeader({
			persona: 'copywriter chuyên về marketing khoá học online (edu-tech) Việt Nam',
			audience:
				'người Việt 22-40 tuổi đang tìm khoá học để nâng cấp kỹ năng — nhạy về chi phí và muốn thấy kết quả cụ thể',
			tone: 'truyền cảm hứng, gần gũi, có bằng chứng kết quả',
		}),
		`THÔNG TIN GIẢNG VIÊN/HỌC VIỆN:\n${formatBiz(biz, 'giảng viên / học viện đào tạo online')}`,
		`KHOÁ HỌC / NỘI DUNG:\n${formatProducts(products, 'Khoá học online về kỹ năng số, marketing, kinh doanh')}`,
		heroInstructions,
		painPointsInstructions,
		whatYouLearnInstructions,
		curriculumInstructions,
		instructorInstructions,
		pricingInstructions,
		testimonialsSection.instructions(testimonialsSection.count),
		faqSection.instructions(faqSection.count),
		ctaInstructions,
		footerInstructions,
		jsonOutputContract(khoaHocSchema),
	]);
