import { useDispatch } from "react-redux";

import type { AppDispatch } from "../app/store";

import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "../features/cart/cartSlice";

import { useAppSelector } from "../app/hooks";

import { useAuth } from "../features/auth/hooks/useAuth";

function Cart() {
  const dispatch = useDispatch<AppDispatch>();

  const { user } = useAuth();

  const items = useAppSelector((state) => state.cart.items);

  if (!user) {
    return (
      <div className="p-6 text-center">
        Veuillez vous connecter pour voir votre panier.
      </div>
    );
  }

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  return (
    <div className="mx-auto max-w-5xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Mon panier</h1>

      {items.length === 0 ? (
        <div className="rounded-lg bg-gray-100 p-6 text-center">
          Votre panier est vide.
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.product.id}
              className="flex items-center justify-between rounded-xl bg-white p-5 shadow"
            >
              <div className="flex items-center gap-4">
                {item.product.imageUrl && (
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="h-20 w-20 rounded-lg object-cover"
                  />
                )}

                <div>
                  <h2 className="text-lg font-bold">{item.product.name}</h2>

                  <p className="text-gray-600">{item.product.price} €</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    dispatch(
                      decreaseQuantity({
                        productId: item.product.id,
                        userId: user.id,
                      }),
                    )
                  }
                  className="rounded bg-gray-200 px-3 py-1"
                >
                  -
                </button>

                <span className="font-bold">{item.quantity}</span>

                <button
                  onClick={() =>
                    dispatch(
                      increaseQuantity({
                        productId: item.product.id,
                        userId: user.id,
                      }),
                    )
                  }
                  className="rounded bg-gray-200 px-3 py-1"
                >
                  +
                </button>

                <button
                  onClick={() =>
                    dispatch(
                      removeFromCart({
                        productId: item.product.id,
                        userId: user.id,
                      }),
                    )
                  }
                  className="rounded bg-red-600 px-3 py-1 text-white"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}

          <div className="mt-6 flex items-center justify-between rounded-xl bg-gray-100 p-5">
            <div className="text-xl font-bold">
              Total : {total.toFixed(2)} €
            </div>

            <button
              onClick={() => dispatch(clearCart(user.id))}
              className="rounded-lg bg-red-600 px-5 py-2 text-white"
            >
              Vider le panier
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
