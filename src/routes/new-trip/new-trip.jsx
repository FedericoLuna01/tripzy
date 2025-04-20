import { useState } from "react";
import { AirplaneTakeoff, ArrowLeft, X } from "phosphor-react";
import "./new-trip.css";
import Avatar from "../../components/avatar/avatar";
import Input from "../../components/ui/input/input";

const NewTrip = () => {
  const [startDate, setStartDate] = useState("");

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
      </div>
    </section>
  );
};

export default NewTrip;
