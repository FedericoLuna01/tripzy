import React from "react";
import Logo from "../ui/logo/logo";
import "./header.css";
import { NavLink } from "react-router";
import LoggedAvatar from "../logged-avatar/logged-avatar";

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
    name: "Nuevo viaje",
    to: "/new-trip",
  },
];

const Header = () => {
  const IS_LOGGED = true;
  const IS_ADMIN = false;

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
          {IS_ADMIN && <NavLink to="/admin">Admin</NavLink>}
          {IS_LOGGED ? (
            <LoggedAvatar />
          ) : (
            <NavLink className="botonP" to="/register">
              <button className="button button-primary">Registrarse</button>
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
