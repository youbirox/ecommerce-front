export interface Product {
  id: number;

  name: string;

  description: string;

  price: number;

  stock: number;

  imageUrl?: string;
}

export interface ProductState {
  products: Product[];

  loading: boolean;

  error: string | null;

  selectedProduct: Product | null;
}
