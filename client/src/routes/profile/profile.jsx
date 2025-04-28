import Avatar from "../../components/avatar/avatar";
import "./profile.css";
import { Link } from "react-router";
import { DATA, USERS_AVATARS } from "../../data/data";
import { useEffect, useState } from "react";

const Profile = () => {
  const [trips, setTrips] = useState([]);
  const getTrips = () => {
    fetch("http://localhost:3000/trips")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTrips(data);
      });
  };

  useEffect(() => {
    getTrips();
  }, []);

  return (
    <div className="container profile">
      <div className="container-avatar">
        <Avatar user={USERS_AVATARS[0]} />
        <div>
          <h2>John Doe </h2>
          <p>wellech@gmail.com</p>
        </div>
      </div>
      <div className="container-title">
        <h1>Mis viajes</h1>
      </div>
      <div className="separator"></div>
      <div className="container-info">
        {trips.map((trip, index) => (
          <Link key={index} to={`/trip/${trip.id}`} className="box-info">
            <img src={trip.imageUrl} alt={`${trip.title} image`} />
            <h3>{trip.title}</h3>
            <p>{trip.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Profile;
