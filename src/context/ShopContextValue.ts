
import { createContext } from "react";
import type { Product, CartItem } from "../types/product";

export interface ShopContextType {
  cart: CartItem[];
  wishlist: Product[];

  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;

  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: number) => boolean;

  cartCount: number;
  subtotal: number;
}

export const ShopContext = createContext<ShopContextType | undefined>(
  undefined
);
