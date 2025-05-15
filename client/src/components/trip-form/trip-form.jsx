import { formatDate, isBefore, parseISO } from "date-fns";
import { useState, useRef, useEffect } from "react";
import { AirplaneTakeoff } from "phosphor-react";
import { toast } from "react-hot-toast";
import Input from "../../components/ui/input/input";
import { useNavigate } from "react-router";

const TripForm = ({ initialTrip }) => {
  const IS_ADMIN = true;
  const [title, setTitle] = useState("");
  const [tripStart, setTripStart] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [isBlocked, setIsBlocked] = useState(false);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    title: false,
    tripStart: false,
    description: false,
    imageUrl: false,
    isPublic: false,
  });
  const inputTitleRef = useRef(null);
  const inputTripStartRef = useRef(null);
  const inputDescriptionRef = useRef(null);
  const inputImageUrlRef = useRef(null);

  useEffect(() => {
    console.log(initialTrip);
    if (initialTrip) {
      setTitle(initialTrip.title || "");
      setTripStart(
        initialTrip.startDate
          ? formatDate(new Date(initialTrip.startDate), "yyyy-MM-dd")
          : ""
      );
      setDescription(initialTrip.description || "");
      setImageUrl(initialTrip.imageUrl || "");
      setIsPublic(initialTrip.isPublic || false);
      setIsBlocked(initialTrip.isBlocked || false);
    }
  }, [initialTrip]);

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

  const handleImageUrl = (event) => {
    setImageUrl(event.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      imageUrl: false,
    }));
  };

  const handleIsPublic = (event) => {
    setIsPublic(event.target.checked);
  };

  const handleIsBlocked = (event) => {
    setIsBlocked(event.target.checked);
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

    if (!imageUrl) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        imageUrl: true,
      }));
      if (!hasError) inputImageUrlRef.current.focus();
      hasError = true;
    }

    if (hasError) return;

    const method = initialTrip ? "PUT" : "POST";
    const url = initialTrip
      ? `http://localhost:3000/trips/${initialTrip.id}`
      : "http://localhost:3000/trips";

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        title,
        description,
        startDate: tripStart,
        imageUrl,
        userId: 1,
        isPublic,
        isBlocked,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          return toast.error(data.message);
        }

        navigate(`/trip/${data.id}`);

        return toast.success(
          `Viaje${initialTrip ? " editado " : " creado "}correctamente`
        );
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error al crear el viaje");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="title">
        {initialTrip ? "Edita tu viaje" : "Empezá a planificar tu viaje"}
      </h1>
      <p>
        No te preocupes si te olvidás de algo, siempre vas a poder modificarlo
      </p>
      <div className="card new-trip-card">
        <h2>Descripción general</h2>
        <div className="inputs-container">
          <div className="input-group">
            <label htmlFor="title">Titulo</label>
            <Input
              ref={inputTitleRef}
              onChange={handleTitle}
              value={title}
              id={"title"}
              className={`${errors.title ? "error" : ""}`}
            />
            <p className="input-description">Titulo de tu viaje</p>
            {errors.title && (
              <p className="error-message">
                El titulo debe contener al menos 5 caracteres
              </p>
            )}
          </div>
          <div className="input-group">
            <label htmlFor="description">Descripción</label>
            <Input
              ref={inputDescriptionRef}
              onChange={handleDescription}
              value={description}
              id={"description"}
              className={`${errors.description ? "error" : ""}`}
            />
            <p className="input-description">
              Una pequeña descripción de tu viaje
            </p>
            {errors.description && (
              <p className="error-message">
                La descripción debe contener al menos 10 caracteres
              </p>
            )}
          </div>
          <div className="input-group">
            <label htmlFor="date">Inicio del viaje</label>
            <Input
              ref={inputTripStartRef}
              onChange={handleTripStart}
              value={tripStart}
              type="date"
              id={"date"}
              className={`${errors.tripStart ? "error" : ""}`}
            />
            <p className="input-description">La fecha de inicio de tu viaje</p>
            {errors.tripStart && (
              <p className="error-message">La fecha debe ser posterior a hoy</p>
            )}
          </div>
          <div className="input-group">
            <label htmlFor="imageUrl">Url de la imagen</label>
            <Input
              ref={inputImageUrlRef}
              onChange={handleImageUrl}
              value={imageUrl}
              id={"imageUrl"}
              className={`${errors.imageUrl ? "error" : ""}`}
            />
            <p className="input-description">Imagen de portada de tu viaje</p>
            {errors.imageUrl && (
              <p className="error-message">
                La url de la imagen no puede estar vacía
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
            <p className="input-description">
              Cualquier persona podrá unirse al itinerario
            </p>
          </div>
          {IS_ADMIN && (
            <div className="input-group">
              <label htmlFor="blocked">Bloqueado</label>
              <Input
                onChange={handleIsBlocked}
                checked={isBlocked}
                id="blocked"
                type="checkbox"
                style={{ width: "fit-content" }}
              />
              <p className="input-description">
                El viaje no será visible para los usuarios
              </p>
            </div>
          )}
        </div>
        <button className="button button-primary new-trip-button">
          {initialTrip ? "Editar" : "Crear"}
          <AirplaneTakeoff size={20} />
        </button>
      </div>
    </form>
  );
};

export default TripForm;
