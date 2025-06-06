import React, { useContext, useRef, useState } from "react";
import { CookingPot, Plus, Trash } from "phosphor-react";
import toast from "react-hot-toast";
import Input from "../../components/ui/input/input";
import Avatar from "../../components/avatar/avatar";
import {
  Modal,
  ModalTitle,
  ModalDescription,
} from "../../components/modal/modal";
import useModal from "../../hooks/useModal";
import "./trip-members.css";
import { UserContext } from "../../contexts/user-context/user-context";

const TripMembers = ({ trip, canEdit, setTrip }) => {
  const { user: userContext } = useContext(UserContext);
  const [users, setUsers] = useState(trip.tripUsers);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [nextAddedUser, setNextAddedUser] = useState(null);
  const [errors, setErrors] = useState({
    userEmail: false,
  });
  const userEmailInputRef = useRef(null);
  const { handleClose, handleOpen, isOpen } = useModal();
  const {
    handleClose: handleCloseNextAddedUser,
    handleOpen: handleOpenNextAddedUser,
    isOpen: isOpenNextAddedUser,
  } = useModal();

  const handleUserEmailChange = (e) => {
    setUserEmail(e.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      userEmail: false,
    }));
  };

  const handleAddUser = () => {
    fetch(`${import.meta.env.VITE_BASE_SERVER_URL}/userTrip`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        email: userEmail,
        tripId: trip.id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          return toast.error(data.message);
        }
        setUsers((prevUsers) => [...prevUsers, data]);
        setTrip((prevTrip) => ({
          ...prevTrip,
          tripUsers: [...prevTrip.tripUsers, data],
        }));
        toast.success("Usuario agregado correctamente");
        setUserEmail("");
      });
    handleCloseNextAddedUser();
  };

  const handleInviteUser = (event) => {
    event.preventDefault();
    setErrors((prevErrors) => ({
      ...prevErrors,
      userEmail:
        !userEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) || userEmail.length < 2,
    }));
    if (errors.userEmail) {
      userEmailInputRef.current.focus();
      return;
    }

    if (users.some((user) => user.user.email === userEmail)) {
      toast.error("El usuario ya está invitado a este viaje");
      return;
    }

    fetch(`${import.meta.env.VITE_BASE_SERVER_URL}/users/email/${userEmail}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          return toast.error(data.message);
        }
        setNextAddedUser(data);
        handleOpenNextAddedUser();
      });
  };

  const handleDeleteUser = (selectedUser) => {
    if (selectedUser.role === "owner") {
      return toast.error("No puedes eliminar al dueño del viaje");
    }

    fetch(
      `${import.meta.env.VITE_BASE_SERVER_URL}/userTrip/${selectedUser.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          return toast.error(data.message);
        }
        setUsers((prev) => prev.filter((user) => user.id !== selectedUser.id));
        setTrip((prev) => ({
          ...prev,
          tripUsers: prev.tripUsers.filter(
            (user) => user.id !== selectedUser.id
          ),
        }));
        toast.success("Usuario eliminado del viaje");
      });

    handleClose();
  };

  const handleRoleChange = (e, userTrip) => {
    fetch(`${import.meta.env.VITE_BASE_SERVER_URL}/userTrip/${userTrip.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        role: e.target.value,
        tripId: trip.id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          return toast.error(data.message);
        }

        if (data.existingOwner) {
          setUsers((prev) =>
            prev.map((user) => {
              if (user.id === data.existingOwner.id) {
                return { ...user, role: data.existingOwner.role };
              }
              if (user.id === data.userTrip.id) {
                return { ...user, role: data.userTrip.role };
              }
              return user;
            })
          );
          return;
        }

        setUsers((prev) =>
          prev.map((user) =>
            user.id === userTrip.id ? { ...user, role: data.role } : user
          )
        );
        setTrip((prev) => ({
          ...prev,
          tripUsers: prev.tripUsers.map((user) =>
            user.id === userTrip.id ? { ...user, role: data.role } : user
          ),
        }));
        toast.success("Rol actualizado correctamente");
      });
  };

  return (
    <>
      <Modal
        onSubmit={() => handleDeleteUser(selectedUser)}
        isOpen={isOpen}
        handleClose={() => {
          handleClose();
          setSelectedUser(null);
        }}
      >
        <ModalTitle>
          Eliminar a {selectedUser?.user.name} de tu viaje
        </ModalTitle>
        <ModalDescription>
          Esta persona ya no podrá ver ni editar tu viaje. ¿Estás seguro de que
          deseas eliminarla?
        </ModalDescription>
      </Modal>
      <Modal
        onSubmit={() => handleAddUser(nextAddedUser)}
        isOpen={isOpenNextAddedUser}
        handleClose={() => {
          setUserEmail("");
          handleCloseNextAddedUser();
          setNextAddedUser(null);
        }}
        destructive={false}
        buttonTitle="Invitar"
      >
        <ModalTitle>Agregar a {nextAddedUser?.name} a tu viaje</ModalTitle>
        <ModalDescription>
          Esta persona podrá ver tu viaje. ¿Estás seguro de que deseas
          invitarla?
        </ModalDescription>
      </Modal>
      {canEdit && (
        <div className="card">
          <h3>Gestioná tus amigos</h3>
          <form onSubmit={handleInviteUser}>
            <div className="input-group">
              <label htmlFor="userEmail">Email</label>
              <div className="container-input">
                <Input
                  id="userEmail"
                  onChange={handleUserEmailChange}
                  value={userEmail}
                  ref={userEmailInputRef}
                />
                <button className="button button-secondary add-button">
                  Agregar <Plus size={20} />
                </button>
              </div>
              <p className="input-description">
                Ingresá el email de la persona que quieras agregar a tu viaje
              </p>
              {errors.userEmail && (
                <p className="error-message">El email ingresado no es válido</p>
              )}
            </div>
          </form>
        </div>
      )}
      <div className="card card-container members-container">
        <h3>Compañeros de viaje</h3>
        {users.map((user) => (
          <div
            className="card user-card no-shadow column trip-member-card"
            key={user.id}
          >
            <div className="info-user">
              <Avatar className="info-user-avatar" user={user.user} />
              <div className="name-email-user">
                <p className="name">{user.user.name}</p>
                <p className="email">{user.user.email}</p>
              </div>
            </div>
            {canEdit && userContext.id !== user.userId ? (
              <form className="actions-row-member">
                <span className={`rol-badge rol-${user.role}`}>
                  {user.role === "owner"
                    ? "Dueño"
                    : user.role === "editor"
                    ? "Editor"
                    : user.role === "viewer"
                    ? "Espectador"
                    : user.role}
                </span>
                <select
                  name="userRole"
                  id="userRole"
                  className="select"
                  value={user.role}
                  onChange={(event) => handleRoleChange(event, user)}
                >
                  <option value="owner">Dueño</option>
                  <option value="editor">Editor</option>
                  <option value="viewer">Espectador</option>
                </select>
                <button
                  type="button"
                  className="button button-destructive"
                  onClick={() => {
                    setSelectedUser(user);
                    handleOpen();
                  }}
                >
                  Eliminar <Trash size={20} />
                </button>
              </form>
            ) : (
              <div className="user-trip-role">
                <div className="actions-row-member">
                  {user.role === "owner" ? (
                    <span className="rol-badge rol-owner">Dueño</span>
                  ) : user.role === "editor" ? (
                    <span className="rol-badge rol-editor">Editor</span>
                  ) : user.role === "viewer" ? (
                    <span className="rol-badge rol-viewer">Espectador</span>
                  ) : (
                    <span>{user.role}</span>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="card card-container info-role-container">
        <h3>Permisos de usuario</h3>
        <p>
          <span className="bold">Dueño:</span> Control total del viaje.
        </p>
        <p>
          <span className="bold">Editor:</span> Puede modificar itinerarios,
          agregar usuario y editar sus roles.
        </p>
        <p>
          <span className="bold">Espectador:</span> Solamente puede ver
          información del viaje.
        </p>
      </div>
    </>
  );
};

export default TripMembers;
