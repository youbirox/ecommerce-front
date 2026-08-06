import { Navigate } from "react-router-dom";

import { useAuth } from "../features/auth/hooks/useAuth";

interface Props {
  children: React.ReactNode;
}

function AdminRoute({ children }: Props) {
  const { user } = useAuth();

  if (user?.role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default AdminRoute;
