import { Link, Outlet, useLocation, useParams } from "react-router";
import { PencilSimple, Plus, Trash } from "phosphor-react";
import toast from "react-hot-toast";
import { addDays } from "date-fns";
import { useEffect, useState } from "react";
import { DATA, USERS_AVATARS } from "../../data/data";
import Avatar from "../../components/avatar/avatar";
import Modal from "../../components/modal/modal";
import { formatDay } from "../../utils/utils";
import "../../routes/new-trip/new-trip.css";
import "../../routes/trip/trip.css";
import "./trip-layout.css";

const TripLayout = () => {
  const params = useParams();
  const location = useLocation();
  const TRIP = DATA.find((trip) => trip.id === parseInt(params.id));
  const [isOpen, setIsOpen] = useState(false);
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/trips/${params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener el viaje");
        }
        return response.json();
      })
      .then((trip) => {
        console.log(trip);
        setTrip(trip);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [params.id]);

  if (!trip) {
    return (
      <div className="container">
        <h1>Viaje no encontrado</h1>
      </div>
    );
  }

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
        entity={`${trip.title}`}
        onSubmit={handleDelete}
        isOpen={isOpen}
        handleClose={handleClose}
      />
      <section className="new-itinerary-bg">
        <div className="container trip-container">
          <div className="card trip-info">
            <div className="trip-header">
              <h1 className="title">{trip.title}</h1>
              <p>
                {formatDay(new Date(trip.startDate))}
                {" - "}
                {formatDay(
                  // TODO: Cuando se tengamos los days cambiar a trip
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
                    to={`/trip/${trip.id}/members`}
                  >
                    <Plus size={22} />
                  </Link>
                </div>
              </div>
            </div>
            <div className="actions-container">
              <Link to={`/trip/edit/${trip.id}`}>
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
                location.pathname === `/trip/${trip.id}` ? "selected" : ""
              }`}
              to={`/trip/${trip.id}`}
            >
              Trip
            </Link>
            <Link
              className={`tab ${
                location.pathname === `/trip/${trip.id}/members`
                  ? "selected"
                  : ""
              }`}
              to={`/trip/${trip.id}/members`}
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
