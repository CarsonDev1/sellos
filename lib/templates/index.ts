import { thucPhamSchema, thucPhamPrompt, type ThucPhamContent } from './thuc-pham';
import { coachingSchema, coachingPrompt, type CoachingContent } from './coaching';
import { shopOnlineSchema, shopOnlinePrompt, type ShopOnlineContent } from './shop-online';
import { khoaHocSchema, khoaHocPrompt, type KhoaHocContent } from './khoa-hoc';
import { dichVuSchema, dichVuPrompt, type DichVuContent } from './dich-vu';
import { suKienSchema, suKienPrompt, type SuKienContent } from './su-kien';
import type { BizInfo, ProductInfo } from './_shared';

export interface TemplateConfig {
	id: string;
	name: string;
	description: string;
	color: string; // Tailwind gradient classes
	textColor: string;
	previewUrl: string;
	schema: Record<string, unknown>;
	buildPrompt: (biz: BizInfo, products: ProductInfo[]) => string;
	adminSections: AdminSection[];
}

export interface AdminSection {
	key: string;
	label: string;
	icon: string;
	hasProducts: boolean;
	hasOrders: boolean;
	hasBookings: boolean;
}

const ADMIN_PRODUCT_ORDER: AdminSection[] = [
	{ key: 'overview', label: 'Tổng quan', icon: 'chart', hasProducts: true, hasOrders: true, hasBookings: false },
	{ key: 'products', label: 'Sản phẩm', icon: 'box', hasProducts: true, hasOrders: false, hasBookings: false },
	{ key: 'orders', label: 'Đơn hàng', icon: 'shopping', hasProducts: false, hasOrders: true, hasBookings: false },
	{ key: 'content', label: 'Nội dung', icon: 'edit', hasProducts: false, hasOrders: false, hasBookings: false },
	{ key: 'settings', label: 'Cài đặt', icon: 'settings', hasProducts: false, hasOrders: false, hasBookings: false },
];

const ADMIN_BOOKING: AdminSection[] = [
	{ key: 'overview', label: 'Tổng quan', icon: 'chart', hasProducts: false, hasOrders: false, hasBookings: true },
	{ key: 'programs', label: 'Chương trình', icon: 'book', hasProducts: true, hasOrders: false, hasBookings: false },
	{ key: 'bookings', label: 'Đặt lịch', icon: 'calendar', hasProducts: false, hasOrders: false, hasBookings: true },
	{ key: 'content', label: 'Nội dung', icon: 'edit', hasProducts: false, hasOrders: false, hasBookings: false },
	{ key: 'settings', label: 'Cài đặt', icon: 'settings', hasProducts: false, hasOrders: false, hasBookings: false },
];

const ADMIN_LEAD: AdminSection[] = [
	{ key: 'overview', label: 'Tổng quan', icon: 'chart', hasProducts: false, hasOrders: false, hasBookings: true },
	{ key: 'services', label: 'Dịch vụ', icon: 'briefcase', hasProducts: true, hasOrders: false, hasBookings: false },
	{ key: 'leads', label: 'Khách quan tâm', icon: 'users', hasProducts: false, hasOrders: false, hasBookings: true },
	{ key: 'content', label: 'Nội dung', icon: 'edit', hasProducts: false, hasOrders: false, hasBookings: false },
	{ key: 'settings', label: 'Cài đặt', icon: 'settings', hasProducts: false, hasOrders: false, hasBookings: false },
];

const ADMIN_TICKET: AdminSection[] = [
	{ key: 'overview', label: 'Tổng quan', icon: 'chart', hasProducts: false, hasOrders: true, hasBookings: false },
	{ key: 'tickets', label: 'Hạng vé', icon: 'ticket', hasProducts: true, hasOrders: false, hasBookings: false },
	{ key: 'attendees', label: 'Người đăng ký', icon: 'users', hasProducts: false, hasOrders: true, hasBookings: false },
	{ key: 'content', label: 'Nội dung', icon: 'edit', hasProducts: false, hasOrders: false, hasBookings: false },
	{ key: 'settings', label: 'Cài đặt', icon: 'settings', hasProducts: false, hasOrders: false, hasBookings: false },
];

export const TEMPLATES: TemplateConfig[] = [
	{
		id: 'thuc-pham',
		name: 'Thực phẩm & Nông sản',
		description: 'Trang web bán thực phẩm, rau củ, nông sản, đồ ăn sạch',
		color: 'from-green-500 to-emerald-600',
		textColor: 'text-emerald-600',
		previewUrl: '/templates/thuc-pham',
		schema: thucPhamSchema,
		buildPrompt: thucPhamPrompt,
		adminSections: ADMIN_PRODUCT_ORDER,
	},
	{
		id: 'shop-online',
		name: 'Shop Online',
		description: 'Cửa hàng thời trang, phụ kiện, hàng tiêu dùng',
		color: 'from-rose-500 to-pink-600',
		textColor: 'text-rose-600',
		previewUrl: '/templates/shop-online',
		schema: shopOnlineSchema,
		buildPrompt: shopOnlinePrompt,
		adminSections: ADMIN_PRODUCT_ORDER.map((s) =>
			s.key === 'products' ? { ...s, icon: 'tag' } : s
		),
	},
	{
		id: 'coaching',
		name: 'Coaching & Mentoring',
		description: 'Trang web cho coach, mentor, trainer — bán chương trình và nhận booking',
		color: 'from-violet-500 to-purple-600',
		textColor: 'text-violet-600',
		previewUrl: '/templates/coaching',
		schema: coachingSchema,
		buildPrompt: coachingPrompt,
		adminSections: ADMIN_BOOKING,
	},
	{
		id: 'khoa-hoc',
		name: 'Khoá học Online',
		description: 'Trang web bán khoá học cho giảng viên / học viện trực tuyến',
		color: 'from-blue-500 to-indigo-600',
		textColor: 'text-blue-600',
		previewUrl: '/templates/khoa-hoc',
		schema: khoaHocSchema,
		buildPrompt: khoaHocPrompt,
		adminSections: ADMIN_PRODUCT_ORDER.map((s) =>
			s.key === 'products' ? { ...s, label: 'Khoá học', icon: 'book' } : s
		),
	},
	{
		id: 'dich-vu',
		name: 'Dịch vụ & Agency',
		description: 'Trang web cho agency, công ty tư vấn, freelancer dịch vụ B2B',
		color: 'from-indigo-500 to-blue-600',
		textColor: 'text-indigo-600',
		previewUrl: '/templates/dich-vu',
		schema: dichVuSchema,
		buildPrompt: dichVuPrompt,
		adminSections: ADMIN_LEAD,
	},
	{
		id: 'su-kien',
		name: 'Sự kiện & Workshop',
		description: 'Trang web cho hội nghị, workshop, masterclass — bán vé và quản lý người đăng ký',
		color: 'from-teal-500 to-emerald-600',
		textColor: 'text-teal-600',
		previewUrl: '/templates/su-kien',
		schema: suKienSchema,
		buildPrompt: suKienPrompt,
		adminSections: ADMIN_TICKET,
	},
];

export function getTemplate(id: string): TemplateConfig | undefined {
	return TEMPLATES.find((t) => t.id === id);
}

export { normalizeContent } from './_normalize';

export type {
	ThucPhamContent,
	CoachingContent,
	ShopOnlineContent,
	KhoaHocContent,
	DichVuContent,
	SuKienContent,
};
