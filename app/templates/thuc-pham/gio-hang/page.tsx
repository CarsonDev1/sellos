import FoodNavbar from "@/components/templates/thuc-pham/Navbar";
import Footer from "@/components/templates/thuc-pham/Footer";
import CartPage from "@/components/templates/thuc-pham/CartPage";

export const metadata = {
  title: "Giỏ hàng — Organica",
};

export default function GioHangPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <FoodNavbar />
      <CartPage />
      <Footer />
    </main>
  );
}
