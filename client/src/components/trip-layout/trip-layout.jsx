import React, { useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router";
import toast from "react-hot-toast";
import "../../routes/trip/trip.css";
import "../../routes/new-trip/new-trip.css";
import Avatar from "../../components/avatar/avatar";
import Modal from "../../components/modal/modal";
import { DATA, USERS_AVATARS } from "../../data/data";
import { PencilSimple, Plus, Trash } from "phosphor-react";
import "./trip-layout.css";
import { formatDay } from "../../utils/utils";
import { addDays } from "date-fns";

const TripLayout = () => {
  const params = useParams();
  const location = useLocation();
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
        isOpen={isOpen}
        handleClose={handleClose}
      />
      <section className="new-itinerary-bg">
        <div className="container trip-container">
          <div className="card trip-info">
            <div className="trip-header">
              <h1 className="title">{TRIP.title}</h1>
              <p>
                {formatDay(new Date(TRIP.startDate))}
                {" - "}
                {formatDay(
                  addDays(new Date(TRIP.startDate), TRIP.days.length - 1)
                )}
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
              <Link to={`/trip/edit/${TRIP.id}`}>
                <button className="button button-outline">
                  Editar <PencilSimple size={20} />
                </button>
              </Link>
              <button
                onClick={handleOpen}
                className="button button-destructive"
              >
                Eliminar
                <Trash size={20} />
              </button>
            </div>
          </div>
          <div className="card tabs-container">
            <Link
              className={`tab ${
                location.pathname === `/trip/${TRIP.id}` ? "selected" : ""
              }`}
              to={`/trip/${TRIP.id}`}
            >
              Trip
            </Link>
            <Link
              className={`tab ${
                location.pathname === `/trip/${TRIP.id}/members`
                  ? "selected"
                  : ""
              }`}
              to={`/trip/${TRIP.id}/members`}
            >
              Amigos
            </Link>
          </div>
          <Outlet />
        </div>
      </section>
    </>
  );
};

export default TripLayout;
