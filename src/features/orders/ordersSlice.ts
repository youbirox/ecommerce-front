import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type { OrderResponse, CreateOrderRequest } from "./ordersTypes";

import {
  createOrder as createOrderApi,
  getMyOrders as getMyOrdersApi,
} from "./ordersApi";

interface OrderState {
  currentOrder: OrderResponse | null;

  orders: OrderResponse[];

  loading: boolean;

  error: string | null;
}

const initialState: OrderState = {
  currentOrder: null,

  loading: false,

  orders: [],

  error: null,
};

// CREATE ORDER

export const createOrder = createAsyncThunk(
  "orders/createOrder",

  async (data: CreateOrderRequest) => {
    return await createOrderApi(data);
  },
);

export const fetchMyOrders = createAsyncThunk(
  "orders/fetchMyOrders",

  async () => {
    return await getMyOrdersApi();
  },
);

const orderSlice = createSlice({
  name: "orders",

  initialState,

  reducers: {
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(fetchMyOrders.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.loading = false;

        state.orders = action.payload;
      })

      .addCase(fetchMyOrders.rejected, (state) => {
        state.loading = false;

        state.error = "Erreur chargement commandes";
      })

      .addCase(createOrder.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;

        state.currentOrder = action.payload;
      })

      .addCase(createOrder.rejected, (state) => {
        state.loading = false;

        state.error = "Erreur création commande";
      });
  },
});

export const { clearCurrentOrder } = orderSlice.actions;

export default orderSlice.reducer;
