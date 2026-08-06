import type { Product } from "../productsTypes";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import type { AppDispatch } from "../../../app/store";

import { addToCart } from "../../cart/cartSlice";

interface Props {
  product: Product;
}

function ProductCard({ product }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className="rounded-xl bg-white p-6 shadow-md transition hover:shadow-lg">
      {/* Image */}

      <div className="mb-4 flex h-40 items-center justify-center rounded-lg bg-gray-100">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full rounded-lg object-cover"
          />
        ) : (
          <span className="text-gray-400">No image</span>
        )}
      </div>

      {/* Informations */}

      <h2 className="text-xl font-bold text-gray-800">{product.name}</h2>

      <p className="mt-2 line-clamp-2 text-sm text-gray-600">
        {product.description}
      </p>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-lg font-bold text-blue-600">
          {product.price} €
        </span>

        <span className="text-sm text-gray-500">Stock : {product.stock}</span>
      </div>

      <Link
        to={`/products/${product.id}`}
        className="mt-5 block w-full rounded-lg bg-blue-600 py-2 text-center text-white hover:bg-blue-700"
      >
        Voir détail
      </Link>
      <button
        onClick={() => dispatch(addToCart(product))}
        className="mt-3 w-full rounded-lg bg-green-600 py-2 text-white hover:bg-green-700"
      >
        Ajouter au panier
      </button>
    </div>
  );
}

export default ProductCard;
