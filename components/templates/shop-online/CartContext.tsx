"use client";

import { createContext, useContext, useReducer, useCallback } from "react";
import type { Product } from "./data";

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: string;
  selectedSize: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type CartAction =
  | { type: "ADD_ITEM"; product: Product; selectedColor: string; selectedSize: string }
  | { type: "REMOVE_ITEM"; key: string }
  | { type: "UPDATE_QUANTITY"; key: string; quantity: number }
  | { type: "CLEAR_CART" }
  | { type: "OPEN_CART" }
  | { type: "CLOSE_CART" };

export function cartKey(productId: string, color: string, size: string) {
  return `${productId}::${color}::${size}`;
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const key = cartKey(action.product.id, action.selectedColor, action.selectedSize);
      const existing = state.items.find(
        (i) => cartKey(i.product.id, i.selectedColor, i.selectedSize) === key
      );
      return {
        ...state,
        isOpen: true,
        items: existing
          ? state.items.map((i) =>
              cartKey(i.product.id, i.selectedColor, i.selectedSize) === key
                ? { ...i, quantity: i.quantity + 1 }
                : i
            )
          : [...state.items, { product: action.product, quantity: 1, selectedColor: action.selectedColor, selectedSize: action.selectedSize }],
      };
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter(
          (i) => cartKey(i.product.id, i.selectedColor, i.selectedSize) !== action.key
        ),
      };
    case "UPDATE_QUANTITY":
      if (action.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(
            (i) => cartKey(i.product.id, i.selectedColor, i.selectedSize) !== action.key
          ),
        };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          cartKey(i.product.id, i.selectedColor, i.selectedSize) === action.key
            ? { ...i, quantity: action.quantity }
            : i
        ),
      };
    case "CLEAR_CART":
      return { ...state, items: [] };
    case "OPEN_CART":
      return { ...state, isOpen: true };
    case "CLOSE_CART":
      return { ...state, isOpen: false };
    default:
      return state;
  }
}

interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  itemCount: number;
  total: number;
  addItem: (product: Product, selectedColor: string, selectedSize: string) => void;
  removeItem: (key: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false });

  const addItem = useCallback(
    (product: Product, selectedColor: string, selectedSize: string) =>
      dispatch({ type: "ADD_ITEM", product, selectedColor, selectedSize }),
    []
  );
  const removeItem = useCallback((key: string) => dispatch({ type: "REMOVE_ITEM", key }), []);
  const updateQuantity = useCallback(
    (key: string, quantity: number) => dispatch({ type: "UPDATE_QUANTITY", key, quantity }),
    []
  );
  const clearCart = useCallback(() => dispatch({ type: "CLEAR_CART" }), []);
  const openCart = useCallback(() => dispatch({ type: "OPEN_CART" }), []);
  const closeCart = useCallback(() => dispatch({ type: "CLOSE_CART" }), []);

  const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const total = state.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items: state.items, isOpen: state.isOpen, itemCount, total, addItem, removeItem, updateQuantity, clearCart, openCart, closeCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
