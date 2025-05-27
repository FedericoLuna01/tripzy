import {
  Calendar,
  DotsThreeVertical,
  PencilSimple,
  Trash,
} from "phosphor-react";
import { formatFullDate } from "../../utils/utils";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "../../components/ui/menu/menu";
import "./trips-list-view.css";
import { Link, useNavigate } from "react-router";

const TripsListView = ({ trips }) => {
  const navigate = useNavigate();
  return (
    <div className="trips-list-container">
      {trips.map((trip) => (
        <div
          className="card no-shadow trip-list-card"
          key={trip.id}
          onClick={() => {
            navigate(`/trip/${trip.id}`);
          }}
        >
          <img src={trip.imageUrl} alt={`${trip.title} image`} />
          <div className="trip-list-info">
            <h3>{trip.title}</h3>
            <p className="trip-list-description">{trip.description}</p>
            <div className="box-info-date-container">
              <Calendar className="box-info-icon" size={22} />
              <p className="box-info-date">{formatFullDate(trip.startDate)}</p>
            </div>
          </div>
          <Menu className="menu-trip-list-card">
            <MenuButton
              onClick={(e) => e.stopPropagation()}
              className="button button-outline button-square menu-button-trip-list-card"
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
              <MenuItem>
                <span className="menu-item-link destructive">
                  <Trash size={20} /> Eliminar
                </span>
              </MenuItem>
            </MenuItems>
          </Menu>
        </div>
      ))}
    </div>
  );
};

export default TripsListView;
