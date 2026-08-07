import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { resetCart } from "../../cart/cartSlice";

import { logout } from "../authSlice";

export const useAuth = () => {
  const dispatch = useAppDispatch();

  const { token, user, initialized } = useAppSelector((state) => state.auth);

  const logoutUser = () => {
    dispatch(logout());
    dispatch(resetCart());
  };

  return {
    token,

    user,
    initialized,
    isAuthenticated: !!token,

    logoutUser,
  };
};
