import { CartProvider } from "@/components/templates/thuc-pham/CartContext";
import CartDrawer from "@/components/templates/thuc-pham/CartDrawer";

export default function ThucPhamLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      {children}
      <CartDrawer />
    </CartProvider>
  );
}
