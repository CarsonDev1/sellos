/**
 * Reusable schema fragments + section-specific prompt instructions.
 *
 * A template composes the schema by spreading these fragments:
 *
 *   const schema = {
 *     ...seoSection.schema,
 *     hero: heroSection.schema,
 *     ...
 *   };
 *
 * And composes the prompt by joining the matching `instructions`:
 *
 *   composePrompt([
 *     basePromptHeader(...),
 *     bizContext,
 *     seoSection.instructions,
 *     heroSection.instructions,
 *     ...
 *     jsonOutputContract(schema),
 *   ]);
 *
 * To improve a section's output quality across all templates,
 * edit the section's `instructions` here once.
 */

/* ── SEO ───────────────────────────────────────────────────── */

export const seoSection = {
	schema: {
		seo: { title: '', description: '' },
	},
	instructions: `
SEO:
- title: dài 50-60 ký tự, có brand_name + giá trị chính + từ khóa người Việt hay tìm.
- description: 140-155 ký tự, mời gọi click, không nhồi nhét từ khóa.
`.trim(),
};

/* ── Hero (with CTAs + trust signals) ──────────────────────── */

export const heroSection = {
	schema: {
		badge: '',
		headline: '',
		subheadline: '',
		cta_primary: '',
		cta_secondary: '',
	},
	instructions: `
HERO:
- badge: 1 dòng ngắn (3-6 từ) — gắn nhãn loại sản phẩm hoặc tình trạng (vd: "Coaching 1-1", "Bộ sưu tập Hè 2025", "Đăng ký sớm — giảm 30%").
- headline: 1 câu mạnh, dưới 14 từ, có lợi ích cụ thể HOẶC con số HOẶC kết quả thấy được.
  + KHÔNG bắt đầu bằng "Chào mừng đến...", "Là...".
  + Nên có cấu trúc "[Kết quả khách muốn] cho [đối tượng] trong [thời gian/cách thức]".
- subheadline: 1-2 câu nối tiếp headline, làm rõ cho ai và bằng cách nào.
- cta_primary: động từ + đối tượng (vd: "Đặt lịch tư vấn miễn phí", "Mua ngay - Tặng kèm áo").
- cta_secondary: action ít cam kết hơn (vd: "Xem chương trình", "Tải brochure").
`.trim(),
};

/* ── Hero stats (3 numbers + labels) ───────────────────────── */

export const heroStatsSection = {
	schema: {
		stat1_number: '',
		stat1_label: '',
		stat2_number: '',
		stat2_label: '',
		stat3_number: '',
		stat3_label: '',
	},
	instructions: `
HERO STATS — 3 con số chứng minh uy tín:
- Phải cụ thể, có thể dán vào câu và hợp lý theo thị trường VN. KHÔNG dùng số tròn vô lý ("1000+ khách").
- Mỗi number ngắn (vd: "200+", "4.9★", "5 năm").
- Mỗi label ngắn dưới 5 từ (vd: "khách hàng đã mua", "đánh giá trung bình").
- 3 con số phải khác loại (vd: số khách, năm hoạt động, đánh giá) — không lặp.
`.trim(),
};

/* ── About / Story ─────────────────────────────────────────── */

export const aboutSection = {
	schema: {
		headline: '',
		body: '',
		highlight1_title: '',
		highlight1_desc: '',
		highlight2_title: '',
		highlight2_desc: '',
		highlight3_title: '',
		highlight3_desc: '',
	},
	instructions: `
ABOUT / STORY:
- headline: tiêu đề ngắn nói về nguồn gốc / sứ mệnh.
- body: 2-4 câu kể câu chuyện thương hiệu một cách thật. Tránh khoe khoang chung chung — kể chi tiết hành động.
- 3 highlights: mỗi highlight 1 trong các loại sau (chọn cho phù hợp): nguồn gốc, cam kết, quy trình, đội ngũ, công nghệ.
  + title: 2-4 từ.
  + desc: 1 câu cụ thể.
`.trim(),
};

/* ── Why us / USPs (4 reasons with icon hint) ──────────────── */

export const whyUsSection = {
	schema: [
		{ icon: 'leaf', title: '', description: '' },
		{ icon: 'shield', title: '', description: '' },
		{ icon: 'truck', title: '', description: '' },
		{ icon: 'star', title: '', description: '' },
	],
	instructions: `
WHY US — 4 lý do chọn chúng tôi:
- Mỗi lý do KHÁC nhau hoàn toàn (không lặp ý).
- title: 3-5 từ, kết quả cho khách (vd: "Giao hàng trong 2 giờ", "Hoàn tiền nếu không đủ tươi").
- description: 1-2 câu giải thích cụ thể (cách làm, cam kết, công nghệ).
- Giữ nguyên field "icon" — tên icon mặc định, không đổi.
`.trim(),
};

/* ── How it works / Process (4 steps) ─────────────────────── */

export const howItWorksSection = {
	schema: [
		{ step: '01', title: '', description: '' },
		{ step: '02', title: '', description: '' },
		{ step: '03', title: '', description: '' },
		{ step: '04', title: '', description: '' },
	],
	instructions: `
HOW IT WORKS — 4 bước khách trải qua, từ đầu tới khi nhận giá trị:
- title: động từ + đối tượng (vd: "Đặt lịch tư vấn", "Nhận lộ trình riêng").
- description: 1 câu mô tả cụ thể chuyện gì xảy ra ở bước đó.
- Bước 4 phải là kết quả khách đạt được, KHÔNG phải hành động của shop.
`.trim(),
};

/* ── Testimonials (with rating + measurable result) ────────── */

export const testimonialsSection = {
	count: 3,
	schema: (count: number) =>
		Array.from({ length: count }, () => ({
			name: '',
			role: '',
			quote: '',
			result: '',
			rating: 5,
		})),
	instructions: (count: number) =>
		`
TESTIMONIALS — ${count} đánh giá:
- name: tên Việt Nam thật, đa dạng vùng miền.
- role: nghề nghiệp + thành phố (vd: "Mẹ 2 con, TP.HCM", "Freelancer designer, Hà Nội").
- quote: 1-2 câu, kể chi tiết một khoảnh khắc cụ thể (KHÔNG nói chung chung "rất tốt", "rất hài lòng").
- result: con số đo được (vd: "Tăng 40% doanh thu", "Giảm 5kg trong 8 tuần", "3 đơn đầu tiên trong 24h").
- rating: 5 (giữ nguyên).
- Mỗi testimonial phải nói về MỘT ĐIỂM khác nhau — không lặp.
`.trim(),
};

/* ── FAQ ───────────────────────────────────────────────────── */

export const faqSection = {
	count: 4,
	schema: (count: number) => Array.from({ length: count }, () => ({ q: '', a: '' })),
	instructions: (count: number) =>
		`
FAQ — ${count} câu hỏi người mua thực sự lo lắng:
- Bao gồm các loại: giá/hoàn tiền, quy trình, thời gian, bảo hành/cam kết.
- Câu hỏi phải GIỐNG cách người Việt nói (vd: "Tôi không biết X có làm được không?").
- Trả lời 2-4 câu, dứt khoát, có ví dụ cụ thể nếu được.
- Không né câu khó (giá đắt, thời gian giao, hoàn tiền) — đối mặt thẳng.
`.trim(),
};

/* ── CTA section ───────────────────────────────────────────── */

export const ctaSection = {
	schema: {
		headline: '',
		subtext: '',
		button: '',
	},
	instructions: `
CTA SECTION:
- headline: câu thúc đẩy cuối cùng, ngắn, có "bạn" trong câu.
- subtext: 1 câu giảm rào cản (vd: "Tư vấn miễn phí, không cam kết mua").
- button: động từ mạnh, dưới 5 từ.
`.trim(),
};

/* ── Footer ────────────────────────────────────────────────── */

export const footerSection = {
	schema: {
		tagline: '',
		address: '',
		phone: '',
		email: '',
		hours: '',
	},
	instructions: `
FOOTER:
- tagline: 1 câu ngắn nói về sứ mệnh (5-10 từ).
- address: dùng địa chỉ giả nhưng hợp lý ở VN (TP.HCM hoặc Hà Nội).
- phone: dạng "0xxx xxx xxx".
- email: dạng "hello@brand.vn" hoặc "lienhe@brand.vn" (dựa brand_name).
- hours: giờ mở cửa thực tế (vd: "8:00 - 21:00, T2-CN").
`.trim(),
};

/* ── Newsletter ────────────────────────────────────────────── */

export const newsletterSection = {
	schema: {
		headline: '',
		subtext: '',
		button: '',
	},
	instructions: `
NEWSLETTER:
- headline: ưu đãi nhận được khi đăng ký (vd: "Giảm 10% đơn đầu tiên cho người mới").
- subtext: 1 câu thêm, nói rõ tần suất gửi mail (không spam).
- button: dưới 4 từ (vd: "Đăng ký nhận ưu đãi").
`.trim(),
};
