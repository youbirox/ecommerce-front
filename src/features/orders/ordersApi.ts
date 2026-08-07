import api from "../../api/axios";
import { ENDPOINTS } from "../../api/endpoints";

import type { CreateOrderRequest, OrderResponse } from "./ordersTypes";

export const createOrder = async (
  data: CreateOrderRequest,
): Promise<OrderResponse> => {
  const response = await api.post<OrderResponse>(
    ENDPOINTS.ORDERS.CREATE,

    data,
  );

  return response.data;
};

export const getMyOrders = async (): Promise<OrderResponse[]> => {
  const response = await api.get<OrderResponse[]>(ENDPOINTS.ORDERS.MY_ORDERS);

  return response.data;
};

export const getOrderById = async (id: number): Promise<OrderResponse> => {
  const response = await api.get<OrderResponse>(`${ENDPOINTS.ORDERS.GET_BY_ID}/${id}`);

  return response.data;
};
