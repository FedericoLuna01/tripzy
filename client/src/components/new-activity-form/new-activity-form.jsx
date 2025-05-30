import { ArrowLeft, PencilSimple, PlusCircle } from "phosphor-react";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import Input from "../ui/input/input";
import "./new-activity-form.css";

const NewActivityForm = ({
  setActivities,
  editingActivity,
  setEditingActivity,
  activeDay,
}) => {
  const inputTimeRef = useRef(null);
  const inputTitleRef = useRef(null);

  const [time, setTime] = useState("");
  const [activityTitle, setActivityTitle] = useState("");
  const [activityDescription, setActivityDescription] = useState("");
  const [errors, setErrors] = useState({
    time: false,
    activityTitle: false,
    activityTitleLength: false,
    activityDescriptionLength: false,
  });

  useEffect(() => {
    if (editingActivity) {
      inputTimeRef.current.focus();
      setTime(editingActivity.time);
      setActivityTitle(editingActivity.title);
      setActivityDescription(editingActivity.description);
      return;
    }
    setTime("");
    setActivityTitle("");
    setActivityDescription("");
  }, [editingActivity]);

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

    if (editingActivity) {
      fetch(
        `${import.meta.env.VITE_BASE_SERVER_URL}/activities/${
          editingActivity.id
        }`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            title: activityTitle,
            description: activityDescription,
            time,
          }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.message) {
            return toast.error(data.message);
          }
          console.log(data);
          setActivities((prevActivities) =>
            prevActivities.map((activity) =>
              activity.id === editingActivity.id
                ? {
                    time,
                    title: activityTitle,
                    description: activityDescription,
                    id: data.id,
                  }
                : activity
            )
          );
          toast.success("Actividad actualizada con éxito");
        });
      setEditingActivity(null);
      return;
    }

    fetch(`${import.meta.env.VITE_BASE_SERVER_URL}/activities`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        title: activityTitle,
        description: activityDescription,
        time,
        tripDaysId: activeDay.id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          return toast.error(data.message);
        }
        setActivities((prevActivities) => [
          ...prevActivities,
          {
            id: data.id,
            time,
            title: activityTitle,
            description: activityDescription,
          },
        ]);
        toast.success("Actividad agregada con éxito");
        setEditingActivity(null);
      })
      .catch((error) => console.log(error));

    setTime("");
    setActivityTitle("");
    setActivityDescription("");
  };

  return (
    <form className="new-activity-card" onSubmit={handleAddActivity}>
      <div className="top">
        <div className="input-group">
          <label htmlFor="time">Hora</label>
          <Input
            type={"time"}
            id={"time"}
            onChange={handleTimeChange}
            value={time}
            className={`${errors.time ? "error title-input" : "title-input"}`}
            ref={inputTimeRef}
          />
          <p className="input-description">Horario de la actividad</p>
          {errors.time && (
            <p className="error-message">Por favor, ingresa una hora</p>
          )}
        </div>
        <div className="input-group">
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
          <p className="input-description">Titulo de tu actividad</p>
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
      <div className="input-group full">
        <label htmlFor="activity-description">Descripción</label>
        <Input
          id={"activity-description"}
          onChange={handleActivityDescriptionChange}
          value={activityDescription}
        />
        <p className="input-description">Descripción corta de la actividad</p>
        {errors.activityDescriptionLength && (
          <p className="error-message">
            La descripción no puede tener más de 200 caracteres
          </p>
        )}
      </div>
      <div className="buttons-container">
        {editingActivity && (
          <button
            className="button button-outline"
            onClick={() => setEditingActivity(null)}
          >
            Cancelar edición
            <ArrowLeft size={20} />
          </button>
        )}
        <button className="button button-primary">
          {editingActivity ? "Actualizar actividad" : "Agregar actividad"}
          {editingActivity ? (
            <PencilSimple size={20} />
          ) : (
            <PlusCircle size={20} />
          )}
        </button>
      </div>
    </form>
  );
};

export default NewActivityForm;
