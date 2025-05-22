import { Outlet } from "react-router";

const AdminLayout = () => {
  return (
    <div className="container">
      <Outlet />
    </div>
  );
};

export default AdminLayout;
