import React, { useState } from "react";
import { Link, Outlet, useParams } from "react-router";
import toast from "react-hot-toast";
import "../../routes/trip/trip.css";
import "../../routes/new-trip/new-trip.css";
import Avatar from "../../components/avatar/avatar";
import Modal from "../../components/modal/modal";
import { DATA, USERS_AVATARS } from "../../data/data";
import { Plus } from "phosphor-react";

const TripLayout = () => {
  const params = useParams();
  const TRIP = DATA.find((trip) => trip.id === parseInt(params.id));
  const [isOpen, setIsOpen] = useState(false);

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
                  {USERS_AVATARS.map((user) => (
                    <Avatar user={user} key={user.id} />
                  ))}
                  <Link
                    className="avatar add-user"
                    to={`/trip/${TRIP.id}/members`}
                  >
                    <Plus size={22} />
                  </Link>
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
          <Outlet />
        </div>
      </section>
    </>
  );
};

export default TripLayout;
