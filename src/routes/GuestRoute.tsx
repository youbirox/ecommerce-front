import { Navigate } from "react-router-dom";

import { useAuth } from "../features/auth/hooks/useAuth";

interface Props {
  children: React.ReactNode;
}

function GuestRoute({ children }: Props) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/products" replace />;
  }

  return children;
}

export default GuestRoute;
