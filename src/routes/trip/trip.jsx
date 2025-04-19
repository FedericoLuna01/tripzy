import React, { useState } from "react";
import { useParams } from "react-router";
import "./trip.css";
import "../new-trip/new-trip.css";
import Avatar from "../../components/avatar/avatar";
import Input from "../../components/ui/input/input";
import toast from "react-hot-toast";
import Modal from "../../components/modal/modal";
import { DATA } from "../../data/data";
import TripDays from "../../components/trip-days/trip-days";

const Trip = () => {
  const [isOpen, setIsOpen] = useState(false);
  const params = useParams();

  const TRIP = DATA.find((trip) => trip.id === parseInt(params.id));

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleDelete = () => {
    toast.success("Actividad eliminada");
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
            <TripDays startDay={TRIP.startDate} initialDays={TRIP.days} />
            <div className="card activities-container">
              <h2>Actividades</h2>
              <p className="day">Dia 1: 15 de mayo</p>
              <div className="activity-container">
                {TRIP.days[0].activities
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
                {/* {IS_ADMIN && <NewActivityForm setActivities={setActivities} />} */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Trip;
