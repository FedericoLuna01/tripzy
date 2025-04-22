import "./footer.css";
import Logo from "../ui/logo/logo";
import { NavLink } from "react-router";
import { NAV_LINKS } from "../header/header";

const Footer = () => {
  return (
    <footer>
      <div className="container footer-container">
        <div className="footer-top">
          <div className="logo-container">
            <Logo />
            <p>
              Nosotros creemos que cada viaje es una oportunidad de aventura,
              descubrimientos y experiencias inolvidables.
            </p>
          </div>
          <div className="links-container">
            <div className="links">
              <p>Navegación</p>
              {NAV_LINKS.map(({ to, name }) => (
                <NavLink key={name} to={to}>
                  {name}
                </NavLink>
              ))}
            </div>
            <div className="links">
              <p>Soporte</p>
              <a href="#">Ayuda</a>
              <a href="#">Términos</a>
              <a href="#">Política de privacidad</a>
            </div>
            <div className="links">
              <p>Redes</p>
              <a href="#">Instagram</a>
              <a href="#">Facebook</a>
              <a href="#">Twitter</a>
            </div>
          </div>
        </div>
        <p>2025 Tripz. Todos los derechos reservados</p>
      </div>
    </footer>
  );
};

export default Footer;
