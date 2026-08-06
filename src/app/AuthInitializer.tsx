import { useEffect } from "react";

import { getCurrentUser } from "../features/auth/authApi";

import { setUser } from "../features/auth/authSlice";
import { logout } from "../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "./hooks";

export default function AuthInitializer() {
  const dispatch = useAppDispatch();

  const token = useAppSelector((state) => state.auth.token);

  useEffect(() => {
    if (!token) return;

    getCurrentUser()
      .then((user) => {
        dispatch(setUser(user));
      })

      .catch(() => {
        dispatch(logout());
      });
  }, [token, dispatch]);

  return null;
}
