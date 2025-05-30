import { useContext, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { List, X } from "phosphor-react";
import "./mobile-navbar.css";
import { NAV_LINKS } from "../header/header";
import { UserContext } from "../../contexts/user-context/user-context";
import { NavLink } from "react-router";
import ToggleTheme from "../toggle-theme/toggle-theme";
import toast from "react-hot-toast";

const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, handleUserLogout } = useContext(UserContext);

  const handleLogout = () => {
    toast.success("Sesión cerrada correctamente");
    handleUserLogout();
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="navbar-mobile">
      <ToggleTheme />
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="button button-square button-outline button-menu"
      >
        {isOpen ? <X size={22} /> : <List size={22} />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="navbar-backdrop"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="navbar-panel"
            >
              <div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="button button-square button-outline button-close"
                >
                  <X size={24} />
                </button>
                <nav className="navbar-menu">
                  <ul className="navbar-menu-list">
                    {NAV_LINKS.map((item, index) => (
                      <li key={index}>
                        <NavLink
                          to={item.to}
                          className="navbar-menu-link"
                          onClick={() => setIsOpen(false)}
                        >
                          {item.name}
                        </NavLink>
                      </li>
                    ))}
                    {user ? (
                      <>
                        <li>
                          <NavLink className="navbar-menu-link" to="/new-trip">
                            Nuevo viaje
                          </NavLink>
                        </li>
                        {user && user.role !== "user" && (
                          <NavLink
                            to="/admin"
                            className="navbar-menu-link"
                            onClick={() => setIsOpen(false)}
                          >
                            Admin
                          </NavLink>
                        )}
                        <li>
                          <NavLink
                            className="navbar-menu-link"
                            to="/profile"
                            onClick={() => setIsOpen(false)}
                          >
                            Perfil
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            className="navbar-menu-link destructive"
                            to="/profile"
                            onClick={() => {
                              handleLogout();
                              setIsOpen(false);
                            }}
                          >
                            Cerrar sesión
                          </NavLink>
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          <NavLink
                            className="button button-secondary"
                            to="/login"
                            onClick={() => setIsOpen(false)}
                          >
                            Iniciar sesión
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            className="button button-primary"
                            to="/register"
                            onClick={() => setIsOpen(false)}
                          >
                            Registrarse
                          </NavLink>
                        </li>
                      </>
                    )}
                  </ul>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileNavbar;
