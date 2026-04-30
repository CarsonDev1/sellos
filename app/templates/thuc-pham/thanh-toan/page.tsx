import FoodNavbar from "@/components/templates/thuc-pham/Navbar";
import Footer from "@/components/templates/thuc-pham/Footer";
import CheckoutPage from "@/components/templates/thuc-pham/CheckoutPage";

export const metadata = {
  title: "Thanh toán — Organica",
};

export default function ThanhToanPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <FoodNavbar />
      <CheckoutPage />
      <Footer />
    </main>
  );
}
