import React, { useContext } from "react";
import Logo from "../ui/logo/logo";
import "./header.css";
import { NavLink } from "react-router";
import LoggedAvatar from "../logged-avatar/logged-avatar";
import ToggleTheme from "../toggle-theme/toggle-theme";
import { UserContext } from "../../contexts/user-context/user-context";
import MobileNavbar from "../mobile-navbar/mobile-navbar";

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
  const { user } = useContext(UserContext);

  return (
    <header className="border-b">
      <div className="container-header container">
        <Logo />
        <MobileNavbar />
        <div className="header-links">
          {NAV_LINKS.map(({ to, name }) => (
            <NavLink key={name} to={to}>
              {name}
            </NavLink>
          ))}
          {user ? (
            <>
              <NavLink to="/new-trip">Nuevo viaje</NavLink>
              {user && user.role !== "user" && (
                <NavLink to="/admin">Admin</NavLink>
              )}
              <LoggedAvatar />
            </>
          ) : (
            <div className="header-log-register-container">
              <NavLink className="botonP" to="/login">
                <button className="button button-secondary">
                  Iniciar sesión
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
