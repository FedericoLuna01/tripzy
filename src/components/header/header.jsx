import React from "react";
import Logo from "../ui/logo/logo";
import "./header.css";

const Header = () => {
  return (
    <header className="border-b">
      <div className="container-header container">
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
    </header>
  );
};

export default Header;
