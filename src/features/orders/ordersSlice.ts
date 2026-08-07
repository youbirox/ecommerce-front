import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type { OrderResponse, CreateOrderRequest } from "./ordersTypes";

import {
  createOrder as createOrderApi,
  getAllOrders,
  getMyOrders as getMyOrdersApi,
  getOrderById,
  updateOrderStatus,
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
export const fetchAllOrders = createAsyncThunk(
  "orders/fetchAllOrders",

  async () => {
    return await getAllOrders();
  },
);
export const changeOrderStatus = createAsyncThunk(
  "orders/changeOrderStatus",

  async ({ id, status }: { id: number; status: string }) => {
    return await updateOrderStatus(id, status);
  },
);

export const fetchOrderById = createAsyncThunk(
  "orders/fetchOrderById",

  async (id: number) => {
    return await getOrderById(id);
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

      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading = false;

        state.currentOrder = action.payload;
      })

      .addCase(fetchOrderById.rejected, (state) => {
        state.loading = false;

        state.error = "Erreur chargement commande";
      })

      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;

        state.orders = action.payload;
      })

      .addCase(fetchAllOrders.rejected, (state) => {
        state.loading = false;

        state.error = "Erreur chargement commandes";
      })

      .addCase(changeOrderStatus.fulfilled, (state, action) => {
        const index = state.orders.findIndex(
          (order) => order.id === action.payload.id,
        );

        if (index !== -1) {
          state.orders[index] = action.payload;
        }
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
