import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type { ProductState } from "./productsTypes";

import { getProducts, getProductById } from "./productsApi";

// GET ALL PRODUCTS

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",

  async () => {
    return await getProducts();
  },
);

// GET PRODUCT BY ID

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",

  async (id: number) => {
    return await getProductById(id);
  },
);

// Initial state

const initialState: ProductState = {
  products: [],

  selectedProduct: null,

  loading: false,

  error: null,
};

const productSlice = createSlice({
  name: "products",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      // =========================
      // GET ALL PRODUCTS
      // =========================

      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;

        state.products = action.payload;
      })

      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;

        state.error = "Erreur chargement produits";
      })

      // =========================
      // GET PRODUCT BY ID
      // =========================

      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;

        state.selectedProduct = action.payload;
      })

      .addCase(fetchProductById.rejected, (state) => {
        state.loading = false;

        state.error = "Erreur chargement produit";
      });
  },
});

export default productSlice.reducer;
