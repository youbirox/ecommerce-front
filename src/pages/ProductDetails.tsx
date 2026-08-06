import { useEffect } from "react";

import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch, RootState } from "../app/store";

import { fetchProductById } from "../features/products/productsSlice";

function ProductDetails() {
  const { id } = useParams();

  const dispatch = useDispatch<AppDispatch>();

  const { selectedProduct, loading } = useSelector(
    (state: RootState) => state.products,
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(Number(id)));
    }
  }, [id, dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!selectedProduct) {
    return <p>Produit introuvable</p>;
  }

  return (
    <div className="rounded-xl bg-white p-8 shadow">
      <h1 className="text-3xl font-bold">{selectedProduct.name}</h1>

      <p className="mt-4 text-gray-600">{selectedProduct.description}</p>

      <p className="mt-6 text-2xl font-bold text-blue-600">
        {selectedProduct.price} €
      </p>

      <p className="mt-2 text-gray-500">Stock : {selectedProduct.stock}</p>
    </div>
  );
}

export default ProductDetails;
