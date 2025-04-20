import React, { useState } from "react";
import { useParams } from "react-router";
import toast from "react-hot-toast";
import "./trip.css";
import "../new-trip/new-trip.css";
import Avatar from "../../components/avatar/avatar";
import Modal from "../../components/modal/modal";
import { DATA } from "../../data/data";
import TripDays from "../../components/trip-days/trip-days";
import NewActivityForm from "../../components/new-activity-form/new-activity-form";

const IS_ADMIN = true; // Para simular admin

const Trip = () => {
  const params = useParams();
  const TRIP = DATA.find((trip) => trip.id === parseInt(params.id));
  const [isOpen, setIsOpen] = useState(false);
  const [activities, setActivities] = useState(TRIP.days[0].activities);
  const [activeDay, setActiveDay] = useState(TRIP.startDate);
  const [days, setDays] = useState(TRIP.days);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleDelete = () => {
    toast.success("Viaje eliminado");
    setIsOpen(false);
  };

  return (
    <>
      <Modal
        entity={`${TRIP.title}`}
        onSubmit={handleDelete}
        onClose={handleClose}
        isOpen={isOpen}
        handleClose={handleClose}
      />
      <section className="new-itinerary-bg">
        <div className="container trip-container">
          <div className="card trip-info">
            <div className="trip-header">
              <h1 className="title">{TRIP.title}</h1>
              <p>
                {new Date(TRIP.startDate).toLocaleDateString("es-ES", {
                  day: "numeric",
                  month: "long",
                })}{" "}
                -{" "}
                {new Date(
                  new Date(TRIP.startDate).setDate(
                    new Date(TRIP.startDate).getDate() + TRIP.days.length - 1
                  )
                ).toLocaleDateString("es-ES", {
                  day: "numeric",
                  month: "long",
                })}
              </p>
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
              <button className="button button-outline">Editar</button>
              <button
                onClick={handleOpen}
                className="button button-destructive"
              >
                Eliminar
              </button>
            </div>
          </div>
          <div className="info-container">
            <TripDays
              activeDay={activeDay}
              setActiveDay={setActiveDay}
              initialDays={TRIP.days}
              days={days}
              setDays={setDays}
            />
            <div className="card activities-container">
              <h2>Actividades</h2>
              <p className="day">
                Dia {TRIP.days.findIndex((day) => day.date === activeDay) + 1}
                {": "}
                {new Date(activeDay).toLocaleDateString("es-ES", {
                  day: "numeric",
                  month: "long",
                })}
              </p>
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
    </>
  );
};

export default Trip;
