import React, { useRef, useState } from "react";
import Input from "../ui/input/input";
import toast from "react-hot-toast";
import { PlusCircle } from "phosphor-react";

const NewActivityForm = ({ setActivities }) => {
  const inputTimeRef = useRef(null);
  const inputTitleRef = useRef(null);

  const [time, setTime] = useState("");
  const [activityTitle, setActivityTitle] = useState("");
  const [activityDescription, setActivityDescription] = useState("");
  const [errors, setErrors] = useState({
    time: false,
    activityTitle: false,
    activityTitleLength: false, // Nuevo error para longitud del título
    activityDescriptionLength: false, // Nuevo error para longitud de la descripción
  });

  const handleTimeChange = (event) => {
    setTime(event.target.value);
    if (errors.time) {
      setErrors((prevErrors) => ({ ...prevErrors, time: false }));
    }
  };

  const handleActivityTitleChange = (event) => {
    setActivityTitle(event.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      activityTitle: false,
      activityTitleLength: false,
    }));
  };

  const handleActivityDescriptionChange = (event) => {
    setActivityDescription(event.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      activityDescriptionLength: false,
    }));
  };

  const handleAddActivity = (event) => {
    event.preventDefault();

    setErrors({
      time: false,
      activityTitle: false,
      activityTitleLength: false,
      activityDescriptionLength: false,
    });

    let hasError = false;

    if (!time) {
      setErrors((prevErrors) => ({ ...prevErrors, time: true }));
      if (!hasError) inputTimeRef.current.focus();
      hasError = true;
    }

    if (!activityTitle) {
      setErrors((prevErrors) => ({ ...prevErrors, activityTitle: true }));
      if (!hasError) inputTitleRef.current.focus();
      hasError = true;
    }

    if (activityTitle.length > 50) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        activityTitleLength: true,
      }));
      if (!hasError) inputTitleRef.current.focus();
      hasError = true;
    }

    if (activityDescription.length > 200) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        activityDescriptionLength: true,
      }));
      hasError = true;
    }

    if (hasError) {
      return;
    }

    console.log("Activity added:", {
      time,
      activityTitle,
      activityDescription,
    });

    setActivities((prevActivities) => [
      ...prevActivities,
      {
        time,
        title: activityTitle,
        description: activityDescription,
      },
    ]);

    toast.success("Actividad agregada con éxito");

    setTime("");
    setActivityTitle("");
    setActivityDescription("");
  };

  return (
    <form className="new-activity-card" onSubmit={handleAddActivity}>
      <div className="top">
        <div>
          <label htmlFor="time">Hora</label>
          <Input
            type={"time"}
            id={"time"}
            onChange={handleTimeChange}
            value={time}
            className={`${errors.time ? "error title-input" : "title-input"}`}
            ref={inputTimeRef}
          />
          <p>Horario de la actividad</p>
          {errors.time && (
            <p className="error-message">Por favor, ingresa una hora</p>
          )}
        </div>
        <div>
          <label htmlFor="activity-title">Titulo</label>
          <Input
            id={"activity-title"}
            onChange={handleActivityTitleChange}
            value={activityTitle}
            className={`${
              errors.activityTitle || errors.activityTitleLength ? "error" : ""
            }`}
            ref={inputTitleRef}
          />
          <p>Titulo de tu actividad</p>
          {errors.activityTitle && (
            <p className="error-message">Por favor, ingrese un título</p>
          )}
          {errors.activityTitleLength && (
            <p className="error-message">
              El título no puede tener más de 50 caracteres
            </p>
          )}
        </div>
      </div>
      <div style={{ width: "100%" }}>
        <label htmlFor="activity-description">Descripción</label>
        <Input
          id={"activity-description"}
          onChange={handleActivityDescriptionChange}
          value={activityDescription}
        />
        <p>Descripción corta de la actividad</p>
        {errors.activityDescriptionLength && (
          <p className="error-message">
            La descripción no puede tener más de 200 caracteres
          </p>
        )}
      </div>
      <button className="button button-secondary new-activity-button">
        Agregar actividad
        <PlusCircle size={20} />
      </button>
    </form>
  );
};

export default NewActivityForm;
