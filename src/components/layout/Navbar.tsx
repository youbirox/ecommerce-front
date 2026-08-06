import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { useAuth } from "../../features/auth/hooks/useAuth";

function Navbar() {
  const { user, isAuthenticated, logoutUser } = useAuth();

  const cartItems = useSelector((state: RootState) => state.cart.items);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="border-b bg-white">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}

        <Link to="/" className="text-xl font-bold text-blue-600">
          Shop App
        </Link>

        {/* Menu */}

        <div className="flex items-center gap-6">
          <Link to="/" className="text-gray-700 hover:text-blue-600">
            Home
          </Link>

          <Link to="/products" className="text-gray-700 hover:text-blue-600">
            Products
          </Link>

          {isAuthenticated && (
            <Link to="/orders" className="text-gray-700 hover:text-blue-600">
              My Orders
            </Link>
          )}

          <Link to="/cart" className="text-gray-700 hover:text-blue-600">
            Cart ({cartCount})
          </Link>

          {user?.role === "ADMIN" && (
            <Link
              to="/admin/products"
              className="text-gray-700 hover:text-blue-600"
            >
              Admin
            </Link>
          )}

          {!isAuthenticated ? (
            <Link
              to="/login"
              className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Login
            </Link>
          ) : (
            <>
              <span className="text-sm text-gray-600">{user?.email}</span>

              <button
                onClick={logoutUser}
                className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
