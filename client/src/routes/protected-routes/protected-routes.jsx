import { Outlet, useNavigate } from "react-router";
import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/user-context/user-context";

const ProtectedRoutes = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  // TODO: Arreglar xq con f5 te manda al login igual
  // useEffect(() => {
  //   if (!user) {
  //     navigate("/login");
  //   }
  // }, [user, navigate]);

  return <Outlet />;
};

export default ProtectedRoutes;
