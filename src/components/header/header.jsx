import React from "react";
import Logo from "../ui/logo/logo";
import "./header.css";
const Header = () => {
  return (
    <div className="container-header">
      <Logo />
      <div className="header-links">
        <a className="link" href="">
          Sobre Nosotros
        </a>
        <a className="link" href="">
          Planes
        </a>
        <a className="link" href="">
          Viajes
        </a>
        <button className="button">Iniciar sesión</button>
      </div>
    </div>
  );
};

export default Header;
