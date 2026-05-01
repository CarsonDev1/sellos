import ShopNavbar from "@/components/templates/shop-online/ShopNavbar";
import ShopFooter from "@/components/templates/shop-online/ShopFooter";
import CartPage from "@/components/templates/shop-online/CartPage";

export const metadata = {
  title: "Giỏ hàng — NOVA Store",
};

export default function GioHangPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <ShopNavbar />
      <CartPage />
      <ShopFooter />
    </main>
  );
}
