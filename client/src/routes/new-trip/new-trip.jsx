import "./new-trip.css";
import TripForm from "../../components/trip-form/trip-form";

const NewTrip = () => {
  return (
    <section className="new-itinerary-bg">
      <div className="container new-itinerary-container">
        <TripForm />
      </div>
    </section>
  );
};

export default NewTrip;
