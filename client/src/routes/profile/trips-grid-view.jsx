import { Link, useNavigate } from "react-router";
import { formatFullDate } from "../../utils/utils";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "../../components/ui/menu/menu";
import {
  PencilSimple,
  Trash,
  Calendar,
  DotsThreeVertical,
} from "phosphor-react";
import "./trips-grid-view.css";

const TripsGridView = ({ trips }) => {
  const navigate = useNavigate();
  return (
    <div className="trips-container">
      {trips.map((trip, index) => (
        <div
          key={index}
          onClick={() => {
            navigate(`/trip/${trip.id}`);
          }}
          className="box-info shadow"
        >
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
              <MenuItem>
                <span className="menu-item-link destructive">
                  <Trash size={20} /> Eliminar
                </span>
              </MenuItem>
            </MenuItems>
          </Menu>
          <img src={trip.imageUrl} alt={`${trip.title} image`} />
          <div className="box-info-data">
            <h3>{trip.title}</h3>
            <p className="box-info-description">{trip.description}</p>
            <div className="box-info-date-container">
              <Calendar className="box-info-icon" size={22} />
              <p className="box-info-date">{formatFullDate(trip.startDate)}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TripsGridView;
