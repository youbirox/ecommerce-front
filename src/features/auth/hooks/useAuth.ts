import { useAppDispatch, useAppSelector } from "../../../app/hooks";

import { logout } from "../authSlice";

export const useAuth = () => {
  const dispatch = useAppDispatch();

  const { token, user } = useAppSelector((state) => state.auth);

  const logoutUser = () => {
    dispatch(logout());
  };

  return {
    token,

    user,

    isAuthenticated: !!token,

    logoutUser,
  };
};
