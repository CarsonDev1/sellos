import ShopNavbar from "@/components/templates/shop-online/ShopNavbar";
import ShopFooter from "@/components/templates/shop-online/ShopFooter";
import SalePage from "@/components/templates/shop-online/SalePage";

export const metadata = {
  title: "Sale 50% — NOVA Store",
  description: "Flash sale thời trang nữ NOVA — giảm đến 50%, hàng ngàn mẫu giảm giá mỗi ngày.",
};

export default function SaleRoute() {
  return (
    <main className="min-h-screen bg-white">
      <ShopNavbar />
      <SalePage />
      <ShopFooter />
    </main>
  );
}
