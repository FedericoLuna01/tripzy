import { PencilSimple, Trash, DotsThreeVertical } from "phosphor-react";
import { Link } from "react-router";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "../../components/ui/menu/menu";
import "./trip-card-menu.css";
import { UserContext } from "../../contexts/user-context/user-context";
import { useContext } from "react";

const TripCardMenu = ({ trip, handleOpenModal }) => {
  const { user } = useContext(UserContext);

  const userTripRole = trip.tripUsers.find(
    (tripUser) => tripUser.userId === user.id
  )?.role;

  if (userTripRole === "viewer") {
    return null;
  }

  return (
    <Menu className="menu-trip-card">
      <MenuButton
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="menu-button-trip-card button button-secondary button-square"
      >
        <DotsThreeVertical size={20} />
      </MenuButton>
      <MenuItems anchor="bottom end" className="menu-items-logged">
        <MenuItem>
          <Link
            onClick={(e) => e.stopPropagation()}
            className="menu-item-link"
            to={`/trip/edit/${trip.id}`}
          >
            <PencilSimple size={20} />
            Editar
          </Link>
        </MenuItem>
        {(userTripRole === "owner" || user.role.includes("admin")) && (
          <MenuItem>
            {({ close }) => (
              <span
                className="menu-item-link destructive"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenModal(trip);
                  close();
                }}
              >
                <Trash size={20} /> Eliminar
              </span>
            )}
          </MenuItem>
        )}
      </MenuItems>
    </Menu>
  );
};

export default TripCardMenu;
