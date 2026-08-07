import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";

import MainLayout from "../layouts/MainLayout";

import Login from "../pages/Login";
import Products from "../pages/Products";
import Orders from "../pages/Orders";
import AdminProducts from "../pages/AdminProducts";
import GuestRoute from "./GuestRoute";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import OrderDetails from "../pages/OrderDetails";

function AppRoutes() {
  return (
    <Routes>
      {/* Page sans Navbar */}

      <Route
        path="/login"
        element={
          <GuestRoute>
            <Login />
          </GuestRoute>
        }
      />

      {/* Pages avec Navbar */}

      <Route element={<MainLayout />}>
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/products"
          element={
            <AdminRoute>
              <AdminProducts />
            </AdminRoute>
          }
        />

        <Route
          path="/orders/:id"
          element={
            <ProtectedRoute>
              <OrderDetails />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
