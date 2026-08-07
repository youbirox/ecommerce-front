import type { Product } from "../products/productsTypes";

export interface CartItem {
  product: Product;

  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

export interface CartPayload {
  userId: number;
}
