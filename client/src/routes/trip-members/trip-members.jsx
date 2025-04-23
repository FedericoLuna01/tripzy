import { USERS_AVATARS } from "../../data/data";
import Avatar from "../../components/avatar/avatar";
import Input from "../../components/ui/input/input";
import { Plus, Trash } from "phosphor-react";
import "./trip-members.css";
import React, { useState } from "react";
import Modal from "../../components/modal/modal";
import toast from "react-hot-toast";

export const TripMembers = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState(USERS_AVATARS);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleDeleteUser = (id) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
    setIsOpen(false);
    toast.success("Usuario eliminado del viaje");
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedUser(null);
  };

  const handleOpen = (user) => {
    setSelectedUser(user);
    setIsOpen(true);
  };

  return (
    <>
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
          {users.map((user) => (
            <React.Fragment key={user.id}>
              <Modal
                entity={`el usuario ${selectedUser?.name || ""}`}
                onSubmit={() => handleDeleteUser(selectedUser?.id)}
                isOpen={isOpen}
                handleClose={handleClose}
              />
              <div className="card user-card no-shadow column">
                <div className="info-user">
                  <Avatar user={user} />
                  <div>
                    <p className="name">{user.name}</p>
                    <p className="email">{user.email}</p>
                  </div>
                </div>
                <form action="">
                  <label htmlFor="">Rol</label>
                  <select name="" id="" className="select">
                    <option value="owner">Dueño</option>
                    <option value="admin">Admin</option>
                    <option value="editor">Editor</option>
                  </select>
                  <button
                    type="button"
                    className="button button-destructive"
                    onClick={() => handleOpen(user)}
                  >
                    Eliminar <Trash size={20} />
                  </button>
                </form>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
};
