import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { AuthResponse, User } from "./authTypes";

interface AuthState {
  token: string | null;

  user: User | null;

  initialized: boolean;
}

const initialState: AuthState = {
  token: localStorage.getItem("token"),

  user: null,

  initialized: false,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    setInitialized: (state) => {
      state.initialized = true;
    },

    loginSuccess: (state, action: PayloadAction<AuthResponse>) => {
      state.token = action.payload.token;

      localStorage.setItem("token", action.payload.token);
    },

    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },

    logout: (state) => {
      state.token = null;

      state.user = null;

      localStorage.removeItem("token");
    },
  },
});

export const { setInitialized, loginSuccess, setUser, logout } =
  authSlice.actions;

export default authSlice.reducer;
