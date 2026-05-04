/**
 * Shared types and prompt-building helpers used by every template.
 *
 * Each template's prompt is composed from:
 *   1. A base header (brand persona, audience, language rules)
 *   2. Business + product context (consistent format)
 *   3. Section-specific instructions (in `sections.ts`)
 *   4. JSON output contract (matching the section schemas)
 *
 * This separation lets us iterate on individual sections without
 * touching the rest of the prompt — and lets new templates compose
 * sections like LEGO instead of writing one giant string.
 */

export interface BizInfo {
	brand_name: string;
	description: string | null;
	phone: string | null;
	website: string | null;
}

export interface ProductInfo {
	name: string;
	description: string | null;
	price: number | null;
}

/* ── Formatting helpers ────────────────────────────────────────── */

export function formatProductLine(p: ProductInfo, i: number): string {
	const price = p.price ? ` — ${p.price.toLocaleString('vi-VN')}đ` : '';
	const desc = p.description ? ` — ${p.description}` : '';
	return `${i + 1}. ${p.name}${price}${desc}`;
}

export function formatProducts(products: ProductInfo[], fallback: string): string {
	if (products.length === 0) return fallback;
	return products.map(formatProductLine).join('\n');
}

export function formatBiz(biz: BizInfo, fallbackDescription: string): string {
	return [
		`- Tên thương hiệu: ${biz.brand_name}`,
		`- Mô tả ngắn: ${biz.description ?? fallbackDescription}`,
		biz.phone ? `- Điện thoại: ${biz.phone}` : null,
		biz.website ? `- Website: ${biz.website}` : null,
	]
		.filter(Boolean)
		.join('\n');
}

/* ── Base prompt blocks ─────────────────────────────────────── */

export interface BasePromptOptions {
	persona: string; // who the AI is roleplaying (e.g. "copywriter chuyên về coaching tiếng Việt")
	audience: string; // who the page is for (e.g. "người Việt cân nhắc đầu tư vào coaching")
	tone: string; // tone hint (e.g. "chuyên nghiệp, truyền cảm hứng, kết quả cụ thể")
	language?: string; // default: tiếng Việt tự nhiên
}

export function basePromptHeader({
	persona,
	audience,
	tone,
	language = 'tiếng Việt tự nhiên (không dịch máy, không dùng từ ngữ sáo rỗng)',
}: BasePromptOptions): string {
	return [
		`Bạn là ${persona}.`,
		`Mục tiêu: viết nội dung trang web cho ${audience}.`,
		`Tone: ${tone}.`,
		`Ngôn ngữ: ${language}.`,
		'',
		'NGUYÊN TẮC VIẾT:',
		'1. Headline phải cụ thể, có con số hoặc kết quả rõ ràng — KHÔNG dùng câu sáo "chất lượng hàng đầu", "uy tín #1".',
		'2. Mỗi đoạn ngắn, dễ đọc trên điện thoại. Tối đa 2-3 câu mỗi đoạn.',
		'3. Khi nhắc đến lợi ích, nói rõ "lợi ích cho ai, đo bằng gì" — không nói chung chung.',
		'4. Tránh tiếng Anh không cần thiết. Dùng tiếng Anh khi đó là từ thông dụng (ví dụ: workshop, coaching, freelancer).',
		'5. Tên người, địa danh, sản phẩm phải mang chất Việt Nam — không dùng tên Tây ngẫu nhiên.',
	].join('\n');
}

/* ── JSON output contract ──────────────────────────────────── */

export function jsonOutputContract(schema: Record<string, unknown>): string {
	return [
		'',
		'ĐẦU RA:',
		'Trả về JSON hợp lệ theo đúng schema dưới đây.',
		'KHÔNG bọc trong ```json. KHÔNG thêm comment. KHÔNG bỏ field.',
		'Mọi mảng phải đủ số phần tử như schema mẫu.',
		'',
		'SCHEMA:',
		JSON.stringify(schema, null, 2),
	].join('\n');
}

/* ── Composition helper ────────────────────────────────────── */

export function composePrompt(parts: string[]): string {
	return parts.filter(Boolean).join('\n\n').trim();
}
