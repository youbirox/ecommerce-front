import { useSelector } from "react-redux";

import type { RootState } from "../app/store";

import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../features/cart/cartSlice";

import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { createOrder } from "../features/orders/ordersSlice";
import { clearCart } from "../features/cart/cartSlice";

import { useDispatch } from "react-redux";

import type { AppDispatch } from "../app/store";

function Cart() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const items = useSelector((state: RootState) => state.cart.items);

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,

    0,
  );

  if (items.length === 0) {
    return (
      <div className="rounded-lg bg-white p-8 text-center shadow">
        <h1 className="text-2xl font-bold">Votre panier est vide</h1>
      </div>
    );
  }

  const handleOrder = async () => {
    const orderData = {
      items: items.map((item) => ({
        productId: item.product.id,

        quantity: item.quantity,
      })),
    };

    try {
      await dispatch(createOrder(orderData)).unwrap();

      dispatch(clearCart());

      navigate("/orders");
    } catch (error) {
      console.log("Erreur commande", error);
    }
  };

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Mon panier</h1>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.product.id}
            className="flex items-center justify-between rounded-lg bg-white p-6 shadow"
          >
            <div>
              <h2 className="text-xl font-bold">{item.product.name}</h2>

              <p className="text-gray-600">{item.product.price} €</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => dispatch(decreaseQuantity(item.product.id))}
                className="rounded bg-gray-200 px-3 py-1"
              >
                -
              </button>

              <span className="font-bold">{item.quantity}</span>

              <button
                onClick={() => dispatch(increaseQuantity(item.product.id))}
                className="rounded bg-gray-200 px-3 py-1"
              >
                +
              </button>

              <button
                onClick={() => dispatch(removeFromCart(item.product.id))}
                className="ml-4 rounded bg-red-500 px-3 py-1 text-white"
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-lg bg-white p-6 shadow">
        <h2 className="text-2xl font-bold">Total : {total.toFixed(2)} €</h2>

        <button
          onClick={handleOrder}
          className="mt-4 rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
        >
          {" "}
          Passer commande
        </button>
      </div>
    </div>
  );
}

export default Cart;
