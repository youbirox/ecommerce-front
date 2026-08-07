import { Navigate } from "react-router-dom";

import { useAuth } from "../features/auth/hooks/useAuth";

interface Props {
  children: React.ReactNode;
}

function AdminRoute({ children }: Props) {
  const { user, initialized } = useAuth();

  if (!initialized) {
    return <div>Loading...</div>;
  }

  if (!user || user.role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default AdminRoute;
