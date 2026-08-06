import api from "../../api/axios";

import { ENDPOINTS } from "../../api/endpoints";

import type { Product } from "./productsTypes";

interface ProductPage {
  content: Product[];

  totalElements: number;
}

export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get<ProductPage>(ENDPOINTS.PRODUCTS);

  return response.data.content;
};

export const getProductById = async (id: number): Promise<Product> => {
  const response = await api.get<Product>(`${ENDPOINTS.PRODUCTS}/${id}`);

  return response.data;
};
