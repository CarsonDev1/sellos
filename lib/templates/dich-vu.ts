import {
	basePromptHeader,
	composePrompt,
	formatBiz,
	formatProducts,
	jsonOutputContract,
	type BizInfo,
	type ProductInfo,
} from './_shared';
import { faqSection, testimonialsSection, howItWorksSection } from './_sections';

/**
 * Dịch vụ (Service / B2B / Agency) template.
 *
 * Used by service businesses, agencies, freelancers, B2B firms.
 * Emphasis on: trust, process, case studies, lead capture (booking form).
 */

export const dichVuSchema = {
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
	clients: {
		headline: '',
		logo_names: ['', '', '', '', '', ''],
	},
	services: [
		{
			icon: 'rocket',
			name: '',
			tagline: '',
			description: '',
			deliverables: ['', '', '', ''],
			price_from: '',
			cta: '',
		},
		{
			icon: 'target',
			name: '',
			tagline: '',
			description: '',
			deliverables: ['', '', '', ''],
			price_from: '',
			cta: '',
		},
		{
			icon: 'zap',
			name: '',
			tagline: '',
			description: '',
			deliverables: ['', '', '', ''],
			price_from: '',
			cta: '',
		},
		{
			icon: 'shield',
			name: '',
			tagline: '',
			description: '',
			deliverables: ['', '', '', ''],
			price_from: '',
			cta: '',
		},
	],
	process: howItWorksSection.schema,
	why_us: [
		{ title: '', description: '' },
		{ title: '', description: '' },
		{ title: '', description: '' },
		{ title: '', description: '' },
	],
	case_studies: [
		{
			client: '',
			industry: '',
			challenge: '',
			solution: '',
			result_label: '',
			result_value: '',
		},
		{
			client: '',
			industry: '',
			challenge: '',
			solution: '',
			result_label: '',
			result_value: '',
		},
		{
			client: '',
			industry: '',
			challenge: '',
			solution: '',
			result_label: '',
			result_value: '',
		},
	],
	team: {
		headline: '',
		subheadline: '',
		members: [
			{ name: '', role: '', bio: '' },
			{ name: '', role: '', bio: '' },
			{ name: '', role: '', bio: '' },
		],
	},
	testimonials: testimonialsSection.schema(testimonialsSection.count),
	faq: faqSection.schema(faqSection.count),
	contact: {
		headline: '',
		subtext: '',
		button: '',
		guarantee: '',
	},
	footer: {
		tagline: '',
		address: '',
		phone: '',
		email: '',
		hours: '',
	},
};

export type DichVuContent = typeof dichVuSchema;

/* ── Section instructions ─────────────────────────────────── */

const heroInstructions = `
HERO:
- badge: nhãn ngắn (vd: "Agency Marketing", "Tư vấn pháp lý B2B", "Đội ngũ 8 năm kinh nghiệm").
- headline: 1 câu cụ thể về kết quả khách đạt được, dưới 14 từ.
  + Ví dụ tốt: "Tăng doanh thu B2B với marketing dữ liệu", "Pháp lý cho startup — gọn, nhanh, đúng luật".
- subheadline: 1-2 câu nói rõ làm cho ai và bằng cách nào.
- cta_primary: "Đặt lịch tư vấn miễn phí", "Yêu cầu báo giá".
- cta_secondary: "Xem case study", "Tải brochure".
- 3 stats: con số xây niềm tin (KHÁC LOẠI nhau).
  + Ví dụ tốt: "150+ dự án", "8 năm kinh nghiệm", "Trung bình ROI 3x".
`.trim();

const clientsInstructions = `
CLIENTS:
- headline: 1 câu (vd: "Đã đồng hành cùng các thương hiệu hàng đầu").
- 6 logo_names: tên thương hiệu Việt Nam thật hoặc giả-thật (vd: "Vinamilk", "Highlands Coffee").
  + Phải PHẢN ÁNH ngành mà brand_name phục vụ — không random.
`.trim();

const servicesInstructions = `
SERVICES — 4 dịch vụ chính:
- Mỗi dịch vụ giải quyết một loại vấn đề khác nhau.
- name: tên dịch vụ ngắn (3-5 từ), tiếng Việt (vd: "Tư vấn chiến lược", "Triển khai chiến dịch").
- tagline: 1 dòng nói rõ kết quả (vd: "Lộ trình rõ ràng cho 12 tháng tới").
- description: 1-2 câu mô tả cách làm.
- deliverables: 4 thứ KHÁCH NHẬN ĐƯỢC sau khi mua dịch vụ (cụ thể, đếm được).
- price_from: dạng "Từ 15tr/tháng", "Từ 50tr/dự án" hoặc "Liên hệ" — hợp lý theo VN.
- cta: "Tư vấn dịch vụ này", "Xem chi tiết".
- Nếu có sản phẩm/dịch vụ trong input, ưu tiên dùng.
- Giữ field "icon" — không đổi.
`.trim();

const processInstructions = `
PROCESS — 4 bước làm việc với khách:
- Bước 1 thường là "Lắng nghe / khảo sát".
- Bước 2 thường là "Đề xuất / lên kế hoạch".
- Bước 3 thường là "Triển khai".
- Bước 4 phải là KẾT QUẢ ĐO ĐƯỢC khách nhận về.
- title: động từ + đối tượng.
- description: 1 câu cụ thể (làm gì, mất bao lâu).
`.trim();

const whyUsInstructions = `
WHY US — 4 lý do khác biệt:
- Mỗi lý do KHÁC nhau hoàn toàn (kinh nghiệm / quy trình / cam kết / công nghệ / minh bạch).
- title: 3-5 từ.
- description: 1-2 câu giải thích cụ thể HOẶC có con số.
- Tránh "uy tín", "chuyên nghiệp" sáo rỗng — phải có bằng chứng.
`.trim();

const caseStudiesInstructions = `
CASE STUDIES — 3 dự án tiêu biểu (KHÁC NGÀNH):
- client: tên công ty Việt thật/giả-thật.
- industry: ngành ngắn (vd: "F&B", "Bất động sản", "Thương mại điện tử").
- challenge: 1 câu nói khách gặp vấn đề gì cụ thể.
- solution: 1-2 câu nói chúng tôi đã làm gì.
- result_label: nhãn ngắn (vd: "Tăng doanh thu", "Giảm CAC").
- result_value: con số cụ thể (vd: "+185% trong 6 tháng", "-40% trong Q2").
`.trim();

const teamInstructions = `
TEAM:
- headline: 1 câu giới thiệu đội ngũ (vd: "Đội ngũ chuyên gia với 8+ năm kinh nghiệm").
- subheadline: 1 câu nói thêm về quy mô / vai trò.
- 3 members: mỗi người
  + name: tên Việt thật.
  + role: chức danh cụ thể (vd: "Founder & CEO", "Head of Strategy", "Senior Designer").
  + bio: 1-2 câu kinh nghiệm chuyên môn.
`.trim();

const contactInstructions = `
CONTACT (form gọi điện / đặt lịch):
- headline: lời mời rõ ràng (vd: "Sẵn sàng tăng tốc cùng chúng tôi?").
- subtext: 1 câu hạ rào cản (vd: "Tư vấn 30 phút, hoàn toàn miễn phí, không cam kết").
- button: dưới 5 từ.
- guarantee: 1 câu cam kết (vd: "Phản hồi trong 24 giờ làm việc").
`.trim();

const footerInstructions = `
FOOTER:
- tagline: 1 câu định vị thương hiệu.
- address: địa chỉ giả thực tế ở TP.HCM hoặc Hà Nội (đầy đủ quận).
- phone: dạng "0xxx xxx xxx".
- email: dạng "hello@<brand>.vn" hoặc "contact@<brand>.vn".
- hours: giờ làm việc B2B (vd: "8:00 - 18:00, T2-T6").
`.trim();

export const dichVuPrompt = (biz: BizInfo, products: ProductInfo[]) =>
	composePrompt([
		basePromptHeader({
			persona:
				'copywriter B2B chuyên về marketing dịch vụ chuyên nghiệp / agency / tư vấn doanh nghiệp Việt Nam',
			audience:
				'chủ doanh nghiệp / trưởng phòng quan tâm đến chất lượng và minh bạch trước khi chọn đối tác',
			tone: 'chuyên nghiệp, tự tin, có bằng chứng — không khoe khoang',
		}),
		`THÔNG TIN CÔNG TY/AGENCY:\n${formatBiz(biz, 'agency / công ty dịch vụ chuyên nghiệp')}`,
		`DỊCH VỤ ĐANG CUNG CẤP:\n${formatProducts(products, 'Tư vấn chiến lược, triển khai dự án, hỗ trợ vận hành')}`,
		heroInstructions,
		clientsInstructions,
		servicesInstructions,
		processInstructions,
		whyUsInstructions,
		caseStudiesInstructions,
		teamInstructions,
		testimonialsSection.instructions(testimonialsSection.count),
		faqSection.instructions(faqSection.count),
		contactInstructions,
		footerInstructions,
		jsonOutputContract(dichVuSchema),
	]);
