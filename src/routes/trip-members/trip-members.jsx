import React, { useState } from "react";
import { DATA, USERS_AVATARS } from "../../data/data";
import { Link, useParams } from "react-router";
import Avatar from "../../components/avatar/avatar";
import Input from "../../components/ui/input/input";
import { Plus, Trash } from "phosphor-react";
import "./trip-members.css";
import toast from "react-hot-toast";

export const TripMembers = () => {
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
                  {" "}
                  <Plus size={22} />
                </Link>
              </div>
            </div>
          </div>
          <div className="actions-container">
            <button className="button button-outline">Editar</button>
            <button onClick={handleOpen} className="button button-destructive">
              Eliminar
            </button>
          </div>
        </div>
        <div className="card members-container">
          <h3>Gestioná tus amigos</h3>
          <form action="">
            <div>
              <label htmlFor="email">Email</label>
              <div className="container-input">
                <Input id="email" />
                <button className="button button-secondary">
                  Invitar <Plus size={20} />{" "}
                </button>
              </div>

              <p>Ingresá el email de la persona que quieras invitar</p>
            </div>
          </form>
          <div className="card-container">
            {new Array(4).fill(0).map((_, index) => (
              <div className="card user-card no-shadow column" key={index}>
                <div className="info-user">
                  <Avatar user={USERS_AVATARS[0]} />
                  <div>
                    <p className="name">alvaro reynoso</p>
                    <p className="email">alvaroreynoso69@gmail.com</p>
                  </div>
                </div>
                <form action="">
                  <label htmlFor="">Rol</label>
                  <select name="" id="" className="select">
                    <option value="owner">Dueño</option>
                    <option value="admin">Admin</option>
                    <option value="editor">Editor</option>
                  </select>
                  <button className="button button-destructive">
                    Eliminar <Trash size={20} />
                  </button>
                </form>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
