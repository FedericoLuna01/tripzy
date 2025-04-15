import "./layout.css";
import { Outlet } from "react-router";
import Header from "../header/header";
import Footer from "../footer/footer";

const Layout = () => {
  return (
    <div className="layout">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
