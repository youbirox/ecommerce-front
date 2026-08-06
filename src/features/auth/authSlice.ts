import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { AuthResponse, User } from "./authTypes";

interface AuthState {
  token: string | null;
  user: User | null;
}

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  user: null,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    loginSuccess: (state, action: PayloadAction<AuthResponse>) => {
      state.token = action.payload.token;

      localStorage.setItem("token", action.payload.token);
    },

    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },

    logout: (state) => {
      state.token = null;

      localStorage.removeItem("token");
    },
  },
});

export const { loginSuccess, setUser, logout } = authSlice.actions;

export default authSlice.reducer;
