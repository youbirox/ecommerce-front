import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";

import productReducer from "../features/products/productsSlice";

import cartReducer from "../features/cart/cartSlice";

import orderReducer from "../features/orders/ordersSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,

    products: productReducer,

    cart: cartReducer,

    orders: orderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
