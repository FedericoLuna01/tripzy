import React from "react";
import Logo from "../ui/logo/logo";
import "./header.css";
import { NavLink } from "react-router";
import LoggedAvatar from "../logged-avatar/logged-avatar";
import ToggleTheme from "../toggle-theme/toggle-theme";

export const NAV_LINKS = [
  {
    name: "Inicio",
    to: "/",
  },
  {
    name: "Sobre nosotros",
    to: "/about-us",
  },
];

const Header = () => {
  const IS_LOGGED = false;
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
            <>
              <NavLink to="/new-trip">Nuevo viaje</NavLink>
              <LoggedAvatar />
            </>
          ) : (
            <div className="heaer-log-register-container">
              <NavLink className="botonP" to="/register">
                <button className="button button-secondary">
                  Iniciar sesion
                </button>
              </NavLink>
              <NavLink className="botonP" to="/register">
                <button className="button button-primary">Registrarse</button>
              </NavLink>
            </div>
          )}
          <ToggleTheme />
        </div>
      </div>
    </header>
  );
};

export default Header;
