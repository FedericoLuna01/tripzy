import React from "react";
import Avatar from "../../components/avatar/avatar";
import "./profile.css";
import { Link } from "react-router";
import { DATA } from "../../data/data";

const Profile = () => {
  return (
    <div className="container profile">
      <div className="container-avatar">
        <Avatar />
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
        {DATA.map((trip, index) => (
          <Link key={index} to={`/trip/${index + 1}`} className="box-info">
            <img src={trip.image} alt="" />
            <h3>{trip.title}</h3>
            <p>{trip.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Profile;
