import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../app/hooks";

import {
  fetchAllOrders,
  changeOrderStatus,
} from "../features/orders/ordersSlice";

function AdminOrders() {
  const dispatch = useAppDispatch();

  const { orders, loading, error } = useAppSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  const handleStatusChange = (id: number, status: string) => {
    dispatch(
      changeOrderStatus({
        id,
        status,
      }),
    );
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-700";

      case "CONFIRMED":
        return "bg-blue-100 text-blue-700";

      case "SHIPPED":
        return "bg-purple-100 text-purple-700";

      case "DELIVERED":
        return "bg-green-100 text-green-700";

      case "CANCELLED":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return <div className="p-6">Chargement des commandes...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600">{error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-3xl font-bold">Gestion des commandes</h1>

      <div className="space-y-6">
        {orders.length === 0 && (
          <p className="text-gray-500">Aucune commande trouvée.</p>
        )}

        {orders.map((order) => (
          <div key={order.id} className="rounded-xl bg-white p-6 shadow-md">
            {/* Header */}

            <div className="flex flex-col justify-between gap-4 md:flex-row">
              <div>
                <h2 className="text-xl font-bold">Commande #{order.id}</h2>

                <p className="text-gray-600">Client : {order.userEmail}</p>

                <p className="text-gray-600">
                  Date : {new Date(order.createdAt).toLocaleDateString()}
                </p>

                <p className="mt-2 text-lg font-bold">
                  Total : {order.totalPrice} €
                </p>
              </div>

              {/* Status */}

              <div className="flex items-center gap-3">
                <span
                  className={`rounded-full px-3 py-1 text-sm font-semibold ${getStatusStyle(
                    order.status,
                  )}`}
                >
                  {order.status}
                </span>

                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  className="rounded-lg border p-2"
                >
                  <option value="PENDING">PENDING</option>

                  <option value="CONFIRMED">CONFIRMED</option>

                  <option value="SHIPPED">SHIPPED</option>

                  <option value="DELIVERED">DELIVERED</option>

                  <option value="CANCELLED">CANCELLED</option>
                </select>
              </div>
            </div>

            {/* Items */}

            <div className="mt-6">
              <h3 className="mb-3 font-bold">Produits</h3>

              <div className="space-y-2">
                {order.items.map((item) => (
                  <div
                    key={item.productId}
                    className="flex justify-between rounded-lg bg-gray-50 p-3"
                  >
                    <span>{item.productName}</span>

                    <span>x{item.quantity}</span>

                    <span className="font-semibold">{item.price} €</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminOrders;
