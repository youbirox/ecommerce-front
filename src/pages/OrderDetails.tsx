import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../app/hooks";

import { fetchOrderById } from "../features/orders/ordersSlice";

function OrderDetails() {
  const { id } = useParams();

  const dispatch = useAppDispatch();

  const { currentOrder, loading, error } = useAppSelector(
    (state) => state.orders,
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchOrderById(Number(id)));
    }
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="p-6">
        <p>Chargement de la commande...</p>
      </div>
    );
  }

  if (error) {
    return <div className="p-6 text-red-600">{error}</div>;
  }

  if (!currentOrder) {
    return (
      <div className="p-6">
        <p>Aucune commande trouvée.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <Link
        to="/orders"
        className="mb-6 inline-block text-blue-600 hover:underline"
      >
        ← Retour aux commandes
      </Link>

      <h1 className="text-3xl font-bold">Commande #{currentOrder.id}</h1>

      <div className="mt-6 rounded-xl bg-white p-6 shadow">
        <div className="flex justify-between">
          <div>
            <p>
              Statut :
              <span className="ml-2 font-bold">{currentOrder.status}</span>
            </p>

            <p className="mt-2">
              Date : {new Date(currentOrder.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div>
            <p className="text-xl font-bold text-blue-600">
              Total : {currentOrder.totalPrice} €
            </p>
          </div>
        </div>
      </div>

      <h2 className="mt-8 text-2xl font-bold">Produits commandés</h2>

      <div className="mt-4 space-y-4">
        {currentOrder.items.map((item) => (
          <div key={item.productId} className="rounded-xl bg-white p-5 shadow">
            <h3 className="text-xl font-bold">{item.productName}</h3>

            <div className="mt-3 flex justify-between text-gray-600">
              <span>Quantité : {item.quantity}</span>

              <span>Prix unitaire : {item.price} €</span>
            </div>

            <p className="mt-3 font-semibold">
              Sous-total : {(item.price * item.quantity).toFixed(2)} €
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderDetails;
