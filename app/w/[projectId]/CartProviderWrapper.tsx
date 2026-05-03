"use client";

import { createContext, useContext, useReducer, useCallback } from "react";
import type { ProjectProduct } from "@/lib/supabase/projects";

interface CartItem {
  product: ProjectProduct;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type CartAction =
  | { type: "ADD"; product: ProjectProduct; size?: string; color?: string }
  | { type: "REMOVE"; id: string }
  | { type: "UPDATE_QTY"; id: string; qty: number }
  | { type: "CLEAR" }
  | { type: "OPEN" }
  | { type: "CLOSE" };

interface CartContextValue extends CartState {
  addItem: (product: ProjectProduct, size?: string, color?: string) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  itemCount: number;
  total: number;
}

const CartContext = createContext<CartContextValue | null>(null);

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD": {
      const key = `${action.product.id}-${action.size}-${action.color}`;
      const exists = state.items.find(
        (i) => `${i.product.id}-${i.selectedSize}-${i.selectedColor}` === key
      );
      return {
        ...state,
        isOpen: true,
        items: exists
          ? state.items.map((i) =>
              `${i.product.id}-${i.selectedSize}-${i.selectedColor}` === key
                ? { ...i, quantity: i.quantity + 1 }
                : i
            )
          : [...state.items, { product: action.product, quantity: 1, selectedSize: action.size, selectedColor: action.color }],
      };
    }
    case "REMOVE":
      return { ...state, items: state.items.filter((i) => i.product.id !== action.id) };
    case "UPDATE_QTY":
      return {
        ...state,
        items: state.items.map((i) =>
          i.product.id === action.id ? { ...i, quantity: Math.max(1, action.qty) } : i
        ),
      };
    case "CLEAR":
      return { ...state, items: [] };
    case "OPEN":
      return { ...state, isOpen: true };
    case "CLOSE":
      return { ...state, isOpen: false };
    default:
      return state;
  }
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be inside CartProviderWrapper");
  return ctx;
}

export default function CartProviderWrapper({ children, projectId }: { children: React.ReactNode; projectId: string }) {
  const [state, dispatch] = useReducer(reducer, { items: [], isOpen: false });

  const addItem = useCallback((p: ProjectProduct, size?: string, color?: string) => dispatch({ type: "ADD", product: p, size, color }), []);
  const removeItem = useCallback((id: string) => dispatch({ type: "REMOVE", id }), []);
  const updateQty = useCallback((id: string, qty: number) => dispatch({ type: "UPDATE_QTY", id, qty }), []);
  const clearCart = useCallback(() => dispatch({ type: "CLEAR" }), []);
  const openCart = useCallback(() => dispatch({ type: "OPEN" }), []);
  const closeCart = useCallback(() => dispatch({ type: "CLOSE" }), []);

  const itemCount = state.items.reduce((s, i) => s + i.quantity, 0);
  const total = state.items.reduce((s, i) => s + (i.product.price ?? 0) * i.quantity, 0);

  return (
    <CartContext.Provider value={{ ...state, addItem, removeItem, updateQty, clearCart, openCart, closeCart, itemCount, total }}>
      {children}
      <CartDrawer projectId={projectId} />
    </CartContext.Provider>
  );
}

function CartDrawer({ projectId }: { projectId: string }) {
  const { isOpen, items, closeCart, removeItem, updateQty, total } = useCart();

  function fmt(n: number) { return n.toLocaleString("vi-VN") + "đ"; }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/40" onClick={closeCart} />
      <div className="relative w-full max-w-sm bg-white h-full flex flex-col shadow-2xl">
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h3 className="font-heading font-bold text-slate-900">Giỏ hàng ({items.length})</h3>
          <button onClick={closeCart} className="p-2 hover:bg-slate-100 rounded-lg">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {items.length === 0 ? (
            <p className="text-center text-slate-400 text-sm py-12">Giỏ hàng trống</p>
          ) : items.map((item) => (
            <div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-3">
              <div className="w-16 h-16 rounded-xl bg-slate-100 overflow-hidden shrink-0">
                {item.product.image_url && <img src={item.product.image_url} alt={item.product.name} className="w-full h-full object-cover" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 line-clamp-1">{item.product.name}</p>
                {item.selectedSize && <p className="text-xs text-slate-400">Size: {item.selectedSize}</p>}
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQty(item.product.id, item.quantity - 1)} disabled={item.quantity <= 1} className="w-6 h-6 rounded-md bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 disabled:opacity-40 text-xs font-bold">−</button>
                    <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                    <button onClick={() => updateQty(item.product.id, item.quantity + 1)} className="w-6 h-6 rounded-md bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 text-xs font-bold">+</button>
                  </div>
                  <span className="text-sm font-semibold text-slate-900">{fmt((item.product.price ?? 0) * item.quantity)}</span>
                </div>
              </div>
              <button onClick={() => removeItem(item.product.id)} className="p-1 text-slate-300 hover:text-red-400 self-start">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
        {items.length > 0 && (
          <div className="px-5 py-4 border-t space-y-3">
            <div className="flex justify-between text-sm font-semibold text-slate-900">
              <span>Tổng cộng</span>
              <span>{fmt(total)}</span>
            </div>
            <a href={`/w/${projectId}/thanh-toan`} onClick={closeCart}
              className="flex items-center justify-center w-full py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-xl transition-colors">
              Thanh toán
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
