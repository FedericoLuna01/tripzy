import { List, MagnifyingGlass, Mountains, SquaresFour } from "phosphor-react";
import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { UserContext } from "../../contexts/user-context/user-context";
import { Tab, TabList } from "../../components/ui/tabs/tabs";
import { TabGroup } from "@headlessui/react";
import Avatar from "../../components/avatar/avatar";
import Input from "../../components/ui/input/input";
import TripsGridView from "../../components/trips-grid-view/trips-grid-view";
import TripsListView from "../../components/trips-list-view/trips-list-view";
import "./profile.css";
import { deleteTrip } from "../../api/trips";
import toast from "react-hot-toast";
import useModal from "../../hooks/useModal";
import {
  Modal,
  ModalDescription,
  ModalTitle,
} from "../../components/modal/modal";

const Profile = () => {
  const [trips, setTrips] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Estado para el filtro de búsqueda
  const [activeTab, setActiveTab] = useState(0);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const { user } = useContext(UserContext);
  const { isOpen, handleOpen, handleClose } = useModal();

  useEffect(() => {
    const getTrips = () => {
      fetch(`http://localhost:3000/trips/user/${user.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message) {
            return;
          }
          setTrips(data);
          console.log(data);
        });
    };
    getTrips();
  }, [user]);

  const filteredTrips = trips.filter((trip) =>
    trip.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteTrip = async (tripId) => {
    const res = await deleteTrip(tripId);
    if (res.message) {
      return toast.error(res.message);
    }
    setTrips((prevTrips) => prevTrips.filter((trip) => trip.id !== tripId));
    toast.success("Viaje eliminado correctamente");
  };

  const handleOpenModal = (trip) => {
    setSelectedTrip(trip);
    handleOpen();
  };

  if (!user) {
    return (
      <div className="container profile">
        <h1>Cargando...</h1>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <Modal
        onSubmit={() => {
          handleDeleteTrip(selectedTrip.id);
          handleClose();
          setSelectedTrip(null);
        }}
        isOpen={isOpen}
        handleClose={handleClose}
      >
        <ModalTitle>
          ¿Estás seguro de que quieres eliminar el viaje{" "}
          <strong>{selectedTrip?.title}</strong>?
        </ModalTitle>
        <ModalDescription>
          Esta acción no se puede deshacer. Si el viaje tiene días o actividades
          asignados, se eliminarán de forma permanente.
        </ModalDescription>
      </Modal>
      <div className="container profile">
        <div className="card profile-header">
          <div className="trip-profile-info">
            <Avatar className={"trip-avatar-item"} user={user} />
            <div className="trip-profile-data">
              <h2>{user.name}</h2>
              <p>{user.email}</p>
              <Link className="edit-profile" to={"/profile/edit"}>
                Editar perfil
              </Link>
            </div>
          </div>
          <div className="trip-count">
            <p>Total de viajes</p>
            <h3>{trips.length}</h3>
          </div>
        </div>
        <div className="container-title-and-filters">
          <div className="container-title">
            <h1>Mis viajes</h1>
          </div>
          <div className="trips-filters">
            <div className="container-filters">
              <MagnifyingGlass className="search-icon-filter" size={20} />
              <Input
                className={"input-filter"}
                placeholder="Busca por titulo de viaje..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <TabGroup onChange={(index) => setActiveTab(index)}>
              <TabList className="tab-list-profile no-shadow">
                <Tab>
                  <SquaresFour size={20} />
                </Tab>
                <Tab>
                  <List size={20} />
                </Tab>
              </TabList>
            </TabGroup>
          </div>
        </div>
        {filteredTrips.length === 0 ? (
          <div className="container-info">
            <div className="container-no-trips">
              <Mountains className="mountain" size={84} />
              <h2>Tus vacaciones te esperan</h2>
              <p>Empezá a planificar el viaje de tus sueños</p>
              <NavLink to="/new-trip">
                <button className="button button-primary">Crear viaje</button>
              </NavLink>
            </div>
          </div>
        ) : activeTab === 0 ? (
          <TripsGridView
            trips={filteredTrips}
            handleOpenModal={handleOpenModal}
          />
        ) : (
          <TripsListView
            trips={filteredTrips}
            handleOpenModal={handleOpenModal}
          />
        )}
      </div>
    </div>
  );
};

export default Profile;
