import "./new-trip.css";
import TripForm from "../../components/trip-form/trip-form";

const NewTrip = () => {
  return (
    <section className="new-itinerary-bg">
      <div className="container new-itinerary-container">
        <TripForm />
        {/* <div>
          <div>
            <label htmlFor="invite">Invitar amigos</label>
            <Input placeholder="johndoe@gmail.com" id="invite" />
            <p>Invita a tus amigos por su email</p>
          </div>
          <div className="users-container">
            {new Array(4).fill(0).map((e, index) => (
              <div className="card user-card no-shadow" key={index}>
                <Avatar user={USERS_AVATARS[0]} />
                <div>
                  <p className="name">John Doe</p>
                  <p className="email">johndoe@gmail.com</p>
                </div>
                <button
                  type={"button"}
                  className="button button-outline button-square"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default NewTrip;
