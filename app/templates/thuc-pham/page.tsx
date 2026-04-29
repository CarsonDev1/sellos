import FoodNavbar from "@/components/templates/thuc-pham/Navbar";
import FoodHero from "@/components/templates/thuc-pham/Hero";
import Benefits from "@/components/templates/thuc-pham/Benefits";
import Products from "@/components/templates/thuc-pham/Products";
import Story from "@/components/templates/thuc-pham/Story";
import Testimonials from "@/components/templates/thuc-pham/Testimonials";
import Newsletter from "@/components/templates/thuc-pham/Newsletter";
import Footer from "@/components/templates/thuc-pham/Footer";

export const metadata = {
  title: "Organica — Thực Phẩm Hữu Cơ Tươi Sạch",
  description: "Rau củ quả hữu cơ chứng nhận quốc tế — thu hoạch sáng, giao trưa. Giao trong 2 giờ nội thành TP.HCM.",
};

export default function ThucPhamPage() {
  return (
    <main className="min-h-screen bg-white">
      <FoodNavbar />
      <FoodHero />
      <Benefits />
      <Products />
      <Story />
      <Testimonials />
      <Newsletter />
      <Footer />
    </main>
  );
}
