import React from "react";
import { USERS_AVATARS } from "../../data/data";
import Avatar from "../../components/avatar/avatar";
import "./home.css";

const Home = () => {
  return (
    <div>
      <div className="hero-container container">
        <div className="gradient-1"></div>
        <div className="left-body-container">
          <h1> Tu proxima aventura te espera</h1>
          <p>
            Planea y organizá todo tu viaje con tus amigos de la mejor manera
          </p>
          <button className="button button-primary">Empezar</button>
          <div className="avatars-container">
            {new Array(6).fill(0).map((_, index) => (
              <div className="avatar" key={index}>
                <img src={`./avatares/avatar${index + 1}.png`} alt="" />
              </div>
            ))}
          </div>
          <p className="avatar-text">+1000 personas organizaron su viaje</p>
        </div>
        <div className="gradient-1"></div>
        <img className="hero-img" src="/img-hero.png" alt="hero-img" />
      </div>
    </div>
  );
};

export default Home;
