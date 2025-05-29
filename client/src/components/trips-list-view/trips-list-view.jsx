import { Calendar } from "phosphor-react";
import { useNavigate } from "react-router";
import { formatFullDate } from "../../utils/utils";
import TripCardMenu from "../trip-card-menu/trip-card-menu";
import "./trips-list-view.css";

const TripsListView = ({ trips, handleOpenModal }) => {
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
          <TripCardMenu handleOpenModal={handleOpenModal} trip={trip} />
        </div>
      ))}
    </div>
  );
};

export default TripsListView;
