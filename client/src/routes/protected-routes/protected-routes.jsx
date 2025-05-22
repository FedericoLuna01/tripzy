import { Navigate, Outlet } from "react-router";
import { useContext } from "react";
import { UserContext } from "../../contexts/user-context/user-context";

const ProtectedRoutes = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role === "admin") {
    return <Outlet />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
