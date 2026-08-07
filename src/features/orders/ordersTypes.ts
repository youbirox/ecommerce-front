export interface OrderItemRequest {
  productId: number;

  quantity: number;
}

export interface CreateOrderRequest {
  items: OrderItemRequest[];
}

export interface OrderItemResponse {
  id: number;

  productId: number;

  productName: string;

  quantity: number;

  price: number;
}

export interface OrderResponse {
  id: number;

  status: string;

  totalPrice: number;

  createdAt: string;

  userEmail: string;

  items: OrderItemResponse[];
}
