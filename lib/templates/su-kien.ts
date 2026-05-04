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
 * Sự kiện (Event) template.
 *
 * For workshops, conferences, summits, launches, masterclasses, expos.
 * Schema covers: hero with date/location, speakers, agenda, ticket tiers,
 * venue, sponsors, FAQ, urgency CTA.
 */

export const suKienSchema = {
	seo: { title: '', description: '' },
	hero: {
		badge: '',
		headline: '',
		subheadline: '',
		date: '',
		time: '',
		location: '',
		format: '',
		cta_primary: '',
		cta_secondary: '',
	},
	highlights: [
		{ icon: 'users', title: '', description: '' },
		{ icon: 'mic', title: '', description: '' },
		{ icon: 'lightbulb', title: '', description: '' },
		{ icon: 'network', title: '', description: '' },
	],
	about: {
		headline: '',
		body: '',
		stat1_number: '',
		stat1_label: '',
		stat2_number: '',
		stat2_label: '',
		stat3_number: '',
		stat3_label: '',
	},
	speakers: {
		headline: '',
		subheadline: '',
		list: [
			{ name: '', title: '', topic: '' },
			{ name: '', title: '', topic: '' },
			{ name: '', title: '', topic: '' },
			{ name: '', title: '', topic: '' },
		],
	},
	agenda: {
		headline: '',
		day_label: '',
		sessions: [
			{ time: '', title: '', speaker: '', type: '' },
			{ time: '', title: '', speaker: '', type: '' },
			{ time: '', title: '', speaker: '', type: '' },
			{ time: '', title: '', speaker: '', type: '' },
			{ time: '', title: '', speaker: '', type: '' },
			{ time: '', title: '', speaker: '', type: '' },
		],
	},
	tickets: [
		{
			name: '',
			tagline: '',
			price: 0,
			original_price: 0,
			badge: '',
			features: ['', '', '', ''],
			seats_left: '',
			cta: '',
		},
		{
			name: '',
			tagline: '',
			price: 0,
			original_price: 0,
			badge: 'Phổ biến nhất',
			features: ['', '', '', '', ''],
			seats_left: '',
			cta: '',
		},
		{
			name: '',
			tagline: '',
			price: 0,
			original_price: 0,
			badge: '',
			features: ['', '', '', '', '', ''],
			seats_left: '',
			cta: '',
		},
	],
	venue: {
		name: '',
		address: '',
		directions: '',
		parking: '',
		notes: '',
	},
	sponsors: {
		headline: '',
		platinum: ['', ''],
		gold: ['', '', '', ''],
	},
	past_attendees: testimonialsSection.schema(testimonialsSection.count),
	faq: faqSection.schema(faqSection.count),
	final_cta: {
		headline: '',
		subtext: '',
		urgency: '',
		button: '',
	},
	footer: {
		tagline: '',
		organizer: '',
		phone: '',
		email: '',
		social_note: '',
	},
};

export type SuKienContent = typeof suKienSchema;

/* ── Section instructions ─────────────────────────────────── */

const heroInstructions = `
HERO:
- badge: ngắn (vd: "Workshop 1 ngày", "Hội nghị thường niên").
- headline: 1 câu, mạnh mẽ, có TÊN sự kiện hoặc CHỦ ĐỀ chính (dưới 14 từ).
- subheadline: 1 câu nói rõ event này dành cho ai và sẽ học/nhận được gì.
- date: dạng đầy đủ ngày + tháng + năm (vd: "Thứ 7, 15/03/2026").
- time: dạng giờ rõ ràng (vd: "8:30 - 17:00").
- location: tên địa điểm + thành phố (vd: "Trung tâm Hội nghị GEM Center, TP.HCM").
- format: "Trực tiếp", "Online", hoặc "Hybrid".
- cta_primary: "Đăng ký ngay", "Mua vé", "Nhận chỗ".
- cta_secondary: "Xem lịch trình", "Tải brochure".
`.trim();

const highlightsInstructions = `
HIGHLIGHTS — 4 điểm nổi bật khách nhận được:
- Mỗi điểm KHÁC nhau (kết nối / kiến thức / trải nghiệm / cơ hội).
- title: 3-5 từ.
- description: 1 câu cụ thể về giá trị nhận được.
- Giữ field "icon" — không đổi.
`.trim();

const aboutInstructions = `
ABOUT EVENT:
- headline: 1 câu giới thiệu sự kiện (vd: "Hội nghị lớn nhất ngành F&B năm 2026").
- body: 2-3 câu kể về sự kiện — chủ đề, định dạng, đối tượng tham dự.
- 3 stats: con số làm event "hoành tráng" (KHÁC LOẠI nhau).
  + Ví dụ tốt: "1,500+ khách dự kiến", "20+ diễn giả", "5 năm tổ chức".
`.trim();

const speakersInstructions = `
SPEAKERS — 4 diễn giả nổi bật:
- headline: 1 câu giới thiệu (vd: "Học từ những người đang dẫn đầu ngành").
- subheadline: 1 câu mở rộng.
- Mỗi speaker:
  + name: tên Việt thật (hoặc tên thật nếu là người nổi tiếng đang sống).
  + title: chức danh cụ thể (vd: "Founder ABC Studio").
  + topic: chủ đề trình bày (vd: "Xây dựng thương hiệu cá nhân từ 0").
`.trim();

const agendaInstructions = `
AGENDA — 6 phiên trong ngày:
- headline: 1 câu (vd: "Lịch trình chi tiết 1 ngày").
- day_label: dạng "Ngày 1 — 15/03" hoặc đơn giản "Lịch trình".
- 6 sessions theo thứ tự thời gian (sáng → chiều):
  + time: dạng "9:00 - 9:30", "10:30 - 12:00".
  + title: tên phiên cụ thể.
  + speaker: tên diễn giả (hoặc "Cả đội ngũ", "Networking").
  + type: 1 trong: "Keynote", "Panel", "Workshop", "Networking", "Break", "Q&A".
- Phải có ít nhất 1 break + 1 networking + 1 keynote.
`.trim();

const ticketsInstructions = `
TICKETS — 3 hạng vé:
- Vé 1 (Early Bird / Standard): rẻ nhất, ít tính năng — 4 features.
- Vé 2 (Premium / VIP): TRUNG, phổ biến — 5 features. Giữ badge "Phổ biến nhất".
- Vé 3 (Platinum / Sponsor): cao nhất — 6 features (gồm gặp riêng diễn giả, VIP lounge...).
- price: hợp lý theo VN
  + Vé 1: 199k - 990k
  + Vé 2: 1.499k - 3.999k
  + Vé 3: 4.999k - 14.999k
- original_price: gấp 1.2-1.4x price.
- name: tên hạng vé (vd: "Standard", "Premium", "Platinum").
- tagline: 1 dòng định vị.
- features: lợi ích cụ thể, đếm được.
- seats_left: dạng "Còn 23 chỗ", "Sắp hết", "Đã hết" — gây urgency.
- cta: "Mua vé này".
`.trim();

const venueInstructions = `
VENUE:
- name: tên địa điểm thật/giả-thật (vd: "GEM Center", "Khách sạn Rex").
- address: địa chỉ đầy đủ (số nhà + đường + quận + thành phố).
- directions: 1-2 câu hướng dẫn đi lại (gần ga metro nào, đường nào dễ đến).
- parking: 1 câu về bãi đỗ xe (có/không/giá).
- notes: 1 câu lưu ý (vd: "Vui lòng có mặt trước 30 phút để check-in").
`.trim();

const sponsorsInstructions = `
SPONSORS:
- headline: 1 câu (vd: "Đồng hành cùng chúng tôi").
- platinum: 2 thương hiệu lớn (giả-thật, có thật ở VN).
- gold: 4 thương hiệu (giả-thật, ngành phù hợp với chủ đề event).
`.trim();

const pastAttendeesInstructions = `
PAST ATTENDEES — 3 đánh giá người đã tham dự kỳ trước:
- name: tên Việt thật.
- role: chức danh + công ty (vd: "Marketing Manager, Tech Startup").
- quote: 1-2 câu cụ thể về giá trị nhận được — networking / kiến thức / cơ hội.
- result: kết quả đo được sau event (vd: "Đóng được 3 hợp đồng B2B sau 1 tháng").
- 3 testimonials nói về 3 ĐIỂM khác nhau.
`.trim();

const finalCtaInstructions = `
FINAL CTA:
- headline: lời mời cuối, có sense of urgency.
- subtext: 1 câu giảm rào cản.
- urgency: 1 câu tạo cảm giác sắp hết (vd: "Còn 47 chỗ — đăng ký kết thúc 25/02").
- button: dưới 5 từ.
`.trim();

const footerInstructions = `
FOOTER:
- tagline: 1 câu sứ mệnh sự kiện.
- organizer: dạng "Tổ chức bởi <brand_name>".
- phone, email: liên hệ đăng ký.
- social_note: 1 câu mời theo dõi tin tức event.
`.trim();

export const suKienPrompt = (biz: BizInfo, products: ProductInfo[]) =>
	composePrompt([
		basePromptHeader({
			persona:
				'copywriter sự kiện / hội nghị / workshop chuyên nghiệp Việt Nam',
			audience:
				'người quan tâm đến chủ đề event, đang cân nhắc mua vé tham dự — cần thấy chương trình rõ ràng và giá trị nhận được',
			tone: 'truyền cảm hứng, có sự kiện cụ thể, có urgency',
		}),
		`THÔNG TIN BAN TỔ CHỨC:\n${formatBiz(biz, 'đơn vị tổ chức sự kiện chuyên nghiệp')}`,
		`CHỦ ĐỀ / NỘI DUNG SỰ KIỆN:\n${formatProducts(products, 'Workshop / hội nghị về kỹ năng số, marketing, kinh doanh')}`,
		heroInstructions,
		highlightsInstructions,
		aboutInstructions,
		speakersInstructions,
		agendaInstructions,
		ticketsInstructions,
		venueInstructions,
		sponsorsInstructions,
		pastAttendeesInstructions,
		faqSection.instructions(faqSection.count),
		finalCtaInstructions,
		footerInstructions,
		jsonOutputContract(suKienSchema),
	]);
