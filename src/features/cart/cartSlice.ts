import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";

import type { CartState } from "./cartTypes";

import type { Product } from "../products/productsTypes";

const savedCart = localStorage.getItem("cart");

const initialState: CartState = {
  items: savedCart ? JSON.parse(savedCart) : [],
};

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(
        (item) => item.product.id === action.payload.id,
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          product: action.payload,

          quantity: 1,
        });
      }
      console.log("Avant:", state.items);

      console.log("Produit ajouté:", action.payload);

      console.log("Existing:", existingItem);

      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    removeFromCart: (
      state,

      action: PayloadAction<number>,
    ) => {
      state.items = state.items.filter(
        (item) => item.product.id !== action.payload,
      );
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    increaseQuantity: (
      state,

      action: PayloadAction<number>,
    ) => {
      const item = state.items.find(
        (item) => item.product.id === action.payload,
      );

      if (item) {
        item.quantity += 1;
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    decreaseQuantity: (
      state,

      action: PayloadAction<number>,
    ) => {
      const item = state.items.find(
        (item) => item.product.id === action.payload,
      );

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,

  removeFromCart,

  increaseQuantity,

  decreaseQuantity,

  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
