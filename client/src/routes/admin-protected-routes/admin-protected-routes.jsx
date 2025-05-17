import { useContext } from "react";
import { UserContext } from "../../contexts/user-context/user-context";
import { Navigate, Outlet } from "react-router";

const AdminProtectedRoutes = () => {
  const { user } = useContext(UserContext);

  if (!user || user.role === "user") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminProtectedRoutes;
