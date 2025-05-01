import { Outlet, useNavigate } from "react-router";
import { useEffect } from "react";
import { getProfile } from "../../services/getProfile";

const ProtectedRoutes = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const data = await getProfile();
      if (data) {
        return;
      } else {
        return navigate("/login");
      }
    };

    getUser();
  }, [navigate]);

  return <Outlet />;
};

export default ProtectedRoutes;
