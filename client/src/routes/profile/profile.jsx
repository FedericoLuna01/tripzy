import { useContext, useEffect, useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Link, NavLink } from "react-router";
import "./profile.css";
import Avatar from "../../components/avatar/avatar";
import { Calendar, Mountains } from "phosphor-react";
import { UserContext } from "../../contexts/user-context/user-context";
const Profile = () => {
  const [trips, setTrips] = useState([]);
  const { user } = useContext(UserContext);

  const getTrips = () => {
    fetch("http://localhost:3000/trips", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          return;
        }
        setTrips(data);
      });
  };

  useEffect(() => {
    getTrips();
  }, []);

  if (!user) {
    return (
      <div className="container profile">
        <h1>Cargando...</h1>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="container profile">
        <div className="container-avatar">
          <Avatar user={user} />
          <div>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <Link className="edit-profile" to={"/profile/edit"}>
              Editar perfil
            </Link>
          </div>
        </div>
        <div className="container-title">
          <h1>Mis viajes</h1>
        </div>
        <div className="separator"></div>

        {trips.length === 0 ? (
          <div className="container-info">
            <div className="container-no-trips">
              <Mountains className="mountain" size={84} />
              <h2>Tus vacaciones te esperan</h2>
              <p>Empezá a planificar el viaje de tus sueños</p>
              <NavLink to="/new-trip">
                <button className="button button-primary">Crear viaje</button>
              </NavLink>
            </div>
          </div>
        ) : (
          <div className="trips-container">
            {trips.map((trip, index) => (
              <Link
                key={index}
                to={`/trip/${trip.id}`}
                className="box-info shadow"
              >
                <img src={trip.imageUrl} alt={`${trip.title} image`} />
                <div className="box-info-data">
                  <h3>{trip.title}</h3>
                  <p className="box-info-description">{trip.description}</p>
                  <div className="box-info-date-container">
                    <Calendar className="box-info-icon" size={22} />
                    <p className="box-info-date">
                      {format(
                        new Date(trip.startDate),
                        "d 'de' MMMM 'de' yyyy",
                        {
                          locale: es,
                        }
                      )}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
