import { Navigate, Outlet } from "react-router";
import { useContext } from "react";
import { UserContext } from "../../contexts/user-context/user-context";
import "./protected-routes.css";

const ProtectedRoutes = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="protected-routes-container">
      {user.status === "blocked" && (
        <div className="blocked-layout">
          <h1>Usuario bloqueado</h1>
          <p>Por favor, contacta al administrador para más información.</p>
        </div>
      )}
      <Outlet />
    </div>
  );
};

export default ProtectedRoutes;
