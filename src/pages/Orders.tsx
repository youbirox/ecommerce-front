import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../app/hooks";

import { fetchMyOrders } from "../features/orders/ordersSlice";

function Orders() {
  const dispatch = useAppDispatch();

  const { orders, loading, error } = useAppSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Mes commandes</h1>

      <div className="space-y-5">
        {orders.map((order) => (
          <div key={order.id} className="rounded-lg bg-white p-6 shadow">
            <h2 className="text-xl font-bold">Commande #{order.id}</h2>

            <p>
              Statut :<span className="font-semibold">{order.status}</span>
            </p>

            <p>
              Total :<span className="font-semibold">{order.totalPrice} €</span>
            </p>

            <p className="text-sm text-gray-500">{order.createdAt}</p>

            <div className="mt-4">
              <h3 className="font-bold">Produits</h3>

              {order.items.map((item) => (
                <p key={item.id}>
                  {item.productName}
                  {" x "}
                  {item.quantity}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
