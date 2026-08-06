import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch, RootState } from "../app/store";
import ProductCard from "../features/products/components/ProductCard";
import { fetchProducts } from "../features/products/productsSlice";

function Products() {
  const dispatch = useDispatch<AppDispatch>();

  const { products, loading, error } = useSelector(
    (state: RootState) => state.products,
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Products</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Products;
