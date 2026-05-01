import ShopNavbar from "@/components/templates/shop-online/ShopNavbar";
import ShopHero from "@/components/templates/shop-online/ShopHero";
import ShopCategories from "@/components/templates/shop-online/ShopCategories";
import ShopFeatured from "@/components/templates/shop-online/ShopFeatured";
import ShopSaleBanner from "@/components/templates/shop-online/ShopSaleBanner";
import ShopNewArrivals from "@/components/templates/shop-online/ShopNewArrivals";
import ShopTestimonials from "@/components/templates/shop-online/ShopTestimonials";
import ShopNewsletter from "@/components/templates/shop-online/ShopNewsletter";
import ShopFooter from "@/components/templates/shop-online/ShopFooter";

export const metadata = {
  title: "NOVA Store — Thời Trang Nữ Cao Cấp",
  description: "Thời trang nữ cao cấp — chất liệu tốt, thiết kế đẹp, giá hợp lý. Hàng mới về mỗi tuần. Giao trong 2h nội thành.",
};

export default function ShopOnlinePage() {
  return (
    <main className="min-h-screen bg-white">
      <ShopNavbar />
      <ShopHero />
      <ShopCategories />
      <ShopFeatured />
      <ShopSaleBanner />
      <ShopNewArrivals />
      <ShopTestimonials />
      <ShopNewsletter />
      <ShopFooter />
    </main>
  );
}
