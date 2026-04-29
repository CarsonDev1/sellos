import FoodNavbar from "@/components/templates/thuc-pham/Navbar";
import FoodHero from "@/components/templates/thuc-pham/Hero";

export const metadata = {
  title: "Organica — Thực Phẩm Hữu Cơ Tươi Sạch",
  description: "Rau củ quả hữu cơ chứng nhận quốc tế — thu hoạch sáng, giao trưa. Giao trong 2 giờ nội thành TP.HCM.",
};

export default function ThucPhamPage() {
  return (
    <main className="min-h-screen bg-white">
      <FoodNavbar />
      <FoodHero />
    </main>
  );
}
