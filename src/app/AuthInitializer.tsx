import { useEffect } from "react";

import { getCurrentUser } from "../features/auth/authApi";

import { setUser } from "../features/auth/authSlice";
import { logout } from "../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "./hooks";
import { setInitialized } from "../features/auth/authSlice";

export default function AuthInitializer() {
  const dispatch = useAppDispatch();

  const token = useAppSelector((state) => state.auth.token);

  useEffect(() => {
    if (!token) {
      dispatch(setInitialized());
      return;
    }

    getCurrentUser()
      .then((user) => {
        dispatch(setUser(user));
      })
      .catch(() => {
        dispatch(logout());
      })
      .finally(() => {
        dispatch(setInitialized());
      });
  }, [token, dispatch]);

  return null;
}
