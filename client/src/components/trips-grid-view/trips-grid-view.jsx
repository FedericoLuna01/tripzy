import { Link, useNavigate } from "react-router";
import { formatFullDate } from "../../utils/utils";
import { Calendar } from "phosphor-react";
import "./trips-grid-view.css";
import TripCardMenu from "../trip-card-menu/trip-card-menu";

const TripsGridView = ({ trips, handleOpenModal }) => {
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
          <TripCardMenu trip={trip} handleOpenModal={handleOpenModal} />
          <img src={trip.imageUrl} alt={`${trip.title} image`} />
          <div className="box-info-data">
            <h3>{trip.title}</h3>
            <p className="box-info-description">{trip.description}</p>
            <div className="box-info-date-container">
              <Calendar className="box-info-icon" size={22} />
              <p className="box-info-date">
                {formatFullDate(trip.startDate)} - {trip.days.length} día(s)
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TripsGridView;
