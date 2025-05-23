import React, { useContext, useRef, useState } from "react";
import { Plus, Trash } from "phosphor-react";
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
  const [errors, setErrors] = useState({
    userEmail: false,
  });
  const userEmailInputRef = useRef(null);
  const { handleClose, handleOpen, isOpen } = useModal();

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

    fetch("http://localhost:3000/userTrip", {
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
      });
    setUserEmail("");
  };

  const handleUserEmailChange = (e) => {
    setUserEmail(e.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      userEmail: false,
    }));
  };

  const handleDeleteUser = (selectedUser) => {
    fetch(`http://localhost:3000/userTrip/${selectedUser.id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
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
    fetch(`http://localhost:3000/userTrip/${userTrip.id}`, {
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
          // Actualizar el rol del dueño actual a "editor"
          e.target.value = "owner";
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user.id === data.existingOwner.id
                ? { ...user, role: "editor" }
                : user
            )
          );
        }

        // Actualizar el rol del usuario modificado con los datos del servidor
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userTrip.id ? { ...user, role: data.role } : user
          )
        );

        toast.success("Rol actualizado correctamente");
      });
  };

  return (
    <>
      <div className="card members-container">
        <Modal
          entity={`el usuario ${selectedUser?.name || ""}`}
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
            Esta persona ya no podrá ver ni editar tu viaje. ¿Estás seguro de
            que deseas eliminarla?
          </ModalDescription>
        </Modal>
        <h3>{canEdit ? "Gestioná tus amigos" : "Tus amigos"}</h3>
        {canEdit && (
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
                <button className="button button-secondary">
                  Agregar <Plus size={20} />{" "}
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
        )}
        <div className="card-container">
          {users.map((user) => (
            <div className="card user-card no-shadow column" key={user.id}>
              <div className="info-user">
                <Avatar user={user.user} />
                <div>
                  <p className="name">{user.user.name}</p>
                  <p className="email">{user.user.email}</p>
                </div>
              </div>
              {canEdit && userContext.id !== user.userId ? (
                <form>
                  <label htmlFor="userRole">Rol</label>
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
                  {user.role === "owner" ? (
                    <span className="rol-dueno">Dueño</span>
                  ) : user.role === "editor" ? (
                    <span>Editor</span>
                  ) : user.role === "viewer" ? (
                    <span>Espectador</span>
                  ) : (
                    <span>{user.role}</span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TripMembers;
