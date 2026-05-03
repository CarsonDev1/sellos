import { thucPhamSchema, thucPhamPrompt, type ThucPhamContent } from "./thuc-pham";
import { coachingSchema, coachingPrompt, type CoachingContent } from "./coaching";
import { shopOnlineSchema, shopOnlinePrompt, type ShopOnlineContent } from "./shop-online";

export interface TemplateConfig {
  id: string;
  name: string;
  description: string;
  color: string;       // Tailwind gradient classes
  textColor: string;
  previewUrl: string;
  schema: Record<string, unknown>;
  buildPrompt: (
    bizInfo: { brand_name: string; description: string | null; phone: string | null; website: string | null },
    products: Array<{ name: string; description: string | null; price: number | null }>
  ) => string;
  adminSections: AdminSection[];
}

export interface AdminSection {
  key: string;
  label: string;
  icon: string;
  // which dynamic tables this template uses
  hasProducts: boolean;
  hasOrders: boolean;
  hasBookings: boolean;
}

export const TEMPLATES: TemplateConfig[] = [
  {
    id: "thuc-pham",
    name: "Thực phẩm & Nông sản",
    description: "Landing page + shop bán thực phẩm, rau củ, nông sản, đồ ăn sạch",
    color: "from-green-500 to-emerald-600",
    textColor: "text-emerald-600",
    previewUrl: "/templates/thuc-pham",
    schema: thucPhamSchema,
    buildPrompt: thucPhamPrompt,
    adminSections: [
      { key: "overview", label: "Tổng quan", icon: "chart", hasProducts: true, hasOrders: true, hasBookings: false },
      { key: "products", label: "Sản phẩm", icon: "box", hasProducts: true, hasOrders: false, hasBookings: false },
      { key: "orders", label: "Đơn hàng", icon: "shopping", hasProducts: false, hasOrders: true, hasBookings: false },
      { key: "content", label: "Nội dung", icon: "edit", hasProducts: false, hasOrders: false, hasBookings: false },
      { key: "settings", label: "Cài đặt", icon: "settings", hasProducts: false, hasOrders: false, hasBookings: false },
    ],
  },
  {
    id: "coaching",
    name: "Coaching & Mentoring",
    description: "Landing page cho coach, mentor, trainer — bán chương trình và nhận booking",
    color: "from-violet-500 to-purple-600",
    textColor: "text-violet-600",
    previewUrl: "/templates/coaching",
    schema: coachingSchema,
    buildPrompt: coachingPrompt,
    adminSections: [
      { key: "overview", label: "Tổng quan", icon: "chart", hasProducts: false, hasOrders: false, hasBookings: true },
      { key: "programs", label: "Chương trình", icon: "book", hasProducts: true, hasOrders: false, hasBookings: false },
      { key: "bookings", label: "Đặt lịch", icon: "calendar", hasProducts: false, hasOrders: false, hasBookings: true },
      { key: "content", label: "Nội dung", icon: "edit", hasProducts: false, hasOrders: false, hasBookings: false },
      { key: "settings", label: "Cài đặt", icon: "settings", hasProducts: false, hasOrders: false, hasBookings: false },
    ],
  },
  {
    id: "shop-online",
    name: "Shop Online",
    description: "Landing page + cửa hàng thời trang, phụ kiện, hàng tiêu dùng",
    color: "from-rose-500 to-pink-600",
    textColor: "text-rose-600",
    previewUrl: "/templates/shop-online",
    schema: shopOnlineSchema,
    buildPrompt: shopOnlinePrompt,
    adminSections: [
      { key: "overview", label: "Tổng quan", icon: "chart", hasProducts: true, hasOrders: true, hasBookings: false },
      { key: "products", label: "Sản phẩm", icon: "tag", hasProducts: true, hasOrders: false, hasBookings: false },
      { key: "orders", label: "Đơn hàng", icon: "shopping", hasProducts: false, hasOrders: true, hasBookings: false },
      { key: "content", label: "Nội dung", icon: "edit", hasProducts: false, hasOrders: false, hasBookings: false },
      { key: "settings", label: "Cài đặt", icon: "settings", hasProducts: false, hasOrders: false, hasBookings: false },
    ],
  },
];

export function getTemplate(id: string): TemplateConfig | undefined {
  return TEMPLATES.find((t) => t.id === id);
}

export type { ThucPhamContent, CoachingContent, ShopOnlineContent };
