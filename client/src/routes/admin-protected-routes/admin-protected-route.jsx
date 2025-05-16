import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/user-context/user-context";
import { Navigate, Outlet } from "react-router";

const AdminProtectedRoute = () => {
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      return <Navigate to="/login" replace />;
    }
  }, [user]);

  return <Outlet />;
};

export default AdminProtectedRoute;
