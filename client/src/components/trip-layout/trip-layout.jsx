import {
  AirplaneLanding,
  AirplaneTilt,
  Calendar,
  Lock,
  PencilSimple,
  Plus,
  Trash,
} from "phosphor-react";
import { Link, NavLink, useNavigate, useParams } from "react-router";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { addDays } from "date-fns";
import { UserContext } from "../../contexts/user-context/user-context";
import TripMembers from "../../routes/trip-members/trip-members";
import { Tab, TabList, TabPanel } from "../ui/tabs/tabs";
import { TabGroup, TabPanels } from "@headlessui/react";
import Avatar from "../../components/avatar/avatar";
import {
  ModalTitle,
  Modal,
  ModalDescription,
} from "../../components/modal/modal";
import { formatDay } from "../../utils/utils";
import "../../routes/new-trip/new-trip.css";
import useModal from "../../hooks/useModal";
import Trip from "../../routes/trip/trip";
import "../../routes/trip/trip.css";
import "./trip-layout.css";

const TripLayout = () => {
  const [trip, setTrip] = useState(null);
  const [canEdit, setCanEdit] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const { user } = useContext(UserContext);
  const params = useParams();
  const navigate = useNavigate();
  const { handleClose, handleOpen, isOpen } = useModal();
  const {
    handleClose: handleCloseAbandonTrip,
    handleOpen: handleOpenAbandonTrip,
    isOpen: isOpenAbandonTrip,
  } = useModal();

  useEffect(() => {
    if (trip && trip.tripUsers) {
      if (user.role === "admin") {
        return;
      }
      const isUserInTrip = trip.tripUsers.some(
        (tripUser) => tripUser.userId === user.id
      );
      if (!isUserInTrip) {
        toast.error("No tienes acceso a este viaje");
        navigate("/");
      }
    }
  }, [trip, navigate, user.id, user.role]);

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
              tripUser.user?.id === user.id && tripUser.role !== "viewer"
          )
        );
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [params.id, user?.id]);

  const tripUser = trip?.tripUsers?.find((tu) => tu.user?.id === user.id);
  const myRole = tripUser ? tripUser.role : null;

  const handleDelete = () => {
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

  const handleAbandonTrip = () => {
    fetch(`http://localhost:3000/trips/${trip.id}/users/${user.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          return toast.error("Error al abandonar el viaje");
        }
        return response.json();
      })
      .then(() => {
        toast.success("Viaje abandonado correctamente");
        navigate("/profile");
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error al abandonar el viaje");
      });
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
    <section className="trip-layout">
      {trip.isBlocked && (
        <div className="blocked-layout">
          <Lock className="icon-svg" size={60} />
          <p>Viaje bloqueado</p>
        </div>
      )}
      <Modal onSubmit={handleDelete} isOpen={isOpen} handleClose={handleClose}>
        <ModalTitle>¿Estás seguro de que quieres eliminar el viaje?</ModalTitle>
        <ModalDescription>
          Esta acción no se puede deshacer. Si el viaje tiene días o actividades
          asignados, se eliminarán de forma permanente.
        </ModalDescription>
      </Modal>
      <Modal
        entity={`${trip.title}`}
        onSubmit={handleAbandonTrip}
        isOpen={isOpenAbandonTrip}
        handleClose={handleCloseAbandonTrip}
        buttonTitle="Abandonar"
      >
        <ModalTitle>
          ¿Estás seguro de que quieres abandonar el viaje {trip.title}?
        </ModalTitle>
        <ModalDescription>
          No podrás acceder a la información de este viaje hasta volver a ser
          invitado.
        </ModalDescription>
      </Modal>
      <div className="container trip-container">
        <div className="card trip-info">
          <div className="trip-header">
            <h1 className="title">{trip.title}</h1>
            <div className="trip-header-date">
              <Calendar className="icon-svg" size={20} />
              <p>
                {formatDay(new Date(trip?.startDate))}
                {" - "}
                {formatDay(
                  addDays(new Date(trip.startDate), trip.days.length - 1)
                )}
              </p>
            </div>
            <div className="friends-container">
              <p>Amigos de viaje:</p>
              <div className="avatars-container">
                {trip.tripUsers.map((user) => (
                  <Avatar user={user.user} key={user.id} />
                ))}
                <span
                  className="avatar add-user"
                  onClick={() => setSelectedTab(1)}
                >
                  <Plus size={22} />
                </span>
              </div>
            </div>
          </div>
          <div className="actions-container actions-row">
            {(canEdit || user.role.includes("admin")) && (
              <>
                <Link to={`/trip/edit/${trip.id}`}>
                  <button className="button button-outline">
                    Editar <PencilSimple size={20} />
                  </button>
                </Link>
                {(myRole === "owner" || user.role.includes("admin")) && (
                  <button
                    onClick={handleOpen}
                    className="button button-destructive"
                  >
                    Eliminar
                    <Trash size={20} />
                  </button>
                )}
              </>
            )}
            {myRole && myRole !== "owner" && (
              <button
                onClick={handleOpenAbandonTrip}
                className="button button-destructive"
              >
                Abandonar
                <AirplaneTilt size={20} />
              </button>
            )}
          </div>
        </div>
        <TabGroup selectedIndex={selectedTab} onChange={setSelectedTab}>
          <TabList className="tab-list-trip">
            <Tab>Trip</Tab>
            <Tab>Amigos</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Trip setTrip={setTrip} trip={trip} canEdit={canEdit} />
            </TabPanel>
            <TabPanel>
              <TripMembers setTrip={setTrip} trip={trip} canEdit={canEdit} />
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </section>
  );
};

export default TripLayout;
