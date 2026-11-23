export type { Product } from "../data/products";

export interface CartItem {
  product: import("../data/products").Product;
  quantity: number;
}