import { CartProvider } from "@/components/templates/shop-online/CartContext";
import CartDrawer from "@/components/templates/shop-online/CartDrawer";

export default function ShopOnlineLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      {children}
      <CartDrawer />
    </CartProvider>
  );
}
