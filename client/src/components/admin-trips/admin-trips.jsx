import {
  DotsThree,
  Eye,
  Lock,
  LockOpen,
  PencilSimple,
  Trash,
} from "phosphor-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router";
import { Menu, MenuButton, MenuItems, MenuItem } from "../ui/menu/menu";
import { Modal, ModalDescription, ModalTitle } from "../modal/modal";
import { formatFullDate } from "../../utils/utils";
import useModal from "../../hooks/useModal";
import Avatar from "../avatar/avatar";
import Input from "../ui/input/input";
import "./admin-trips.css";

const AdminTrips = () => {
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [trips, setTrips] = useState([]);
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [search, setSearch] = useState("");
  const { handleClose, handleOpen, isOpen } = useModal();

  const getTrips = () => {
    fetch("http://localhost:3000/trips", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTrips(data);
        setFilteredTrips(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching trips:", error);
        toast.error("Error al cargar los viajes");
      });
  };

  useEffect(() => {
    getTrips();
  }, []);

  const handleDeleteTrip = async (id) => {
    const trip = await fetch(`http://localhost:3000/trips/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!trip.ok) {
      return toast.error("Error al eliminar el viaje");
    }

    setTrips((prev) => prev.filter((trip) => trip.id !== id));
    setFilteredTrips((prev) => prev.filter((trip) => trip.id !== id));
    handleClose();
    toast.success("Viaje eliminado");
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    const tripsFiltered = trips.filter((trip) =>
      trip.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredTrips(tripsFiltered);
  };

  const handleBlockTrip = (trip) => {
    fetch(`http://localhost:3000/trips/${trip.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        isBlocked: !trip.isBlocked,
        title: trip.title,
        description: trip.description,
        startDate: trip.startDate,
        imageUrl: trip.imageUrl,
        isPublic: trip.isPublic,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          return toast.error(data.message);
        }

        setTrips((prev) =>
          prev.map((t) => {
            if (t.id === trip.id) {
              return { ...t, isBlocked: !trip.isBlocked };
            }
            return t;
          })
        );
        setFilteredTrips((prev) =>
          prev.map((t) => {
            if (t.id === trip.id) {
              return { ...t, isBlocked: !trip.isBlocked };
            }
            return t;
          })
        );
        toast.success(
          trip.isBlocked
            ? "Viaje desbloqueado correctamente"
            : "Viaje bloqueado correctamente"
        );
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error al bloquear el viaje");
      });
  };

  return (
    <section className="background">
      <Modal
        isOpen={isOpen}
        handleClose={() => {
          setSelectedTrip(null);
          handleClose();
        }}
        onSubmit={() => handleDeleteTrip(selectedTrip.id)}
      >
        <ModalTitle>Eliminar viaje {selectedTrip?.title}</ModalTitle>
        <ModalDescription>
          ¿Estás seguro de que deseas eliminar este viaje? Esta acción no se
          puede deshacer.
        </ModalDescription>
      </Modal>
      <div>
        <div className="container-title">
          <h1 className="title">Lista de Viajes</h1>
          <p>
            Aquí puedes ver la lista de viajes disponibles en la aplicación.
          </p>
        </div>
        <div className="input-container">
          <Input
            placeholder="Buscar viaje..."
            onChange={handleSearch}
            value={search}
          />
        </div>
        <div className="table-wrapper">
          <table className="user-table">
            <thead>
              <tr>
                <th>Creado por</th>
                <th>Titulo del viaje</th>
                <th>Descripción</th>
                <th>Fecha de inicio</th>
                <th>Fecha de creación</th>
                <th>Estado</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredTrips.length === 0 ? (
                <tr>
                  <td colSpan="6" className="no-trips">
                    No hay viajes que mostrar
                  </td>
                </tr>
              ) : (
                filteredTrips.map((trip) => (
                  <tr key={trip.id}>
                    <td>
                      <div className="user-info">
                        <Avatar user={trip.owner} />
                        <span className="user-name">{trip.owner.email}</span>
                      </div>
                    </td>
                    <td>{trip.title}</td>
                    <td>{trip.description}</td>
                    <td>{formatFullDate(trip.startDate)}</td>
                    <td>{formatFullDate(trip.createdAt)}</td>
                    <td>
                      <span
                        className={`status ${
                          trip.isBlocked ? "blocked" : "active-trip"
                        }`}
                      >
                        {trip.isBlocked ? "Bloqueado" : "Activo"}
                      </span>
                    </td>
                    <td>
                      <Menu>
                        <MenuButton className="options-button">
                          <DotsThree size={24} />
                        </MenuButton>
                        <MenuItems
                          anchor="bottom end"
                          className="menu-items-admin"
                        >
                          <MenuItem>
                            <Link
                              className="menu-item-link"
                              to={`/trip/${trip.id}`}
                            >
                              <Eye size={20} /> Ver viaje
                            </Link>
                          </MenuItem>
                          <MenuItem>
                            <Link
                              className="menu-item-link"
                              to={`/trip/edit/${trip.id}`}
                            >
                              <PencilSimple size={20} /> Editar
                            </Link>
                          </MenuItem>
                          <MenuItem>
                            <span
                              className="menu-item-link"
                              onClick={() => handleBlockTrip(trip)}
                            >
                              <span
                                className={`menu-item-link ${
                                  trip.isBlocked ? "" : "destructive"
                                }`}
                              >
                                {trip.isBlocked ? (
                                  <LockOpen size={20} />
                                ) : (
                                  <Lock size={20} />
                                )}
                                {trip.isBlocked ? "Desbloquear" : "Bloquear"}
                              </span>
                            </span>
                          </MenuItem>
                          <MenuItem>
                            <span
                              className="menu-item-link destructive"
                              onClick={() => {
                                setSelectedTrip(trip);
                                handleOpen();
                              }}
                            >
                              <Trash size={20} /> Eliminar
                            </span>
                          </MenuItem>
                        </MenuItems>
                      </Menu>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default AdminTrips;
