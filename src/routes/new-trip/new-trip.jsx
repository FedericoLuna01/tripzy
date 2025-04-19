import Avatar from "../../components/avatar/avatar";
import Input from "../../components/ui/input/input";
import "./new-trip.css";
import NewActivityForm from "../../components/new-activity-form/new-activity-form";
import { useState } from "react";
import TripDays from "../../components/trip-days/trip-days";
import { AirplaneTakeoff, ArrowLeft, X } from "phosphor-react";

const NewTrip = () => {
  const [activities, setActivities] = useState([]);
  const [startDate, setStartDate] = useState("");
  const IS_ADMIN = true; // Simula el admin

  const handleStartDateChange = (e) => {
    const date = e.target.value;
    setStartDate(date);
  };

  return (
    <section className="new-itinerary-bg">
      <div className="container new-itinerary-container">
        <button className="button button-secondary back">
          <ArrowLeft size={20} />
          Volver
        </button>
        <form action="">
          <div className="title-container">
            <h1 className="title">Empezá a planificar tu viaje</h1>
            <button className="button button-primary">
              Crear
              <AirplaneTakeoff size={20} />
            </button>
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
                <Input
                  type="date"
                  id="date"
                  value={startDate}
                  onChange={handleStartDateChange}
                />
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
              {new Array(4).fill(0).map((e, index) => (
                <div className="card user-card no-shadow" key={index}>
                  <Avatar />
                  <div>
                    <p className="name">John Doe</p>
                    <p className="email">johndoe@gmail.com</p>
                  </div>
                  <button className="button button-outline button-square">
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </form>
        <div className="info-container">
          <TripDays startDay={startDate} />
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
