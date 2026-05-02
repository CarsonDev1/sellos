import { notFound } from "next/navigation";
import ShopNavbar from "@/components/templates/shop-online/ShopNavbar";
import ShopFooter from "@/components/templates/shop-online/ShopFooter";
import CategoryPage from "@/components/templates/shop-online/CategoryPage";

const VALID_CATEGORIES = ["ao", "quan", "phu-kien", "giay"];

export function generateStaticParams() {
  return VALID_CATEGORIES.map((category) => ({ category }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const labels: Record<string, string> = {
    ao: "Áo Nữ",
    quan: "Quần & Váy",
    "phu-kien": "Phụ Kiện",
    giay: "Giày Dép",
  };
  return {
    title: `${labels[category] ?? "Danh mục"} — NOVA Store`,
    description: `Khám phá bộ sưu tập ${labels[category] ?? ""} mới nhất tại NOVA Store`,
  };
}

export default async function DanhMucPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  if (!VALID_CATEGORIES.includes(category)) notFound();

  return (
    <main className="min-h-screen bg-white">
      <ShopNavbar />
      <CategoryPage category={category} />
      <ShopFooter />
    </main>
  );
}
