import { Plus, Trash } from "phosphor-react";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import Input from "../../components/ui/input/input";
import Avatar from "../../components/avatar/avatar";
import Modal from "../../components/modal/modal";
import useModal from "../../hooks/useModal";
import "./trip-members.css";
import { useOutletContext } from "react-router";

const TripMembers = () => {
  const { trip } = useOutletContext();
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
        toast.success("Usuario eliminado del viaje");
      });

    handleClose();
  };

  const handleRoleChange = (e, userTrip) => {
    const previousRole = userTrip.role;

    fetch(`http://localhost:3000/userTrip/${userTrip.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        role: e.target.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          if (data.existingOwner) {
            e.target.value = previousRole;
          }
          return toast.error(data.message);
        }
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
        />
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
              <form>
                <label htmlFor="userRole">Rol</label>
                <select
                  name="userRole"
                  id="userRole"
                  className="select"
                  defaultValue={user.role}
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
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TripMembers;
