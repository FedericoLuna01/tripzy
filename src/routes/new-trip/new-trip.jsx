import Avatar from "../../components/avatar/avatar";
import Input from "../../components/ui/input/input";
import "./new-trip.css";
import NewActivityForm from "../../components/new-activity-form/new-activity-form";
import { useState } from "react";

const NewTrip = () => {
  const [activities, setActivities] = useState([]);
  const IS_ADMIN = true; // Simula el admin
  return (
    <section className="new-itinerary-bg">
      <div className="container new-itinerary-container">
        <button className="button-secondary back">Volver</button>
        <form action="">
          <div className="title-container">
            <h1 className="title">Empezá a planificar tu viaje</h1>
            <button className="button">Crear</button>
          </div>
          <p>
            No te preocupes si te olvidás de algo, siempre vas a poder
            modificarlo
          </p>
          <div className="card">
            <h2>Descripción general</h2>
            <div className="inputs-container">
              <div>
                <label htmlFor="title">Titulo</label>
                <Input id="title" />
                <p>Titulo de tu viaje</p>
              </div>
              <div>
                <label htmlFor="description">Descripción</label>
                <Input id={"description"} />
                <p>Una pequeña descripción de tu viaje</p>
              </div>
              <div>
                <label htmlFor="date">Inicio del viaje</label>
                <Input type="date" id="date" />
                <p>La fecha de inicio de tu viaje</p>
              </div>
              <div className="checkbox-container">
                <label htmlFor="public">Publico</label>
                <Input
                  id="public"
                  type="checkbox"
                  style={{ width: "fit-content" }}
                />
                <p>Cualquier persona podrá unirse al itinerario</p>
              </div>
              <div>
                <label htmlFor="invite">Invitar amigos</label>
                <Input placeholder="johndoe@gmail.com" id="invite" />
                <p>Invita a tus amigos por su email</p>
              </div>
            </div>
            <div className="users-container">
              <div className="card user-card no-shadow">
                <Avatar />
                <div>
                  <p className="name">John Doe</p>
                  <p>johndoe@gmail.com</p>
                </div>
                <button className="button-outline">X</button>
              </div>
              <div className="card user-card no-shadow">
                <Avatar />
                <div>
                  <p className="name">John Doe</p>
                  <p>johndoe@gmail.com</p>
                </div>
                <button className="button-outline">X</button>
              </div>
              <div className="card user-card no-shadow">
                <Avatar />
                <div>
                  <p className="name">John Doe</p>
                  <p>johndoe@gmail.com</p>
                </div>
                <button className="button-outline">X</button>
              </div>
            </div>
          </div>
        </form>
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
              {activities
                .sort((a, b) => a.time.localeCompare(b.time))
                .map((activity, index) => (
                  <div key={index} className="activity-card card no-shadow">
                    <span>{activity.time}</span>
                    <div>
                      <h3>{activity.title}</h3>
                      <p>{activity.description}</p>
                    </div>
                  </div>
                ))}
              {IS_ADMIN && <NewActivityForm setActivities={setActivities} />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewTrip;
