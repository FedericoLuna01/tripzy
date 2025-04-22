import { useState, useRef } from "react";
import { AirplaneTakeoff, X } from "phosphor-react";
import "./new-trip.css";
import Avatar from "../../components/avatar/avatar";
import Input from "../../components/ui/input/input";
import { USERS_AVATARS } from "../../data/data";
import { isBefore, parseISO } from "date-fns";

const NewTrip = () => {
  const [title, setTitle] = useState("");
  const [tripStart, setTripStart] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [errors, setErrors] = useState({
    title: false,
    tripStart: false,
    description: false,
  });
  const inputTitleRef = useRef(null);
  const inputTripStartRef = useRef(null);
  const inputDescriptionRef = useRef(null);
  const handleTitle = (event) => {
    setTitle(event.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      title: false,
    }));
  };

  const handleTripStart = (event) => {
    setTripStart(event.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      tripStart: false,
    }));
  };

  const handleDescription = (event) => {
    setDescription(event.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      description: false,
    }));
  };

  const handleIsPublic = (event) => {
    setIsPublic(event.target.checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors({ title: false, tripStart: false, description: false });
    let hasError = false;

    if (title.length < 5) {
      setErrors((prevErrors) => ({ ...prevErrors, title: true }));
      if (!hasError) inputTitleRef.current.focus();
      hasError = true;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!tripStart || isBefore(parseISO(tripStart), today)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        tripStart: true,
      }));
      if (!hasError) inputTripStartRef.current.focus();
      hasError = true;
    }

    if (description.length < 10) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        description: true,
      }));
      if (!hasError) inputDescriptionRef.current.focus();
      hasError = true;
    }

    if (hasError) return;
    console.log({ title, tripStart, description, isPublic });
  };

  return (
    <section className="new-itinerary-bg">
      <div className="container new-itinerary-container">
        <form action="" onSubmit={handleSubmit}>
          <h1 className="title">Empezá a planificar tu viaje</h1>
          <p>
            No te preocupes si te olvidás de algo, siempre vas a poder
            modificarlo
          </p>
          <div className="card new-trip-card">
            <h2>Descripción general</h2>
            <div className="inputs-container">
              <div>
                <label htmlFor="title">Titulo</label>
                <Input
                  ref={inputTitleRef}
                  onChange={handleTitle}
                  value={title}
                  id={"title"}
                  className={`${errors.title ? "error" : ""}`}
                />
                <p>Titulo de tu viaje</p>
                {errors.title && (
                  <p className="error-message">
                    El titulo debe contener al menos 5 caracteres
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="description">Descripción</label>
                <Input
                  ref={inputDescriptionRef}
                  onChange={handleDescription}
                  value={description}
                  id={"description"}
                  className={`${errors.description ? "error" : ""}`}
                />
                <p>Una pequeña descripción de tu viaje</p>
                {errors.description && (
                  <p className="error-message">
                    La descripción debe contener al menos 10 caracteres
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="date">Inicio del viaje</label>
                <Input
                  ref={inputTripStartRef}
                  onChange={handleTripStart}
                  value={tripStart}
                  type="date"
                  id={"date"}
                  className={`${errors.tripStart ? "error" : ""}`}
                />
                <p>La fecha de inicio de tu viaje</p>
                {errors.tripStart && (
                  <p className="error-message">
                    La fecha debe ser posterior a hoy
                  </p>
                )}
              </div>
              <div className="checkbox-container">
                <label htmlFor="public">Publico</label>
                <Input
                  onChange={handleIsPublic}
                  checked={isPublic}
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
                  <Avatar user={USERS_AVATARS[0]} />
                  <div>
                    <p className="name">John Doe</p>
                    <p className="email">johndoe@gmail.com</p>
                  </div>
                  <button
                    type={"button"}
                    className="button button-outline button-square"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
            <button className="button button-primary new-trip-button">
              Crear
              <AirplaneTakeoff size={20} />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default NewTrip;
