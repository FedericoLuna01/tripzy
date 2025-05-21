import React from "react";
import { Link, Outlet, useLocation } from "react-router";

const AdminLayout = () => {
  const location = useLocation();

  return (
    <div className="container">
      <div className="card tabs-container">
        <Link
          className={`tab ${
            location.pathname === `/members` ? "selected" : ""
          }`}
          to={`/admin`}
        >
          Usuarios
        </Link>
        <Link
          className={`tab ${location.pathname === `/trip` ? "selected" : ""}`}
          to={`/admin/trips`}
        >
          Viajes
        </Link>
      </div>
      <Outlet />
    </div>
  );
};

export default AdminLayout;
