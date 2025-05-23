import { DotsThree, Lock, PencilSimple, Trash } from "phosphor-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router";
import Input from "../ui/input/input";
import { Modal, ModalDescription, ModalTitle } from "../modal/modal";
import { Menu, MenuButton, MenuItems, MenuItem } from "../ui/menu/menu";
import "./admin-trips.css";
import useModal from "../../hooks/useModal";
import Avatar from "../avatar/avatar";

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
      trip.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredTrips(tripsFiltered);
  };

  const handleBlockUser = async (id) => {
    const response = await fetch(`http://localhost:3000/users/${id}/block`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      return toast.error("Error al bloquear el usuario");
    }

    toast.success("Usuario bloqueado");
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
                <th>Fecha creacion</th>
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
                    <td>${trip.startDate}</td>
                    <td>
                      <span
                        className={`status ${trip.isBlocked ? "blocked" : ""}`}
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
                              to={`/admin/edit-trip/${trip.id}`}
                            >
                              <PencilSimple size={20} /> Editar
                            </Link>
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
                          <MenuItem>
                            <Link
                              className="menu-item-link"
                              to={`/admin/trips/${trip.id}`}
                              onClick={() => handleBlockUser(trip.owner.id)}
                            >
                              <span className="menu-item-link destructive">
                                <Lock size={20} />
                                Bloquear
                              </span>
                            </Link>
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
