import { notFound } from "next/navigation";
import { getProductById, getRelatedProducts, PRODUCTS } from "@/components/templates/thuc-pham/data";
import FoodNavbar from "@/components/templates/thuc-pham/Navbar";
import Footer from "@/components/templates/thuc-pham/Footer";
import ProductDetail from "@/components/templates/thuc-pham/ProductDetail";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: String(p.id) }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = getProductById(Number(id));
  if (!product) return { title: "Sản phẩm không tồn tại" };
  return {
    title: `${product.name} — Organica`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = getProductById(Number(id));
  if (!product) notFound();

  const related = getRelatedProducts(product, 4);

  return (
    <main className="min-h-screen bg-white">
      <FoodNavbar />
      <ProductDetail product={product} related={related} />
      <Footer />
    </main>
  );
}
