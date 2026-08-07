import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";

import type { CartState } from "./cartTypes";

import type { Product } from "../products/productsTypes";

const getCartKey = (userId: number) => {
  return `cart_${userId}`;
};

const initialState: CartState = {
  items: [],
};

const saveCart = (userId: number, items: CartState["items"]) => {
  localStorage.setItem(getCartKey(userId), JSON.stringify(items));
};

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    loadCart: (state, action: PayloadAction<number>) => {
      const savedCart = localStorage.getItem(getCartKey(action.payload));

      state.items = savedCart ? JSON.parse(savedCart) : [];
    },

    addToCart: (
      state,
      action: PayloadAction<{
        product: Product;
        userId: number;
      }>,
    ) => {
      const { product, userId } = action.payload;

      const existingItem = state.items.find(
        (item) => item.product.id === product.id,
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          product,

          quantity: 1,
        });
      }

      saveCart(userId, state.items);
    },

    removeFromCart: (
      state,
      action: PayloadAction<{
        productId: number;
        userId: number;
      }>,
    ) => {
      const { productId, userId } = action.payload;

      state.items = state.items.filter((item) => item.product.id !== productId);

      saveCart(userId, state.items);
    },

    increaseQuantity: (
      state,
      action: PayloadAction<{
        productId: number;
        userId: number;
      }>,
    ) => {
      const { productId, userId } = action.payload;

      const item = state.items.find((item) => item.product.id === productId);

      if (item) {
        item.quantity += 1;
      }

      saveCart(userId, state.items);
    },

    decreaseQuantity: (
      state,
      action: PayloadAction<{
        productId: number;
        userId: number;
      }>,
    ) => {
      const { productId, userId } = action.payload;

      const item = state.items.find((item) => item.product.id === productId);

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }

      saveCart(userId, state.items);
    },

    clearCart: (state, action: PayloadAction<number>) => {
      state.items = [];

      localStorage.removeItem(getCartKey(action.payload));
    },

    resetCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  loadCart,

  addToCart,

  removeFromCart,

  increaseQuantity,

  decreaseQuantity,
  resetCart,

  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
