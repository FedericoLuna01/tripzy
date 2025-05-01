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
      <section className="container">
        <div className="title-container">
          <h1>¿Cómo funciona?</h1>
          <p>En cuatro simples pasos estarás organizando </p>
        </div>
        <div className="grid-container">
          <div className="grid-card">
            <h1>01</h1>
            <p>Creá tu cuenta</p>
            <p>
              Registrate de forma gratuita y accede a todas las funcionalidades
              de la plataforma.
            </p>
          </div>
          <div className="grid-card">
            <h1>02</h1>
            <p>Planificá tu viaje</p>
            <p>
              Crea un nuevo viaje, definile fechas y añadí los destinos que
              visitarás.
            </p>
          </div>
          <div className="grid-card">
            <h1>03</h1>
            <p>Organizá actividades</p>
            <p>
              Para cada día, añade las actividades que realizarás incluyendo
              horarios y ubicaciones.
            </p>
          </div>
          <div className="grid-card">
            <h1>04</h1>
            <p>Comparte y colabora</p>
            <p>
              Invita a otras personas a ver o a editar tu itinerario según los
              permisos que asignes.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
