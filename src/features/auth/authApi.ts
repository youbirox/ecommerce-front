import api from "../../api/axios";
import { ENDPOINTS } from "../../api/endpoints";
import type { AuthResponse, LoginRequest, User } from "./authTypes";

export const login = async (data: LoginRequest): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>(ENDPOINTS.AUTH.LOGIN, data);

  return response.data;
};

export const getCurrentUser = async (): Promise<User> => {
  const response = await api.get<User>(ENDPOINTS.USERS.ME);

  return response.data;
};
