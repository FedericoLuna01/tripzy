import { SignOut, User } from "phosphor-react";
import toast from "react-hot-toast";
import { Link } from "react-router";
import { useContext } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "../ui/menu/menu";
import { UserContext } from "../../contexts/user-context/user-context";
import Avatar from "../avatar/avatar";
import "./logged-avatar.css";

const LoggedAvatar = () => {
  const { handleUserLogout, user } = useContext(UserContext);
  const handleLogout = () => {
    toast.success("Sesión cerrada correctamente");
    handleUserLogout();
  };

  return (
    <Menu>
      <MenuButton className="menu-button-logged">
        <Avatar user={user} />
      </MenuButton>
      <MenuItems anchor="bottom end" className="menu-items-logged">
        <MenuItem>
          {({ close }) => (
            <Link className="menu-item-link" to={`/profile`} onClick={close}>
              <User size={20} />
              Perfil
            </Link>
          )}
        </MenuItem>
        <MenuItem>
          {({ close }) => (
            <span
              className="menu-item-link destructive"
              onClick={() => {
                handleLogout();
                close();
              }}
            >
              <SignOut size={20} /> Cerrar sesión
            </span>
          )}
        </MenuItem>
      </MenuItems>
    </Menu>
  );
};

export default LoggedAvatar;
