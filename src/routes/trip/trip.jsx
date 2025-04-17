import React from "react";
import { useParams } from "react-router";
import "./trip.css";
import "../new-trip/new-trip.css";
import Avatar from "../../components/avatar/avatar";
import Input from "../../components/ui/input/input";

const Trip = () => {
  const params = useParams();
  console.log(params);
  return (
    <section className="new-itinerary-bg">
      <div className="container trip-container">
        <div className="card trip-info">
          <div className="trip-header">
            <h1 className="title">Trip {params.id}</h1>
            <p>15 de mayo - 18 de mayo</p>
            <div className="friends-container">
              <p>Amigos de viaje:</p>
              <div className="avatars-container">
                <Avatar />
                <Avatar />
                <Avatar />
                <Avatar />
              </div>
            </div>
          </div>
          <div className="actions-container">
            <button className="button-outline">Editar</button>
            <button className="button-destructive">Eliminar</button>
          </div>
        </div>
        <div className="info-container">
          <div className="card days-container">
            <h2>Dias</h2>
            <div className="days-buttons-container">
              <button className="active">Dia 1: 15 de mayo</button>
              <button>Dia 2: 16 de mayo</button>
              <button>Dia 3: 17 de mayo</button>
            </div>
            <button className="button-secondary">Agregar dia</button>
          </div>
          <div className="card activities-container">
            <h2>Actividades</h2>
            <p className="day">Dia 1: 15 de mayo</p>
            <div className="activity-container">
              <div className="activity-card card no-shadow">
                <span>12:00</span>
                <div>
                  <h3>Llegada al aeropuerto</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Eius accusamus ratione maxime voluptatum earum voluptatibus
                    molestias magni accusantium quia reprehenderit!
                  </p>
                </div>
              </div>
              <div className="activity-card card no-shadow">
                <span>12:00</span>
                <div>
                  <h3>Llegada al aeropuerto</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Eius accusamus ratione maxime voluptatum earum voluptatibus
                    molestias magni accusantium quia reprehenderit!
                  </p>
                </div>
              </div>
              <div className="activity-card card no-shadow">
                <span>12:00</span>
                <div>
                  <h3>Llegada al aeropuerto</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Eius accusamus ratione maxime voluptatum earum voluptatibus
                    molestias magni accusantium quia reprehenderit!
                  </p>
                </div>
              </div>
              <div className="new-activity-card">
                <div className="top">
                  <div>
                    <label htmlFor="title">Hora</label>
                    <Input className={"title-input"} type={"time"} />
                    <p>Horario de la actividad</p>
                  </div>
                  <div>
                    <label htmlFor="title">Titulo</label>
                    <Input />
                    <p>Titulo de tu actividad</p>
                  </div>
                </div>
                <div>
                  <label htmlFor="title">Descripción</label>
                  <Input />
                  <p>Descripción corta de la actividad</p>
                </div>
                <button className="button-secondary new-activity-button">
                  Agregar actividad
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Trip;
