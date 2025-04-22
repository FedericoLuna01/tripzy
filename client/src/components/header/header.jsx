import React from "react";
import Logo from "../ui/logo/logo";
import "./header.css";
import { NavLink } from "react-router";

export const NAV_LINKS = [
  {
    name: "Inicio",
    to: "/",
  },
  {
    name: "Sobre nosotros",
    to: "/aboutUs",
  },
  {
    name: "Mis viajes",
    to: "/trips",
  },
  {
    name: "Nuevo viaje",
    to: "/new-trip",
  },
];

const Header = () => {
  return (
    <header className="border-b">
      <div className="container-header container">
        <Logo />
        <div className="header-links">
          {NAV_LINKS.map(({ to, name }) => (
            <NavLink key={name} to={to}>
              {name}
            </NavLink>
          ))}
          <NavLink className="botonP" to="/login">
            <button className="button button-primary">Iniciar sesión</button>
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
