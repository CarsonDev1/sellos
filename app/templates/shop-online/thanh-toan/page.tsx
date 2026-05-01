import ShopNavbar from "@/components/templates/shop-online/ShopNavbar";
import ShopFooter from "@/components/templates/shop-online/ShopFooter";
import CheckoutPage from "@/components/templates/shop-online/CheckoutPage";

export const metadata = {
  title: "Thanh toán — NOVA Store",
};

export default function ThanhToanPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <ShopNavbar />
      <CheckoutPage />
      <ShopFooter />
    </main>
  );
}
