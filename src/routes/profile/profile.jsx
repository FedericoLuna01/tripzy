import React from "react";
import Avatar from "../../components/avatar/avatar";
import "./profile.css";
import { Link } from "react-router";

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
        {new Array(7).fill(0).map((_, index) => (
          <Link key={index} to={`/trip/${index + 1}`} className="box-info">
            <img src="./img-profileGrid.png" alt="" />
            <h3>Viaje a la costa</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
              libero commodi adipisci, earum ab aliquam nihil assumenda
              distinctio
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Profile;
