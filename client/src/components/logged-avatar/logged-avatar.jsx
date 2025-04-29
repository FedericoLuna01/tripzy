import { Link, useNavigate } from "react-router";
import { SignOut, User } from "phosphor-react";
import { Menu, MenuButton, MenuItem, MenuItems } from "../ui/menu/menu";
import { USERS_AVATARS } from "../../data/data";
import Avatar from "../avatar/avatar";
import "./logged-avatar.css";

const LoggedAvatar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Menu>
      <MenuButton className="menu-button-logged">
        <Avatar user={USERS_AVATARS[0]} />
      </MenuButton>
      <MenuItems anchor="bottom end" className="menu-items-logged">
        <MenuItem>
          <Link className="menu-item-link" to={`/profile`}>
            <User size={20} />
            Perfil
          </Link>
        </MenuItem>
        <MenuItem>
          <span className="menu-item-link destructive" onClick={handleLogout}>
            <SignOut size={20} /> Cerrar sesión
          </span>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
};

export default LoggedAvatar;
