import { useEffect, useState } from "react";
import { Link } from "react-router";
import "./profile.css";
import Avatar from "../../components/avatar/avatar";
import { getProfile } from "../../services/getProfile";

const Profile = () => {
  const [trips, setTrips] = useState([]);
  const [user, setUser] = useState(null);

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

  const getUser = async () => {
    const data = await getProfile();
    if (data) {
      setUser(data);
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    getTrips();
    getUser();
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
        <div className="container-info">
          {trips.length === 0 ? (
            <p>No hay viajes disponibles</p>
          ) : (
            trips.map((trip, index) => (
              <Link key={index} to={`/trip/${trip.id}`} className="box-info">
                <img src={trip.imageUrl} alt={`${trip.title} image`} />
                <h3>{trip.title}</h3>
                <p>{trip.description}</p>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
