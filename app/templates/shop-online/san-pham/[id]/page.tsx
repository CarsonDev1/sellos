import { notFound } from "next/navigation";
import { PRODUCTS, getProductById, getRelatedProducts } from "@/components/templates/shop-online/data";
import ProductDetail from "@/components/templates/shop-online/ProductDetail";
import ShopNavbar from "@/components/templates/shop-online/ShopNavbar";
import ShopFooter from "@/components/templates/shop-online/ShopFooter";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) return {};
  return {
    title: `${product.name} — NOVA Store`,
    description: product.description.slice(0, 155),
  };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();

  const related = getRelatedProducts(product, 4);

  return (
    <main className="min-h-screen bg-white">
      <ShopNavbar />
      <ProductDetail product={product} related={related} />
      <ShopFooter />
    </main>
  );
}
