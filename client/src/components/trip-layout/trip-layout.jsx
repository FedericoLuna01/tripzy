import { AirplaneLanding, PencilSimple, Plus, Trash } from "phosphor-react";
import { Link, NavLink, Outlet, useNavigate, useParams } from "react-router";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { addDays } from "date-fns";
import { UserContext } from "../../contexts/user-context/user-context";
import Avatar from "../../components/avatar/avatar";
import Modal from "../../components/modal/modal";
import { formatDay } from "../../utils/utils";
import "../../routes/new-trip/new-trip.css";
import useModal from "../../hooks/useModal";
import "../../routes/trip/trip.css";
import "./trip-layout.css";
import { TabGroup, TabPanels } from "@headlessui/react";
import { Tab, TabList, TabPanel } from "../ui/tabs/tabs";
import Trip from "../../routes/trip/trip";
import TripMembers from "../../routes/trip-members/trip-members";

const TripLayout = () => {
  const [trip, setTrip] = useState(null);
  const [canEdit, setCanEdit] = useState(false);
  const { user } = useContext(UserContext);
  const params = useParams();
  const navigate = useNavigate();
  const { handleClose, handleOpen, isOpen } = useModal();

  useEffect(() => {
    if (trip && trip.tripUsers) {
      const isUserInTrip = trip.tripUsers.some(
        (tripUser) => tripUser.userId === user.id
      );
      if (!isUserInTrip) {
        toast.error("No tienes acceso a este viaje");
        navigate("/");
      }
    }
  }, [trip, navigate, user.id]);

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
        setTrip(trip);
        setCanEdit(
          trip.tripUsers.some(
            (tripUser) =>
              tripUser.userId === user.id && tripUser.role !== "viewer"
          )
        );
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [params.id, user?.id]);

  const handleDelete = () => {
    toast.success("Viaje eliminado");
    fetch(`http://localhost:3000/trips/${trip.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          return toast.error("Error al eliminar el viaje");
        }
      })
      .then(() => {
        navigate("/profile");
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error al eliminar el viaje");
      });
    handleClose();
  };

  if (!trip) {
    return (
      <div className="trip-layout">
        <div className="container center-container">
          <AirplaneLanding size={84} className="plane-center-img" />
          <h1 className="mid-text">Ups, destino incierto</h1>
          <NavLink to="/">
            <button className="button button-secondary">Deberías volver</button>
          </NavLink>
        </div>
      </div>
    );
  }

  return (
    <>
      <Modal
        entity={`${trip.title}`}
        onSubmit={handleDelete}
        isOpen={isOpen}
        handleClose={handleClose}
      />
      <section className="trip-layout">
        <div className="container trip-container">
          <div className="card trip-info">
            <div className="trip-header">
              <h1 className="title">{trip.title}</h1>
              <p>
                {formatDay(new Date(trip?.startDate))}
                {" - "}
                {formatDay(
                  addDays(new Date(trip.startDate), trip.days.length - 1)
                )}
              </p>
              <div className="friends-container">
                <p>Amigos de viaje:</p>
                <div className="avatars-container">
                  {trip.tripUsers.map((user) => (
                    <Avatar user={user.user} key={user.id} />
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
            {canEdit ? (
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
            ) : null}
          </div>
          <TabGroup>
            <TabList>
              <Tab>Trip</Tab>
              <Tab>Amigos</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Trip trip={trip} canEdit={canEdit} />
              </TabPanel>
              <TabPanel>
                <TripMembers trip={trip} canEdit={canEdit} />
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </div>
      </section>
    </>
  );
};

export default TripLayout;
